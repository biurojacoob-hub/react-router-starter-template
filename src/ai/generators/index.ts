import { generateJSON } from "../client"
import {
  lessonSystemPrompt,
  lessonUserPrompt,
  quizSystemPrompt,
  quizUserPrompt,
  missionSystemPrompt,
  missionUserPrompt,
  dailyPlanSystemPrompt,
  dailyPlanUserPrompt,
} from "../prompts"
import { checkSafety } from "../safety"
import { SKILLS_BY_ID } from "@/src/learning/graph/skills"
import type {
  AgeGroup,
  ChildLearningProfile,
  Difficulty,
  AIGeneratedLesson,
  AIGeneratedQuiz,
  Mission,
  DailyPlan,
} from "../types"
import type { Skill } from "@/src/learning/graph/types"

function validateLesson(raw: unknown): AIGeneratedLesson {
  if (!raw || typeof raw !== "object") throw new Error("Invalid lesson format")
  const r = raw as Record<string, unknown>
  if (typeof r.title !== "string") throw new Error("Lesson missing title")
  if (!Array.isArray(r.contentBlocks)) throw new Error("Lesson missing contentBlocks")
  if (!r.metadata || typeof r.metadata !== "object") throw new Error("Lesson missing metadata")
  return raw as AIGeneratedLesson
}

function validateQuiz(raw: unknown): AIGeneratedQuiz {
  if (!raw || typeof raw !== "object") throw new Error("Invalid quiz format")
  const r = raw as Record<string, unknown>
  if (typeof r.title !== "string") throw new Error("Quiz missing title")
  if (!Array.isArray(r.questions) || r.questions.length === 0) throw new Error("Quiz missing questions")
  if (!r.metadata || typeof r.metadata !== "object") throw new Error("Quiz missing metadata")
  return raw as AIGeneratedQuiz
}

function validateMission(raw: unknown): Mission {
  if (!raw || typeof raw !== "object") throw new Error("Invalid mission format")
  const r = raw as Record<string, unknown>
  if (typeof r.title !== "string") throw new Error("Mission missing title")
  if (!Array.isArray(r.tasks)) throw new Error("Mission missing tasks")
  return raw as Mission
}

function validateDailyPlan(raw: unknown): DailyPlan {
  if (!raw || typeof raw !== "object") throw new Error("Invalid daily plan format")
  const r = raw as Record<string, unknown>
  if (!Array.isArray(r.items) || r.items.length === 0) throw new Error("Daily plan missing items")
  return raw as DailyPlan
}

// ─────────────────────────────────────────────────────────────
// SKILL-BOUND generators — AI MUST operate within the graph
// ─────────────────────────────────────────────────────────────

export async function generateLessonForSkill(
  skillId: string,
  difficulty: Difficulty = "MEDIUM",
  profile?: Partial<ChildLearningProfile>
): Promise<AIGeneratedLesson> {
  const skill = SKILLS_BY_ID[skillId]
  if (!skill) throw new Error(`Unknown skill: ${skillId}`)

  return generateLesson(skill.name, skill.ageGroup as AgeGroup, difficulty, {
    ...profile,
    skillContext: skill,
  })
}

export async function generateQuizForSkill(
  skillId: string,
  lessonContent: string,
  difficulty: Difficulty = "MEDIUM"
): Promise<AIGeneratedQuiz> {
  const skill = SKILLS_BY_ID[skillId]
  if (!skill) throw new Error(`Unknown skill: ${skillId}`)

  return generateQuiz(skill.name, lessonContent, skill.ageGroup as AgeGroup, difficulty)
}

export async function generateMissionForSkill(
  skillId: string,
  profile: ChildLearningProfile
): Promise<Mission> {
  const skill = SKILLS_BY_ID[skillId]
  if (!skill) throw new Error(`Unknown skill: ${skillId}`)

  const system = missionSystemPrompt(skill.ageGroup as AgeGroup)
  const user = missionUserPrompt({ ...profile, skillFocus: skill.name } as ChildLearningProfile & { skillFocus: string })
  return generateJSON(system, user, validateMission)
}

// ─────────────────────────────────────────────────────────────
// Internal generators (used by skill-bound functions above)
// ─────────────────────────────────────────────────────────────

export async function generateLesson(
  topic: string,
  ageGroup: AgeGroup,
  difficulty: Difficulty = "MEDIUM",
  profile?: Partial<ChildLearningProfile> & { skillContext?: Skill }
): Promise<AIGeneratedLesson> {
  const system = lessonSystemPrompt(ageGroup)
  const user = lessonUserPrompt(topic, ageGroup, difficulty, profile)
  const lesson = await generateJSON(system, user, validateLesson)

  const safetyCheck = checkSafety(
    lesson.contentBlocks.map((b) => JSON.stringify(b.content)).join(" ")
  )
  if (!safetyCheck.safe) {
    throw new Error(`Unsafe content generated: ${safetyCheck.violations.join("; ")}`)
  }

  return lesson
}

export async function generateQuiz(
  lessonTitle: string,
  lessonContent: string,
  ageGroup: AgeGroup,
  difficulty: Difficulty = "MEDIUM"
): Promise<AIGeneratedQuiz> {
  const system = quizSystemPrompt(ageGroup)
  const user = quizUserPrompt(lessonTitle, lessonContent, ageGroup, difficulty)
  const quiz = await generateJSON(system, user, validateQuiz)

  for (const q of quiz.questions) {
    const check = checkSafety(q.question + " " + q.explanation)
    if (!check.safe) {
      throw new Error(`Unsafe quiz content: ${check.violations.join("; ")}`)
    }
  }

  return quiz
}

export async function generateMission(
  profile: ChildLearningProfile
): Promise<Mission> {
  const system = missionSystemPrompt(profile.ageGroup)
  const user = missionUserPrompt(profile)
  return generateJSON(system, user, validateMission)
}

export async function generateDailyPlan(
  profile: ChildLearningProfile
): Promise<DailyPlan> {
  const system = dailyPlanSystemPrompt(profile.ageGroup)
  const user = dailyPlanUserPrompt(profile)
  return generateJSON(system, user, validateDailyPlan)
}
