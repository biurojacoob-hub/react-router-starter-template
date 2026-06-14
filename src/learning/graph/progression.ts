import { SKILLS_BY_ID } from "./skills"
import { getSkillsByAgeGroup, topologicalSort, getDependents } from "./graph"
import { checkPrerequisites, getShortestPathTo } from "./prerequisites"
import {
  canAccessAgeGroup,
  hasEnoughXP,
  canAccessPremiumSkill,
  rankAvailableSkills,
} from "./rules"
import type {
  Skill,
  ChildSkillState,
  SkillUnlockResult,
  LearningPath,
  ProgressionContext,
  SkillNode,
} from "./types"

// ─────────────────────────────────────────────────────────────
// canUnlockSkill
// ─────────────────────────────────────────────────────────────

export function canUnlockSkill(
  child: ChildSkillState,
  skillId: string,
  hasPremiumAccess = false
): SkillUnlockResult {
  const skill = SKILLS_BY_ID[skillId]
  if (!skill) return { success: false, reason: "PREREQUISITES_NOT_MET" }

  if (child.unlockedSkillIds.has(skillId)) {
    return { success: false, reason: "ALREADY_UNLOCKED" }
  }

  if (!canAccessAgeGroup(child, skill.ageGroup)) {
    return { success: false, reason: "WRONG_AGE_GROUP" }
  }

  if (!hasEnoughXP(child, skill)) {
    return { success: false, reason: "INSUFFICIENT_XP" }
  }

  if (!canAccessPremiumSkill(skill, hasPremiumAccess)) {
    return { success: false, reason: "PREREQUISITES_NOT_MET" }
  }

  const prereqCheck = checkPrerequisites(child, skill)
  if (!prereqCheck.met) {
    return { success: false, reason: "PREREQUISITES_NOT_MET" }
  }

  return { success: true, skill }
}

// ─────────────────────────────────────────────────────────────
// unlockSkill — returns updated state (immutable)
// ─────────────────────────────────────────────────────────────

export function unlockSkill(
  child: ChildSkillState,
  skillId: string,
  hasPremiumAccess = false
): { state: ChildSkillState; result: SkillUnlockResult } {
  const result = canUnlockSkill(child, skillId, hasPremiumAccess)
  if (!result.success) return { state: child, result }

  return {
    state: {
      ...child,
      unlockedSkillIds: new Set([...child.unlockedSkillIds, skillId]),
      inProgressSkillIds: new Set([...child.inProgressSkillIds, skillId]),
    },
    result,
  }
}

// ─────────────────────────────────────────────────────────────
// getAvailableSkills — skills the child can unlock right now
// ─────────────────────────────────────────────────────────────

export function getAvailableSkills(
  child: ChildSkillState,
  hasPremiumAccess = false
): Skill[] {
  const ageGroupSkills = getSkillsByAgeGroup(child.ageGroup)

  return ageGroupSkills.filter((skill) => {
    if (child.completedSkillIds.has(skill.id)) return false
    if (child.unlockedSkillIds.has(skill.id)) return false
    const result = canUnlockSkill(child, skill.id, hasPremiumAccess)
    return result.success
  })
}

// ─────────────────────────────────────────────────────────────
// determineNextSkill — single best skill to work on next
// ─────────────────────────────────────────────────────────────

export function determineNextSkill(
  ctx: ProgressionContext,
  hasPremiumAccess = false
): Skill | null {
  const { child, preferWeakCategories = [], forceCategory } = ctx

  // 1. First, finish anything in progress
  if (child.inProgressSkillIds.size > 0) {
    const inProgress = Array.from(child.inProgressSkillIds)
      .map((id) => SKILLS_BY_ID[id])
      .filter((s): s is Skill => s !== undefined)
    if (inProgress.length > 0) return inProgress[0]!
  }

  // 2. Get all available skills
  let available = getAvailableSkills(child, hasPremiumAccess)

  if (available.length === 0) return null

  // 3. If a category is forced, filter to it
  if (forceCategory) {
    const forced = available.filter((s) => s.category === forceCategory)
    if (forced.length > 0) available = forced
  }

  // 4. Rank by rules and preferences
  const ranked = rankAvailableSkills(
    available,
    child,
    preferWeakCategories.length > 0 ? preferWeakCategories : []
  )

  return ranked[0] ?? null
}

// ─────────────────────────────────────────────────────────────
// buildLearningPath — full ordered path for the child
// ─────────────────────────────────────────────────────────────

export function buildLearningPath(
  child: ChildSkillState,
  hasPremiumAccess = false
): LearningPath {
  const ageGroupSkills = getSkillsByAgeGroup(child.ageGroup)

  // Filter to accessible skills (premium check)
  const accessibleSkills = ageGroupSkills.filter(
    (s) => canAccessPremiumSkill(s, hasPremiumAccess)
  )

  // Sort topologically
  const sorted = topologicalSort(accessibleSkills)

  // Filter out already completed
  const remaining = sorted.filter(
    (s) => !child.completedSkillIds.has(s.id)
  )

  const currentCtx: ProgressionContext = { child }
  const current = determineNextSkill(currentCtx, hasPremiumAccess)

  const sessionsPerWeek = child.streakDays >= 5 ? 5 : child.streakDays >= 3 ? 3 : 2
  const avgMinutesPerSession = 15
  const totalMinutes = remaining.reduce((sum, s) => sum + s.estimatedMinutes, 0)
  const estimatedWeeks = Math.ceil(
    totalMinutes / (sessionsPerWeek * avgMinutesPerSession)
  )

  return {
    childId: child.childId,
    orderedSkills: remaining,
    currentSkillId: current?.id ?? null,
    completedCount: child.completedSkillIds.size,
    totalCount: accessibleSkills.length,
    estimatedWeeks,
  }
}

// ─────────────────────────────────────────────────────────────
// getSkillTree — full tree with unlock/completion state
// ─────────────────────────────────────────────────────────────

export function getSkillTree(
  child: ChildSkillState,
  _hasPremiumAccess = false
): SkillNode[] {
  const ageGroupSkills = getSkillsByAgeGroup(child.ageGroup)

  return ageGroupSkills.map((skill) => {
    const depthMap = new Map<string, number>()

    function computeDepth(id: string, seen = new Set<string>()): number {
      if (depthMap.has(id)) return depthMap.get(id)!
      if (seen.has(id)) return 0
      seen.add(id)
      const s = SKILLS_BY_ID[id]
      if (!s || s.prerequisites.length === 0) {
        depthMap.set(id, 0)
        return 0
      }
      const d = Math.max(...s.prerequisites.map((p) => computeDepth(p, seen))) + 1
      depthMap.set(id, d)
      return d
    }

    return {
      ...skill,
      depth: computeDepth(skill.id),
      unlocked: child.unlockedSkillIds.has(skill.id),
      completed: child.completedSkillIds.has(skill.id),
      inProgress: child.inProgressSkillIds.has(skill.id),
    }
  })
}

// ─────────────────────────────────────────────────────────────
// completeSkill — mark skill done, return unlocked dependents
// ─────────────────────────────────────────────────────────────

export function completeSkill(
  child: ChildSkillState,
  skillId: string
): { state: ChildSkillState; newlyAvailable: Skill[] } {
  const newCompleted = new Set([...child.completedSkillIds, skillId])
  const newInProgress = new Set(child.inProgressSkillIds)
  newInProgress.delete(skillId)
  const newUnlocked = new Set([...child.unlockedSkillIds, skillId])

  const updatedChild: ChildSkillState = {
    ...child,
    completedSkillIds: newCompleted,
    inProgressSkillIds: newInProgress,
    unlockedSkillIds: newUnlocked,
  }

  // Find skills that just became available
  const dependents = getDependents(skillId)
  const newlyAvailable = dependents
    .map((id) => SKILLS_BY_ID[id])
    .filter((s): s is Skill => s !== undefined)
    .filter((s) => {
      const result = canUnlockSkill(updatedChild, s.id)
      return result.success
    })

  return { state: updatedChild, newlyAvailable }
}

// ─────────────────────────────────────────────────────────────
// getRecommendedPath — shortest path to unlock a target skill
// ─────────────────────────────────────────────────────────────

export function getRecommendedPathTo(
  child: ChildSkillState,
  targetSkillId: string
): Skill[] {
  if (child.completedSkillIds.has(targetSkillId)) return []
  const blocking = getShortestPathTo(child, targetSkillId)
  const target = SKILLS_BY_ID[targetSkillId]
  return target ? [...blocking, target] : blocking
}
