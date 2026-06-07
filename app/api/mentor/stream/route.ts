import { auth } from "@/src/auth"
import { prisma } from "@/src/lib/db"
import {
  buildMentorChildContext,
  createLongTermMemory,
  createSession,
  streamResponse,
} from "@/src/ai/mentor"
import type { ChatMessage } from "@/src/ai/mentor/types"

export const runtime = "nodejs"

export async function POST(req: Request): Promise<Response> {
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

  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of streamResponse(
          { childId, message, sessionId: resolvedSessionId, currentSkillId, conversationHistory },
          ctx,
          longTerm
        )) {
          controller.enqueue(encoder.encode(chunk))
        }
      } finally {
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
}
