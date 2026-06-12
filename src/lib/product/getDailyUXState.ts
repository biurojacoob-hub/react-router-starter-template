/**
 * getDailyUXState — composition layer only.
 * data → signals → contract → policy → mapper → UI
 *                                   ↓
 *                              uxSnapshot (observability, read-only)
 *
 * No UX logic here. Add logic to:
 *   signals/                 — domain metrics
 *   dailyExperienceContract  — emotional intention for the day
 *   uxPolicyEngine           — mode/tone decisions (constrained by contract)
 *   uxMapper                 — component prop assembly
 *   uxSnapshot               — full reasoning trace (debug/observability)
 */

export type { UiMode, SessionState, VisualDensity, Milestone, DailyUXState, DailyUXInput } from "./types"
export type { UXSnapshot } from "./uxSnapshot"
export type { DailyExperienceContract, ExperiencePromise } from "./dailyExperienceContract"

import type { DailyUXInput, DailyUXState } from "./types"
import type { UXSnapshot } from "./uxSnapshot"
import {
  getEngagementSignals,
  getLearningSignals,
  getEmotionalSignals,
  getRetentionSignals,
  type DomainSignals,
} from "./signals"
import { getDailyExperienceContract } from "./dailyExperienceContract"
import { getUXPolicy } from "./uxPolicyEngine"
import { mapToUXState } from "./uxMapper"
import { getUXSnapshot } from "./uxSnapshot"

// ── Internal pipeline — shared by both exports ────────────────────────

function runPipeline(input: DailyUXInput) {
  const { childId, level, streakDays,
          lessonsCompleted, missionsCompleted, badgesEarned, todayState, nextLessonHref, nextQuizHref } = input

  const learning = getLearningSignals(todayState, nextLessonHref, nextQuizHref)

  const engagement = getEngagementSignals({
    lessonsCompleted, missionsCompleted, streakDays,
    daysSinceLastVisit: todayState.daysSinceLastVisit,
    currentDay: todayState.currentDay,
    level,
    dayProgressPercent: todayState.dayProgressPercent,
    heroActionDone: learning.heroActionDone,
    isFirstLoginToday: todayState.isFirstLoginToday,
  })

  const emotional = getEmotionalSignals({
    todayState, learning, childId, streakDays, missionsCompleted,
    badgesEarned, level, lessonsCompleted,
    finnEmotionalTone: engagement.finnEmotionalTone,
  })

  const retention = getRetentionSignals({
    daysSinceLastVisit: todayState.daysSinceLastVisit,
    streakDays,
    dayProgressPercent: todayState.dayProgressPercent,
    heroActionDone: learning.heroActionDone,
    currentDay: todayState.currentDay,
    isFirstLoginToday: todayState.isFirstLoginToday,
  })

  const signals: DomainSignals = { engagement, learning, emotional, retention }
  const contract = getDailyExperienceContract({ signals, todayState, level })
  const policy   = getUXPolicy(signals, todayState, contract)
  const ux       = mapToUXState(input, signals, policy)

  return { signals, contract, policy, ux }
}

// ── Safe fallback — returned when the pipeline throws ─────────────────

function makeFallbackUXState(input: DailyUXInput): DailyUXState {
  const safeHref = input.nextLessonHref ?? "/courses"
  return {
    primaryAction: { type: "lesson", title: "Zacznij lekcję", href: safeHref, estimatedMin: 5, done: false, locked: false },
    secondaryActions: [],
    finnLine: "Chodź, zaczniemy od nowa!",
    finnChatLine: "Hej! Jestem tu, żeby ci pomóc.",
    uiMode: "EXPLORE",
    visualDensity: "NORMAL",
    pacingLabel: "",
    dayProgressPercent: 0,
    currentDay: 1,
    dayTheme: "",
    xpDisplay: input.xp ?? 0,
    xpLabel: null,
    sessionState: "active",
    sessionEndDetected: false,
    endMessage: "",
    tomorrowPreview: null,
    isDay30Complete: false,
    showMap: false,
    showDiscoveries: false,
    nextBestActionHref: safeHref,
    showComeback: false,
    comebackDaysSince: 0,
    comebackDailyReward: {
      xpMultiplier: 1,
      rareEventChance: 0,
      rewardType: "normal",
      rewardMessage: "",
      isRare: false,
    },
    comebackFinnNudge: "",
    showRareBanner: false,
    rareBannerMessage: "",
    prideMilestone: null,
    heroTitle: { title: "Uczący się", emoji: "📚", tagline: "Zaczynamy!" },
    activeMissionId: null,
    missionTitle: "",
    missionDescription: "",
    missionRealLifeTask: "",
    lessonHook: null,
    pulseStatus: "SAFE",
    growthTopStrength: "",
  }
}

// ── Public API ────────────────────────────────────────────────────────

/** Production path — returns only the UI state. */
export function getDailyUXState(input: DailyUXInput): DailyUXState {
  try {
    return runPipeline(input).ux
  } catch (err) {
    console.error("[getDailyUXState] pipeline error — returning fallback", err)
    return makeFallbackUXState(input)
  }
}

/** Debug path — returns UI state + full observability snapshot. */
export function getDailyUXStateWithSnapshot(
  input: DailyUXInput,
): { ux: DailyUXState; snapshot: UXSnapshot } {
  const { signals, contract, policy, ux } = runPipeline(input)
  const snapshot = getUXSnapshot(signals, contract, policy, ux)
  return { ux, snapshot }
}
