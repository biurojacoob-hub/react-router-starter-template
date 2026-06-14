import { SKILLS_BY_ID } from "@/src/learning/graph/skills"
import type { AgeGroup } from "@/src/learning/graph/types"
import {
  getDifficultyScore,
  getPhase,
  getXpModifier,
  isCapstoneDay,
  isReviewDay,
  getDifficultyLabel,
} from "./difficultyCurve"
import { buildEngagementLoop } from "./engagementLoop"
import { getSessionTimeBudget } from "./sessionPlanner"
import type {
  DailyProgramDay,
  DayBlueprint,
  ChildProgramState,
  LessonActivity,
  QuizActivity,
  MissionActivity,
  ReflectionActivity,
} from "./types"

// ─────────────────────────────────────────────────────────────
// 30-DAY BLUEPRINTS — static skill sequence per age group
// One skill can span 2–4 days (lesson + quiz + mission + review)
// ─────────────────────────────────────────────────────────────

const BLUEPRINTS: Record<AgeGroup, DayBlueprint[]> = {
  EXPLORER: [
    // FOUNDATION — Days 1–5
    { day: 1,  skillId: "money-awareness-1", titleTemplate: "Skąd pochodzą pieniądze?",       missionTask: "Znajdź 3 różne monety w domu i sprawdź ich wartość",         reflectionQuestion: "Co kupiłbyś za swoje pierwsze pieniądze?",                       isCapstone: false, isReview: false, phase: "FOUNDATION" },
    { day: 2,  skillId: "money-awareness-2", titleTemplate: "Monety i banknoty",               missionTask: "Ułóż monety od najmniejszej do największej wartości",         reflectionQuestion: "Ile monet potrzeba żeby kupić baton?",                           isCapstone: false, isReview: false, phase: "FOUNDATION" },
    { day: 3,  skillId: "money-awareness-3", titleTemplate: "Skąd mama bierze pieniądze?",    missionTask: "Zapytaj rodziców co robią w pracy",                           reflectionQuestion: "Co chciałbyś robić żeby zarabiać pieniądze?",                   isCapstone: false, isReview: false, phase: "FOUNDATION" },
    { day: 4,  skillId: "needs-wants-1",     titleTemplate: "Co kupić? Potrzeba czy marzenie?",missionTask: "Zrób listę 3 potrzeb i 3 zachcianek",                        reflectionQuestion: "Czy zawsze kupujesz to, czego naprawdę potrzebujesz?",          isCapstone: false, isReview: true,  phase: "FOUNDATION" },
    { day: 5,  skillId: "needs-wants-1",     titleTemplate: "Dzień mistrza: Pieniądze wokół nas!",missionTask: "Policz ile pieniędzy masz w domu (z pomocą rodzica)",  reflectionQuestion: "Czego nauczyłeś się w tym tygodniu o pieniądzach?",              isCapstone: true,  isReview: false, phase: "FOUNDATION" },
    // CORE — Days 6–15
    { day: 6,  skillId: "saving-basics-1",   titleTemplate: "Twoja pierwsza skarbonka",        missionTask: "Ozdób swoją skarbonkę lub zrób ją z pudełka",                reflectionQuestion: "Na co chcesz zaoszczędzić jako pierwsze?",                       isCapstone: false, isReview: false, phase: "CORE" },
    { day: 7,  skillId: "saving-basics-1",   titleTemplate: "Zasada: każdego dnia odłóż trochę",missionTask: "Odłóż dzisiaj dowolną kwotę do skarbonki",               reflectionQuestion: "Jak się czujesz wiedząc że masz oszczędności?",                  isCapstone: false, isReview: false, phase: "CORE" },
    { day: 8,  skillId: "saving-basics-2",   titleTemplate: "Cel: nowa zabawka!",              missionTask: "Oblicz ile tygodni oszczędzania potrzebujesz na swój cel",  reflectionQuestion: "Czy czekanie na coś sprawia że bardziej to cenisz?",             isCapstone: false, isReview: false, phase: "CORE" },
    { day: 9,  skillId: "needs-wants-2",     titleTemplate: "Mądre zakupy — powtórka",        missionTask: "Idź z rodzicem na zakupy i wskaż 2 potrzeby i 1 zachciankę",reflectionQuestion: "Jaką decyzję zakupową ostatnio podjąłeś?",                       isCapstone: false, isReview: true,  phase: "CORE" },
    { day: 10, skillId: "saving-basics-2",   titleTemplate: "Tydzień 2: Mistrz oszczędzania!", missionTask: "Podsumuj ile oszczędności zebrałeś w tym tygodniu",          reflectionQuestion: "Co jest najtrudniejsze w oszczędzaniu?",                         isCapstone: true,  isReview: false, phase: "CORE" },
    { day: 11, skillId: "needs-wants-2",     titleTemplate: "Mądry klient w sklepie",          missionTask: "Porównaj ceny 3 produktów w sklepie lub online",              reflectionQuestion: "Czy droższy zawsze znaczy lepszy?",                              isCapstone: false, isReview: false, phase: "CORE" },
    { day: 12, skillId: "saving-basics-2",   titleTemplate: "Mój plan oszczędzania",           missionTask: "Napisz swój plan: ile odkładasz tygodniowo i dlaczego",      reflectionQuestion: "Co motywuje Cię do oszczędzania?",                               isCapstone: false, isReview: false, phase: "CORE" },
    { day: 13, skillId: "money-awareness-3", titleTemplate: "Różne prace, różne pieniądze",    missionTask: "Znajdź 5 różnych zawodów i powiedz który Ci się podoba",    reflectionQuestion: "Czy pieniądze są jedynym powodem dla którego się pracuje?",    isCapstone: false, isReview: false, phase: "CORE" },
    { day: 14, skillId: "needs-wants-2",     titleTemplate: "Tydzień bez zachcianek",          missionTask: "Przez 1 dzień nie kupuj nic 'dla przyjemności' i zapisz jak się czujesz", reflectionQuestion: "Czy było trudno? Co odkryłeś?",                      isCapstone: false, isReview: true,  phase: "CORE" },
    { day: 15, skillId: "saving-basics-2",   titleTemplate: "Wielki dzień: Policz swoje skarby!", missionTask: "Policz wszystkie oszczędności i zapisz wynik",           reflectionQuestion: "Jak zmieniło się Twoje podejście do pieniędzy przez 2 tygodnie?",isCapstone: true,  isReview: false, phase: "CORE" },
    // ADVANCED — Days 16–25
    { day: 16, skillId: "needs-wants-2",     titleTemplate: "Decyzje finansowe jak dorosły",   missionTask: "Pomóż rodzicowi w planowaniu zakupów na tydzień",            reflectionQuestion: "Jak planujesz swoje wydatki?",                                   isCapstone: false, isReview: false, phase: "ADVANCED" },
    { day: 17, skillId: "money-awareness-3", titleTemplate: "Pieniądze które zarabiają pieniądze", missionTask: "Zapytaj rodzica o oszczędności w banku",                reflectionQuestion: "Czy bank to bezpieczne miejsce na pieniądze?",                    isCapstone: false, isReview: false, phase: "ADVANCED" },
    { day: 18, skillId: "saving-basics-2",   titleTemplate: "Oszczędzanie na dużą rzecz",      missionTask: "Wyobraź sobie cel wartości 200 zł i oblicz plan oszczędzania",reflectionQuestion: "Ile czasu potrzebujesz na swój największy cel?",                isCapstone: false, isReview: false, phase: "ADVANCED" },
    { day: 19, skillId: "needs-wants-1",     titleTemplate: "Co gdybyś miał 100 złotych?",     missionTask: "Napisz jak wydałbyś 100 zł (potrzeby + oszczędności + przyjemność)", reflectionQuestion: "Dlaczego warto podzielić pieniądze?",                  isCapstone: false, isReview: true,  phase: "ADVANCED" },
    { day: 20, skillId: "needs-wants-2",     titleTemplate: "Tydzień 3: Jestem finansistą!",   missionTask: "Stwórz plakat 'Moje zasady finansowe' i powieś go w pokoju",  reflectionQuestion: "Jakie są Twoje 3 najważniejsze zasady dotyczące pieniędzy?",   isCapstone: true,  isReview: false, phase: "ADVANCED" },
    { day: 21, skillId: "saving-basics-1",   titleTemplate: "Pieniądze i przyjaźń",            missionTask: "Naucz przyjaciela jednej rzeczy o pieniądzach",               reflectionQuestion: "Dlaczego ważne jest żeby rozmawiać o pieniądzach?",              isCapstone: false, isReview: false, phase: "ADVANCED" },
    { day: 22, skillId: "money-awareness-2", titleTemplate: "Pieniądze w różnych krajach",     missionTask: "Sprawdź jak wyglądają pieniądze w 3 różnych krajach",         reflectionQuestion: "Czy pieniądze wyglądają tak samo wszędzie?",                     isCapstone: false, isReview: false, phase: "ADVANCED" },
    { day: 23, skillId: "needs-wants-2",     titleTemplate: "Reklama chce Twoich pieniędzy!",  missionTask: "Obejrzyj 3 reklamy i powiedz czy to zachcianki czy potrzeby", reflectionQuestion: "Jak reklamy wpływają na Twoje decyzje zakupowe?",               isCapstone: false, isReview: false, phase: "ADVANCED" },
    { day: 24, skillId: "saving-basics-2",   titleTemplate: "Skarbonka pełna marzeń",          missionTask: "Zapisz swój największy finansowy marzenie i plan jak go osiągnąć",reflectionQuestion: "Czy marzenia finansowe są ważne?",                            isCapstone: false, isReview: true,  phase: "ADVANCED" },
    { day: 25, skillId: "money-awareness-3", titleTemplate: "Tydzień 4: Ekspert finansowy!",   missionTask: "Przeprowadź 'wywiad' z rodzicem o jego pracy i zarobkach",    reflectionQuestion: "Co zrobiłbyś inaczej gdybyś wiedział to co teraz?",             isCapstone: true,  isReview: false, phase: "ADVANCED" },
    // INTEGRATION — Days 26–30
    { day: 26, skillId: "needs-wants-2",     titleTemplate: "Wielka symulacja zakupów",        missionTask: "Zaplanuj zakupy na urodziny (budżet: 50 zł) dla 5 osób",     reflectionQuestion: "Jak decydujesz co jest priorytetem?",                            isCapstone: false, isReview: false, phase: "INTEGRATION" },
    { day: 27, skillId: "saving-basics-2",   titleTemplate: "Mój plan na przyszłość",          missionTask: "Napisz list do siebie za rok o swoich celach finansowych",    reflectionQuestion: "Kim chcesz być finansowo za rok?",                               isCapstone: false, isReview: false, phase: "INTEGRATION" },
    { day: 28, skillId: "money-awareness-3", titleTemplate: "Pieniądze i rodzina",             missionTask: "Porozmawiaj z rodziną o tym czego nauczyłeś się przez miesiąc", reflectionQuestion: "Jak możesz pomóc rodzinie być mądrzejszą finansowo?",          isCapstone: false, isReview: false, phase: "INTEGRATION" },
    { day: 29, skillId: "saving-basics-1",   titleTemplate: "Ostatni dzień nauki — powtórka!",missionTask: "Zrób listę 5 najważniejszych rzeczy które zapamiętałeś",       reflectionQuestion: "Co Cię zaskoczyło najbardziej?",                                 isCapstone: false, isReview: true,  phase: "INTEGRATION" },
    { day: 30, skillId: "needs-wants-2",     titleTemplate: "🏆 DZIEŃ 30: Mistrz Finansów!",  missionTask: "Stwórz 'Certyfikat Wiedzy Finansowej' dla siebie i podziel się nim z rodziną", reflectionQuestion: "Co zmienisz w swoim podejściu do pieniędzy od teraz?",isCapstone: true, isReview: false, phase: "INTEGRATION" },
  ],

  LEARNER: [
    { day: 1,  skillId: "budget-basics-1",        titleTemplate: "Czym jest budżet?",                missionTask: "Zapisz wszystkie swoje wydatki z ostatniego tygodnia",         reflectionQuestion: "Czy wiedziałeś na co wydajesz pieniądze?",                       isCapstone: false, isReview: false, phase: "FOUNDATION" },
    { day: 2,  skillId: "budget-basics-1",        titleTemplate: "Wpływy vs wydatki",                missionTask: "Policz swoje miesięczne kieszonkowe i oceń czy wystarczy",     reflectionQuestion: "Ile procent kieszonkowego wydajesz w pierwszym tygodniu?",       isCapstone: false, isReview: false, phase: "FOUNDATION" },
    { day: 3,  skillId: "goal-setting-1",         titleTemplate: "Twój pierwszy cel finansowy",      missionTask: "Wyznacz 1 cel finansowy i zapisz termin realizacji",            reflectionQuestion: "Dlaczego ważne jest mieć konkretny cel?",                         isCapstone: false, isReview: false, phase: "FOUNDATION" },
    { day: 4,  skillId: "budget-basics-1",        titleTemplate: "Wydatki stałe vs zmienne",        missionTask: "Podziel swoje wydatki na stałe i zmienne",                     reflectionQuestion: "Które wydatki możesz ograniczyć?",                               isCapstone: false, isReview: true,  phase: "FOUNDATION" },
    { day: 5,  skillId: "goal-setting-1",         titleTemplate: "Tydzień 1: Znasz swój budżet!",   missionTask: "Podsumuj tydzień: ile zaoszczędziłeś vs planowałeś",           reflectionQuestion: "Co było najtrudniejsze w trzymaniu budżetu?",                     isCapstone: true,  isReview: false, phase: "FOUNDATION" },
    { day: 6,  skillId: "budget-basics-2",        titleTemplate: "Mój budżet kieszonkowy",          missionTask: "Stwórz tabelę budżetu na następny tydzień",                    reflectionQuestion: "Jak podzielisz kieszonkowe między wydatki i oszczędności?",      isCapstone: false, isReview: false, phase: "CORE" },
    { day: 7,  skillId: "budget-basics-2",        titleTemplate: "Trzymaj budżet przez tydzień",    missionTask: "Śledź każdy wydatek przez 3 dni",                              reflectionQuestion: "Czy budżet pomaga Ci oszczędzać?",                               isCapstone: false, isReview: false, phase: "CORE" },
    { day: 8,  skillId: "delayed-gratification-1",titleTemplate: "Poczekaj i wygraj więcej",        missionTask: "Zidentyfikuj 1 zachciankę i poczekaj 3 dni przed zakupem",    reflectionQuestion: "Czy po 3 dniach nadal chcesz tę rzecz?",                          isCapstone: false, isReview: false, phase: "CORE" },
    { day: 9,  skillId: "budget-basics-3",        titleTemplate: "Śledzenie wydatków",              missionTask: "Zapisz każdy wydatek przez cały dzień (do grosza!)",           reflectionQuestion: "Ile małych wydatków sumarycznie daje dużą kwotę?",               isCapstone: false, isReview: true,  phase: "CORE" },
    { day: 10, skillId: "budget-basics-2",        titleTemplate: "Tydzień 2: Budżet działa!",       missionTask: "Porównaj zaplanowany budżet z rzeczywistymi wydatkami",        reflectionQuestion: "Co zrobiłbyś inaczej?",                                           isCapstone: true,  isReview: false, phase: "CORE" },
    { day: 11, skillId: "goal-setting-2",         titleTemplate: "Plan oszczędzania na cel",        missionTask: "Oblicz ile tygodni oszczędzania potrzebujesz na swój cel",    reflectionQuestion: "Jak możesz przyspieszyć osiągnięcie celu?",                       isCapstone: false, isReview: false, phase: "CORE" },
    { day: 12, skillId: "delayed-gratification-1",titleTemplate: "Impuls vs decyzja",               missionTask: "Kiedy ostatnio kupiłeś coś pod wpływem impulsu? Opisz to",    reflectionQuestion: "Jak odróżnić zakup pod wpływem emocji od racjonalnego?",         isCapstone: false, isReview: false, phase: "CORE" },
    { day: 13, skillId: "goal-setting-2",         titleTemplate: "SMART cele finansowe",            missionTask: "Przepisz swój cel finansowy w formie SMART (konkretny, mierzalny, osiągalny, realny, terminowy)", reflectionQuestion: "Czy Twój cel jest naprawdę osiągalny?", isCapstone: false, isReview: false, phase: "CORE" },
    { day: 14, skillId: "budget-basics-3",        titleTemplate: "Analiza miesiąca",               missionTask: "Podsumuj 2 tygodnie: ile zarobiłeś, wydałeś, zaoszczędziłeś",  reflectionQuestion: "Jaki procent dochodów udało Ci się zaoszczędzić?",               isCapstone: false, isReview: true,  phase: "CORE" },
    { day: 15, skillId: "delayed-gratification-2",titleTemplate: "Tydzień 3: Efekt kuli śnieżnej", missionTask: "Oblicz ile będziesz miał za rok oszczędzając X tygodniowo",   reflectionQuestion: "Jak czujesz się widząc jak rośnie kwota oszczędności?",           isCapstone: true,  isReview: false, phase: "CORE" },
    { day: 16, skillId: "goal-setting-2",         titleTemplate: "Zaawansowane planowanie celów",  missionTask: "Wyznacz 3 cele: krótko-, średnio- i długoterminowy",           reflectionQuestion: "Jak priorytety celów wpływają na Twój budżet?",                  isCapstone: false, isReview: false, phase: "ADVANCED" },
    { day: 17, skillId: "budget-basics-3",        titleTemplate: "Optymalizacja budżetu",          missionTask: "Znajdź 1 wydatek który możesz obniżyć bez strat",              reflectionQuestion: "Ile możesz zaoszczędzić miesięcznie przez optymalizację?",       isCapstone: false, isReview: false, phase: "ADVANCED" },
    { day: 18, skillId: "delayed-gratification-2",titleTemplate: "Procent i czas",                 missionTask: "Oblicz co masz za 5 lat oszczędzając 50 zł miesięcznie (×1.03 rocznie)", reflectionQuestion: "Dlaczego czas jest Twoim największym sprzymierzeńcem?", isCapstone: false, isReview: false, phase: "ADVANCED" },
    { day: 19, skillId: "goal-setting-1",         titleTemplate: "Powtórka celów — czy nadal aktualne?", missionTask: "Sprawdź czy Twoje cele z Dnia 3 nadal mają sens",       reflectionQuestion: "Jak zmieniły się Twoje priorytety finansowe?",                    isCapstone: false, isReview: true,  phase: "ADVANCED" },
    { day: 20, skillId: "budget-basics-2",        titleTemplate: "Tydzień 4: Budżetowy ekspert!",  missionTask: "Pomóż rodzicowi zaplanować zakupy na tydzień",                 reflectionQuestion: "Co jest najtrudniejsze w trzymaniu się budżetu?",                 isCapstone: true,  isReview: false, phase: "ADVANCED" },
    { day: 21, skillId: "delayed-gratification-2",titleTemplate: "Oszczędzanie jako nawyk",        missionTask: "Przez 7 dni nie kupuj nic nieplanowanego — zacznij dziś",    reflectionQuestion: "Czy oszczędzanie stało się dla Ciebie naturalnym odruchem?",     isCapstone: false, isReview: false, phase: "ADVANCED" },
    { day: 22, skillId: "goal-setting-2",         titleTemplate: "Mój 1-roczny plan finansowy",    missionTask: "Napisz plan finansowy na najbliższe 12 miesięcy",               reflectionQuestion: "Czy Twój plan jest realistyczny?",                                isCapstone: false, isReview: false, phase: "ADVANCED" },
    { day: 23, skillId: "budget-basics-3",        titleTemplate: "Wydatki ukryte i niewidoczne",   missionTask: "Znajdź 3 wydatki o których zapominamy przy planowaniu budżetu",reflectionQuestion: "Jak wliczyć nieprzewidziane wydatki do budżetu?",                 isCapstone: false, isReview: false, phase: "ADVANCED" },
    { day: 24, skillId: "delayed-gratification-1",titleTemplate: "Poczekaj na nagrodę",            missionTask: "Znajdź 1 przyzwyczajenie wydatkowe które możesz zmienić",     reflectionQuestion: "Jakie nawyki finansowe chcesz zachować przez całe życie?",       isCapstone: false, isReview: true,  phase: "ADVANCED" },
    { day: 25, skillId: "goal-setting-2",         titleTemplate: "Tydzień 5: Cele osiągnięte!",    missionTask: "Sprawdź postęp w realizacji swoich celów finansowych",         reflectionQuestion: "Który cel realizujesz najlepiej i dlaczego?",                     isCapstone: true,  isReview: false, phase: "ADVANCED" },
    { day: 26, skillId: "budget-basics-2",        titleTemplate: "Symulacja: Zarządzaj budżetem rodziny", missionTask: "Zaplanuj tygodniowe zakupy rodziny z limitem 300 zł",   reflectionQuestion: "Jak się czułeś zarządzając większym budżetem?",                  isCapstone: false, isReview: false, phase: "INTEGRATION" },
    { day: 27, skillId: "delayed-gratification-2",titleTemplate: "Inwestycja w siebie",            missionTask: "Wypisz 3 rzeczy w które warto 'zainwestować' jako nastolatek (np. kurs, książka)", reflectionQuestion: "Jak nauka jest inwestycją finansową?",      isCapstone: false, isReview: false, phase: "INTEGRATION" },
    { day: 28, skillId: "goal-setting-2",         titleTemplate: "Przekaż wiedzę",                missionTask: "Naucz kogoś w rodzinie lub znajomego jednej zasady budżetowania",reflectionQuestion: "Czy nauczanie innych pomaga Tobie lepiej rozumieć temat?",       isCapstone: false, isReview: false, phase: "INTEGRATION" },
    { day: 29, skillId: "budget-basics-3",        titleTemplate: "Ostatnia analiza",               missionTask: "Porównaj swoje nawyki finansowe z Dnia 1 i Dnia 29",          reflectionQuestion: "Co się zmieniło w Twoim myśleniu o pieniądzach?",                 isCapstone: false, isReview: true,  phase: "INTEGRATION" },
    { day: 30, skillId: "delayed-gratification-2",titleTemplate: "🏆 DZIEŃ 30: Mistrz Budżetu!",  missionTask: "Stwórz 'Mój Finansowy Kodeks' — 5 zasad które będziesz przestrzegać zawsze", reflectionQuestion: "Jak te 30 dni zmieniło Cię jako osobę?",          isCapstone: true,  isReview: false, phase: "INTEGRATION" },
  ],

  ACHIEVER: [
    { day: 1,  skillId: "income-sources-1",    titleTemplate: "Skąd biorą się pieniądze nastolatka?", missionTask: "Wypisz 5 sposobów w jaki Twoi rówieśnicy zarabiają",      reflectionQuestion: "Który sposób zarobku jest dla Ciebie najrealniejszy?",           isCapstone: false, isReview: false, phase: "FOUNDATION" },
    { day: 2,  skillId: "income-sources-1",    titleTemplate: "Praca, umiejętności i pieniądze",      missionTask: "Zidentyfikuj 3 umiejętności które możesz monetyzować",    reflectionQuestion: "Jak Twoje hobby może stać się źródłem dochodu?",                 isCapstone: false, isReview: false, phase: "FOUNDATION" },
    { day: 3,  skillId: "income-sources-2",    titleTemplate: "Aktywny i pasywny dochód",            missionTask: "Wypisz 2 przykłady dochodu aktywnego i 2 pasywnego dla nastolatka", reflectionQuestion: "Dlaczego dochód pasywny jest 'Świętym Graalem' finansów?", isCapstone: false, isReview: false, phase: "FOUNDATION" },
    { day: 4,  skillId: "income-sources-1",    titleTemplate: "Wartość Twojego czasu",               missionTask: "Oblicz ile jest warta 1 godzina Twojego czasu",             reflectionQuestion: "Czy każda godzina pracy powinna być tak samo wyceniana?",       isCapstone: false, isReview: true,  phase: "FOUNDATION" },
    { day: 5,  skillId: "income-sources-2",    titleTemplate: "Tydzień 1: Znasz swoje możliwości!",  missionTask: "Stwórz plan pierwszego dochodu własnego (nawet 1 zł)",     reflectionQuestion: "Co powstrzymuje Cię od zarobienia pierwszych własnych pieniędzy?",isCapstone: true,  isReview: false, phase: "FOUNDATION" },
    { day: 6,  skillId: "investing-concepts-1",titleTemplate: "Czym jest inwestowanie?",             missionTask: "Znajdź 3 przykłady w jaki sposób pieniądze mogą 'pracować'",reflectionQuestion: "Dlaczego trzymanie pieniędzy w materacu jest złym pomysłem?",   isCapstone: false, isReview: false, phase: "CORE" },
    { day: 7,  skillId: "investing-concepts-1",titleTemplate: "Ryzyko i nagroda: nierozłączna para", missionTask: "Oceń ryzyko 3 decyzji (np. kupno roweru, odkładanie, pożyczka)", reflectionQuestion: "Jak oceniasz ryzyko przed podjęciem decyzji?",              isCapstone: false, isReview: false, phase: "CORE" },
    { day: 8,  skillId: "risk-understanding-1",titleTemplate: "Czym jest ryzyko finansowe?",        missionTask: "Opisz sytuację gdy ktoś stracił pieniądze przez złą decyzję",reflectionQuestion: "Jak można minimalizować ryzyko nie rezygnując z szans?",         isCapstone: false, isReview: false, phase: "CORE" },
    { day: 9,  skillId: "investing-concepts-1",titleTemplate: "Typy inwestycji — przegląd",        missionTask: "Zbadaj co to jest konto oszczędnościowe vs lokata",          reflectionQuestion: "Jaka jest różnica między oszczędzaniem a inwestowaniem?",       isCapstone: false, isReview: true,  phase: "CORE" },
    { day: 10, skillId: "risk-understanding-1",titleTemplate: "Tydzień 2: Myślisz jak inwestor!",   missionTask: "Stwórz tabelę porównującą ryzyko i potencjalny zysk 4 decyzji finansowych", reflectionQuestion: "Kiedy wyższe ryzyko jest uzasadnione?",           isCapstone: true,  isReview: false, phase: "CORE" },
    { day: 11, skillId: "investing-concepts-2",titleTemplate: "Procent składany: 8. cud świata",    missionTask: "Oblicz: 1000 zł × 5% rocznie przez 10 lat",                reflectionQuestion: "Dlaczego Einstein miał rację nazywając go 8. cudem świata?",     isCapstone: false, isReview: false, phase: "CORE" },
    { day: 12, skillId: "risk-understanding-2",titleTemplate: "Dywersyfikacja portfela",            missionTask: "Wymyśl portfel: podziel 100 zł między 4 różne 'aktywa'",   reflectionQuestion: "Dlaczego dywersyfikacja zmniejsza ryzyko?",                      isCapstone: false, isReview: false, phase: "CORE" },
    { day: 13, skillId: "investing-concepts-2",titleTemplate: "Czas to pieniądz (dosłownie!)",      missionTask: "Oblicz różnicę: inwestujesz od 15 vs od 25 roku życia",    reflectionQuestion: "Jaki wpływ ma 10 lat różnicy na końcową kwotę?",                 isCapstone: false, isReview: false, phase: "CORE" },
    { day: 14, skillId: "risk-understanding-2",titleTemplate: "Ocena ryzyka: zaawansowana",         missionTask: "Oceń ryzyko 3 realnych decyzji (studia, samochód, oszczędności)", reflectionQuestion: "Jak Twoja tolerancja na ryzyko zmienia się z wiekiem?",      isCapstone: false, isReview: true,  phase: "CORE" },
    { day: 15, skillId: "investing-concepts-2",titleTemplate: "Tydzień 3: Inwestorski mindset!",    missionTask: "Oblicz ile potrzebujesz odkładać miesięcznie żeby mieć 10k zł za 5 lat", reflectionQuestion: "Jak zmienił się Twój stosunek do oszczędzania?",        isCapstone: true,  isReview: false, phase: "CORE" },
    { day: 16, skillId: "income-sources-2",    titleTemplate: "Budowanie dochodu pasywnego",        missionTask: "Zaplanuj 1 projekt który może generować pasywny dochód",    reflectionQuestion: "Jakie umiejętności chcesz rozwijać żeby zarabiać więcej?",      isCapstone: false, isReview: false, phase: "ADVANCED" },
    { day: 17, skillId: "risk-understanding-2",titleTemplate: "Błędy finansowe których unikaj",     missionTask: "Zbadaj 3 najczęstsze błędy finansowe nastolatków",          reflectionQuestion: "Który błąd jest dla Ciebie największym ryzykiem?",               isCapstone: false, isReview: false, phase: "ADVANCED" },
    { day: 18, skillId: "investing-concepts-2",titleTemplate: "Twój finansowy start",               missionTask: "Stwórz plan finansowy na pierwsze 2 lata po szkole",        reflectionQuestion: "Jakie kroki podejmiesz zanim skończysz szkołę?",                 isCapstone: false, isReview: false, phase: "ADVANCED" },
    { day: 19, skillId: "income-sources-1",    titleTemplate: "Zarobki i umiejętności — recap",     missionTask: "Porównaj swoje umiejętności z Dnia 2 i Dnia 19",           reflectionQuestion: "Jak rozwinąłeś się przez ostatnie 3 tygodnie?",                  isCapstone: false, isReview: true,  phase: "ADVANCED" },
    { day: 20, skillId: "risk-understanding-2",titleTemplate: "Tydzień 4: Myślisz jak dorosły!",    missionTask: "Porozmawiaj z rodzicem o jego decyzjach finansowych w Twoim wieku", reflectionQuestion: "Co zrobiłbyś inaczej będąc na miejscu rodzica?",           isCapstone: true,  isReview: false, phase: "ADVANCED" },
    { day: 21, skillId: "investing-concepts-1",titleTemplate: "Realne instrumenty finansowe",       missionTask: "Zbadaj: konto oszczędnościowe, lokata, obligacje skarbowe",  reflectionQuestion: "Który instrument pasuje do Twojego profilu ryzyka?",             isCapstone: false, isReview: false, phase: "ADVANCED" },
    { day: 22, skillId: "income-sources-2",    titleTemplate: "Freelancing i gig economy",          missionTask: "Zbadaj jak działają platformy do freelancingu (Fiverr, Upwork)", reflectionQuestion: "Jakie umiejętności masz które możesz tam sprzedawać?",       isCapstone: false, isReview: false, phase: "ADVANCED" },
    { day: 23, skillId: "risk-understanding-1",titleTemplate: "Ubezpieczenia: po co?",              missionTask: "Dowiedz się ile kosztuje ubezpieczenie roweru lub telefonu", reflectionQuestion: "Kiedy ubezpieczenie ma sens finansowy?",                          isCapstone: false, isReview: false, phase: "ADVANCED" },
    { day: 24, skillId: "investing-concepts-2",titleTemplate: "Scenariusze finansowe",              missionTask: "Oblicz 3 scenariusze: optymistyczny, realistyczny, pesymistyczny", reflectionQuestion: "Jak planować na wypadek pesymistycznego scenariusza?",      isCapstone: false, isReview: true,  phase: "ADVANCED" },
    { day: 25, skillId: "income-sources-2",    titleTemplate: "Tydzień 5: Kompleksowy przegląd!",   missionTask: "Podsumuj wszystkie koncepcje w 1 stronie A4",              reflectionQuestion: "Jaka koncepcja zmieniła Twoje myślenie najbardziej?",             isCapstone: true,  isReview: false, phase: "ADVANCED" },
    { day: 26, skillId: "risk-understanding-2",titleTemplate: "Symulacja: zarządzaj portfelem",     missionTask: "Podziel 10 000 zł (wirtualnych) między różne cele/aktywa",  reflectionQuestion: "Jak wyważyłeś ryzyko i cel?",                                    isCapstone: false, isReview: false, phase: "INTEGRATION" },
    { day: 27, skillId: "investing-concepts-2",titleTemplate: "Long-term thinking",                 missionTask: "Oblicz swój majątek w wieku 30 lat zaczynając oszczędzać dziś",reflectionQuestion: "Co zmienisz w swoich zachowaniach finansowych od jutra?",       isCapstone: false, isReview: false, phase: "INTEGRATION" },
    { day: 28, skillId: "income-sources-2",    titleTemplate: "Twój finansowy brand",               missionTask: "Napisz 1-zdaniową misję finansową: 'Moim celem finansowym jest...'",reflectionQuestion: "Czy Twoja misja jest zgodna z Twoimi wartościami?",          isCapstone: false, isReview: false, phase: "INTEGRATION" },
    { day: 29, skillId: "risk-understanding-1",titleTemplate: "Final review: co wiesz?",            missionTask: "Quiz ze wszystkich tematów — sprawdź się!",                 reflectionQuestion: "Gdzie masz jeszcze luki w wiedzy?",                              isCapstone: false, isReview: true,  phase: "INTEGRATION" },
    { day: 30, skillId: "investing-concepts-2",titleTemplate: "🏆 DZIEŃ 30: Finansowy Achiever!",   missionTask: "Stwórz plan inwestycyjny na pierwsze 1000 zł własnych zarobków",reflectionQuestion: "Jak te 30 dni zmieniło Twoje podejście do pieniędzy i przyszłości?",isCapstone: true, isReview: false, phase: "INTEGRATION" },
  ],

  MASTER: [
    { day: 1,  skillId: "personal-finance-1",    titleTemplate: "System zarządzania finansami osobistymi",missionTask: "Opisz aktualny stan swoich finansów (przychody, wydatki, oszczędności)", reflectionQuestion: "Gdzie są największe luki w Twoim systemie finansowym?",      isCapstone: false, isReview: false, phase: "FOUNDATION" },
    { day: 2,  skillId: "personal-finance-1",    titleTemplate: "Net worth: Twoja finansowa wartość netto",missionTask: "Oblicz swoją obecną wartość netto (aktywa minus pasywa)", reflectionQuestion: "Jak planujesz zwiększyć swoją wartość netto w ciągu roku?",    isCapstone: false, isReview: false, phase: "FOUNDATION" },
    { day: 3,  skillId: "budget-optimization-1", titleTemplate: "Metoda 50/30/20 w praktyce",           missionTask: "Zastosuj metodę 50/30/20 do swojego miesięcznego dochodu",  reflectionQuestion: "Czy ta metoda pasuje do Twojej sytuacji?",                       isCapstone: false, isReview: false, phase: "FOUNDATION" },
    { day: 4,  skillId: "personal-finance-2",    titleTemplate: "Fundusz awaryjny: matematyczny dowód",  missionTask: "Oblicz ile potrzebujesz w funduszu awaryjnym i jak długo do niego dochodzisz", reflectionQuestion: "Co by się stało gdybyś stracił źródło dochodu jutro?",isCapstone: false, isReview: true,  phase: "FOUNDATION" },
    { day: 5,  skillId: "budget-optimization-1", titleTemplate: "Tydzień 1: Masz system finansowy!",    missionTask: "Ustaw automatyczny przelew oszczędności na dzień wypłaty",  reflectionQuestion: "Dlaczego automatyzacja jest kluczem do finansowego sukcesu?",    isCapstone: true,  isReview: false, phase: "FOUNDATION" },
    { day: 6,  skillId: "budget-optimization-2", titleTemplate: "Zero-based budgeting",                 missionTask: "Stwórz budżet zerowy na następny miesiąc",                  reflectionQuestion: "Jak poczułeś się przypisując każdej złotówce zadanie?",           isCapstone: false, isReview: false, phase: "CORE" },
    { day: 7,  skillId: "personal-finance-3",    titleTemplate: "Podatki dla młodych dorosłych",        missionTask: "Zbadaj jak działa PIT dla osób pracujących na umowę zlecenie", reflectionQuestion: "Jak podatki wpływają na Twój rzeczywisty dochód?",            isCapstone: false, isReview: false, phase: "CORE" },
    { day: 8,  skillId: "real-world-decisions-1",titleTemplate: "Kredyt: narzędzie vs pułapka",         missionTask: "Oblicz całkowity koszt kredytu 5000 zł na 12 mies. przy 15% RRSO", reflectionQuestion: "Kiedy kredyt jest finansowo uzasadniony?",                isCapstone: false, isReview: false, phase: "CORE" },
    { day: 9,  skillId: "budget-optimization-1", titleTemplate: "Optymalizacja stałych wydatków",       missionTask: "Znajdź 3 stałe koszty które możesz obniżyć bez pogorszenia jakości życia", reflectionQuestion: "Ile możesz zaoszczędzić miesięcznie przez optymalizację?",isCapstone: false, isReview: true,  phase: "CORE" },
    { day: 10, skillId: "personal-finance-2",    titleTemplate: "Tydzień 2: Finanse pod kontrolą!",     missionTask: "Stwórz dashboard finansowy: budżet, fundusz awaryjny, cele",  reflectionQuestion: "Jaką jedną zmianę wprowadzisz w swoich finansach od jutra?",    isCapstone: true,  isReview: false, phase: "CORE" },
    { day: 11, skillId: "real-world-decisions-1",titleTemplate: "Scoring kredytowy i historia finansowa",missionTask: "Dowiedz się co wpływa na scoring kredytowy w Polsce",        reflectionQuestion: "Jak budujesz swoją historię finansową już teraz?",              isCapstone: false, isReview: false, phase: "CORE" },
    { day: 12, skillId: "budget-optimization-2", titleTemplate: "Envelope method i zero-budgeting recap",missionTask: "Sprawdź postęp w implementacji zero-based budgeting po tygodniu",reflectionQuestion: "Jakie są zalety i wady tej metody?",                          isCapstone: false, isReview: false, phase: "CORE" },
    { day: 13, skillId: "personal-finance-3",    titleTemplate: "Optymalizacja podatkowa (legalnie!)",  missionTask: "Zbadaj ulgi podatkowe dostępne dla młodych pracowników (ulga dla młodych)", reflectionQuestion: "O ile zmniejsza się Twój podatek dzięki uldze dla młodych?", isCapstone: false, isReview: false, phase: "CORE" },
    { day: 14, skillId: "real-world-decisions-1",titleTemplate: "Analiza decyzji finansowych z przeszłości",missionTask: "Opisz 1 decyzję finansową którą byś dziś podjął inaczej",  reflectionQuestion: "Czego nauczyła Cię ta decyzja?",                                 isCapstone: false, isReview: true,  phase: "CORE" },
    { day: 15, skillId: "budget-optimization-2", titleTemplate: "Tydzień 3: Budżet jak pro!",           missionTask: "Porównaj swój budżet z 2 tygodnie temu — co się zmieniło?", reflectionQuestion: "Jaki jeden nawyk finansowy chcesz wyrobić na stałe?",            isCapstone: true,  isReview: false, phase: "CORE" },
    { day: 16, skillId: "real-world-decisions-2",titleTemplate: "Podstawy przedsiębiorczości",          missionTask: "Opisz pomysł na prosty biznes który możesz założyć już dziś", reflectionQuestion: "Jakie ryzyka i szanse widzisz w własnym biznesie?",             isCapstone: false, isReview: false, phase: "ADVANCED" },
    { day: 17, skillId: "personal-finance-3",    titleTemplate: "Emerytura: nie za wcześnie myśleć",    missionTask: "Oblicz ile miesięcznie musisz odkładać żeby mieć 1M zł na emeryturę",reflectionQuestion: "Dlaczego warto zacząć myśleć o emeryturze w wieku 18 lat?",  isCapstone: false, isReview: false, phase: "ADVANCED" },
    { day: 18, skillId: "real-world-decisions-1",titleTemplate: "Mieszkanie: kupno vs wynajem",         missionTask: "Oblicz koszty 5-letniego najmu vs kredytu hipotecznego",     reflectionQuestion: "Co jest lepszą decyzją finansową w Twojej sytuacji?",            isCapstone: false, isReview: false, phase: "ADVANCED" },
    { day: 19, skillId: "budget-optimization-2", titleTemplate: "FIRE movement: Financial Independence",missionTask: "Oblicz swój 'FIRE number' — ile potrzebujesz żeby nie musieć pracować",reflectionQuestion: "Czy FIRE jest osiągalnym celem dla Ciebie?",               isCapstone: false, isReview: true,  phase: "ADVANCED" },
    { day: 20, skillId: "real-world-decisions-2",titleTemplate: "Tydzień 4: Myślisz jak CFO!",          missionTask: "Stwórz P&L (przychody i koszty) swojego 'biznesu życia' na rok", reflectionQuestion: "Jak zmienił się Twój sposób myślenia o pieniądzach?",         isCapstone: true,  isReview: false, phase: "ADVANCED" },
    { day: 21, skillId: "personal-finance-2",    titleTemplate: "Ubezpieczenia: strategia ochrony",    missionTask: "Zbadaj jakie ubezpieczenia potrzebuje dorosły Twojego wieku", reflectionQuestion: "Jak ubezpieczenia wpisują się w plan finansowy?",               isCapstone: false, isReview: false, phase: "ADVANCED" },
    { day: 22, skillId: "real-world-decisions-2",titleTemplate: "Networking i kariera a zarobki",       missionTask: "Zbadaj widełki wynagrodzeń dla zawodów które Cię interesują", reflectionQuestion: "Jak możesz zwiększyć swoje zarobki przez first 5 lat kariery?", isCapstone: false, isReview: false, phase: "ADVANCED" },
    { day: 23, skillId: "budget-optimization-2", titleTemplate: "Życie powyżej możliwości: pułapka",    missionTask: "Zidentyfikuj obszary gdzie wydajesz więcej niż powinieneś",  reflectionQuestion: "Jak lifestyle inflation zabija długoterminowe bogactwo?",        isCapstone: false, isReview: false, phase: "ADVANCED" },
    { day: 24, skillId: "personal-finance-3",    titleTemplate: "Planowanie podatkowe na rok",         missionTask: "Stwórz prosty plan podatkowy: ulgi, odliczenia, terminy",   reflectionQuestion: "Ile możesz legalnie zaoszczędzić na podatkach?",                 isCapstone: false, isReview: true,  phase: "ADVANCED" },
    { day: 25, skillId: "real-world-decisions-2",titleTemplate: "Tydzień 5: Gotowy na dorosłość!",     missionTask: "Napisz swój 3-letni plan finansowy ze szczegółowymi krokami",reflectionQuestion: "Który krok jest najtrudniejszy i dlaczego?",                     isCapstone: true,  isReview: false, phase: "ADVANCED" },
    { day: 26, skillId: "real-world-decisions-2",titleTemplate: "Symulacja: Rok samodzielności",        missionTask: "Zaplanuj budżet pierwszego roku samodzielnego życia",       reflectionQuestion: "Czy jesteś finansowo gotowy na niezależność?",                   isCapstone: false, isReview: false, phase: "INTEGRATION" },
    { day: 27, skillId: "budget-optimization-2", titleTemplate: "Optymalizacja całościowa",            missionTask: "Przeglądnij cały swój system finansowy i zoptymalizuj 3 obszary", reflectionQuestion: "Jaki jeden obszar wymaga natychmiastowej poprawy?",           isCapstone: false, isReview: false, phase: "INTEGRATION" },
    { day: 28, skillId: "personal-finance-3",    titleTemplate: "Edukacja finansowa: przekazuj dalej",  missionTask: "Naucz kogoś (rodzinę/znajomego) jednej ważnej koncepcji finansowej",reflectionQuestion: "Jak nauczanie wpływa na Twoje własne rozumienie?",             isCapstone: false, isReview: false, phase: "INTEGRATION" },
    { day: 29, skillId: "real-world-decisions-1",titleTemplate: "Grand finale review",                 missionTask: "Napisz esej: 'Czego nauczyłem się o finansach przez 30 dni'", reflectionQuestion: "Jakie 3 zmiany wprowadzisz w ciągu najbliższych 30 dni?",      isCapstone: false, isReview: true,  phase: "INTEGRATION" },
    { day: 30, skillId: "real-world-decisions-2",titleTemplate: "🏆 DZIEŃ 30: Financial Master!",       missionTask: "Stwórz swój Finansowy Manifest — dokument który będzie Twoim kompasem finansowym na całe życie", reflectionQuestion: "Kim jesteś finansowo i kim chcesz być za 10 lat?", isCapstone: true, isReview: false, phase: "INTEGRATION" },
  ],
}

// ─────────────────────────────────────────────────────────────
// BASE XP per day (scaled by difficulty modifier)
// ─────────────────────────────────────────────────────────────

const BASE_XP = 40

// ─────────────────────────────────────────────────────────────
// buildDay
// ─────────────────────────────────────────────────────────────

export function buildDay(
  child: ChildProgramState,
  dayIndex: number     // 0-based
): DailyProgramDay {
  const day = dayIndex + 1
  const blueprint = BLUEPRINTS[child.ageGroup][dayIndex]!
  const skill = SKILLS_BY_ID[blueprint.skillId]
  const skillName = skill?.name ?? blueprint.skillId

  const difficultyScore = getDifficultyScore(day)
  const phase = getPhase(day)
  const xpModifier = getXpModifier(day)
  const xpReward = Math.round(BASE_XP * xpModifier)
  const capstone = isCapstoneDay(day)
  const review = isReviewDay(day)
  const timeBudget = getSessionTimeBudget(phase)
  const _diffLabel = getDifficultyLabel(difficultyScore)

  const loop = buildEngagementLoop(
    child.ageGroup,
    phase,
    day,
    xpReward,
    skillName,
    capstone,
    child.streakDays
  )

  const lesson: LessonActivity = {
    type: "LESSON",
    skillId: blueprint.skillId,
    title: `Lekcja: ${blueprint.titleTemplate}`,
    hook: loop.hook,
    estimatedMinutes: timeBudget.lesson,
  }

  const quiz: QuizActivity = {
    type: "QUIZ",
    skillId: blueprint.skillId,
    title: `Quiz: ${skillName}`,
    questionCount: capstone ? 7 : review ? 5 : 5,
    estimatedMinutes: timeBudget.quiz,
  }

  const mission: MissionActivity = {
    type: "MISSION",
    skillId: blueprint.skillId,
    title: `Misja dnia ${day}`,
    description: blueprint.missionTask,
    realLifeTask: blueprint.missionTask,
    estimatedMinutes: timeBudget.mission,
  }

  const reflection: ReflectionActivity = {
    type: "REFLECTION",
    question: blueprint.reflectionQuestion,
    estimatedMinutes: timeBudget.reflection,
  }

  return {
    day,
    title: blueprint.titleTemplate,
    phase,
    skillId: blueprint.skillId,
    skillName,
    lesson,
    quiz,
    mission,
    reflection,
    xpReward,
    estimatedMinutes: 30,
    difficultyScore,
    engagementHook: loop.hook,
    decisionMoment: loop.decisionMoment,
    rewardDescription: loop.reward.message,
    streakMessage: loop.streakReinforcement,
    prerequisites: skill?.prerequisites ?? [],
    isReviewDay: review,
    isCapstoneDay: capstone,
  }
}

// ─────────────────────────────────────────────────────────────
// buildWeekPlan
// ─────────────────────────────────────────────────────────────

export function buildWeekDays(
  child: ChildProgramState,
  weekIndex: number  // 0-based
): DailyProgramDay[] {
  const startDay = weekIndex * 7
  const endDay = Math.min(startDay + 7, 30)
  return Array.from({ length: endDay - startDay }, (_, i) =>
    buildDay(child, startDay + i)
  )
}
