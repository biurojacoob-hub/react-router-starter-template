const DEFAULT_TZ = "Europe/Warsaw"

/**
 * Returns the local date string "YYYY-MM-DD" for the given timestamp
 * in the given IANA timezone (sv-SE gives ISO format).
 */
export function localDateString(ts: Date | number, timezone: string = DEFAULT_TZ): string {
  return new Intl.DateTimeFormat("sv-SE", { timeZone: timezone }).format(
    typeof ts === "number" ? ts : ts.getTime()
  )
}

/**
 * Returns midnight UTC for a given date — kept for backward compat.
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
 * Compute what to do with a child's streak.
 * All "today" comparisons use the child's timezone, defaulting to Europe/Warsaw.
 *
 * @param lastStreakDate  Date of last streak-qualifying activity (or null)
 * @param currentStreakDays  Current streak count
 * @param longestStreak  All-time longest streak
 * @param timezone  IANA timezone string from ChildProfile.timezone
 * @param now  Injectable for testing
 */
export function computeStreakUpdate(
  lastStreakDate: Date | null,
  currentStreakDays: number,
  longestStreak: number,
  timezone: string = DEFAULT_TZ,
  now: Date = new Date()
): StreakUpdate {
  const today = localDateString(now, timezone)

  if (!lastStreakDate) {
    return { action: "increment", newStreak: 1, newLongest: Math.max(1, longestStreak) }
  }

  const last = localDateString(lastStreakDate, timezone)

  if (last === today) {
    return { action: "maintain" }
  }

  // Gap in calendar days (local time)
  const lastMs  = new Date(last + "T00:00:00").getTime()
  const todayMs = new Date(today + "T00:00:00").getTime()
  const diffDays = Math.round((todayMs - lastMs) / 86_400_000)

  if (diffDays === 1) {
    const newStreak = currentStreakDays + 1
    return {
      action: "increment",
      newStreak,
      newLongest: Math.max(newStreak, longestStreak),
    }
  }

  return { action: "reset", newStreak: 1, newLongest: longestStreak }
}
