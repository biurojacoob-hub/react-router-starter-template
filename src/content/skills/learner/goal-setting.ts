import type { SkillContent } from "../../types"

// ─────────────────────────────────────────────────────────────
// goal-setting-1 — Cel finansowy
// ─────────────────────────────────────────────────────────────

export const goalSetting1: SkillContent = {
  skillId: "goal-setting-1",
  lessons: [
    {
      id: "gs1-l1",
      skillId: "goal-setting-1",
      version: "1.0",
      order: 1,
      title: "Co to jest cel finansowy?",
      learningObjective: "Rozumiesz, czym różni się konkretny cel finansowy od ogólnego marzenia",
      estimatedMinutes: 10,
      introStory:
        "Dawid i Zuza oboje chcieli 'mieć więcej pieniędzy'. Dawid marzył: 'Kiedyś będę bogaty!' Zuza powiedziała konkretnie: 'Za 10 tygodni chcę mieć 80 zł na nowy plecak szkolny — odkładam 8 zł tygodniowo.' Po 10 tygodniach Zuza kupiła plecak. Dawid nadal marzył. Różnica między nimi nie była w marzeniu — była w celu. Cel to marzenie z planem i datą.",
      explanation:
        "Marzenie mówi 'chcę coś'. Cel mówi 'co dokładnie, za ile, do kiedy i jak'. Dobry cel finansowy jest SMART: S — Skonkretyzowany (co dokładnie chcę?), M — Mierzalny (ile to kosztuje?), A — Achievable czyli Osiągalny (czy to możliwe?), R — Realistyczny (czy pasuje do moich możliwości?), T — Terminowy (do kiedy?). Cel SMART zamienia mglisty sen w działający plan.",
      example:
        "Marzenie: 'Chcę nowe słuchawki.' Cel SMART: 'Do końca wakacji (14 tygodni) kupię słuchawki bezprzewodowe za 112 zł — będę odkładał 8 zł tygodniowo z kieszonkowego.' Sprawdź: konkretne (słuchawki, model) ✓, mierzalne (112 zł) ✓, osiągalne ✓, realistyczne (8 zł/tydzień) ✓, terminowe (14 tyg.) ✓.",
      challenge:
        "Weź jedno swoje marzenie i zamień je w cel SMART. Odpowiedz na 5 pytań: co dokładnie? ile kosztuje? czy to możliwe? ile mogę odkładać tygodniowo? do kiedy chcę to osiągnąć?",
      summary:
        "Cel SMART to marzenie z adresem i mapą — wiesz dokąd idziesz, kiedy tam dotrzesz i jak tam dojść.",
      tags: ["cel", "SMART", "planowanie", "marzenie"],
    },
    {
      id: "gs1-l2",
      skillId: "goal-setting-1",
      version: "1.0",
      order: 2,
      title: "Konkretny vs ogólny — dlaczego szczegóły mają znaczenie",
      learningObjective: "Potrafisz ocenić, czy cel jest wystarczająco konkretny, i poprawić go jeśli jest zbyt ogólny",
      estimatedMinutes: 11,
      introStory:
        "Nauczycielka dała klasie zadanie: 'Napiszcie swój cel finansowy.' Michał napisał: 'Chcę oszczędzać.' Pani zapytała: 'Na co? Ile? Kiedy?' Michał wzruszył ramionami. Ola napisała: 'Chcę za 8 tygodni mieć 64 zł na bilet na mecz plus kiełbasę — odkładam 8 zł z każdego kieszonkowego.' Pani powiedziała: 'Ola ma cel. Michał ma życzenie.' To zdanie zmieniło sposób myślenia całej klasy.",
      explanation:
        "Ogólny cel: 'Chcę oszczędzać' lub 'Chcę mieć więcej pieniędzy' — brzmi fajnie, ale nic nie mówi. Jak poznasz, że osiągnąłeś ten cel? Konkretny cel ma imię, cenę i datę. Trzy pytania, które zamieniają ogólny cel w konkretny: 1) Na co dokładnie? (np. plecak marki X, model Y). 2) Ile to kosztuje? (konkretna liczba). 3) Do kiedy chcę to mieć? (konkretna data lub liczba tygodni). Bez odpowiedzi na te trzy pytania cel jest tylko życzeniem.",
      example:
        "Ogólny: 'Chcę mieć nowe buty.' Konkretny: 'Do 15 września chcę mieć białe adidasy za 150 zł — to 15 tygodni po 10 zł.' Ogólny: 'Chcę pojechać na obóz.' Konkretny: 'Na obóz letni w lipcu potrzebuję 200 zł wkładu własnego — mam 20 tygodni, odkładam 10 zł tygodniowo.'",
      challenge:
        "Weź 3 ogólne cele i popraw je na konkretne. Przykłady ogólnych: 'chcę mieć nową grę', 'chcę kupić coś fajnego', 'chcę oszczędzać więcej'. Dla każdego odpowiedz: co dokładnie, ile, kiedy.",
      summary:
        "Konkretny cel ma imię, cenę i datę — tylko taki cel można osiągnąć, bo wiesz dokładnie do czego dążysz.",
      tags: ["konkretny", "ogólny", "cel", "szczegóły"],
    },
    {
      id: "gs1-l3",
      skillId: "goal-setting-1",
      version: "1.0",
      order: 3,
      title: "Motywacja — dlaczego chcesz to osiągnąć?",
      learningObjective: "Rozumiesz, czym jest motywacja wewnętrzna i dlaczego jest ważniejsza niż zewnętrzna presja",
      estimatedMinutes: 9,
      introStory:
        "Nadia oszczędzała na rower, bo mama powiedziała: 'Jak uzbierasz, dostaniesz rower.' Iga oszczędzała na rower, bo chciała pojechać na wakacje do babci w górach sama na rowerze — to było jej własne marzenie. Po 6 tygodniach Nadia 'zapomniała' o celu i wydała oszczędności. Iga wytrzymała 14 tygodni i kupiła rower. Psychologowie mówią: zewnętrzna nagroda nie trzyma tak mocno jak własne, głęboko odczuwane marzenie.",
      explanation:
        "Motywacja wewnętrzna to chęć, która pochodzi od ciebie — chcesz czegoś, bo TO jest ważne dla CIEBIE. Motywacja zewnętrzna to chęć spowodowana przez kogoś innego — nagroda, pochwała, presja. Kiedy cel jest naprawdę twój, łatwiej oprzeć się pokusom. Jak wzmacniać motywację wewnętrzną: zapisz DLACZEGO chcesz osiągnąć ten cel (nie 'bo mama powiedziała', ale 'bo...'), wyobraź sobie jak się poczujesz gdy cel osiągniesz, przypomnij sobie ten obraz kiedy masz ochotę wydać pieniądze.",
      example:
        "Iga, gdy miała pokusę wydania oszczędności na lody: zamknęła oczy i wyobraziła sobie jak jedzie rowerem górską ścieżką do babci. Poczuła ten wiatr we włosach i uśmiech babci na podwórku. Lody poczekają. Rower — nie.",
      challenge:
        "Weź swój cel finansowy. Napisz 3–5 powodów DLACZEGO chcesz go osiągnąć — powodów, które są naprawdę twoje. Przeczytaj je głośno. Jak się czujesz po przeczytaniu?",
      summary:
        "Cel finansowy osadzony w głębokiej, osobistej motywacji jest trzy razy trudniejszy do porzucenia — twoje 'dlaczego' to twój finansowy rdzeń.",
      tags: ["motywacja", "wewnętrzna", "cel", "wytrwałość"],
    },
  ],
  quiz: {
    id: "gs1-quiz",
    skillId: "goal-setting-1",
    version: "1.0",
    title: "Quiz: Cel finansowy",
    questions: [
      {
        id: "gs1-q1",
        difficulty: "EASY",
        question: "Co oznacza litera 'S' w metodzie SMART?",
        options: [
          "Szybki (cel musi być szybki do osiągnięcia)",
          "Skonkretyzowany (cel musi być dokładnie określony)",
          "Skromny (cel musi być niezbyt drogi)",
          "Spontaniczny (cel może zmienić się w każdej chwili)",
        ],
        correctIndex: 1,
        explanation:
          "S = Skonkretyzowany — cel musi odpowiadać na pytanie: co dokładnie chcę osiągnąć? Im bardziej konkretny, tym lepszy.",
      },
      {
        id: "gs1-q2",
        difficulty: "MEDIUM",
        question: "Który z tych celów jest SMART?",
        options: [
          "Chcę mieć więcej pieniędzy",
          "Chcę oszczędzać",
          "Za 12 tygodni kupię zestaw farb za 96 zł — odkładam 8 zł tygodniowo",
          "Kiedyś chcę pojechać w podróż",
        ],
        correctIndex: 2,
        explanation:
          "Tylko trzecia opcja jest SMART: konkretna (zestaw farb, cena 96 zł), mierzalna (96 zł), osiągalna, realistyczna (8 zł/tydzień) i terminowa (12 tygodni).",
      },
      {
        id: "gs1-q3",
        difficulty: "MEDIUM",
        question: "Czym różni się motywacja wewnętrzna od zewnętrznej?",
        options: [
          "Wewnętrzna pochodzi od rodziny, zewnętrzna od przyjaciół",
          "Wewnętrzna jest twoja własna i głęboka, zewnętrzna pochodzi od innych (nagrody, presja)",
          "Wewnętrzna jest słabsza, zewnętrzna jest silniejsza",
          "Nie ma między nimi żadnej różnicy",
        ],
        correctIndex: 1,
        explanation:
          "Motywacja wewnętrzna pochodzi z twoich własnych wartości i marzeń — jest trwalsza. Zewnętrzna (nagrody, pochwały innych) łatwiej gaśnie gdy nagroda znika.",
      },
      {
        id: "gs1-q4",
        difficulty: "HARD",
        question: "Cel: 'Kupię nową gitarę za 240 zł. Odkładam 12 zł tygodniowo i mam już 60 zł.' Za ile tygodni osiągnę cel?",
        options: ["15 tygodni", "20 tygodni", "12 tygodni", "5 tygodni"],
        correctIndex: 0,
        explanation:
          "Brakuje: 240 − 60 = 180 zł. 180 ÷ 12 = 15 tygodni. Cel osiągniesz za 15 tygodni.",
      },
      {
        id: "gs1-q5",
        difficulty: "HARD",
        question: "Ola chce kupić aparat fotograficzny za 360 zł. Ma 9 tygodni wakacji i może odkładać 25 zł tygodniowo. Czy osiągnie cel do końca wakacji? Ile jej braknie lub zostanie?",
        options: [
          "Tak, osiągnie — zostanie jej 45 zł nadwyżki",
          "Nie, zabraknie jej 135 zł",
          "Tak, osiągnie — nie zostanie nic",
          "Nie, zabraknie jej 45 zł",
        ],
        correctIndex: 3,
        explanation:
          "W 9 tygodniach Ola uzbiera: 9 × 25 = 225 zł. Aparat kosztuje 360 zł. Braknie: 360 − 225 = 135 zł. Cel nieosiągalny w tym czasie — Ola powinna albo wydłużyć czas albo zwiększyć tygodniową kwotę.",
      },
    ],
  },
  missions: [
    {
      id: "gs1-m1",
      skillId: "goal-setting-1",
      version: "1.0",
      order: 1,
      difficulty: "QUICK",
      title: "Mój cel SMART",
      description: "Sformułuj jeden konkretny cel finansowy metodą SMART.",
      realLifeTask:
        "Weź kartkę. Napisz swój cel odpowiadając na 5 pytań: Co dokładnie chcę kupić lub osiągnąć? Ile to kosztuje (sprawdź cenę!)? Czy to realistyczne? Ile mogę odkładać tygodniowo? Do kiedy chcę osiągnąć cel (podaj datę lub liczbę tygodni)? Zapisz cel jednym zdaniem i powieś w swoim pokoju.",
      estimatedMinutes: 15,
      successCriteria:
        "Masz cel zapisany jako jedno konkretne zdanie z ceną i datą. Cel wisi w twoim pokoju.",
    },
    {
      id: "gs1-m2",
      skillId: "goal-setting-1",
      version: "1.0",
      order: 2,
      difficulty: "STANDARD",
      title: "Dlaczego naprawdę tego chcę?",
      description: "Odkryj głęboki powód swojego celu finansowego i wzmocnij motywację.",
      realLifeTask:
        "Weź kartkę i napisz swój cel finansowy. Teraz pięć razy zapytaj siebie 'Dlaczego?' (technika 5×Dlaczego): Dlaczego chcę ten cel? → (odpowiedź) → Dlaczego to jest dla mnie ważne? → (odpowiedź) → i tak dalej. Po 5 odpowiedziach zwykle docierasz do prawdziwego, głębokiego powodu. Zapisz go wielką literą. Czy zmienił się twój cel po tym ćwiczeniu?",
      estimatedMinutes: 20,
      successCriteria:
        "Masz 5 odpowiedzi na 'dlaczego' i odkryty głęboki powód swojego celu. Twój cel jest bardziej twój niż przed ćwiczeniem.",
      parentTip:
        "Przeprowadź to ćwiczenie razem z dzieckiem zadając pytania 'dlaczego' — to piękna rozmowa o wartościach.",
    },
    {
      id: "gs1-m3",
      skillId: "goal-setting-1",
      version: "1.0",
      order: 3,
      difficulty: "CHALLENGE",
      title: "Tablica celów",
      description: "Stwórz wizualną tablicę z 3 celami finansowymi na różny czas.",
      realLifeTask:
        "Zrób tablicę celów (plakat, karton, okładka zeszytu). Umieść na niej 3 cele finansowe: KRÓTKOTERMINOWY (do 4 tygodni), ŚREDNIOTERMINOWY (do 3 miesięcy), DŁUGOTERMINOWY (ponad 3 miesiące). Dla każdego napisz: co to jest, ile kosztuje, do kiedy, ile tygodniowo. Dodaj rysunki lub wycinki z gazet. Powieś w widocznym miejscu i przez miesiąc śledź postęp celu krótkoterminowego.",
      estimatedMinutes: 45,
      successCriteria:
        "Masz tablicę z 3 celami SMART (krótki, średni, długi), każdy z ceną i datą. Po miesiącu cel krótkoterminowy jest osiągnięty lub w trakcie realizacji.",
      parentTip:
        "Pomóż dziecku sprawdzić realność cen — razem sprawdźcie w sklepie lub internecie ile naprawdę kosztują planowane rzeczy.",
    },
  ],
}

// ─────────────────────────────────────────────────────────────
// goal-setting-2 — Plan oszczędzania
// ─────────────────────────────────────────────────────────────

export const goalSetting2: SkillContent = {
  skillId: "goal-setting-2",
  lessons: [
    {
      id: "gs2-l1",
      skillId: "goal-setting-2",
      version: "1.0",
      order: 1,
      title: "Oblicz swoją drogę do celu",
      learningObjective: "Potrafisz obliczyć tygodniową kwotę potrzebną do osiągnięcia celu w określonym czasie",
      estimatedMinutes: 11,
      introStory:
        "Olek chciał kupić zestaw do rysowania za 90 zł. Miał wakacje — 12 tygodni. 'Prosto!' powiedział i wziął kalkulator. 90 ÷ 12 = 7,50 zł tygodniowo. Olek dostawał 20 zł kieszonkowego. 7,50 zł z 20 zł — to możliwe! Przez 12 tygodni odkładał co tydzień 7,50 zł. W ostatnim tygodniu wakacji wszedł do sklepu z dokładnie 90 zł w portfelu. 'Liczyłem to w maju,' pomyślał. 'Teraz jest sierpień. Plan zadziałał.'",
      explanation:
        "Obliczenie planu oszczędzania to proste działanie matematyczne: kwota tygodniowa = cena celu ÷ liczba tygodni. Masz dwa warianty planowania: 1) Wiesz ILE możesz odkładać — oblicz kiedy osiągniesz cel: tygodnie = cena ÷ kwota tygodniowa. 2) Wiesz KIEDY chcesz cel osiągnąć — oblicz ile musisz odkładać: kwota = cena ÷ tygodnie. Ważne: jeśli potrzebna kwota tygodniowa jest za wysoka — albo wydłuż czas, albo znajdź tańszą wersję celu.",
      example:
        "Cel: gitara za 180 zł. Wariant 1: mogę odkładać 15 zł/tydzień. Kiedy: 180 ÷ 15 = 12 tygodni. Wariant 2: chcę kupić za 8 tygodni. Ile: 180 ÷ 8 = 22,50 zł/tydzień. 'Za dużo!' mówi Ola. Kompromis: 10 tygodni → 180 ÷ 10 = 18 zł/tydzień — to możliwe!",
      challenge:
        "Weź swój cel SMART z poprzedniej lekcji. Oblicz: tygodniową kwotę (cel ÷ tygodnie). Czy mieści się w twoim budżecie? Jeśli nie — co możesz zrobić? Wydłużyć czas czy zmienić cel?",
      summary:
        "Plan oszczędzania to jedno równanie: kwota × tygodnie = cel — opanuj to działanie i zawsze będziesz wiedzieć jak dojść do każdego finansowego marzenia.",
      tags: ["obliczenia", "plan", "tygodniowa kwota", "cel"],
    },
    {
      id: "gs2-l2",
      skillId: "goal-setting-2",
      version: "1.0",
      order: 2,
      title: "Harmonogram oszczędzania — krok po kroku",
      learningObjective: "Potrafisz stworzyć tygodniowy harmonogram oszczędzania z kontrolą postępów",
      estimatedMinutes: 12,
      introStory:
        "Zosia dostała od starszej siostry radę: 'Jak chcesz czegoś naprawdę chcieć — narysuj drogę do tego.' Zosia nie rozumiała. 'Co to znaczy?' 'Narysuj harmonogram. Każdy tydzień to jeden krok. Widzisz jak się zbliżasz.' Zosia zrobiła tabelkę na 10 tygodni. W każdej komórce wpisała datę i kwotę do odłożenia. Co tydzień zamalowywała komórkę zielonym. Po 10 tygodniach wszystkie komórki były zielone. Cel: nowe łyżwy. Efekt: łyżwy i poczucie, że potrafi zrobić wszystko.",
      explanation:
        "Harmonogram oszczędzania to tabelka, w której każdy tydzień to jeden wiersz. Kolumny: numer tygodnia, data, planowana wpłata, rzeczywista wpłata, suma łącznie. Każdy tydzień po wykonaniu wpłaty zaznaczasz ją (koloruj, fajka, emotka). Harmonogram daje ci: widok postępu (ile zrobiłeś), motywację (ile zostało), kontrolę (czy jesteś w planie). Śledź co tydzień — to tylko 2 minuty!",
      example:
        "Harmonogram Zosi (cel: 80 zł, 10 tygodni, 8 zł/tydzień). Tydzień 1: 08.09, plan 8 zł, wpłata 8 zł, suma 8 zł ✅. Tydzień 2: 15.09, plan 8 zł, wpłata 10 zł (dostałam urodzinowe!), suma 18 zł ✅. Tydzień 3: 22.09, plan 8 zł, wpłata 8 zł, suma 26 zł ✅. Zosia jest 2 zł 'do przodu' — może osiągnąć cel tydzień wcześniej!",
      challenge:
        "Stwórz harmonogram dla swojego celu: narysuj tabelkę z tygodniami, datami i planowanymi kwotami. Oblicz łączną sumę przy każdym tygodniu. Kiedy suma osiągnie cenę celu?",
      summary:
        "Harmonogram zamienia abstrakcyjny cel w konkretną trasę — każdy tydzień to krok naprzód, każda fajka to mały sukces.",
      tags: ["harmonogram", "tygodnie", "postęp", "tabelka"],
    },
    {
      id: "gs2-l3",
      skillId: "goal-setting-2",
      version: "1.0",
      order: 3,
      title: "Co zrobić gdy plan się sypie?",
      learningObjective: "Znasz sposoby dostosowania planu oszczędzania gdy idzie za wolno lub za szybko",
      estimatedMinutes: 10,
      introStory:
        "Karol oszczędzał na nowy plecak. Plan: 10 tygodni, 10 zł/tydzień. W tygodniu 4. wydał za dużo i nie odłożył nic. W tygodniu 5. odłożył tylko 5 zł. 'Wszystko się posypało,' myślał. Ale zamiast rzucić plan, otworzył harmonogram i policzył: brakuje mu 15 zł w stosunku do planu. 'Mogę odłożyć 15 zł więcej przez 3 tygodnie — 5 zł więcej co tydzień.' Dostosował plan. Cel osiągnął tydzień później niż planował — ale osiągnął!",
      explanation:
        "Plan oszczędzania to mapa, nie wyrok. Możesz go zmieniać. Gdy idzie ZA WOLNO (odłożyłeś mniej niż planowałeś): opcja 1 — nadrobić przez następne tygodnie (odłóż więcej), opcja 2 — przesunąć datę celu. Gdy idzie ZA SZYBKO (masz nadwyżkę, np. dostałeś prezent): opcja 1 — osiągnąć cel wcześniej, opcja 2 — odkładać mniej co tydzień i mieć więcej na bieżące wydatki. Najważniejsze: nie porzucaj planu przy pierwszym problemie — dostosuj go.",
      example:
        "Karol, tydzień 6 (zaległość: −15 zł). Decyzja: przez 3 tygodnie odłoży 15 zł zamiast 10 zł (5 zł więcej). Skąd te 5 zł ekstra? Przez 3 tygodnie nie kupi słodyczy (oszczędność ~5 zł/tydzień). Po 3 tygodniach nadrobił zaległość i wrócił do normalnego tempa.",
      challenge:
        "Wyobraź sobie: jesteś w połowie planu oszczędzania (tydzień 5 z 10). Zamiast 50 zł masz tylko 35 zł. O ile zł jesteś 'do tyłu'? Jakie masz 3 opcje, żeby nadrobić? Wybierz jedną i oblicz szczegóły.",
      summary:
        "Plan nie musi być doskonały — musi być elastyczny. Dostosowuj go zamiast porzucać, a cel osiągniesz nawet po przeszkodach.",
      tags: ["dostosowanie", "plan", "elastyczność", "nadrobienie"],
    },
  ],
  quiz: {
    id: "gs2-quiz",
    skillId: "goal-setting-2",
    version: "1.0",
    title: "Quiz: Plan oszczędzania",
    questions: [
      {
        id: "gs2-q1",
        difficulty: "EASY",
        question: "Jaki wzór służy do obliczenia tygodniowej kwoty oszczędzania?",
        options: [
          "Kwota = tygodnie × wpływy",
          "Kwota = cena celu ÷ liczba tygodni",
          "Kwota = wpływy − wydatki",
          "Kwota = cena celu × tygodnie",
        ],
        correctIndex: 1,
        explanation:
          "Tygodniowa kwota = cena celu ÷ liczba tygodni. Np. cel 90 zł w 9 tygodniach = 90 ÷ 9 = 10 zł/tydzień.",
      },
      {
        id: "gs2-q2",
        difficulty: "MEDIUM",
        question: "Chcesz kupić hulajnogę za 175 zł. Możesz odkładać 25 zł tygodniowo. Za ile tygodni osiągniesz cel?",
        options: ["5 tygodni", "7 tygodni", "10 tygodni", "4 tygodnie"],
        correctIndex: 1,
        explanation:
          "175 ÷ 25 = 7 tygodni. Za siedem tygodni będziesz mieć dokładnie 175 zł.",
      },
      {
        id: "gs2-q3",
        difficulty: "MEDIUM",
        question: "Co powinieneś zrobić, gdy obliczona tygodniowa kwota jest za wysoka w stosunku do twoich możliwości?",
        options: [
          "Porzucić cel, bo jest nieosiągalny",
          "Pożyczyć brakujące pieniądze",
          "Wydłużyć czas lub wybrać tańszą wersję celu",
          "Nie robić nic i zobaczyć co się stanie",
        ],
        correctIndex: 2,
        explanation:
          "Gdy kwota jest za wysoka, masz dwa rozwiązania: wydłużyć czas (więcej tygodni = mniejsza tygodniowa kwota) lub znaleźć tańszą wersję celu. Porzucanie i pożyczanie to złe opcje.",
      },
      {
        id: "gs2-q4",
        difficulty: "HARD",
        question: "Jesteś w tygodniu 6 z 12. Plan: 120 zł, odkładasz 10 zł/tydzień. Masz tylko 48 zł zamiast 60 zł. O ile zł jesteś do tyłu i ile musisz odłożyć tygodniowo przez pozostałe 6 tygodni, żeby osiągnąć cel?",
        options: [
          "12 zł do tyłu, 12 zł/tydzień przez 6 tygodni",
          "12 zł do tyłu, 12 zł/tydzień przez ostatnie 6 tygodni",
          "Brakuje 72 zł w pozostałych 6 tygodniach, czyli 12 zł/tydzień",
          "Brakuje 12 zł zaległości, razem trzeba 72 zł w 6 tygodniach = 12 zł/tydzień",
        ],
        correctIndex: 3,
        explanation:
          "Do planu brakuje: 60 − 48 = 12 zł zaległości. Zostało: 120 − 48 = 72 zł do celu. W 6 tygodniach: 72 ÷ 6 = 12 zł/tydzień (zamiast planowanych 10 zł). 2 zł więcej tygodniowo pokryje zaległość.",
      },
      {
        id: "gs2-q5",
        difficulty: "HARD",
        question: "Ania oszczędza na plecak za 144 zł. Odkłada 12 zł/tydzień. W tygodniu 4. dostała 30 zł na urodziny i wrzuciła je do skarbonki. Po tygodniu 4. ile ma i ile tygodni wcześniej osiągnie cel niż planowała?",
        options: [
          "Ma 78 zł, osiągnie cel 2,5 tygodnia wcześniej",
          "Ma 48 zł, osiągnie cel 2,5 tygodnia wcześniej",
          "Ma 78 zł, osiągnie cel dokładnie zgodnie z planem",
          "Ma 78 zł, nie wiadomo kiedy osiągnie cel",
        ],
        correctIndex: 0,
        explanation:
          "Po 4 tygodniach: 4 × 12 = 48 zł + 30 zł urodzinowe = 78 zł. Brakuje: 144 − 78 = 66 zł. Przy 12 zł/tydzień: 66 ÷ 12 = 5,5 tygodnia. Oryginalny plan: 144 ÷ 12 = 12 tygodni, czyli zostało by 8 tygodni. Ania skróciła czas z 8 do 5,5 tygodni — oszczędzi 2,5 tygodnia.",
      },
    ],
  },
  missions: [
    {
      id: "gs2-m1",
      skillId: "goal-setting-2",
      version: "1.0",
      order: 1,
      difficulty: "QUICK",
      title: "Oblicz swój plan",
      description: "Dla swojego celu finansowego oblicz tygodniową kwotę i czas potrzebny do jego osiągnięcia.",
      realLifeTask:
        "Weź swój cel finansowy (cenę). Zdecyduj: ile możesz odkładać tygodniowo? Oblicz: ile tygodni potrzebujesz (cena ÷ kwota tygodniowa). Oblicz: kiedy to będzie (dodaj tygodnie do dzisiejszej daty). Zapisz: 'Odkładam ___ zł tygodniowo i osiągnę cel za ___ tygodni, czyli ___.' (data).",
      estimatedMinutes: 10,
      successCriteria:
        "Masz obliczoną tygodniową kwotę, liczbę tygodni i konkretną datę osiągnięcia celu.",
    },
    {
      id: "gs2-m2",
      skillId: "goal-setting-2",
      version: "1.0",
      order: 2,
      difficulty: "STANDARD",
      title: "Harmonogram na papierze",
      description: "Stwórz i zacznij realizować tygodniowy harmonogram oszczędzania.",
      realLifeTask:
        "Narysuj tabelkę harmonogramu dla swojego celu: kolumny — tydzień, data, plan, wpłata, suma. Wypełnij kolumny Plan i Daty dla wszystkich tygodni. Zacznij śledzić rzeczywiste wpłaty. Po każdej wpłacie zaznacz tydzień zielonym kolorem. Przez minimum 4 tygodnie śledź postęp.",
      estimatedMinutes: 25,
      successCriteria:
        "Masz harmonogram z co najmniej 4 tygodniami wpłat. Wiesz ile brakuje do celu i kiedy go osiągniesz.",
      parentTip:
        "Co tydzień pytaj: 'Ile masz teraz? Ile brakuje? Kiedy osiągniesz cel?' — to uczucie kontroli bardzo motywuje.",
    },
    {
      id: "gs2-m3",
      skillId: "goal-setting-2",
      version: "1.0",
      order: 3,
      difficulty: "CHALLENGE",
      title: "Plan z symulacją przeszkód",
      description: "Stwórz plan oszczędzania uwzględniający możliwe przeszkody i sposoby ich pokonania.",
      realLifeTask:
        "Stwórz pełny harmonogram dla swojego celu. Następnie 'zasymuluj' 3 trudne tygodnie: tydzień 2 — nie możesz odłożyć nic (bo wydałeś za dużo), tydzień 4 — odkładasz tylko połowę planu, tydzień 6 — nieoczekiwanie dostajesz 20 zł extra. Dla każdej sytuacji oblicz: ile masz po tym tygodniu, o ile odbiega od planu i jak się dostosujesz w kolejnych tygodniach. Napisz 'plan awaryjny' — co zrobisz gdy plan się posypie.",
      estimatedMinutes: 45,
      successCriteria:
        "Masz harmonogram z 3 symulowanymi przeszkodami, obliczeniami korekt i pisemnym planem awaryjnym.",
      parentTip:
        "Omów razem 'plan awaryjny' — co naprawdę mogłoby się przydarzyć i jak dziecko by sobie poradziło. To buduje finansową odporność.",
    },
  ],
}
