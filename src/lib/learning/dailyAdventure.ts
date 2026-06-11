import type { TodayLearningState } from "@/src/lib/learning/todayState"
import { FINN, DAILY_START, DAY_COMPLETE, HERO_ACTION_COMPLETE, pickRandom } from "@/src/lib/hero/finn"

export type HeroActionType = "lesson" | "quiz" | "mission"

export type AdventureAction = {
  type: HeroActionType
  title: string
  href: string
  estimatedMin: number
  done: boolean
  locked: boolean
}

export type DailyAdventureState = {
  heroAction: AdventureAction        // single primary action
  secondaryActions: AdventureAction[] // max 2, secondary chips
  dayTheme: string
  emotionTone: number                // 1–5
  finnOpening: string                // Finn's line for start of day
  finnHeroComplete: string           // Finn's line when hero action done
  finnDayComplete: string            // Finn's line when all done
  allDone: boolean
  heroActionDone: boolean
}

const PHASE_THEMES: Record<string, string> = {
  FOUNDATION: "Pierwsze Kroki",
  CORE:       "Podstawy Finansów",
  ADVANCED:   "Zaawansowany Poziom",
  INTEGRATION:"Mistrz Finansów",
}

export function getDailyAdventureState(
  state: TodayLearningState,
  nextLessonHref: string,
  nextQuizHref: string,
): DailyAdventureState {
  const { today, lessonDoneToday, quizDoneToday, missionDoneToday } = state

  const allActions: AdventureAction[] = [
    {
      type: "lesson",
      title: today.lesson.title,
      href: nextLessonHref,
      estimatedMin: today.lesson.estimatedMinutes,
      done: lessonDoneToday,
      locked: false,
    },
    {
      type: "quiz",
      title: today.quiz.title,
      href: nextQuizHref,
      estimatedMin: today.quiz.estimatedMinutes,
      done: quizDoneToday,
      locked: !lessonDoneToday,
    },
    {
      type: "mission",
      title: today.mission.title,
      href: "/missions",
      estimatedMin: today.mission.estimatedMinutes,
      done: missionDoneToday,
      locked: false,
    },
  ]

  // Hero = first incomplete, non-locked action. If all done, hero = lesson (primary)
  const heroIndex = allActions.findIndex((a) => !a.done && !a.locked)
  const resolvedHeroIndex = heroIndex >= 0 ? heroIndex : 0
  const heroAction = allActions[resolvedHeroIndex]!
  const secondaryActions = allActions.filter((_, i) => i !== resolvedHeroIndex)

  // Emotion tone: capstone=5, high xp=4, advanced/integration=3-4, else 2
  let emotionTone = 2
  if (today.isCapstoneDay) emotionTone = 5
  else if (today.xpReward >= 80) emotionTone = 4
  else if (today.phase === "INTEGRATION") emotionTone = 4
  else if (today.phase === "ADVANCED") emotionTone = 3

  const allDone = lessonDoneToday && quizDoneToday && missionDoneToday
  const heroActionDone = heroAction.done

  // Finn lines — use today's engagementHook as the day narrative trigger
  const finnOpening = today.engagementHook || `Dzień ${today.day} — ${today.title}. Gotowy?`
  const finnHeroComplete = pickRandom(HERO_ACTION_COMPLETE)
  const finnDayComplete = pickRandom(DAY_COMPLETE)

  return {
    heroAction,
    secondaryActions,
    dayTheme: PHASE_THEMES[today.phase] ?? today.phase,
    emotionTone,
    finnOpening,
    finnHeroComplete,
    finnDayComplete,
    allDone,
    heroActionDone,
  }
}
