import type { ProgressionSummary } from "./types"
import { ALL_BADGES, BADGES_BY_ID } from "./rewards.achievements"
import { ALL_SKILLS } from "@/src/learning/graph/skills"

// ─────────────────────────────────────────────────────────────
// XP → LEVEL TABLE
// Level 1 = 0 XP, Level 2 = 100 XP, Level 3 = 250 XP, ...
// ─────────────────────────────────────────────────────────────

const LEVEL_THRESHOLDS: number[] = [
  0,    // Level 1
  100,  // Level 2
  250,  // Level 3
  450,  // Level 4
  700,  // Level 5
  1000, // Level 6
  1400, // Level 7
  1900, // Level 8
  2500, // Level 9
  3200, // Level 10
  4000, // Level 11
  5000, // Level 12
  6200, // Level 13
  7600, // Level 14
  9200, // Level 15
  11000, // Level 16
  13000, // Level 17
  15500, // Level 18
  18500, // Level 19
  22000, // Level 20 — max
]

export function getLevelForXp(xp: number): number {
  let level = 1
  for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
    if (xp >= LEVEL_THRESHOLDS[i]!) level = i + 1
  }
  return level
}

export function getXpForLevel(level: number): number {
  return LEVEL_THRESHOLDS[Math.max(0, level - 1)] ?? LEVEL_THRESHOLDS.at(-1)!
}

export function getXpToNextLevel(xp: number): number {
  const level = getLevelForXp(xp)
  if (level >= LEVEL_THRESHOLDS.length) return 0 // max level
  const nextThreshold = LEVEL_THRESHOLDS[level] ?? LEVEL_THRESHOLDS.at(-1)!
  return Math.max(0, nextThreshold - xp)
}

export function getXpProgressPercent(xp: number): number {
  const level = getLevelForXp(xp)
  if (level >= LEVEL_THRESHOLDS.length) return 100
  const currentThreshold = LEVEL_THRESHOLDS[level - 1] ?? 0
  const nextThreshold = LEVEL_THRESHOLDS[level] ?? currentThreshold
  const range = nextThreshold - currentThreshold
  if (range <= 0) return 100
  return Math.round(((xp - currentThreshold) / range) * 100)
}

// ─────────────────────────────────────────────────────────────
// NEXT BADGE CALCULATION
// ─────────────────────────────────────────────────────────────

export function getNextBadge(
  earnedBadgeIds: string[],
  stats: {
    streakDays: number
    lessonsCompleted: number
    quizPerfectCount: number
    missionsCompleted: number
    mentorSessions: number
    daysActive: number
    xpTotal: number
  }
): { badge: typeof ALL_BADGES[0]; progressPercent: number } | null {
  const earned = new Set(earnedBadgeIds)

  // Find closest unearned badge by progress
  let bestBadge = null
  let bestPercent = -1

  for (const badge of ALL_BADGES) {
    if (earned.has(badge.id)) continue
    if (badge.isPremium) continue

    const c = badge.criteria
    let progress = 0
    let total = 1

    if (c.type === "STREAK_DAYS") { progress = stats.streakDays; total = c.days }
    else if (c.type === "LESSONS_COMPLETED") { progress = stats.lessonsCompleted; total = c.count }
    else if (c.type === "QUIZ_PERFECT_SCORE") { progress = stats.quizPerfectCount; total = c.count }
    else if (c.type === "MISSIONS_COMPLETED") { progress = stats.missionsCompleted; total = c.count }
    else if (c.type === "MENTOR_SESSIONS") { progress = stats.mentorSessions; total = c.count }
    else if (c.type === "DAYS_ACTIVE") { progress = stats.daysActive; total = c.count }
    else if (c.type === "XP_TOTAL") { progress = stats.xpTotal; total = c.amount }
    else continue

    const percent = Math.min(99, Math.round((progress / total) * 100))
    if (percent > bestPercent) {
      bestPercent = percent
      bestBadge = badge
    }
  }

  if (!bestBadge) return null
  return { badge: bestBadge, progressPercent: bestPercent }
}

// ─────────────────────────────────────────────────────────────
// NEXT SKILL UNLOCK
// ─────────────────────────────────────────────────────────────

export function getNextSkillUnlock(
  xp: number,
  completedSkillIds: string[]
): { skillId: string; skillName: string; xpNeeded: number } | null {
  const completed = new Set(completedSkillIds)

  const candidates = ALL_SKILLS
    .filter((s) => !completed.has(s.id) && s.unlockXP > xp)
    .sort((a, b) => a.unlockXP - b.unlockXP)

  const next = candidates[0]
  if (!next) return null

  return {
    skillId: next.id,
    skillName: next.name,
    xpNeeded: next.unlockXP - xp,
  }
}

// ─────────────────────────────────────────────────────────────
// BUILD PROGRESSION SUMMARY
// ─────────────────────────────────────────────────────────────

export function buildProgressionSummary(
  xp: number,
  earnedBadgeIds: string[],
  completedSkillIds: string[],
  weekSummary: { lessonsCompleted: number; xpEarned: number; streakDays: number; badgesEarned: string[] },
  stats: Parameters<typeof getNextBadge>[1]
): ProgressionSummary {
  return {
    currentXp: xp,
    currentLevel: getLevelForXp(xp),
    xpToNextLevel: getXpToNextLevel(xp),
    xpProgressPercent: getXpProgressPercent(xp),
    nextBadge: getNextBadge(earnedBadgeIds, stats),
    nextSkillUnlock: getNextSkillUnlock(xp, completedSkillIds),
    weekSummary,
  }
}
