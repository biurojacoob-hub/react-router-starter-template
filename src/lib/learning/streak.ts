/**
 * Returns midnight UTC for a given date (or today).
 */
export function toMidnightUTC(date: Date = new Date()): Date {
  const d = new Date(date)
  d.setUTCHours(0, 0, 0, 0)
  return d
}

export type StreakUpdate =
  | { action: "increment"; newStreak: number; newLongest: number }
  | { action: "maintain" }
  | { action: "reset"; newStreak: 1; newLongest: number }

/**
 * Compute what to do with a child's streak given:
 *  - lastStreakDate: the midnight-UTC date of their last activity (or null)
 *  - currentStreakDays: current streak count
 *  - longestStreak: all-time longest streak
 *  - now: current Date (injectable for testing)
 */
export function computeStreakUpdate(
  lastStreakDate: Date | null,
  currentStreakDays: number,
  longestStreak: number,
  now: Date = new Date()
): StreakUpdate {
  const today = toMidnightUTC(now)

  if (!lastStreakDate) {
    return { action: "increment", newStreak: 1, newLongest: Math.max(1, longestStreak) }
  }

  const last = toMidnightUTC(lastStreakDate)
  const diffMs = today.getTime() - last.getTime()
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) {
    // Already active today
    return { action: "maintain" }
  }

  if (diffDays === 1) {
    // Consecutive day
    const newStreak = currentStreakDays + 1
    return {
      action: "increment",
      newStreak,
      newLongest: Math.max(newStreak, longestStreak),
    }
  }

  // Gap of 2+ days — reset
  return { action: "reset", newStreak: 1, newLongest: longestStreak }
}
