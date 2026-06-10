import { prisma } from "@/src/lib/db"
import { generateFull30DayProgram } from "@/src/learning/program/thirtyDayProgram"
import type { DailyProgramDay } from "@/src/learning/program/types"
import type { AgeGroup } from "@/src/learning/graph/types"

export type ComebackTier = "NONE" | "THREE_DAYS" | "SEVEN_DAYS" | "TWO_WEEKS"

export type TodayLearningState = {
  currentDay: number
  isFirstLoginToday: boolean
  daysSinceLastVisit: number
  comebackTier: ComebackTier
  today: DailyProgramDay
  lessonDoneToday: boolean
  quizDoneToday: boolean
  missionDoneToday: boolean
  dayProgressPercent: number
  activeMissionId: string | null
}

function todayMidnightUTC(): Date {
  const d = new Date()
  d.setUTCHours(0, 0, 0, 0)
  return d
}

function daysSince(date: Date | null): number {
  if (!date) return 999
  const diffMs = Date.now() - date.getTime()
  return Math.floor(diffMs / (1000 * 60 * 60 * 24))
}

export async function getTodayLearningState(params: {
  childId: string
  ageGroup: AgeGroup
  xp: number
  level: number
  streakDays: number
  childCreatedAt: Date
  lastActiveAt: Date | null
  completedSkillIds: string[]
}): Promise<TodayLearningState> {
  const {
    childId,
    ageGroup,
    xp,
    level,
    streakDays,
    childCreatedAt,
    lastActiveAt,
    completedSkillIds,
  } = params

  const today = todayMidnightUTC()

  // Current program day — capped 1–30
  const rawDay = Math.floor((Date.now() - childCreatedAt.getTime()) / (1000 * 60 * 60 * 24)) + 1
  const currentDay = Math.max(1, Math.min(30, rawDay))

  // Comeback & first-login
  const daySinceVisit = daysSince(lastActiveAt)
  const isFirstLoginToday = !lastActiveAt || lastActiveAt < today

  const comebackTier: ComebackTier =
    daySinceVisit >= 14 ? "TWO_WEEKS" :
    daySinceVisit >= 7  ? "SEVEN_DAYS" :
    daySinceVisit >= 3  ? "THREE_DAYS" : "NONE"

  // Generate 30-day program (pure in-memory, no DB)
  const program = generateFull30DayProgram({
    childId,
    ageGroup,
    xp,
    level,
    streakDays,
    completedSkillIds: new Set(completedSkillIds),
    weakTopics: [],
    engagementScore: 5,
    learningSpeed: "AVERAGE",
  })

  const todayDay = program.days[currentDay - 1] ?? program.days[0]!

  // Check what's done today
  const [lessonCount, quizCount, missionRecord] = await Promise.all([
    prisma.lessonProgress.count({
      where: { childId, completed: true, updatedAt: { gte: today } },
    }),
    prisma.quizAttempt.count({
      where: { childId, createdAt: { gte: today } },
    }),
    prisma.missionProgress.findFirst({
      where: { childId },
      select: { id: true, status: true },
      orderBy: { updatedAt: "desc" },
    }),
  ])

  const lessonDoneToday = lessonCount > 0
  const quizDoneToday = quizCount > 0

  // Mission: active OR completed today
  const missionDoneToday =
    missionRecord?.status === "COMPLETED" &&
    (await prisma.missionProgress.count({
      where: { childId, status: "COMPLETED", completedAt: { gte: today } },
    })) > 0

  const activeMissionId =
    missionRecord?.status === "ACTIVE" ? missionRecord.id : null

  const doneCount = (lessonDoneToday ? 1 : 0) + (quizDoneToday ? 1 : 0) + (missionDoneToday ? 1 : 0)
  const dayProgressPercent = Math.round((doneCount / 3) * 100)

  return {
    currentDay,
    isFirstLoginToday,
    daysSinceLastVisit: daySinceVisit,
    comebackTier,
    today: todayDay,
    lessonDoneToday,
    quizDoneToday,
    missionDoneToday,
    dayProgressPercent,
    activeMissionId,
  }
}
