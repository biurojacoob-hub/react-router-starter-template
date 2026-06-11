import { getDailyAdventureState, type DailyAdventureState } from "@/src/lib/learning/dailyAdventure"
import type { TodayLearningState } from "@/src/lib/learning/todayState"

export type LearningSignals = DailyAdventureState

export function getLearningSignals(
  todayState: TodayLearningState,
  nextLessonHref: string,
  nextQuizHref: string,
): LearningSignals {
  return getDailyAdventureState(todayState, nextLessonHref, nextQuizHref)
}
