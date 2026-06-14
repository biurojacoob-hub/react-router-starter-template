import type { AgeGroup } from "@/src/learning/graph/types"
import type { EngagementLoop, EngagementReward, ProgramPhase } from "./types"

// ─────────────────────────────────────────────────────────────
// HOOK TEMPLATES — per phase and age group
// ─────────────────────────────────────────────────────────────

type HookSet = Record<ProgramPhase, string[]>

const HOOKS: Record<AgeGroup, HookSet> = {
  EXPLORER: {
    FOUNDATION: [
      "Wyobraź sobie, że znalazłeś złotą monetę! Co byś z nią zrobił? 🪙",
      "Twoja świnka skarbonka jest pusta. Jak ją napełnisz? 🐷",
      "Twój przyjaciel ma nową zabawkę. Ty też chcesz — co robisz? 🎮",
      "Mama dała Ci 5 złotych. Masz 3 sekundy na decyzję! ⏱️",
      "Jesteś szefem sklepu z cukierkami. Dzisiaj uczysz się liczyć pieniądze! 🍬",
    ],
    CORE: [
      "Masz kieszonkowe na cały tydzień. Ile możesz wydać każdego dnia? 📅",
      "Chcesz kupić coś drogiego. Ile tygodni musisz oszczędzać? 🎯",
      "Twój kolega wydał wszystkie pieniądze w poniedziałek. Co teraz? 😬",
      "Sklep ma WIELKĄ PROMOCJĘ. Czy to zawsze dobra okazja? 🛍️",
      "Zebrałeś już połowę pieniędzy na swój cel. Nie zatrzymuj się! 💪",
    ],
    ADVANCED: [
      "Wymyśl jak możesz zarobić 10 złotych w jeden weekend! 💡",
      "Twoja skarbonka jest pełna. Co dalej z tymi pieniędzmi? 🤔",
      "Coś się zepsuło i potrzebujesz pieniędzy na naprawę — masz? 🔧",
      "Znajomy pyta czy pożyczy od Ciebie złotówkę. Co odpowiesz? 🤝",
      "Masz wybór: zjeść lody teraz albo kupić coś większego za tydzień. Co wybierasz? 🍦",
    ],
    INTEGRATION: [
      "Przez miesiąc uczyłeś się o pieniądzach. Czas to sprawdzić! 🏆",
      "Jesteś finansowym ekspertem swojej klasy. Pomóż kolegom! ⭐",
      "Wielki quiz wiedzy finansowej — czy zdasz? 🎓",
      "Stwórz swój własny plan finansowy na następny miesiąc! 📋",
      "Gratulacje! Jesteś gotowy na prawdziwe życie finansowe! 🎉",
    ],
  },
  LEARNER: {
    FOUNDATION: [
      "Dostajesz 50 zł na tydzień. Jak wydasz każdą złotówkę? 💰",
      "Twój ulubiony youtuber właśnie kupił nowy sprzęt. Skąd wziął pieniądze? 🎬",
      "Twoi rodzice muszą zapłacić rachunki. Ile to może kosztować? 🏠",
      "Wakacje za 3 miesiące — ile musisz odkładać tygodniowo? ✈️",
      "Quiz: czy wiesz więcej o pieniądzach niż Twoi rodzice myślą? 😏",
    ],
    CORE: [
      "Stwórz budżet na swoje kieszonkowe i pokonaj wszystkich w klasie! 📊",
      "Cel: nowe słuchawki za 200 zł. Masz plan? 🎧",
      "Twój kolega ma już 3x więcej oszczędności. Jak on to robi? 🔍",
      "Dostałeś 100 zł na urodziny. Wydać, oszczędzić, czy podzielić? 🎂",
      "W tym tygodniu budujesz swój pierwszy prawdziwy plan finansowy! 📝",
    ],
    ADVANCED: [
      "Jak nastolatki zarabiają pierwsze pieniądze? Przegląd opcji! 💼",
      "Co to znaczy że pieniądze 'pracują za Ciebie'? Odkryj to! 🏦",
      "Twój znajomy pożyczył pieniądze i ma problem. Co poszło nie tak? ⚠️",
      "Inflacja zjadła 10% wartości Twoich oszczędności — co to znaczy? 📉",
      "Zaawansowany poziom: planujesz finansowo jak dorosły! 🎯",
    ],
    INTEGRATION: [
      "Miesiąc nauki — czas na wielki test wiedzy! 🏆",
      "Stwórz 3-miesięczny plan finansowy dla siebie! 📅",
      "Naucz kogoś w rodzinie czegoś o finansach — misja eksperta! 👨‍🏫",
      "Realne scenariusze finansowe — czy dasz radę? 💪",
      "Gratulacje! Jesteś finansowo świadomy nastolatek! 🎓",
    ],
  },
  ACHIEVER: {
    FOUNDATION: [
      "Pierwsze zarobione pieniądze — co mówi statystyka co nastolatki z nimi robią? 📊",
      "Twoi rodzice zarabiają X. Ile z tego zostaje po wydatkach? 🧮",
      "Różnica między bogatym a zamożnym — zacznij rozumieć już teraz! 💡",
      "Twój rówieśnik zaoszczędził 1000 zł. Jak to możliwe? 🤔",
      "Podstawy finansów, które każdy powinien znać przed 18. rokiem życia! 📚",
    ],
    CORE: [
      "Metoda 50/30/20 — prosty sposób na kontrolę każdej złotówki! ✂️",
      "Zaplanuj rok finansowy jak CFO własnego życia! 📈",
      "Dlaczego oszczędzanie na 'cokolwiek' nie działa — masz cel? 🎯",
      "Twoja pierwsza praca: jak nie zmarnować pierwszej wypłaty? 💼",
      "Budżet który naprawdę działa — bez wyrzeczeń! 🔥",
    ],
    ADVANCED: [
      "Procent składany: największe odkrycie finansowe w historii! 🚀",
      "Różnica między ryzykiem a głupotą — jak ją rozpoznać? ⚖️",
      "Aktywa vs pasywa: dlaczego bogaci myślą inaczej! 🏠",
      "Twoja przyszła kariera a Twoje finanse — połącz te dwie rzeczy! 🎓",
      "Scenariusz: masz 1000 zł i 1 rok — co zrobisz? 💰",
    ],
    INTEGRATION: [
      "Grand finale: kompleksowy test wiedzy finansowej! 🏆",
      "Stwórz swój 5-letni plan finansowy! 📋",
      "Rozmowa z rodzicem o rodzinnych finansach — misja! 👨‍👩‍👧",
      "Realne decyzje finansowe: kupno, oszczędzanie, planowanie! 💡",
      "Certyfikat wiedzy finansowej — zasłużyłeś! 🎓",
    ],
  },
  MASTER: {
    FOUNDATION: [
      "Financial literacy rate w Polsce: 40%. Ty jesteś w górnych 60% już dzisiaj! 📊",
      "Pierwszy dorosły krok: rozumiesz swoje finanse lepiej niż większość dorosłych? 💼",
      "Dlaczego system finansowy jest zbudowany żeby Cię nie rozumiał — i jak się wyrwać! 🔓",
      "Net worth w wieku 18 lat: jak zacząć go budować od zera! 💰",
      "Mapa finansowa od dziś do emerytury — widzisz całość? 🗺️",
    ],
    CORE: [
      "Zero-based budgeting: każda złotówka ma pracę — zacznij zarządzać jak ekspert! ⚙️",
      "Fundusz awaryjny: nie romantyczna idea, lecz matematyczna konieczność! 🛡️",
      "Twoje pierwsze 1000 zł: rozłóż je optymalnie! 📊",
      "Kariera i finanse: jak wybrać ścieżkę która Cię bogaci? 🚀",
      "Podatki dla młodych: co musisz wiedzieć zanim zarobisz pierwsze pieniądze! 🧾",
    ],
    ADVANCED: [
      "Compound interest: liczby które zmienią Twoje życie jeśli zaczniesz teraz! 📈",
      "Dług: kiedy jest narzędziem, a kiedy pułapką? ⚠️",
      "Entrepreneurship 101: zarobić więcej niż pracownik — jak? 💡",
      "Globalna gospodarka a Twoje codzienne decyzje — widzisz połączenia? 🌍",
      "Financial independence: ile potrzebujesz i kiedy możesz to osiągnąć? 🏁",
    ],
    INTEGRATION: [
      "Masterclass finansowy: kompleksowy egzamin wiedzy! 🎓",
      "Twój 10-letni plan finansowy — zacznij pisać go teraz! 📋",
      "Projekt: wytłumacz finanse swojemu rodzeństwu lub znajomemu! 👥",
      "Real-world simulation: decyzje finansowe przez 30 minut jak dorosły! 💼",
      "Gratulacje: masz wiedzę finansową na poziomie college'u — używaj jej! 🏆",
    ],
  },
}

// ─────────────────────────────────────────────────────────────
// DECISION MOMENTS — key choices per phase
// ─────────────────────────────────────────────────────────────

const DECISIONS: Record<ProgramPhase, string[]> = {
  FOUNDATION: [
    "Wydać teraz czy poczekać na lepszą rzecz?",
    "Podzielić pieniądze czy trzymać razem?",
    "Skarbonka czy od razu do sklepu?",
    "Potrzeba czy zachcianka?",
    "Czy to jest uczciwa cena?",
  ],
  CORE: [
    "Jak podzielić kieszonkowe na tydzień?",
    "Oszczędzać na cel czy wydawać na bieżąco?",
    "Pożyczyć kolędze pieniądze czy nie?",
    "Wybrać tańszy produkt czy jakość?",
    "Kiedy promocja jest prawdziwą okazją?",
  ],
  ADVANCED: [
    "Zarabiać aktywnie czy szukać dochodu pasywnego?",
    "Jak ocenić ryzyko decyzji finansowej?",
    "Ile odkładać na fundusz awaryjny?",
    "Kiedy warto wziąć kredyt?",
    "Jak wybrać między teraz a przyszłością?",
  ],
  INTEGRATION: [
    "Jak zoptymalizować cały swój plan finansowy?",
    "Które nawyki finansowe zachować na całe życie?",
    "Jak pomóc rodzinie podjąć lepsze decyzje?",
    "Jak reagować na nieoczekiwane wydatki?",
    "Jaki jest Twój 1 najważniejszy cel finansowy?",
  ],
}

// ─────────────────────────────────────────────────────────────
// STREAK REINFORCEMENT MESSAGES
// ─────────────────────────────────────────────────────────────

const STREAK_MESSAGES: Record<number, string> = {
  1: "Dzień 1! Każda podróż zaczyna się od pierwszego kroku 🚀",
  2: "2 dni z rzędu! Budujesz nawyk! 💪",
  3: "3 dni! Trójka to szczęśliwa liczba w finansach! 🍀",
  5: "5 dni! Tydzień prawie za Tobą! Jesteś na dobrej drodze! ⭐",
  7: "TYDZIEŃ! Właśnie zarobiłeś odznakę Tygodnia! 🏅",
  10: "10 DNI! Jesteś w TOP 10% zaangażowanych uczniów! 🔥",
  14: "2 TYGODNIE! Nawyk jest już zbudowany — utrzymaj go! 💎",
  21: "21 DNI! Naukowcy mówią że nawyk trwa 21 dni — Ty to już masz! 🧠",
  25: "25 DNI! Tylko 5 kroków do końca! Sprint! 🏃",
  30: "30 DNI! UKOŃCZYŁEŚ PROGRAM! Jesteś mistrzem finansów! 🏆",
}

export function getStreakMessage(day: number, streakDays: number): string {
  // Check for milestone messages first
  const milestone = STREAK_MESSAGES[day]
  if (milestone) return milestone

  if (streakDays >= 7) return `${streakDays} dni z rzędu! Niesamowite! 🔥`
  if (streakDays >= 3) return `${streakDays} dni serii! Idź dalej! ⚡`
  return `Dzień ${day} programu. Rób to codziennie! 📅`
}

// ─────────────────────────────────────────────────────────────
// REWARD DESCRIPTIONS
// ─────────────────────────────────────────────────────────────

export function buildRewardDescription(
  xp: number,
  day: number,
  skillName: string,
  isCapstone: boolean
): string {
  const parts: string[] = [`+${xp} XP za opanowanie: "${skillName}"`]

  if (isCapstone) parts.push("🏅 Bonus za dzień konsolidacji!")
  if (day === 7)  parts.push("🎖️ Odznaka: Tydzień Nauki!")
  if (day === 14) parts.push("🥈 Odznaka: Dwa Tygodnie!")
  if (day === 21) parts.push("🥇 Odznaka: Trzy Tygodnie!")
  if (day === 30) parts.push("🏆 Odznaka: Mistrz 30 Dni!")

  return parts.join(" · ")
}

// ─────────────────────────────────────────────────────────────
// BUILD ENGAGEMENT LOOP
// ─────────────────────────────────────────────────────────────

export function buildEngagementLoop(
  ageGroup: AgeGroup,
  phase: ProgramPhase,
  day: number,
  xpReward: number,
  skillName: string,
  isCapstone: boolean,
  streakDays: number
): EngagementLoop {
  const hooksForPhase = HOOKS[ageGroup][phase]
  const hook = hooksForPhase[(day - 1) % hooksForPhase.length]!

  const decisionsForPhase = DECISIONS[phase]
  const decisionMoment = decisionsForPhase[(day - 1) % decisionsForPhase.length]!

  const reward: EngagementReward = {
    xp: xpReward,
    message: buildRewardDescription(xpReward, day, skillName, isCapstone),
    badgeHint: day % 7 === 0 ? `Odznaka: Seria ${day / 7} tygodni` : undefined,
  }

  return {
    hook,
    learning: `Temat dnia: ${skillName}`,
    decisionMoment,
    reward,
    streakReinforcement: getStreakMessage(day, streakDays),
  }
}
