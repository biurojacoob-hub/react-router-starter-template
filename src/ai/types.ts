import type { ContentBlock } from "@/src/lib/learning/types"

export type AgeGroup = "EXPLORER" | "LEARNER" | "ACHIEVER" | "MASTER"

export type Difficulty = "EASY" | "MEDIUM" | "HARD"

export type LearningSpeed = "SLOW" | "AVERAGE" | "FAST"

export type ChildLearningProfile = {
  childId: string
  ageGroup: AgeGroup
  xp: number
  level: number
  streakDays: number
  weakTopics: string[]
  strongTopics: string[]
  learningSpeed: LearningSpeed
  mistakePatterns: MistakePattern[]
  engagementScore: number
  interests: string[]
  recentTopics: string[]
}

export type MistakePattern = {
  topic: string
  questionType: string
  frequency: number
  lastSeen: Date
}

export type AIGeneratedLesson = {
  title: string
  description: string
  contentBlocks: ContentBlock[]
  metadata: LessonMetadata
}

export type LessonMetadata = {
  ageGroup: AgeGroup
  difficulty: Difficulty
  xpReward: number
  estimatedMinutes: number
  topics: string[]
  keywords: string[]
}

export type AIGeneratedQuestion = {
  question: string
  type: "SINGLE_CHOICE" | "MULTI_SELECT" | "TRUE_FALSE"
  options: string[]
  correctAnswer: string | string[]
  explanation: string
  difficulty: Difficulty
}

export type AIGeneratedQuiz = {
  title: string
  questions: AIGeneratedQuestion[]
  metadata: QuizMetadata
}

export type QuizMetadata = {
  ageGroup: AgeGroup
  difficulty: Difficulty
  xpReward: number
  topics: string[]
  passingScore: number
}

export type Mission = {
  id: string
  title: string
  description: string
  tasks: MissionTask[]
  xpReward: number
  difficulty: Difficulty
  ageGroup: AgeGroup
  topic: string
  estimatedMinutes: number
}

export type MissionTask = {
  id: string
  instruction: string
  hint?: string
  type: "REFLECTION" | "PRACTICE" | "QUIZ" | "CHALLENGE"
}

export type DailyPlan = {
  date: string
  childId: string
  items: DailyPlanItem[]
  totalEstimatedMinutes: number
  totalXpAvailable: number
  focusTopic: string
  motivationalMessage: string
}

export type DailyPlanItem = {
  order: number
  type: "LESSON" | "QUIZ" | "MISSION" | "REVIEW"
  title: string
  description: string
  estimatedMinutes: number
  xpReward: number
  topic: string
  difficulty: Difficulty
}

export type AIClientOptions = {
  maxRetries?: number
  timeoutMs?: number
}

export type StreamChunk = {
  type: "text" | "thinking" | "done"
  content: string
}

export type SafetyCheckResult = {
  safe: boolean
  violations: string[]
  sanitized?: string
}
