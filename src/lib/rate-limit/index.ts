// In-memory rate limiter — suitable for single-instance deployments and MVP.
// For multi-instance deployments, replace backing store with Redis.

type RateLimitEntry = {
  minuteCount: number
  minuteWindowStart: number
  dayCount: number
  dayWindowStart: number
}

const store = new Map<string, RateLimitEntry>()

const LIMITS = {
  PER_MINUTE: 5,
  PER_DAY: 30,
} as const

function now(): number {
  return Date.now()
}

function startOfDayMs(): number {
  const d = new Date()
  d.setUTCHours(0, 0, 0, 0)
  return d.getTime()
}

export type RateLimitResult =
  | { allowed: true }
  | { allowed: false; reason: "MINUTE_LIMIT" | "DAY_LIMIT"; retryAfterMs: number }

export function checkMentorRateLimit(childId: string): RateLimitResult {
  const t = now()
  const dayStart = startOfDayMs()
  const minuteStart = t - 60_000

  let entry = store.get(childId)

  if (!entry) {
    entry = { minuteCount: 0, minuteWindowStart: t, dayCount: 0, dayWindowStart: dayStart }
  }

  // Reset minute window if expired
  if (t - entry.minuteWindowStart > 60_000) {
    entry.minuteCount = 0
    entry.minuteWindowStart = t
  }

  // Reset day window if it's a new UTC day
  if (entry.dayWindowStart < dayStart) {
    entry.dayCount = 0
    entry.dayWindowStart = dayStart
  }

  if (entry.dayCount >= LIMITS.PER_DAY) {
    store.set(childId, entry)
    const nextDay = dayStart + 24 * 60 * 60 * 1000
    return { allowed: false, reason: "DAY_LIMIT", retryAfterMs: nextDay - t }
  }

  if (entry.minuteCount >= LIMITS.PER_MINUTE) {
    store.set(childId, entry)
    const retryAfterMs = entry.minuteWindowStart + 60_000 - t
    return { allowed: false, reason: "MINUTE_LIMIT", retryAfterMs }
  }

  entry.minuteCount++
  entry.dayCount++
  store.set(childId, entry)

  return { allowed: true }
}

export function rateLimitErrorMessage(reason: "MINUTE_LIMIT" | "DAY_LIMIT"): string {
  if (reason === "MINUTE_LIMIT") {
    return "Rozmawiasz bardzo intensywnie! 😊 Poczekaj chwilę przed następną wiadomością."
  }
  return "Świetna robota — wykorzystałeś dziś wszystkie rozmowy z mentorem! 🌟 Wróć jutro po więcej."
}
