import type { AgeGroup, MistakePattern } from "../types"
import type { Skill, ChildSkillState, SkillCategory } from "@/src/learning/graph/types"

// ─────────────────────────────────────────────────────────────
// CHILD CONTEXT
// ─────────────────────────────────────────────────────────────

export type MentorChildContext = {
  childId: string
  name: string
  ageGroup: AgeGroup
  xp: number
  level: number
  streakDays: number
  currentSkill: Skill | null
  skillState: ChildSkillState
  recentMistakes: MistakePattern[]
  weakCategories: SkillCategory[]
  strongCategories: SkillCategory[]
  sessionCount: number
}

// ─────────────────────────────────────────────────────────────
// MEMORY
// ─────────────────────────────────────────────────────────────

export type ShortTermMemory = {
  sessionId: string
  childId: string
  startedAt: Date
  messages: MemoryMessage[]
  detectedMistakes: DetectedMistake[]
  topicsDiscussed: string[]
  currentFocus: string | null
  turnCount: number
}

export type LongTermMemory = {
  childId: string
  totalSessions: number
  lastSessionAt: Date | null
  persistentMistakes: DetectedMistake[]
  masteredConcepts: string[]
  preferredExplanationStyle: ExplanationStyle
  averageResponseLength: ResponseLength
  lastSkillId: string | null
}

export type MemoryMessage = {
  role: "USER" | "ASSISTANT"
  content: string
  timestamp: Date
  skillId?: string
  detectedMistake?: string
  tokensUsed?: number
}

export type DetectedMistake = {
  concept: string
  description: string
  frequency: number
  lastDetectedAt: Date
  corrected: boolean
}

export type ExplanationStyle = "STORY" | "ANALOGY" | "STEP_BY_STEP" | "EXAMPLE" | "VISUAL"
export type ResponseLength = "SHORT" | "MEDIUM" | "LONG"

// ─────────────────────────────────────────────────────────────
// CHAT
// ─────────────────────────────────────────────────────────────

export type ChatMessage = {
  role: "USER" | "ASSISTANT"
  content: string
}

export type MentorRequest = {
  childId: string
  message: string
  sessionId: string
  currentSkillId?: string
  conversationHistory: ChatMessage[]
}

export type MentorResponse = {
  message: string
  suggestedSkill?: string
  xpHint?: number
  followUpQuestions?: string[]
  detectedMistake?: string
  explanation?: string
  analogy?: string
  sessionId: string
  tokensUsed?: number
}

export type StreamToken = {
  type: "text" | "metadata" | "done"
  content: string
  metadata?: Partial<MentorResponse>
}

// ─────────────────────────────────────────────────────────────
// REASONING
// ─────────────────────────────────────────────────────────────

export type ReasoningOutput = {
  detectedTopic: string | null
  detectedSkillId: string | null
  detectedMistake: string | null
  childUnderstandingLevel: "CONFUSED" | "PARTIAL" | "GOOD" | "EXCELLENT"
  recommendedStyle: ExplanationStyle
  recommendedLength: ResponseLength
  suggestedFollowUps: string[]
  suggestedSkillId: string | null
  xpMotivationHint: number | null
}

// ─────────────────────────────────────────────────────────────
// CONTEXT WINDOW
// ─────────────────────────────────────────────────────────────

export type ContextWindow = {
  systemPrompt: string
  messages: ChatMessage[]
  childContext: MentorChildContext
  reasoning: ReasoningOutput
}

export type MentorSendOptions = {
  stream?: boolean
  maxRetries?: number
}
