import { ALL_SKILLS, SKILLS_BY_ID } from "./skills"
import type { Skill, SkillCategory, AgeGroup } from "./types"

type AdjacencyList = Map<string, Set<string>>

let _dependentsCache: AdjacencyList | null = null
let _depthCache: Map<string, number> | null = null

function buildDependentsMap(): AdjacencyList {
  if (_dependentsCache) return _dependentsCache
  const map: AdjacencyList = new Map()
  for (const skill of ALL_SKILLS) {
    if (!map.has(skill.id)) map.set(skill.id, new Set())
    for (const prereq of skill.prerequisites) {
      if (!map.has(prereq)) map.set(prereq, new Set())
      map.get(prereq)!.add(skill.id)
    }
  }
  _dependentsCache = map
  return map
}

function computeDepths(): Map<string, number> {
  if (_depthCache) return _depthCache
  const depths = new Map<string, number>()
  const roots = ALL_SKILLS.filter((s) => s.prerequisites.length === 0)

  const visited = new Set<string>()
  const queue: Array<{ id: string; depth: number }> = roots.map((r) => ({
    id: r.id,
    depth: 0,
  }))

  while (queue.length > 0) {
    const item = queue.shift()!
    if (visited.has(item.id)) continue
    visited.add(item.id)
    depths.set(item.id, item.depth)
    const dependents = buildDependentsMap().get(item.id) ?? new Set()
    for (const dep of dependents) {
      queue.push({ id: dep, depth: item.depth + 1 })
    }
  }

  _depthCache = depths
  return depths
}

export function getSkillById(id: string): Skill | undefined {
  return SKILLS_BY_ID[id]
}

export function getSkillDepth(skillId: string): number {
  return computeDepths().get(skillId) ?? 0
}

export function getDirectPrerequisites(skillId: string): Skill[] {
  const skill = SKILLS_BY_ID[skillId]
  if (!skill) return []
  return skill.prerequisites.map((id) => SKILLS_BY_ID[id]).filter((s): s is Skill => s !== undefined)
}

export function getAllPrerequisites(skillId: string): Set<string> {
  const result = new Set<string>()
  const skill = SKILLS_BY_ID[skillId]
  if (!skill) return result

  const stack = [...skill.prerequisites]
  while (stack.length > 0) {
    const id = stack.pop()!
    if (result.has(id)) continue
    result.add(id)
    const parent = SKILLS_BY_ID[id]
    if (parent) stack.push(...parent.prerequisites)
  }
  return result
}

export function getDependents(skillId: string): string[] {
  return Array.from(buildDependentsMap().get(skillId) ?? [])
}

export function getSkillsByAgeGroup(ageGroup: AgeGroup): Skill[] {
  return ALL_SKILLS.filter((s) => s.ageGroup === ageGroup)
}

export function getSkillsByCategory(category: SkillCategory): Skill[] {
  return ALL_SKILLS.filter((s) => s.category === category)
}

export function getRootSkills(ageGroup: AgeGroup): Skill[] {
  return ALL_SKILLS.filter(
    (s) => s.ageGroup === ageGroup && s.prerequisites.length === 0
  )
}

export function getLeafSkills(ageGroup: AgeGroup): Skill[] {
  const dependents = buildDependentsMap()
  return ALL_SKILLS.filter(
    (s) =>
      s.ageGroup === ageGroup &&
      (dependents.get(s.id)?.size ?? 0) === 0
  )
}

export function topologicalSort(skills: Skill[]): Skill[] {
  const inDegree = new Map<string, number>()
  const localIds = new Set(skills.map((s) => s.id))

  for (const s of skills) {
    inDegree.set(s.id, s.prerequisites.filter((p) => localIds.has(p)).length)
  }

  const queue = skills
    .filter((s) => (inDegree.get(s.id) ?? 0) === 0)
    .sort((a, b) => a.unlockXP - b.unlockXP)

  const result: Skill[] = []
  const dependents = buildDependentsMap()

  while (queue.length > 0) {
    const current = queue.shift()!
    result.push(current)
    for (const depId of dependents.get(current.id) ?? []) {
      if (!localIds.has(depId)) continue
      const newDegree = (inDegree.get(depId) ?? 0) - 1
      inDegree.set(depId, newDegree)
      if (newDegree === 0) {
        const dep = SKILLS_BY_ID[depId]
        if (dep) queue.push(dep)
      }
    }
    queue.sort((a, b) => a.unlockXP - b.unlockXP)
  }

  return result
}
