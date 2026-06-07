import type { AgeGroup, ContentBlockType, QuestionType } from "@prisma/client"

// ─── Content blocks ────────────────────────────────────────

export type TextBlockContent = { markdown: string }
export type ImageBlockContent = { url: string; alt: string; caption?: string }
export type VideoBlockContent = { url: string; durationSeconds: number; thumbnail?: string }
export type TipBlockContent = { text: string; variant?: "info" | "warning" | "success" }
export type ChallengeBlockContent = { prompt: string; hint?: string }
export type SummaryBlockContent = { points: string[] }

export type BlockContent =
  | TextBlockContent
  | ImageBlockContent
  | VideoBlockContent
  | TipBlockContent
  | ChallengeBlockContent
  | SummaryBlockContent

export type ContentBlock = {
  id: string
  type: ContentBlockType
  orderIndex: number
  content: BlockContent
}

// ─── Quiz ─────────────────────────────────────────────────

export type QuizQuestionData = {
  id: string
  type: QuestionType
  question: string
  options: string[]
  explanation: string
  orderIndex: number
}

export type QuizData = {
  id: string
  passingScore: number
  questions: QuizQuestionData[]
}

// ─── Lesson ───────────────────────────────────────────────

export type LessonData = {
  id: string
  code: string
  title: string
  description: string
  orderIndex: number
  durationMinutes: number
  xpReward: number
  published: boolean
  contentBlocks: ContentBlock[]
  quiz: QuizData | null
}

export type LessonWithProgress = LessonData & {
  progress: {
    completed: boolean
    score: number | null
    xpEarned: number
  } | null
}

// ─── Course ───────────────────────────────────────────────

export type CourseData = {
  id: string
  code: string
  title: string
  description: string
  ageGroup: AgeGroup
  orderIndex: number
  lessonCount: number
  completedCount: number
  completionPercent: number
}

// ─── Submit quiz ──────────────────────────────────────────

export type QuizAnswer = {
  questionId: string
  answer: string | string[]
}

export type QuizResult = {
  score: number
  passed: boolean
  isPerfect: boolean
  xpEarned: number
  correctCount: number
  totalCount: number
  newBadges: string[]
  levelUp: boolean
  newLevel: number
}

// ─── Complete lesson ──────────────────────────────────────

export type CompleteLessonResult = {
  xpEarned: number
  newLevel: number
  levelUp: boolean
  newBadges: string[]
  streakDays: number
  streakIncremented: boolean
}
