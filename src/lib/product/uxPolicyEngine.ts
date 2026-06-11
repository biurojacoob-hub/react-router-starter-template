import type { DomainSignals } from "./signals"
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

export function getUXPolicy(signals: DomainSignals, todayState: TodayLearningState): UXPolicy {
  const { engagement, learning, emotional, retention } = signals

  // ── Session state ─────────────────────────────────────────────
  const sessionState: SessionState =
    learning.allDone        ? "day_done"  :
    learning.heroActionDone ? "hero_done" :
    "active"

  // ── Comeback / UI mode ────────────────────────────────────────
  const showComeback = todayState.isFirstLoginToday && todayState.daysSinceLastVisit >= 1

  let uiMode: UiMode = "EXPLORE"
  if (showComeback)                         uiMode = "COMEBACK"
  else if (engagement.dailyLoad === "LOW")  uiMode = "RECOVERY"
  else if (emotional.shouldShowFocusLock)   uiMode = "FOCUS"

  // ── Visual density ─────────────────────────────────────────────
  const visualDensity: VisualDensity = engagement.dailyLoad

  // ── Secondary actions count ────────────────────────────────────
  const secondaryCount: 0 | 1 | 2 =
    engagement.dailyLoad === "LOW"    ? 0 :
    engagement.dailyLoad === "NORMAL" ? 1 :
    2

  // ── Finn lines ────────────────────────────────────────────────
  const finnLine = resolveFinnLine({
    retentionPulse:   retention.pulseStatus,
    retentionNudge:   retention.finnNudgeMessage,
    pacingTone:       engagement.finnEmotionalTone,
    pacingAdaptiveLine: emotional.finnAdaptiveLine,
    focusLock:        emotional.shouldShowFocusLock,
    focusFinnLine:    emotional.finnFocusLine,
    memoryLine:       emotional.memoryLine,
    defaultOpening:   learning.finnOpening,
    sessionState,
    finnHeroComplete: learning.finnHeroComplete,
    finnDayComplete:  learning.finnDayComplete,
  })

  // AiMentor widget — growth comment takes priority over memory
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
