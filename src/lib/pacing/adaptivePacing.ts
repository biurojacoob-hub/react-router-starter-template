export type DailyLoad = "LOW" | "NORMAL" | "HIGH"
export type FatigueLevel = "low" | "medium" | "high"
export type FinnEmotionalTone = "bored" | "frustrated" | "flow" | "fatigued" | "neutral"

export type AdaptivePacingState = {
  difficultyModifier: number        // 0.7–1.5
  dailyLoad: DailyLoad
  recommendedActionsCount: number   // 1 | 2 | 3
  focusIntensity: number            // 1–5
  frustrationRisk: number           // 0–100
  boredomRisk: number               // 0–100
  fatigueLevel: FatigueLevel
  finnEmotionalTone: FinnEmotionalTone
  pacingLabel: string               // "Lekki Dzień" | "Zbalansowany" | "Deep Focus"
}

export type PacingInput = {
  lessonsCompleted: number
  missionsCompleted: number
  streakDays: number
  daysSinceLastVisit: number
  currentDay: number
  level: number
  dayProgressPercent: number
  heroActionDone: boolean
  isFirstLoginToday: boolean
}

export function getAdaptivePacingState(input: PacingInput): AdaptivePacingState {
  const {
    lessonsCompleted, missionsCompleted: _missionsCompleted, streakDays,
    daysSinceLastVisit, currentDay, level,
    dayProgressPercent, heroActionDone, isFirstLoginToday: _isFirstLoginToday,
  } = input

  // ── Engagement velocity ──────────────────────────────────────
  // How many lessons per day on average. >1.2 = fast, <0.6 = slow.
  const engagementVelocity = lessonsCompleted / Math.max(currentDay, 1)

  // ── Consistency score ────────────────────────────────────────
  // Streak vs days elapsed (capped at 14 to avoid day-1 distortion)
  const referenceWindow = Math.min(Math.max(currentDay, 1), 14)
  const consistencyRate = streakDays / referenceWindow  // 0–1

  // ── Boredom risk ─────────────────────────────────────────────
  // Fast learner + consistent + early in program = at risk of under-stimulation
  const boredomRaw =
    Math.min(engagementVelocity, 2.5) * 30  // velocity contribution (max 75)
    + consistencyRate * 15                   // consistency adds risk if fast
    + (level > 7 ? 10 : 0)                  // high-level children move faster
    - (daysSinceLastVisit >= 2 ? 25 : 0)    // recent absence = NOT bored, struggling
  const boredomRisk = Math.max(0, Math.min(100, Math.round(boredomRaw)))

  // ── Frustration risk ─────────────────────────────────────────
  // Slow velocity + absences + partial-day-stuck pattern = at risk of frustration
  const partialDayStuck =
    dayProgressPercent > 0 && dayProgressPercent < 100 && daysSinceLastVisit >= 1
  const frustrationRaw =
    Math.max(0, (1 - engagementVelocity)) * 35   // low velocity (max 35)
    + Math.min(daysSinceLastVisit, 4) * 12        // absence penalty (max 48)
    + (partialDayStuck ? 25 : 0)                  // started, didn't finish, came back
    - consistencyRate * 20                        // streak reduces risk
    - (dayProgressPercent === 100 ? 20 : 0)       // day done = no frustration
  const frustrationRisk = Math.max(0, Math.min(100, Math.round(frustrationRaw)))

  // ── Fatigue detection ────────────────────────────────────────
  // Signal: started but abandoned, returned without completing
  let fatigueLevel: FatigueLevel = "low"
  if (frustrationRisk > 65 && daysSinceLastVisit >= 2) {
    fatigueLevel = "high"
  } else if (partialDayStuck || (daysSinceLastVisit === 1 && dayProgressPercent === 0)) {
    fatigueLevel = "medium"
  }

  // ── Daily load ───────────────────────────────────────────────
  let dailyLoad: DailyLoad = "NORMAL"
  if (frustrationRisk > 55 || fatigueLevel === "high") {
    dailyLoad = "LOW"
  } else if (boredomRisk > 55 && frustrationRisk < 30) {
    dailyLoad = "HIGH"
  }

  // ── Recommended actions count ────────────────────────────────
  // LOW: hero only (1), NORMAL: hero + 2 chips (3), HIGH: hero + 2 chips + badge (3+bonus)
  const recommendedActionsCount =
    dailyLoad === "LOW"  ? 1 :
    dailyLoad === "HIGH" ? 3 :
    2   // NORMAL: hero + 1 secondary shown, 1 faded

  // ── Focus intensity ──────────────────────────────────────────
  let focusIntensity = 3
  if (dailyLoad === "HIGH") focusIntensity = boredomRisk > 70 ? 5 : 4
  if (dailyLoad === "LOW")  focusIntensity = fatigueLevel === "high" ? 1 : 2

  // ── Difficulty modifier ──────────────────────────────────────
  const difficultyModifier =
    dailyLoad === "LOW"  ? 0.75 :
    dailyLoad === "HIGH" ? 1.35 :
    1.0

  // ── Finn emotional tone ──────────────────────────────────────
  let finnEmotionalTone: FinnEmotionalTone = "neutral"
  if (fatigueLevel === "high") {
    finnEmotionalTone = "fatigued"
  } else if (frustrationRisk > 55) {
    finnEmotionalTone = "frustrated"
  } else if (dayProgressPercent > 0 && heroActionDone) {
    finnEmotionalTone = "flow"
  } else if (boredomRisk > 55 && frustrationRisk < 30) {
    finnEmotionalTone = "bored"
  }

  // ── Pacing label ─────────────────────────────────────────────
  const pacingLabel =
    dailyLoad === "LOW"  ? "Lekki Dzień" :
    dailyLoad === "HIGH" ? "Deep Focus"  :
    "Zbalansowany"

  return {
    difficultyModifier,
    dailyLoad,
    recommendedActionsCount,
    focusIntensity,
    frustrationRisk,
    boredomRisk,
    fatigueLevel,
    finnEmotionalTone,
    pacingLabel,
  }
}
