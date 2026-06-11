import type { TodayLearningState } from "@/src/lib/learning/todayState"
import type { DailyAdventureState } from "@/src/lib/learning/dailyAdventure"
import { FINN_FOCUS_GUIDE, pickRandom } from "@/src/lib/hero/finn"

export type LoopStage =
  | "idle"           // hasn't visited today, nothing done
  | "opened_app"     // first login today, nothing started
  | "hero_started"   // partial day progress, current hero still pending
  | "hero_completed" // primary hero action done, day not complete
  | "day_completed"  // all 3 activities done

export type ClosureStatus =
  | "open_loop"      // nothing started — high friction
  | "closing_loop"   // in progress — momentum
  | "closed_loop"    // day complete — zero friction

export type HabitLoopState = {
  loopStage: LoopStage
  nextMicroAction: string         // the ONE smallest next step
  frictionLevel: number           // 0–100
  closureStatus: ClosureStatus
  finnFocusLine: string           // session guide message
  shouldShowFocusLock: boolean    // when true: fade/hide secondary actions
  sessionEndDetected: boolean     // true when day complete → trigger closure UI
  endMessage: string              // farewell line for SessionCompleteCard
}

const MICRO_ACTIONS: Record<LoopStage, string> = {
  idle:           "Wróć do aplikacji i zacznij dzisiejszą przygodę",
  opened_app:     "Kliknij główny przycisk i odkryj co Finn dla Ciebie przygotował",
  hero_started:   "Dokończ główne zadanie dnia — jesteś w połowie drogi",
  hero_completed: "Świetnie! Jeden krok dalej — zalicz kolejną aktywność",
  day_completed:  "Dzień zamknięty. Wróć jutro po nową przygodę",
}

const END_MESSAGES = [
  "Dzień ukończony. Finn jest z Ciebie dumny — naprawdę. 🦉",
  "Pełna pętla zamknięta. Jutro nowa historia czeka. 🌅",
  "To był dobry dzień finansowego bohatera. Do zobaczenia jutro! 🏆",
  "Misja dnia: zaliczona. Mózg naładowany. Wróć jutro! ⚡",
]

export function getHabitLoopState(
  todayState: TodayLearningState,
  adventure: DailyAdventureState,
): HabitLoopState {
  const { isFirstLoginToday, dayProgressPercent } = todayState
  const { heroActionDone, allDone } = adventure

  // ── Loop stage ────────────────────────────────────────────────
  let loopStage: LoopStage

  if (allDone) {
    loopStage = "day_completed"
  } else if (heroActionDone) {
    loopStage = "hero_completed"
  } else if (dayProgressPercent > 0) {
    // Something done today but not the current hero action
    loopStage = "hero_started"
  } else if (isFirstLoginToday) {
    loopStage = "opened_app"
  } else {
    loopStage = "idle"
  }

  // ── Friction level ────────────────────────────────────────────
  // Lower = easier to act (momentum state). Higher = more friction (cold start).
  const frictionMap: Record<LoopStage, number> = {
    idle:           75,
    opened_app:     45,
    hero_started:   15,   // lowest: momentum is highest mid-loop
    hero_completed: 25,
    day_completed:  0,
  }
  const frictionLevel = frictionMap[loopStage]

  // ── Closure status ────────────────────────────────────────────
  const closureStatus: ClosureStatus =
    loopStage === "day_completed" ? "closed_loop" :
    loopStage === "idle" || loopStage === "opened_app" ? "open_loop" :
    "closing_loop"

  // ── Focus lock — hide distractions when mid-loop ──────────────
  // Active when child has started but not finished the hero action.
  // Also active on opened_app to drive first engagement.
  const shouldShowFocusLock = loopStage === "hero_started"

  // ── Session end ───────────────────────────────────────────────
  const sessionEndDetected = loopStage === "day_completed"

  // Deterministic end message from day number
  const endIdx = todayState.currentDay % END_MESSAGES.length
  const endMessage = END_MESSAGES[endIdx]!

  // ── Finn focus line (changes with loop stage) ─────────────────
  const finnFocusLine = loopStage === "hero_started"
    ? pickRandom(FINN_FOCUS_GUIDE)
    : MICRO_ACTIONS[loopStage]

  return {
    loopStage,
    nextMicroAction: MICRO_ACTIONS[loopStage],
    frictionLevel,
    closureStatus,
    finnFocusLine,
    shouldShowFocusLock,
    sessionEndDetected,
    endMessage,
  }
}
