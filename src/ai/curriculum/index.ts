import { generateLesson, generateQuiz, generateMission, generateDailyPlan } from "../generators"
import { getRecommendedDifficulty, shouldFocusOnWeakTopics } from "../personalization"
import type {
  AgeGroup,
  ChildLearningProfile,
  AIGeneratedLesson,
  AIGeneratedQuiz,
  Mission,
  DailyPlan,
} from "../types"

const CURRICULUM_TOPICS: Record<AgeGroup, string[]> = {
  EXPLORER: [
    "Czym są pieniądze",
    "Skarbonka i oszczędzanie",
    "Dawanie i otrzymywanie",
    "Co to jest praca",
    "Kupowanie i wybieranie",
  ],
  LEARNER: [
    "Budżet kieszonkowy",
    "Oszczędzanie na cel",
    "Potrzeby i zachcianki",
    "Zarabianie pieniędzy",
    "Banki i konta",
    "Bezpieczne zakupy online",
  ],
  ACHIEVER: [
    "Budżet domowy",
    "Konto bankowe i karta",
    "Podatki — co to jest",
    "Ubezpieczenia — po co",
    "Pierwsze zarobki i planowanie",
    "Długi i kredyty — co warto wiedzieć",
    "Inflacja i wartość pieniądza w czasie",
  ],
  MASTER: [
    "Planowanie finansów osobistych",
    "Fundusz awaryjny",
    "Rozliczenia podatkowe",
    "Pierwsze konto i produkty bankowe",
    "Świadome konsumowanie",
    "Kariera i zarobki",
    "Podstawy przedsiębiorczości",
    "Globalna gospodarka — podstawy",
  ],
}

export function getCurriculumTopics(ageGroup: AgeGroup): string[] {
  return CURRICULUM_TOPICS[ageGroup] ?? CURRICULUM_TOPICS.LEARNER
}

export function selectNextTopic(profile: ChildLearningProfile): string {
  const topics = getCurriculumTopics(profile.ageGroup)

  if (shouldFocusOnWeakTopics(profile) && profile.weakTopics.length > 0) {
    const weakInCurriculum = profile.weakTopics.find((wt) =>
      topics.some((t) => t.toLowerCase().includes(wt.toLowerCase()))
    )
    if (weakInCurriculum) return weakInCurriculum
  }

  const notYetCovered = topics.filter(
    (t) =>
      !profile.recentTopics.some((rt) =>
        rt.toLowerCase().includes(t.toLowerCase())
      )
  )

  if (notYetCovered.length > 0) {
    return notYetCovered[0]!
  }

  return topics[profile.level % topics.length]!
}

export async function generateAdaptiveLesson(
  profile: ChildLearningProfile,
  topicOverride?: string
): Promise<AIGeneratedLesson> {
  const topic = topicOverride ?? selectNextTopic(profile)
  const difficulty = getRecommendedDifficulty(profile)
  return generateLesson(topic, profile.ageGroup, difficulty, profile)
}

export async function generateAdaptiveQuiz(
  lessonTitle: string,
  lessonContent: string,
  profile: ChildLearningProfile
): Promise<AIGeneratedQuiz> {
  const difficulty = getRecommendedDifficulty(profile)
  return generateQuiz(lessonTitle, lessonContent, profile.ageGroup, difficulty)
}

export async function generatePersonalizedMission(
  profile: ChildLearningProfile
): Promise<Mission> {
  return generateMission(profile)
}

export async function generatePersonalizedDailyPlan(
  profile: ChildLearningProfile
): Promise<DailyPlan> {
  return generateDailyPlan(profile)
}

export type CurriculumPlan = {
  ageGroup: AgeGroup
  topics: string[]
  currentTopicIndex: number
  recommendedNextTopic: string
  estimatedWeeksToComplete: number
}

export function buildCurriculumOverview(profile: ChildLearningProfile): CurriculumPlan {
  const topics = getCurriculumTopics(profile.ageGroup)
  const coveredCount = profile.recentTopics.length
  const currentTopicIndex = Math.min(coveredCount, topics.length - 1)
  const remainingTopics = topics.length - coveredCount
  const sessionsPerWeek = profile.learningSpeed === "FAST" ? 5 : profile.learningSpeed === "SLOW" ? 2 : 3
  const estimatedWeeksToComplete = Math.ceil(remainingTopics / sessionsPerWeek)

  return {
    ageGroup: profile.ageGroup,
    topics,
    currentTopicIndex,
    recommendedNextTopic: selectNextTopic(profile),
    estimatedWeeksToComplete,
  }
}
