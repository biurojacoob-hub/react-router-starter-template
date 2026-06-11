import { getHabitLoopState } from "@/src/lib/habit/habitLoop"
import { getFinnMemoryLine } from "@/src/lib/hero/finnMemory"
import { getInvisibleGrowth } from "@/src/lib/progression/progressionIllusion"
import { getDailyReward, type DailyReward } from "@/src/lib/rewards/variableReward"
import {
  FINN_ADAPTIVE_BORED, FINN_ADAPTIVE_FRUSTRATED,
  FINN_ADAPTIVE_FATIGUED, FINN_ADAPTIVE_FLOW, pickRandom,
} from "@/src/lib/hero/finn"
import type { TodayLearningState } from "@/src/lib/learning/todayState"
import type { LearningSignals } from "./learning"
import type { FinnEmotionalTone } from "@/src/lib/pacing/adaptivePacing"

export type EmotionalSignals = {
  shouldShowFocusLock: boolean
  finnFocusLine: string
  sessionEndDetected: boolean
  endMessage: string
  memoryLine: string | null
  finnAdaptiveLine: string | null
  topStrengthName: string
  finnCommentOnGrowth: string | null
  dailyReward: DailyReward
}

export type EmotionalInput = {
  todayState: TodayLearningState
  learning: LearningSignals
  childId: string
  streakDays: number
  missionsCompleted: number
  badgesEarned: number
  level: number
  lessonsCompleted: number
  finnEmotionalTone: FinnEmotionalTone
}

const ADAPTIVE_POOLS: Record<string, string[]> = {
  bored:      FINN_ADAPTIVE_BORED,
  frustrated: FINN_ADAPTIVE_FRUSTRATED,
  fatigued:   FINN_ADAPTIVE_FATIGUED,
  flow:       FINN_ADAPTIVE_FLOW,
}

export function getEmotionalSignals(input: EmotionalInput): EmotionalSignals {
  const { todayState, learning, childId, streakDays, missionsCompleted, badgesEarned, level, lessonsCompleted, finnEmotionalTone } = input

  const habitLoop = getHabitLoopState(todayState, learning)

  const growth = getInvisibleGrowth({
    lessonsCompleted, missionsCompleted, streakDays,
    currentDay: todayState.currentDay, level, badgesEarned,
    dayProgressPercent: todayState.dayProgressPercent,
  })

  const memoryLine = getFinnMemoryLine({
    streakDays, missionsCompleted, badgesEarned,
    currentDay: todayState.currentDay, level,
    lessonsDoneTotal: lessonsCompleted,
  })

  const dailyReward = getDailyReward(childId, todayState.currentDay, streakDays)

  const finnAdaptiveLine = finnEmotionalTone !== "neutral"
    ? pickRandom(ADAPTIVE_POOLS[finnEmotionalTone]!)
    : null

  return {
    shouldShowFocusLock: habitLoop.shouldShowFocusLock,
    finnFocusLine: habitLoop.finnFocusLine,
    sessionEndDetected: habitLoop.sessionEndDetected,
    endMessage: habitLoop.endMessage,
    memoryLine,
    finnAdaptiveLine,
    topStrengthName: growth.topStrengthName,
    finnCommentOnGrowth: growth.finnCommentOnGrowth,
    dailyReward,
  }
}
