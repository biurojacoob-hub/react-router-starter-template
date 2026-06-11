/**
 * getDailyUXState — single source of truth for daily child experience.
 * Aggregates all existing engines (habit loop, pacing, retention, finn memory,
 * variable reward, progression illusion) into one flat object.
 * No new psychological logic — only orchestration.
 *
 * UI components receive this object and ONLY RENDER. They make no UX decisions.
 */

import type { TodayLearningState } from "@/src/lib/learning/todayState"
import type { TomorrowPreview } from "@/src/lib/learning/tomorrowPreview"
import { getTomorrowPreview } from "@/src/lib/learning/tomorrowPreview"
import { getDailyAdventureState, type AdventureAction } from "@/src/lib/learning/dailyAdventure"
import { getHabitLoopState } from "@/src/lib/habit/habitLoop"
import { getAdaptivePacingState } from "@/src/lib/pacing/adaptivePacing"
import { getRetentionState } from "@/src/lib/retention/retentionEngine"
import { getInvisibleGrowth } from "@/src/lib/progression/progressionIllusion"
import { getFinnMemoryLine } from "@/src/lib/hero/finnMemory"
import { getDailyReward, type DailyReward } from "@/src/lib/rewards/variableReward"
import { getHeroTitle, type HeroTitle } from "@/src/lib/hero/titles"
import {
  FINN_ADAPTIVE_BORED, FINN_ADAPTIVE_FRUSTRATED,
  FINN_ADAPTIVE_FATIGUED, FINN_ADAPTIVE_FLOW,
  FINN_FOCUS_GUIDE, FINN_RETENTION_NUDGE,
  DAY_COMPLETE, HERO_ACTION_COMPLETE,
  pickRandom,
} from "@/src/lib/hero/finn"
import type { AgeGroup } from "@/src/learning/graph/types"

// ─────────────────────────────────────────────────────────────
// EXPORTED TYPES
// ─────────────────────────────────────────────────────────────

export type UiMode = "FOCUS" | "EXPLORE" | "RECOVERY" | "COMEBACK"
export type SessionState = "active" | "hero_done" | "day_done"
export type VisualDensity = "LOW" | "NORMAL" | "HIGH"

export type Milestone =
  | { type: "level"; value: number }
  | { type: "day"; value: number }

export type DailyUXState = {
  // ── Core actions ────────────────────────────────────────────
  primaryAction: AdventureAction
  secondaryActions: AdventureAction[]        // 0 / 1 / 2 based on pacing

  // ── Finn — single prioritised line ──────────────────────────
  finnLine: string
  finnChatLine: string                       // for AiMentor widget (separate context)

  // ── UI mode + density ────────────────────────────────────────
  uiMode: UiMode
  visualDensity: VisualDensity
  pacingLabel: string                        // "Lekki Dzień" | "Zbalansowany" | "Deep Focus"

  // ── Progress display ─────────────────────────────────────────
  dayProgressPercent: number
  currentDay: number
  dayTheme: string
  xpDisplay: number
  xpLabel: string | null                     // "Lekki tryb" | "Deep Focus" | null

  // ── Session lifecycle ────────────────────────────────────────
  sessionState: SessionState
  sessionEndDetected: boolean
  endMessage: string
  tomorrowPreview: TomorrowPreview | null
  isDay30Complete: boolean

  // ── Section visibility ───────────────────────────────────────
  showMap: boolean
  showDiscoveries: boolean

  // ── Navigation ───────────────────────────────────────────────
  nextBestActionHref: string

  // ── Comeback ─────────────────────────────────────────────────
  showComeback: boolean
  comebackDaysSince: number
  comebackDailyReward: DailyReward
  comebackFinnNudge: string

  // ── Rare reward banner ───────────────────────────────────────
  showRareBanner: boolean
  rareBannerMessage: string

  // ── Milestone (named only: level 5/10, day 7/14/30) ─────────
  prideMilestone: Milestone | null

  // ── Identity ─────────────────────────────────────────────────
  heroTitle: HeroTitle

  // ── Sub-widget pass-throughs ─────────────────────────────────
  activeMissionId: string | null
  missionTitle: string
  missionDescription: string
  missionRealLifeTask: string
  lessonHook: string | null

  // ── AiMentor ────────────────────────────────────────────────
  pulseStatus: "SAFE" | "AT_RISK" | "CRITICAL"
  growthTopStrength: string
}

// ─────────────────────────────────────────────────────────────
// INPUTS
// ─────────────────────────────────────────────────────────────

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

// ─────────────────────────────────────────────────────────────
// MILESTONE DETECTION (lib-layer, no component import)
// ─────────────────────────────────────────────────────────────

function detectMilestone(level: number, currentDay: number, dayProgressPercent: number): Milestone | null {
  if (level === 5)  return { type: "level", value: 5 }
  if (level === 10) return { type: "level", value: 10 }
  if (dayProgressPercent === 100) {
    if (currentDay === 7)  return { type: "day", value: 7 }
    if (currentDay === 14) return { type: "day", value: 14 }
    if (currentDay === 30) return { type: "day", value: 30 }
  }
  return null
}

// ─────────────────────────────────────────────────────────────
// FINN PRIORITY RULE (single source)
// Priority: 1-retention critical → 2-fatigue/frustration → 3-focus lock → 4-memory → 5-adaptive → 6-default
// ─────────────────────────────────────────────────────────────

function resolveFinnLine(params: {
  retentionPulse: "SAFE" | "AT_RISK" | "CRITICAL"
  retentionNudge: string
  pacingTone: string
  pacingAdaptiveLine: string | null
  focusLock: boolean
  focusFinnLine: string
  memoryLine: string | null
  defaultOpening: string
  sessionState: SessionState
  finnHeroComplete: string
  finnDayComplete: string
}): string {
  const { retentionPulse, retentionNudge, pacingTone, pacingAdaptiveLine, focusLock, focusFinnLine, memoryLine, defaultOpening, sessionState, finnHeroComplete, finnDayComplete } = params

  // Closed loop gets celebration lines
  if (sessionState === "day_done")  return finnDayComplete
  if (sessionState === "hero_done") return finnHeroComplete

  // 1. Retention critical
  if (retentionPulse === "CRITICAL") return retentionNudge

  // 2. Fatigue or frustration
  if (pacingTone === "fatigued" || pacingTone === "frustrated") return pacingAdaptiveLine ?? defaultOpening

  // 3. Focus lock (mid-loop)
  if (focusLock) return focusFinnLine

  // 4. Memory line (relationship context)
  if (memoryLine) return memoryLine

  // 5. Adaptive (boredom/flow)
  if (pacingAdaptiveLine) return pacingAdaptiveLine

  // 6. Default day opening
  return defaultOpening
}

// ─────────────────────────────────────────────────────────────
// MAIN FUNCTION
// ─────────────────────────────────────────────────────────────

export function getDailyUXState(input: DailyUXInput): DailyUXState {
  const { childId, ageGroup, xp, level, streakDays, childCreatedAt, completedSkillIds, lessonsCompleted, missionsCompleted, badgesEarned, todayState, nextLessonHref, nextQuizHref } = input

  // ── Sub-systems ───────────────────────────────────────────────
  const adventure = getDailyAdventureState(todayState, nextLessonHref, nextQuizHref)

  const habitLoop = getHabitLoopState(todayState, adventure)

  const pacing = getAdaptivePacingState({
    lessonsCompleted, missionsCompleted, streakDays,
    daysSinceLastVisit: todayState.daysSinceLastVisit,
    currentDay: todayState.currentDay,
    level,
    dayProgressPercent: todayState.dayProgressPercent,
    heroActionDone: adventure.heroActionDone,
    isFirstLoginToday: todayState.isFirstLoginToday,
  })

  const retention = getRetentionState({
    daysSinceLastVisit: todayState.daysSinceLastVisit,
    streakDays,
    dayProgressPercent: todayState.dayProgressPercent,
    heroActionDone: adventure.heroActionDone,
    currentDay: todayState.currentDay,
    isFirstLoginToday: todayState.isFirstLoginToday,
  })

  const growth = getInvisibleGrowth({
    lessonsCompleted, missionsCompleted, streakDays,
    currentDay: todayState.currentDay, level, badgesEarned,
    dayProgressPercent: todayState.dayProgressPercent,
  })

  const memoryLine = getFinnMemoryLine({
    streakDays, missionsCompleted, badgesEarned,
    currentDay: todayState.currentDay, level,
    lessonsDoneTotal: lessonsCompleted,
  })

  const dailyReward = getDailyReward(childId, todayState.currentDay, streakDays)

  const tomorrowPreview = getTomorrowPreview({
    childId, ageGroup, xp, level, streakDays,
    childCreatedAt, completedSkillIds,
    currentDay: todayState.currentDay,
  })

  const heroTitle = getHeroTitle(level)

  // ── Adaptive Finn pool ────────────────────────────────────────
  const ADAPTIVE_POOLS: Record<string, string[]> = {
    bored: FINN_ADAPTIVE_BORED, frustrated: FINN_ADAPTIVE_FRUSTRATED,
    fatigued: FINN_ADAPTIVE_FATIGUED, flow: FINN_ADAPTIVE_FLOW,
  }
  const pacingAdaptiveLine = pacing.finnEmotionalTone !== "neutral"
    ? pickRandom(ADAPTIVE_POOLS[pacing.finnEmotionalTone]!)
    : null

  // ── Session state ─────────────────────────────────────────────
  const sessionState: SessionState =
    adventure.allDone        ? "day_done" :
    adventure.heroActionDone ? "hero_done" :
    "active"

  // ── UI mode ───────────────────────────────────────────────────
  const showComeback = todayState.isFirstLoginToday && todayState.daysSinceLastVisit >= 1
  let uiMode: UiMode = "EXPLORE"
  if (showComeback)                   uiMode = "COMEBACK"
  else if (pacing.dailyLoad === "LOW") uiMode = "RECOVERY"
  else if (habitLoop.shouldShowFocusLock) uiMode = "FOCUS"

  // ── Finn — single resolved line ───────────────────────────────
  const finnLine = resolveFinnLine({
    retentionPulse: retention.pulseStatus,
    retentionNudge: retention.finnNudgeMessage,
    pacingTone: pacing.finnEmotionalTone,
    pacingAdaptiveLine,
    focusLock: habitLoop.shouldShowFocusLock,
    focusFinnLine: habitLoop.finnFocusLine,
    memoryLine,
    defaultOpening: adventure.finnOpening,
    sessionState,
    finnHeroComplete: adventure.finnHeroComplete,
    finnDayComplete: adventure.finnDayComplete,
  })

  // AiMentor chat context — growth comment takes priority over memory in this widget
  const finnChatLine = growth.finnCommentOnGrowth ?? memoryLine ?? finnLine

  // ── Secondary actions — pacing drives count ───────────────────
  const secondarySlice =
    pacing.dailyLoad === "LOW"    ? 0 :
    pacing.dailyLoad === "NORMAL" ? 1 :
    2  // HIGH
  const secondaryActions = sessionState === "day_done"
    ? adventure.secondaryActions   // show all as done when complete
    : adventure.secondaryActions.slice(0, secondarySlice)

  // ── XP display ────────────────────────────────────────────────
  const xpDisplay = todayState.today.xpReward
  const xpLabel: string | null =
    pacing.dailyLoad === "LOW"  ? "Lekki tryb" :
    pacing.dailyLoad === "HIGH" ? "Deep Focus" :
    null

  // ── Navigation ────────────────────────────────────────────────
  const nextBestActionHref =
    !todayState.lessonDoneToday ? nextLessonHref :
    !todayState.quizDoneToday   ? nextQuizHref :
    "/missions"

  // ── Milestone detection ───────────────────────────────────────
  const prideMilestone = detectMilestone(level, todayState.currentDay, todayState.dayProgressPercent)

  return {
    // Actions
    primaryAction:  adventure.heroAction,
    secondaryActions,

    // Finn
    finnLine,
    finnChatLine,

    // UI
    uiMode,
    visualDensity: pacing.dailyLoad,
    pacingLabel: pacing.pacingLabel,

    // Progress
    dayProgressPercent: todayState.dayProgressPercent,
    currentDay: todayState.currentDay,
    dayTheme: adventure.dayTheme,
    xpDisplay,
    xpLabel,

    // Session
    sessionState,
    sessionEndDetected: habitLoop.sessionEndDetected,
    endMessage: habitLoop.endMessage,
    tomorrowPreview,
    isDay30Complete: todayState.currentDay === 30 && adventure.allDone,

    // Sections
    showMap: true,
    showDiscoveries: true,

    // Navigation
    nextBestActionHref,

    // Comeback
    showComeback,
    comebackDaysSince: todayState.daysSinceLastVisit,
    comebackDailyReward: dailyReward,
    comebackFinnNudge: retention.finnNudgeMessage,

    // Rare reward
    showRareBanner: !showComeback && dailyReward.isRare,
    rareBannerMessage: dailyReward.rewardMessage,

    // Milestone
    prideMilestone,

    // Identity
    heroTitle,

    // Mission pass-throughs
    activeMissionId: todayState.activeMissionId,
    missionTitle: todayState.today.mission.title,
    missionDescription: todayState.today.mission.description,
    missionRealLifeTask: todayState.today.mission.realLifeTask,
    lessonHook: todayState.today.lesson.hook ?? null,

    // AiMentor
    pulseStatus: retention.pulseStatus,
    growthTopStrength: growth.topStrengthName,
  }
}
