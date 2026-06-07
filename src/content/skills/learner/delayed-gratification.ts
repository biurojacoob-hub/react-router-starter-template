import type { SkillContent } from "../../types"

// ─────────────────────────────────────────────────────────────
// delayed-gratification-1 — Poczekaj i wygraj więcej
// ─────────────────────────────────────────────────────────────

export const delayedGratification1: SkillContent = {
  skillId: "delayed-gratification-1",
  lessons: [
    {
      id: "dg1-l1",
      skillId: "delayed-gratification-1",
      version: "1.0",
      order: 1,
      title: "Eksperyment z pianką — czyj wybór był mądrzejszy?",
      learningObjective: "Rozumiesz, czym jest odroczenie nagrody i dlaczego umiejętność czekania jest ważna",
      estimatedMinutes: 10,
      introStory:
        "W latach 60. naukowiec Walter Mischel przeprowadził słynny eksperyment. Dawał dzieciom jedną piankę marshmallow i mówił: 'Możesz ją zjeść teraz — albo poczekać 15 minut i dostaniesz dwie.' Część dzieci zjadła od razu. Część czekała. Naukowcy śledzili te dzieci przez lata — okazało się, że te, które potrafiły czekać, zazwyczaj lepiej radziły sobie w szkole, miały lepsze relacje z ludźmi i łatwiej osiągały swoje cele. To nie przypadek. Czekanie to umiejętność, którą można ćwiczyć.",
      explanation:
        "Odroczenie nagrody (ang. delayed gratification) to zdolność do rezygnacji z małej przyjemności teraz, żeby zyskać większą korzyść później. W finansach wygląda to tak: zamiast wydać 20 zł teraz na impulsywny zakup, poczekasz 5 tygodni i kupisz za 100 zł coś, czego naprawdę chcesz. To nie jest wyrzeczenie — to zamiana małego zysku na duży. Twój mózg lubi natychmiastowe nagrody (to ewolucja!), ale możesz go nauczyć czekać.",
      example:
        "Marta widzi w sklepie pluszaka za 25 zł. Jej oszczędności wynoszą 25 zł. Może: A) Kupić pluszaka teraz — i stracić 5 tygodni postępu w oszczędzaniu na gitarę. B) Poczekać — za 5 tygodni kupić gitarę, z którą marzy o graniu. Marta wybiera B. Gdy trzyma gitarę w rękach, nie żałuje plucha.",
      challenge:
        "Przypomnij sobie sytuację, gdy kupiłeś coś 'od razu', a potem żałowałeś. Co byś kupił zamiast tego, gdybyś poczekał z tymi pieniędzmi? Jak się czujesz teraz myśląc o tej decyzji?",
      summary:
        "Odroczenie nagrody to supermoc — umiejętność zamiany małej przyjemności teraz na dużą korzyść później, którą można ćwiczyć i rozwijać.",
      tags: ["odroczenie", "nagroda", "marshmallow", "czekanie"],
    },
    {
      id: "dg1-l2",
      skillId: "delayed-gratification-1",
      version: "1.0",
      order: 2,
      title: "Mój cel jako latarnia — wizualizacja",
      learningObjective: "Potrafisz użyć wizualizacji celu jako strategii czekania na nagrodę",
      estimatedMinutes: 9,
      introStory:
        "Marysia oszczędzała na bilet na koncert swojego ulubionego zespołu. Bilet kosztował 120 zł. Pewnego dnia zobaczyła piękny notebook za 40 zł. 'Tylko 40 zł...' myślała, stojąc przed sklepem. Wtedy zamknęła oczy i wyobraziła sobie: sala koncertowa, muzyka, śpiewa razem ze swoim ulubionym piosenkarzem, tłum ludzi dookoła. Uśmiechnęła się do siebie. Gdy otworzyła oczy, odłożyła notes na półkę. 'Mam latarnię' — pomyślała.",
      explanation:
        "Wizualizacja celu to technika mentalna: kiedy masz pokusę, zamknij oczy i wyobraź sobie jak się będziesz czuć, gdy osiągniesz swój cel. Jak to wygląda? Jakie emocje czujesz? Kto jest obok? Im bardziej szczegółowy obraz, tym silniejsza 'latarnia'. Twój mózg reaguje na wyobrażenie prawie tak samo jak na rzeczywistość — to dlatego wizualizacja działa. Możesz też mieć fizyczny przypomnienie: zdjęcie celu, rysunek, kartka z napisem — coś co nosisz przy sobie lub masz na widoku.",
      example:
        "Olek oszczędza na kask kolarski za 95 zł. Jego 'latarnia': zdjęcie kolarza na górskim szlaku wycięte z magazynu, przyklejone do skarbonki. Kiedy ma pokusę, patrzy na zdjęcie i pyta siebie: 'Czy to (co chcę teraz kupić) jest ważniejsze niż ten szlak?' Prawie zawsze odpowiedź brzmi: nie.",
      challenge:
        "Stwórz swoją 'latarnię' dla bieżącego celu: narysuj go, wytnij zdjęcie z gazety albo napisz opis. Umieść ją na skarbonce lub noś w portfelu. Dziś wieczorem zamknij oczy i przez 2 minuty wyobraź sobie moment osiągnięcia celu.",
      summary:
        "Wizualizacja celu to twoja mentalna latarnia — gdy widzisz wyraźnie dokąd płyniesz, trudniej cię zbić z kursu przez małe pokusy.",
      tags: ["wizualizacja", "cel", "latarnia", "technika"],
    },
    {
      id: "dg1-l3",
      skillId: "delayed-gratification-1",
      version: "1.0",
      order: 3,
      title: "Strategie czekania — jak przeżyć moment pokusy",
      learningObjective: "Znasz i potrafisz zastosować min. 3 strategie przetrwania momentu pokusy finansowej",
      estimatedMinutes: 11,
      introStory:
        "Kacper miał w kieszeni 30 zł zaoszczędzonych przez 3 tygodnie. Wchodził ze znajomymi do centrum handlowego. 'To najgorsze miejsce dla oszczędności' — pomyślał. Ale miał swoje strategie. Zostawił skarbonkę w domu (wziął tylko dokładnie tyle gotówki ile potrzebował). Miał kartkę z celem. I plan: jeśli zobaczę coś fajnego, wchodzę na 10 minut aktywności zastępczej — pójdę do biblioteki obok. Wyszedł z centrum z dokładnie 30 zł w kieszeni.",
      explanation:
        "Strategie czekania to narzędzia, które pomagają przetrwać moment pokusy: 1) Reguła 48 godzin — zanim coś kupisz poza planem, poczekaj 2 dni. Jeśli nadal chcesz — wróć do tematu. 2) Aktywność zastępcza — gdy masz pokusę, zrób coś innego: pójdź na spacer, zadzwoń do przyjaciela, poczytaj książkę. Pokusa zazwyczaj mija po 10–15 minutach. 3) Gotówkowa dyscyplina — wychodź z portfelem tylko z tymi pieniędzmi, które możesz wydać. Reszta zostaje w domu. 4) Kartka celu — noś przy sobie przypomnienie o swoim celu.",
      example:
        "Ania widzi w sklepie zestaw do malowania za 35 zł. Strategie: Reguła 48h — wróci do tego za 2 dni (przez 2 dni myśli o celu, nie o zestawie). Aktywność zastępcza — idzie na basen z koleżanką. Kartka celu — wyciąga z portfela: 'Gitara, 12 tygodni, masz to!' Po 2 dniach Ania już nie chce zestawu tak bardzo.",
      challenge:
        "Wybierz 2 strategie z tej lekcji, które wydają ci się najskuteczniejsze. Dla każdej napisz: kiedy byś jej użył i jak dokładnie by wyglądała w twoim życiu.",
      summary:
        "Pokusy zawsze będą — klucz to mieć gotowe strategie czekania: 48h, aktywność zastępcza, gotówkowa dyscyplina, kartka celu.",
      tags: ["strategie", "pokusa", "czekanie", "dyscyplina"],
    },
  ],
  quiz: {
    id: "dg1-quiz",
    skillId: "delayed-gratification-1",
    version: "1.0",
    title: "Quiz: Poczekaj i wygraj więcej",
    questions: [
      {
        id: "dg1-q1",
        difficulty: "EASY",
        question: "Co to znaczy 'odroczyć nagrodę'?",
        options: [
          "Zapomnieć o nagrodzie na zawsze",
          "Zrezygnować z małej nagrody teraz, żeby zyskać większą później",
          "Pożyczyć nagrodę od przyjaciela",
          "Nagradzać siebie jak najczęściej",
        ],
        correctIndex: 1,
        explanation:
          "Odroczenie nagrody to zamiana małej przyjemności teraz na większą korzyść w przyszłości. To podstawa mądrego zarządzania pieniędzmi.",
      },
      {
        id: "dg1-q2",
        difficulty: "MEDIUM",
        question: "Co udowodnił eksperyment marshmallow?",
        options: [
          "Dzieci, które zjadły piankę od razu, były mądrzejsze",
          "Pianki marshmallow są bardzo smaczne",
          "Umiejętność czekania wiąże się z lepszymi wynikami w życiu",
          "Eksperyment nie udowodnił niczego ważnego",
        ],
        correctIndex: 2,
        explanation:
          "Eksperyment Mischela pokazał, że dzieci umiejące czekać na drugą piankę, w późniejszym życiu zazwyczaj lepiej radziły sobie w szkole i osiągały cele. Czekanie to umiejętność, którą można ćwiczyć.",
      },
      {
        id: "dg1-q3",
        difficulty: "MEDIUM",
        question: "Na czym polega 'reguła 48 godzin' jako strategia oszczędzania?",
        options: [
          "Przez 48 godzin nie wydawaj żadnych pieniędzy",
          "Przed nieplanowanym zakupem poczekaj 2 dni — jeśli nadal chcesz, wróć do tematu",
          "Odkładaj pieniądze co 48 godzin",
          "Otwieraj skarbonkę tylko raz na 48 godzin",
        ],
        correctIndex: 1,
        explanation:
          "Reguła 48h daje czas na przemyślenie impulsywnego zakupu. Często po 2 dniach ochota mija — bo to była chwilowa pokusa, a nie prawdziwa potrzeba.",
      },
      {
        id: "dg1-q4",
        difficulty: "HARD",
        question: "Masz 50 zł zaoszczędzone (cel: 80 zł). Widzisz w sklepie gadżet za 50 zł. Kupujesz i od zera zaczynasz oszczędzać 10 zł/tydzień. Albo czekasz — i osiągasz cel za kolejne 3 tygodnie. Ile tygodni tracisz kupując gadżet?",
        options: [
          "3 tygodnie (czas do celu przy czekaniu)",
          "8 tygodni (50 zł ÷ 10 zł/tydzień, żeby wrócić do 50 zł)",
          "5 tygodni",
          "11 tygodni",
        ],
        correctIndex: 3,
        explanation:
          "Przy czekaniu: cel za 3 tygodnie (brakuje 30 zł, 10 zł/tydzień). Przy kupieniu gadżetu: wracasz do 0 zł, potem 80 zł ÷ 10 = 8 tygodni. Razem: 8 tygodni zamiast 3 tygodni = tracisz 8−3 = 5 tygodni. Hmm, a tak naprawdę gadżet kosztował cię 5 dodatkowych tygodni czekania na prawdziwy cel.",
      },
      {
        id: "dg1-q5",
        difficulty: "HARD",
        question: "Która kombinacja strategii najlepiej pomoże Kasi przetrwać pokusę w centrum handlowym?",
        options: [
          "Wziąć całe oszczędności do portfela i liczyć na silną wolę",
          "Zostać w domu i nigdy nie wychodzić do sklepów",
          "Zabrać tylko gotówkę na zaplanowane zakupy, mieć kartkę z celem i plan aktywności zastępczej na 15 minut",
          "Poprosić mamę żeby płaciła za wszystko",
        ],
        correctIndex: 2,
        explanation:
          "Najskuteczniejsza kombinacja: gotówkowa dyscyplina (tylko planowane pieniądze), kartka z celem (przypomnienie) i plan na chwilę pokusy (aktywność zastępcza). To trzy warstwy ochrony przed impulsywnymi wydatkami.",
      },
    ],
  },
  missions: [
    {
      id: "dg1-m1",
      skillId: "delayed-gratification-1",
      version: "1.0",
      order: 1,
      difficulty: "QUICK",
      title: "Stwórz swoją latarnię",
      description: "Zrób fizyczne przypomnienie swojego celu finansowego.",
      realLifeTask:
        "Weź kartkę i stwórz swoją 'latarnię': narysuj cel, wytnij zdjęcie z gazety lub napisz opis w kilku zdaniach. Umieść ją w widocznym miejscu (na skarbonce, w portfelu, na drzwiach pokoju). Wieczorem zamknij oczy i przez 2–3 minuty wyobraź sobie moment osiągnięcia celu — jak wyglądasz, jak się czujesz, co masz w rękach.",
      estimatedMinutes: 15,
      successCriteria:
        "Masz fizyczną 'latarnię' w widocznym miejscu i przeprowadziłeś pierwszą wizualizację swojego celu.",
    },
    {
      id: "dg1-m2",
      skillId: "delayed-gratification-1",
      version: "1.0",
      order: 2,
      difficulty: "STANDARD",
      title: "Tydzień testowania strategii",
      description: "Przez tydzień świadomie stosuj strategie czekania za każdym razem gdy pojawi się pokusa.",
      realLifeTask:
        "Wybierz 2 strategie (reguła 48h, aktywność zastępcza, gotówkowa dyscyplina, kartka z celem). Przez 7 dni każdą pokusę finansową zapisuj w dzienniczku: co chciałem kupić, ile kosztuje, której strategii użyłem, co się stało po. Na koniec tygodnia policz: ile razy pojawiła się pokusa, ile razy wygrałem ze strategią, ile pieniędzy zostało w skarbonce dzięki strategiom.",
      estimatedMinutes: 20,
      successCriteria:
        "Masz dzienniczek pokus z co najmniej 3 wpisami i obliczone ile pieniędzy uratowałeś stosując strategie.",
      parentTip:
        "Rozmawiajcie o pokusach bez oceniania — ważne jest samo ćwiczenie, a nie perfekcyjny wynik. Każda zastosowana strategia to sukces.",
    },
    {
      id: "dg1-m3",
      skillId: "delayed-gratification-1",
      version: "1.0",
      order: 3,
      difficulty: "CHALLENGE",
      title: "30-dniowe wyzwanie odroczenia",
      description: "Przez miesiąc stosuj odroczenie nagrody i śledź wyniki.",
      realLifeTask:
        "Przez 30 dni: zapisuj każdą pokusę finansową (zakup, który chciałeś zrobić poza planem), zastosuj regułę 48h dla każdej, zanotuj co się stało — czy po 48h nadal chciałeś to kupić. Na koniec miesiąca: policz ile pokus było, ile minęło po 48h bez zakupu, ile pieniędzy zaoszczędziłeś dzięki czekaniu, jak zmieniło się twoje myślenie o pieniądzach. Napisz 5 zdań podsumowania.",
      estimatedMinutes: 60,
      successCriteria:
        "Masz 30-dniowy dziennik pokus z zastosowaną regułą 48h i pisemne podsumowanie zmiany myślenia.",
      parentTip:
        "Pod koniec miesiąca zapytaj: 'Czego nauczyłeś się o sobie?' Zachęć do podzielenia się wnioskami z rodziną — to buduje świadomość finansową.",
    },
  ],
}

// ─────────────────────────────────────────────────────────────
// delayed-gratification-2 — Efekt kuli śnieżnej
// ─────────────────────────────────────────────────────────────

export const delayedGratification2: SkillContent = {
  skillId: "delayed-gratification-2",
  lessons: [
    {
      id: "dg2-l1",
      skillId: "delayed-gratification-2",
      version: "1.0",
      order: 1,
      title: "Małe kwoty × czas = zaskakujące sumy",
      learningObjective: "Rozumiesz, że regularne małe oszczędności kumulują się w duże sumy przez czas",
      estimatedMinutes: 10,
      introStory:
        "Kuba i Ola postanowili sprawdzić ile można uzbierać przez rok odkładając tylko 10 zł tygodniowo. 'To nic,' powiedział Kuba. 'To dwie kanapki.' Wzięli kalkulator: 10 zł × 52 tygodnie = 520 zł. Kuba był zaskoczony. 'Tylko 10 zł tygodniowo i po roku mam 520 zł?!' Ola kiwnęła głową: 'A gdybyś odkładał 5 zł tygodniowo przez 4 lata, miałbyś ponad tysiąc złotych.' Kuba zapatrzył się w sufit. 'To jak ta kula śniegu ze stoku. Mała na górze, wielka na dole.'",
      explanation:
        "Efekt kuli śnieżnej w oszczędzaniu to zjawisko, w którym małe, regularne oszczędności narastają z czasem jak kula śniegu toczącą się ze stoku. Matematyka jest prosta i zaskakująca: 5 zł/tydzień × 52 tygodnie = 260 zł rocznie. 10 zł/tydzień × 52 tygodnie = 520 zł rocznie. 20 zł/tydzień × 52 tygodnie = 1040 zł rocznie. Klucz: nie wielkość kwoty, ale regularność i czas. Każdy tydzień, gdy odkładasz — kula rośnie.",
      example:
        "Kacper zaczął odkładać 10 zł tygodniowo w pierwszej klasie podstawówki (7 lat). Teraz ma 13 lat — to 6 lat = 6 × 52 × 10 = 3120 zł! Gdyby codziennie kupował za to słodycze po 10 zł, nie miałby nic. Zamiast tego ma 3120 zł.",
      challenge:
        "Oblicz: ile miałbyś dziś, gdybyś od urodzin oszczędzał 5 zł tygodniowo? (twój wiek w latach × 52 × 5). Czy ta liczba cię zaskoczyła?",
      summary:
        "Czas jest twoim sprzymierzeńcem — im wcześniej zaczniesz odkładać nawet małe kwoty, tym większa kula śniegu na końcu stoku.",
      tags: ["kula śniegu", "czas", "kumulacja", "małe kwoty"],
    },
    {
      id: "dg2-l2",
      skillId: "delayed-gratification-2",
      version: "1.0",
      order: 2,
      title: "Liczby, które zaskakują — przykłady z życia",
      learningObjective: "Potrafisz obliczyć roczną sumę oszczędności z różnych regularnych kwot i porównać opcje",
      estimatedMinutes: 12,
      introStory:
        "Nauczycielka matematyki pani Wiśniewska pokazała klasie tablicę z liczbami. 'Codzienna butelka wody z automatu — 3 zł. Ile to rocznie?' Klasa liczyła: 3 × 365 = 1095 zł. 'Słuchacie?! Ponad tysiąc złotych na wodę z automatu!' Sala zamilkła. 'A codzienne słodycze po 5 zł to ponad 1800 zł rocznie.' Nikt się już nie śmiał z 'małych' wydatków. I nikt się już nie śmiał z 'małych' oszczędności.",
      explanation:
        "Małe kwoty przeliczone na rok wyglądają zupełnie inaczej. Oto kilka przykładów: 10 zł/tydzień przez rok = 520 zł, 15 zł/tydzień przez rok = 780 zł, 25 zł/tydzień przez rok = 1300 zł. Ale też działa w drugą stronę — każda mała wydana kwota to potencjalne oszczędności: 3 zł dziennie na napoje = 1095 zł rocznie. Porównanie pomaga podjąć mądrzejszą decyzję: 'Czy ta codzienne cappuccino warte jest 1000 zł rocznie?' (Dla dorosłych!) Dla ciebie: 'Czy codzienne chipsiki warte są prawie 700 zł rocznie?'",
      example:
        "Bartek i Zosia mają po 15 zł tygodniowo. Bartek wydaje wszystko. Zosia odkłada 10 zł, wydaje 5 zł. Po roku: Bartek = 0 zł. Zosia = 520 zł + przeżyła fajny rok za 5 zł tygodniowo na rozrywki. Po 2 latach: Zosia = 1040 zł. Bartek: 0 zł i pyta: 'Skąd masz tyle pieniędzy?' 'Z cierpliwości,' odpowiada Zosia.",
      challenge:
        "Wybierz 3 kwoty, które regularnie wydajesz (np. codzienne soki, tygodniowe słodycze, filmiki za drobną opłatą). Oblicz: ile to kosztuje rocznie. Teraz wyobraź sobie: ile miałbyś gdybyś jedną z tych rzeczy zamienił na oszczędności?",
      summary:
        "Każda złotówka wydana regularnie to inna złotówka zaoszczędzona regularnie — w skali roku małe kwoty stają się wielkimi sumami.",
      tags: ["obliczenia", "rocznie", "porównanie", "nawyki"],
    },
    {
      id: "dg2-l3",
      skillId: "delayed-gratification-2",
      version: "1.0",
      order: 3,
      title: "Wizualizacja wzrostu — jak rysuje się kula śnieżna",
      learningObjective: "Potrafisz narysować wykres wzrostu oszczędności i wyjaśnić co on pokazuje",
      estimatedMinutes: 11,
      introStory:
        "Dziadek Tomka pokazał mu stary zeszyt. 'Prowadziłem zapiski od 15. roku życia.' Tomek otworzył. Na każdej stronie był prosty wykres — linia pnąca się coraz wyżej. 'To moje oszczędności przez lata. Patrz na rok 16. — mała suma. Rok 20. — trochę więcej. Rok 25. — zaczęło rosnąć szybciej.' Tomek spoglądał na linię wykresu. Powoli wspinała się do góry. 'Kula śniegu,' powiedział. Dziadek uśmiechnął się: 'Dokładnie tak.'",
      explanation:
        "Wykres wzrostu oszczędności to linia, która pnie się ku górze — im dłużej oszczędzasz, tym wyraźniej widać postęp. Oś pozioma to czas (tygodnie, miesiące, lata). Oś pionowa to suma zaoszczędzonych pieniędzy. Przy regularnym odkładaniu tej samej kwoty — wykres to linia prosta (10 zł/tydzień × 10 tygodni = 100 zł, prosto). Ale każdy dodatkowy tydzień i każda dodatkowa złotówka pcha linię wyżej. Narysowanie wykresu sprawia, że widzisz postęp — to bardzo motywujące, szczególnie gdy linia rośnie.",
      example:
        "Hania odkłada 10 zł tygodniowo. Jej wykres: tydzień 1 = 10 zł, tydzień 4 = 40 zł, tydzień 8 = 80 zł, tydzień 13 = 130 zł, tydzień 26 = 260 zł, tydzień 52 = 520 zł. Narysowana linia — prosta, ale coraz wyższa. Hania może też zobaczyć: 'W 26 tygodniu mam połowę rocznego celu.' To magiczne widzieć jak linia rośnie.",
      challenge:
        "Narysuj wykres swojego planu oszczędzania na 12 tygodni. Oś X: tygodnie (1–12). Oś Y: złotówki. Dla każdego tygodnia zaznacz punkt (tygodniowa kwota × numer tygodnia). Połącz punkty linią. Co widzisz? Jak wysoko dochodzi linia po 12 tygodniach?",
      summary:
        "Wykres oszczędności to wizualna kula śniegu — każdy tydzień linia idzie wyżej, a ty widzisz jak twój wysiłek zamienia się w rosnącą sumę.",
      tags: ["wykres", "wizualizacja", "wzrost", "linia"],
    },
  ],
  quiz: {
    id: "dg2-quiz",
    skillId: "delayed-gratification-2",
    version: "1.0",
    title: "Quiz: Efekt kuli śnieżnej",
    questions: [
      {
        id: "dg2-q1",
        difficulty: "EASY",
        question: "Ile zbierzesz w ciągu roku odkładając 10 zł tygodniowo?",
        options: ["120 zł", "260 zł", "520 zł", "1040 zł"],
        correctIndex: 2,
        explanation:
          "10 zł × 52 tygodnie = 520 zł. Rok ma 52 tygodnie. Regularne 10 zł tygodniowo daje ponad pół tysiąca złotych rocznie!",
      },
      {
        id: "dg2-q2",
        difficulty: "MEDIUM",
        question: "Kasia odkłada 15 zł tygodniowo przez 2 lata. Ile zbierze?",
        options: ["780 zł", "1560 zł", "1040 zł", "390 zł"],
        correctIndex: 1,
        explanation:
          "15 zł × 52 tygodnie = 780 zł rocznie. Przez 2 lata: 780 × 2 = 1560 zł. Dwa lata regularnego odkładania 15 zł tygodniowo to prawie 1,5 tysiąca złotych.",
      },
      {
        id: "dg2-q3",
        difficulty: "MEDIUM",
        question: "Na czym polega 'efekt kuli śnieżnej' w oszczędzaniu?",
        options: [
          "Oszczędności topią się jak śnieg — trzeba je szybko wydać",
          "Małe, regularne oszczędności narastają z czasem w coraz większe sumy",
          "Oszczędzanie jest możliwe tylko zimą",
          "Im więcej wydajesz, tym więcej masz",
        ],
        correctIndex: 1,
        explanation:
          "Efekt kuli śnieżnej: małe kwoty odkładane regularnie narastają z czasem — jak kula śniegu tocząca się ze stoku. Im dłużej toczy się kula, tym jest większa.",
      },
      {
        id: "dg2-q4",
        difficulty: "HARD",
        question: "Bartek wydaje codziennie 4 zł na napoje w szkole. Ile to rocznie? Ile miałby po 3 latach, gdyby zamiast tego odkładał tę kwotę tygodniowo (5 dni szkolnych = 20 zł/tydzień)?",
        options: [
          "1460 zł rocznie; po 3 latach: 3120 zł",
          "1460 zł rocznie; po 3 latach: 4380 zł",
          "1040 zł rocznie; po 3 latach: 3120 zł",
          "730 zł rocznie; po 3 latach: 2190 zł",
        ],
        correctIndex: 0,
        explanation:
          "Codziennie 4 zł × 365 = 1460 zł rocznie. Tygodniowo (5 dni): 4 × 5 = 20 zł/tydzień × 52 = 1040 zł. Przez 3 lata: 1040 × 3 = 3120 zł. Opcja A jest poprawna pod warunkiem że liczymy 365 dni. Przez 3 lata oszczędzałby 3120 zł zamiast 0 zł.",
      },
      {
        id: "dg2-q5",
        difficulty: "HARD",
        question: "Ola zaczęła odkładać 8 zł/tydzień w wieku 10 lat. Jej siostra Marta zaczęła odkładać 12 zł/tydzień w wieku 12 lat. Ile będzie miała każda z nich w wieku 14 lat (zakładając odkładanie bez przerwy)?",
        options: [
          "Ola: 1664 zł, Marta: 1248 zł — Ola ma więcej mimo mniejszej kwoty",
          "Ola: 1248 zł, Marta: 1664 zł — Marta ma więcej bo odkłada więcej",
          "Obie mają po 1456 zł",
          "Ola: 832 zł, Marta: 1248 zł",
        ],
        correctIndex: 0,
        explanation:
          "Ola: od 10 do 14 lat = 4 lata = 4 × 52 × 8 = 1664 zł. Marta: od 12 do 14 lat = 2 lata = 2 × 52 × 12 = 1248 zł. Ola ma WIĘCEJ mimo mniejszej kwoty — bo zaczęła 2 lata wcześniej! Czas jest ważniejszy niż kwota.",
      },
    ],
  },
  missions: [
    {
      id: "dg2-m1",
      skillId: "delayed-gratification-2",
      version: "1.0",
      order: 1,
      difficulty: "QUICK",
      title: "Kalkulator kuli śnieżnej",
      description: "Oblicz ile możesz uzbierać przez rok regularnych oszczędności.",
      realLifeTask:
        "Zdecyduj: ile chcesz odkładać tygodniowo (np. 5 zł, 10 zł, 15 zł)? Oblicz: ile to rocznie (kwota × 52). Oblicz: ile to w 2 latach, 3 latach, 5 latach. Zapisz wyniki w tabeli: rok | suma. Który wynik najbardziej cię zaskoczył? Napisz jedno zdanie: 'Za ___ lat miałbym ___ zł, gdybym odkładał ___ zł tygodniowo.'",
      estimatedMinutes: 10,
      successCriteria:
        "Masz tabelę z obliczeniami na 1, 2, 3 i 5 lat oraz zdanie z twoim największym zaskoczeniem.",
    },
    {
      id: "dg2-m2",
      skillId: "delayed-gratification-2",
      version: "1.0",
      order: 2,
      difficulty: "STANDARD",
      title: "Narysuj swoją kulę śnieżną",
      description: "Stwórz wykres wzrostu swoich oszczędności na 12 tygodni.",
      realLifeTask:
        "Weź kartkę w kratkę lub zeszyt. Narysuj wykres: oś X (pozioma) = tygodnie 1–12, oś Y (pionowa) = złotówki (od 0 do sumy po 12 tygodniach). Zaznacz punkt dla każdego tygodnia (tydzień × twoja tygodniowa kwota). Połącz punkty linią. Powieś wykres przy swojej skarbonce. Przez 12 tygodni zaznaczaj rzeczywiste wpłaty (innym kolorem niż plan).",
      estimatedMinutes: 25,
      successCriteria:
        "Masz narysowany wykres planu na 12 tygodni wiszący przy skarbonce. Przez 12 tygodni uzupełniasz rzeczywiste oszczędności.",
      parentTip:
        "Co tydzień zaglądajcie razem na wykres. Zapytaj: 'Jak wysoko doszła twoja linia? Ile brakuje do celu?' Widzenie postępu jest super motywujące.",
    },
    {
      id: "dg2-m3",
      skillId: "delayed-gratification-2",
      version: "1.0",
      order: 3,
      difficulty: "CHALLENGE",
      title: "Znajdź swoją kulę śniegu — odkryj ukryte oszczędności",
      description: "Przeanalizuj swoje codzienne wydatki i znajdź kwotę, którą możesz zamienić na oszczędności.",
      realLifeTask:
        "Przez 2 tygodnie śledź wszystkie wydatki. Po 2 tygodniach: zsumuj każdą kategorię, znajdź kategorię gdzie wydajesz 'bez myślenia' (np. codzienne napoje, impulsy w sklepiku), oblicz ile to kosztuje tygodniowo i rocznie, zdecyduj: czy chcesz zmniejszyć tę kategorię o połowę? Ile byś uzbierał rocznie z tej zmiany? Napisz plan: 'Zmniejszam ___ o ___ zł tygodniowo. To da mi ___ zł rocznie. Za 2 lata miałbym ___ zł.' Zacznij realizować ten plan przez 4 tygodnie i sprawdź czy przeliczenia się zgadzają.",
      estimatedMinutes: 55,
      successCriteria:
        "Masz 2 tygodnie zapisów, obliczoną 'ukrytą kulę śniegu' i realizujesz plan przez 4 tygodnie z wynikami.",
      parentTip:
        "Omówcie razem odkrytą 'ukrytą kulę śniegu' — bez oceniania wyborów dziecka. Zapytaj: 'Co byś kupił za te pieniądze gdybyś je odłożył przez rok?' To buduje finansowe myślenie długoterminowe.",
    },
  ],
}
