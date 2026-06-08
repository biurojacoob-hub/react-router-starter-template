"use server"

import { prisma } from "@/src/lib/db"
import { canUnlockSkill } from "@/src/learning/graph/progression"
import { SKILLS_BY_ID } from "@/src/learning/graph/skills"
import type { ChildSkillState } from "@/src/learning/graph/types"

export type SkillAccessResult =
  | { allowed: true }
  | { allowed: false; reason: string; missingSkillIds: string[]; missingSkillNames: string[] }

export async function checkSkillAccess(
  childId: string,
  skillId: string
): Promise<SkillAccessResult> {
  const skill = SKILLS_BY_ID[skillId]
  if (!skill) return { allowed: true } // Unknown skill ID — allow (lesson-level content)

  const child = await prisma.childProfile.findUnique({
    where: { id: childId },
    select: {
      xp: true,
      level: true,
      streakDays: true,
      ageGroup: true,
      skillProgress: { select: { skillId: true, status: true } },
    },
  })

  if (!child) return { allowed: false, reason: "CHILD_NOT_FOUND", missingSkillIds: [], missingSkillNames: [] }

  const completedIds = child.skillProgress
    .filter((p) => p.status === "COMPLETED")
    .map((p) => p.skillId)

  const unlockedIds = child.skillProgress
    .filter((p) => p.status === "UNLOCKED" || p.status === "IN_PROGRESS" || p.status === "COMPLETED")
    .map((p) => p.skillId)

  const childState: ChildSkillState = {
    childId,
    ageGroup: child.ageGroup as ChildSkillState["ageGroup"],
    xp: child.xp,
    level: child.level,
    streakDays: child.streakDays,
    unlockedSkillIds: new Set(unlockedIds),
    completedSkillIds: new Set(completedIds),
    inProgressSkillIds: new Set(
      child.skillProgress.filter((p) => p.status === "IN_PROGRESS").map((p) => p.skillId)
    ),
  }

  const result = canUnlockSkill(childState, skillId)

  if (result.success || childState.unlockedSkillIds.has(skillId)) {
    return { allowed: true }
  }

  const missingSkillIds = (skill.prerequisites ?? []).filter(
    (prereqId) => !childState.completedSkillIds.has(prereqId)
  )
  const missingSkillNames = missingSkillIds
    .map((id) => SKILLS_BY_ID[id]?.name ?? id)

  return {
    allowed: false,
    reason: result.reason,
    missingSkillIds,
    missingSkillNames,
  }
}
