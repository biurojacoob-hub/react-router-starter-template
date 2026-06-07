import type { FamilyChallenge, FamilyGoal } from "./types"

// ─────────────────────────────────────────────────────────────
// FAMILY CHALLENGES — 20 challenges across categories
// ─────────────────────────────────────────────────────────────

export const FAMILY_CHALLENGES: FamilyChallenge[] = [
  // DISCUSSION
  {
    id: "fc-budget-talk",
    title: "Rodzinna rada budżetowa",
    description: "Porozmawiajcie o domowym budżecie przez 15 minut",
    parentTask: "Pokaż dziecku (ogólnie) jak wygląda miesięczny budżet rodziny — ile wpływa, na co idzie",
    childTask: "Przygotuj 3 pytania o finansach rodziny i zadaj je rodzicowi",
    xpRewardParent: 30,
    xpRewardChild: 50,
    durationDays: 1,
    category: "DISCUSSION",
  },
  {
    id: "fc-money-history",
    title: "Historia pierwszych pieniędzy",
    description: "Rodzic opowiada o swoich pierwszych zarabianych pieniądzach",
    parentTask: "Opowiedz dziecku: kiedy zarobiłeś/zarobiłaś pierwsze pieniądze, ile to było i co z nimi zrobiłeś",
    childTask: "Posłuchaj uważnie i zapisz 3 najciekawsze fakty z historii rodzica",
    xpRewardParent: 20,
    xpRewardChild: 30,
    durationDays: 1,
    category: "DISCUSSION",
  },
  {
    id: "fc-money-mistake",
    title: "Mój największy błąd finansowy",
    description: "Rodzic dzieli się błędem finansowym — lekcja na przyszłość",
    parentTask: "Opowiedz o jednym błędzie finansowym, który popełniłeś/aś i czego cię nauczył",
    childTask: "Napisz: co wyciągnąłeś/aś z tej historii i jak sam/a chcesz tego uniknąć",
    xpRewardParent: 25,
    xpRewardChild: 40,
    durationDays: 1,
    category: "DISCUSSION",
  },

  // SHOPPING
  {
    id: "fc-shopping-mission",
    title: "Zakupy z detektywem cen",
    description: "Idźcie razem na zakupy z misją porównywania cen",
    parentTask: "Daj dziecku listę 5 produktów i budżet. Dziecko płaci i liczy resztę",
    childTask: "Dla każdego produktu znajdź najtańszą opcję, oblicz cenę za 100g i zapłać gotówką",
    xpRewardParent: 20,
    xpRewardChild: 60,
    durationDays: 2,
    category: "SHOPPING",
  },
  {
    id: "fc-promotion-hunt",
    title: "Polowanie na okazje",
    description: "Znajdźcie razem 5 dobrych promocji w sklepie",
    parentTask: "Wytłumacz dziecku jak rozpoznać fałszywą promocję. Oceńcie razem 5 ofert",
    childTask: "Ocen każdą promocję: czy warto skorzystać? Uzasadnij odpowiedź",
    xpRewardParent: 25,
    xpRewardChild: 45,
    durationDays: 2,
    category: "SHOPPING",
  },
  {
    id: "fc-weekly-groceries",
    title: "Planowanie tygodniowych zakupów",
    description: "Razem zaplanujcie zakupy na cały tydzień z budżetem",
    parentTask: "Razem z dzieckiem zaplanuj listę zakupów na tydzień i ustal budżet",
    childTask: "Pomóż zaplanować listę — sprawdź co jest w domu i co potrzeba dokupić",
    xpRewardParent: 30,
    xpRewardChild: 50,
    durationDays: 3,
    category: "SHOPPING",
  },

  // SAVINGS
  {
    id: "fc-family-jar",
    title: "Rodzinny słoik marzenia",
    description: "Ustanów rodzinny cel oszczędzania i słoik na wspólny cel",
    parentTask: "Zaproponuj cel rodzinny (wycieczka, nowy sprzęt) i ustal jak każdy może się dołożyć",
    childTask: "Wrzuć pierwszą kwotę do rodzinnego słoika i oblicz kiedy osiągniecie cel",
    xpRewardParent: 30,
    xpRewardChild: 40,
    durationDays: 1,
    category: "SAVINGS",
  },
  {
    id: "fc-no-spend-day",
    title: "Dzień bez wydatków",
    description: "Przez jeden dzień cała rodzina nie wydaje ani grosza",
    parentTask: "Przygotuj jedzenie w domu, zaplanuj bezpłatne aktywności",
    childTask: "Zaproponuj 3 darmowe aktywności na ten dzień i zapisz ile zaoszczędziłeś/aś w porównaniu do typowego dnia",
    xpRewardParent: 25,
    xpRewardChild: 35,
    durationDays: 1,
    category: "SAVINGS",
  },
  {
    id: "fc-savings-race",
    title: "Wyścig oszczędzania",
    description: "Kto zaoszczędzi więcej w tym tygodniu?",
    parentTask: "Zrezygnuj z jednej zachcianki w tym tygodniu i powiedz dziecku ile zaoszczędziłeś",
    childTask: "Zrezygnuj z jednej zachcianki i odłóż tę kwotę do skarbonki. Kto zaoszczędził więcej?",
    xpRewardParent: 30,
    xpRewardChild: 50,
    durationDays: 7,
    category: "SAVINGS",
  },

  // BUDGET
  {
    id: "fc-household-budget",
    title: "Rodzinny przegląd budżetu",
    description: "Razem przejrzyjcie wydatki rodziny z ostatniego miesiąca",
    parentTask: "Pokaż dziecku uproszczony budżet domowy — kategorie wydatków (bez szczegółów wrażliwych)",
    childTask: "Zrób wykres kołowy wydatków rodziny i zidentyfikuj 2 obszary możliwych oszczędności",
    xpRewardParent: 35,
    xpRewardChild: 65,
    durationDays: 2,
    category: "BUDGET",
  },
  {
    id: "fc-utility-check",
    title: "Detektyw rachunków",
    description: "Razem przeanalizuj rachunki za prąd, wodę, internet",
    parentTask: "Pokaż dziecku rachunki domowe (prąd, woda, internet) i wyjaśnij za co płacimy",
    childTask: "Zapisz kwoty i porównaj z poprzednim miesiącem. Co możemy oszczędzić?",
    xpRewardParent: 25,
    xpRewardChild: 45,
    durationDays: 2,
    category: "BUDGET",
  },

  // GOALS
  {
    id: "fc-family-goal",
    title: "Rodzinny cel finansowy",
    description: "Ustalcie wspólny cel finansowy na najbliższe 3 miesiące",
    parentTask: "Zaproponuj cel rodzinny i wytłumacz dlaczego jest ważny dla całej rodziny",
    childTask: "Pomóż wybrać cel i oblicz: ile tygodniowo trzeba odkładać, żeby go osiągnąć?",
    xpRewardParent: 30,
    xpRewardChild: 55,
    durationDays: 1,
    category: "GOALS",
  },
  {
    id: "fc-dream-board",
    title: "Tablica marzeń finansowych",
    description: "Każdy tworzy swoją tablicę finansowych marzeń",
    parentTask: "Stwórz tablicę swoich finansowych celów i marzeń na najbliższy rok",
    childTask: "Stwórz swoją tablicę marzeń — narysuj lub wytnij zdjęcia tego, na co chcesz oszczędzać",
    xpRewardParent: 20,
    xpRewardChild: 35,
    durationDays: 2,
    category: "GOALS",
  },
  {
    id: "fc-lemonade-stand",
    title: "Mini-biznes rodzinny",
    description: "Razem zorganizujcie małą sprzedaż lub usługę dla sąsiadów",
    parentTask: "Pomóż dziecku zaplanować mini-biznes: co sprzedawać, ile to kosztuje, ile zarobić",
    childTask: "Zrób cokolwiek możesz sprzedać lub usługę dla sąsiadów (lemoniada, rysunki, pomoc w ogrodzie)",
    xpRewardParent: 40,
    xpRewardChild: 80,
    durationDays: 7,
    category: "GOALS",
  },
]

// ─────────────────────────────────────────────────────────────
// FAMILY GOAL TEMPLATES
// ─────────────────────────────────────────────────────────────

export const FAMILY_GOAL_TEMPLATES: Omit<FamilyGoal, "id" | "currentAmount">[] = [
  {
    title: "Wakacyjna wycieczka",
    targetAmount: 2000,
    contributorsChildXp: 50,
    durationWeeks: 20,
    category: "VACATION",
  },
  {
    title: "Nowy sprzęt do domu",
    targetAmount: 800,
    contributorsChildXp: 30,
    durationWeeks: 12,
    category: "GIFT",
  },
  {
    title: "Rodzinne doświadczenie (escape room, park)",
    targetAmount: 300,
    contributorsChildXp: 40,
    durationWeeks: 6,
    category: "EXPERIENCE",
  },
  {
    title: "Domowy fundusz awaryjny",
    targetAmount: 3000,
    contributorsChildXp: 25,
    durationWeeks: 30,
    category: "EMERGENCY_FUND",
  },
]

export function getRandomFamilyChallenge(category?: FamilyChallenge["category"]): FamilyChallenge {
  const pool = category
    ? FAMILY_CHALLENGES.filter((c) => c.category === category)
    : FAMILY_CHALLENGES
  return pool[Math.floor(Math.random() * pool.length)]!
}
