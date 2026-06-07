import { SKILLS_BY_ID } from "./skills"
import { getAllPrerequisites } from "./graph"
import type { ChildSkillState, Skill } from "./types"

export type PrerequisiteCheckResult =
  | { met: true }
  | { met: false; missing: Skill[]; missingXP: number }

export function checkPrerequisites(
  child: ChildSkillState,
  skill: Skill
): PrerequisiteCheckResult {
  const missing: Skill[] = []

  for (const prereqId of skill.prerequisites) {
    if (!child.completedSkillIds.has(prereqId)) {
      const prereq = SKILLS_BY_ID[prereqId]
      if (prereq) missing.push(prereq)
    }
  }

  const missingXP = Math.max(0, skill.unlockXP - child.xp)

  if (missing.length === 0 && missingXP === 0) {
    return { met: true }
  }

  return { met: false, missing, missingXP }
}

export function checkAllPrerequisitesRecursive(
  child: ChildSkillState,
  skillId: string
): PrerequisiteCheckResult {
  const allPrereqs = getAllPrerequisites(skillId)
  const missing: Skill[] = []

  for (const prereqId of allPrereqs) {
    if (!child.completedSkillIds.has(prereqId)) {
      const prereq = SKILLS_BY_ID[prereqId]
      if (prereq) missing.push(prereq)
    }
  }

  const skill = SKILLS_BY_ID[skillId]
  const missingXP = skill ? Math.max(0, skill.unlockXP - child.xp) : 0

  if (missing.length === 0 && missingXP === 0) {
    return { met: true }
  }

  return { met: false, missing, missingXP }
}

export function getBlockingSkills(
  child: ChildSkillState,
  targetSkillId: string
): Skill[] {
  const allPrereqs = getAllPrerequisites(targetSkillId)
  return Array.from(allPrereqs)
    .filter((id) => !child.completedSkillIds.has(id))
    .map((id) => SKILLS_BY_ID[id])
    .filter((s): s is Skill => s !== undefined)
    .sort((a, b) => a.unlockXP - b.unlockXP)
}

export function getShortestPathTo(
  child: ChildSkillState,
  targetSkillId: string
): Skill[] {
  const blocking = getBlockingSkills(child, targetSkillId)
  if (blocking.length === 0) return []

  // Topological ordering of the blocking skills
  const visited = new Set<string>()
  const ordered: Skill[] = []

  function visit(skillId: string): void {
    if (visited.has(skillId)) return
    visited.add(skillId)
    const skill = SKILLS_BY_ID[skillId]
    if (!skill) return
    for (const prereq of skill.prerequisites) {
      if (!child.completedSkillIds.has(prereq)) visit(prereq)
    }
    ordered.push(skill)
  }

  for (const skill of blocking) {
    visit(skill.id)
  }

  return ordered
}
