import type { SkillContent } from "../../types"

// ─────────────────────────────────────────────────────────────
// saving-basics-1 — Skarbonka — pierwszy krok
// ─────────────────────────────────────────────────────────────

export const savingBasics1: SkillContent = {
  skillId: "saving-basics-1",
  lessons: [
    {
      id: "sb1-l1",
      skillId: "saving-basics-1",
      version: "1.0",
      order: 1,
      title: "Dlaczego warto odkładać?",
      learningObjective: "Rozumiesz, że odkładanie części pieniędzy daje ci siłę na przyszłość",
      estimatedMinutes: 7,
      introStory:
        "Marek i Janek dostali po 10 zł. Marek od razu wydał wszystko na słodycze. Janek odłożył 5 zł, a za 5 zł kupił lody. Tydzień później w sklepie pojawiła się super gra za 9 zł. Marek nie mógł jej kupić — nie miał nic. Janek wyciągnął skarbonkę i zapłacił. 'To nie magia,' powiedział Janek. 'Ja po prostu nie wydałem wszystkiego na raz.'",
      explanation:
        "Oszczędzanie to odkładanie części pieniędzy na później. To jak 'karmienie przyszłości' — nie wydajesz teraz, żeby mieć więcej możliwości potem. Nie musisz odkładać dużo — nawet 1 zł z każdej dziesiątki robi różnicę. Najważniejsze to robić to regularnie, za każdym razem.",
      example:
        "Dostajesz 10 zł kieszonkowego w piątek. Zasada: zawsze odłóż 2 zł (20%). Za 5 tygodni masz już 10 zł w skarbonce. Za 10 tygodni — 20 zł. Na coś, na co nigdy byś nie uzbierał 'od razu'.",
      challenge:
        "Postanów: ile procent swoich pieniędzy będziesz odkładać? Zaproponuj siebie zasadę (np. '1 zł z każdej dziesiątki' lub '2 zł tygodniowo bez względu na wszystko').",
      summary:
        "Oszczędzanie to nawyk — małe, regularne odkładanie buduje z czasem dużą sumę i daje ci wolność wyboru.",
      tags: ["oszczędzanie", "nawyk", "skarbonka", "odkładanie"],
    },
    {
      id: "sb1-l2",
      skillId: "saving-basics-1",
      version: "1.0",
      order: 2,
      title: "Jak działa skarbonka — pierwsza własna 'kasa'",
      learningObjective: "Potrafisz założyć i prowadzić prostą skarbonkę",
      estimatedMinutes: 8,
      introStory:
        "Babcia Zosi miała starą świnkę skarbonkę z porcelany. Zosia zapytała: 'Babciu, dlaczego akurat świnka?' Babcia powiedziała: 'Bo świnia jest symbolem dobrobytu i oszczędności. Moja mama mówiła: 'świnka fullna — świat Cię nie pokona'.'. Zosia postanowiła mieć własną skarbonkę — ale niekoniecznie świnkę.",
      explanation:
        "Skarbonka to twój pierwszy 'bank' — miejsce, gdzie bezpiecznie trzymasz pieniądze. Może być: ceramiczna świnka, pudełko po butach, słoik z pokrywką, specjalna puszka. Kluczowe zasady: 1) Wkładaj regularnie. 2) Nie otwieraj 'po nic' — tylko dla konkretnego celu. 3) Policz zawartość raz w tygodniu — motywuje!",
      example:
        "Julka ma słoik z naklejką 'ROWER'. Każdy piątek wkłada do niego 5 zł. Po 10 tygodniach ma 50 zł. Rower kosztuje 150 zł — potrzebuje więc jeszcze 20 tygodni. Wie dokładnie, kiedy to osiągnie. To trzyma ją na kursie.",
      challenge:
        "Zrób SWOJĄ skarbonkę: weź słoik, pudełko lub kup prawdziwą skarbonkę. Napisz na niej swoje imię. Wrzuć pierwsze pieniądze — nawet monety groszowe. Start!",
      summary:
        "Skarbonka to twój pierwszy krok do finansowej niezależności — regularne odkładanie, nawet małych kwot, buduje nawyk na całe życie.",
      tags: ["skarbonka", "nawyk", "regularność", "cel"],
    },
    {
      id: "sb1-l3",
      skillId: "saving-basics-1",
      version: "1.0",
      order: 3,
      title: "Zasada 'najpierw siebie zapłać'",
      learningObjective: "Rozumiesz zasadę odkładania przed wydawaniem",
      estimatedMinutes: 7,
      introStory:
        "Pani Kowalska nauczyła Tomka jednej sztuczki: 'Kiedy dostajesz pieniądze, najpierw zapłać przyszłemu sobie — odłóż część do skarbonki. Dopiero resztę możesz wydać.' Tomek nie rozumiał. 'Jak zapłacę sobie?' 'Bo twoje przyszłe ja będzie ci wdzięczne, że nie wydałeś wszystkiego teraz.'",
      explanation:
        "Zasada 'pay yourself first' — najpierw oszczędzaj, potem wydawaj. Zamiast odkładać to, co zostanie na koniec (często nic!), zacznij od odłożenia ustalonej kwoty. Resztą dopiero zarządzaj. W ten sposób oszczędzanie staje się obowiązkowe, a nie opcjonalne.",
      example:
        "Dostajesz 20 zł. STARA metoda: wydajesz 18 zł, odkładasz 2 zł (co zostało). NOWA metoda: od razu odkładasz 4 zł, wydajesz 16 zł. Różnica: w nowej metodzie oszczędzasz 2× więcej i to działa automatycznie.",
      challenge:
        "Następnym razem gdy dostaniesz kieszonkowe lub pieniądze od babci — zanim cokolwiek kupisz, odłóż 20% do skarbonki. Jak się czujesz?",
      summary:
        "Najpierw oszczędź, potem wydaj resztę — ta prosta zasada sprawia, że oszczędzanie działa automatycznie.",
      tags: ["pay yourself first", "zasada", "oszczędzanie", "automatyzm"],
    },
  ],
  quiz: {
    id: "sb1-quiz",
    skillId: "saving-basics-1",
    version: "1.0",
    title: "Quiz: Skarbonka — pierwszy krok",
    questions: [
      {
        id: "sb1-q1",
        difficulty: "EASY",
        question: "Co to znaczy 'oszczędzać'?",
        options: [
          "Wydawać pieniądze szybko, żeby nie stracić",
          "Odkładać część pieniędzy na późniejszy czas",
          "Pożyczać pieniądze od przyjaciela",
          "Liczyć pieniądze codziennie",
        ],
        correctIndex: 1,
        explanation:
          "Oszczędzanie to odkładanie części pieniędzy — nie wydajesz wszystkiego teraz, żeby mieć więcej możliwości w przyszłości.",
      },
      {
        id: "sb1-q2",
        difficulty: "MEDIUM",
        question: "Dostajesz 10 zł i odkładasz 20%. Ile wkładasz do skarbonki?",
        options: ["1 zł", "2 zł", "5 zł", "8 zł"],
        correctIndex: 1,
        explanation: "20% z 10 zł = 2 zł. 20% to jedna piąta całości.",
      },
      {
        id: "sb1-q3",
        difficulty: "MEDIUM",
        question: "Co oznacza zasada 'najpierw zapłać sobie'?",
        options: [
          "Kupuj sobie co chcesz, zanim zapłacisz rachunki",
          "Odłóż część pieniędzy ZANIM cokolwiek wydasz",
          "Zapłać sobie wynagrodzenie za prace domowe",
          "Zawsze miej pieniądze tylko dla siebie",
        ],
        correctIndex: 1,
        explanation:
          "To technika, gdzie najpierw odkładasz zaplanowaną kwotę, a dopiero resztą zarządzasz — oszczędzanie staje się automatyczne.",
      },
      {
        id: "sb1-q4",
        difficulty: "HARD",
        question: "Odkładasz 5 zł tygodniowo. Po ilu tygodniach będziesz mieć 60 zł?",
        options: ["10 tygodni", "12 tygodni", "15 tygodni", "20 tygodni"],
        correctIndex: 1,
        explanation: "60 zł ÷ 5 zł/tydzień = 12 tygodni.",
      },
      {
        id: "sb1-q5",
        difficulty: "HARD",
        question: "Masz 25 zł i odkładasz 1/5. Ile możesz wydać?",
        options: ["5 zł", "15 zł", "20 zł", "24 zł"],
        correctIndex: 2,
        explanation: "1/5 z 25 zł = 5 zł odłożone. Zostaje 25 − 5 = 20 zł do wydania.",
      },
    ],
  },
  missions: [
    {
      id: "sb1-m1",
      skillId: "saving-basics-1",
      version: "1.0",
      order: 1,
      difficulty: "QUICK",
      title: "Załóż swoją skarbonkę",
      description: "Stwórz swoje pierwsze miejsce do odkładania pieniędzy.",
      realLifeTask:
        "Znajdź lub zrób skarbonkę: słoik, pudełko, koperta, świnka. Napisz na niej swoje imię i datę startu. Wrzuć pierwsze pieniądze — cokolwiek masz. Powiedz głośno: 'To jest mój fundusz przyszłości.'",
      estimatedMinutes: 10,
      successCriteria: "Masz skarbonkę z pierwszymi pieniędzmi i datą startu.",
    },
    {
      id: "sb1-m2",
      skillId: "saving-basics-1",
      version: "1.0",
      order: 2,
      difficulty: "STANDARD",
      title: "Tydzień odkładania",
      description: "Przez 7 dni stosuj zasadę 'najpierw zapłać sobie'.",
      realLifeTask:
        "Przez 7 dni: każdą złotówkę, którą dostaniesz (kieszonkowe, od babci, za pomoc), podziel: 20% do skarbonki, reszta do wydania. Zapisuj każdy wpływ i ile odłożyłeś. Po tygodniu policz całość w skarbonce.",
      estimatedMinutes: 60,
      successCriteria: "Odłożyłeś coś przez 7 dni i masz wypełniony dzienniczek.",
      parentTip: "Przypominaj dziecku codziennie przez tydzień o 'obowiązku odkładania'.",
    },
    {
      id: "sb1-m3",
      skillId: "saving-basics-1",
      version: "1.0",
      order: 3,
      difficulty: "CHALLENGE",
      title: "Miesiąc z wykresem oszczędności",
      description: "Śledź swoje oszczędności przez cały miesiąc i narysuj wykres postępów.",
      realLifeTask:
        "Przez 4 tygodnie odkładaj co tydzień stałą kwotę (minimum 2 zł). Co tydzień dorysuj słupek na wykresie — jak rośnie twoja suma. Na koniec miesiąca policz ile łącznie odłożyłeś i jak wyglądałby rok w tym tempie.",
      estimatedMinutes: 120,
      successCriteria:
        "Masz wykres z 4 słupkami i wiesz ile odłożysz w ciągu roku w tym tempie.",
    },
  ],
}

// ─────────────────────────────────────────────────────────────
// saving-basics-2 — Mały cel = duży sukces
// ─────────────────────────────────────────────────────────────

export const savingBasics2: SkillContent = {
  skillId: "saving-basics-2",
  lessons: [
    {
      id: "sb2-l1",
      skillId: "saving-basics-2",
      version: "1.0",
      order: 1,
      title: "Cel nadaje sens oszczędzaniu",
      learningObjective: "Potrafisz wyznaczyć konkretny cel oszczędzania i policzyć czas do jego osiągnięcia",
      estimatedMinutes: 8,
      introStory:
        "Kasia i Marek oboje oszczędzają po 5 zł tygodniowo. Kasia mówi: 'Oszczędzam na... nie wiem na co, po prostu oszczędzam.' Marek mówi: 'Oszczędzam na nowe klocki Lego za 80 zł — jeszcze 9 tygodni!' Po miesiącu Kasia wydała swoje oszczędności 'bo zobaczyła coś fajnego w sklepie'. Marek wytrzymał — wiedział po co.",
      explanation:
        "Cel to magnes dla oszczędności — przyciąga cię z powrotem do skarbonki, kiedy masz ochotę wydać. Dobry cel oszczędzania ma 3 cechy: jest konkretny (co dokładnie?), jest mierzalny (ile kosztuje?), ma datę (kiedy chcesz to mieć?). Np. 'Chcę kupić grę Minecraft za 120 zł — odkładam 10 zł tygodniowo, za 12 tygodni to zrobię.'",
      example:
        "Cel: nowe rolki za 180 zł. Oszczędzam: 15 zł tygodniowo. Czas: 180 ÷ 15 = 12 tygodni = 3 miesiące. Mam swój plan!",
      challenge:
        "Wyznacz swój cel oszczędzania: co chcesz kupić? Ile to kosztuje? Ile możesz odkładać tygodniowo? Oblicz ile tygodni potrzebujesz.",
      summary:
        "Cel oszczędzania sprawia, że łatwiej oprzeć się pokusie wydania — wiesz, na co pracujesz i kiedy to osiągniesz.",
      tags: ["cel", "oszczędzanie", "plan", "motywacja"],
    },
    {
      id: "sb2-l2",
      skillId: "saving-basics-2",
      version: "1.0",
      order: 2,
      title: "Termometr oszczędności — wizualizuj postęp",
      learningObjective: "Potrafisz śledzić postęp oszczędzania za pomocą prostego wykresu",
      estimatedMinutes: 7,
      introStory:
        "Zuzia chciała kupić lalkę za 60 zł. Mama powiedziała: 'Zrób termometr!' Narysowały razem słupek podzielony na 12 działek (po 5 zł). Za każdym razem gdy Zuzia odkładała 5 zł, kolorowała jedną działkę czerwonym flamastrem. 'To jak gra!' mówiła Zuzia. I po 12 tygodniach... lalka była jej!",
      explanation:
        "Termometr oszczędności to prosty wykres, który pokazuje jak blisko celu jesteś. Możesz go narysować na kartce i powiesić w widocznym miejscu. Kiedy kolorujesz kolejną działkę — twój mózg dostaje nagrodę (zastrzyk dopaminy!). To sprawia, że oszczędzanie jest bardziej jak gra, a mniej jak wyrzeczenie.",
      example:
        "Cel: 90 zł na wycieczki szkolną. Termometr: 9 działek × 10 zł. Koloruję jedną działkę co tydzień. Po 9 tygodniach cały termometr jest czerwony — CEL!",
      challenge:
        "Narysuj termometr dla swojego celu. Podziel go na działki (każda = kwota tygodniowego odkładania). Powieś na lodówce lub nad biurkiem.",
      summary:
        "Wizualizacja postępu sprawia, że oszczędzanie staje się bardziej motywujące — widzisz jak z każdym krokiem zbliżasz się do celu.",
      tags: ["termometr", "wizualizacja", "postęp", "motywacja"],
    },
    {
      id: "sb2-l3",
      skillId: "saving-basics-2",
      version: "1.0",
      order: 3,
      title: "Co zrobić gdy pokusa jest za wielka?",
      learningObjective: "Znasz 3 strategie opierania się pokusie wydania oszczędności",
      estimatedMinutes: 8,
      introStory:
        "Tomek oszczędzał 3 tygodnie na nową grę. Potem zobaczył w sklepie super słodycze za 15 zł — dokładnie tyle, ile miał w skarbonce. 'Może jednak kupię... tylko tym razem...' Szczęście, że w kieszeni miał kartkę ze swoim celem: 'Gra Minecraft — 8 tygodni pozostało'. Odłożył słodycze z powrotem.",
      explanation:
        "Pokusy są wszędzie — to normalne. Sposoby na nie: 1) Reguła 24 godzin — zanim wydasz oszczędności, poczekaj dobę. Często ochota mija. 2) Noś przy sobie kartkę z celem — przypomina czego naprawdę chcesz. 3) Pytaj siebie: 'Czy to ważniejsze niż mój cel?' Jeśli NIE — odłóż z powrotem.",
      example:
        "Widzisz lody za 5 zł. Masz cel: game za 60 zł. 5 zł = 1 tydzień dodatkowego odkładania. Pytasz: 'Czy te lody są warte tygodnia czekania na grę?' Jeśli nie — nie kupujesz.",
      challenge:
        "Opisz sytuację, kiedy miałeś pokusę wydania pieniędzy na coś nieplanowanego. Co wtedy czułeś? Co zrobiłeś? Co byś zrobił teraz, znając te strategie?",
      summary:
        "Pokusa jest normalna — klucz to mieć strategię: poczekaj 24h, noś kartkę z celem, i pytaj czy to ważniejsze niż twój cel.",
      tags: ["pokusa", "strategia", "cel", "opór"],
    },
  ],
  quiz: {
    id: "sb2-quiz",
    skillId: "saving-basics-2",
    version: "1.0",
    title: "Quiz: Mały cel = duży sukces",
    questions: [
      {
        id: "sb2-q1",
        difficulty: "EASY",
        question: "Dlaczego ważne jest mieć cel oszczędzania?",
        options: [
          "Bo rodzice każą mieć cel",
          "Bo cel pomaga nie wydać pieniędzy przypadkowo",
          "Bo bez celu bank nie przyjmie pieniędzy",
          "Bo cel sprawia, że szybciej dostajesz pieniądze",
        ],
        correctIndex: 1,
        explanation:
          "Cel to motywacja — kiedy wiesz na co oszczędzasz, łatwiej oprzeć się pokusie wydania pieniędzy na coś innego.",
      },
      {
        id: "sb2-q2",
        difficulty: "MEDIUM",
        question: "Gra kosztuje 120 zł. Odkładasz 15 zł tygodniowo. Ile tygodni potrzebujesz?",
        options: ["6 tygodni", "8 tygodni", "10 tygodni", "12 tygodni"],
        correctIndex: 1,
        explanation: "120 ÷ 15 = 8 tygodni.",
      },
      {
        id: "sb2-q3",
        difficulty: "MEDIUM",
        question: "Co to jest 'reguła 24 godzin' w oszczędzaniu?",
        options: [
          "Odkładaj pieniądze codziennie przez 24 godziny",
          "Przed wydaniem oszczędności poczekaj dobę, żeby sprawdzić czy nadal chcesz",
          "Otwieraj skarbonkę tylko raz na 24 godziny",
          "Planuj zakupy 24 dni z góry",
        ],
        correctIndex: 1,
        explanation:
          "Reguła 24h daje czas na przemyślenie — często po dobie ochota na impulsywny zakup znika.",
      },
      {
        id: "sb2-q4",
        difficulty: "HARD",
        question: "Odkładasz 8 zł tygodniowo. Twój cel to 200 zł. Teraz masz 56 zł. Ile tygodni zostało?",
        options: ["14 tygodni", "18 tygodni", "18,5 tygodnia", "17 tygodni"],
        correctIndex: 1,
        explanation: "Brakuje: 200 − 56 = 144 zł. 144 ÷ 8 = 18 tygodni.",
      },
      {
        id: "sb2-q5",
        difficulty: "HARD",
        question: "Masz cel: rower za 350 zł. Tata dołoży 100 zł jako urodzinowy prezent. Ile musisz uzbierać sam i ile tygodni przy 15 zł/tydzień?",
        options: [
          "250 zł, ok. 17 tygodni",
          "250 zł, ok. 17 tygodni",
          "300 zł, 20 tygodni",
          "350 zł, 23 tygodnie",
        ],
        correctIndex: 0,
        explanation: "Musisz uzbierać: 350 − 100 = 250 zł. 250 ÷ 15 ≈ 16,7 ≈ 17 tygodni.",
      },
    ],
  },
  missions: [
    {
      id: "sb2-m1",
      skillId: "saving-basics-2",
      version: "1.0",
      order: 1,
      difficulty: "QUICK",
      title: "Mój cel oszczędzania",
      description: "Wybierz konkretną rzecz, na którą chcesz oszczędzać.",
      realLifeTask:
        "Zapisz: co chcesz kupić, ile to kosztuje, ile tygodniowo możesz odkładać i ile tygodni potrzebujesz. Oblicz dokładną datę, kiedy osiągniesz cel. Napisz to na kartce i powieś w swoim pokoju.",
      estimatedMinutes: 15,
      successCriteria:
        "Masz kartkę z celem, ceną, tygodniową kwotą i datą osiągnięcia celu.",
    },
    {
      id: "sb2-m2",
      skillId: "saving-basics-2",
      version: "1.0",
      order: 2,
      difficulty: "STANDARD",
      title: "Termometr na lodówce",
      description: "Stwórz i zacznij wypełniać termometr oszczędności.",
      realLifeTask:
        "Narysuj termometr dla swojego celu. Podziel na tyle działek ile potrzebujesz tygodni. Powieś na lodówce. Przez najbliższe 4 tygodnie koloruj jedną działkę po każdym odkładaniu. Zrób zdjęcie postępu po 4 tygodniach.",
      estimatedMinutes: 45,
      successCriteria: "Termometr wisi, a po 4 tygodniach masz co najmniej 4 działki pokolorowane.",
      parentTip: "Chwal dziecko za każdą pokolorowaną działkę — to napędza do kolejnej.",
    },
    {
      id: "sb2-m3",
      skillId: "saving-basics-2",
      version: "1.0",
      order: 3,
      difficulty: "CHALLENGE",
      title: "Test pokusy",
      description: "Świadomie oprzeć się pokusie wydania przez 2 tygodnie.",
      realLifeTask:
        "Przez 2 tygodnie zapisuj każdą chwilę, gdy miałeś pokusę wydania swoich oszczędności: co chciałeś kupić, ile to kosztowało, czy kupiłeś czy oparłeś się, co ci pomogło. Po 2 tygodniach przeanalizuj — ile razy wygrałeś?",
      estimatedMinutes: 90,
      successCriteria:
        "Masz dziennik z co najmniej 3 pokusami i w każdym przypadku opisałeś jak sobie poradziłeś.",
    },
  ],
}
