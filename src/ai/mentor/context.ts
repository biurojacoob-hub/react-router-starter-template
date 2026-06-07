import { SKILLS_BY_ID, ALL_SKILLS } from "@/src/learning/graph/skills"
import { getAvailableSkills, determineNextSkill } from "@/src/learning/graph/progression"
import type { Skill, SkillCategory } from "@/src/learning/graph/types"
import type { AgeGroup, MistakePattern } from "../types"
import type { MentorChildContext } from "./types"
import { buildMentorSafetyBlock } from "./safety"

// ─────────────────────────────────────────────────────────────
// BUILD CHILD CONTEXT from raw DB data
// ─────────────────────────────────────────────────────────────

type RawChildData = {
  id: string
  name: string
  ageGroup: string
  xp: number
  level: number
  streakDays: number
  skillProgress: Array<{
    skillId: string
    status: "LOCKED" | "UNLOCKED" | "IN_PROGRESS" | "COMPLETED"
  }>
  quizAttempts: Array<{
    score: number
    quiz: { lesson: { title: string } }
    answers: Array<{ correct: boolean; question: { type: string; topic?: string } }>
  }>
  aiConversations: Array<{ id: string; createdAt: Date }>
}

export function buildMentorChildContext(
  data: RawChildData,
  currentSkillId?: string
): MentorChildContext {
  const ageGroup = data.ageGroup as AgeGroup

  const unlockedSkillIds = new Set(
    data.skillProgress
      .filter((p) => p.status === "UNLOCKED" || p.status === "COMPLETED" || p.status === "IN_PROGRESS")
      .map((p) => p.skillId)
  )
  const completedSkillIds = new Set(
    data.skillProgress.filter((p) => p.status === "COMPLETED").map((p) => p.skillId)
  )
  const inProgressSkillIds = new Set(
    data.skillProgress.filter((p) => p.status === "IN_PROGRESS").map((p) => p.skillId)
  )

  const skillState = {
    childId: data.id,
    ageGroup,
    xp: data.xp,
    level: data.level,
    streakDays: data.streakDays,
    unlockedSkillIds,
    completedSkillIds,
    inProgressSkillIds,
  }

  const currentSkill = currentSkillId ? (SKILLS_BY_ID[currentSkillId] ?? null) : null

  const { weakCategories, strongCategories } = analyzeCategories(
    data.quizAttempts,
    ageGroup
  )

  const recentMistakes = extractRecentMistakes(data.quizAttempts)

  return {
    childId: data.id,
    name: data.name,
    ageGroup,
    xp: data.xp,
    level: data.level,
    streakDays: data.streakDays,
    currentSkill,
    skillState,
    recentMistakes,
    weakCategories,
    strongCategories,
    sessionCount: data.aiConversations.length,
  }
}

function analyzeCategories(
  attempts: RawChildData["quizAttempts"],
  ageGroup: AgeGroup
): { weakCategories: SkillCategory[]; strongCategories: SkillCategory[] } {
  const categoryScores: Map<SkillCategory, number[]> = new Map()

  for (const attempt of attempts) {
    const skill = ALL_SKILLS.find(
      (s) =>
        s.ageGroup === ageGroup &&
        s.name.toLowerCase().includes(attempt.quiz.lesson.title.toLowerCase().slice(0, 10))
    )
    if (!skill) continue

    const scores = categoryScores.get(skill.category) ?? []
    scores.push(attempt.score)
    categoryScores.set(skill.category, scores)
  }

  const weak: SkillCategory[] = []
  const strong: SkillCategory[] = []

  for (const [category, scores] of categoryScores.entries()) {
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length
    if (avg < 60) weak.push(category)
    else if (avg >= 80) strong.push(category)
  }

  return { weakCategories: weak, strongCategories: strong }
}

function extractRecentMistakes(
  attempts: RawChildData["quizAttempts"]
): MistakePattern[] {
  const patterns: Map<string, { frequency: number; lastSeen: Date }> = new Map()

  for (const attempt of attempts) {
    for (const answer of attempt.answers) {
      if (!answer.correct) {
        const key = answer.question.topic ?? "general"
        const existing = patterns.get(key)
        if (existing) {
          existing.frequency++
        } else {
          patterns.set(key, { frequency: 1, lastSeen: new Date() })
        }
      }
    }
  }

  return Array.from(patterns.entries())
    .map(([topic, data]) => ({
      topic,
      questionType: "MIXED",
      frequency: data.frequency,
      lastSeen: data.lastSeen,
    }))
    .sort((a, b) => b.frequency - a.frequency)
    .slice(0, 5)
}

// ─────────────────────────────────────────────────────────────
// BUILD CONTEXT SUMMARY — injected into system prompt
// ─────────────────────────────────────────────────────────────

export function buildChildContextBlock(ctx: MentorChildContext): string {
  const parts: string[] = [
    `## PROFIL UCZNIA`,
    `Imię: ${ctx.name}`,
    `Wiek/Grupa: ${ctx.ageGroup} (${ageGroupLabel(ctx.ageGroup)})`,
    `Poziom XP: ${ctx.level} (${ctx.xp} XP)`,
    `Seria nauki: ${ctx.streakDays} dni`,
    `Sesje z mentorem: ${ctx.sessionCount}`,
  ]

  if (ctx.currentSkill) {
    parts.push(`\n## AKTUALNY SKILL`)
    parts.push(`Temat: "${ctx.currentSkill.name}"`)
    parts.push(`Kategoria: ${ctx.currentSkill.category}`)
    parts.push(`Trudność: ${ctx.currentSkill.difficulty}`)
    parts.push(`Opis: ${ctx.currentSkill.description}`)
  }

  const available = getAvailableSkills(ctx.skillState)
  if (available.length > 0) {
    parts.push(`\n## NASTĘPNE DOSTĘPNE UMIEJĘTNOŚCI`)
    parts.push(available.slice(0, 3).map((s) => `- "${s.name}" (${s.category})`).join("\n"))
  }

  if (ctx.recentMistakes.length > 0) {
    parts.push(`\n## OSTATNIE BŁĘDY UCZNIA`)
    parts.push(
      ctx.recentMistakes
        .slice(0, 3)
        .map((m) => `- ${m.topic} (${m.frequency}x)`)
        .join("\n")
    )
    parts.push("Delikatnie wróć do tych tematów jeśli to możliwe.")
  }

  if (ctx.weakCategories.length > 0) {
    parts.push(`\n## SŁABE KATEGORIE`)
    parts.push(ctx.weakCategories.join(", "))
  }

  return parts.join("\n")
}

export function ageGroupLabel(ageGroup: AgeGroup): string {
  const labels: Record<AgeGroup, string> = {
    EXPLORER: "6–9 lat",
    LEARNER: "10–12 lat",
    ACHIEVER: "13–15 lat",
    MASTER: "16–18 lat",
  }
  return labels[ageGroup]
}

// ─────────────────────────────────────────────────────────────
// FIND SKILL BY TOPIC MENTION
// ─────────────────────────────────────────────────────────────

export function findSkillByMention(
  text: string,
  ageGroup: AgeGroup
): Skill | null {
  const lower = text.toLowerCase()
  const candidates = ALL_SKILLS.filter((s) => s.ageGroup === ageGroup)

  return (
    candidates.find(
      (s) =>
        lower.includes(s.name.toLowerCase()) ||
        s.tags.some((tag) => lower.includes(tag.toLowerCase()))
    ) ?? null
  )
}
