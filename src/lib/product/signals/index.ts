export { getEngagementSignals, type EngagementSignals } from "./engagement"
export { getLearningSignals, type LearningSignals } from "./learning"
export { getEmotionalSignals, type EmotionalSignals, type EmotionalInput } from "./emotional"
export { getRetentionSignals, type RetentionSignals } from "./retention"

import type { EngagementSignals } from "./engagement"
import type { LearningSignals } from "./learning"
import type { EmotionalSignals } from "./emotional"
import type { RetentionSignals } from "./retention"

export type DomainSignals = {
  engagement: EngagementSignals
  learning: LearningSignals
  emotional: EmotionalSignals
  retention: RetentionSignals
}
