import type { DailyMotivationPackage } from "./types"
import type { AgeGroup } from "@/src/learning/graph/types"

// ─────────────────────────────────────────────────────────────
// GREETINGS — time-of-day aware, per age group
// ─────────────────────────────────────────────────────────────

function getTimeGreeting(hour: number): "morning" | "afternoon" | "evening" {
  if (hour < 12) return "morning"
  if (hour < 18) return "afternoon"
  return "evening"
}

const GREETINGS: Record<AgeGroup, Record<"morning" | "afternoon" | "evening", string[]>> = {
  EXPLORER: {
    morning:   ["Dzień dobry, mały ekspercie! ☀️", "Dzień dobry! Czas na finansową przygodę! 🌅", "Hej! Gotowy na lekcję o pieniądzach? 🪙"],
    afternoon: ["Cześć! Jak minął ranek? Czas na finansowe odkrycia! 🎒", "Witaj po południu! Twoja skarbonka czeka! 🐷", "Hej! Dobry czas na krótką lekcję! 🌤️"],
    evening:   ["Dobry wieczór! Czas na mądre zakończenie dnia! 🌙", "Hej! Wieczorny quiz? To świetny pomysł! ⭐", "Przed snem — krótka lekcja finansowa! 📚"],
  },
  LEARNER: {
    morning:   ["Dzień dobry! Poranek to czas budżetowania! ☀️", "Witaj! Świeży umysł — czas na nowe skille! 💡", "Cześć! Zaczynamy dzień od finansów — świetna decyzja! 📈"],
    afternoon: ["Popołudniowa sesja nauki — profesjonalnie! 🎯", "Witaj! Pora rozwinąć swoje finansowe skrzydła! 💪", "Hej! Popołudniowy sprint przez nową lekcję! 🏃"],
    evening:   ["Wieczorna nauka finansów — nawyk mistrzów! 🌟", "Dobry wieczór! Zakończ dzień zdobywając XP! 🎮", "Cześć! Dobry wieczór na ćwiczenie budżetu! 📊"],
  },
  ACHIEVER: {
    morning:   ["Poranek inwestora — zacznij dzień mądrze! 🌅", "Dzień dobry! Godzina nauki rano = tydzień do przodu! ⚡", "Witaj! Ambitny start = ambitne wyniki! 🚀"],
    afternoon: ["Popołudniowe skupienie — zaawansowane skille na start! 🎯", "Hej! Czas na finansowe wyzwanie! Jesteś gotowy? 💼", "Witaj! Popołudnie to czas strategii! 📋"],
    evening:   ["Wieczorna analiza finansowa — jak profesjonalista! 📈", "Dobry wieczór! Podsumuj dzień i zaplanuj jutro! 🗓️", "Cześć! Wieczorem planujemy, rano działamy! 💡"],
  },
  MASTER: {
    morning:   ["Dzień dobry! Kto kontroluje poranek, kontroluje dzień. I finanse. ☀️", "Witaj! Poranny przegląd finansowy — klucz do sukcesu! 📊", "Dzień dobry! Nowy dzień, nowe możliwości finansowe. 🎯"],
    afternoon: ["Popołudniowa sesja. Konsekwencja buduje majątek. 💡", "Hej! Czas na zaawansowany moduł — gotowy? 🔥", "Witaj! Środek dnia — idealny czas na focus. 📚"],
    evening:   ["Dobry wieczór! Review dnia i plan na jutro — to nawyk liderów. 🌙", "Cześć! Wieczorna refleksja finansowa. Jak minął dzień? 📖", "Dobry wieczór! Finanse nie śpią — Ty też możesz się uczyć! 💼"],
  },
}

// ─────────────────────────────────────────────────────────────
// MOTIVATIONAL MESSAGES — per age group
// ─────────────────────────────────────────────────────────────

const MOTIVATIONAL_MESSAGES: Record<AgeGroup, string[]> = {
  EXPLORER: [
    "Każda złotówka odłożona dziś to zabawka jutro! 🐷",
    "Prawdziwy ekspert finansowy zawsze pyta: 'potrzeba czy zachcianka?' 🤔",
    "Twoja skarbonka rośnie razem z Twoją wiedzą! 🌱",
    "Mądrość finansowa zaczyna się od małych kroków. Ty już zacząłeś! 👣",
    "Najbogatsze dzieci to te, które wiedzą jak zarządzać pieniędzmi. Ty uczysz się właśnie tego! 💡",
  ],
  LEARNER: [
    "Każda lekcja o budżetowaniu to inwestycja w siebie! 📈",
    "Oszczędzanie to supermooc — powoli, ale pewnie budujesz swoją przyszłość! 🦸",
    "Twoje przyszłe ja podziękuje ci za każdą odkładaną złotówkę! ⏰",
    "Finanse to gra strategiczna — a ty uczysz się zasad lepiej niż większość dorosłych! ♟️",
    "Cel finansowy + plan + konsekwencja = sukces. Masz wszystkie trzy składniki! 🎯",
  ],
  ACHIEVER: [
    "Wiedza finansowa to jeden z najlepszych 'aktywów', jaki możesz zdobyć w młodym wieku! 💎",
    "Nie chodzi o to ile zarabiasz, ale jak zarządzasz tym co masz. Uczysz się tego teraz! 🧠",
    "Procent składany działa na pieniądzach i na wiedzy — im wcześniej zaczniesz, tym więcej zyskasz! 🚀",
    "Finansowa niezależność zaczyna się od rozumienia jak działa system. Jesteś w trakcie! 🔓",
    "Twoi rówieśnicy uczą się TikToka, ty uczysz się finansów. To zadecyduje za 10 lat! ⚡",
  ],
  MASTER: [
    "Wiedza finansowa to privilege, który zdobywasz sam — niewielu ludzi to rozumie w twoim wieku! 🏆",
    "Kontrola nad finansami to kontrola nad wolnością. Uczysz się jej teraz — to bezcenne! 🔑",
    "System finansowy jest zbudowany żeby nie rozumiał go nikt. Ty właśnie przebijasz się przez tę barierę! 💪",
    "Za 5 lat twoje decyzje finansowe z dziś zdecydują o tym jak żyjesz. Inwestujesz mądrze! 📊",
    "Dyscyplina finansowa to rzadka cecha. Budując ją teraz, wyprzedzasz 90% rówieśników! 🎯",
  ],
}

const DAILY_CHALLENGES: Record<AgeGroup, string[]> = {
  EXPLORER: [
    "Dziś policz monety w skarbonce i zapisz ile masz!",
    "Zapytaj rodzica o jeden fakt o pieniądzach, którego nie wiesz",
    "Znajdź w domu 3 rzeczy — oceń: potrzeba czy zachcianka?",
    "Narysuj swój cel oszczędzania i powieś na lodówce",
    "Przez dzisiejszy dzień, zanim coś kupisz — zapytaj 'czy naprawdę tego potrzebuję?'",
  ],
  LEARNER: [
    "Dziś zapisz wszystkie wydatki w swoim dzienniczku finansowym",
    "Sprawdź ile masz w oszczędnościach i oblicz ile % celu osiągnąłeś",
    "Znajdź jeden niepotrzebny wydatek z ostatniego tygodnia",
    "Zaplanuj budżet na następny tydzień zanim wyda się kieszonkowe",
    "Porozmawiaj z rodzicem o jednej decyzji finansowej rodziny",
  ],
  ACHIEVER: [
    "Dziś opracuj mini plan zarobkowy — jedną konkretną usługę, którą możesz zaoferować",
    "Przeanalizuj jeden zakup z ostatnich 7 dni — czy warto było?",
    "Oblicz swój 'czas pracy' — ile godzin pracy rodziców kosztuje twój ostatni zakup",
    "Znajdź 3 sposoby zmniejszenia jednego wydatku w ciągu miesiąca",
    "Napisz swój 3-miesięczny cel finansowy i strategię osiągnięcia",
  ],
  MASTER: [
    "Dziś zrób review swojego budżetu — gdzie możesz zoptymalizować?",
    "Oblicz swój aktualny majątek netto (aktywa minus pasywa)",
    "Sprawdź postęp funduszu awaryjnego — gdzie jesteś na drodze do celu?",
    "Przejrzyj jeden aspekt podatków — co możesz się dziś nauczyć?",
    "Napisz krótką analizę: co bym zrobił inaczej w finansach z perspektywy miesiąca?",
  ],
}

// ─────────────────────────────────────────────────────────────
// BUILD DAILY MOTIVATION PACKAGE
// ─────────────────────────────────────────────────────────────

export function buildDailyMotivation(
  ageGroup: AgeGroup,
  streak: number,
  xpToNextLevel: number,
  dailyBonusXp: number,
  nextGoalDescription: string,
  hour: number = new Date().getHours(),
  seed: number = Date.now()
): DailyMotivationPackage {
  const timePeriod = getTimeGreeting(hour)
  const greetings = GREETINGS[ageGroup][timePeriod]
  const motivations = MOTIVATIONAL_MESSAGES[ageGroup]
  const challenges = DAILY_CHALLENGES[ageGroup]

  const pick = (arr: string[]) => arr[seed % arr.length]!

  const streakMessage =
    streak === 0 ? "Zacznij swoją serię dziś — pierwsza aktywność to najtrudniejsza! 🌱" :
    streak === 1 ? "Pierwszy dzień! Jutro będzie drugi — to jak sadzenie drzewa! 🌳" :
    streak < 7   ? `${streak} dni z rzędu! Budujesz nawyk! 💪` :
    streak < 14  ? `${streak} dni serii! Jesteś w TOP 20% zaangażowanych! 🔥` :
    streak < 30  ? `${streak} dni! Nawyk jest już uformowany — utrzymaj go! 💎` :
                   `${streak} dni! LEGENDA. Tak trzymaj! 🏆`

  return {
    greeting: pick(greetings),
    motivationalMessage: pick(motivations),
    dailyChallenge: pick(challenges),
    streakMessage,
    nextGoalPreview: nextGoalDescription,
    xpToNextLevel,
    dailyBonusXp,
  }
}
