import type { AdventureAction } from "@/src/lib/learning/dailyAdventure"
import type { TomorrowPreview } from "@/src/lib/learning/tomorrowPreview"
import type { DailyReward } from "@/src/lib/rewards/variableReward"
import type { HeroTitle } from "@/src/lib/hero/titles"

// ── Scalar types ──────────────────────────────────────────────────────
export type UiMode = "FOCUS" | "EXPLORE" | "RECOVERY" | "COMEBACK"
export type SessionState = "active" | "hero_done" | "day_done"
export type VisualDensity = "LOW" | "NORMAL" | "HIGH"

export type Milestone =
  | { type: "level"; value: number }
  | { type: "day"; value: number }

// ── Output ────────────────────────────────────────────────────────────
export type DailyUXState = {
  primaryAction: AdventureAction
  secondaryActions: AdventureAction[]

  finnLine: string
  finnChatLine: string

  uiMode: UiMode
  visualDensity: VisualDensity
  pacingLabel: string

  dayProgressPercent: number
  currentDay: number
  dayTheme: string
  xpDisplay: number
  xpLabel: string | null

  sessionState: SessionState
  sessionEndDetected: boolean
  endMessage: string
  tomorrowPreview: TomorrowPreview | null
  isDay30Complete: boolean

  showMap: boolean
  showDiscoveries: boolean

  nextBestActionHref: string

  showComeback: boolean
  comebackDaysSince: number
  comebackDailyReward: DailyReward
  comebackFinnNudge: string

  showRareBanner: boolean
  rareBannerMessage: string

  prideMilestone: Milestone | null

  heroTitle: HeroTitle

  activeMissionId: string | null
  missionTitle: string
  missionDescription: string
  missionRealLifeTask: string
  lessonHook: string | null

  pulseStatus: "SAFE" | "AT_RISK" | "CRITICAL"
  growthTopStrength: string
}

// ── Input ─────────────────────────────────────────────────────────────
import type { TodayLearningState } from "@/src/lib/learning/todayState"
import type { AgeGroup } from "@/src/learning/graph/types"

export type DailyUXInput = {
  childId: string
  ageGroup: AgeGroup
  xp: number
  level: number
  streakDays: number
  childCreatedAt: Date
  completedSkillIds: string[]
  lessonsCompleted: number
  missionsCompleted: number
  badgesEarned: number
  todayState: TodayLearningState
  nextLessonHref: string
  nextQuizHref: string
}
