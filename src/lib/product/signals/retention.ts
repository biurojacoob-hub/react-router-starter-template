import { getRetentionState, type RetentionInput } from "@/src/lib/retention/retentionEngine"

export type RetentionSignals = {
  pulseStatus: "SAFE" | "AT_RISK" | "CRITICAL"
  finnNudgeMessage: string
  returnLikelihoodScore: number
}

export function getRetentionSignals(input: RetentionInput): RetentionSignals {
  const { pulseStatus, finnNudgeMessage, returnLikelihoodScore } = getRetentionState(input)
  return { pulseStatus, finnNudgeMessage, returnLikelihoodScore }
}
