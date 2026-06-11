import type { DomainSignals } from "./signals"
import type { DailyExperienceContract } from "./dailyExperienceContract"
import type { TodayLearningState } from "@/src/lib/learning/todayState"
import type { UiMode, SessionState, VisualDensity } from "./types"

// ── Policy output — decisions only, no component props ────────────────
export type UXPolicy = {
  sessionState: SessionState
  uiMode: UiMode
  visualDensity: VisualDensity
  secondaryCount: 0 | 1 | 2
  finnLine: string
  finnChatLine: string
  showComeback: boolean
  showRareBanner: boolean
}

type FinnLineParams = {
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
}

// Priority: day_done → hero_done → retention CRITICAL → fatigue/frustration
//           → focus lock → memory → adaptive → default
function resolveFinnLine(p: FinnLineParams): string {
  if (p.sessionState === "day_done")  return p.finnDayComplete
  if (p.sessionState === "hero_done") return p.finnHeroComplete
  if (p.retentionPulse === "CRITICAL") return p.retentionNudge
  if (p.pacingTone === "fatigued" || p.pacingTone === "frustrated") return p.pacingAdaptiveLine ?? p.defaultOpening
  if (p.focusLock) return p.focusFinnLine
  if (p.memoryLine) return p.memoryLine
  if (p.pacingAdaptiveLine) return p.pacingAdaptiveLine
  return p.defaultOpening
}

// Contract enforcer — pins uiMode to the contract's allowed range.
// Policy's candidate mode is accepted only if the contract permits it;
// otherwise falls back to the first allowed mode.
function enforceContractMode(candidate: UiMode, contract: DailyExperienceContract): UiMode {
  if (contract.allowedUXModes.includes(candidate)) return candidate
  return contract.allowedUXModes[0] ?? "EXPLORE"
}

export function getUXPolicy(
  signals: DomainSignals,
  todayState: TodayLearningState,
  contract: DailyExperienceContract,
): UXPolicy {
  const { engagement, learning, emotional, retention } = signals

  // ── Session state ─────────────────────────────────────────────
  const sessionState: SessionState =
    learning.allDone        ? "day_done"  :
    learning.heroActionDone ? "hero_done" :
    "active"

  // ── Comeback ──────────────────────────────────────────────────
  const showComeback = todayState.isFirstLoginToday && todayState.daysSinceLastVisit >= 1

  // ── UI mode (candidate) ───────────────────────────────────────
  let candidateMode: UiMode = "EXPLORE"
  if (showComeback)                         candidateMode = "COMEBACK"
  else if (engagement.dailyLoad === "LOW")  candidateMode = "RECOVERY"
  else if (emotional.shouldShowFocusLock)   candidateMode = "FOCUS"

  // Contract gates the candidate — today's emotional intention overrides raw signal
  const uiMode = enforceContractMode(candidateMode, contract)

  // ── Visual density — contract forbids HIGH on recovery/comeback ─
  let visualDensity: VisualDensity = engagement.dailyLoad
  if (contract.forbiddenStates.includes("HIGH_density") && visualDensity === "HIGH") {
    visualDensity = "NORMAL"
  }

  // ── Secondary actions count ────────────────────────────────────
  let secondaryCount: 0 | 1 | 2 =
    engagement.dailyLoad === "LOW"    ? 0 :
    engagement.dailyLoad === "NORMAL" ? 1 :
    2
  if (contract.forbiddenStates.includes("secondary_count_2") && secondaryCount === 2) {
    secondaryCount = 1
  }

  // ── Finn lines ────────────────────────────────────────────────
  const finnLine = resolveFinnLine({
    retentionPulse:     retention.pulseStatus,
    retentionNudge:     retention.finnNudgeMessage,
    pacingTone:         engagement.finnEmotionalTone,
    pacingAdaptiveLine: emotional.finnAdaptiveLine,
    focusLock:          emotional.shouldShowFocusLock,
    focusFinnLine:      emotional.finnFocusLine,
    memoryLine:         emotional.memoryLine,
    defaultOpening:     learning.finnOpening,
    sessionState,
    finnHeroComplete:   learning.finnHeroComplete,
    finnDayComplete:    learning.finnDayComplete,
  })

  const finnChatLine = emotional.finnCommentOnGrowth ?? emotional.memoryLine ?? finnLine

  // ── Reward visibility ─────────────────────────────────────────
  const showRareBanner = !showComeback && emotional.dailyReward.isRare

  return {
    sessionState,
    uiMode,
    visualDensity,
    secondaryCount,
    finnLine,
    finnChatLine,
    showComeback,
    showRareBanner,
  }
}
