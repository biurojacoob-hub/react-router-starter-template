import type { AgeGroup } from "@/src/learning/graph/types"

// ─────────────────────────────────────────────────────────────
// PHASE
// ─────────────────────────────────────────────────────────────

export type ProgramPhase =
  | "FOUNDATION"    // Days 1–5
  | "CORE"          // Days 6–15
  | "ADVANCED"      // Days 16–25
  | "INTEGRATION"   // Days 26–30

// ─────────────────────────────────────────────────────────────
// DAY ACTIVITY TYPES
// ─────────────────────────────────────────────────────────────

export type ActivityType = "LESSON" | "QUIZ" | "MISSION" | "REVIEW" | "SIMULATION"

export type LessonActivity = {
  type: "LESSON"
  skillId: string
  title: string
  hook: string            // opening story/problem (1–2 sentences)
  estimatedMinutes: number
}

export type QuizActivity = {
  type: "QUIZ"
  skillId: string
  title: string
  questionCount: number
  estimatedMinutes: number
}

export type MissionActivity = {
  type: "MISSION"
  skillId: string
  title: string
  description: string
  realLifeTask: string    // concrete thing to do in real life
  estimatedMinutes: number
}

export type ReflectionActivity = {
  type: "REFLECTION"
  question: string
  estimatedMinutes: number
}

// ─────────────────────────────────────────────────────────────
// DAILY PLAN
// ─────────────────────────────────────────────────────────────

export type DailyProgramDay = {
  day: number                   // 1–30
  title: string
  phase: ProgramPhase
  skillId: string
  skillName: string
  lesson: LessonActivity
  quiz: QuizActivity
  mission: MissionActivity
  reflection: ReflectionActivity
  xpReward: number
  estimatedMinutes: 30
  difficultyScore: number       // 1–10
  engagementHook: string        // opening hook for the day
  decisionMoment: string        // key decision/choice in the day
  rewardDescription: string     // what the child earns today
  streakMessage: string         // streak reinforcement message
  prerequisites: string[]       // skill IDs that must be completed before
  isReviewDay: boolean
  isCapstoneDay: boolean        // Days 5, 10, 15, 20, 25, 30
}

export type WeekPlan = {
  week: number          // 1–4 (+partial)
  phase: ProgramPhase
  days: DailyProgramDay[]
  weekTheme: string
  weekGoal: string
  totalXpAvailable: number
  skillsCovered: string[]
}

export type ThirtyDayProgram = {
  childId: string
  ageGroup: AgeGroup
  generatedAt: Date
  weeks: WeekPlan[]
  days: DailyProgramDay[]
  totalXpAvailable: number
  skillsCount: number
  programTitle: string
  programDescription: string
}

// ─────────────────────────────────────────────────────────────
// CHILD PROGRAM STATE (runtime tracking)
// ─────────────────────────────────────────────────────────────

export type ChildProgramState = {
  childId: string
  ageGroup: AgeGroup
  xp: number
  level: number
  streakDays: number
  completedSkillIds: Set<string>
  weakTopics: string[]
  engagementScore: number       // 1–10
  learningSpeed: "SLOW" | "AVERAGE" | "FAST"
}

// ─────────────────────────────────────────────────────────────
// DIFFICULTY CURVE
// ─────────────────────────────────────────────────────────────

export type DifficultyPoint = {
  day: number
  score: number           // 1.0–10.0
  phase: ProgramPhase
  modifier: number        // multiplier on base XP
}

// ─────────────────────────────────────────────────────────────
// ENGAGEMENT LOOP
// ─────────────────────────────────────────────────────────────

export type EngagementLoop = {
  hook: string
  learning: string
  decisionMoment: string
  reward: EngagementReward
  streakReinforcement: string
}

export type EngagementReward = {
  xp: number
  badgeHint?: string
  skillUnlock?: string
  message: string
}

// ─────────────────────────────────────────────────────────────
// BLUEPRINT — static per-day definition (age-group specific)
// ─────────────────────────────────────────────────────────────

export type DayBlueprint = {
  day: number
  skillId: string
  titleTemplate: string
  missionTask: string
  reflectionQuestion: string
  isCapstone: boolean
  isReview: boolean
  phase: ProgramPhase
}
