import type { AgeGroup } from "@/src/learning/graph/types"

// ─────────────────────────────────────────────────────────────
// RETENTION ENGINE — core types
// ─────────────────────────────────────────────────────────────

export type AgeGroupType = AgeGroup

// ─── STREAK ──────────────────────────────────────────────────

export type StreakStatus = "ACTIVE" | "AT_RISK" | "BROKEN" | "NEW"

export type StreakState = {
  currentStreak: number        // days in a row
  longestStreak: number
  lastActivityDate: Date | null
  status: StreakStatus
  freezesAvailable: number     // streak freeze items
  freezesUsed: number
  nextMilestone: number        // next streak milestone day
  milestoneXpBonus: number     // XP bonus at next milestone
}

export type StreakMilestone = {
  day: number
  label: string
  xpBonus: number
  badgeId?: string
}

// ─── REWARDS ─────────────────────────────────────────────────

export type ChestTier = "DAILY" | "WEEKLY" | "MONTHLY" | "SURPRISE"

export type ChestReward = {
  xp: number
  badgeId?: string
  streakFreeze?: boolean
  bonusMultiplier?: number     // XP multiplier for next session
  message: string
}

export type ChestState = {
  tier: ChestTier
  isAvailable: boolean
  availableAt: Date | null     // when next chest opens
  lastOpenedAt: Date | null
}

export type RewardEvent = {
  type: "DAILY_LOGIN" | "STREAK_BONUS" | "LESSON_COMPLETE" | "QUIZ_PERFECT" | "MISSION_DONE" | "CHEST_OPENED" | "BADGE_EARNED" | "LEVEL_UP"
  xp: number
  message: string
  badgeId?: string
  timestamp: Date
}

// ─── ENGAGEMENT SCORE ────────────────────────────────────────

export type EngagementFactors = {
  lessonsCompleted: number      // 0–100 scale input
  quizAccuracyPercent: number   // 0–100
  currentStreak: number
  missionsCompleted: number
  mentorSessionsCount: number
  daysActiveThisWeek: number
  lastActivityDaysAgo: number
}

export type EngagementScore = {
  total: number                 // 0–100
  breakdown: {
    learning: number            // 0–30
    accuracy: number            // 0–20
    consistency: number         // 0–25
    missions: number            // 0–15
    mentorUsage: number         // 0–10
  }
  tier: "COLD" | "WARMING" | "ENGAGED" | "HIGHLY_ENGAGED" | "CHAMPION"
  trend: "RISING" | "STABLE" | "FALLING"
}

// ─── COMEBACK SYSTEM ─────────────────────────────────────────

export type AbsenceTier = "ONE_DAY" | "THREE_DAYS" | "SEVEN_DAYS" | "TWO_WEEKS_PLUS"

export type ComebackPlan = {
  absenceTier: AbsenceTier
  message: string
  quickWinActivity: string      // easy activity to re-engage
  xpBonus: number               // comeback XP bonus
  streakRecovery: boolean       // whether streak is recoverable
  warmupDays: number            // days of easier content before normal difficulty
}

// ─── DAILY MOTIVATION ────────────────────────────────────────

export type DailyMotivationPackage = {
  greeting: string
  motivationalMessage: string
  dailyChallenge: string
  streakMessage: string
  nextGoalPreview: string
  xpToNextLevel: number
  dailyBonusXp: number
}

// ─── ACHIEVEMENT / BADGE ─────────────────────────────────────

export type BadgeCategory =
  | "CONSISTENCY"
  | "SAVINGS"
  | "LEARNING"
  | "MISSIONS"
  | "FAMILY"
  | "MENTOR"
  | "SPEED"
  | "ACCURACY"
  | "MILESTONE"

export type Badge = {
  id: string
  name: string
  description: string
  category: BadgeCategory
  xpReward: number
  iconEmoji: string
  criteria: BadgeCriteria
  isPremium: boolean
}

export type BadgeCriteria =
  | { type: "STREAK_DAYS"; days: number }
  | { type: "LESSONS_COMPLETED"; count: number }
  | { type: "QUIZ_PERFECT_SCORE"; count: number }
  | { type: "MISSIONS_COMPLETED"; count: number }
  | { type: "MENTOR_SESSIONS"; count: number }
  | { type: "FAMILY_CHALLENGE_DONE"; count: number }
  | { type: "DAYS_ACTIVE"; count: number }
  | { type: "XP_TOTAL"; amount: number }
  | { type: "ACCURACY_THRESHOLD"; percent: number; minQuizzes: number }
  | { type: "SKILL_COMPLETED"; skillId: string }
  | { type: "ALL_SKILLS_IN_GROUP"; ageGroup: AgeGroup }
  | { type: "COMEBACK_AFTER_ABSENCE" }
  | { type: "FIRST_OF_TYPE"; activityType: string }

// ─── PROGRESSION SUMMARY ─────────────────────────────────────

export type ProgressionSummary = {
  currentXp: number
  currentLevel: number
  xpToNextLevel: number
  xpProgressPercent: number
  nextBadge: { badge: Badge; progressPercent: number } | null
  nextSkillUnlock: { skillId: string; skillName: string; xpNeeded: number } | null
  weekSummary: {
    lessonsCompleted: number
    xpEarned: number
    streakDays: number
    badgesEarned: string[]
  }
}

// ─── FAMILY RETENTION ────────────────────────────────────────

export type FamilyChallenge = {
  id: string
  title: string
  description: string
  parentTask: string
  childTask: string
  xpRewardParent: number
  xpRewardChild: number
  durationDays: number
  category: "SAVINGS" | "BUDGET" | "DISCUSSION" | "SHOPPING" | "GOALS"
}

export type FamilyGoal = {
  id: string
  title: string
  targetAmount: number         // in PLN
  currentAmount: number
  contributorsChildXp: number  // child earns XP by contributing
  durationWeeks: number
  category: "VACATION" | "GIFT" | "EXPERIENCE" | "EMERGENCY_FUND"
}

// ─── ANALYTICS ───────────────────────────────────────────────

export type RetentionIndicators = {
  childId: string
  engagementScore: number
  sevenDayRetention: boolean
  thirtyDayRetention: boolean
  dropOffRisk: "LOW" | "MEDIUM" | "HIGH"
  lastActivityAt: Date | null
  averageSessionsPerWeek: number
  peakActivityHour: number | null
  weakestSkillCategory: string | null
  completionRatePercent: number
}
