import { getTomorrowPreview } from "@/src/lib/learning/tomorrowPreview"
import { getHeroTitle } from "@/src/lib/hero/titles"
import type { DomainSignals } from "./signals"
import type { UXPolicy } from "./uxPolicyEngine"
import type { DailyUXInput, DailyUXState, Milestone } from "./types"

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

export function mapToUXState(
  input: DailyUXInput,
  signals: DomainSignals,
  policy: UXPolicy,
): DailyUXState {
  const { engagement, learning, emotional, retention } = signals
  const { todayState, childId, ageGroup, xp, level, streakDays, childCreatedAt, completedSkillIds } = input

  // ── Hero title + tomorrow preview ─────────────────────────────
  const heroTitle = getHeroTitle(level)

  const tomorrowPreview = getTomorrowPreview({
    childId, ageGroup, xp, level, streakDays,
    childCreatedAt, completedSkillIds,
    currentDay: todayState.currentDay,
  })

  // ── Secondary actions — sliced by policy.secondaryCount ───────
  const secondaryActions = policy.sessionState === "day_done"
    ? learning.secondaryActions
    : learning.secondaryActions.slice(0, policy.secondaryCount)

  // ── XP display ────────────────────────────────────────────────
  const xpDisplay = todayState.today.xpReward
  const xpLabel: string | null =
    engagement.dailyLoad === "LOW"  ? "Lekki tryb" :
    engagement.dailyLoad === "HIGH" ? "Deep Focus"  :
    null

  // ── Navigation ────────────────────────────────────────────────
  const nextBestActionHref =
    !todayState.lessonDoneToday ? input.nextLessonHref :
    !todayState.quizDoneToday   ? input.nextQuizHref   :
    "/missions"

  // ── Milestone ─────────────────────────────────────────────────
  const prideMilestone = detectMilestone(level, todayState.currentDay, todayState.dayProgressPercent)

  return {
    // Actions
    primaryAction: learning.heroAction,
    secondaryActions,

    // Finn
    finnLine:     policy.finnLine,
    finnChatLine: policy.finnChatLine,

    // UI
    uiMode:        policy.uiMode,
    visualDensity: policy.visualDensity,
    pacingLabel:   engagement.pacingLabel,

    // Progress
    dayProgressPercent: todayState.dayProgressPercent,
    currentDay:         todayState.currentDay,
    dayTheme:           learning.dayTheme,
    xpDisplay,
    xpLabel,

    // Session
    sessionState:       policy.sessionState,
    sessionEndDetected: emotional.sessionEndDetected,
    endMessage:         emotional.endMessage,
    tomorrowPreview,
    isDay30Complete:    todayState.currentDay === 30 && learning.allDone,

    // Sections
    showMap:         true,
    showDiscoveries: true,

    // Navigation
    nextBestActionHref,

    // Comeback
    showComeback:       policy.showComeback,
    comebackDaysSince:  todayState.daysSinceLastVisit,
    comebackDailyReward: emotional.dailyReward,
    comebackFinnNudge:  retention.finnNudgeMessage,

    // Rare reward
    showRareBanner:   policy.showRareBanner,
    rareBannerMessage: emotional.dailyReward.rewardMessage,

    // Milestone
    prideMilestone,

    // Identity
    heroTitle,

    // Mission pass-throughs
    activeMissionId:     todayState.activeMissionId,
    missionTitle:        todayState.today.mission.title,
    missionDescription:  todayState.today.mission.description,
    missionRealLifeTask: todayState.today.mission.realLifeTask,
    lessonHook:          todayState.today.lesson.hook ?? null,

    // AiMentor
    pulseStatus:      retention.pulseStatus,
    growthTopStrength: emotional.topStrengthName,
  }
}
