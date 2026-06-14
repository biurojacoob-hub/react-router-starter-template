/**
 * Daily Experience Contract — emotional truth layer.
 *
 * Answers: "what should this child feel today?" BEFORE any UI decision is made.
 * Stable per day. Does not depend on UI, policy, or session state.
 * Policy engine reads this to constrain its decisions.
 */

import type { DomainSignals } from "./signals"
import type { TodayLearningState } from "@/src/lib/learning/todayState"
import type { UiMode } from "./types"

// ── Contract types ────────────────────────────────────────────────────

export type ExperiencePromise =
  | "discovery"      // normal progression — curiosity, forward motion
  | "recovery"       // fatigued/frustrated — ease, safety, one step is enough
  | "comeback"       // returning after absence — warmth, no shame, celebration of return
  | "deepFocus"      // high engagement, boredom risk — challenge, momentum, mastery
  | "milestone"      // named milestone day — pride, identity, recognition
  | "consolidation"  // day mostly done — close the loop, celebrate, preview tomorrow

export type EmotionalArc = {
  opening: string   // intended first emotion when child arrives
  peak: string      // intended highest emotional moment
  closure: string   // intended feeling when child leaves
}

export type RetentionGoal = "micro" | "partial" | "full"

export type DailyExperienceContract = {
  experiencePromise: ExperiencePromise
  emotionalArc: EmotionalArc
  allowedUXModes: UiMode[]
  forbiddenStates: string[]          // named invariants the policy must not violate
  narrativeIntent: string            // human-readable day intention
  retentionGoalForDay: RetentionGoal
}

// ── Emotional arc library ─────────────────────────────────────────────

const ARCS: Record<ExperiencePromise, EmotionalArc> = {
  discovery: {
    opening: "curiosity",
    peak:    "insight",
    closure: "satisfaction",
  },
  recovery: {
    opening: "safety",
    peak:    "relief",
    closure: "quiet pride",
  },
  comeback: {
    opening: "warmth",
    peak:    "belonging",
    closure: "renewed commitment",
  },
  deepFocus: {
    opening: "readiness",
    peak:    "flow",
    closure: "mastery",
  },
  milestone: {
    opening: "anticipation",
    peak:    "pride",
    closure: "identity shift",
  },
  consolidation: {
    opening: "completion",
    peak:    "celebration",
    closure: "forward excitement",
  },
}

// ── Narrative intent library ──────────────────────────────────────────

const NARRATIVE: Record<ExperiencePromise, string> = {
  discovery:     "Today is a discovery day — curiosity leads, one new thing at a time.",
  recovery:      "Today is an ease day — one step is victory, pressure is off.",
  comeback:      "Today is a return day — coming back matters more than what was missed.",
  deepFocus:     "Today is a mastery day — the child is ready for more, let them go deep.",
  milestone:     "Today is a pride day — a named achievement deserves full recognition.",
  consolidation: "Today is a closure day — the loop is closing, celebrate and preview tomorrow.",
}

// ── Retention goal mapping ────────────────────────────────────────────

const RETENTION_GOAL: Record<ExperiencePromise, RetentionGoal> = {
  discovery:     "full",
  recovery:      "micro",
  comeback:      "partial",
  deepFocus:     "full",
  milestone:     "full",
  consolidation: "partial",
}

// ── Allowed UI modes per promise ──────────────────────────────────────

const ALLOWED_MODES: Record<ExperiencePromise, UiMode[]> = {
  discovery:     ["EXPLORE", "FOCUS"],
  recovery:      ["RECOVERY"],
  comeback:      ["COMEBACK", "EXPLORE"],
  deepFocus:     ["FOCUS", "EXPLORE"],
  milestone:     ["EXPLORE", "FOCUS"],
  consolidation: ["EXPLORE"],
}

// ── Forbidden states per promise ──────────────────────────────────────

const FORBIDDEN: Record<ExperiencePromise, string[]> = {
  discovery:     [],
  recovery:      ["FOCUS_mode", "HIGH_density", "secondary_count_2"],
  comeback:      ["FOCUS_mode", "HIGH_density"],
  deepFocus:     ["RECOVERY_mode"],
  milestone:     [],
  consolidation: ["FOCUS_mode"],
}

// ── Experience promise derivation ─────────────────────────────────────

function deriveExperiencePromise(
  signals: DomainSignals,
  todayState: TodayLearningState,
): ExperiencePromise {
  const { engagement, learning, retention } = signals
  const { daysSinceLastVisit, isFirstLoginToday, dayProgressPercent, currentDay } = todayState

  // Comeback: returning after absence (checked first — overrides everything)
  if (isFirstLoginToday && daysSinceLastVisit >= 1) return "comeback"

  // Consolidation: day is fully or substantially done
  if (learning.allDone || dayProgressPercent >= 80) return "consolidation"

  // Milestone: named level or day milestone (stable per day)
  const _isLevelMilestone = [5, 10].includes(signals.engagement.boredomRisk > -1 ? 0 : 0)  // placeholder
  const isDayMilestone = dayProgressPercent === 100 && [7, 14, 30].includes(currentDay)
  const isLevel5or10 = false  // resolved from input.level — see note below
  if (isDayMilestone || isLevel5or10) return "milestone"

  // Recovery: child is fatigued or frustrated
  if (engagement.fatigueLevel === "high" || engagement.frustrationRisk > 55) return "recovery"

  // Deep focus: child is bored, high engagement velocity
  if (engagement.boredomRisk > 55 && engagement.frustrationRisk < 30) return "deepFocus"

  // Retention critical: treat as recovery (don't pile on a child at risk)
  if (retention.pulseStatus === "CRITICAL") return "recovery"

  return "discovery"
}

// ── Main export ───────────────────────────────────────────────────────

export type ContractInput = {
  signals: DomainSignals
  todayState: TodayLearningState
  level: number
}

export function getDailyExperienceContract(input: ContractInput): DailyExperienceContract {
  const { signals, todayState, level } = input

  // Resolve milestone check with actual level
  const isDayMilestone =
    todayState.dayProgressPercent === 100 && [7, 14, 30].includes(todayState.currentDay)
  const isLevelMilestone = level === 5 || level === 10

  // Override promise for milestones (takes priority over consolidation)
  let promise = deriveExperiencePromise(signals, todayState)
  if ((isDayMilestone || isLevelMilestone) && promise !== "comeback") {
    promise = "milestone"
  }

  return {
    experiencePromise:   promise,
    emotionalArc:        ARCS[promise],
    allowedUXModes:      ALLOWED_MODES[promise],
    forbiddenStates:     FORBIDDEN[promise],
    narrativeIntent:     NARRATIVE[promise],
    retentionGoalForDay: RETENTION_GOAL[promise],
  }
}
