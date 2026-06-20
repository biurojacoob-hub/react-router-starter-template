import { auth } from "@/src/auth"
import { prisma } from "@/src/lib/db"
import {
  buildMentorChildContext,
  createLongTermMemory,
  createSession,
  streamResponse,
} from "@/src/ai/mentor"
import { checkAndIncrementMentorUsage, mentorRateLimitMessage } from "@/src/lib/ai-mentor-usage"
import { logger } from "@/src/lib/logger"
import type { ChatMessage } from "@/src/ai/mentor/types"

export const runtime = "nodejs"

export async function POST(req: Request): Promise<Response> {
  try {
    const session = await auth()
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 })
    }

    const body = (await req.json()) as {
      childId: string
      message: string
      sessionId?: string
      currentSkillId?: string
      conversationHistory?: ChatMessage[]
    }

    const { childId, message, sessionId, currentSkillId, conversationHistory = [] } = body

    if (!childId || !message) {
      return new Response("Missing childId or message", { status: 400 })
    }

    // DB-based rate limiting (survives deploys)
    const isPremium = false // TODO: check subscription when billing is added
    const rateCheck = await checkAndIncrementMentorUsage(childId, isPremium)
    if (!rateCheck.allowed) {
      const msg = mentorRateLimitMessage(rateCheck.reason)
      logger.ai.warn("Rate limit hit", { childId, reason: rateCheck.reason })
      return new Response(
        JSON.stringify({ error: msg, code: rateCheck.reason }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": String(Math.ceil(rateCheck.retryAfterMs / 1000)),
          },
        }
      )
    }

    const child = await prisma.childProfile.findUnique({
      where: { id: childId },
      include: {
        skillProgress: { select: { skillId: true, status: true } },
        quizAttempts: {
          take: 10,
          orderBy: { createdAt: "desc" },
          select: {
            score: true,
            quiz: { include: { lesson: { select: { title: true } } } },
          },
        },
        aiConversations: { select: { id: true, createdAt: true }, take: 50 },
      },
    })

    if (!child) {
      return new Response("Child not found", { status: 404 })
    }

    const ctx = buildMentorChildContext(
      {
        id: child.id,
        name: child.firstName,
        ageGroup: child.ageGroup,
        xp: child.xp,
        level: child.level,
        streakDays: child.streakDays,
        skillProgress: child.skillProgress.map((p) => ({
          skillId: p.skillId,
          status: p.status as "LOCKED" | "UNLOCKED" | "IN_PROGRESS" | "COMPLETED",
        })),
        quizAttempts: child.quizAttempts.map((a) => ({
          score: a.score,
          quiz: { lesson: { title: a.quiz.lesson.title } },
          answers: [],
        })),
        aiConversations: child.aiConversations,
      },
      currentSkillId
    )

    const longTerm = createLongTermMemory(childId)
    const resolvedSessionId = sessionId ?? createSession(childId).sessionId

    const encoder = new TextEncoder()
    const abort = new AbortController()
    const timeoutId = setTimeout(() => abort.abort(), 25_000)

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of streamResponse(
            { childId, message, sessionId: resolvedSessionId, currentSkillId, conversationHistory },
            ctx,
            longTerm
          )) {
            if (abort.signal.aborted) break
            controller.enqueue(encoder.encode(chunk))
          }
        } catch (err) {
          if (abort.signal.aborted) {
            controller.enqueue(encoder.encode("Przepraszam, mentor potrzebuje chwili przerwy. Spróbuj ponownie za moment. ⏱️"))
          } else {
            console.error("[mentor/stream] streamResponse error:", err)
            controller.enqueue(encoder.encode("Przepraszam, coś poszło nie tak. Spróbuj ponownie za chwilę. 🙏"))
          }
        } finally {
          clearTimeout(timeoutId)
          controller.close()
        }
      },
    })

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
        "X-Session-Id": resolvedSessionId,
      },
    })
  } catch (err) {
    console.error("[mentor/stream] unhandled error:", err)
    return new Response(
      JSON.stringify({ error: "Mentor jest chwilowo niedostępny. Spróbuj ponownie." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
}
