import type { AgeGroup, Skill, ChildSkillState } from "./types"

// ─────────────────────────────────────────────────────────────
// AGE GROUP RULES
// ─────────────────────────────────────────────────────────────

const AGE_GROUP_ORDER: AgeGroup[] = ["EXPLORER", "LEARNER", "ACHIEVER", "MASTER"]

export function isAgeGroupEligible(
  childAgeGroup: AgeGroup,
  skillAgeGroup: AgeGroup
): boolean {
  const childIdx = AGE_GROUP_ORDER.indexOf(childAgeGroup)
  const skillIdx = AGE_GROUP_ORDER.indexOf(skillAgeGroup)
  // A child can only access skills for their own age group
  // (cross-age unlocks handled separately via XP level)
  return childIdx === skillIdx
}

export function canAccessAgeGroup(
  child: ChildSkillState,
  skillAgeGroup: AgeGroup
): boolean {
  return child.ageGroup === skillAgeGroup
}

// ─────────────────────────────────────────────────────────────
// XP RULES
// ─────────────────────────────────────────────────────────────

export function hasEnoughXP(child: ChildSkillState, skill: Skill): boolean {
  return child.xp >= skill.unlockXP
}

// ─────────────────────────────────────────────────────────────
// STREAK BONUS RULES
// ─────────────────────────────────────────────────────────────

export function getStreakBonus(streakDays: number): number {
  if (streakDays >= 30) return 0.5  // +50% XP
  if (streakDays >= 14) return 0.3  // +30% XP
  if (streakDays >= 7)  return 0.2  // +20% XP
  if (streakDays >= 3)  return 0.1  // +10% XP
  return 0
}

export function applyStreakBonus(baseXP: number, streakDays: number): number {
  return Math.round(baseXP * (1 + getStreakBonus(streakDays)))
}

// ─────────────────────────────────────────────────────────────
// DIFFICULTY ADAPTATION RULES
// ─────────────────────────────────────────────────────────────

type AdaptedDifficulty = "EASY" | "MEDIUM" | "HARD"

export function adaptDifficulty(
  child: ChildSkillState,
  recentScores: number[]
): AdaptedDifficulty {
  if (recentScores.length === 0) return "EASY"

  const avg = recentScores.reduce((a, b) => a + b, 0) / recentScores.length
  const streak = child.streakDays

  // High performer with streak → push harder
  if (avg >= 85 && streak >= 5) return "HARD"
  // Good performance → standard
  if (avg >= 65) return "MEDIUM"
  // Struggling → ease off
  return "EASY"
}

// ─────────────────────────────────────────────────────────────
// PREMIUM RULES
// ─────────────────────────────────────────────────────────────

export function canAccessPremiumSkill(
  skill: Skill,
  hasPremiumAccess: boolean
): boolean {
  return !skill.isPremium || hasPremiumAccess
}

// ─────────────────────────────────────────────────────────────
// PROGRESSION GATE RULES
// ─────────────────────────────────────────────────────────────

// Minimum completion % before unlocking next difficulty tier
export const MIN_COMPLETION_FOR_NEXT_TIER = 0.6 // 60%

export function hasMinimumCompletionForTier(
  child: ChildSkillState,
  ageGroupSkillIds: string[]
): boolean {
  if (ageGroupSkillIds.length === 0) return true
  const completed = ageGroupSkillIds.filter((id) =>
    child.completedSkillIds.has(id)
  ).length
  return completed / ageGroupSkillIds.length >= MIN_COMPLETION_FOR_NEXT_TIER
}

// ─────────────────────────────────────────────────────────────
// ORDERING RULES — how to rank available skills
// ─────────────────────────────────────────────────────────────

type SkillScore = { skill: Skill; score: number }

export function rankAvailableSkills(
  skills: Skill[],
  child: ChildSkillState,
  preferCategories: string[] = []
): Skill[] {
  const scored: SkillScore[] = skills.map((skill) => {
    let score = 100

    // Prefer skills in progress
    if (child.inProgressSkillIds.has(skill.id)) score += 50

    // Prefer lower XP threshold (more accessible)
    score -= Math.floor(skill.unlockXP / 10)

    // Prefer preferred categories
    if (preferCategories.includes(skill.category)) score += 30

    // Slight preference for easier skills when streak is low
    if (child.streakDays < 3) {
      if (skill.difficulty === "EASY") score += 20
      if (skill.difficulty === "HARD") score -= 20
    }

    // Depth-first: prefer skills that unlock more dependents
    score += skill.prerequisites.length * 5

    return { skill, score }
  })

  return scored
    .sort((a, b) => b.score - a.score)
    .map((s) => s.skill)
}
