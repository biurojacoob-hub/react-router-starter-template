import type { ThirtyDayProgram, ChildProgramState, WeekPlan } from "./types"
import { buildDay } from "./dayBuilder"
import { buildWeekPlan, getWeekForDay } from "./sessionPlanner"

const PROGRAM_TITLES: Record<string, string> = {
  EXPLORER: "Mały Ekspert Finansowy — 30 dni do mistrzostwa!",
  LEARNER: "Finansowy Nawigator — Twoja droga do niezależności!",
  ACHIEVER: "Akademia Finansów — 30-dniowy program intensywny!",
  MASTER: "Financial Mastery — Zaawansowany program 30-dniowy!",
}

const PROGRAM_DESCRIPTIONS: Record<string, string> = {
  EXPLORER: "Odkryj świat pieniędzy przez zabawę i codzienne misje. Każdy dzień to nowa przygoda finansowa!",
  LEARNER: "Zbuduj solidne podstawy finansowe, które będą służyć Ci przez całe życie. 30 dni — 30 umiejętności.",
  ACHIEVER: "Intensywny program dla ambitnych nastolatków. Opanuj finanse jak profesjonalista.",
  MASTER: "Kompleksowy kurs wiedzy finansowej na poziomie college'u. Przygotuj się na dorosłe życie finansowe.",
}

export function generateFull30DayProgram(child: ChildProgramState): ThirtyDayProgram {
  const days = Array.from({ length: 30 }, (_, i) => buildDay(child, i))

  const weeksCount = Math.ceil(30 / 7)
  const weeks: WeekPlan[] = Array.from({ length: weeksCount }, (_, i) => {
    const week = i + 1
    const weekDays = days.filter((d) => getWeekForDay(d.day) === week)
    const _phase = weekDays[0]?.phase ?? "FOUNDATION"
    return buildWeekPlan(week, weekDays)
  })

  const uniqueSkillIds = [...new Set(days.map((d) => d.skillId))]

  return {
    childId: child.childId,
    ageGroup: child.ageGroup,
    generatedAt: new Date(),
    weeks,
    days,
    totalXpAvailable: days.reduce((sum, d) => sum + d.xpReward, 0),
    skillsCount: uniqueSkillIds.length,
    programTitle: PROGRAM_TITLES[child.ageGroup] ?? "Program Finansowy 30 Dni",
    programDescription: PROGRAM_DESCRIPTIONS[child.ageGroup] ?? "30-dniowy program nauki finansów.",
  }
}
