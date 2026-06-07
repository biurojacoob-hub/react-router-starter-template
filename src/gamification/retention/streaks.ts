import type { StreakState, StreakStatus, StreakMilestone } from "./types"

// ─────────────────────────────────────────────────────────────
// STREAK MILESTONES
// ─────────────────────────────────────────────────────────────

export const STREAK_MILESTONES: StreakMilestone[] = [
  { day: 3,  label: "3 dni z rzędu!",      xpBonus: 15,  badgeId: "streak-3" },
  { day: 7,  label: "Tydzień bez przerwy!", xpBonus: 50,  badgeId: "streak-7" },
  { day: 14, label: "Dwa tygodnie!",        xpBonus: 100, badgeId: "streak-14" },
  { day: 21, label: "21 dni nawyku!",       xpBonus: 150, badgeId: "streak-21" },
  { day: 30, label: "Miesiąc mistrza!",     xpBonus: 250, badgeId: "streak-30" },
  { day: 50, label: "50 dni — legenda!",    xpBonus: 400, badgeId: "streak-50" },
  { day: 100, label: "100 dni — ikona!",   xpBonus: 1000, badgeId: "streak-100" },
]

// ─────────────────────────────────────────────────────────────
// STREAK CALCULATIONS
// ─────────────────────────────────────────────────────────────

export function getStreakStatus(lastActivityDate: Date | null, now: Date = new Date()): StreakStatus {
  if (!lastActivityDate) return "NEW"

  const diffMs = now.getTime() - lastActivityDate.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return "ACTIVE"
  if (diffDays === 1) return "AT_RISK"    // last activity yesterday — must play today
  return "BROKEN"
}

export function getDailyStreakXp(streak: number): number {
  if (streak >= 30) return 25
  if (streak >= 21) return 20
  if (streak >= 14) return 15
  if (streak >= 7)  return 10
  if (streak >= 3)  return 5
  return 2
}

export function getNextMilestone(currentStreak: number): StreakMilestone | null {
  return STREAK_MILESTONES.find((m) => m.day > currentStreak) ?? null
}

export function updateStreak(
  state: StreakState,
  activityDate: Date,
  now: Date = new Date()
): StreakState {
  const status = getStreakStatus(state.lastActivityDate, now)

  // Already active today — no change
  if (
    state.lastActivityDate &&
    isSameDay(state.lastActivityDate, activityDate)
  ) {
    return state
  }

  let newStreak: number

  if (status === "NEW" || status === "AT_RISK" || status === "ACTIVE") {
    newStreak = state.currentStreak + 1
  } else {
    // BROKEN — check if freeze available
    if (state.freezesAvailable > 0) {
      newStreak = state.currentStreak + 1
      return {
        ...state,
        currentStreak: newStreak,
        longestStreak: Math.max(newStreak, state.longestStreak),
        lastActivityDate: activityDate,
        status: "ACTIVE",
        freezesAvailable: state.freezesAvailable - 1,
        freezesUsed: state.freezesUsed + 1,
        nextMilestone: getNextMilestone(newStreak)?.day ?? 0,
        milestoneXpBonus: getNextMilestone(newStreak)?.xpBonus ?? 0,
      }
    }
    newStreak = 1
  }

  const next = getNextMilestone(newStreak)

  return {
    ...state,
    currentStreak: newStreak,
    longestStreak: Math.max(newStreak, state.longestStreak),
    lastActivityDate: activityDate,
    status: "ACTIVE",
    nextMilestone: next?.day ?? 0,
    milestoneXpBonus: next?.xpBonus ?? 0,
  }
}

export function applyStreakFreeze(state: StreakState): StreakState {
  if (state.freezesAvailable <= 0) return state
  return {
    ...state,
    freezesAvailable: state.freezesAvailable - 1,
    freezesUsed: state.freezesUsed + 1,
    status: "ACTIVE",
  }
}

export function awardStreakFreeze(state: StreakState, count = 1): StreakState {
  return { ...state, freezesAvailable: state.freezesAvailable + count }
}

export function createInitialStreakState(): StreakState {
  return {
    currentStreak: 0,
    longestStreak: 0,
    lastActivityDate: null,
    status: "NEW",
    freezesAvailable: 1,
    freezesUsed: 0,
    nextMilestone: STREAK_MILESTONES[0]!.day,
    milestoneXpBonus: STREAK_MILESTONES[0]!.xpBonus,
  }
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export function getMilestoneForStreak(streak: number): StreakMilestone | undefined {
  return STREAK_MILESTONES.find((m) => m.day === streak)
}
