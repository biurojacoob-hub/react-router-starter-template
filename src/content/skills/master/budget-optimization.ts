import type { SkillContent } from "../../types"

// ─────────────────────────────────────────────────────────────
// budget-optimization-1 — Metoda 50/30/20
// ─────────────────────────────────────────────────────────────

export const budgetOptimization1: SkillContent = {
  skillId: "budget-optimization-1",
  lessons: [
    {
      id: "bo1-l1",
      skillId: "budget-optimization-1",
      version: "1.0",
      order: 1,
      title: "Zasada 50/30/20 — ramy dla każdej pensji",
      learningObjective:
        "Rozumiesz, na czym polega zasada 50/30/20 i potrafisz podzielić dochód na trzy kategorie",
      estimatedMinutes: 18,
      introStory:
        "Kiedy Julia dostała pierwszą pensję, siedziała przy kuchennym stole i patrzyła na 2600 zł. Nie wiedziała, od czego zacząć. Płacić za pokój? Odkładać? Kupić to, na co długo czekała? Wtedy starszy brat powiedział jej: 'Zanim cokolwiek zrobisz — podziel to na trzy kupki. To zajmie ci pięć minut i uratuje cały miesiąc.' Zasada 50/30/20 to właśnie te trzy kupki.",
      explanation:
        "Zasada 50/30/20 to jeden z najprostszych i najbardziej popularnych systemów budżetowania, stworzony przez senator Elizabeth Warren i jej córkę Amelia Warren Tyagi. Idea jest prosta: dzielisz swoje dochody netto (po podatkach) na trzy kategorie. 50% na POTRZEBY — rzeczy, bez których nie możesz funkcjonować: czynsz lub rata kredytu, jedzenie, transport do pracy/szkoły, rachunki za prąd i internet, ubezpieczenia, minimalne spłaty długów, leki. Jeśli coś byś kupił nawet gdybyś miał bardzo mało pieniędzy — to potrzeba. 30% na ZACHCIANKI — rzeczy, które poprawiają jakość życia, ale nie są niezbędne: restauracje i kawiarnie, rozrywka (kino, streaming, gry), ubrania ponad minimum, podróże, hobby, subskrypcje. To nie jest 'zło' — to świadome wydawanie na przyjemności. 20% na OSZCZĘDNOŚCI i SPŁATĘ DŁUGÓW — fundusz awaryjny, oszczędności długoterminowe, spłata kredytów powyżej minimum. To kategoria, która buduje twój majątek netto. Zasada jest ramą, nie kajdanami — możesz ją dostosować do swojej sytuacji.",
      example:
        "Marcin zarabia 3000 zł netto miesięcznie. Podział 50/30/20: Potrzeby (50%): 1500 zł — czynsz 700 zł, jedzenie 400 zł, transport 200 zł, internet 50 zł, pozostałe 150 zł. Zachcianki (30%): 900 zł — wyjścia ze znajomymi, streaming, nowe ubrania, hobby. Oszczędności (20%): 600 zł — 400 zł na fundusz awaryjny, 200 zł na cele długoterminowe. System działa, bo Marcin wie dokładnie, ile może wydać na rozrywkę bez poczucia winy.",
      challenge:
        "Weź swoje ostatnie miesięczne wpływy i podziel je według zasady 50/30/20. Policz, ile wynosiło 50%, 30% i 20%. Porównaj z tym, jak faktycznie wydałeś. W której kategorii jesteś 'nad' budżetem, a w której 'pod'?",
      summary:
        "Zasada 50/30/20 daje prosty framework: połowa na potrzeby, 30% na przyjemności, 20% na przyszłość — to równowaga między bezpieczeństwem a jakością życia.",
      tags: ["50/30/20", "budżet", "potrzeby", "zachcianki", "oszczędności", "budżetowanie"],
    },
    {
      id: "bo1-l2",
      skillId: "budget-optimization-1",
      version: "1.0",
      order: 2,
      title: "Jak zastosować 50/30/20 do pierwszej pensji",
      learningObjective:
        "Potrafisz stworzyć konkretny miesięczny budżet oparty na zasadzie 50/30/20",
      estimatedMinutes: 20,
      introStory:
        "Pierwsze wynagrodzenie to jeden z tych momentów, kiedy decyzje finansowe podejmuje się emocjonalnie — bo wreszcie 'mam swoje pieniądze'. Badania pokazują, że sposób, w jaki wydamy pierwsze trzy pensje, często staje się nawykiem na lata. Dlatego warto mieć plan zanim pieniądze trafią na konto, a nie szukać go potem.",
      explanation:
        "Zastosowanie zasady 50/30/20 w praktyce wymaga kilku kroków. Krok 1: Ustal swój dochód netto. To kwota, która trafia na twoje konto po podatkach. Jeśli masz umowę o pracę — to kwota na pasku płacowym. Jeśli zlecenie lub dzieło — odlicz podatek i ZUS samodzielnie. Krok 2: Oblicz trzy limity. 50% × dochód netto = limit na potrzeby. 30% × dochód netto = limit na zachcianki. 20% × dochód netto = cel oszczędnościowy. Krok 3: Wypisz wszystkie znane, stałe potrzeby (czynsz, bilety, abonamenty). Sprawdź, czy mieszczą się w 50%. Jeśli nie — to sygnał, że koszty życia są za wysokie i trzeba je zredukować lub zwiększyć dochód. Krok 4: Podziel limit zachcianek na kategorie (np. 150 zł jedzenie poza domem, 100 zł rozrywka, 80 zł ubrania). To daje konkretne 'kupki' do zarządzania. Krok 5: Zanim miesiąc się zacznie, prześlij 20% oszczędności na osobne konto lub odkładaj gotówkę — zasada 'najpierw zapłać sobie'.",
      example:
        "Kasia (18 lat, pierwsza praca): dochód netto 2200 zł. Potrzeby (50% = 1100 zł): mieszka z rodzicami i płaci 300 zł 'czynszu domowego', jedzenie 350 zł, bilety 200 zł, telefon 100 zł, inne 150 zł — razem 1100 zł ✓. Zachcianki (30% = 660 zł): wyjścia 200 zł, ubrania 150 zł, streaming i gry 80 zł, cosmetyki 130 zł, inne 100 zł — razem 660 zł ✓. Oszczędności (20% = 440 zł): fundusz awaryjny 300 zł, cel długoterminowy 140 zł ✓. Kasia przelewa 440 zł na konto oszczędnościowe pierwszego dnia po wypłacie.",
      challenge:
        "Stwórz swój budżet 50/30/20 na przyszły miesiąc. Użyj prawdziwych liczb — swoich obecnych lub planowanych wpływów. Wypełnij trzy kolumny: potrzeby, zachcianki, oszczędności. Upewnij się, że sumy dają 100%.",
      summary:
        "Budżet 50/30/20 tworzysz raz, na początku miesiąca — zanim pojawią się spontaniczne decyzje. Kluczem jest przelanie oszczędności jako pierwszego kroku po wpłynięciu pensji.",
      tags: ["budżet", "pierwsza pensja", "50/30/20", "planowanie", "oszczędności"],
    },
    {
      id: "bo1-l3",
      skillId: "budget-optimization-1",
      version: "1.0",
      order: 3,
      title: "Dostosowanie 50/30/20 do różnych sytuacji",
      learningObjective:
        "Wiesz, jak modyfikować zasadę 50/30/20, gdy standardowy podział nie pasuje do twojej rzeczywistości",
      estimatedMinutes: 16,
      introStory:
        "Zasada 50/30/20 jest świetna — ale wymyślono ją z myślą o przeciętnym amerykańskim budżecie domowym. W Polsce, gdzie koszty życia w Warszawie i na wsi różnią się drastycznie, a jako 17-latek możesz mieć zero stałych kosztów lub płacić czynsz — musisz ją dostosować do swojej realności, a nie odwrotnie.",
      explanation:
        "Zasada 50/30/20 to punkt wyjścia, nie dogmat. Oto jak ją dostosować w różnych sytuacjach. Sytuacja 1: Mieszkasz z rodzicami i nie płacisz czynszu. Twoje potrzeby są niskie — możesz przesunąć więcej do oszczędności. Rozważ 40/30/30 lub nawet 30/30/40. To idealny czas na szybkie budowanie funduszu awaryjnego. Sytuacja 2: Masz kredyt studencki lub inne długi. Tymczasowo zwiększ kategorię 'oszczędności i długi' do 30–35% kosztem zachcianek. Dług jest drogi — jego szybka spłata to najlepszy 'zwrot z inwestycji'. Sytuacja 3: Twoje dochody są bardzo niskie (np. tylko kieszonkowe). Możesz stosować uproszczoną zasadę: najpierw odłóż 20% jakkolwiek, resztą zarządzaj swobodnie. Sytuacja 4: Twoje potrzeby przekraczają 50%. To sygnał problemu — albo za dużo wydajesz na potrzeby (za drogi czynsz, za drogi samochód), albo za mało zarabiasz. Rozwiązanie: albo zmniejsz koszty, albo zwiększ dochód. Zasada 50/30/20 ma też wariant agresywny dla tych, którzy chcą szybko budować oszczędności: 50/20/30 (30% oszczędności, 20% zachcianki).",
      example:
        "Marek (17 lat) mieszka z rodzicami i nie płaci czynszu. Ma kieszonkowe 600 zł + zarabia 400 zł z korepetycji = 1000 zł. Standardowe 50% potrzeby to 500 zł — ale faktycznie wydaje tylko 200 zł (jedzenie poza domem, bilety). Dostosowuje: potrzeby 25% = 250 zł, zachcianki 35% = 350 zł, oszczędności 40% = 400 zł. Dzięki temu przez rok odkłada 4800 zł — start do funduszu awaryjnego i przyszłej niezależności.",
      challenge:
        "Oceń swoją sytuację: czy standardowy podział 50/30/20 pasuje do twoich realiów? Jeśli nie — zaproponuj własne proporcje i wyjaśnij, dlaczego wybrałeś takie wartości. Stwórz swój spersonalizowany budżet na przyszły miesiąc.",
      summary:
        "Zasada 50/30/20 to szablon, nie prawo — dostosuj proporcje do swojej sytuacji życiowej, dbając tylko o to, żeby kategoria oszczędności nigdy nie wynosiła mniej niż 10–15%.",
      tags: ["50/30/20", "dostosowanie", "budżet elastyczny", "czynsz", "proporcje"],
    },
  ],
  quiz: {
    id: "bo1-quiz",
    skillId: "budget-optimization-1",
    version: "1.0",
    title: "Quiz: Metoda 50/30/20",
    questions: [
      {
        id: "bo1-q1",
        difficulty: "EASY",
        question: "Co oznacza '20%' w zasadzie 50/30/20?",
        options: [
          "Podatek dochodowy odprowadzany do Urzędu Skarbowego",
          "Wydatki na ubrania i wygląd",
          "Oszczędności i spłata długów",
          "Jedzenie i podstawowe zakupy spożywcze",
        ],
        correctIndex: 2,
        explanation:
          "W zasadzie 50/30/20: 50% to potrzeby, 30% to zachcianki, a 20% to oszczędności i spłata długów — ta kategoria buduje twój majątek netto.",
      },
      {
        id: "bo1-q2",
        difficulty: "MEDIUM",
        question:
          "Natalia zarabia 2800 zł netto. Ile powinna maksymalnie wydać na zachcianki według zasady 50/30/20?",
        options: ["560 zł", "840 zł", "1120 zł", "700 zł"],
        correctIndex: 1,
        explanation:
          "30% z 2800 zł = 840 zł. Zachcianki to kategoria przyjemności i komfortu — do 30% dochodu netto.",
      },
      {
        id: "bo1-q3",
        difficulty: "MEDIUM",
        question: "Które z poniższych jest przykładem POTRZEBY (nie zachcianki)?",
        options: [
          "Subskrypcja platformy streamingowej",
          "Bilet miesięczny na komunikację miejską do pracy",
          "Wyjście do restauracji z przyjaciółmi",
          "Nowe sneakersy limitowanej edycji",
        ],
        correctIndex: 1,
        explanation:
          "Bilet miesięczny to niezbędny koszt transportu do pracy — bez niego nie możesz funkcjonować. Pozostałe to zachcianki: poprawiają jakość życia, ale nie są niezbędne.",
      },
      {
        id: "bo1-q4",
        difficulty: "HARD",
        question:
          "Tomek zarabia 3200 zł netto. Jego stałe potrzeby to: czynsz 900 zł, jedzenie 500 zł, transport 180 zł, internet 60 zł = razem 1640 zł. Jaki procent dochodu stanowią jego potrzeby i czy mieści się w zasadzie 50/30/20?",
        options: [
          "51,25% — nieznacznie przekracza limit 50%, warto zoptymalizować",
          "45% — mieści się w normie z nadwyżką",
          "55% — znacznie przekracza limit, wymaga korekty",
          "48% — mieści się w normie",
        ],
        correctIndex: 0,
        explanation:
          "1640 ÷ 3200 = 51,25%. Nieznacznie przekracza próg 50%. Nie jest to katastrofa, ale warto sprawdzić, czy można zmniejszyć któryś z wydatków — np. negocjować czynsz lub ograniczyć koszty jedzenia.",
      },
      {
        id: "bo1-q5",
        difficulty: "HARD",
        question:
          "Asia mieszka z rodzicami i płaci tylko 200 zł 'czynszu domowego'. Zarabia 1800 zł netto. Jaką strategię 50/30/20 powinna przyjąć?",
        options: [
          "Standardowe 50/30/20, bo zasada jest nienaruszalna",
          "Powinna wydawać więcej na zachcianki, bo ma niskie koszty",
          "Powinna zwiększyć % oszczędności — np. 30/30/40 — bo to wyjątkowy czas z niskimi kosztami życia",
          "Nie powinna stosować żadnej zasady, bo zarabia za mało",
        ],
        correctIndex: 2,
        explanation:
          "Mieszkanie z rodzicami to unikalny czas na agresywne oszczędzanie. Skoro potrzeby są niskie (200 zł zamiast np. 700 zł czynszu), Asia powinna przesunąć nadwyżkę do oszczędności. 40% oszczędności z 1800 zł = 720 zł miesięcznie = 8640 zł rocznie — świetny fundusz na przyszłą niezależność.",
      },
    ],
  },
  missions: [
    {
      id: "bo1-m1",
      skillId: "budget-optimization-1",
      version: "1.0",
      order: 1,
      difficulty: "QUICK",
      title: "Sklasyfikuj wydatki miesiąca",
      description:
        "Przejrzyj wydatki z ostatniego miesiąca i przypisz je do kategorii 50/30/20.",
      realLifeTask:
        "Zbierz dowody wydatków z ostatniego miesiąca (paragony, historię konta, pamięć). Wypisz każdy wydatek i przypisz go do jednej z trzech kategorii: potrzeba, zachcianka, oszczędność. Zsumuj każdą kategorię. Oblicz procenty. Porównaj z zasadą 50/30/20. Gdzie masz nadwyżkę, a gdzie deficit?",
      estimatedMinutes: 25,
      successCriteria:
        "Masz pełną listę wydatków podzieloną na trzy kategorie z procentami i porównaniem do zasady 50/30/20.",
    },
    {
      id: "bo1-m2",
      skillId: "budget-optimization-1",
      version: "1.0",
      order: 2,
      difficulty: "STANDARD",
      title: "Budżet 50/30/20 na pełny miesiąc",
      description:
        "Zaplanuj i przez miesiąc realizuj budżet oparty na zasadzie 50/30/20.",
      realLifeTask:
        "Na początku miesiąca stwórz swój budżet 50/30/20 (dostosowany do twojej sytuacji). Przez cały miesiąc zapisuj każdy wydatek i przypisuj go do kategorii. Na koniec miesiąca porównaj plan z wykonaniem: ile wydałeś w każdej kategorii, gdzie przekroczyłeś plan, gdzie zostały oszczędności. Napisz jedno zdanie podsumowujące, co ci się udało, a co warto zmienić.",
      estimatedMinutes: 120,
      successCriteria:
        "Masz zapisany budżet, dziennik wydatków przez miesiąc i pisemne podsumowanie z wnioskami.",
      parentTip:
        "Możesz zaproponować, żebyście przez jeden miesiąc śledzili wydatki razem — to świetna okazja do rozmowy o rodzinnych finansach.",
    },
    {
      id: "bo1-m3",
      skillId: "budget-optimization-1",
      version: "1.0",
      order: 3,
      difficulty: "CHALLENGE",
      title: "Optymalizacja kategorii potrzeb",
      description:
        "Znajdź co najmniej trzy sposoby na zmniejszenie kosztów w kategorii potrzeb.",
      realLifeTask:
        "Przejrzyj dokładnie swoje wydatki na potrzeby. Dla każdej pozycji zadaj pytanie: 'Czy mogę to zrobić taniej bez dużego pogorszenia jakości?' Znajdź co najmniej 3 miejsca do oszczędzenia (np. tańszy operator, gotowanie zamiast kupowania gotowych posiłków, rower zamiast autobusu). Oblicz, ile miesięcznie zaoszczędzisz po wprowadzeniu zmian. Wdróż te zmiany przez 1 miesiąc i sprawdź wynik.",
      estimatedMinutes: 60,
      successCriteria:
        "Znalazłeś i wdrożyłeś 3 optymalizacje, które razem oszczędzają co najmniej 100 zł miesięcznie.",
    },
  ],
}

// ─────────────────────────────────────────────────────────────
// budget-optimization-2 — Zero-based budgeting
// ─────────────────────────────────────────────────────────────

export const budgetOptimization2: SkillContent = {
  skillId: "budget-optimization-2",
  lessons: [
    {
      id: "bo2-l1",
      skillId: "budget-optimization-2",
      version: "1.0",
      order: 1,
      title: "Zasada zero — każda złotówka ma rolę",
      learningObjective:
        "Rozumiesz, na czym polega budżetowanie od zera i czym różni się od innych metod",
      estimatedMinutes: 18,
      introStory:
        "Wyobraź sobie, że zatrudniasz 3000 pracowników i każdy z nich pyta: 'Co mam robić?' Jeden odpowiada, że sam wie. Drugi czeka na polecenie. Trzeci wykonuje zadanie, które mu przydzieliłeś. Budżetowanie od zera (zero-based budgeting) zakłada, że twoje pieniądze to właśnie ci pracownicy — każda złotówka dostaje konkretne zadanie, zanim miesiąc się zacznie. Żadna nie 'wisi' bez przypisania.",
      explanation:
        "Zero-based budgeting (ZBB), czyli budżetowanie od zera, to metoda, w której planujesz tak, żeby: dochód netto minus wszystkie zaplanowane wydatki i oszczędności = 0. Nie znaczy to, że wydajesz wszystko. Znaczy to, że każdej złotówce przypisujesz konkretną rolę — czy to rachunek, zakupy, oszczędności, fundusz awaryjny, czy 'fundusz przyjemności'. W tradycyjnym budżetowaniu często zostaje 'reszta', którą nieświadomie się roztrwania. W ZBB nie ma 'reszty' — jest 'zaplanowana kwota na spontaniczne wydatki' lub 'dodatkowe oszczędności'. Jak to działa krok po kroku: Krok 1: Ustal dochód netto na nadchodzący miesiąc. Krok 2: Wypisz wszystkie kategorie wydatków i oszczędności. Krok 3: Przypisz konkretną kwotę do każdej kategorii. Krok 4: Zsumuj wszystkie kategorie — jeśli suma jest mniejsza od dochodu, różnicę przypisz do oszczędności lub dodatkowej spłaty długów. Krok 5: Pilnuj budżetu w trakcie miesiąca i zapisuj każdy wydatek. Zalety ZBB: pełna świadomość, gdzie idą pieniądze; brak 'przecieków'; każdy cel finansowy ma przypisaną kwotę. Wady: wymaga dyscypliny i regularnego śledzenia wydatków; może być przytłaczające na początku.",
      example:
        "Dochód netto Piotra: 2500 zł. Budżet ZBB: czynsz 700 zł, jedzenie 450 zł, transport 200 zł, internet 60 zł, telefon 50 zł, wyjścia ze znajomymi 200 zł, odzież 100 zł, hobby 80 zł, streaming 30 zł, fundusz awaryjny 400 zł, oszczędności cel 180 zł, spontaniczne 50 zł. Suma: 700+450+200+60+50+200+100+80+30+400+180+50 = 2500 zł. Wynik: 2500 − 2500 = 0. Każda złotówka ma rolę.",
      challenge:
        "Wypisz wszystkie kategorie swoich wydatków i oszczędności z ostatniego miesiąca. Spróbuj przypisać im konkretne kwoty tak, żeby suma równała się twojemu dochodowi netto. Gdzie masz problem z dopasowaniem? Która kategoria jest najtrudniejsza do kontrolowania?",
      summary:
        "Zero-based budgeting = dochód minus wszystkie kategorie = 0. Każda złotówka ma zadanie, żadna nie 'wisi' bez przypisania — to metoda maksymalnej kontroli nad finansami.",
      tags: ["zero-based budgeting", "budżet", "planowanie", "kontrola finansów", "ZBB"],
    },
    {
      id: "bo2-l2",
      skillId: "budget-optimization-2",
      version: "1.0",
      order: 2,
      title: "Jak stworzyć i utrzymać budżet zerowy",
      learningObjective:
        "Potrafisz stworzyć kompletny budżet zerowy i znasz narzędzia do jego śledzenia przez miesiąc",
      estimatedMinutes: 22,
      introStory:
        "Największa pułapka budżetowania nie jest na początku — jest w połowie miesiąca. Stworzenie budżetu zajmuje 20 minut. Trzymanie się go przez 30 dni wymaga systemu. Bez systemu śledzenia wydatków nawet najlepiej zaplanowany budżet rozpadnie się przy trzecim nieplanowanym cappuccino. Ale ze systemem — nawet skromny dochód zaczyna działać na twoją korzyść.",
      explanation:
        "Tworzenie budżetu zerowego zaczyna się od kalendarza. Najlepiej zaplanuj budżet na tydzień przed nadchodzącym miesiącem — wtedy wiesz, jakie stałe wydatki czekają (rachunki, czynsz, abonamenty). Śledzenie wydatków to kluczowy element ZBB. Metody śledzenia: metoda gotówkowa (koperty) — dla każdej kategorii robisz kopertę i wkładasz do niej gotówkę; gdy koperta jest pusta, kategoria wyczerpana. Metoda arkusza — w Excelu lub Arkuszach Google zapisujesz każdy wydatek i odejmujesz od przypisanej kwoty. Aplikacje budżetowe — wiele aplikacji pozwala tworzyć kategorie i śledzić wydatki (szukaj aplikacji do budżetowania, nie konkretny produkt — sprawdź kilka i wybierz dopasowaną do siebie). Kluczowe zasady utrzymania budżetu zerowego przez miesiąc: (1) Zapisuj wydatek natychmiast po jego poniesieniu — nie 'na koniec dnia'. (2) Sprawdzaj budżet co 2-3 dni, nie raz w miesiącu. (3) Jeśli przekroczysz kategorię — natychmiast przesunij pieniądze z innej, niebieżącej kategorii. (4) Nie kasuj kategorii — redukuj je.",
      example:
        "Karolina używa metody kopert. W pierwszym dniu miesiąca wypłaca gotówkę i dzieli na koperty: 'Jedzenie 400 zł', 'Transport 150 zł', 'Rozrywka 200 zł', 'Odzież 100 zł', 'Inne 50 zł'. Pieniądze na oszczędności przelewa od razu na konto oszczędnościowe. Kiedy koperta 'Rozrywka' się kończy — Karolina wie, że na rozrywkę nie ma już budżetu. Prosta, fizyczna metoda, która działa.",
      challenge:
        "Wybierz metodę śledzenia wydatków, która najbardziej do ciebie przemawia: koperty, arkusz, aplikacja. Stwórz system dla następnego tygodnia (mini-test przed pełnym miesiącem). Przez 7 dni zapisuj każdy wydatek w wybranym systemie i sprawdź, jak ci idzie.",
      summary:
        "ZBB działa tylko z systemem śledzenia — wybierz jedną metodę (koperty, arkusz lub aplikację), sprawdzaj budżet kilka razy w tygodniu i koryguj na bieżąco.",
      tags: ["śledzenie wydatków", "koperty", "arkusz", "budżet zerowy", "dyscyplina finansowa"],
    },
    {
      id: "bo2-l3",
      skillId: "budget-optimization-2",
      version: "1.0",
      order: 3,
      title: "ZBB vs inne metody — kiedy co wybrać",
      learningObjective:
        "Wiesz, kiedy zero-based budgeting jest lepsze od 50/30/20 i kiedy warto je łączyć",
      estimatedMinutes: 15,
      introStory:
        "Nie ma jednej idealnej metody budżetowania dla wszystkich — tak jak nie ma jednej idealnej diety ani jednego idealnego harmonogramu snu. Kluczem jest znaleźć metodę, którą faktycznie będziesz stosować, a nie tę, która jest 'najlepsza na papierze'. Ale żeby wybrać świadomie, musisz znać zalety i ograniczenia każdej.",
      explanation:
        "Porównanie głównych metod budżetowania. Metoda 50/30/20: prosta i szybka w implementacji; dobre ramy dla osób zaczynających; mniej precyzyjna (duże kategorie mogą 'chłonąć' nieplanowane wydatki); wymaga mniejszego wysiłku codziennego; idealna na start lub przy stabilnych, przewidywalnych dochodach. Zero-based budgeting: pełna precyzja i kontrola; każda złotówka jest świadomie zarządzana; wymaga większego zaangażowania (śledzenie, aktualizacja); najlepsza przy ograniczonych dochodach, dużych celach oszczędnościowych lub po wyjściu z długów; idealna, gdy 50/30/20 nie przynosi efektów. Kiedy stosować ZBB: masz trudność z oszczędzaniem i nie wiesz 'gdzie idą pieniądze'; wychodzisz z długów i chcesz maksymalizować spłatę; masz nieregularne dochody (wolny zawód, zlecenia) — budujesz budżet od nowa każdego miesiąca. Kiedy 50/30/20 wystarczy: twoje wydatki są stabilne i przewidywalne; nie masz problemów z oszczędzaniem; chcesz prostego systemu bez codziennego śledzenia. Opcja hybrydowa: stosuj 50/30/20 jako ramy, ale szczegółowo planuj ZBB tylko w kategorii 'potrzeby' — to daje precyzję tam, gdzie jest największy wydatek.",
      example:
        "Adam (18 lat, niereguarne dochody z freelancingu): w jednym miesiącu zarabia 1500 zł, w innym 3500 zł. Dla niego ZBB jest lepsze — co miesiąc buduje budżet od zera, dostosowując kwoty do faktycznego dochodu. W słabym miesiącu wszystko idzie na potrzeby i fundusz. W dobrym — duże przelewy na cele. Paulina (22 lata, stała praca): zarabia 2800 zł netto co miesiąc. Dla niej 50/30/20 jest wystarczające — stabilne dochody, przewidywalne wydatki.",
      challenge:
        "Zdecyduj, która metoda lepsza pasuje do twojej sytuacji: 50/30/20, ZBB, czy hybryda. Napisz 3–5 zdań uzasadniając wybór. Jeśli jeszcze nie próbowałeś ZBB — zaplanuj jeden miesiąc próbny.",
      summary:
        "ZBB daje pełną kontrolę kosztem większego wysiłku; 50/30/20 jest prostsze, ale mniej precyzyjne — wybierz metodę, którą faktycznie zastosowasz, lub połącz je hybrydowo.",
      tags: ["ZBB", "50/30/20", "wybór metody", "budżet", "freelancing", "hybryda"],
    },
  ],
  quiz: {
    id: "bo2-quiz",
    skillId: "budget-optimization-2",
    version: "1.0",
    title: "Quiz: Zero-based budgeting",
    questions: [
      {
        id: "bo2-q1",
        difficulty: "EASY",
        question: "Co oznacza 'zero' w zero-based budgeting?",
        options: [
          "Zaczynasz miesiąc z zerowym saldem konta",
          "Dochód minus wszystkie zaplanowane kategorie = 0 (każda złotówka ma przypisaną rolę)",
          "Nie możesz nic wydać przez pierwszy tydzień miesiąca",
          "Twoje oszczędności zaczynają się od zera",
        ],
        correctIndex: 1,
        explanation:
          "W ZBB 'zero' oznacza, że dochód minus suma wszystkich kategorii wydatków i oszczędności daje zero — nie ma pieniędzy 'bez przypisania'. To nie znaczy, że nic nie odkładasz — przeciwnie.",
      },
      {
        id: "bo2-q2",
        difficulty: "MEDIUM",
        question:
          "Krzysztofa dochód netto to 2200 zł. Zaplanował: potrzeby 1100 zł, zachcianki 550 zł, oszczędności 400 zł. Ile brakuje do budżetu zerowego?",
        options: ["0 zł — budżet jest już zerowy", "100 zł", "150 zł", "200 zł"],
        correctIndex: 2,
        explanation:
          "1100 + 550 + 400 = 2050 zł. Dochód: 2200 zł. Różnica: 2200 − 2050 = 150 zł. Krzysztof musi przypisać te 150 zł do jakiejś kategorii (np. dodatkowe oszczędności, spłata długu, fundusz na nieprzewidziane).",
      },
      {
        id: "bo2-q3",
        difficulty: "MEDIUM",
        question: "Jaką zaletę ma metoda 'kopert' w budżetowaniu zerowym?",
        options: [
          "Pieniądze w kopercie zyskują odsetki szybciej niż w banku",
          "Daje fizyczne ograniczenie — gdy koperta jest pusta, kategoria wyczerpana, bez wyjątków",
          "Pozwala przenosić pieniądze między kopertami bez ograniczeń",
          "Chroni pieniądze przed kradzieżą lepiej niż konto bankowe",
        ],
        correctIndex: 1,
        explanation:
          "Metoda kopert daje namacalne, fizyczne granice — kiedy widzisz pustą kopertę 'Rozrywka', instynktownie wiesz, że nie masz już budżetu. Gotówka jest bardziej 'namacalna' niż cyfry na koncie.",
      },
      {
        id: "bo2-q4",
        difficulty: "HARD",
        question:
          "Ola stosuje ZBB. W połowie miesiąca przekroczyła kategorię 'Jedzenie poza domem' o 80 zł. Co powinna zrobić, żeby nie psuć budżetu zerowego?",
        options: [
          "Zignorować — to tylko 80 zł, mieści się w marginesie błędu",
          "Zaciągnąć pożyczkę od przyjaciela na te 80 zł",
          "Zredukować inną, niebieżącą kategorię o 80 zł (np. 'Rozrywka' lub 'Odzież')",
          "Dodać nową kategorię 'Przekroczenie' i przepisać tam 80 zł",
        ],
        correctIndex: 2,
        explanation:
          "W ZBB gdy przekroczysz kategorię, musisz zabrać kwotę z innej kategorii — budżet zerowy musi się zawsze równać dochodowi. Zazwyczaj redukujesz najbardziej elastyczne kategorie (rozrywka, odzież), nie potrzeby.",
      },
      {
        id: "bo2-q5",
        difficulty: "HARD",
        question:
          "Bartek freelancer ma nieregularne dochody: styczeń 1200 zł, luty 3800 zł, marzec 2100 zł. Jak powinien stosować ZBB?",
        options: [
          "Budzuje tylko w dobrych miesiącach, w złych wydaje co chce",
          "Co miesiąc buduje budżet od nowa, dostosowując kwoty do faktycznego dochodu tego miesiąca",
          "Uśrednia dochód (2367 zł) i stosuje ten sam budżet co miesiąc bez zmian",
          "Stosuje ZBB tylko wtedy, gdy dochód przekracza 2000 zł",
        ],
        correctIndex: 1,
        explanation:
          "Przy nieregularnych dochodach ZBB jest szczególnie potężne — budżetujesz rzeczywisty dochód każdego miesiąca. W słabych miesiącach ograniczasz wydatki do minimum; w dobrych agresywnie oszczędzasz lub spłacasz długi. Uśrednianie może prowadzić do deficytu w słabych miesiącach.",
      },
    ],
  },
  missions: [
    {
      id: "bo2-m1",
      skillId: "budget-optimization-2",
      version: "1.0",
      order: 1,
      difficulty: "QUICK",
      title: "Budżet zerowy na papierze",
      description:
        "Stwórz swój pierwszy budżet zerowy dla nadchodzącego miesiąca.",
      realLifeTask:
        "Na kartce papieru lub w arkuszu kalkulacyjnym stwórz pełny budżet zerowy. Zacznij od dochodu netto u góry. Wypisz wszystkie kategorie z konkretnymi kwotami. Zsumuj kategorie. Sprawdź, czy dochód minus suma = 0. Jeśli nie — dodaj brakującą kwotę do kategorii 'Dodatkowe oszczędności' lub 'Fundusz awaryjny'. Podpisz datę.",
      estimatedMinutes: 25,
      successCriteria:
        "Masz kompletny budżet zerowy, gdzie dochód minus suma kategorii = 0, z datą i podpisem.",
    },
    {
      id: "bo2-m2",
      skillId: "budget-optimization-2",
      version: "1.0",
      order: 2,
      difficulty: "STANDARD",
      title: "Miesiąc z ZBB w praktyce",
      description:
        "Przez pełny miesiąc stosuj budżet zerowy i śledź każdy wydatek.",
      realLifeTask:
        "Stwórz budżet zerowy na nadchodzący miesiąc. Wybierz metodę śledzenia (koperty, arkusz lub aplikacja). Przez 30 dni: zapisuj każdy wydatek zaraz po poniesieniu, sprawdzaj budżet co 3 dni, koryguj jeśli przekraczasz kategorię. Na koniec miesiąca porównaj plan z wykonaniem i napisz: co działało, co nie, i co zmienisz w kolejnym miesiącu.",
      estimatedMinutes: 150,
      successCriteria:
        "Masz zapisy wydatków przez pełny miesiąc i pisemne podsumowanie z planem ulepszeń.",
      parentTip:
        "Zaproponuj, żebyś przez ten miesiąc był/a 'partnerem odpowiedzialności' — dziecko może cię codziennie informować o jednym wydatku z danego dnia.",
    },
    {
      id: "bo2-m3",
      skillId: "budget-optimization-2",
      version: "1.0",
      order: 3,
      difficulty: "CHALLENGE",
      title: "Porównanie metod przez dwa miesiące",
      description:
        "Przez jeden miesiąc stosuj 50/30/20, przez drugi ZBB — i porównaj wyniki.",
      realLifeTask:
        "Miesiąc 1: stosuj metodę 50/30/20. Zapisuj wydatki i wynik na koniec miesiąca. Miesiąc 2: stosuj ZBB. Stosuj ten sam poziom dyscypliny w śledzeniu. Na koniec: porównaj wyniki obu miesięcy — ile odłożyłeś, jak łatwe było każde podejście, gdzie popełniałeś błędy. Napisz analizę: która metoda jest dla ciebie lepsza i dlaczego.",
      estimatedMinutes: 240,
      successCriteria:
        "Masz pełne dane z dwóch miesięcy i pisemną analizę porównawczą z rekomendacją metody dla siebie.",
    },
  ],
}
