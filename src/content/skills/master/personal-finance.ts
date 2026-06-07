import type { SkillContent } from "../../types"

// ─────────────────────────────────────────────────────────────
// personal-finance-1 — Finanse osobiste — przegląd
// ─────────────────────────────────────────────────────────────

export const personalFinance1: SkillContent = {
  skillId: "personal-finance-1",
  lessons: [
    {
      id: "pf1-l1",
      skillId: "personal-finance-1",
      version: "1.0",
      order: 1,
      title: "System finansów osobistych — big picture",
      learningObjective:
        "Rozumiesz cztery filary finansów osobistych: wpływy, wydatki, oszczędności i majątek netto",
      estimatedMinutes: 20,
      introStory:
        "Michał skończył 18 lat, dostał pierwszą wypłatę za pracę wakacyjną i poczuł się bogaty. Przez trzy miesiące wydawał swobodnie, a potem stanął przed pytaniem: 'Gdzie się podziały te wszystkie pieniądze?' Nie wiedział. Nikt go nie nauczył, żeby patrzeć na finanse jako system — nie jako jednorazowe zdarzenia, ale jako przepływ, który można kontrolować. Ta lekcja to właśnie ten brakujący obraz całości.",
      explanation:
        "Finanse osobiste to system złożony z czterech elementów. Po pierwsze: wpływy — wszystkie pieniądze, które do ciebie przychodzą (wynagrodzenie, kieszonkowe, prezenty, przychody z własnej działalności). Po drugie: wydatki — wszystko, na co pieniądze wychodzą, podzielone na potrzeby (czynsz, jedzenie, bilety) i zachcianki (restauracje, rozrywka, ubrania ponad standard). Po trzecie: oszczędności — część wpływów, którą świadomie odkładasz zamiast wydawać. Po czwarte: majątek netto — różnica między tym co posiadasz (aktywa: gotówka, rzeczy o wartości) a tym co jesteś winien (pasywa: długi, zobowiązania). Majątek netto = aktywa minus pasywa. To jest twój finansowy wynik na dziś. Jeśli masz 500 zł oszczędności i 0 długów — twój majątek netto wynosi +500 zł. Jeśli masz 200 zł i jesteś winien przyjacielowi 300 zł — wynosi −100 zł. Zdrowe finanse osobiste to nie jednorazowy stan, ale ciągły przepływ: wpływy rosną lub są stabilne, wydatki są pod kontrolą, oszczędności regularnie rosną, a majątek netto z miesiąca na miesiąc jest coraz wyższy.",
      example:
        "Karolina pracuje na pół etatu i zarabia 1800 zł miesięcznie (wpływy). Płaci 400 zł za pokój w akademiku, 300 zł na jedzenie, 150 zł na transport — to 850 zł potrzeb. Na rozrywkę, kawę i ubrania wydaje 450 zł (zachcianki). Oszczędza 500 zł. Jej aktywa: 2000 zł oszczędności na koncie, laptop wart 1500 zł = 3500 zł. Pasywa: pożyczyła od rodziców 1000 zł na kaucję = 1000 zł. Majątek netto Karoliny: 3500 − 1000 = 2500 zł. Co miesiąc, gdy odkłada 500 zł, jej majątek netto rośnie.",
      challenge:
        "Sporządź swój własny finansowy obraz: wypisz wszystkie wpływy z ostatniego miesiąca, wszystkie wydatki (pogrupuj na potrzeby i zachcianki), ile odłożyłeś. Następnie wypisz wszystkie aktywa (co masz i ile to jest warte) i pasywa (komu co jesteś winien). Oblicz swój majątek netto.",
      summary:
        "Finanse osobiste to system: wpływy minus wydatki dają ci przestrzeń na oszczędności, które budują majątek netto — i właśnie on pokazuje, czy finansowo idziesz do przodu.",
      tags: ["finanse osobiste", "wpływy", "wydatki", "majątek netto", "aktywa", "pasywa"],
    },
    {
      id: "pf1-l2",
      skillId: "personal-finance-1",
      version: "1.0",
      order: 2,
      title: "Skąd biorą się pieniądze — rodzaje wpływów",
      learningObjective:
        "Potrafisz zidentyfikować i zaplanować różne źródła wpływów w swoim życiu",
      estimatedMinutes: 18,
      introStory:
        "Alicja i Bartek mają po 17 lat i oboje chcą mieć więcej pieniędzy. Alicja czeka, aż ktoś jej da — rodzice, okazja, szczęście. Bartek w tym samym czasie podlicza swoje 'strumienie': kieszonkowe, dochód z korepetycji, sprzedaż używanych ubrań online, i za sześć miesięcy ma trzy razy więcej niż Alicja. Różnica? Bartek zrozumiał, że wpływy można projektować — nie tylko czekać na nie.",
      explanation:
        "Wpływy dzielimy na kilka kategorii, i warto je znać, bo dają zupełnie inną perspektywę. Aktywne wpływy wymagają twojego czasu i pracy — wynagrodzenie z pracy, honorarium za projekt, korepetycje, prace zlecone. Pasywne wpływy (lub pół-pasywne) to pieniądze, które przychodzą przy minimalnym bieżącym wysiłku — na przykład czynsz z wynajmu (choć to duże uproszczenie, bo najem wymaga zarządzania), odsetki na koncie oszczędnościowym, przychody z treści online. Transfery to pieniądze przekazywane przez innych — kieszonkowe od rodziców, prezenty, stypendia, alimenty. Jako nastolatek i młody dorosły masz dziś głównie wpływy aktywne i transfery. Jednak już teraz możesz zacząć budować umiejętności, które w przyszłości pozwolą ci dywersyfikować — czyli mieć pieniądze z więcej niż jednego źródła. Dlaczego to ważne? Bo jeśli stracisz jedno źródło wpływów, inne nadal działają. To finansowe bezpieczeństwo w praktyce.",
      example:
        "Piotr (17 lat) ma: 400 zł kieszonkowego od rodziców (transfer), 300 zł miesięcznie z korepetycji z matematyki dla sąsiadów (aktywne), 80 zł miesięcznie ze sprzedaży używanych rzeczy przez internet (aktywne/okazjonalne). Łącznie: 780 zł wpływów. Gdyby stracił korepetycje, nadal miałby 480 zł. Gdyby stracił kieszonkowe — nadal miałby 380 zł. Dywersyfikacja chroni.",
      challenge:
        "Wypisz wszystkie swoje obecne źródła wpływów. Zastanów się: jaką umiejętność masz lub możesz zdobyć, która pozwoliłaby ci zarobić dodatkowe 100-200 zł miesięcznie? Korepetycje, projekty graficzne, fotografia, pisanie, naprawy — cokolwiek, w czym jesteś dobry. Zapisz trzy konkretne pomysły.",
      summary:
        "Im więcej strumieni wpływów, tym stabilniejsza twoja sytuacja finansowa — już teraz możesz zacząć budować więcej niż jedno źródło dochodu.",
      tags: ["wpływy", "dochód aktywny", "dochód pasywny", "dywersyfikacja", "źródła dochodu"],
    },
    {
      id: "pf1-l3",
      skillId: "personal-finance-1",
      version: "1.0",
      order: 3,
      title: "Majątek netto — twój finansowy wynik",
      learningObjective:
        "Potrafisz obliczyć swój majątek netto i rozumiesz, dlaczego jego wzrost jest celem finansowym",
      estimatedMinutes: 22,
      introStory:
        "W programach telewizyjnych często pokazują bogatych ludzi przez pryzmat tego, co mają: auto, dom, zegarek. Ale finansiści patrzą inaczej — pytają: 'Ile jesteś wart po odjęciu długów?' Można mieć drogi samochód na kredyt i być finansowo w głębokiej dziurze. Można żyć skromnie i mieć majątek netto idący w setki tysięcy. Ta różnica zmienia wszystko.",
      explanation:
        "Majątek netto (net worth) to jedno z najważniejszych pojęć w finansach osobistych. Wzór jest prosty: Majątek netto = Aktywa − Pasywa. Aktywa to wszystko, co posiadasz i ma wartość: gotówka i oszczędności, wartość rzeczy (elektronika, pojazd, ubrania — choć tracą wartość), wartość nieruchomości (jeśli masz). Pasywa to wszystkie Twoje zobowiązania finansowe: kredyty, pożyczki, długi wobec osób prywatnych, niezapłacone rachunki. Jeśli jesteś na początku życia finansowego — twój majątek netto może być bliski zeru albo nawet ujemny (np. jeśli masz kredyt studencki). To normalne. Pytanie nie brzmi 'ile mam teraz', ale 'jak szybko mój majątek netto rośnie'. Cel: z każdym miesiącem być na plusie względem poprzedniego. Majątek netto rośnie, gdy: zarabiasz więcej niż wydajesz, spłacasz długi, twoje aktywa zyskują na wartości. Spada, gdy wydajesz więcej niż zarabiasz, zadłużasz się lub twoje aktywa tracą wartość.",
      example:
        "Stan aktywów Marcina (18 lat): oszczędności 1200 zł, laptop 1800 zł, rower 400 zł. Łącznie aktywa: 3400 zł. Stan pasywów: pożyczył 500 zł od starszego brata. Majątek netto: 3400 − 500 = 2900 zł. Za rok, jeśli nie zaciągnie nowych długów i dołoży 200 zł miesięcznie do oszczędności: aktywa wzrosną do ~5400 zł (laptop i rower straciły trochę wartości, powiedzmy 3600 zł łącznie + 2400 zł oszczędności). Spłaci brata: pasywa = 0. Majątek netto: ~6000 zł. Wzrost o ponad 100% w rok — przez zdyscyplinowane oszczędzanie.",
      challenge:
        "Przygotuj swój arkusz majątku netto. Kolumna AKTYWA: wypisz wszystko co posiadasz i wycień każdą rzecz uczciwie (ile dostałbyś, gdybyś to sprzedał dziś). Kolumna PASYWA: wypisz każdy dług. Oblicz różnicę. Zapisz datę i kwotę — to jest punkt startowy. Za 3 miesiące powtórz ćwiczenie i sprawdź, czy majątek netto wzrósł.",
      summary:
        "Majątek netto = aktywa minus pasywa — to najszczerszy obraz twojej sytuacji finansowej, i to właśnie jego regularny wzrost powinien być twoim finansowym celem.",
      tags: ["majątek netto", "aktywa", "pasywa", "net worth", "długi", "oszczędności"],
    },
  ],
  quiz: {
    id: "pf1-quiz",
    skillId: "personal-finance-1",
    version: "1.0",
    title: "Quiz: System finansów osobistych",
    questions: [
      {
        id: "pf1-q1",
        difficulty: "EASY",
        question: "Czym jest majątek netto?",
        options: [
          "Sumą wszystkich twoich wydatków w ciągu roku",
          "Różnicą między tym co posiadasz (aktywa) a tym co jesteś winien (pasywa)",
          "Kwotą pieniędzy na koncie bankowym",
          "Twoim miesięcznym wynagrodzeniem po podatkach",
        ],
        correctIndex: 1,
        explanation:
          "Majątek netto = aktywa minus pasywa. To twój finansowy wynik — pokazuje, ile 'naprawdę' jesteś wart po uwzględnieniu wszystkich długów.",
      },
      {
        id: "pf1-q2",
        difficulty: "MEDIUM",
        question:
          "Marta ma 3000 zł oszczędności, laptop wart 2000 zł i jest winna 1500 zł za pożyczkę. Jaki jest jej majątek netto?",
        options: ["5000 zł", "3500 zł", "1500 zł", "4500 zł"],
        correctIndex: 1,
        explanation:
          "Aktywa: 3000 + 2000 = 5000 zł. Pasywa: 1500 zł. Majątek netto: 5000 − 1500 = 3500 zł.",
      },
      {
        id: "pf1-q3",
        difficulty: "MEDIUM",
        question: "Które z poniższych NIE jest przykładem dochodu aktywnego?",
        options: [
          "Wynagrodzenie za pracę na kasie",
          "Honorarium za projekt graficzny",
          "Odsetki naliczane przez bank na koncie oszczędnościowym",
          "Zarobek z korepetycji",
        ],
        correctIndex: 2,
        explanation:
          "Odsetki bankowe to dochód pasywny — przychodzą niezależnie od twojego bieżącego nakładu pracy. Dochód aktywny wymaga twojego czasu i wysiłku.",
      },
      {
        id: "pf1-q4",
        difficulty: "HARD",
        question:
          "Jakub zarabia 2400 zł miesięcznie. Potrzeby pochłaniają 1200 zł, zachcianki 600 zł, odkłada 600 zł. Po 6 miesiącach chce kupić laptopa za 2800 zł. Czy może to zrobić z oszczędności bez zadłużania się?",
        options: [
          "Tak, bo 6 × 600 = 3600 zł — wystarczy z nadwyżką",
          "Nie, bo 6 × 600 = 3600 zł, ale nie powinien wydać wszystkich oszczędności",
          "Tak, ale będzie musiał zmniejszyć zachcianki",
          "Nie, bo 6 × 600 = 3000 zł, co nie wystarczy na laptopa za 2800 zł",
        ],
        correctIndex: 0,
        explanation:
          "6 miesięcy × 600 zł = 3600 zł. Laptop kosztuje 2800 zł. Technicznie może, i zostanie mu nawet 800 zł rezerwy. Jednak warto rozważyć, czy nie uszczupla to za bardzo jego funduszu awaryjnego.",
      },
      {
        id: "pf1-q5",
        difficulty: "HARD",
        question:
          "Daria ma majątek netto −500 zł (więcej długów niż aktywów). Zaczyna odkładać 300 zł miesięcznie i nie zaciąga nowych długów. Po ilu pełnych miesiącach jej majątek netto wyjdzie na zero lub plus?",
        options: [
          "Po 1 miesiącu",
          "Po 2 miesiącach",
          "Po 3 miesiącach",
          "Nie wyjdzie na zero, bo długi rosną z odsetkami",
        ],
        correctIndex: 1,
        explanation:
          "Startuje od −500 zł. Po 1 miesiącu: −500 + 300 = −200 zł. Po 2 miesiącach: −200 + 300 = +100 zł. Już po 2 pełnych miesiącach majątek netto wychodzi na plus (zakładając brak odsetek).",
      },
    ],
  },
  missions: [
    {
      id: "pf1-m1",
      skillId: "personal-finance-1",
      version: "1.0",
      order: 1,
      difficulty: "QUICK",
      title: "Mój obraz finansowy",
      description:
        "Stwórz jednozdaniowe podsumowanie swojej obecnej sytuacji finansowej na podstawie czterech filarów.",
      realLifeTask:
        "Na kartce papieru wypisz: (1) Wszystkie wpływy z ostatniego miesiąca z kwotami. (2) Wszystkie wydatki z ostatniego miesiąca — podziel na potrzeby i zachcianki. (3) Ile odłożyłeś. (4) Oblicz: wpływy − wydatki − oszczędności = co zostało (lub czego brakowało). Napisz jedno zdanie podsumowujące: 'Mój finansowy obraz wygląda tak: ...'",
      estimatedMinutes: 20,
      successCriteria:
        "Masz wypełnione wszystkie cztery kategorie i napisane zdanie podsumowujące.",
    },
    {
      id: "pf1-m2",
      skillId: "personal-finance-1",
      version: "1.0",
      order: 2,
      difficulty: "STANDARD",
      title: "Arkusz majątku netto",
      description: "Oblicz swój majątek netto i ustaw punkt startowy do śledzenia postępu.",
      realLifeTask:
        "Stwórz arkusz (na papierze lub w Excelu/Arkuszach Google). Kolumna AKTYWA: wypisz wszystko co posiadasz i podaj uczciwe ceny sprzedaży (nie ceny zakupu — ile dostałbyś dziś?). Kolumna PASYWA: wypisz każdą pożyczkę i dług. Oblicz majątek netto. Zapisz datę. Za 3 miesiące wróć i sprawdź zmianę.",
      estimatedMinutes: 35,
      successCriteria:
        "Masz gotowy arkusz z datą, sumą aktywów, sumą pasywów i majątkiem netto.",
      parentTip:
        "Możesz pomóc dziecku wycenić starsze rzeczy — sprawdźcie razem ceny podobnych przedmiotów na popularnych serwisach ogłoszeniowych.",
    },
    {
      id: "pf1-m3",
      skillId: "personal-finance-1",
      version: "1.0",
      order: 3,
      difficulty: "CHALLENGE",
      title: "Trzymiesięczny tracker majątku netto",
      description:
        "Śledź swój majątek netto przez trzy miesiące i przeanalizuj tendencję.",
      realLifeTask:
        "Przez 3 kolejne miesiące, pierwszego dnia każdego miesiąca, aktualizuj swój arkusz majątku netto. Zapisuj zmiany i ich powody (np. 'kupiłem rzecz za X zł', 'spłaciłem dług', 'odłożyłem Y zł'). Po trzech miesiącach napisz krótką analizę: w którym miesiącu urosłeś najbardziej i dlaczego, co ci przeszkadzało, co pomogło.",
      estimatedMinutes: 180,
      successCriteria:
        "Masz trzy odczyty majątku netto z datami, a różnica między pierwszym a ostatnim jest dodatnia (majątek wzrósł).",
    },
  ],
}

// ─────────────────────────────────────────────────────────────
// personal-finance-2 — Fundusz awaryjny
// ─────────────────────────────────────────────────────────────

export const personalFinance2: SkillContent = {
  skillId: "personal-finance-2",
  lessons: [
    {
      id: "pf2-l1",
      skillId: "personal-finance-2",
      version: "1.0",
      order: 1,
      title: "Czym jest fundusz awaryjny i dlaczego to podstawa",
      learningObjective:
        "Rozumiesz, że fundusz awaryjny to finansowa poduszka bezpieczeństwa, bez której każda awaria staje się kryzysem",
      estimatedMinutes: 18,
      introStory:
        "Tomek miał 22 lata, pierwszą pracę i poczucie, że wreszcie wszystko idzie dobrze. Zarabiał, trochę odkładał, wydawał na przyjemności. Pewnego dnia zepsuł się laptop — niezbędny do pracy. Naprawa: 800 zł. Tomek nie miał tych pieniędzy, bo zawsze wydawał prawie wszystko. Musiał pożyczyć od rodziców i przez miesiąc czuł się winny. Gdyby miał fundusz awaryjny — to byłaby tylko drobna niedogodność, nie kryzys.",
      explanation:
        "Fundusz awaryjny to odłożona kwota pieniędzy, której jedynym celem jest pokrycie nieoczekiwanych, pilnych wydatków. Nie jest to fundusz na wakacje ani na nową elektronikę — to twoja finansowa sieć bezpieczeństwa. Klasyczna zasada mówi: fundusz awaryjny powinien wynosić od 3 do 6 miesięcy twoich podstawowych wydatków. Dlaczego właśnie tyle? Trzy miesiące to minimum pozwalające przetrwać utratę pracy lub większą awarię bez wpadania w długi. Sześć miesięcy daje czas na spokojne znalezienie nowego źródła dochodu bez podejmowania decyzji pod presją. Dla kogoś, kto wydaje 1500 zł miesięcznie na potrzeby: fundusz awaryjny to 4500–9000 zł. Bez tego funduszu każda nieprzewidziana sytuacja — choroba, awaria sprzętu, nagłe koszty — staje się finansową katastrofą i prowadzi do zadłużenia. Z funduszem te same sytuacje to po prostu przejściowe niedogodności.",
      example:
        "Ania pracuje i jej miesięczne podstawowe wydatki to: czynsz 600 zł, jedzenie 400 zł, transport 200 zł, leki/higiena 100 zł = 1300 zł/miesiąc. Jej fundusz awaryjny powinien wynosić minimum 3 × 1300 = 3900 zł. Wtedy, jeśli straci pracę albo spotka ją coś nieprzewidzianego, ma co najmniej 3 miesiące spokoju na rozwiązanie problemu.",
      challenge:
        "Oblicz swój rekomendowany fundusz awaryjny. Wypisz wszystkie swoje miesięczne NIEZBĘDNE wydatki (jedzenie, transport, mieszkanie, zdrowie — bez rozrywki i zachcianek). Pomnóż przez 3 i przez 6. To są twoje dwa poziomy docelowe. Ile masz teraz? Jaka jest różnica?",
      summary:
        "Fundusz awaryjny w wysokości 3–6 miesięcy podstawowych wydatków to fundament stabilności finansowej — bez niego każda awaria staje się kryzysem.",
      tags: ["fundusz awaryjny", "bezpieczeństwo finansowe", "oszczędności", "rezerwa"],
    },
    {
      id: "pf2-l2",
      skillId: "personal-finance-2",
      version: "1.0",
      order: 2,
      title: "Jak zbudować fundusz od zera",
      learningObjective:
        "Potrafisz opracować konkretny plan budowania funduszu awaryjnego krok po kroku",
      estimatedMinutes: 20,
      introStory:
        "Kiedy Kasia usłyszała, że powinna odłożyć 6000 zł na fundusz awaryjny, poczuła się przygnębiona. 'Skąd wezmę 6000 zł? Zarabiam 1800 zł.' Potem ktoś powiedział jej: 'Nie budujesz funduszu naraz. Budujesz go złotówka po złotówce, miesiąc po miesiącu.' Po 14 miesiącach odkładania 400 zł miesięcznie — Kasia miała 5600 zł. Góra nie wygląda tak wysoko, gdy skupiasz się na następnym kroku.",
      explanation:
        "Budowanie funduszu awaryjnego od zera wymaga planu, a nie heroicznego wysiłku. Oto podejście krok po kroku. Krok 1: Zacznij od mini-funduszu — najpierw zbierz 500–1000 zł. Ta kwota wystarczy na małe nagłe wydatki i daje pierwsze poczucie bezpieczeństwa. Krok 2: Ustal stałą kwotę odkładania miesięcznie — nawet 200 zł to 2400 zł rocznie. Kluczem jest regularność, nie jednorazowe duże wpłaty. Krok 3: Odkładaj fundusz awaryjny ZANIM wydasz na przyjemności — zasada 'najpierw zapłać przyszłemu sobie'. Krok 4: Jeśli dostaniesz niespodziewane pieniądze (premię, prezent, zwrot podatku), znaczną część przeznacz na fundusz. Krok 5: Nie ruszaj funduszu bez prawdziwej awarii — nie na wakacje, nie na ubrania, nie na okazje. Tylko na prawdziwe nagłe sytuacje. Ile miesięcy zajmie ci zbudowanie funduszu? Jeśli odkładasz X zł miesięcznie, a cel to Y zł: czas = Y ÷ X miesięcy.",
      example:
        "Dawid zarabia 2000 zł miesięcznie na pół etatu. Jego miesięczne potrzeby to 1200 zł. Cel funduszu awaryjnego: 3 × 1200 = 3600 zł. Postanawia odkładać 300 zł miesięcznie. Czas do celu: 3600 ÷ 300 = 12 miesięcy. Przez rok, odkładając 300 zł każdego miesiąca pierwszego dnia, po roku ma fundusz. W tym czasie jeden raz musiał wydać 400 zł na nagłą naprawę roweru — wypłacił z funduszu i uzupełnił w ciągu 2 miesięcy.",
      challenge:
        "Stwórz swój plan funduszu awaryjnego: (1) Jaki jest twój cel (3× miesięczne potrzeby)? (2) Ile możesz odkładać miesięcznie? (3) W ilu miesiącach osiągniesz cel? (4) Jakie jednorazowe wpływy (np. wakacyjna praca, prezenty urodzinowe) możesz przeznaczyć na przyspieszenie? Zapisz datę docelową.",
      summary:
        "Fundusz awaryjny budujesz małymi, regularnymi krokami — regularność i cierpliwość są ważniejsze od jednorazowych wielkich wpłat.",
      tags: ["fundusz awaryjny", "plan oszczędzania", "regularność", "cel finansowy"],
    },
    {
      id: "pf2-l3",
      skillId: "personal-finance-2",
      version: "1.0",
      order: 3,
      title: "Gdzie trzymać fundusz awaryjny",
      learningObjective:
        "Rozumiesz, jakie cechy powinno mieć miejsce przechowywania funduszu awaryjnego i dlaczego wybór ma znaczenie",
      estimatedMinutes: 16,
      introStory:
        "Jeden z błędów, który ludzie popełniają, to trzymanie funduszu awaryjnego razem z pieniędzmi 'na codzień' — na tym samym koncie. Efekt? Kiedy widzą 4000 zł, wydają 3000 zł, bo 'przecież mam dużo na koncie'. Albo wręcz przeciwnie — chowają gotówkę w szufladzie, bo 'nie ufają bankom', i potem inflacja powoli ją zjada. Gdzie trzymać fundusz, żeby był bezpieczny, dostępny, ale nie 'w zasięgu pokus'?",
      explanation:
        "Idealne miejsce dla funduszu awaryjnego spełnia trzy warunki: dostępność — możesz wypłacić pieniądze w ciągu 1–2 dni roboczych w razie prawdziwej awarii; bezpieczeństwo — pieniądze nie mogą zniknąć ani stracić wartości przez krótkoterminowe wahania; separacja — fundusz jest oddzielony od codziennych pieniędzy, żebyś nie wydawał go nieświadomie. Konto oszczędnościowe spełnia te warunki dobrze z kilku powodów. Po pierwsze, środki na kontach bankowych w Polsce są objęte gwarancją Bankowego Funduszu Gwarancyjnego (BFG) do równowartości 100 000 euro — oznacza to, że nawet jeśli bank zbankrutuje, odzyskasz swoje pieniądze. Po drugie, konto oszczędnościowe jest oddzielone od konta bieżącego — nie widzisz tych pieniędzy 'na co dzień'. Po trzecie, konto oszczędnościowe zazwyczaj oferuje wyższe oprocentowanie niż konto bieżące, więc twoje oszczędności przynajmniej częściowo chronią się przed inflacją. Ważne: nie chodzi o maksymalizowanie zysku z funduszu awaryjnego — chodzi o bezpieczeństwo i dostępność. To nie jest pieniądz do pomnażania, to pieniądz do ochrony.",
      example:
        "Zofia trzyma fundusz awaryjny 4500 zł na koncie oszczędnościowym z oprocentowaniem 4% rocznie. Oznacza to, że w ciągu roku bank doliczy jej około 180 zł odsetek (przed podatkiem). To nie zmienia życia, ale sprawia, że inflacja zjada mniej wartości funduszu. Kiedy zepsuł się jej telefon i potrzebowała 1200 zł, przelała je z konta oszczędnościowego na konto bieżące w jeden dzień. Fundusz spełnił swoją rolę.",
      challenge:
        "Dowiedz się, czym jest Bankowy Fundusz Gwarancyjny (BFG) — możesz sprawdzić na stronie bfg.pl. Jaka kwota jest gwarantowana? Porozmawiaj z rodzicem lub opiekunem o tym, jak wyglądają konta oszczędnościowe w waszym banku — jakie mają oprocentowanie i czy pieniądze są łatwo dostępne.",
      summary:
        "Fundusz awaryjny najlepiej trzymać na oddzielnym koncie oszczędnościowym — jest bezpieczny dzięki gwarancji BFG, dostępny w razie potrzeby i oddzielony od codziennych wydatków.",
      tags: ["konto oszczędnościowe", "BFG", "fundusz awaryjny", "oprocentowanie", "bezpieczeństwo"],
    },
  ],
  quiz: {
    id: "pf2-quiz",
    skillId: "personal-finance-2",
    version: "1.0",
    title: "Quiz: Fundusz awaryjny",
    questions: [
      {
        id: "pf2-q1",
        difficulty: "EASY",
        question: "Jaką kwotę powinien wynosić fundusz awaryjny?",
        options: [
          "Dokładnie 1000 zł dla każdego",
          "3–6 miesięcy podstawowych miesięcznych wydatków",
          "10% rocznych przychodów",
          "Tyle, ile kosztuje najdroższa rzecz, którą posiadasz",
        ],
        correctIndex: 1,
        explanation:
          "Klasyczna zasada mówi o 3–6 miesiącach podstawowych wydatków — to kwota, która pozwala przetrwać bez dochodu lub sfinansować nagłe wydatki bez wpadania w długi.",
      },
      {
        id: "pf2-q2",
        difficulty: "MEDIUM",
        question:
          "Marta wydaje miesięcznie 1400 zł na potrzeby. Odkłada 350 zł miesięcznie na fundusz awaryjny. Po ilu miesiącach osiągnie minimum (3 miesiące wydatków)?",
        options: ["10 miesięcy", "12 miesięcy", "14 miesięcy", "16 miesięcy"],
        correctIndex: 1,
        explanation:
          "Cel minimalny: 3 × 1400 = 4200 zł. Odkłada 350 zł/miesiąc. 4200 ÷ 350 = 12 miesięcy.",
      },
      {
        id: "pf2-q3",
        difficulty: "MEDIUM",
        question: "Którą z poniższych sytuacji warto pokryć z funduszu awaryjnego?",
        options: [
          "Bilety na wymarzony koncert ulubionego zespołu",
          "Nagła wizyta u lekarza i nieplanowane leki",
          "Zakup nowego telefonu, bo stary jest przestarzały",
          "Weekendowy wyjazd z przyjaciółmi",
        ],
        correctIndex: 1,
        explanation:
          "Fundusz awaryjny służy do pokrywania prawdziwych, nieprzewidzianych i pilnych wydatków. Nagła wizyta lekarska spełnia te kryteria — pozostałe to planowane lub nieawaryine wydatki.",
      },
      {
        id: "pf2-q4",
        difficulty: "HARD",
        question:
          "Piotr ma fundusz awaryjny 6000 zł na koncie oszczędnościowym z oprocentowaniem 5% w skali roku. Ile wyniosą odsetki po 12 miesiącach (zaokrąglij do złotych)?",
        options: ["150 zł", "300 zł", "500 zł", "600 zł"],
        correctIndex: 1,
        explanation:
          "5% z 6000 zł = 300 zł rocznie (brutto, przed podatkiem Belki 19%). To nie zmienia finansowej rewolucji, ale chroni częściowo przed inflacją.",
      },
      {
        id: "pf2-q5",
        difficulty: "HARD",
        question:
          "Czym jest Bankowy Fundusz Gwarancyjny (BFG) i co oznacza dla twojego funduszu awaryjnego trzymanego w banku?",
        options: [
          "BFG to fundusz inwestycyjny zarządzany przez banki komercyjne",
          "BFG gwarantuje zwrot środków do 100 000 EUR w przypadku upadłości banku — twoje oszczędności są chronione",
          "BFG wypłaca odsetki od każdego konta oszczędnościowego",
          "BFG to obowiązkowa składka, którą musisz wpłacać otwierając konto",
        ],
        correctIndex: 1,
        explanation:
          "BFG (Bankowy Fundusz Gwarancyjny) to instytucja, która w razie upadłości banku gwarantuje wypłatę środków do równowartości 100 000 EUR. Oznacza to, że twój fundusz awaryjny w polskim banku jest bezpieczny nawet w scenariuszu bankructwa instytucji.",
      },
    ],
  },
  missions: [
    {
      id: "pf2-m1",
      skillId: "personal-finance-2",
      version: "1.0",
      order: 1,
      difficulty: "QUICK",
      title: "Oblicz swój cel funduszu awaryjnego",
      description:
        "Wyznacz konkretną kwotę docelową dla własnego funduszu awaryjnego.",
      realLifeTask:
        "Wypisz wszystkie swoje miesięczne NIEZBĘDNE wydatki (bez rozrywki i zachcianek) — lub te rodziny, do których się dokładasz. Oblicz sumę. Pomnóż przez 3 (minimum) i przez 6 (zalecane). Sprawdź, ile masz teraz. Oblicz, ile brakuje. Napisz plan: odkładam X zł miesięcznie, osiągnę minimum za Y miesięcy.",
      estimatedMinutes: 20,
      successCriteria:
        "Masz obliczone dwa poziomy funduszu (3× i 6×), wiesz ile masz teraz i kiedy osiągniesz minimum.",
    },
    {
      id: "pf2-m2",
      skillId: "personal-finance-2",
      version: "1.0",
      order: 2,
      difficulty: "STANDARD",
      title: "Zacznij budować fundusz",
      description:
        "Przez 4 tygodnie odkładaj regularną kwotę i śledź postęp funduszu awaryjnego.",
      realLifeTask:
        "Ustal kwotę tygodniową do odkładania (minimum 50 zł lub cokolwiek jest realne). Jeśli możliwe, trzymaj te pieniądze osobno od codziennych (osobna koperta, słoik lub konto). Przez 4 tygodnie odkładaj ustaloną kwotę bez wyjątku. Po każdym tygodniu zapisz łączną kwotę i oblicz, jak daleko jesteś od celu 3-miesięcznego funduszu.",
      estimatedMinutes: 40,
      successCriteria:
        "Po 4 tygodniach masz odłożoną zaplanowaną kwotę i wiesz, jaki procent celu minimalnego osiągnąłeś.",
      parentTip:
        "Rozważ, czy możesz pomóc dziecku otworzyć oddzielne konto lub wydzielić osobne miejsce na fundusz awaryjny, żeby było fizycznie oddzielone od codziennych pieniędzy.",
    },
    {
      id: "pf2-m3",
      skillId: "personal-finance-2",
      version: "1.0",
      order: 3,
      difficulty: "CHALLENGE",
      title: "Symulacja awarii — test funduszu",
      description:
        "Przeprowadź myślowy eksperyment i stwórz swój osobisty protokół awaryjny.",
      realLifeTask:
        "Wyobraź sobie trzy scenariusze awarii: (1) Psuje się niezbędny sprzęt (laptop, telefon) — koszt naprawy 800 zł. (2) Tracisz pracę lub kieszonkowe na miesiąc. (3) Nagła choroba wymaga wizyty i leków za 300 zł. Dla każdego scenariusza napisz: Czy twój obecny fundusz pokryłby ten koszt? Jeśli nie — skąd wziąłbyś pieniądze? Jakie byłyby konsekwencje? Co zmienisz, żeby być lepiej przygotowany? Na koniec napisz swój 'protokół awaryjny' — jedną stronę z krokami, które wykonasz, gdy spotka cię nagły wydatek.",
      estimatedMinutes: 45,
      successCriteria:
        "Masz analizę trzech scenariuszy i napisany protokół awaryjny z konkretnymi krokami.",
    },
  ],
}

// ─────────────────────────────────────────────────────────────
// personal-finance-3 — Podatki — co każdy powinien wiedzieć
// ─────────────────────────────────────────────────────────────

export const personalFinance3: SkillContent = {
  skillId: "personal-finance-3",
  lessons: [
    {
      id: "pf3-l1",
      skillId: "personal-finance-3",
      version: "1.0",
      order: 1,
      title: "Skąd biorą się podatki i jak działają w Polsce",
      learningObjective:
        "Rozumiesz, czym jest podatek dochodowy PIT, jak działa progresja podatkowa i dlaczego to dotyczy ciebie",
      estimatedMinutes: 20,
      introStory:
        "Olek dostał pierwszą wypłatę i był zaskoczony: umówił się na 3000 zł, ale na konto przyszło znacznie mniej. 'Gdzie reszta?' — zapytał pracodawcę. 'Podatek dochodowy, ZUS, zaliczka na PIT' — usłyszał. Dla Olka to były obce słowa. Tymczasem zrozumienie, dlaczego pensja brutto różni się od netto, to jedna z najważniejszych rzeczy, które powinieneś wiedzieć przed pierwszą pracą.",
      explanation:
        "W Polsce każdy, kto zarabia pieniądze, płaci podatek dochodowy. Podatek od dochodów osób fizycznych to PIT (Personal Income Tax). Jak to działa? Polska ma progresywny system podatkowy: im więcej zarabiasz, tym wyższy procent podatku płacisz od nadwyżki powyżej progu. Aktualnie istnieją dwa progi podatkowe: 12% dla dochodów do 120 000 zł rocznie i 32% dla nadwyżki powyżej 120 000 zł rocznie. Jest też kwota wolna od podatku — aktualnie 30 000 zł rocznie — co oznacza, że do tej kwoty nie płacisz podatku wcale. W praktyce: jeśli zarabiasz 3000 zł brutto miesięcznie (36 000 zł rocznie), płacisz 12% podatku od kwoty przekraczającej kwotę wolną. Do tego dochodzą składki ZUS (ubezpieczenie społeczne i zdrowotne), które pracodawca odprowadza za ciebie. Stąd właśnie różnica między wynagrodzeniem brutto (umówiona kwota) a netto (to, co faktycznie trafia do ciebie). Podstawowe dokumenty: PESEL — twój numer identyfikacyjny jako obywatela. NIP — Numer Identyfikacji Podatkowej, który będziesz potrzebował do kontaktów z Urzędem Skarbowym. US — Urząd Skarbowy, instytucja państwowa, do której trafiają twoje podatki.",
      example:
        "Marta pracuje na umowę zlecenie i zarabia 2000 zł brutto miesięcznie. Pracodawca odprowadza za nią składki ZUS i zaliczkę na podatek dochodowy. Na jej konto trafia około 1450–1550 zł netto (dokładna kwota zależy od rodzaju umowy i konkretnych stawek). Różnica to składki i podatek — nie 'zabrał' je pracodawca, ale obowiązkowo przekazał do ZUS i Urzędu Skarbowego.",
      challenge:
        "Zapytaj rodzica lub opiekuna o ich wynagrodzenie brutto i netto (nie musisz znać dokładnych kwot — możesz zapytać o proporcje). Oblicz, jaki procent wynagrodzenia brutto stanowi wynagrodzenie netto. Czy wiesz, gdzie idzie różnica?",
      summary:
        "PIT to podatek od dochodu, który w Polsce jest progresywny — im więcej zarabiasz, tym wyższy procent od nadwyżki płacisz. Każdy pracownik ma PESEL i NIP, i każdy uczciwy obywatel rozlicza się z Urzędem Skarbowym.",
      tags: ["PIT", "podatek dochodowy", "PESEL", "NIP", "Urząd Skarbowy", "brutto", "netto"],
    },
    {
      id: "pf3-l2",
      skillId: "personal-finance-3",
      version: "1.0",
      order: 2,
      title: "Deklaracja podatkowa — krok po kroku",
      learningObjective:
        "Wiesz, czym jest deklaracja PIT, kto musi ją złożyć i jak skorzystać z usługi e-PIT",
      estimatedMinutes: 22,
      introStory:
        "Każdego roku w Polsce, do 30 kwietnia, miliony ludzi składają deklaracje podatkowe. Kiedyś trzeba było wypełniać skomplikowane druki, stać w kolejkach w Urzędzie Skarbowym i liczyć wszystko ręcznie. Dziś większość z nas może skorzystać z e-PIT — usługi, w której Urząd Skarbowy sam wypełnia deklarację na podstawie danych od pracodawcy, a ty tylko sprawdzasz i akceptujesz. To naprawdę proste — ale warto wiedzieć, jak to działa.",
      explanation:
        "Deklaracja podatkowa (zeznanie podatkowe) to coroczny dokument, w którym informujesz Urząd Skarbowy o wszystkich swoich dochodach z minionego roku i obliczasz należny podatek. Podstawowe formularze: PIT-37 — najczęściej używany, dla osób zatrudnionych na umowę o pracę lub zlecenie (pracodawca odprowadza zaliczki); PIT-36 — dla osób prowadzących działalność gospodarczą lub mających dochody z zagranicy; PIT-38 — dla dochodów z kapitałów (np. dywidend). Usługa Twój e-PIT (dostępna na podatki.gov.pl) radykalnie uprościła cały proces: Urząd Skarbowy sam wypełnia formularz na podstawie danych od pracodawców i banków. Logujesz się przez profil zaufany lub dane z deklaracji z poprzedniego roku. Sprawdzasz, czy dane są prawidłowe. Akceptujesz lub modyfikujesz. Gotowe — Urząd Skarbowy automatycznie zwróci nadpłatę lub wyśle informację o dopłacie. Kto musi złożyć deklarację? Każda osoba, która w danym roku uzyskała dochody opodatkowane PIT — w tym nastolatki pracujące na umowę zlecenie lub o dzieło.",
      example:
        "Kacper (17 lat) w wakacje pracował jako animator na obozie na umowę zlecenie i zarobił 4800 zł brutto. W następnym roku, do 30 kwietnia, musi złożyć deklarację PIT. Wchodzi na podatki.gov.pl, loguje się przez profil zaufany (który ma przez aplikację bankową), widzi gotowy formularz PIT-37 wypełniony przez US na podstawie danych od pracodawcy. Sprawdza, czy wszystko się zgadza, klika 'Akceptuj'. Po kilku tygodniach US zwraca mu nadpłatę — pracodawca pobrał za dużo zaliczki.",
      challenge:
        "Wejdź na stronę podatki.gov.pl i zapoznaj się z usługą Twój e-PIT. Dowiedz się, jak założyć profil zaufany (przez bankowość elektroniczną lub w urzędzie). Czy twoi rodzice korzystają z e-PIT? Zapytaj ich o doświadczenia.",
      summary:
        "Deklaracja PIT to coroczny obowiązek każdego podatnika — dziś dzięki usłudze e-PIT na podatki.gov.pl jest to prosty, kilkuminutowy proces.",
      tags: ["PIT-37", "e-PIT", "deklaracja podatkowa", "profil zaufany", "urząd skarbowy"],
    },
    {
      id: "pf3-l3",
      skillId: "personal-finance-3",
      version: "1.0",
      order: 3,
      title: "Ulgi podatkowe i jak nie przepłacać",
      learningObjective:
        "Znasz podstawowe ulgi podatkowe dostępne dla młodych i wiesz, jak legalnie zmniejszyć należny podatek",
      estimatedMinutes: 18,
      introStory:
        "Większość ludzi płaci dokładnie tyle podatku, ile wynosi standardowa stawka — i ani grosza mniej. Ale prawo podatkowe przewiduje dziesiątki legalnych sposobów na zmniejszenie należności. Nie jest to 'oszukiwanie' ani 'unikanie' podatków — to po prostu korzystanie z przepisów, które stworzono właśnie po to, żeby zachęcać obywateli do określonych zachowań (np. darowizn czy oszczędzania na emeryturę). Nieznajomość tych przepisów kosztuje Polaków miliardy złotych rocznie.",
      explanation:
        "Ulga to legalnie przewidziane zmniejszenie podatku lub podstawy opodatkowania. Oto najważniejsze z punktu widzenia młodej osoby. Ulga dla młodych (do 26. roku życia): jeśli masz mniej niż 26 lat i pracujesz na umowę o pracę lub zlecenie, przychody do 85 528 zł rocznie są ZWOLNIONE z podatku dochodowego. W praktyce: jeśli zarabiasz do tej kwoty, płacisz tylko składki ZUS, ale nie podatek dochodowy PIT. To ogromna ulga, z której korzystają automatycznie wszyscy uprawnieni. Ulga na internet: jeśli płacisz za internet, możesz odliczyć do 760 zł rocznie (przez 2 kolejne lata w życiu podatnika). Ulga rehabilitacyjna: dla osób z niepełnosprawnością lub mających na utrzymaniu osoby niepełnosprawne. Ulga na darowiznę: darowizny na cele pożytku publicznego (stowarzyszenia, fundacje z OPP) można odliczyć od dochodu. Odpis 1,5% podatku: zamiast całości trafiającej do fiskusa, możesz przekazać 1,5% swojego podatku wybranej organizacji pożytku publicznego (OPP) — zaznaczasz to w deklaracji, nic cię to nie kosztuje extra.",
      example:
        "Agnieszka ma 20 lat i zarabia 2500 zł brutto miesięcznie na umowę zlecenie (30 000 zł rocznie). Dzięki uldze dla młodych nie płaci podatku dochodowego — jej wynagrodzenie netto jest wyższe niż u osoby powyżej 26. roku życia zarabiającej tyle samo. Do tego w deklaracji wskazuje 1,5% podatku (który i tak by zapłaciła) dla wybranej fundacji — np. pomagającej dzieciom. Agnieszka nic nie traci, a organizacja dostaje wsparcie.",
      challenge:
        "Sprawdź, czy kwalifikujesz się do ulgi dla młodych (masz mniej niż 26 lat i pracujesz lub planujesz pracować). Oblicz, ile miesięcznie netto możesz zarobić, korzystając z tej ulgi. Dowiedz się, jak wskazać 1,5% podatku na wybraną organizację — wyszukaj jedną organizację pożytku publicznego, której działalność ci odpowiada.",
      summary:
        "Ulga dla młodych zwalnia z podatku dochodowego osoby do 26. roku życia przy dochodach do 85 528 zł rocznie — to automatyczna korzyść, z której warto świadomie korzystać.",
      tags: ["ulga dla młodych", "PIT", "1,5% podatku", "OPP", "ulgi podatkowe", "zwolnienie z PIT"],
    },
  ],
  quiz: {
    id: "pf3-quiz",
    skillId: "personal-finance-3",
    version: "1.0",
    title: "Quiz: Podatki — co każdy powinien wiedzieć",
    questions: [
      {
        id: "pf3-q1",
        difficulty: "EASY",
        question: "Co oznacza skrót PIT?",
        options: [
          "Polski Instytut Technologiczny",
          "Podatek Indywidualny Tymczasowy",
          "Personal Income Tax — podatek od dochodów osób fizycznych",
          "Płatność Internetowa Transakcyjna",
        ],
        correctIndex: 2,
        explanation:
          "PIT (Personal Income Tax) to podatek od dochodów osób fizycznych — płaci go każda osoba, która uzyskuje dochody w Polsce.",
      },
      {
        id: "pf3-q2",
        difficulty: "MEDIUM",
        question: "Co to jest 'wynagrodzenie brutto'?",
        options: [
          "Kwota, która trafia na twoje konto po odliczeniu podatków i składek",
          "Wynagrodzenie powiększone o premię roczną",
          "Umówiona kwota wynagrodzenia przed odliczeniem podatków i składek ZUS",
          "Kwota wynagrodzenia po uwzględnieniu wszystkich ulg podatkowych",
        ],
        correctIndex: 2,
        explanation:
          "Wynagrodzenie brutto to umówiona kwota przed potrąceniami. Wynagrodzenie netto to to, co faktycznie trafia na twoje konto — po odliczeniu podatku i składek ZUS.",
      },
      {
        id: "pf3-q3",
        difficulty: "MEDIUM",
        question: "Do kiedy należy złożyć roczną deklarację podatkową PIT w Polsce?",
        options: [
          "Do 31 stycznia każdego roku",
          "Do 30 kwietnia każdego roku",
          "Do 31 grudnia każdego roku",
          "Do 30 czerwca każdego roku",
        ],
        correctIndex: 1,
        explanation:
          "Roczną deklarację PIT należy złożyć do 30 kwietnia roku następującego po roku podatkowym. Np. deklarację za rok 2024 składasz do 30 kwietnia 2025.",
      },
      {
        id: "pf3-q4",
        difficulty: "HARD",
        question:
          "Marta ma 24 lata i pracuje na umowę zlecenie. Zarabia 3500 zł brutto miesięcznie (42 000 zł rocznie). Dlaczego jej wynagrodzenie netto może być wyższe niż jej koleżanki Anny (27 lat), zarabiającej tyle samo?",
        options: [
          "Bo Marta ma wyższy próg podatkowy niż Anna",
          "Bo Marta korzysta z ulgi dla młodych — jej dochody do 85 528 zł rocznie są zwolnione z podatku dochodowego",
          "Bo Marta płaci niższe składki ZUS z powodu wieku",
          "Bo Marta może odliczyć koszty dojazdu, a Anna nie",
        ],
        correctIndex: 1,
        explanation:
          "Ulga dla młodych zwalnia z podatku PIT osoby do 26. roku życia przy dochodach z umowy o pracę lub zlecenie do 85 528 zł rocznie. Marta (24 lata) płaci tylko składki ZUS, ale nie podatek dochodowy. Anna (27 lat) płaci i ZUS, i 12% PIT od dochodu powyżej kwoty wolnej.",
      },
      {
        id: "pf3-q5",
        difficulty: "HARD",
        question:
          "Co to znaczy 'przekazać 1,5% podatku na OPP' i ile to cię kosztuje?",
        options: [
          "Płacisz dodatkowo 1,5% swojego dochodu na wybraną organizację",
          "Z własnych oszczędności dajesz 1,5% dochodu na cele charytatywne",
          "Z należnego podatku, który i tak oddajesz fiskusowi, 1,5% trafia do wybranej organizacji pożytku publicznego — ciebie nie kosztuje to nic dodatkowego",
          "Urząd Skarbowy przekazuje 1,5% twoich wszystkich oszczędności na cele publiczne",
        ],
        correctIndex: 2,
        explanation:
          "Mechanizm 1,5% polega na tym, że z podatku, który i tak płacisz, wskazujesz, żeby 1,5% trafiło do wybranej organizacji OPP zamiast do ogólnego budżetu państwa. Ciebie nie kosztuje to ani grosza więcej.",
      },
    ],
  },
  missions: [
    {
      id: "pf3-m1",
      skillId: "personal-finance-3",
      version: "1.0",
      order: 1,
      difficulty: "QUICK",
      title: "Znajdź swój NIP i sprawdź profil zaufany",
      description:
        "Poznaj swoje podstawowe numery podatkowe i dowiedz się, jak uzyskać dostęp do e-PIT.",
      realLifeTask:
        "Sprawdź, czy masz już NIP (możesz go znaleźć w umowie o pracę lub zapytać rodziców, jak go uzyskać). Wejdź na stronę podatki.gov.pl i przejrzyj sekcję 'Twój e-PIT'. Dowiedz się, jak założyć profil zaufany przez bankowość elektroniczną. Zapisz na kartce: twój PESEL, jak uzyskać NIP i jak zalogować się do e-PIT.",
      estimatedMinutes: 20,
      successCriteria:
        "Wiesz, czym jest PESEL i NIP, masz lub wiesz jak uzyskać profil zaufany, i zapoznałeś się z interfejsem podatki.gov.pl.",
    },
    {
      id: "pf3-m2",
      skillId: "personal-finance-3",
      version: "1.0",
      order: 2,
      difficulty: "STANDARD",
      title: "Symulacja rozliczenia podatkowego",
      description:
        "Przeprowadź hipotetyczne obliczenie podatku dla przykładowego wynagrodzenia.",
      realLifeTask:
        "Załóż, że zarabiasz 2400 zł brutto miesięcznie (28 800 zł rocznie) i masz 19 lat. Krok 1: Sprawdź, czy kwalifikujesz się do ulgi dla młodych. Krok 2: Oblicz, ile wynosiłby twój podatek BEZ ulgi (dochód minus kwota wolna 30 000 zł = podstawa, potem 12%). Krok 3: Oblicz, ile wynosi twój podatek Z ulgą dla młodych. Krok 4: Oblicz różnicę — tyle 'oszczędzasz' dzięki uldze rocznie. Zapisz obliczenia. Porozmawiaj z rodzicem, który może sprawdzić twoje obliczenia.",
      estimatedMinutes: 40,
      successCriteria:
        "Masz kompletne obliczenia pokazujące podatek z ulgą i bez ulgi oraz roczną różnicę.",
      parentTip:
        "To świetna okazja do rozmowy o waszej rodzinnej sytuacji podatkowej — możesz pokazać dziecku prawdziwy PIT (z zasłoniętymi wrażliwymi danymi), żeby zrozumiało, jak wygląda w praktyce.",
    },
    {
      id: "pf3-m3",
      skillId: "personal-finance-3",
      version: "1.0",
      order: 3,
      difficulty: "CHALLENGE",
      title: "Wybierz organizację dla swojego 1,5%",
      description:
        "Zbadaj mechanizm 1,5% podatku i wybierz organizację, której chciałbyś przekazać swój odpis.",
      realLifeTask:
        "Wejdź na stronę podatki.gov.pl i zapoznaj się z listą organizacji OPP uprawnionych do otrzymania 1,5% podatku. Wybierz 3 organizacje, których działalność najbardziej cię interesuje. Dla każdej zapisz: nazwę, cel działalności, numer KRS. Zastanów się i wybierz jedną — tę, której chciałbyś przekazać swój odpis, gdy zaczniesz płacić podatki. Napisz 3–4 zdania uzasadniające wybór.",
      estimatedMinutes: 35,
      successCriteria:
        "Przejrzałeś co najmniej 5 organizacji OPP, wybrałeś jedną i masz jej numer KRS oraz pisemne uzasadnienie swojego wyboru.",
    },
  ],
}
