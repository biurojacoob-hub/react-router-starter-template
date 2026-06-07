import type { SkillContent } from "../../types"

// ─────────────────────────────────────────────────────────────
// money-awareness-1 — Czym są pieniądze?
// ─────────────────────────────────────────────────────────────

export const moneyAwareness1: SkillContent = {
  skillId: "money-awareness-1",
  lessons: [
    {
      id: "ma1-l1",
      skillId: "money-awareness-1",
      version: "1.0",
      order: 1,
      title: "Historia pieniędzy — od muszli do karty",
      learningObjective: "Rozumiesz, dlaczego ludzie zaczęli używać pieniędzy",
      estimatedMinutes: 8,
      introStory:
        "Dawno, dawno temu Ola chciała dostać chleb od piekarza, ale nie miała pieniędzy. Miała tylko kury. Piekarz nie chciał kury — on potrzebował butów! A szewc chciał mleka, a nie kur... Wszyscy kręcili się w kółko i nikt nie mógł nic kupić. Wtedy ktoś wpadł na pomysł: a gdyby wymyślić coś, co wszyscy zaakceptują?",
      explanation:
        "Pieniądze to wynalazek, który rozwiązał problem wymiany. Zamiast szukać kogoś, kto chce dokładnie to, co ty masz, możesz dostać pieniądze i kupić co chcesz od kogokolwiek. Pieniądze to umowa — wszyscy zgadzamy się, że mają wartość. Dawniej były to muszelki, sól, a nawet owce. Dziś są to monety, banknoty i cyfry w telefonie.",
      example:
        "Ty dostajesz 10 zł kieszonkowego. Możesz pójść do sklepu i kupić lody, książkę albo naklejki — bo wszyscy sprzedawcy wiedzą, że 10 zł ma wartość. Bez pieniędzy musiałbyś zapłacić... czym? Rysunkami?",
      challenge:
        "Wyobraź sobie, że pieniędzy nie ma. Masz w domu 3 rzeczy — co byś zaproponował zamiast pieniędzy, żeby dostać swój ulubiony deser?",
      summary:
        "Pieniądze to umowa między ludźmi — wszyscy zgadzają się, że kawałek metalu lub papier ma określoną wartość, dzięki czemu możemy wymieniać rzeczy i usługi.",
      tags: ["historia", "pieniądze", "wymiana", "wartość"],
    },
    {
      id: "ma1-l2",
      skillId: "money-awareness-1",
      version: "1.0",
      order: 2,
      title: "Pieniądze — do czego służą?",
      learningObjective: "Potrafisz wymienić 3 główne funkcje pieniędzy",
      estimatedMinutes: 7,
      introStory:
        "Kacper dostał 20 zł od babci na urodziny. Najpierw kupił lody (wydał), potem schował 5 zł do skarbonki (oszczędził), a na koniec zapłacił koleżance za pożyczoną grę (oddał dług). W ciągu jednego dnia pieniądze spełniły dla niego 3 różne zadania!",
      explanation:
        "Pieniądze mają trzy główne funkcje: po pierwsze — środek wymiany (płacisz nimi za rzeczy), po drugie — miernik wartości (wiesz, że lody kosztują 5 zł, a rower 500 zł), po trzecie — sposób na przechowywanie wartości (możesz odłożyć pieniądze na jutro, za tydzień, za rok).",
      example:
        "Kiedy widzisz w sklepie, że jabłko kosztuje 2 zł, a czekolada 4 zł — wiesz, że czekolada jest dwa razy droższa. To pieniądze pełnią rolę miernika. Gdyby nie pieniądze, jak porównałbyś wartość jabłka z wartością czekolady?",
      challenge:
        "Popatrz na 3 rzeczy w swoim pokoju. Spróbuj ocenić, która jest najdroższa, a która najtańsza. Skąd to wiesz? Co ci w tym pomaga?",
      summary:
        "Pieniądze służą do kupowania, mierzenia wartości rzeczy i odkładania ich na później — to czyni je jednym z najważniejszych wynalazków w historii.",
      tags: ["funkcje", "wymiana", "wartość", "oszczędzanie"],
    },
    {
      id: "ma1-l3",
      skillId: "money-awareness-1",
      version: "1.0",
      order: 3,
      title: "Skąd się bierze wartość pieniędzy?",
      learningObjective: "Rozumiesz, że wartość pieniędzy opiera się na zaufaniu",
      estimatedMinutes: 8,
      introStory:
        "Zosia pytała tatę: 'Dlaczego ten kawałek papieru jest wart 100 złotych? To tylko papier!' Tata wziął kartkę z bloku i powiedział: 'Chodź, pójdziemy do sklepu i zapłacimy tym.' Oczywiście sprzedawca odmówił. 'Widzisz?' powiedział tata. 'Banknot jest wart 100 zł, bo wszyscy w to wierzymy. Ta kartka — nie.'",
      explanation:
        "Pieniądze mają wartość, bo wszyscy się na to zgadzamy — to zaufanie całego społeczeństwa. Kiedyś banknoty były powiązane ze złotem (można było wymienić na złoto), dziś ich wartość gwarantuje państwo. Dlatego banknoty mają specjalne zabezpieczenia — hologramy, wodoznaki — żeby nikt nie mógł ich podrobić.",
      example:
        "Banknot 50 zł to kawałek bawełnianego papieru z nadrukiem, który kosztuje kilkadziesiąt groszy w produkcji. Ale wszyscy wierzymy, że jest wart 50 zł — i to czyni go wartościowym. Gdyby jutro rząd powiedział 'te banknoty już nic nie są warte', straciłyby całą wartość.",
      challenge:
        "Obejrzyj z rodzicem banknot. Ile zabezpieczeń możesz znaleźć? Poszukaj wodoznaku, hologramu, nitki zabezpieczającej. To wszystko chroni 'zaufanie' do pieniędzy.",
      summary:
        "Wartość pieniędzy opiera się na zaufaniu — wszyscy wierzymy, że mają wartość, i właśnie dlatego ją mają.",
      tags: ["wartość", "zaufanie", "banknot", "zabezpieczenia"],
    },
  ],
  quiz: {
    id: "ma1-quiz",
    skillId: "money-awareness-1",
    version: "1.0",
    title: "Quiz: Czym są pieniądze?",
    questions: [
      {
        id: "ma1-q1",
        difficulty: "EASY",
        question: "Dlaczego ludzie wymyślili pieniądze?",
        options: [
          "Bo lubią zbierać monety",
          "Bo bezpośrednia wymiana rzeczy była skomplikowana",
          "Bo banki im kazały",
          "Bo królowie chcieli być bogaci",
        ],
        correctIndex: 1,
        explanation:
          "Pieniądze rozwiązały problem wymiany — zamiast szukać kogoś, kto chce dokładnie to, co masz, możesz użyć pieniędzy jako pośrednika.",
      },
      {
        id: "ma1-q2",
        difficulty: "MEDIUM",
        question: "Które z poniższych NIE jest funkcją pieniędzy?",
        options: [
          "Środek wymiany",
          "Miernik wartości",
          "Sposób na zdobycie przyjaciół",
          "Sposób przechowywania wartości",
        ],
        correctIndex: 2,
        explanation:
          "Pieniądze mają 3 funkcje: środek wymiany, miernik wartości i przechowywanie wartości. Zdobywanie przyjaciół to nie jest funkcja pieniędzy!",
      },
      {
        id: "ma1-q3",
        difficulty: "MEDIUM",
        question: "Dlaczego banknot 50 zł jest wart 50 zł?",
        options: [
          "Bo jest zrobiony z drogiego materiału",
          "Bo tyle kosztuje jego produkcja",
          "Bo wszyscy zgadzają się, że ma taką wartość",
          "Bo bank tak powiedział i nie można tego zmienić",
        ],
        correctIndex: 2,
        explanation:
          "Wartość pieniędzy opiera się na zaufaniu i umowie społecznej — wszyscy wierzymy, że mają określoną wartość.",
      },
      {
        id: "ma1-q4",
        difficulty: "HARD",
        question: "Co to był 'system barterowy'?",
        options: [
          "Płacenie kartą kredytową",
          "Bezpośrednia wymiana towarów bez użycia pieniędzy",
          "Pożyczanie pieniędzy od banku",
          "Zbieranie monet ze wszystkich krajów",
        ],
        correctIndex: 1,
        explanation:
          "Barter to wymiana towarów bez pieniędzy — np. dajesz kury, dostajesz chleb. Problem: obie strony musiały chcieć dokładnie to, co ma druga.",
      },
      {
        id: "ma1-q5",
        difficulty: "HARD",
        question: "Co by się stało, gdyby wszyscy nagle przestali wierzyć, że pieniądze mają wartość?",
        options: [
          "Nic — pieniądze zawsze mają wartość",
          "Pieniądze straciłyby wartość, bo opiera się ona na zaufaniu",
          "Banki by nam zapłaciły odszkodowanie",
          "Rząd by wydał nowe pieniądze i problem rozwiązany",
        ],
        correctIndex: 1,
        explanation:
          "Pieniądze mają wartość tylko dlatego, że wszyscy w to wierzymy. Bez zaufania stają się zwykłymi kawałkami papieru lub metalu.",
      },
    ],
  },
  missions: [
    {
      id: "ma1-m1",
      skillId: "money-awareness-1",
      version: "1.0",
      order: 1,
      difficulty: "QUICK",
      title: "Szukanie pieniędzy w domu",
      description: "Odkryj, ile różnych form pieniędzy masz w swoim domu.",
      realLifeTask:
        "Poszukaj w domu wszystkich rodzajów pieniędzy: monety, banknoty, karta płatnicza rodziców, może telefon z płatnościami. Policz ile różnych form znajdziesz.",
      estimatedMinutes: 10,
      successCriteria:
        "Znalazłeś co najmniej 3 różne formy pieniędzy i wiesz do czego każda służy.",
      parentTip:
        "Pokaż dziecku kartę płatniczą, BLIK lub telefon z płatnością — to też są pieniądze, tylko w innej formie.",
    },
    {
      id: "ma1-m2",
      skillId: "money-awareness-1",
      version: "1.0",
      order: 2,
      difficulty: "STANDARD",
      title: "Wywiad z rodzicem — skąd biorą się nasze pieniądze?",
      description: "Dowiedz się, jak Twoja rodzina zdobywa pieniądze.",
      realLifeTask:
        "Zadaj rodzicom 3 pytania: 1) Jak zarabiasz pieniądze? 2) Kiedy pierwszy raz zarobiłeś własne pieniądze? 3) Co kupiłeś za pierwsze zarobione pieniądze? Zapisz odpowiedzi.",
      estimatedMinutes: 15,
      successCriteria: "Przeprowadziłeś wywiad i znasz historię pierwszych pieniędzy rodzica.",
      parentTip:
        "To świetna okazja, żeby opowiedzieć o swojej pierwszej pracy lub pierwszym zarobionym pieniądzu — dzieci uwielbiają takie historie.",
    },
    {
      id: "ma1-m3",
      skillId: "money-awareness-1",
      version: "1.0",
      order: 3,
      difficulty: "CHALLENGE",
      title: "Zrób własne 'pieniądze' i graj w sklep",
      description: "Zrozum, jak działa wymiana, tworząc własną walutę.",
      realLifeTask:
        "Narysuj własne 'monety' lub 'banknoty' (5–10 sztuk). Nadaj im wartości (1, 2, 5). Zagraj z rodzeństwem lub rodzicem w sklep — sprzedawaj zabawki i przedmioty za swoje pieniądze. Co jest trudne? Co łatwe?",
      estimatedMinutes: 25,
      successCriteria:
        "Przeprowadziłeś co najmniej 5 transakcji i rozumiesz, dlaczego pieniądze ułatwiają wymianę.",
      parentTip:
        "Celowo utrudnij wymianę bez pieniędzy ('zapłać mi... hmm, co chcę?') — dziecko samo odkryje, dlaczego pieniądze są wygodne.",
    },
  ],
}

// ─────────────────────────────────────────────────────────────
// money-awareness-2 — Monety i banknoty
// ─────────────────────────────────────────────────────────────

export const moneyAwareness2: SkillContent = {
  skillId: "money-awareness-2",
  lessons: [
    {
      id: "ma2-l1",
      skillId: "money-awareness-2",
      version: "1.0",
      order: 1,
      title: "Monety — rodziny i wartości",
      learningObjective: "Rozpoznajesz wszystkie monety złotówkowe i wiesz ile są warte",
      estimatedMinutes: 8,
      introStory:
        "Franek wysypał wszystkie monety ze skarbonki na stół. Było ich mnóstwo — małe, duże, grube, cienkie. Mama powiedziała: 'Posortuj je od najmniejszej do największej wartości.' Franek zaczął, ale potem stanął — czy 50 groszy to więcej niż 1 zł? I ile groszy ma jedna złotówka?",
      explanation:
        "W Polsce używamy złotych i groszy. 100 groszy = 1 złoty. Monety: 1 gr, 2 gr, 5 gr, 10 gr, 20 gr, 50 gr, 1 zł, 2 zł, 5 zł. Każda moneta ma dwie strony — orzeł (reszka) i wartość (orzeł/reszka to gra słów — w Polsce awers to monogram NBP lub godło, rewers to nominał). Monety są z różnych metali — im grubsza i cięższa, tym zwykle wyższa wartość.",
      example:
        "Masz 3 monety: 50 gr, 1 zł i 2 zł. Razem mają wartość 3,50 zł. Za to możesz kupić np. bułkę (2,50 zł) i żelatynki (1 zł) — prawie dokładnie tyle!",
      challenge:
        "Weź garść monet i bez patrzenia posortuj je tylko dotykiem od najmniejszej do największej. Monety się różnią grubością i wielkością — czy uda ci się to zrobić?",
      summary:
        "Znasz wszystkie polskie monety i wiesz, że 100 groszy = 1 złoty. Umiasz liczyć wartość kilku monet razem.",
      tags: ["monety", "grosze", "złote", "wartość"],
    },
    {
      id: "ma2-l2",
      skillId: "money-awareness-2",
      version: "1.0",
      order: 2,
      title: "Banknoty — od 10 do 500 złotych",
      learningObjective: "Rozpoznajesz wszystkie polskie banknoty i nie mylisz ich wartości",
      estimatedMinutes: 8,
      introStory:
        "Asia dostała od dziadka kopertę z urodzinami. Środku były banknoty — ale nie umiała ich rozróżnić. Jeden był zielony, drugi brązowy, trzeci fioletowy... Każdy miał inną liczbę. 'Który jest największy?' zapytała. Tata wyjął banknoty i powiedział: 'Kolory to nie przypadek — nanieśmy to na mapę!'",
      explanation:
        "Polskie banknoty: 10 zł (fioletowy), 20 zł (czerwony), 50 zł (niebieskozielony), 100 zł (zielony), 200 zł (pomarańczowy), 500 zł (granatowy). Na każdym banknocie jest postać historyczna — np. na 100 zł Władysław II Jagiełło. Im wyższa wartość, tym większy banknot i bardziej skomplikowane zabezpieczenia.",
      example:
        "Bilety do kina kosztują 2 × 25 zł = 50 zł. Potrzebujesz jednego banknotu 50 zł lub dwóch banknotów 20 zł i jednej dziesiątki. Kasa wyda ci resztę, jeśli dasz więcej.",
      challenge:
        "Poproś rodzica o pokazanie wszystkich banknotów, jakie ma w portfelu. Ułóż je od najniższej do najwyższej wartości. Ile łącznie mają wartości?",
      summary:
        "Rozpoznajesz polskie banknoty po kolorach i wartościach. Wiesz, że razem monety i banknoty tworzą cały system gotówkowy.",
      tags: ["banknoty", "złote", "kolory", "wartość"],
    },
    {
      id: "ma2-l3",
      skillId: "money-awareness-2",
      version: "1.0",
      order: 3,
      title: "Wydawanie i reszta — jak liczyć płacenie",
      learningObjective: "Potrafisz obliczyć resztę przy płaceniu gotówką",
      estimatedMinutes: 9,
      introStory:
        "Piotrek szedł do sklepu po lody za 4,50 zł. Miał tylko banknot 10 zł. 'Ile dostanę reszty?' zastanowił się. Pani w sklepie dała mu 5,50 zł. 'Czy to dobrze?' pomyślał Piotrek. Nie sprawdził, bo się wstydził. A pani mogła się pomylić...",
      explanation:
        "Reszta = pieniądze, które płacisz − cena. Jeśli lody kosztują 4,50 zł i dajesz 10 zł, reszta to 10 − 4,50 = 5,50 zł. Zawsze warto sprawdzić resztę — kasjerzy też się mylą! Możesz liczyć: ile brakuje do okrągłej liczby? 4,50 → 5 zł (50 gr) → 10 zł (5 zł). Razem: 5,50 zł reszty.",
      example:
        "Zakupy: chleb 4 zł, mleko 3,20 zł, jabłko 1,80 zł. Razem: 9 zł. Dajesz 20 zł. Reszta: 20 − 9 = 11 zł. Kasjer daje ci banknot 10 zł i monetę 1 zł. Zgadza się!",
      challenge:
        "Zagraj z rodzicem w 'sklep'. Rodzic mówi cenę (np. 7,30 zł), ty dajesz monety/banknoty i obliczasz resztę. Zróbcie 5 'zakupów'. Kto nigdy się nie pomyli?",
      summary:
        "Wiesz, jak liczyć resztę przy płaceniu gotówką i zawsze sprawdzasz, czy kasjer wydał ci właściwą kwotę.",
      tags: ["reszta", "płacenie", "gotówka", "liczenie"],
    },
  ],
  quiz: {
    id: "ma2-quiz",
    skillId: "money-awareness-2",
    version: "1.0",
    title: "Quiz: Monety i banknoty",
    questions: [
      {
        id: "ma2-q1",
        difficulty: "EASY",
        question: "Ile groszy ma jedna złotówka?",
        options: ["10", "50", "100", "1000"],
        correctIndex: 2,
        explanation: "1 złoty = 100 groszy. Tak jak 1 metr = 100 centymetrów.",
      },
      {
        id: "ma2-q2",
        difficulty: "MEDIUM",
        question: "Lody kosztują 6,50 zł. Płacisz banknotem 10 zł. Ile dostaniesz reszty?",
        options: ["3 zł", "3,50 zł", "4 zł", "4,50 zł"],
        correctIndex: 1,
        explanation: "10 zł − 6,50 zł = 3,50 zł. Zawsze sprawdzaj resztę!",
      },
      {
        id: "ma2-q3",
        difficulty: "MEDIUM",
        question: "Który zestaw monet daje razem 2 zł?",
        options: [
          "2 × 50 gr + 1 zł",
          "5 × 20 gr + 1 × 50 gr + 1 × 50 gr",
          "4 × 50 gr",
          "1 zł + 50 gr + 50 gr",
        ],
        correctIndex: 2,
        explanation: "4 × 50 gr = 200 gr = 2 zł. Pozostałe też dają 2 zł, ale opcja C to najłatwiejsza odpowiedź.",
      },
      {
        id: "ma2-q4",
        difficulty: "HARD",
        question: "Masz: 1 × 50 gr, 3 × 20 gr, 2 × 5 gr. Ile to razem?",
        options: ["1,10 zł", "1,20 zł", "1,60 zł", "2 zł"],
        correctIndex: 1,
        explanation: "50 gr + 60 gr + 10 gr = 120 gr = 1,20 zł.",
      },
      {
        id: "ma2-q5",
        difficulty: "HARD",
        question: "Zakupy kosztują 47,30 zł. Masz 50 zł. Jaką resztę dostaniesz?",
        options: ["2,30 zł", "2,70 zł", "3,30 zł", "3,70 zł"],
        correctIndex: 1,
        explanation: "50 − 47,30 = 2,70 zł.",
      },
    ],
  },
  missions: [
    {
      id: "ma2-m1",
      skillId: "money-awareness-2",
      version: "1.0",
      order: 1,
      difficulty: "QUICK",
      title: "Portret monet",
      description: "Poznaj wszystkie polskie monety z bliska.",
      realLifeTask:
        "Zbierz wszystkie monety jakie masz w domu. Ułóż je w kolejności od 1 gr do 5 zł. Narysuj każdą monetę (obrysuj ołówkiem) i napisz jej wartość.",
      estimatedMinutes: 15,
      successCriteria:
        "Masz rysunki co najmniej 5 różnych monet i znasz ich wartości na pamięć.",
    },
    {
      id: "ma2-m2",
      skillId: "money-awareness-2",
      version: "1.0",
      order: 2,
      difficulty: "STANDARD",
      title: "Sejsmograf cen w sklepie",
      description: "Obserwuj prawdziwe ceny i przeliczaj je na monety.",
      realLifeTask:
        "Idź z rodzicem do sklepu. Wybierz 5 produktów. Dla każdego zapisz cenę i oblicz: jakimi monetami i banknotami mógłbyś zapłacić dokładnie (bez reszty)? Poszukaj najtańszego i najdroższego produktu.",
      estimatedMinutes: 20,
      successCriteria:
        "Zapisałeś 5 cen i dla każdej znalazłeś zestaw monet/banknotów.",
      parentTip:
        "Pozwól dziecku samodzielnie zapłacić za jeden mały zakup — to niezapomniane doświadczenie!",
    },
    {
      id: "ma2-m3",
      skillId: "money-awareness-2",
      version: "1.0",
      order: 3,
      difficulty: "CHALLENGE",
      title: "Mistrz reszty",
      description: "Zostań ekspertem od liczenia reszty.",
      realLifeTask:
        "Przez 3 dni — za każdym razem gdy rodzic płaci gotówką w sklepie — sam oblicz resztę PRZED kasjerem. Zapisuj: cena, zapłacono, reszta obliczona, reszta otrzymana. Ile razy twój wynik się zgadzał?",
      estimatedMinutes: 30,
      successCriteria:
        "Przeprowadziłeś co najmniej 5 obserwacji i obliczyłeś resztę poprawnie w przynajmniej 4 przypadkach.",
      parentTip:
        "Płać gotówką przez kilka dni specjalnie dla tego ćwiczenia — to świetna okazja do praktyki matematycznej.",
    },
  ],
}

// ─────────────────────────────────────────────────────────────
// money-awareness-3 — Skąd biorą się pieniądze?
// ─────────────────────────────────────────────────────────────

export const moneyAwareness3: SkillContent = {
  skillId: "money-awareness-3",
  lessons: [
    {
      id: "ma3-l1",
      skillId: "money-awareness-3",
      version: "1.0",
      order: 1,
      title: "Praca = pieniądze",
      learningObjective: "Rozumiesz, że pieniądze zarabia się przez pracę lub usługi",
      estimatedMinutes: 8,
      introStory:
        "Kasia pytała mamę: 'Dlaczego nie możemy kupić tego drogiego roweru?' Mama wyjaśniła: 'Bo każda złotówka, którą mamy, pochodzi z mojej pracy. Codziennie wychodzę do biura i za 8 godzin pracy dostaję wynagrodzenie.' Kasia pomyślała: 'Czyli ten rower kosztuje... ile godzin pracy mamy?'",
      explanation:
        "Pieniądze nie biorą się z bankomatu — bankomat tylko je wydaje. Pieniądze zarabia się przez pracę. Pracownik dostaje pensję. Lekarz, nauczyciel, programista, sprzedawca — każdy dostaje pieniądze za swoje umiejętności i czas. Można też zarabiać jako własny szef (przedsiębiorca) albo tworząc coś, za co inni płacą (artysta, youtuber).",
      example:
        "Tata jest mechanikiem. Za naprawienie samochodu dostaje 200 zł. Te 200 zł idzie na jedzenie (100 zł), ubrania (50 zł) i oszczędności (50 zł). Dosłownie każda złotówka pochodzi z jego pracy.",
      challenge:
        "Zapytaj rodziców, jak się nazywa ich zawód i co robią w pracy. Spróbuj opisać ich pracę jednym zdaniem. Np. 'Mama jest pielęgniarką — pomaga chorym ludziom wyzdrowieć.'",
      summary:
        "Pieniądze zarabia się pracą — każda złotówka, którą mamy, pochodzi z czyjejś pracy, umiejętności lub czasu.",
      tags: ["praca", "pensja", "zarabianie", "zawód"],
    },
    {
      id: "ma3-l2",
      skillId: "money-awareness-3",
      version: "1.0",
      order: 2,
      title: "Różne sposoby zarabiania",
      learningObjective: "Potrafisz wymienić 4 różne sposoby zarabiania pieniędzy",
      estimatedMinutes: 8,
      introStory:
        "Na urodzinach Tomka spotkały się: ciotka architektka, wujek który ma sklep, kuzyn który sprzedaje rysunki przez internet i babcia, która dostaje emeryturę. Wszyscy mają pieniądze — ale każdy zdobywa je inaczej. Tomek zastanawiał się: a jak ja będę kiedyś zarabiał?",
      explanation:
        "Sposoby zarabiania: 1) Praca dla kogoś (etat) — dostajesz pensję co miesiąc. 2) Własna firma — zarabiasz na swoich produktach lub usługach. 3) Sprzedaż rzeczy — np. tworzysz i sprzedajesz rysunki, rękodzieło. 4) Pomoc rodzinie — sprzątanie, ogród, korepetycje dla rodzeństwa (kieszonkowe za pracę). Dzieci mogą zacząć małymi krokami!",
      example:
        "Ola (9 lat) zarabia 5 zł tygodniowo za podlewanie kwiatków u sąsiadki. W miesiąc zbiera 20 zł — to jej własne, zarobione pieniądze! Zaczyna jak prawdziwy 'pracownik'.",
      challenge:
        "Wymyśl 2 sposoby, jak TY mógłbyś zarobić pieniądze. Mogą być małe — np. pomaganie sąsiadce, sprzedaż rysunków, pomoc w ogrodzie. Zapisz je.",
      summary:
        "Pieniądze można zarabiać na wiele sposobów — pracując dla kogoś, prowadząc własną działalność, sprzedając to co tworzysz, lub pomagając innym.",
      tags: ["zarabianie", "sposoby", "praca", "firma"],
    },
    {
      id: "ma3-l3",
      skillId: "money-awareness-3",
      version: "1.0",
      order: 3,
      title: "Pieniądze a szczęście — co można, a czego nie można kupić",
      learningObjective: "Rozumiesz, że pieniądze są narzędziem, a nie celem samym w sobie",
      estimatedMinutes: 7,
      introStory:
        "Bogaty chłopiec Adam miał wszystkie zabawki. Ale w wakacje zaprzyjaźnił się z Kubą, który mieszkał w małym domku. Kuba nie miał wielu zabawek, ale miał mnóstwo pomysłów na zabawy — budowali szałasy, łowili ryby, bawili się w odkrywców. Adam pomyślał: 'Dlaczego przy Kubie jest tak fajnie, skoro on nie ma nawet połowy moich zabawek?'",
      explanation:
        "Pieniądze to narzędzie — jak młotek. Możesz nim zbudować coś pięknego lub możesz nim zepsuć. Pieniądze pomagają kupować jedzenie, dom, ubrania, leki — rzeczy ważne. Ale przyjaźni, miłości, zdrowia ani czasu nie kupisz. Dlatego ważne jest, żeby pieniądze były środkiem do dobrego życia, a nie celem.",
      example:
        "Za pieniądze kupisz: bilet do kina (wspólne przeżycie z przyjacielem). Ale samej przyjaźni nie kupisz za żadne pieniądze. Pieniądze mogą pomóc przeżyć fajne chwile — ale same w sobie nie dają szczęścia.",
      challenge:
        "Napisz listę 5 rzeczy, które sprawiają ci radość. Które z nich wymagają pieniędzy? Które są bezpłatne? Co wyniki ci mówią?",
      summary:
        "Pieniądze są ważnym narzędziem, ale nie są wszystkim — szczęście, przyjaźń i wartościowe chwile często nie kosztują nic.",
      tags: ["szczęście", "wartości", "pieniądze", "cel"],
    },
  ],
  quiz: {
    id: "ma3-quiz",
    skillId: "money-awareness-3",
    version: "1.0",
    title: "Quiz: Skąd biorą się pieniądze?",
    questions: [
      {
        id: "ma3-q1",
        difficulty: "EASY",
        question: "Skąd rodzice biorą pieniądze?",
        options: [
          "Z bankomatu — tam zawsze są",
          "Z pracy — dostają pensję za swoją pracę",
          "Od rządu — każdy dostaje co miesiąc",
          "Drukują je w domu",
        ],
        correctIndex: 1,
        explanation:
          "Pieniądze w bankomacie to własne pieniądze rodziców — wcześniej je tam wpłacili z pensji. Bankomat to jak skarbonka, nie źródło pieniędzy.",
      },
      {
        id: "ma3-q2",
        difficulty: "MEDIUM",
        question: "Który z poniższych NIE jest sposobem zarabiania pieniędzy?",
        options: [
          "Praca dla firmy za pensję",
          "Sprzedaż własnoręcznie robionych rzeczy",
          "Drukowanie banknotów w domu",
          "Prowadzenie własnego sklepu",
        ],
        correctIndex: 2,
        explanation:
          "Drukowanie banknotów w domu to fałszowanie pieniędzy — jest nielegalne! Pieniądze drukuje tylko Narodowy Bank Polski.",
      },
      {
        id: "ma3-q3",
        difficulty: "MEDIUM",
        question: "Co to jest pensja?",
        options: [
          "Pieniądze otrzymane za pracę od pracodawcy",
          "Pieniądze pożyczone od banku",
          "Nagroda za dobre stopnie w szkole",
          "Pieniądze, które znajdziesz na ulicy",
        ],
        correctIndex: 0,
        explanation:
          "Pensja (wynagrodzenie) to pieniądze, które pracownik dostaje od pracodawcy za wykonaną pracę — zwykle raz w miesiącu.",
      },
      {
        id: "ma3-q4",
        difficulty: "HARD",
        question: "Czego pieniądze NIE mogą kupić?",
        options: [
          "Jedzenia i ubrań",
          "Leków i opieki medycznej",
          "Prawdziwej przyjaźni i miłości",
          "Rozrywki i wypoczynku",
        ],
        correctIndex: 2,
        explanation:
          "Prawdziwą przyjaźnię i miłość buduje się przez czas, uwagę i szczerość — pieniądze mogą kupić pozory, ale nie prawdziwe relacje.",
      },
      {
        id: "ma3-q5",
        difficulty: "HARD",
        question: "Ola dostaje 10 zł tygodniowo za opiekę nad psem sąsiadki. Jak nazwiemy te pieniądze?",
        options: [
          "Kieszonkowe od rodziców",
          "Zarobione przez własną pracę",
          "Prezent od sąsiadki",
          "Pożyczka do oddania",
        ],
        correctIndex: 1,
        explanation:
          "Ola świadczy usługę (opiekę nad psem) i dostaje wynagrodzenie — to zarobione pieniądze, nie prezent ani kieszonkowe.",
      },
    ],
  },
  missions: [
    {
      id: "ma3-m1",
      skillId: "money-awareness-3",
      version: "1.0",
      order: 1,
      difficulty: "QUICK",
      title: "Mapa zawodów w rodzinie",
      description: "Poznaj, jak zarabiają pieniądze różni członkowie twojej rodziny.",
      realLifeTask:
        "Narysuj 'mapę' rodziny. Obok każdej osoby napisz jej zawód i jak zarabia pieniądze (pensja, własna firma, emerytura, stypendium). Ile różnych sposobów zarabiania znajdziesz w swojej rodzinie?",
      estimatedMinutes: 15,
      successCriteria:
        "Masz mapę z co najmniej 4 osobami i ich sposobami zarabiania.",
    },
    {
      id: "ma3-m2",
      skillId: "money-awareness-3",
      version: "1.0",
      order: 2,
      difficulty: "STANDARD",
      title: "Mój pomysł na zarabianie",
      description: "Wymyśl realny sposób, w jaki mógłbyś zarobić swoje pierwsze pieniądze.",
      realLifeTask:
        "Wybierz jedną rzecz, którą potrafisz robić dobrze (rysować, sprzątać, pomagać, piec). Napisz 'plan biznesowy': Co robię? Dla kogo? Ile by kosztowało? Czy znajdzie się ktoś chętny? Porozmawiaj o tym z rodzicem.",
      estimatedMinutes: 20,
      successCriteria:
        "Masz konkretny pomysł z opisem usługi i potencjalnym klientem.",
      parentTip:
        "Wesprzyj pomysł dziecka — nawet jeśli jest mały. To pierwsze myślenie przedsiębiorcze!",
    },
    {
      id: "ma3-m3",
      skillId: "money-awareness-3",
      version: "1.0",
      order: 3,
      difficulty: "CHALLENGE",
      title: "Lista: co kupisz, czego nie",
      description: "Odkryj, co pieniądze mogą, a czego nie mogą ci dać.",
      realLifeTask:
        "Zrób dwie listy: 1) '10 rzeczy, które MOŻNA kupić za pieniądze' (ważnych dla ciebie), 2) '5 rzeczy, których NIE MOŻNA kupić za pieniądze'. Porozmawiaj z rodzicem, dlaczego ta druga lista jest ważna.",
      estimatedMinutes: 20,
      successCriteria:
        "Masz obie listy i potrafisz wyjaśnić różnicę między tym, co materialne, a co niematerialne.",
    },
  ],
}
