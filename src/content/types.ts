// ─────────────────────────────────────────────────────────────
// CONTENT TYPES — versioned, skill-linked educational content
// ─────────────────────────────────────────────────────────────

export type ContentVersion = "1.0"

// ─── LESSON ──────────────────────────────────────────────────

export type Lesson = {
  id: string
  skillId: string
  version: ContentVersion
  order: number                // 1, 2, 3 within skill
  title: string
  learningObjective: string    // one sentence — what the child will be able to do
  estimatedMinutes: number
  introStory: string           // 2–4 sentences, storytelling hook
  explanation: string          // core concept, simple language
  example: string              // concrete real-life example
  challenge: string            // small interactive task within the lesson
  summary: string              // 1–2 sentences recap
  tags: string[]
}

// ─── QUIZ ─────────────────────────────────────────────────────

export type QuizDifficulty = "EASY" | "MEDIUM" | "HARD"

export type QuizQuestion = {
  id: string
  difficulty: QuizDifficulty
  question: string
  options: [string, string, string, string]   // always 4 options
  correctIndex: 0 | 1 | 2 | 3
  explanation: string                          // shown after answer
}

export type Quiz = {
  id: string
  skillId: string
  version: ContentVersion
  title: string
  questions: [
    QuizQuestion,   // EASY
    QuizQuestion,   // MEDIUM
    QuizQuestion,   // MEDIUM
    QuizQuestion,   // HARD
    QuizQuestion,   // HARD
  ]
}

// ─── MISSION ─────────────────────────────────────────────────

export type MissionDifficulty = "QUICK" | "STANDARD" | "CHALLENGE"

export type Mission = {
  id: string
  skillId: string
  version: ContentVersion
  order: number
  difficulty: MissionDifficulty
  title: string
  description: string
  realLifeTask: string         // concrete thing to do offline
  estimatedMinutes: number
  successCriteria: string      // how the child knows they succeeded
  parentTip?: string           // optional hint for parent to help
}

// ─── SKILL CONTENT BUNDLE ─────────────────────────────────────

export type SkillContent = {
  skillId: string
  lessons: [Lesson, Lesson, Lesson]    // exactly 3
  quiz: Quiz
  missions: [Mission, Mission, Mission] // exactly 3
}

// ─── COVERAGE REPORT ─────────────────────────────────────────

export type CoverageEntry = {
  skillId: string
  skillName: string
  ageGroup: string
  lessonsCount: number
  hasQuiz: boolean
  missionsCount: number
  isCovered: boolean
}

export type CoverageReport = {
  generatedAt: Date
  totalSkills: number
  coveredSkills: number
  totalLessons: number
  totalQuizzes: number
  totalMissions: number
  coveragePercent: number
  entries: CoverageEntry[]
  missingSkillIds: string[]
}
