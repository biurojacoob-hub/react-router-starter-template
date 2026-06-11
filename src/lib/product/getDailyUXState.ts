/**
 * getDailyUXState — composition layer only.
 * data → signals → contract → policy → UI
 *
 * No UX logic here. Add logic to:
 *   signals/                 — domain metrics
 *   dailyExperienceContract  — emotional intention for the day
 *   uxPolicyEngine           — mode/tone decisions (constrained by contract)
 *   uxMapper                 — component prop assembly
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
import { getDailyExperienceContract } from "./dailyExperienceContract"
import { getUXPolicy } from "./uxPolicyEngine"
import { mapToUXState } from "./uxMapper"

export function getDailyUXState(input: DailyUXInput): DailyUXState {
  const { childId, level, streakDays,
          lessonsCompleted, missionsCompleted, badgesEarned, todayState, nextLessonHref, nextQuizHref } = input

  // ── Layer 1: domain signals ───────────────────────────────────
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

  // ── Layer 2: daily experience contract ────────────────────────
  const contract = getDailyExperienceContract({ signals, todayState, level })

  // ── Layer 3: UX policy (constrained by contract) ──────────────
  const policy = getUXPolicy(signals, todayState, contract)

  // ── Layer 4: presentation mapping ────────────────────────────
  return mapToUXState(input, signals, policy)
}
