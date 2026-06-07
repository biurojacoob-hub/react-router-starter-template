import type { DailyProgramDay, WeekPlan, ProgramPhase } from "./types"

// ─────────────────────────────────────────────────────────────
// SESSION TIME BUDGET — always 30 minutes total
// ─────────────────────────────────────────────────────────────

export type SessionTimeBudget = {
  lesson: number       // minutes
  quiz: number         // minutes
  mission: number      // minutes
  reflection: number   // minutes
  total: 30
}

const PHASE_TIME_BUDGETS: Record<ProgramPhase, SessionTimeBudget> = {
  FOUNDATION:  { lesson: 12, quiz: 7, mission: 8, reflection: 3, total: 30 },
  CORE:        { lesson: 12, quiz: 8, mission: 7, reflection: 3, total: 30 },
  ADVANCED:    { lesson: 10, quiz: 8, mission: 9, reflection: 3, total: 30 },
  INTEGRATION: { lesson: 8,  quiz: 7, mission: 12, reflection: 3, total: 30 },
}

export function getSessionTimeBudget(phase: ProgramPhase): SessionTimeBudget {
  return PHASE_TIME_BUDGETS[phase]
}

// ─────────────────────────────────────────────────────────────
// OPTIMAL SESSION TIME — based on child engagement score
// ─────────────────────────────────────────────────────────────

export function getOptimalStartTime(engagementScore: number): string {
  // High engagement → morning sessions more effective
  if (engagementScore >= 8) return "Rano (8–10)"
  if (engagementScore >= 5) return "Po południu (15–17)"
  return "Wieczór (18–20) — krótkie, angażujące sesje"
}

// ─────────────────────────────────────────────────────────────
// WEEK BOUNDARIES
// ─────────────────────────────────────────────────────────────

export function getWeekForDay(day: number): number {
  return Math.ceil(day / 7)
}

export function getDaysInWeek(week: number): number[] {
  const start = (week - 1) * 7 + 1
  const end = Math.min(week * 7, 30)
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

export function getWeekTheme(week: number, phase: ProgramPhase): string {
  const themes: Record<number, string> = {
    1: "Odkrywanie pieniędzy",
    2: "Budowanie nawyków",
    3: "Zaawansowane strategie",
    4: "Prawdziwe życie finansowe",
    5: "Mistrzostwo i integracja",
  }
  return themes[week] ?? `Tydzień ${week}: ${phaseLabel(phase)}`
}

export function getWeekGoal(week: number): string {
  const goals: Record<number, string> = {
    1: "Zrozum czym są pieniądze i jak działają",
    2: "Naucz się planować i oszczędzać",
    3: "Opanuj zaawansowane koncepcje finansowe",
    4: "Zastosuj wiedzę w prawdziwym życiu",
    5: "Połącz wszystko w spójny system finansowy",
  }
  return goals[week] ?? `Opanuj tematy tygodnia ${week}`
}

function phaseLabel(phase: ProgramPhase): string {
  const labels: Record<ProgramPhase, string> = {
    FOUNDATION: "Fundamenty",
    CORE: "Rdzeń",
    ADVANCED: "Zaawansowany",
    INTEGRATION: "Integracja",
  }
  return labels[phase]
}

// ─────────────────────────────────────────────────────────────
// BUILD WEEK PLAN from daily days
// ─────────────────────────────────────────────────────────────

export function buildWeekPlan(week: number, days: DailyProgramDay[]): WeekPlan {
  const weekDays = days.filter((d) => getWeekForDay(d.day) === week)
  const phase = weekDays[0]?.phase ?? "FOUNDATION"

  return {
    week,
    phase,
    days: weekDays,
    weekTheme: getWeekTheme(week, phase),
    weekGoal: getWeekGoal(week),
    totalXpAvailable: weekDays.reduce((sum, d) => sum + d.xpReward, 0),
    skillsCovered: [...new Set(weekDays.map((d) => d.skillId))],
  }
}

// ─────────────────────────────────────────────────────────────
// SESSION SCHEDULE — when to run each activity
// ─────────────────────────────────────────────────────────────

export type SessionSchedule = {
  minute: number
  activity: "LESSON" | "QUIZ" | "MISSION" | "REFLECTION"
  durationMinutes: number
  label: string
}

export function buildSessionSchedule(phase: ProgramPhase): SessionSchedule[] {
  const budget = getSessionTimeBudget(phase)

  return [
    { minute: 0,                             activity: "LESSON",     durationMinutes: budget.lesson,     label: "Lekcja" },
    { minute: budget.lesson,                  activity: "QUIZ",       durationMinutes: budget.quiz,       label: "Quiz" },
    { minute: budget.lesson + budget.quiz,    activity: "MISSION",    durationMinutes: budget.mission,    label: "Misja" },
    { minute: budget.lesson + budget.quiz + budget.mission, activity: "REFLECTION", durationMinutes: budget.reflection, label: "Refleksja" },
  ]
}
