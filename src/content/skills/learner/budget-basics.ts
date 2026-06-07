import type { SkillContent } from "../../types"

// ─────────────────────────────────────────────────────────────
// budget-basics-1 — Co to jest budżet?
// ─────────────────────────────────────────────────────────────

export const budgetBasics1: SkillContent = {
  skillId: "budget-basics-1",
  lessons: [
    {
      id: "bb1-l1",
      skillId: "budget-basics-1",
      version: "1.0",
      order: 1,
      title: "Co to jest budżet?",
      learningObjective: "Rozumiesz, czym jest budżet i dlaczego pomaga lepiej zarządzać pieniędzmi",
      estimatedMinutes: 10,
      introStory:
        "Piotrek dostał 30 zł kieszonkowego w poniedziałek. We wtorek wydał 12 zł na nową książkę, w środę 10 zł na pizzę z kolegami, a w czwartek chciał kupić bilet na basen — ale w portfelu zostało tylko 8 zł. Bilet kosztował 15 zł. 'Jak to możliwe?' myślał. Pieniądze po prostu zniknęły, zanim zdążył zaplanować co z nimi zrobi. Tego samego dnia jego siostra Ania powiedziała: 'Ja mam budżet. Wiem dokładnie, co kupię i ile zostanie.'",
      explanation:
        "Budżet to plan wydawania pieniędzy. Zamiast wydawać wszystko na raz i potem żałować, najpierw decydujesz: ile masz, na co chcesz wydać, ile chcesz odłożyć. Budżet ma dwie strony: wpływy (pieniądze, które dostajesz) i wydatki (pieniądze, które wydajesz). Złota zasada: wydatki nigdy nie mogą być większe niż wpływy. Inaczej zostaniesz z niczym — albo nawet z długiem.",
      example:
        "Ania dostaje 30 zł tygodniowo. Jej budżet wygląda tak: Wpływy: 30 zł. Wydatki: jedzenie i napoje 8 zł, rozrywka (kino, gry) 7 zł, oszczędności 10 zł, 'wolne' 5 zł. Razem: 30 zł. Ania wie, że na kino może wydać maksymalnie 7 zł — nie więcej, bo ruszy inne plany.",
      challenge:
        "Pomyśl: ile pieniędzy dostajesz w ciągu tygodnia (kieszonkowe, za pomoc, od rodziny)? Na co zazwyczaj je wydajesz? Spróbuj podzielić to na 3 grupy: jedzenie/napoje, rozrywka, oszczędności. Czy wychodzi tyle samo, ile wchodzi?",
      summary:
        "Budżet to plan — zanim wydasz, decydujesz gdzie idą twoje pieniądze, dzięki czemu nic was nie zaskoczy.",
      tags: ["budżet", "planowanie", "wpływy", "wydatki"],
    },
    {
      id: "bb1-l2",
      skillId: "budget-basics-1",
      version: "1.0",
      order: 2,
      title: "Zarabianie a wydawanie — skąd biorą się pieniądze?",
      learningObjective: "Rozumiesz różnicę między zarabianiem a wydawaniem oraz skąd pochodzą twoje pieniądze",
      estimatedMinutes: 10,
      introStory:
        "Nauczycielka pani Nowak zapytała klasę: 'Skąd biorą się pieniądze w waszych portfelach?' Jedna dziewczynka powiedziała: 'Z portfela mamy!' Klasa się roześmiała, ale pani Nowak powiedziała poważnie: 'To dobra odpowiedź — ale skąd mama ma pieniądze w portfelu?' Cisza. Nikt nie wiedział. Wtedy Bartek podniósł rękę: 'Mama idzie do pracy i zarabia je. Praca to jej sposób na zarabianie pieniędzy.' Pani Nowak uśmiechnęła się: 'Dokładnie tak!'",
      explanation:
        "Pieniądze trzeba najpierw zarobić, żeby móc je wydać. Dorośli zarabiają pracując — to ich wpływy. Ty też możesz mieć wpływy: kieszonkowe, pieniądze za pomoc w domu, prezenty od rodziny, drobne prace (podlewanie kwiatów u sąsiada). Wydatki to wszystko, na co wydajesz pieniądze: jedzenie, rozrywka, ubrania, prezenty dla znajomych. Kluczowe: zarabiasz raz, ale możesz wydać więcej niż raz — dlatego planowanie jest tak ważne.",
      example:
        "Tygodniowe wpływy Bartka: kieszonkowe 20 zł + pieniądze za umycie auta taty 10 zł = 30 zł łącznie. Tygodniowe wydatki: kanapka w szkole 5 zł × 5 dni = 25 zł. Zostaje: 30 − 25 = 5 zł. 'O, tylko 5 zł na wszystko inne!' — Bartek był zaskoczony.",
      challenge:
        "Przez jeden tydzień zapisuj WSZYSTKIE swoje wpływy (skąd i ile). Na koniec tygodnia zsumuj. To twój 'tygodniowy budżet'. Czy byłeś zaskoczony, czy widziałeś mniej albo więcej niż myślałeś?",
      summary:
        "Pieniądze najpierw się zarabia, a potem wydaje — znając swoje wpływy, możesz zaplanować, na co możesz sobie pozwolić.",
      tags: ["zarabianie", "wpływy", "wydatki", "planowanie"],
    },
    {
      id: "bb1-l3",
      skillId: "budget-basics-1",
      version: "1.0",
      order: 3,
      title: "Mój prosty budżet tygodniowy",
      learningObjective: "Potrafisz stworzyć i zapisać prosty budżet tygodniowy",
      estimatedMinutes: 12,
      introStory:
        "Zofia postanowiła zrobić swój pierwszy budżet. Wzięła kartkę, narysowała tabelkę i zaczęła wypełniać. 'To jak planowanie superbohatera' — pomyślała. Każda złotówka dostaje misję: ta idzie na lody, ta na zeszyty, ta do skarbonki. Żadna nie może 'uciec' bez planu. Po pierwszym tygodniu z budżetem Zofia powiedziała: 'Mam RESZTĘ pieniędzy i wiem gdzie są! To pierwszy raz kiedy tak było!'",
      explanation:
        "Prosty budżet tygodniowy ma 4 kroki. 1) Policz wpływy: ile pieniędzy dostajesz w tym tygodniu? 2) Podziel na kategorie: oszczędności (min. 10%), jedzenie/napoje, rozrywka, inne. 3) Sprawdź sumę: czy wydatki = wpływy? 4) Trzymaj się planu! Możesz użyć kartki, zeszytu lub nawet pokolorowanych kopert (jedna na każdą kategorię).",
      example:
        "Budżet Zofii na tydzień: Wpływy = 25 zł. Oszczędności: 5 zł (20%). Jedzenie w szkole: 8 zł. Rozrywka: 7 zł. Wolne (na niespodzianki): 5 zł. Suma wydatków: 5+8+7+5 = 25 zł. Bilans: 25−25 = 0. Perfekcyjnie zbilansowany budżet!",
      challenge:
        "Stwórz swój budżet na ten tydzień: weź kartkę, napisz swoje wpływy, podziel je na min. 3 kategorie. Upewnij się, że suma kategorii = wpływy. Śledź przez 7 dni czy trzymasz się planu.",
      summary:
        "Budżet tygodniowy to twój finansowy plan gry — każda złotówka ma cel, a ty masz kontrolę nad swoimi pieniędzmi.",
      tags: ["budżet", "tygodniowy", "kategorie", "plan"],
    },
  ],
  quiz: {
    id: "bb1-quiz",
    skillId: "budget-basics-1",
    version: "1.0",
    title: "Quiz: Co to jest budżet?",
    questions: [
      {
        id: "bb1-q1",
        difficulty: "EASY",
        question: "Co to jest budżet?",
        options: [
          "Portfel lub etui na pieniądze",
          "Plan wydawania i odkładania pieniędzy",
          "Lista rzeczy do kupienia w sklepie",
          "Ilość pieniędzy w banku",
        ],
        correctIndex: 1,
        explanation:
          "Budżet to plan — decydujesz z góry, na co przeznaczysz swoje pieniądze. Dzięki temu wiesz, ile możesz wydać w każdej kategorii.",
      },
      {
        id: "bb1-q2",
        difficulty: "MEDIUM",
        question: "Dostajesz 40 zł tygodniowo. Odkładasz 20%, na jedzenie przeznaczasz 15 zł. Ile zostaje na rozrywkę i inne rzeczy?",
        options: ["10 zł", "17 zł", "25 zł", "8 zł"],
        correctIndex: 1,
        explanation:
          "20% z 40 zł = 8 zł na oszczędności. Na jedzenie: 15 zł. Razem: 8+15 = 23 zł. Zostaje: 40−23 = 17 zł.",
      },
      {
        id: "bb1-q3",
        difficulty: "MEDIUM",
        question: "Które zdanie najlepiej opisuje złotą zasadę budżetu?",
        options: [
          "Zawsze wydaj wszystko co masz, żeby nie tracić wartości",
          "Wydatki nigdy nie mogą być większe niż wpływy",
          "Oszczędzaj 50% i nic nie kupuj",
          "Wpływy nie mają znaczenia, liczy się tylko ile wydajesz",
        ],
        correctIndex: 1,
        explanation:
          "Złota zasada: wydatki ≤ wpływy. Jeśli wydasz więcej niż masz, tworzysz dług — pieniądze, które musisz oddać innym.",
      },
      {
        id: "bb1-q4",
        difficulty: "HARD",
        question: "Kasia ma tygodniowy budżet: wpływy 35 zł, oszczędności 7 zł, jedzenie 12 zł, rozrywka 10 zł. Czy jej budżet jest zbilansowany?",
        options: [
          "Tak, zostaje jej dokładnie 6 zł",
          "Nie, wydaje 6 zł za dużo",
          "Tak, suma wydatków wynosi 35 zł",
          "Nie, wydaje 6 zł za mało — powinna wydać wszystko",
        ],
        correctIndex: 0,
        explanation:
          "Suma wydatków: 7+12+10 = 29 zł. Wpływy: 35 zł. Zostaje: 35−29 = 6 zł. Budżet jest zbilansowany — jest nawet nadwyżka!",
      },
      {
        id: "bb1-q5",
        difficulty: "HARD",
        question: "Marek zarabia 20 zł tygodniowo kieszonkowego i 15 zł za pomoc u dziadka. Jego wydatki to: 8 zł jedzenie, 12 zł gry, 10 zł ubrania. Co powinien zrobić?",
        options: [
          "Nic, ma 35 zł wpływów i 30 zł wydatków — jest dobrze",
          "Zwiększyć wpływy, bo wydatki (30 zł) są za wysokie",
          "Zmniejszyć wydatki do 35 zł i odłożyć 5 zł jako oszczędności",
          "Pożyczyć pieniądze, żeby móc kupić więcej",
        ],
        correctIndex: 2,
        explanation:
          "Wpływy: 20+15 = 35 zł. Wydatki: 8+12+10 = 30 zł. Zostaje 5 zł — zamiast je wydawać, mądrze byłoby je odłożyć jako oszczędności. Budżet jest OK, ale można go ulepszyć!",
      },
    ],
  },
  missions: [
    {
      id: "bb1-m1",
      skillId: "budget-basics-1",
      version: "1.0",
      order: 1,
      difficulty: "QUICK",
      title: "Policz swoje tygodniowe wpływy",
      description: "Odkryj, ile pieniędzy naprawdę dostajesz w ciągu tygodnia.",
      realLifeTask:
        "Weź kartkę i przez jeden dzień zapisz WSZYSTKIE źródła pieniędzy, jakie możesz mieć w ciągu tygodnia: kieszonkowe, prezenty, pieniądze za pomoc. Zsumuj je. To twoje tygodniowe wpływy. Napisz wielką liczbą: 'Mam ___ zł tygodniowo.'",
      estimatedMinutes: 15,
      successCriteria: "Masz listę wpływów z sumą tygodniową — wiesz z czym zaczynasz budżet.",
    },
    {
      id: "bb1-m2",
      skillId: "budget-basics-1",
      version: "1.0",
      order: 2,
      difficulty: "STANDARD",
      title: "Mój pierwszy budżet tygodniowy",
      description: "Stwórz i zastosuj swój pierwszy prawdziwy budżet przez tydzień.",
      realLifeTask:
        "Weź kartkę lub zeszyt. Podziel stronę na dwie kolumny: WPŁYWY i WYDATKI. W wydatkach zrób co najmniej 3 kategorie (np. jedzenie, rozrywka, oszczędności). Rozdziel swoje tygodniowe pieniądze między kategorie. Przez 7 dni zapisuj każdy wydatek w odpowiedniej kategorii. W niedzielę sprawdź: czy zmieściłeś się w budżecie?",
      estimatedMinutes: 30,
      successCriteria:
        "Masz budżet na kartce i zapisane wszystkie wydatki z tygodnia. Wiesz, czy zmieściłeś się w planie.",
      parentTip:
        "Pomóż dziecku stworzyć tabelkę i pytaj codziennie: 'Czy zapisałeś dzisiejsze wydatki?'",
    },
    {
      id: "bb1-m3",
      skillId: "budget-basics-1",
      version: "1.0",
      order: 3,
      difficulty: "CHALLENGE",
      title: "Miesiąc z budżetem — detektyw finansowy",
      description: "Przez cztery tygodnie śledź swój budżet i analizuj wyniki.",
      realLifeTask:
        "Przez 4 tygodnie prowadź budżet tygodniowy (jak w misji STANDARD). Co tydzień: zapisuj wpływy i wydatki, sprawdzaj czy mieściłeś się w planie, zaznaczaj gdzie przekroczyłeś budżet (czerwony kolor) a gdzie masz nadwyżkę (zielony). Po 4 tygodniach odpowiedz: W której kategorii najtrudniej się zmieścić? Gdzie masz najwięcej nadwyżki? Co byś zmienił w budżecie?",
      estimatedMinutes: 60,
      successCriteria:
        "Masz 4 tygodnie zapisów budżetowych i pisemne odpowiedzi na 3 pytania analizy.",
      parentTip:
        "Raz w tygodniu przejrzyjcie razem budżet. Chwal postępy, a nie wyniki — samo śledzenie to sukces.",
    },
  ],
}

// ─────────────────────────────────────────────────────────────
// budget-basics-2 — Mój budżet kieszonkowy
// ─────────────────────────────────────────────────────────────

export const budgetBasics2: SkillContent = {
  skillId: "budget-basics-2",
  lessons: [
    {
      id: "bb2-l1",
      skillId: "budget-basics-2",
      version: "1.0",
      order: 1,
      title: "Kategorie wydatków — podział pieniędzy",
      learningObjective: "Potrafisz podzielić swoje wydatki na sensowne kategorie i uzasadnić ten podział",
      estimatedMinutes: 10,
      introStory:
        "Wyobraź sobie, że twoje pieniądze to drużyna piłkarska. Każdy gracz (złotówka) ma swoją pozycję na boisku — jedna broni (oszczędności), inne atakują (jedzenie, rozrywka). Jeśli wszyscy gracze biegną w jedno miejsce bez planu — drużyna przegrywa. Ale jeśli każdy wie co ma robić — wygrywają! Marta zrozumiała to pewnego dnia, gdy stwierdziła, że wszystkie jej pieniądze 'biegną' do sklepiku szkolnego, a na nic innego nie zostaje.",
      explanation:
        "Kategorie wydatków to grupy, do których sortujesz swoje zakupy. Typowe kategorie dla ucznia: 1) Jedzenie i napoje — kanapki, soki, słodycze. 2) Rozrywka — kino, gry, książki, sport. 3) Oszczędności — pieniądze odłożone na cel. 4) Prezenty i inne — urodziny przyjaciół, niespodzianki. Możesz mieć własne kategorie — ważne, żeby każda złotówka trafiała do jakiejś grupy.",
      example:
        "Marta ma 30 zł tygodniowo. Jej kategorie: Jedzenie 10 zł (33%), Rozrywka 8 zł (27%), Oszczędności 8 zł (27%), Inne 4 zł (13%). Razem: 30 zł. Kiedy ma ochotę na dodatkowe słodycze, patrzy: 'Mam jeszcze 3 zł w kategorii Jedzenie — OK!' Jeśli nie ma — czeka do następnego tygodnia.",
      challenge:
        "Wypisz wszystko, co kupujesz w ciągu tygodnia. Teraz podziel to na max 4 kategorie — jak byś je nazwał? Czy pasują do twoich nawyków?",
      summary:
        "Kategorie wydatków dają każdej złotówce adres — wiesz, gdzie 'mieszkają' twoje pieniądze i kiedy możesz po nie sięgnąć.",
      tags: ["kategorie", "wydatki", "podział", "budżet"],
    },
    {
      id: "bb2-l2",
      skillId: "budget-basics-2",
      version: "1.0",
      order: 2,
      title: "Arkusz budżetu kieszonkowego",
      learningObjective: "Potrafisz samodzielnie wypełnić arkusz budżetu kieszonkowego",
      estimatedMinutes: 12,
      introStory:
        "Kacper zobaczył, że jego starszy brat prowadzi budżet w zeszycie. 'Po co to robisz?' zapytał. 'Bo chcę mieć kontrolę nad swoimi pieniędzmi, a nie żeby one miały kontrolę nade mną' — odpowiedział brat. Kacper nie rozumiał, ale postanowił spróbować. Wziął zeszyt, narysował tabelkę i zaczął. Po dwóch tygodniach stwierdził: 'Teraz wiem dlaczego zawsze brakowało mi pieniędzy na gitarę — za dużo szło na chipsy!'",
      explanation:
        "Arkusz budżetu to tabela, w której zapisujesz swój plan i rzeczywiste wydatki. Ma dwie części: PLAN (co chcesz wydać) i RZECZYWISTOŚĆ (co naprawdę wydałeś). Porównując te dwie kolumny, widzisz gdzie twój plan zadziałał, a gdzie nie. Nie musisz mieć komputera — zwykły zeszyt wystarczy. Format: data | kategoria | plan | rzeczywistość | różnica.",
      example:
        "Kacper, tydzień 1. Kategoria: Jedzenie. Plan: 10 zł. Rzeczywistość: 14 zł. Różnica: −4 zł (przekroczony). Kategoria: Rozrywka. Plan: 8 zł. Rzeczywistość: 5 zł. Różnica: +3 zł (nadwyżka). Kategoria: Oszczędności. Plan: 8 zł. Rzeczywistość: 8 zł. Różnica: 0 zł (idealnie!). Wniosek: Kacper za dużo wydaje na jedzenie, ale za to oszczędza świetnie.",
      challenge:
        "Narysuj w zeszycie tabelkę z kolumnami: Kategoria | Plan | Rzeczywistość | Różnica. Wpisz swoje kategorie i planowane kwoty. Przez tydzień wpisuj rzeczywiste wydatki. To twój pierwszy arkusz budżetu!",
      summary:
        "Arkusz budżetu to lupa finansowa — porównując plan z rzeczywistością, odkrywasz gdzie idą twoje pieniądze i co chcesz zmienić.",
      tags: ["arkusz", "budżet", "tabelka", "analiza"],
    },
    {
      id: "bb2-l3",
      skillId: "budget-basics-2",
      version: "1.0",
      order: 3,
      title: "Kiedy przekraczam budżet — co teraz?",
      learningObjective: "Wiesz, co zrobić gdy wydasz więcej niż zaplanowałeś w danej kategorii",
      estimatedMinutes: 10,
      introStory:
        "Ola miała budżet: 8 zł na rozrywkę. W środę poszła na kino z przyjaciółką za 12 zł. Wróciła do domu i stwierdziła: 'Przekroczyłam budżet o 4 zł. Koniec świata!' Ale mama powiedziała spokojnie: 'To nie koniec świata. To informacja. Co mówi ci ta informacja i co zrobisz następnym razem?' Ola zastanowiła się. To było ważniejsze niż sama liczba.",
      explanation:
        "Przekroczenie budżetu NIE jest katastrofą — to sygnał. Możesz: 1) Przenieść pieniądze z innej kategorii (np. z 'inne' do 'rozrywki'). 2) Ograniczyć wydatki w tej kategorii przez następny tydzień. 3) Zastanowić się czy budżet w tej kategorii był realistyczny — może trzeba go zwiększyć? 4) Znaleźć tańszą alternatywę (np. kino za bilet ulgowy albo seans popołudniowy). Ważne: nie pożyczaj pieniędzy — szukaj rozwiązania w swoim budżecie.",
      example:
        "Ola: przekroczyła rozrywkę o 4 zł. Decyzja: w przyszłym tygodniu weźmie 4 zł mniej z kategorii 'inne' i doda je do rozrywki. Budżet wyzerowany. Ola też sprawdziła: czy kino musi kosztować 12 zł? Odkryła, że bilety w wtorki kosztują 8 zł — o 4 zł taniej!",
      challenge:
        "Przypomnij sobie sytuację, gdy wydałeś więcej niż miałeś w danej kategorii (albo więcej niż planowałeś). Co było powodem? Co mógłbyś zrobić inaczej następnym razem?",
      summary:
        "Przekroczenie budżetu to informacja, nie porażka — ucz się z niej, dostosuj plan i szukaj rozwiązań wewnątrz swojego budżetu.",
      tags: ["przekroczenie", "budżet", "korekta", "rozwiązania"],
    },
  ],
  quiz: {
    id: "bb2-quiz",
    skillId: "budget-basics-2",
    version: "1.0",
    title: "Quiz: Mój budżet kieszonkowy",
    questions: [
      {
        id: "bb2-q1",
        difficulty: "EASY",
        question: "Jakie są typowe kategorie wydatków w budżecie ucznia?",
        options: [
          "Podatki, rachunki, kredyt, ubezpieczenie",
          "Jedzenie, rozrywka, oszczędności, inne",
          "Złoto, srebro, miedź, brąz",
          "Poniedziałek, wtorek, środa, czwartek",
        ],
        correctIndex: 1,
        explanation:
          "Typowe kategorie dla ucznia to: jedzenie i napoje, rozrywka, oszczędności i inne wydatki. Możesz wymyślić własne — ważne, żeby każdy wydatek miał swoją kategorię.",
      },
      {
        id: "bb2-q2",
        difficulty: "MEDIUM",
        question: "Masz 35 zł. Planujesz: jedzenie 12 zł, rozrywka 10 zł, oszczędności 8 zł. Ile zostanie w kategorii 'inne'?",
        options: ["3 zł", "5 zł", "7 zł", "10 zł"],
        correctIndex: 1,
        explanation:
          "Suma zaplanowanych wydatków: 12+10+8 = 30 zł. Na 'inne' zostaje: 35−30 = 5 zł.",
      },
      {
        id: "bb2-q3",
        difficulty: "MEDIUM",
        question: "Do czego służy arkusz budżetu?",
        options: [
          "Do rysowania wykresów dla szkoły",
          "Do porównania zaplanowanych wydatków z rzeczywistymi",
          "Do przeliczania walut obcych",
          "Do zapisywania listy zakupów w sklepie",
        ],
        correctIndex: 1,
        explanation:
          "Arkusz budżetu porównuje PLAN z RZECZYWISTOŚCIĄ — dzięki temu widzisz, gdzie wydajesz zgodnie z planem, a gdzie go przekraczasz.",
      },
      {
        id: "bb2-q4",
        difficulty: "HARD",
        question: "Kasia miała budżet: rozrywka 10 zł. Wydała 15 zł na kino. Co jest najlepszym rozwiązaniem?",
        options: [
          "Pożyczyć 5 zł od koleżanki i oddać w przyszłym tygodniu",
          "Zabrać 5 zł z innej kategorii (np. 'inne') i zmniejszyć tamtą o tę kwotę",
          "Nie zapisywać tego wydatku i udawać, że nic się nie stało",
          "Zrezygnować z budżetu, bo i tak nie działa",
        ],
        correctIndex: 1,
        explanation:
          "Najlepiej przenieść brakującą kwotę z innej kategorii — to bilansuje budżet bez tworzenia długów. Unikamy pożyczania i ukrywania wydatków.",
      },
      {
        id: "bb2-q5",
        difficulty: "HARD",
        question: "Bartek ma 40 zł tygodniowo. Jego wydatki za ostatnie 4 tygodnie: jedzenie: 14 zł, 11 zł, 16 zł, 13 zł. Jaka jest jego średnia tygodniowa na jedzenie i czy powinien zmienić budżet z 12 zł na jedzenie?",
        options: [
          "Średnia 12 zł — budżet jest idealny",
          "Średnia 13,5 zł — powinien zwiększyć budżet jedzenia do ok. 14 zł",
          "Średnia 15 zł — musi zmniejszyć jedzenie do 10 zł",
          "Nie da się obliczyć bez wiedzenia ile kosztują produkty",
        ],
        correctIndex: 1,
        explanation:
          "Średnia: (14+11+16+13) ÷ 4 = 54 ÷ 4 = 13,5 zł. Budżet 12 zł jest za niski — realistyczniej byłoby zaplanować 14 zł na jedzenie.",
      },
    ],
  },
  missions: [
    {
      id: "bb2-m1",
      skillId: "budget-basics-2",
      version: "1.0",
      order: 1,
      difficulty: "QUICK",
      title: "Stwórz swoje kategorie",
      description: "Wyznacz własne kategorie wydatków pasujące do twojego życia.",
      realLifeTask:
        "Weź kartkę i wypisz wszystko, na co wydajesz pieniądze w ciągu tygodnia. Następnie pogrupuj te rzeczy w max 4 kategorie i nadaj im nazwy (np. 'Głód i pragnienie', 'Zabawa', 'Moja przyszłość', 'Niespodzianki'). Zapisz, ile pieniędzy planujesz na każdą kategorię. Sprawdź czy suma = twoim wpływom.",
      estimatedMinutes: 15,
      successCriteria: "Masz 3–4 nazwane kategorie z przypisanymi kwotami, które sumują się do twoich tygodniowych wpływów.",
    },
    {
      id: "bb2-m2",
      skillId: "budget-basics-2",
      version: "1.0",
      order: 2,
      difficulty: "STANDARD",
      title: "Dwutygodniowy arkusz budżetu",
      description: "Prowadź pełny arkusz budżetu przez dwa tygodnie.",
      realLifeTask:
        "Narysuj w zeszycie tabelkę z kolumnami: Kategoria | Plan zł | Wyd. tydzień 1 | Wyd. tydzień 2 | Różnica. Wypełnij kolumnę Plan. Przez 2 tygodnie codziennie zapisuj wydatki. Na koniec policz różnice — gdzie miałeś nadwyżkę, a gdzie przekroczyłeś plan?",
      estimatedMinutes: 25,
      successCriteria:
        "Masz wypełnioną tabelkę za 2 tygodnie z obliczonymi różnicami i wiesz które kategorie były najtrudniejsze do utrzymania.",
      parentTip:
        "Sprawdzajcie razem arkusz co kilka dni — pomagaj dziecku klasyfikować wydatki do właściwych kategorii.",
    },
    {
      id: "bb2-m3",
      skillId: "budget-basics-2",
      version: "1.0",
      order: 3,
      difficulty: "CHALLENGE",
      title: "Detektyw kategorii — znajdź swojego 'złodzieja budżetu'",
      description: "Przeanalizuj 4 tygodnie wydatków i znajdź kategorię, która 'kradnie' twoje pieniądze.",
      realLifeTask:
        "Przez 4 tygodnie prowadź arkusz budżetu. Po każdym tygodniu zaznacz kolorem, która kategoria cię zaskoczyła (czerwony = przekroczyłem, zielony = zostało mi). Na koniec 4. tygodnia odpowiedz pisemnie: Który tydzień był najlepszy? Która kategoria jest twoim 'złodziejem'? Jak możesz zmniejszyć wydatki w tej kategorii? Co zrobisz z nadwyżką?",
      estimatedMinutes: 50,
      successCriteria:
        "Masz 4 tygodnie kolorowych arkuszy i pisemną analizę z planem poprawy.",
      parentTip:
        "Po 4 tygodniach zorganizujcie 'spotkanie finansowe' rodziny — niech dziecko zaprezentuje swoje wnioski.",
    },
  ],
}

// ─────────────────────────────────────────────────────────────
// budget-basics-3 — Wpływy i wydatki
// ─────────────────────────────────────────────────────────────

export const budgetBasics3: SkillContent = {
  skillId: "budget-basics-3",
  lessons: [
    {
      id: "bb3-l1",
      skillId: "budget-basics-3",
      version: "1.0",
      order: 1,
      title: "Śledź pieniądze jak detektyw",
      learningObjective: "Rozumiesz, dlaczego śledzenie wydatków daje ci wiedzę i kontrolę nad swoimi pieniędzmi",
      estimatedMinutes: 10,
      introStory:
        "Tomek był detektywem. Nie prawdziwym — ale finansowym. Każdą złotówkę, która wchodziła lub wychodziła z jego portfela, zapisywał w małym notatniku. 'Każda złotówka zostawia ślad,' mawiał. 'Moim zadaniem jest ten ślad znaleźć.' Dzięki temu wiedział, że w zeszłym miesiącu wydał aż 47 zł na napoje — tyle, ile kosztuje jego ulubiona gra planszowa. 'Gdybym nie śledził,' powiedział do mamy, 'nigdy bym się tego nie dowiedział.'",
      explanation:
        "Śledzenie pieniędzy to zapisywanie każdej transakcji — kiedy dostałeś pieniądze i kiedy je wydałeś. To jak pamiętnik, ale dla pieniędzy. Dlaczego warto? Bo większość ludzi nie wie, na co naprawdę wydaje pieniądze — są zaskoczeni kiedy ich braknie. Kiedy śledzisz, widzisz wzorce: 'Zawsze za dużo wydaję w piątki' albo 'Napoje to mój nr 1 wydatek'. Ta wiedza daje ci moc zmiany.",
      example:
        "Tydzień Tomka: poniedziałek +20 zł (kieszonkowe), wtorek −3 zł (napój), środa −8 zł (kanapki × 2), czwartek −5 zł (bilet do kina w ramach szkolnej taryfy), piątek −4 zł (słodycze). Suma wpływów: 20 zł. Suma wydatków: 20 zł. Zostało: 0 zł. Tomek: 'Wiem teraz, że słodycze w piątek to zbyteczny wydatek. Zacznę je pomijać.'",
      challenge:
        "Przez jeden dzień śledź KAŻDE pieniądze — wpływy i wydatki. Zapisuj godzinę, kwotę i co to było. Wieczorem zsumuj. Co cię zaskoczyło?",
      summary:
        "Śledzenie wydatków to supermoć finansowa — daje ci wiedzę o własnych nawykach, a wiedza to pierwsza droga do zmiany.",
      tags: ["śledzenie", "wydatki", "nawyki", "wiedza"],
    },
    {
      id: "bb3-l2",
      skillId: "budget-basics-3",
      version: "1.0",
      order: 2,
      title: "Dziennik finansowy — mój osobisty raport",
      learningObjective: "Potrafisz prowadzić prosty dziennik finansowy z codziennymi zapisami",
      estimatedMinutes: 11,
      introStory:
        "Asia dostała od taty mały zeszyt z napisem 'MOJE PIENIĄDZE'. 'Co to?' zapytała. 'Twój dziennik finansowy. Wielcy finansiści prowadzą takie od dziecka,' powiedział tata. Asia była sceptyczna — to brzmiało nudno. Ale po tygodniu prowadzenia dziennika zobaczyła coś niesamowitego: w każdą środę wydawała więcej niż w inne dni. 'To przez sklepik szkolny w środy — mają wtedy nowe lody!' odkryła. To była jej własna, prawdziwa odkryta wiedza o sobie.",
      explanation:
        "Dziennik finansowy to codzienne zapisywanie trzech rzeczy: data, opis (co kupiłem lub skąd dostałem), kwota (+wpływ lub −wydatek). Możesz użyć: zeszytu, kartki, specjalnej rubryki w kalendarzu. Kluczowe jest: regularność (codziennie wieczorem, 2 minuty!), szczerość (zapisuj WSZYSTKO, nawet 50 groszy na gumę), kompletność (nie pomijaj żadnej transakcji).",
      example:
        "Dziennik Asi, środa: 06:30 +20 zł kieszonkowe od mamy. 11:00 −5 zł lody w sklepiku. 13:00 −3 zł sok. 15:30 −2 zł guma do żucia. 18:00 −8 zł bilet do kina z koleżanką. Suma dnia: +20 zł wpływy, −18 zł wydatki. Zostało: 2 zł. Wniosek: środa to drogi dzień!",
      challenge:
        "Zacznij dziennik finansowy już dziś. Weź zeszyt lub kartkę. Zapisz wszystkie transakcje z dzisiaj. Wieczorem zsumuj wpływy i wydatki. Jaki jest wynik?",
      summary:
        "Dziennik finansowy to 2 minuty dziennie, które dają ci pełny obraz swoich pieniędzy — mały wysiłek, wielka wiedza.",
      tags: ["dziennik", "finansowy", "codziennie", "zapiski"],
    },
    {
      id: "bb3-l3",
      skillId: "budget-basics-3",
      version: "1.0",
      order: 3,
      title: "Bilans — wpływy minus wydatki",
      learningObjective: "Potrafisz obliczyć tygodniowy bilans finansowy i wiedzieć co on oznacza",
      estimatedMinutes: 12,
      introStory:
        "Pani matematyki pokazała klasie proste równanie: BILANS = WPŁYWY − WYDATKI. 'Jak bilans jest dodatni — masz oszczędności. Jak ujemny — masz problem.' Filip spojrzał na swój zeszyt. Policzył: wpływy 30 zł, wydatki 35 zł. Bilans: −5 zł. 'Ale... skąd wziąłem te 5 zł?' zapytał sam siebie. Potem przypomniał sobie — pożyczył od starszego brata. 'O nie,' mruknął. 'Mam dług.'",
      explanation:
        "Bilans to matematyczne serce twojego budżetu. Liczymy go tak: Bilans = suma wpływów − suma wydatków. Jeśli bilans jest: DODATNI (+) — świetnie! Masz nadwyżkę, możesz odkładać. ZEROWY (0) — OK, ale nie oszczędzasz. Warto przesunąć coś do oszczędności. UJEMNY (−) — uwaga! Wydajesz więcej niż masz. Musisz znaleźć przyczynę i ją naprawić. Bilans ujemny oznacza, że skądś pożyczyłeś — od rodziny, ze skarbonki, lub będziesz musiał prosić o pieniądze.",
      example:
        "Filip, tydzień 2 (po odkryciu długu). Wpływy: kieszonkowe 25 zł + zarobione 5 zł za sprzątanie = 30 zł. Wydatki: jedzenie 10 zł + rozrywka 8 zł + dług do oddania 5 zł + oszczędności 5 zł = 28 zł. Bilans: 30−28 = +2 zł. 'Jestem na plusie i spłaciłem dług!' — powiedział Filip z ulgą.",
      challenge:
        "Policz swój bilans za ostatni tydzień. Zsumuj wszystkie wpływy. Zsumuj wszystkie wydatki. Odejmij. Jaki masz wynik? Co mówi ci ta liczba?",
      summary:
        "Bilans to twój finansowy wynik — liczba, która mówi czy jesteś na plusie, zero, czy na minusie. Celem jest zawsze dodatni bilans.",
      tags: ["bilans", "wpływy", "wydatki", "obliczenia"],
    },
  ],
  quiz: {
    id: "bb3-quiz",
    skillId: "budget-basics-3",
    version: "1.0",
    title: "Quiz: Wpływy i wydatki",
    questions: [
      {
        id: "bb3-q1",
        difficulty: "EASY",
        question: "Co to jest bilans finansowy?",
        options: [
          "Kwota pieniędzy w portfelu na początku miesiąca",
          "Wynik odejmowania wydatków od wpływów",
          "Suma wszystkich zakupów zrobionych w tygodniu",
          "Ilość kategorii w budżecie",
        ],
        correctIndex: 1,
        explanation:
          "Bilans = wpływy − wydatki. Dodatni bilans oznacza oszczędności, ujemny oznacza, że wydałeś więcej niż miałeś.",
      },
      {
        id: "bb3-q2",
        difficulty: "MEDIUM",
        question: "Ania miała wpływy 45 zł i wydatki 38 zł. Jaki jest jej bilans i co oznacza?",
        options: [
          "−7 zł, Ania ma dług",
          "+7 zł, Ania ma nadwyżkę którą może odłożyć",
          "0 zł, Ania wydała tyle samo ile zarobiła",
          "+83 zł, suma wpływów i wydatków",
        ],
        correctIndex: 1,
        explanation:
          "Bilans = 45 − 38 = +7 zł. Dodatni bilans to nadwyżka — Ania ma 7 zł, które może odłożyć do skarbonki.",
      },
      {
        id: "bb3-q3",
        difficulty: "MEDIUM",
        question: "Dlaczego warto codziennie prowadzić dziennik finansowy?",
        options: [
          "Bo nauczyciel tego wymaga do oceny",
          "Bo pomaga to odkryć własne nawyki wydatkowe i kontrolować pieniądze",
          "Bo bez dziennika bank nie da konta",
          "Bo pieniądze się psuję gdy ich nie zapisujemy",
        ],
        correctIndex: 1,
        explanation:
          "Dziennik finansowy pokazuje wzorce: kiedy i na co wydajesz. Ta wiedza daje ci moc, by zmieniać nawyki i lepiej planować.",
      },
      {
        id: "bb3-q4",
        difficulty: "HARD",
        question: "Przez tydzień Marek zapisał: wpływy: 30 zł kieszonkowe. Wydatki: pon 4 zł, wt 0 zł, śr 8 zł, czw 3 zł, pt 7 zł, sob 5 zł, niedz 6 zł. Jaki jest jego bilans i czy powinien być zadowolony?",
        options: [
          "Bilans −3 zł — Marek wydał za dużo, ma dług",
          "Bilans +3 zł — Marek jest na plusie, to dobrze",
          "Bilans 0 zł — Marek wydał dokładnie tyle ile miał",
          "Bilans +30 zł — Marek nic nie wydał",
        ],
        correctIndex: 1,
        explanation:
          "Suma wydatków: 4+0+8+3+7+5+6 = 33 zł. Wpływy: 30 zł. Czekaj — 33 > 30, więc bilans = 30−33 = −3 zł! Marek wydał za dużo. Prawidłowa odpowiedź to opcja A. Uwaga na pułapkę dodawania!",
      },
      {
        id: "bb3-q5",
        difficulty: "HARD",
        question: "Kasia chce mieć zawsze dodatni bilans tygodniowy minimum 10 zł. Ma 50 zł wpływów. Ile maksymalnie może wydać?",
        options: ["40 zł", "50 zł", "60 zł", "10 zł"],
        correctIndex: 0,
        explanation:
          "Kasia chce: bilans ≥ +10 zł. Bilans = wpływy − wydatki. 10 ≤ 50 − wydatki. Więc wydatki ≤ 50 − 10 = 40 zł. Maksymalne wydatki to 40 zł.",
      },
    ],
  },
  missions: [
    {
      id: "bb3-m1",
      skillId: "budget-basics-3",
      version: "1.0",
      order: 1,
      difficulty: "QUICK",
      title: "Dzień śledzenia pieniędzy",
      description: "Przez jeden dzień śledź każdą transakcję finansową.",
      realLifeTask:
        "Weź małą kartkę lub notatnik. Przez cały dzień zapisuj: każdą złotówkę, która wchodzi do twojego portfela (wpływ) i każdą, która wychodzi (wydatek). Wieczorem policz bilans dnia. Napisz jedno zdanie: 'Największe zaskoczenie dziś to było...'",
      estimatedMinutes: 10,
      successCriteria:
        "Masz zapisane wszystkie transakcje z jednego dnia i policzony bilans dzienny z wnioskiem.",
    },
    {
      id: "bb3-m2",
      skillId: "budget-basics-3",
      version: "1.0",
      order: 2,
      difficulty: "STANDARD",
      title: "Tydzień z dziennikiem finansowym",
      description: "Przez 7 dni prowadź codzienne zapiski finansowe i licz bilans.",
      realLifeTask:
        "Przygotuj zeszyt jako dziennik finansowy. Każdego wieczoru (max 5 minut!) zapisz wszystkie wpływy i wydatki z tego dnia. Na koniec każdego dnia oblicz bilans dzienny. W niedzielę zsumuj cały tydzień: łączne wpływy, łączne wydatki, bilans tygodniowy. Który dzień tygodnia był najdroższy?",
      estimatedMinutes: 25,
      successCriteria:
        "Masz dziennik z 7 dniami zapisów i obliczonym bilansem tygodniowym. Wiesz, który dzień był najdroższy.",
      parentTip:
        "Przypomnij dziecku o dzienniku wieczorem. Możesz zapytać: 'Co dziś wpisałeś?' — to buduje nawyk.",
    },
    {
      id: "bb3-m3",
      skillId: "budget-basics-3",
      version: "1.0",
      order: 3,
      difficulty: "CHALLENGE",
      title: "Miesięczny raport finansowy",
      description: "Przez miesiąc śledź pieniądze i przygotuj własny raport finansowy.",
      realLifeTask:
        "Przez 4 tygodnie prowadź dziennik finansowy. Co tydzień oblicz bilans tygodniowy. Na koniec miesiąca przygotuj 'Raport finansowy' na jednej kartce: łączne wpływy, łączne wydatki, bilans miesięczny, 3 największe wydatki, najlepszy tydzień (największy dodatni bilans), co nauczyłem się o swoich nawykach finansowych. Pokaż raport rodzicom.",
      estimatedMinutes: 50,
      successCriteria:
        "Masz 4 tygodnie dziennika i jednostronicowy raport finansowy z analizą miesiąca.",
      parentTip:
        "Wysłuchaj raportu dziecka jak ważnej prezentacji. Zadaj pytania: 'Co cię zaskoczyło? Co zmienisz?' Pochwal konkretne wnioski.",
    },
  ],
}
