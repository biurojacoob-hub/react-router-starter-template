/**
 * getDailyUXState — composition layer only.
 * data → signals → policy → UI
 *
 * No UX logic here. Add logic to:
 *   signals/  — domain metrics
 *   uxPolicyEngine — mode/tone decisions
 *   uxMapper — component prop assembly
 */

export type { UiMode, SessionState, VisualDensity, Milestone, DailyUXState, DailyUXInput } from "./types"

import type { DailyUXInput, DailyUXState } from "./types"
import {
  getEngagementSignals,
  getLearningSignals,
  getEmotionalSignals,
  getRetentionSignals,
  type DomainSignals,
} from "./signals"
import { getUXPolicy } from "./uxPolicyEngine"
import { mapToUXState } from "./uxMapper"

export function getDailyUXState(input: DailyUXInput): DailyUXState {
  const { childId, ageGroup, xp, level, streakDays, childCreatedAt, completedSkillIds,
          lessonsCompleted, missionsCompleted, badgesEarned, todayState, nextLessonHref, nextQuizHref } = input

  // ── Layer 1: domain signals ───────────────────────────────────
  const engagement = getEngagementSignals({
    lessonsCompleted, missionsCompleted, streakDays,
    daysSinceLastVisit: todayState.daysSinceLastVisit,
    currentDay: todayState.currentDay,
    level,
    dayProgressPercent: todayState.dayProgressPercent,
    heroActionDone: false,  // bootstrapped; learning signals resolve true value
    isFirstLoginToday: todayState.isFirstLoginToday,
  })

  const learning = getLearningSignals(todayState, nextLessonHref, nextQuizHref)

  // Re-compute engagement with correct heroActionDone from learning signals
  const engagementFinal = getEngagementSignals({
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
    finnEmotionalTone: engagementFinal.finnEmotionalTone,
  })

  const retention = getRetentionSignals({
    daysSinceLastVisit: todayState.daysSinceLastVisit,
    streakDays,
    dayProgressPercent: todayState.dayProgressPercent,
    heroActionDone: learning.heroActionDone,
    currentDay: todayState.currentDay,
    isFirstLoginToday: todayState.isFirstLoginToday,
  })

  const signals: DomainSignals = { engagement: engagementFinal, learning, emotional, retention }

  // ── Layer 2: UX policy ────────────────────────────────────────
  const policy = getUXPolicy(signals, todayState)

  // ── Layer 3: presentation mapping ────────────────────────────
  return mapToUXState(input, signals, policy)
}
