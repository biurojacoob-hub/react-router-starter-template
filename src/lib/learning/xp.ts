// ─── XP constants ────────────────────────────────────────────

export const XP_REWARDS = {
  LESSON_COMPLETE: 10,
  QUIZ_COMPLETE: 20,
  QUIZ_PERFECT_BONUS: 10, // awarded on top of QUIZ_COMPLETE when score === 100
} as const

// ─── Level thresholds ─────────────────────────────────────────

export const LEVEL_THRESHOLDS: Record<number, number> = {
  1: 0,
  2: 100,
  3: 250,
  4: 500,
  5: 1000,
  6: 2000,
  7: 3500,
  8: 5500,
  9: 8000,
  10: 11000,
  11: 15000,
  12: 20000,
  13: 27000,
  14: 36000,
  15: 50000,
}

export const MAX_LEVEL = 15

/**
 * Compute the level for a given total XP.
 */
export function xpToLevel(xp: number): number {
  let level = 1
  for (const [lvl, threshold] of Object.entries(LEVEL_THRESHOLDS)) {
    if (xp >= threshold) level = Number(lvl)
  }
  return Math.min(level, MAX_LEVEL)
}

/**
 * XP needed to reach the next level (or null if already at max).
 */
export function xpForNextLevel(currentXp: number): number | null {
  const currentLevel = xpToLevel(currentXp)
  if (currentLevel >= MAX_LEVEL) return null
  return LEVEL_THRESHOLDS[currentLevel + 1]
}

/**
 * Progress (0–1) within the current level band.
 */
export function levelProgress(xp: number): number {
  const level = xpToLevel(xp)
  if (level >= MAX_LEVEL) return 1
  const start = LEVEL_THRESHOLDS[level]
  const end = LEVEL_THRESHOLDS[level + 1]
  return Math.min((xp - start) / (end - start), 1)
}

/**
 * Compute XP reward for a quiz submission.
 */
export function quizXpReward(score: number): number {
  const base = XP_REWARDS.QUIZ_COMPLETE
  const bonus = score === 100 ? XP_REWARDS.QUIZ_PERFECT_BONUS : 0
  return base + bonus
}
