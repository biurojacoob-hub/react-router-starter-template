/**
 * UX Snapshot — observability layer. Read-only. Zero UI influence.
 *
 * Captures the full reasoning path from signals → contract → policy → UI
 * so any UX decision can be traced, diffed, and reproduced deterministically.
 */

import type { DomainSignals } from "./signals"
import type { DailyExperienceContract, ExperiencePromise } from "./dailyExperienceContract"
import type { UXPolicy } from "./uxPolicyEngine"
import type { DailyUXState, UiMode } from "./types"

// ── Output types ──────────────────────────────────────────────────────

export type ReasoningStep = {
  layer: "signals" | "contract" | "policy" | "mapper"
  fact: string
}

export type ConflictFlag = {
  rule: string
  detected: string
  resolution: string
}

export type OverriddenRule = {
  layer: "policy"
  original: string
  overriddenBy: string
  reason: string
}

export type UXSnapshot = {
  finalUiState: {
    uiMode: UiMode
    sessionState: string
    experiencePromise: ExperiencePromise
    visualDensity: string
    finnLinePreview: string       // first 60 chars
    retentionGoal: string
  }
  reasoningPath: ReasoningStep[]
  conflictFlags: ConflictFlag[]
  overriddenRules: OverriddenRule[]
  explainabilityScore: number    // 0–100: how well signals → outcome can be explained
}

// ── Reasoning path builders ───────────────────────────────────────────

function buildSignalSteps(signals: DomainSignals): ReasoningStep[] {
  const { engagement, learning, emotional, retention } = signals
  const steps: ReasoningStep[] = []

  steps.push({ layer: "signals", fact: `engagement.dailyLoad=${engagement.dailyLoad}` })
  steps.push({ layer: "signals", fact: `engagement.finnEmotionalTone=${engagement.finnEmotionalTone}` })

  if (engagement.fatigueLevel !== "low") {
    steps.push({ layer: "signals", fact: `engagement.fatigueLevel=${engagement.fatigueLevel}` })
  }
  if (engagement.frustrationRisk > 30) {
    steps.push({ layer: "signals", fact: `engagement.frustrationRisk=${engagement.frustrationRisk}` })
  }
  if (engagement.boredomRisk > 30) {
    steps.push({ layer: "signals", fact: `engagement.boredomRisk=${engagement.boredomRisk}` })
  }

  steps.push({ layer: "signals", fact: `learning.heroActionDone=${learning.heroActionDone}` })
  steps.push({ layer: "signals", fact: `learning.allDone=${learning.allDone}` })

  if (emotional.shouldShowFocusLock) {
    steps.push({ layer: "signals", fact: "emotional.shouldShowFocusLock=true" })
  }
  if (emotional.memoryLine) {
    steps.push({ layer: "signals", fact: "emotional.memoryLine=present" })
  }
  if (emotional.dailyReward.isRare) {
    steps.push({ layer: "signals", fact: `emotional.dailyReward.type=${emotional.dailyReward.rewardType}` })
  }

  steps.push({ layer: "signals", fact: `retention.pulseStatus=${retention.pulseStatus}` })

  return steps
}

function buildContractSteps(contract: DailyExperienceContract): ReasoningStep[] {
  return [
    { layer: "contract", fact: `experiencePromise=${contract.experiencePromise}` },
    { layer: "contract", fact: `emotionalArc=${contract.emotionalArc.opening}→${contract.emotionalArc.peak}→${contract.emotionalArc.closure}` },
    { layer: "contract", fact: `allowedUXModes=[${contract.allowedUXModes.join(",")}]` },
    { layer: "contract", fact: `retentionGoal=${contract.retentionGoalForDay}` },
    ...(contract.forbiddenStates.length > 0
      ? [{ layer: "contract" as const, fact: `forbiddenStates=[${contract.forbiddenStates.join(",")}]` }]
      : []),
  ]
}

function buildPolicySteps(policy: UXPolicy): ReasoningStep[] {
  const steps: ReasoningStep[] = [
    { layer: "policy", fact: `uiMode=${policy.uiMode}` },
    { layer: "policy", fact: `sessionState=${policy.sessionState}` },
    { layer: "policy", fact: `visualDensity=${policy.visualDensity}` },
    { layer: "policy", fact: `secondaryCount=${policy.secondaryCount}` },
  ]
  if (policy.showComeback) steps.push({ layer: "policy", fact: "showComeback=true" })
  if (policy.showRareBanner) steps.push({ layer: "policy", fact: "showRareBanner=true" })
  return steps
}

function buildMapperSteps(ux: DailyUXState): ReasoningStep[] {
  return [
    { layer: "mapper", fact: `primaryAction.type=${ux.primaryAction.type}` },
    { layer: "mapper", fact: `secondaryActions.count=${ux.secondaryActions.length}` },
    { layer: "mapper", fact: `xpDisplay=${ux.xpDisplay}` },
    { layer: "mapper", fact: `prideMilestone=${ux.prideMilestone ? `${ux.prideMilestone.type}-${ux.prideMilestone.value}` : "none"}` },
    { layer: "mapper", fact: `isDay30Complete=${ux.isDay30Complete}` },
  ]
}

// ── Conflict detection ────────────────────────────────────────────────

function detectConflicts(
  signals: DomainSignals,
  contract: DailyExperienceContract,
  policy: UXPolicy,
): ConflictFlag[] {
  const flags: ConflictFlag[] = []

  // Focus lock fired but contract forbids FOCUS mode
  if (signals.emotional.shouldShowFocusLock && !contract.allowedUXModes.includes("FOCUS")) {
    flags.push({
      rule: "focus_lock_vs_contract",
      detected: "emotional.shouldShowFocusLock=true but FOCUS not in allowedUXModes",
      resolution: `contract overrode focus lock → uiMode=${policy.uiMode}`,
    })
  }

  // Retention CRITICAL but experience promise is not recovery
  if (signals.retention.pulseStatus === "CRITICAL" && contract.experiencePromise !== "recovery") {
    flags.push({
      rule: "critical_retention_vs_promise",
      detected: `retention.pulseStatus=CRITICAL but experiencePromise=${contract.experiencePromise}`,
      resolution: "finnLine uses retention nudge (priority rule 3)",
    })
  }

  // HIGH density forbidden but engagement demanded it
  if (
    contract.forbiddenStates.includes("HIGH_density") &&
    signals.engagement.dailyLoad === "HIGH"
  ) {
    flags.push({
      rule: "high_density_blocked",
      detected: "engagement.dailyLoad=HIGH but HIGH_density is forbidden",
      resolution: `visualDensity capped to ${policy.visualDensity}`,
    })
  }

  return flags
}

// ── Override detection ────────────────────────────────────────────────

function detectOverrides(
  signals: DomainSignals,
  contract: DailyExperienceContract,
  policy: UXPolicy,
): OverriddenRule[] {
  const overrides: OverriddenRule[] = []

  // Detect if policy uiMode differs from the raw signal-derived candidate
  const rawCandidate: UiMode =
    policy.showComeback                        ? "COMEBACK" :
    signals.engagement.dailyLoad === "LOW"     ? "RECOVERY" :
    signals.emotional.shouldShowFocusLock      ? "FOCUS"    :
    "EXPLORE"

  if (rawCandidate !== policy.uiMode) {
    overrides.push({
      layer: "policy",
      original: `candidateMode=${rawCandidate}`,
      overriddenBy: `contract.allowedUXModes=[${contract.allowedUXModes.join(",")}]`,
      reason: `contract.experiencePromise=${contract.experiencePromise} disallows ${rawCandidate}`,
    })
  }

  return overrides
}

// ── Explainability score ──────────────────────────────────────────────
// Measures how linearly the signals → outcome chain reads.
// Penalised by conflicts and overrides (they indicate tension in the system).

function computeExplainabilityScore(
  conflictFlags: ConflictFlag[],
  overriddenRules: OverriddenRule[],
  reasoningPath: ReasoningStep[],
): number {
  const baseScore = 100
  const conflictPenalty = conflictFlags.length * 15
  const overridePenalty = overriddenRules.length * 10
  const pathLengthBonus = Math.min(reasoningPath.length * 2, 20)  // richer path = more explainable
  return Math.max(0, Math.min(100, baseScore - conflictPenalty - overridePenalty + pathLengthBonus))
}

// ── Main export ───────────────────────────────────────────────────────

export function getUXSnapshot(
  signals: DomainSignals,
  contract: DailyExperienceContract,
  policy: UXPolicy,
  ux: DailyUXState,
): UXSnapshot {
  const reasoningPath = [
    ...buildSignalSteps(signals),
    ...buildContractSteps(contract),
    ...buildPolicySteps(policy),
    ...buildMapperSteps(ux),
  ]

  const conflictFlags  = detectConflicts(signals, contract, policy)
  const overriddenRules = detectOverrides(signals, contract, policy)
  const explainabilityScore = computeExplainabilityScore(conflictFlags, overriddenRules, reasoningPath)

  return {
    finalUiState: {
      uiMode:            policy.uiMode,
      sessionState:      policy.sessionState,
      experiencePromise: contract.experiencePromise,
      visualDensity:     policy.visualDensity,
      finnLinePreview:   policy.finnLine.slice(0, 60),
      retentionGoal:     contract.retentionGoalForDay,
    },
    reasoningPath,
    conflictFlags,
    overriddenRules,
    explainabilityScore,
  }
}
