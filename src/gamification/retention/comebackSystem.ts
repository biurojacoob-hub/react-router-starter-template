import type { AbsenceTier, ComebackPlan } from "./types"
import type { AgeGroup } from "@/src/learning/graph/types"

// ─────────────────────────────────────────────────────────────
// ABSENCE TIER DETECTION
// ─────────────────────────────────────────────────────────────

export function detectAbsenceTier(lastActivityDate: Date | null, now: Date = new Date()): AbsenceTier | null {
  if (!lastActivityDate) return null

  const diffDays = Math.floor(
    (now.getTime() - lastActivityDate.getTime()) / (1000 * 60 * 60 * 24)
  )

  if (diffDays >= 14) return "TWO_WEEKS_PLUS"
  if (diffDays >= 7)  return "SEVEN_DAYS"
  if (diffDays >= 3)  return "THREE_DAYS"
  if (diffDays >= 1)  return "ONE_DAY"
  return null
}

// ─────────────────────────────────────────────────────────────
// COMEBACK MESSAGES — per age group and absence tier
// ─────────────────────────────────────────────────────────────

type ComebackMessages = Record<AbsenceTier, Record<AgeGroup, string>>

const COMEBACK_MESSAGES: ComebackMessages = {
  ONE_DAY: {
    EXPLORER:  "Hej! Twoja skarbonka za tobą tęskni! 🐷 Wróć na 5 minut i zdobądź bonus!",
    LEARNER:   "Wczoraj nie było cię z nami — ale to nic! Wróć i złap swój dzienny bonus XP! 💪",
    ACHIEVER:  "Jeden dzień przerwy to jeszcze nic. Twoja seria czeka na reaktywację — działaj!",
    MASTER:    "24h bez nauki finansów. Wróć i nie trać ciągłości — każdy dzień buduje nawyk.",
  },
  THREE_DAYS: {
    EXPLORER:  "Już 3 dni! Twoje pieniążkowe misje czekają! Mamy dla ciebie łatwą misję na start 🎯",
    LEARNER:   "Brakowało cię 3 dni! Twój budżet kieszonkowy pyta: kiedy wracasz? Mamy specjalny bonus powrotu!",
    ACHIEVER:  "3 dni nieobecności — nic straconego! Przygotowaliśmy krótką sesję 'come back', żebyś wrócił w rytm.",
    MASTER:    "Przerwa 3 dni? Każdy ma gorsze tygodnie. Wróć na 10 minut — mamy uproszczoną sesję powrotu.",
  },
  SEVEN_DAYS: {
    EXPLORER:  "Hej! Tydzień bez skarbonki! 😢 Twoje monety się nudzą bez ciebie. Wróć — mamy niespodziankę!",
    LEARNER:   "Cały tydzień! Twój postęp czeka. Mamy specjalną misję 'reset' — zacznij od prostego kroku.",
    ACHIEVER:  "Tydzień przerwy. Trudno wrócić? Mamy 5-minutową sesję 'rozruch' — bez presji, tylko powtórka.",
    MASTER:    "7 dni to długo, ale nie za długo. Oto twoja sesja powrotu: krótki przegląd + łatwe ćwiczenie.",
  },
  TWO_WEEKS_PLUS: {
    EXPLORER:  "Już 2 tygodnie! Twoje pieniążkowe przygody czekają na Ciebie! Zaczynamy od nowa — bez presji! 🌟",
    LEARNER:   "Witaj z powrotem! Dużo się nagromadziło? Nie martw się — mamy plan powrotu krok po kroku.",
    ACHIEVER:  "Długa przerwa. To normalne. Mamy specjalną ścieżkę 'restart', żebyś wrócił bez stresu.",
    MASTER:    "Restart to też decyzja finansowa. Wróć po swoim tempie — mamy przegląd gdzie skończyłeś.",
  },
}

const QUICK_WIN_ACTIVITIES: Record<AbsenceTier, Record<AgeGroup, string>> = {
  ONE_DAY: {
    EXPLORER:  "Policz monety w swojej skarbonce (5 min)",
    LEARNER:   "Sprawdź ile masz oszczędności i wpisz do dziennika (5 min)",
    ACHIEVER:  "Przejrzyj swój tygodniowy budżet (10 min)",
    MASTER:    "Zrób 5-minutowy przegląd wpływów i wydatków z ostatnich 3 dni",
  },
  THREE_DAYS: {
    EXPLORER:  "Zagraj w mini-quiz: 3 pytania o pieniądzkach (5 min)",
    LEARNER:   "Obejrzyj pierwszą lekcję z następnego skilla (8 min)",
    ACHIEVER:  "Przejrzyj swój cel finansowy i zaktualizuj postęp (10 min)",
    MASTER:    "Obejrzyj podsumowanie ukończonych skilli i wybierz następny (10 min)",
  },
  SEVEN_DAYS: {
    EXPLORER:  "Posortuj monety i policz ile masz (10 min) — start od zera!",
    LEARNER:   "Przejrzyj swój budżet kieszonkowy z zeszłego tygodnia (10 min)",
    ACHIEVER:  "Napisz 3 cele finansowe na ten tydzień (15 min)",
    MASTER:    "Zrób mini-przegląd: co osiągnąłem, co jest następne? (15 min)",
  },
  TWO_WEEKS_PLUS: {
    EXPLORER:  "Powtórka: co to są pieniądze? (pierwsza lekcja, 8 min)",
    LEARNER:   "Zacznij nową serię — obejrzyj intro do budżetowania (10 min)",
    ACHIEVER:  "Restart check: sprawdź swój profil i zaktualizuj cele (15 min)",
    MASTER:    "Refresh: przejrzyj swój plan finansowy i dostosuj do sytuacji (20 min)",
  },
}

const COMEBACK_XP_BONUS: Record<AbsenceTier, number> = {
  ONE_DAY: 10,
  THREE_DAYS: 25,
  SEVEN_DAYS: 50,
  TWO_WEEKS_PLUS: 100,
}

// ─────────────────────────────────────────────────────────────
// BUILD COMEBACK PLAN
// ─────────────────────────────────────────────────────────────

export function buildComebackPlan(
  absenceTier: AbsenceTier,
  ageGroup: AgeGroup
): ComebackPlan {
  return {
    absenceTier,
    message: COMEBACK_MESSAGES[absenceTier][ageGroup],
    quickWinActivity: QUICK_WIN_ACTIVITIES[absenceTier][ageGroup],
    xpBonus: COMEBACK_XP_BONUS[absenceTier],
    streakRecovery: absenceTier === "ONE_DAY" || absenceTier === "THREE_DAYS",
    warmupDays: absenceTier === "TWO_WEEKS_PLUS" ? 3 : absenceTier === "SEVEN_DAYS" ? 2 : 0,
  }
}

export function getComebackPlan(
  lastActivityDate: Date | null,
  ageGroup: AgeGroup,
  now: Date = new Date()
): ComebackPlan | null {
  const tier = detectAbsenceTier(lastActivityDate, now)
  if (!tier) return null
  return buildComebackPlan(tier, ageGroup)
}
