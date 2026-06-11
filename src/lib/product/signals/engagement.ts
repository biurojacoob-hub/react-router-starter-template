import { getAdaptivePacingState, type AdaptivePacingState, type PacingInput } from "@/src/lib/pacing/adaptivePacing"

export type EngagementSignals = AdaptivePacingState

export function getEngagementSignals(input: PacingInput): EngagementSignals {
  return getAdaptivePacingState(input)
}
