import { prisma } from "@/src/lib/db"
import { logger } from "@/src/lib/logger"

const FREE_MONTHLY_LIMIT  = 50
const FREE_MINUTE_LIMIT   = 5

function currentMonth(): string {
  const d = new Date()
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`
}

// Per-process minute tracking (resets on redeploy, acceptable for burst protection)
const minuteStore = new Map<string, { count: number; windowStart: number }>()

export type MentorRateLimitResult =
  | { allowed: true; remaining: number }
  | { allowed: false; reason: "MINUTE_LIMIT" | "MONTH_LIMIT"; retryAfterMs: number }

export async function checkAndIncrementMentorUsage(
  childId: string,
  isPremium: boolean
): Promise<MentorRateLimitResult> {
  // Minute-level burst guard (in-process, lightweight)
  const now = Date.now()
  let mEntry = minuteStore.get(childId)
  if (!mEntry || now - mEntry.windowStart > 60_000) {
    mEntry = { count: 0, windowStart: now }
  }
  if (mEntry.count >= FREE_MINUTE_LIMIT) {
    minuteStore.set(childId, mEntry)
    return {
      allowed: false,
      reason: "MINUTE_LIMIT",
      retryAfterMs: mEntry.windowStart + 60_000 - now,
    }
  }
  mEntry.count++
  minuteStore.set(childId, mEntry)

  if (isPremium) return { allowed: true, remaining: Infinity }

  const month = currentMonth()

  try {
    // Upsert usage row and read back the new count atomically
    const result = await prisma.$queryRaw<{ messages_used: number }[]>`
      INSERT INTO "AiMentorUsage" (id, "childId", month, "messagesUsed", "updatedAt")
      VALUES (gen_random_uuid(), ${childId}::uuid, ${month}, 1, NOW())
      ON CONFLICT ("childId", month)
      DO UPDATE SET "messagesUsed" = "AiMentorUsage"."messagesUsed" + 1, "updatedAt" = NOW()
      RETURNING "messagesUsed" AS messages_used
    `
    const used = result[0]?.messages_used ?? 1

    if (used > FREE_MONTHLY_LIMIT) {
      // Undo the increment
      await prisma.$executeRaw`
        UPDATE "AiMentorUsage"
        SET "messagesUsed" = "messagesUsed" - 1, "updatedAt" = NOW()
        WHERE "childId" = ${childId}::uuid AND month = ${month}
      `
      const nextMonth = new Date()
      nextMonth.setUTCMonth(nextMonth.getUTCMonth() + 1, 1)
      nextMonth.setUTCHours(0, 0, 0, 0)
      return {
        allowed: false,
        reason: "MONTH_LIMIT",
        retryAfterMs: nextMonth.getTime() - now,
      }
    }

    return { allowed: true, remaining: FREE_MONTHLY_LIMIT - used }
  } catch (err) {
    logger.ai.error("checkAndIncrementMentorUsage DB error — allowing request", err)
    // Fail open: don't block users because of a DB error
    return { allowed: true, remaining: -1 }
  }
}

export function mentorRateLimitMessage(reason: "MINUTE_LIMIT" | "MONTH_LIMIT"): string {
  if (reason === "MINUTE_LIMIT") {
    return "Rozmawiasz bardzo intensywnie! 😊 Poczekaj chwilę przed następną wiadomością."
  }
  return "Świetna robota — wykorzystałeś w tym miesiącu wszystkie rozmowy z mentorem! 🌟 Wróć za miesiąc lub przejdź na plan Premium."
}
