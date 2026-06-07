export type AgeGroup = "EXPLORER" | "LEARNER" | "ACHIEVER" | "MASTER"
export type Difficulty = "EASY" | "MEDIUM" | "HARD"
export type SkillCategory =
  | "MONEY_AWARENESS"
  | "SAVING"
  | "BUDGETING"
  | "GOALS"
  | "EARNING"
  | "INVESTING"
  | "RISK"
  | "DECISION_MAKING"
  | "PERSONAL_FINANCE"

export type Skill = {
  id: string
  name: string
  description: string
  ageGroup: AgeGroup
  difficulty: Difficulty
  prerequisites: string[] // skill ids
  unlockXP: number
  category: SkillCategory
  xpReward: number
  isPremium: boolean
  estimatedMinutes: number
  tags: string[]
}

export type SkillNode = Skill & {
  depth: number       // distance from root in graph
  unlocked: boolean
  completed: boolean
  inProgress: boolean
}

export type ChildSkillState = {
  childId: string
  ageGroup: AgeGroup
  xp: number
  level: number
  streakDays: number
  unlockedSkillIds: Set<string>
  completedSkillIds: Set<string>
  inProgressSkillIds: Set<string>
}

export type LearningPath = {
  childId: string
  orderedSkills: Skill[]
  currentSkillId: string | null
  completedCount: number
  totalCount: number
  estimatedWeeks: number
}

export type SkillUnlockResult =
  | { success: true; skill: Skill }
  | { success: false; reason: "PREREQUISITES_NOT_MET" | "INSUFFICIENT_XP" | "WRONG_AGE_GROUP" | "ALREADY_UNLOCKED" }

export type ProgressionContext = {
  child: ChildSkillState
  preferWeakCategories?: SkillCategory[]
  forceCategory?: SkillCategory
}
