import type { DifficultyPoint, ProgramPhase } from "./types"

// ─────────────────────────────────────────────────────────────
// DIFFICULTY CURVE — smooth ramp across 30 days
//
// Phase breakdown:
//   FOUNDATION (1–5):    score 1.0 → 2.5   (gentle intro)
//   CORE (6–15):         score 2.5 → 5.5   (steady build)
//   ADVANCED (16–25):    score 5.5 → 8.0   (challenge zone)
//   INTEGRATION (26–30): score 8.0 → 9.5   (capstone difficulty)
//
// Capstone days (5, 10, 15, 20, 25, 30) spike +1 for consolidation.
// Review days (day before capstone) dip -0.5 for breathing room.
// ─────────────────────────────────────────────────────────────

const CAPSTONE_DAYS = new Set([5, 10, 15, 20, 25, 30])
const REVIEW_DAYS = new Set([4, 9, 14, 19, 24, 29])

function baseDifficultyForDay(day: number): number {
  if (day <= 5) {
    // 1.0 → 2.5 linear
    return 1.0 + ((day - 1) / 4) * 1.5
  }
  if (day <= 15) {
    // 2.5 → 5.5 linear
    return 2.5 + ((day - 6) / 9) * 3.0
  }
  if (day <= 25) {
    // 5.5 → 8.0 linear
    return 5.5 + ((day - 16) / 9) * 2.5
  }
  // 8.0 → 9.5 linear
  return 8.0 + ((day - 26) / 4) * 1.5
}

export function getPhase(day: number): ProgramPhase {
  if (day <= 5) return "FOUNDATION"
  if (day <= 15) return "CORE"
  if (day <= 25) return "ADVANCED"
  return "INTEGRATION"
}

export function getDifficultyScore(day: number): number {
  let score = baseDifficultyForDay(day)
  if (CAPSTONE_DAYS.has(day)) score = Math.min(10, score + 1.0)
  if (REVIEW_DAYS.has(day)) score = Math.max(1, score - 0.5)
  return Math.round(score * 10) / 10
}

export function getXpModifier(day: number): number {
  const score = getDifficultyScore(day)
  // Harder days award more XP: score 1 → ×1.0, score 10 → ×1.8
  return 1.0 + (score / 10) * 0.8
}

export function buildFullCurve(): DifficultyPoint[] {
  return Array.from({ length: 30 }, (_, i) => {
    const day = i + 1
    return {
      day,
      score: getDifficultyScore(day),
      phase: getPhase(day),
      modifier: getXpModifier(day),
    }
  })
}

export function isCapstoneDay(day: number): boolean {
  return CAPSTONE_DAYS.has(day)
}

export function isReviewDay(day: number): boolean {
  return REVIEW_DAYS.has(day)
}

export function getDifficultyLabel(score: number): "EASY" | "MEDIUM" | "HARD" {
  if (score <= 3.5) return "EASY"
  if (score <= 6.5) return "MEDIUM"
  return "HARD"
}
