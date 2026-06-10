import { generateFull30DayProgram } from "@/src/learning/program/thirtyDayProgram"
import type { AgeGroup } from "@/src/learning/graph/types"

export type TomorrowPreview = {
  day: number
  title: string
  hook: string
  skillName: string
  xpReward: number
  isCapstoneDay: boolean
  lessonHook: string
  curiosityScore: number  // 1–5: drives glow intensity
}

export function getTomorrowPreview(params: {
  childId: string
  ageGroup: AgeGroup
  xp: number
  level: number
  streakDays: number
  childCreatedAt: Date
  completedSkillIds: string[]
  currentDay: number
}): TomorrowPreview | null {
  const { currentDay } = params
  const tomorrowDay = currentDay + 1
  if (tomorrowDay > 30) return null

  const program = generateFull30DayProgram({
    childId: params.childId,
    ageGroup: params.ageGroup,
    xp: params.xp,
    level: params.level,
    streakDays: params.streakDays,
    completedSkillIds: new Set(params.completedSkillIds),
    weakTopics: [],
    engagementScore: 5,
    learningSpeed: "AVERAGE",
  })

  const tomorrow = program.days[tomorrowDay - 1]
  if (!tomorrow) return null

  // curiosityScore: capstone=5, high XP=+1, ADVANCED/INTEGRATION phase=+1, baseline=1
  const baseScore = tomorrow.isCapstoneDay ? 4 : 1
  const xpBonus = tomorrow.xpReward >= 80 ? 1 : 0
  const phaseBonus = (tomorrow.phase === "ADVANCED" || tomorrow.phase === "INTEGRATION") ? 1 : 0
  const curiosityScore = Math.min(5, baseScore + xpBonus + phaseBonus) as 1 | 2 | 3 | 4 | 5

  return {
    day: tomorrowDay,
    title: tomorrow.title,
    hook: tomorrow.engagementHook,
    skillName: tomorrow.skillName,
    xpReward: tomorrow.xpReward,
    isCapstoneDay: tomorrow.isCapstoneDay,
    lessonHook: tomorrow.lesson.hook,
    curiosityScore,
  }
}
