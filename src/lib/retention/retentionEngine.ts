import { FINN_RETENTION_NUDGE, pickRandom } from "@/src/lib/hero/finn"

export type StreakRiskLevel = "low" | "medium" | "high"
export type TriggerType = "push_notification" | "email_parent" | "none"

export type RetentionState = {
  returnLikelihoodScore: number   // 0–100
  recommendedTriggerType: TriggerType
  finnNudgeMessage: string
  streakRiskLevel: StreakRiskLevel
  nextBestActionHint: string      // human-readable suggestion
  pulseStatus: "SAFE" | "AT_RISK" | "CRITICAL"
}

export type RetentionInput = {
  daysSinceLastVisit: number
  streakDays: number
  dayProgressPercent: number
  heroActionDone: boolean
  currentDay: number
  isFirstLoginToday: boolean
}

const NUDGE_NEXT_ACTION: Record<string, string> = {
  morning: "Najlepszy czas na przygodę — rano, gdy mózg jest świeży. 🌅",
  afternoon: "Idealna pora na Odkrycie dnia. Nie czekaj do wieczora! ☀️",
  evening: "Wieczorny powrót się liczy tak samo. Finn czeka. 🌙",
}

export function getRetentionState(input: RetentionInput): RetentionState {
  const { daysSinceLastVisit, streakDays, dayProgressPercent, heroActionDone, currentDay, isFirstLoginToday } = input

  // ── Streak risk ──────────────────────────────────────────────
  let streakRiskLevel: StreakRiskLevel = "low"
  if (daysSinceLastVisit >= 2) streakRiskLevel = "high"
  else if (daysSinceLastVisit === 1 && dayProgressPercent === 0) streakRiskLevel = "medium"
  else if (streakDays === 0) streakRiskLevel = "medium"

  // ── Return likelihood ────────────────────────────────────────
  let score = 70 // base
  score += Math.min(streakDays * 3, 20)     // streak boost (max +20)
  score -= daysSinceLastVisit * 15           // absence penalty
  score += heroActionDone ? 10 : 0           // partial day is good signal
  score += dayProgressPercent === 100 ? 5 : 0
  score -= currentDay > 20 && dayProgressPercent === 0 ? 10 : 0 // late-game drop risk
  const returnLikelihoodScore = Math.max(0, Math.min(100, score))

  // ── Trigger type ─────────────────────────────────────────────
  let recommendedTriggerType: TriggerType = "none"
  if (streakRiskLevel === "high") recommendedTriggerType = "email_parent"
  else if (streakRiskLevel === "medium" && !isFirstLoginToday) recommendedTriggerType = "push_notification"

  // ── Finn nudge ───────────────────────────────────────────────
  const finnNudgeMessage = pickRandom(FINN_RETENTION_NUDGE)

  // ── Next best action hint ────────────────────────────────────
  const hour = new Date().getHours()
  const timeKey = hour < 12 ? "morning" : hour < 18 ? "afternoon" : "evening"
  const nextBestActionHint = NUDGE_NEXT_ACTION[timeKey]!

  // ── Pulse status ─────────────────────────────────────────────
  let pulseStatus: "SAFE" | "AT_RISK" | "CRITICAL" = "SAFE"
  if (streakRiskLevel === "high") pulseStatus = "CRITICAL"
  else if (streakRiskLevel === "medium" || (!heroActionDone && dayProgressPercent === 0)) pulseStatus = "AT_RISK"

  return {
    returnLikelihoodScore,
    recommendedTriggerType,
    finnNudgeMessage,
    streakRiskLevel,
    nextBestActionHint,
    pulseStatus,
  }
}
