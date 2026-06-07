"use server"

import { auth } from "@/src/auth"
import { prisma } from "@/src/lib/db"
import {
  buildMentorChildContext,
  createLongTermMemory,
  deserializeLongTermMemory,
  createSession,
  sendMessage,
} from "@/src/ai/mentor"
import type { MentorResponse, LongTermMemory } from "@/src/ai/mentor/types"
import type { ChatMessage } from "@/src/ai/mentor/types"

async function resolveLongTermMemory(childId: string): Promise<LongTermMemory> {
  const stored = await prisma.aIConversation.findFirst({
    where: { childId, title: { startsWith: "__ltm__" } },
    orderBy: { updatedAt: "desc" },
  })

  if (stored?.title) {
    try {
      return deserializeLongTermMemory(stored.title.replace("__ltm__", ""))
    } catch {
      // Fall through
    }
  }

  return createLongTermMemory(childId)
}

async function resolveChildContext(childId: string, currentSkillId?: string) {
  const child = await prisma.childProfile.findUnique({
    where: { id: childId },
    include: {
      skillProgress: { select: { skillId: true, status: true } },
      quizAttempts: {
        take: 20,
        orderBy: { createdAt: "desc" },
        select: {
          score: true,
          answers: true,
          quiz: { include: { lesson: { select: { title: true } } } },
        },
      },
      aiConversations: { select: { id: true, createdAt: true }, take: 100 },
    },
  })

  if (!child) throw new Error("Child not found")

  return buildMentorChildContext(
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
}

export async function mentorChat(
  childId: string,
  message: string,
  sessionId: string,
  conversationHistory: ChatMessage[],
  currentSkillId?: string
): Promise<MentorResponse> {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")

  const ctx = await resolveChildContext(childId, currentSkillId)
  const longTerm = await resolveLongTermMemory(childId)

  return sendMessage(
    { childId, message, sessionId, currentSkillId, conversationHistory },
    ctx,
    longTerm
  )
}

export async function startMentorSession(
  childId: string
): Promise<{ sessionId: string; greeting: string }> {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")

  const newSession = createSession(childId)
  const ctx = await resolveChildContext(childId)

  const levelInfo = `Poziom ${ctx.level} (${ctx.xp} XP)`
  const streakInfo = ctx.streakDays > 0 ? `, seria ${ctx.streakDays} dni 🔥` : ""

  const greetings: Record<string, string> = {
    EXPLORER: `Cześć ${ctx.name}! 🌟 Jestem Twoim finansowym pomocnikiem! Gotowy? 😊`,
    LEARNER: `Hej ${ctx.name}! 💪 Masz ${levelInfo}${streakInfo}. O czym porozmawiamy?`,
    ACHIEVER: `Hej ${ctx.name}! Jesteś na ${levelInfo}${streakInfo}. Gotowy na poważną rozmowę?`,
    MASTER: `Witaj ${ctx.name}! ${levelInfo}${streakInfo}. Od czego zaczynamy?`,
  }

  return {
    sessionId: newSession.sessionId,
    greeting: greetings[ctx.ageGroup] ?? `Cześć ${ctx.name}! Gotowy na lekcję finansów?`,
  }
}
