import type { SkillContent } from "../../types"

// ─────────────────────────────────────────────────────────────
// needs-wants-1 — Potrzeby i zachcianki
// ─────────────────────────────────────────────────────────────

export const needsWants1: SkillContent = {
  skillId: "needs-wants-1",
  lessons: [
    {
      id: "nw1-l1",
      skillId: "needs-wants-1",
      version: "1.0",
      order: 1,
      title: "Potrzeba czy zachcianka? Wielka różnica",
      learningObjective: "Rozróżniasz między tym czego naprawdę potrzebujesz a tym czego tylko chcesz",
      estimatedMinutes: 8,
      introStory:
        "W sklepie Ola powiedziała: 'Mamo, POTRZEBUJĘ te nowe trampki!' Mama spojrzała na jej nogi — miała na sobie trampki. 'Ale CHCĘ nowe!' poprawiła się Ola. 'Już lepiej,' powiedziała mama. 'Bo to ważna różnica.'",
      explanation:
        "Potrzeba = coś bez czego nie możesz się obejść lub co jest niezbędne dla zdrowia i bezpieczeństwa. Jedzenie, ubrania (podstawowe), dom, szkoła — to potrzeby. Zachcianka = coś co chcesz, ale możesz żyć bez tego. Nowe zabawki, modne buty, słodycze, gry — to zachcianki. Rozróżnienie to pierwszy krok do mądrych decyzji finansowych.",
      example:
        "Potrzeby: śniadanie, płaszcz na zimę, ołówki do szkoły. Zachcianki: nowy tablet, słodycze po każdym obiedzie, 10. para butów. Obie są naturalne — klucz to świadomość, co czym jest.",
      challenge:
        "Zrób listę 10 rzeczy które chcesz lub potrzebujesz. Przy każdej napisz P (potrzeba) lub Z (zachcianka). Policz — ile jest P, ile Z?",
      summary:
        "Potrzeby to rzeczy niezbędne do życia. Zachcianki to rzeczy, które sprawiają radość, ale bez których możesz żyć. Obie są OK — trzeba tylko wiedzieć, czym są.",
      tags: ["potrzeby", "zachcianki", "decyzja", "podstawy"],
    },
    {
      id: "nw1-l2",
      skillId: "needs-wants-1",
      version: "1.0",
      order: 2,
      title: "Kiedy zachcianka staje się potrzebą?",
      learningObjective: "Rozumiesz, że granica między potrzebą a zachcianką nie jest zawsze oczywista",
      estimatedMinutes: 7,
      introStory:
        "Franek twierdził: 'Internet to zachcianka.' Tata poprawił: 'Ale do szkoły teraz wysyłasz prace online i uczysz się na platformie. Więc internet stał się potrzebą dla twojej edukacji.' Franek zmienił zdanie: 'Aha, to zależy od sytuacji!'",
      explanation:
        "Granica między potrzebą a zachcianką zależy od sytuacji. Telefon dla dorosłego pracującego zdalnie to potrzeba. Dla dziecka w podstawówce — może być zachcianką (lub potrzebą bezpieczeństwa — zależy od rodziny). Nie ma jednej odpowiedzi dla wszystkich. Ważne: myśl krytycznie i pytaj 'dlaczego naprawdę tego potrzebuję?'",
      example:
        "Buty: masz już 2 pary w dobrym stanie → nowe buty to zachcianka. Masz jedną parę i przedziurawioną → nowe buty to potrzeba. Kontekst ma znaczenie!",
      challenge:
        "Weź 3 przykłady z poprzedniej lekcji i sprawdź: czy w innej sytuacji mogłyby zmienić kategorię? Np. 'słodycze po obiedzie' — kiedy byłyby potrzebą?",
      summary:
        "Potrzeba i zachcianka to nie zawsze oczywiste — kontekst i sytuacja mają znaczenie. Ważne jest myślenie, a nie mechaniczne etykietowanie.",
      tags: ["kontekst", "sytuacja", "potrzeba", "zachcianka"],
    },
    {
      id: "nw1-l3",
      skillId: "needs-wants-1",
      version: "1.0",
      order: 3,
      title: "Pytanie 'DLACZEGO' zanim wydasz",
      learningObjective: "Stosujesz pytanie 'dlaczego tego chcę' przed każdym zakupem",
      estimatedMinutes: 8,
      introStory:
        "Zuzia chciała nowy zestaw flamastrów. Miała już 3 zestawy. Mama zapytała: 'Dlaczego chcesz nowe?' Zuzia myślała chwilę... 'Bo są w ładnym pudełku.' 'Czy pudełko sprawi, że będziesz lepiej rysować?' 'Nie...' Zuzia wróciła do swoich starych flamastrów i namalowała przepiękny obrazek.",
      explanation:
        "Przed każdym wydatkiem zadaj sobie pytanie: DLACZEGO chcę to kupić? Dobra odpowiedź: 'potrzebuję do szkoły', 'nie mam czegoś takiego', 'to rozwiąże mój problem'. Słaba odpowiedź: 'bo wygląda fajnie', 'bo kolega ma', 'bo jest w promocji'. Im lepsza odpowiedź, tym bardziej świadoma decyzja.",
      example:
        "Chcę kupić naklejki za 5 zł. DLACZEGO? 'Bo dekoruję swój zeszyt i mam już prawie wszystkie strony z motywem kosmicznym.' To dobry powód — uzupełniasz kolekcję, którą aktywnie używasz.",
      challenge:
        "Następnym razem gdy będziesz chcieć coś kupić — zadaj sobie pytanie 'DLACZEGO?' 3 razy z rzędu (technika 5×DLACZEGO). Co odkryjesz?",
      summary:
        "Pytanie 'dlaczego?' przed zakupem to najprostsze narzędzie do odróżnienia rzeczywistej potrzeby od chwilowej zachcianki.",
      tags: ["dlaczego", "świadomy zakup", "pytania", "decyzja"],
    },
  ],
  quiz: {
    id: "nw1-quiz",
    skillId: "needs-wants-1",
    version: "1.0",
    title: "Quiz: Potrzeby i zachcianki",
    questions: [
      {
        id: "nw1-q1",
        difficulty: "EASY",
        question: "Co to jest 'potrzeba'?",
        options: [
          "Coś, co chcę mieć bo to fajne",
          "Coś bez czego nie możesz normalnie żyć lub funkcjonować",
          "Coś, co jest w promocji",
          "Coś, co ma kolega",
        ],
        correctIndex: 1,
        explanation:
          "Potrzeba to rzecz niezbędna — jedzenie, ubranie, dach nad głową, edukacja. Bez nich trudno normalnie żyć.",
      },
      {
        id: "nw1-q2",
        difficulty: "MEDIUM",
        question: "Które z poniższych jest ZACHCIANKĄ (a nie potrzebą)?",
        options: [
          "Chleb na śniadanie",
          "Buty na zimę gdy masz tylko letnie",
          "5. para butów gdy masz już 4 sprawne",
          "Leki gdy jesteś chory",
        ],
        correctIndex: 2,
        explanation:
          "Masz już 4 sprawne pary butów — 5. para to zachcianka, nie potrzeba. Jedną z pierwszych poinnych. Reszta to potrzeby.",
      },
      {
        id: "nw1-q3",
        difficulty: "MEDIUM",
        question: "Tomek chce kupić nową grę, bo jego znajomy ją ma. To przykład zakupu...",
        options: [
          "Wynikającego z potrzeby",
          "Wynikającego z presji rówieśniczej (zachcianka)",
          "Niezbędnego dla zdrowia",
          "Planowanego oszczędnościami",
        ],
        correctIndex: 1,
        explanation:
          "Kupowanie czegoś 'bo kolega ma' to presja rówieśnicza — typowa zachcianka, nie potrzeba.",
      },
      {
        id: "nw1-q4",
        difficulty: "HARD",
        question: "W jakiej sytuacji telefon komórkowy staje się POTRZEBĄ?",
        options: [
          "Gdy wszyscy w klasie mają",
          "Gdy jest w dobrej cenie",
          "Gdy musisz go używać do nauki lub bezpieczeństwa",
          "Gdy chcesz grać w gry",
        ],
        correctIndex: 2,
        explanation:
          "Telefon staje się potrzebą gdy służy realnym celom: kontakt z rodzicami w drodze, nauka zdalna, praca. Sam fakt że inni mają to nie potrzeba.",
      },
      {
        id: "nw1-q5",
        difficulty: "HARD",
        question: "Jakie pytanie najlepiej pomaga odróżnić potrzebę od zachcianki?",
        options: [
          "'Czy to jest tanie?'",
          "'Czy mogę żyć normalnie bez tego?'",
          "'Czy to jest ładne?'",
          "'Czy moi znajomi to mają?'",
        ],
        correctIndex: 1,
        explanation:
          "Pytanie 'czy mogę żyć normalnie bez tego' jest kluczowe. Jeśli tak — to zachcianka. Jeśli nie — potrzeba.",
      },
    ],
  },
  missions: [
    {
      id: "nw1-m1",
      skillId: "needs-wants-1",
      version: "1.0",
      order: 1,
      difficulty: "QUICK",
      title: "Segregacja potrzeb i zachcianek",
      description: "Posortuj 20 przedmiotów na potrzeby i zachcianki.",
      realLifeTask:
        "Weź kartkę i napisz dwie kolumny: POTRZEBY i ZACHCIANKI. Chodź po domu i wypisz 20 przedmiotów — każdy wpisz do właściwej kolumny. Ile masz potrzeb, ile zachcianek? Porozmawiaj z rodzicem o wynikach.",
      estimatedMinutes: 15,
      successCriteria: "Masz 20 przedmiotów posortowanych i krótkę rozmowę z rodzicem o wynikach.",
    },
    {
      id: "nw1-m2",
      skillId: "needs-wants-1",
      version: "1.0",
      order: 2,
      difficulty: "STANDARD",
      title: "Dziennik 'DLACZEGO'",
      description: "Przez tydzień pytaj 'dlaczego' przed każdym wydatkiem.",
      realLifeTask:
        "Przez 7 dni: za każdym razem gdy chcesz coś kupić lub prosisz rodziców o pieniądze — najpierw zapisz 'DLACZEGO tego chcę?' i oceń: potrzeba (P) czy zachcianka (Z). Na koniec tygodnia policz: ile razy było P, ile Z? Czy zrezygnowałeś z czegoś?",
      estimatedMinutes: 60,
      successCriteria:
        "Masz 7-dniowy dzienniczek z co najmniej 5 zapisami i wnioskami.",
      parentTip: "Nie oceniaj odpowiedzi dziecka — pozwól mu samemu dojść do wniosków.",
    },
    {
      id: "nw1-m3",
      skillId: "needs-wants-1",
      version: "1.0",
      order: 3,
      difficulty: "CHALLENGE",
      title: "Budżet rodziny — co jest potrzebą?",
      description: "Dowiedz się, na co rodzina wydaje pieniądze i co jest naprawdę potrzebne.",
      realLifeTask:
        "Poproś rodziców o pokazanie (ogólnie) co kupili w zeszłym tygodniu. Zrób listę i spróbuj podzielić na P i Z. Porozmawiaj: czy rodzina czasem kupuje zachcianki? To normalne? Jak to balansować?",
      estimatedMinutes: 25,
      successCriteria:
        "Przeprowadziłeś rozmowę z rodzicem i rozumiesz, że nawet dorośli mają zachcianki.",
      parentTip:
        "Bądź otwarty — pokaż 2–3 prawdziwe zakupy i powiedz dlaczego je zrobiłeś. To świetna rozmowa o wartościach.",
    },
  ],
}

// ─────────────────────────────────────────────────────────────
// needs-wants-2 — Mądre zakupy
// ─────────────────────────────────────────────────────────────

export const needsWants2: SkillContent = {
  skillId: "needs-wants-2",
  lessons: [
    {
      id: "nw2-l1",
      skillId: "needs-wants-2",
      version: "1.0",
      order: 1,
      title: "Porównywanie cen — nie zawsze taniej = lepiej",
      learningObjective: "Potrafisz porównać 3 oferty i wybrać najlepszą wartość",
      estimatedMinutes: 9,
      introStory:
        "Kacper chciał kupić kredki. W sklepie A: 12 kredek za 8 zł. W sklepie B: 24 kredki za 14 zł. Kacper wybrał sklep A bo 'jest tańszy'. Ale mama powiedziała: 'Policz cenę za jedną kredkę.' Sklep A: 8÷12 = 67 gr. Sklep B: 14÷24 = 58 gr. Sklep B jest tańszy za kredkę!",
      explanation:
        "Mądry zakup to nie zawsze najniższa cena, ale najlepsza wartość. Przed zakupem porównaj: cenę za sztukę (nie za opakowanie), jakość (czy się szybko zepsuje?), czy naprawdę potrzebujesz tyle (czy wystarczy mniejsze opakowanie?). Ważna formuła: cena jednostkowa = cena ÷ ilość.",
      example:
        "Sok A: 1 litr za 3 zł. Sok B: 2 litry za 5,50 zł. Cena za litr: A = 3 zł, B = 2,75 zł. Sok B jest lepszą wartością — jeśli i tak wypijesz oba litry.",
      challenge:
        "W kuchni znajdź dwa produkty tego samego rodzaju (np. dwa soki, dwa jogurty). Oblicz cenę za 100 g lub 100 ml każdego. Który jest tańszy per jednostka?",
      summary:
        "Mądre zakupy to porównywanie ceny za jednostkę, a nie tylko ceny za opakowanie — tak odkrywasz prawdziwą wartość oferty.",
      tags: ["porównanie", "cena jednostkowa", "wartość", "zakupy"],
    },
    {
      id: "nw2-l2",
      skillId: "needs-wants-2",
      version: "1.0",
      order: 2,
      title: "Lista zakupów — twój plan na sklep",
      learningObjective: "Tworzysz listę zakupów i trzymasz się jej w sklepie",
      estimatedMinutes: 8,
      introStory:
        "Mama i Ola poszły do sklepu z listą 8 produktów. W sklepie było mnóstwo fajnych rzeczy — żelki przy kasie, nowy smak chipsów, super naklejki... Ola patrzyła na listę: 'Mamy to? Nie. Kupujemy? Nie.' Wyszły ze sklepem — tylko 8 produktów, dokładnie to co było potrzebne.",
      explanation:
        "Lista zakupów to plan działania. Bez listy — kupisz przypadkowe rzeczy i wydasz więcej niż chciałeś. Z listą — wiesz co kupujesz, ile wydasz i nie dajesz się wciągnąć przez promocje. Sklepy są zaprojektowane żeby kusić! Słodycze przy kasie, promocje 'kup 3 zapłać za 2' — to pułapki dla nieplanujących.",
      example:
        "Idziesz do sklepu po farby do projektu szkolnego (15 zł). Bez listy wrócisz z farbami + ciastkami + napojem + grą + naklejkami = 45 zł. Z listą: tylko farby = 15 zł. Różnica: 30 zł!",
      challenge:
        "Napisz listę zakupów na jutrzejszy dzień razem z rodzicem. Ustal budżet. Idź na zakupy i sprawdź: czy udało się trzymać listy i budżetu?",
      summary:
        "Lista zakupów chroni przed impulsywnymi zakupami i pomaga trzymać budżet — to jeden z najprostszych, a zarazem najskuteczniejszych narzędzi finansowych.",
      tags: ["lista zakupów", "plan", "budżet", "impuls"],
    },
    {
      id: "nw2-l3",
      skillId: "needs-wants-2",
      version: "1.0",
      order: 3,
      title: "Kiedy promocja to pułapka?",
      learningObjective: "Rozpoznajesz, kiedy promocja jest korzystna, a kiedy jest pułapką",
      estimatedMinutes: 9,
      introStory:
        "'KUPUJESZ 1, DOSTAJESZ 2 GRATIS!' krzyknął plakat w sklepie. Franek był podekscytowany — to świetna okazja! Ale mama powiedziała: 'Czy potrzebujemy 3 butelki szamponu?' 'Nie...' '...Więc to nie okazja, to pułapka. Wydasz 3× więcej niż planowałeś.'",
      explanation:
        "Promocja to dobra okazja TYLKO jeśli: naprawdę potrzebujesz tego produktu, kupisz go wcześniej czy później i tak, ilość nie jest za duża (nie zmarnujesz). Pułapki promocyjne: 'kup więcej dostaniesz taniej' (ale kupujesz za dużo), 'tylko dziś' (sztuczna presja czasu), 'gratis' (coś co i tak byś kupił). Pytaj zawsze: czy bez tej promocji i tak bym to kupił?",
      example:
        "Promocja: 3 kg jabłek za cenę 2 kg. Czy to okazja? JEŚLI: zjesz te 3 kg zanim zgniją → TAK. JEŚLI: zjesz tylko 1 kg → NIE, zmarnujesz jabłka i pieniądze.",
      challenge:
        "Pójdź z rodzicem do sklepu i znajdź 3 promocje. Dla każdej odpowiedz: Czy to dobra okazja dla was? Dlaczego tak lub nie?",
      summary:
        "Promocja jest dobra tylko gdy naprawdę potrzebujesz produktu i nie kupisz za dużo. 'Gratis' i 'okazja' to często pułapki na nieplanujących.",
      tags: ["promocja", "pułapka", "zakupy", "decyzja"],
    },
  ],
  quiz: {
    id: "nw2-quiz",
    skillId: "needs-wants-2",
    version: "1.0",
    title: "Quiz: Mądre zakupy",
    questions: [
      {
        id: "nw2-q1",
        difficulty: "EASY",
        question: "Dlaczego warto mieć listę zakupów?",
        options: [
          "Bo sklep wymaga listy",
          "Bo bez listy zapomnisz co kupić i kupisz więcej niż potrzebujesz",
          "Bo lista sprawia, że zakupy trwają krócej",
          "Bo rodzice zawsze tak robią",
        ],
        correctIndex: 1,
        explanation:
          "Lista zakupów chroni przed impulsywnymi zakupami i pomaga trzymać się budżetu.",
      },
      {
        id: "nw2-q2",
        difficulty: "MEDIUM",
        question: "Sok A: 1 litr za 2 zł. Sok B: 1,5 litra za 2,70 zł. Który jest tańszy za litr?",
        options: [
          "Sok A (2 zł/litr)",
          "Sok B (1,80 zł/litr)",
          "Oba kosztują tyle samo",
          "Nie można obliczyć",
        ],
        correctIndex: 1,
        explanation: "Sok B: 2,70 ÷ 1,5 = 1,80 zł/litr. Sok A: 2 zł/litr. Sok B tańszy za litr.",
      },
      {
        id: "nw2-q3",
        difficulty: "MEDIUM",
        question: "Kiedy promocja '3 w cenie 2' jest PUŁAPKĄ?",
        options: [
          "Gdy produkt jest drogi",
          "Gdy kupisz za dużo i część zmarnujesz",
          "Gdy sklep jest daleko",
          "Gdy promocja trwa jeden dzień",
        ],
        correctIndex: 1,
        explanation:
          "Jeśli kupisz 3 sztuki, a zużyjesz tylko 1, zmarnowałeś 2 — pieniądze wydane niepotrzebnie.",
      },
      {
        id: "nw2-q4",
        difficulty: "HARD",
        question: "Masz 20 zł budżetu na zakupy. Kupujesz: chleb 4 zł, mleko 3 zł, jabłka 5 zł. Ile zostaje i czy możesz dodać czekoladę za 6 zł?",
        options: [
          "Zostaje 8 zł, czekolada mieści się w budżecie",
          "Zostaje 8 zł, ale czekolada to zachcianka więc nie",
          "Budżet wyczerpany, nic nie zostaje",
          "Zostaje 12 zł, czekolada się mieści",
        ],
        correctIndex: 0,
        explanation:
          "4+3+5=12 zł. Zostaje 20−12=8 zł. Czekolada kosztuje 6 zł — mieści się w budżecie. Ale czy jest na liście?",
      },
      {
        id: "nw2-q5",
        difficulty: "HARD",
        question: "Co oznacza 'cena jednostkowa'?",
        options: [
          "Cena za całe opakowanie",
          "Cena za jedną sztukę, 100g lub 100ml — do porównywania produktów",
          "Cena ze zniżką",
          "Cena tylko dla jednej osoby",
        ],
        correctIndex: 1,
        explanation:
          "Cena jednostkowa pozwala porównać produkty różnych rozmiarów — np. cena za 100 g, żeby wiedzieć który jest naprawdę tańszy.",
      },
    ],
  },
  missions: [
    {
      id: "nw2-m1",
      skillId: "needs-wants-2",
      version: "1.0",
      order: 1,
      difficulty: "QUICK",
      title: "Detektyw cen w kuchni",
      description: "Znajdź najtańszy produkt w swojej kuchni, licząc cenę za 100g.",
      realLifeTask:
        "Wybierz 3 podobne produkty w kuchni (np. 3 rodzaje płatków śniadaniowych, 3 jogurty). Sprawdź cenę i wagę każdego. Oblicz cenę za 100 g. Który jest najtańszy za 100 g?",
      estimatedMinutes: 15,
      successCriteria: "Policzyłeś cenę za 100g dla 3 produktów i wiesz który jest najtańszy.",
    },
    {
      id: "nw2-m2",
      skillId: "needs-wants-2",
      version: "1.0",
      order: 2,
      difficulty: "STANDARD",
      title: "Misja: zakupy z listą i budżetem",
      description: "Zaplanuj i zrealizuj zakupy z listą i budżetem.",
      realLifeTask:
        "Razem z rodzicem zaplanuj zakupy na jeden dzień. Napisz listę, ustal budżet (np. 30 zł). Idź do sklepu i kup tylko to co na liście. Po powrocie: czy udało się trzymać listy? Ile wydałeś? Czy zostało coś z budżetu?",
      estimatedMinutes: 45,
      successCriteria:
        "Zrobiłeś zakupy z listą, zmieściłeś się w budżecie i zapisałeś wyniki.",
      parentTip:
        "Daj dziecku faktyczny budżet do zarządzania — niech trzyma pieniądze i płaci.",
    },
    {
      id: "nw2-m3",
      skillId: "needs-wants-2",
      version: "1.0",
      order: 3,
      difficulty: "CHALLENGE",
      title: "Audyt promocji w sklepie",
      description: "Przeanalizuj 5 promocji i oceń, które są naprawdę opłacalne.",
      realLifeTask:
        "W sklepie znajdź 5 produktów z promocją (np. '2 za 1', 'taniej o 30%', 'gratis'). Dla każdego zapisz: co jest promowane, ile kosztuje normalnie i w promocji, czy twoja rodzina tego potrzebuje, czy promocja jest naprawdę opłacalna. Oceń każdą: TAK lub NIE warto skorzystać.",
      estimatedMinutes: 30,
      successCriteria:
        "Masz analizę 5 promocji z uzasadnieniem TAK/NIE dla każdej.",
    },
  ],
}
