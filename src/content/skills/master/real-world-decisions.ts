import type { SkillContent } from "../../types"

// ─────────────────────────────────────────────────────────────
// real-world-decisions-1 — Kredyt — kiedy, czy i jak?
// ─────────────────────────────────────────────────────────────

export const realWorldDecisions1: SkillContent = {
  skillId: "real-world-decisions-1",
  lessons: [
    {
      id: "rwd1-l1",
      skillId: "real-world-decisions-1",
      version: "1.0",
      order: 1,
      title: "Rodzaje kredytów i czym się różnią",
      learningObjective:
        "Znasz podstawowe rodzaje kredytów i rozumiesz, do czego każdy jest przeznaczony",
      estimatedMinutes: 20,
      introStory:
        "Kiedy Marta skończyła 18 lat, co tydzień dostawała do skrzynki pocztowej oferty kredytów gotówkowych, kart kredytowych i 'szybkich pożyczek'. Kolorowe broszury obiecywały 'pieniądze od ręki' i 'zero formalności'. Nikt jej nie wyjaśnił, że za każdą z tych ofert kryje się inny mechanizm — i że niektóre z nich mogą zniszczyć finanse na lata, podczas gdy inne są użytecznymi narzędziami, jeśli używa się ich mądrze.",
      explanation:
        "Kredyt to umowa, w której pożyczasz pieniądze od instytucji finansowej i zobowiązujesz się je zwrócić z odsetkami w określonym czasie. Istnieje kilka podstawowych rodzajów. Kredyt konsumpcyjny (gotówkowy) — pożyczasz określoną kwotę (np. 5000–50 000 zł) na dowolny cel: zakup sprzętu, remont, wyjazd. Spłacasz w miesięcznych ratach przez 1–10 lat. Oprocentowanie zazwyczaj wyższe niż przy kredycie hipotecznym. Karta kredytowa — bank daje ci limit (np. 3000 zł), z którego możesz korzystać. Jeśli spłacisz całość przed końcem okresu bezodsetkowego (zwykle 30–54 dni), nie płacisz odsetek. Jeśli spłacasz tylko minimum — odsetki rosną i mogą być bardzo wysokie (20–30% rocznie). Kredyt hipoteczny — duży kredyt (zazwyczaj setki tysięcy złotych) na zakup nieruchomości, zabezpieczony hipoteką na tej nieruchomości. Spłacany przez 20–35 lat. Niższe oprocentowanie, ale ogromna suma odsetek przez cały okres. Kredyt studencki — przeznaczony na finansowanie studiów. W Polsce dostępne są kredyty studenckie z dopłatą państwa (Bank Gospodarstwa Krajowego) — zazwyczaj na preferencyjnych warunkach, spłacane po ukończeniu studiów. Chwilówki i pożyczki pozabankowe — bardzo wysokie oprocentowanie i RRSO, często setki lub tysiące procent w skali roku. To najdroższy rodzaj finansowania — unikaj ich jak ognia.",
      example:
        "Porównanie: Tomek pożycza 5000 zł. Kredyt bankowy na 2 lata, oprocentowanie 12% rocznie → zapłaci łącznie około 5600 zł. Karta kredytowa, spłaca minimum przez 2 lata, oprocentowanie 25% → zapłaci łącznie około 6600 zł. Chwilówka na 2 lata z RRSO 200% → zapłaci... kilkanaście tysięcy złotych. Te same 5000 zł, zupełnie inne koszty w zależności od rodzaju kredytu.",
      challenge:
        "Poszukaj w internecie przykładu oferty kredytu gotówkowego i oferty chwilówki. Porównaj: oprocentowanie nominalne, RRSO, całkowity koszt kredytu. Jaką różnicę widzisz?",
      summary:
        "Kredyt to narzędzie — może być użyteczny (hipoteka, kredyt studencki) lub bardzo kosztowny (chwilówki). Kluczem jest rozumienie rodzaju kredytu i jego kosztów, zanim podpiszesz cokolwiek.",
      tags: ["kredyt", "kredyt konsumpcyjny", "hipoteka", "karta kredytowa", "chwilówka", "RRSO"],
    },
    {
      id: "rwd1-l2",
      skillId: "real-world-decisions-1",
      version: "1.0",
      order: 2,
      title: "Oprocentowanie i RRSO — jak odczytać prawdziwy koszt",
      learningObjective:
        "Potrafisz odróżnić oprocentowanie nominalne od RRSO i obliczyć przybliżony całkowity koszt kredytu",
      estimatedMinutes: 22,
      introStory:
        "Reklama krzyczy: 'Kredyt od 6,9%!' Brzmi tanio? Ale drobnym drukiem pod spodem: 'RRSO 23,4%'. Większość ludzi nie wie, co to znaczy i bierze kredyt, myśląc, że zapłaci 6,9% odsetek. To jedna z największych finansowych pułapek, w jaką wpadają nieświadomi konsumenci. Zrozumienie RRSO może uratować cię od przepłacania tysięcy złotych.",
      explanation:
        "Oprocentowanie nominalne to procentowa cena pożyczonego kapitału w skali roku. Problem: nie uwzględnia wszystkich dodatkowych kosztów (prowizji, ubezpieczeń, opłat administracyjnych). RRSO — Rzeczywista Roczna Stopa Oprocentowania — to wskaźnik, który uwzględnia WSZYSTKIE koszty kredytu: odsetki, prowizję, ubezpieczenia, opłaty. RRSO to jedyna liczba, która mówi ci, ile naprawdę kosztuje kredyt. Zawsze porównuj RRSO, nie oprocentowanie nominalne. Jak obliczyć całkowity koszt kredytu? Wzór uproszczony: jeśli pożyczasz kwotę K na n miesięcy przy miesięcznej racie R, to całkowity koszt = R × n. Różnica między całkowitym kosztem a kwotą pożyczki = całkowity koszt finansowania. Przykład: pożyczasz 10 000 zł, rata 450 zł, 30 rat. Całkowity koszt: 450 × 30 = 13 500 zł. Koszt finansowania: 13 500 − 10 000 = 3500 zł. Warto się też zainteresować zdolnością kredytową — to ocena, czy bank uzna, że będziesz w stanie spłacić kredyt. Banki sprawdzają: historię kredytową (BIK — Biuro Informacji Kredytowej), dochody, inne zobowiązania. Dobra historia kredytowa = niższe oprocentowanie. Zła lub brak historii = wyższe.",
      example:
        "Porównanie dwóch ofert kredytu na 8000 zł, 24 miesiące: Oferta A: oprocentowanie 9,9%, prowizja 3%, ubezpieczenie obowiązkowe. RRSO: 18,7%. Rata: 385 zł. Całkowity koszt: 385×24 = 9240 zł. Koszt finansowania: 1240 zł. Oferta B: oprocentowanie 6,9%, brak prowizji, brak ubezpieczenia. RRSO: 7,2%. Rata: 360 zł. Całkowity koszt: 360×24 = 8640 zł. Koszt finansowania: 640 zł. Wniosek: Oferta B jest tańsza prawie dwukrotnie, mimo że oferta A ma tylko o 3% wyższe oprocentowanie nominalne.",
      challenge:
        "Znajdź w internecie kalkulator kredytowy (wiele banków udostępnia je na swoich stronach). Wprowadź kwotę 5000 zł, okres 12 miesięcy i dwa różne RRSO: 10% i 30%. Oblicz, o ile złotych tańszy jest kredyt z niższym RRSO. Zapisz wyniki.",
      summary:
        "RRSO to jedyna miara, która pokazuje prawdziwy koszt kredytu — zawsze porównuj oferty po RRSO, nie po oprocentowaniu nominalnym. Całkowity koszt to rata × liczba rat.",
      tags: ["RRSO", "oprocentowanie", "kredyt", "koszt finansowania", "kalkulator kredytowy", "BIK"],
    },
    {
      id: "rwd1-l3",
      skillId: "real-world-decisions-1",
      version: "1.0",
      order: 3,
      title: "Kiedy kredyt jest narzędziem, a kiedy pułapką",
      learningObjective:
        "Potrafisz ocenić, czy branie kredytu w danej sytuacji jest uzasadnione, i znasz mechanizm spirali długu",
      estimatedMinutes: 18,
      introStory:
        "Adrian wziął kredyt gotówkowy na remont łazienki — to podwyższyło wartość mieszkania i było rozsądną inwestycją w nieruchomość. Jego kuzyn wziął kredyt na markowe buty i konsolę do gier — dwa lata spłacał zakupy, które już dawno przestały sprawiać mu radość. Jeden kredyt był narzędziem. Drugi — pułapką. Czym się różniły?",
      explanation:
        "Kredyt jako narzędzie — kiedy może mieć sens: kupujesz coś, co zwiększa twoje dochody lub wartość majątku (kredyt hipoteczny na mieszkanie, które będziesz wynajmować); finansujesz pilną, nagłą potrzebę, której nie możesz pokryć z oszczędności, a alternatywą jest coś gorszego; kredyt studencki na edukację, która realnie zwiększy twoje zarobki. Kredyt jako pułapka — kiedy jest złym wyborem: finansujesz wydatki konsumpcyjne — jedzenie, ubrania, rozrywkę, wakacje; kupujesz coś, co szybko traci wartość (elektronika, samochód na kredyt bez potrzeby); nie masz pewności, że będziesz w stanie spłacać raty; twoja rata to więcej niż 20-30% twojego miesięcznego dochodu. Spirala długu — najniebezpieczniejszy scenariusz: bierzesz kredyt, nie możesz spłacić raty, bierzesz drugi kredyt żeby spłacić pierwszy, odsetki od dwóch kredytów rosną, bierzesz trzeci... Żelazne zasady kredytobiorcy: (1) Nigdy nie bierz kredytu, żeby spłacić inny kredyt — szukaj restrukturyzacji lub pomocy doradczej. (2) Rata kredytu nie powinna przekraczać 30% miesięcznego dochodu netto. (3) Przed podpisaniem umowy zawsze sprawdź RRSO i całkowity koszt. (4) Miej fundusz awaryjny zanim zaciągniesz kredyt — żeby nagłe wydatki nie zatrzymały spłat.",
      example:
        "Dwa scenariusze. Scenariusz A (narzędzie): Kasia zarabia 4000 zł netto, ma fundusz awaryjny 12 000 zł, bierze kredyt hipoteczny 200 000 zł na 25 lat, rata 1100 zł = 27,5% dochodu. Kupuje mieszkanie zamiast płacić czynsz. Scenariusz B (pułapka): Bartek zarabia 2200 zł netto, nie ma oszczędności, bierze kredyt konsumpcyjny 8000 zł na telefon i wakacje, rata 450 zł = 20% dochodu. Pół roku później traci pracę. Nie może spłacać raty. Bank nalicza odsetki karne. Bartek wpada w spiralę.",
      challenge:
        "Oceń trzy hipotetyczne decyzje kredytowe i zaklasyfikuj każdą jako 'narzędzie' lub 'pułapka': (1) Student bierze kredyt studencki z dopłatą państwa na opłatę za studia medyczne. (2) Osoba zarabiająca 2000 zł bierze chwilówkę na 1500 zł na wakacje all-inclusive. (3) Młoda para bierze kredyt hipoteczny na mieszkanie, rata = 35% ich łącznych dochodów, mają fundusz awaryjny. Uzasadnij każdą odpowiedź.",
      summary:
        "Kredyt to narzędzie, gdy finansuje coś, co ma sens ekonomicznie i mieści się w twoim budżecie. Staje się pułapką, gdy finansuje konsumpcję lub prowadzi do spirali zadłużenia.",
      tags: ["kredyt", "spirala długu", "pułapka zadłużenia", "zasady kredytobiorcy", "raty"],
    },
  ],
  quiz: {
    id: "rwd1-quiz",
    skillId: "real-world-decisions-1",
    version: "1.0",
    title: "Quiz: Kredyt — kiedy, czy i jak?",
    questions: [
      {
        id: "rwd1-q1",
        difficulty: "EASY",
        question: "Co to jest RRSO?",
        options: [
          "Roczny Rachunek Składek i Opłat",
          "Rzeczywista Roczna Stopa Oprocentowania — uwzględnia wszystkie koszty kredytu",
          "Rejestr Rzetelnych Spłat Obowiązków",
          "Oprocentowanie nominalne podane w ujęciu rocznym",
        ],
        correctIndex: 1,
        explanation:
          "RRSO (Rzeczywista Roczna Stopa Oprocentowania) uwzględnia wszystkie koszty kredytu: odsetki, prowizje, ubezpieczenia i opłaty. To jedyna miara pozwalająca uczciwie porównać oferty różnych kredytodawców.",
      },
      {
        id: "rwd1-q2",
        difficulty: "MEDIUM",
        question:
          "Bierzesz kredyt 6000 zł. Rata wynosi 280 zł, spłacasz przez 24 miesiące. Ile wynosi całkowity koszt finansowania (odsetki + opłaty)?",
        options: ["720 zł", "1080 zł", "672 zł", "840 zł"],
        correctIndex: 1,
        explanation:
          "Całkowity koszt spłaty: 280 × 24 = 6720 zł. Koszt finansowania: 6720 − 6000 = 720 zł. Zaraz — sprawdź ponownie: 280 × 24 = 6720. 6720 − 6000 = 720 zł. Prawidłowa odpowiedź to 720 zł.",
      },
      {
        id: "rwd1-q3",
        difficulty: "MEDIUM",
        question: "Który z poniższych powodów jest DOBRYM uzasadnieniem wzięcia kredytu?",
        options: [
          "Chcę kupić markowe sneakersy limitowanej edycji, zanim się wyprzedadzą",
          "Chcę pojechać na wakacje all-inclusive, bo znajomi też jadą",
          "Potrzebuję kredytu studenckiego z dopłatą państwa na czesne za studia medyczne",
          "Chcę kupić nowy telefon, bo stary ma już 2 lata",
        ],
        correctIndex: 2,
        explanation:
          "Kredyt studencki na czesne za studia o wysokim potencjale zarobkowym to inwestycja w przyszłość — ma sens ekonomiczny. Pozostałe przykłady to finansowanie konsumpcji lub dóbr szybko tracących wartość.",
      },
      {
        id: "rwd1-q4",
        difficulty: "HARD",
        question:
          "Czym jest 'spirala długu' i który scenariusz ją opisuje?",
        options: [
          "Branie kolejnych kredytów, żeby spłacić poprzednie — odsetki rosną szybciej niż możliwość spłaty",
          "Sytuacja, gdy bank automatycznie podnosi oprocentowanie co roku",
          "Stan, gdy masz więcej niż jeden kredyt w różnych bankach jednocześnie",
          "Mechanizm, gdzie rata spada o 5% co kwartał dzięki dobrej historii kredytowej",
        ],
        correctIndex: 0,
        explanation:
          "Spirala długu to pułapka, w której bierzesz nowy kredyt, żeby spłacić stary. Odsetki i opłaty rosną szybciej niż twoje możliwości spłaty, co prowadzi do coraz głębszego zadłużenia.",
      },
      {
        id: "rwd1-q5",
        difficulty: "HARD",
        question:
          "Karolina zarabia 3000 zł netto. Ma kredyt gotówkowy (rata 500 zł) i kartę kredytową z zadłużeniem 2000 zł (minimalna rata 100 zł). Łączna rata: 600 zł = 20% dochodu. Teraz chce wziąć kolejny kredyt na 400 zł miesięcznie. Jakie będzie jej łączne obciążenie ratami i czy to przekroczy bezpieczną granicę 30%?",
        options: [
          "1000 zł = 33,3% — przekracza bezpieczną granicę 30%",
          "800 zł = 26,7% — mieści się w granicy",
          "900 zł = 30% — dokładnie na granicy, jeszcze bezpiecznie",
          "700 zł = 23,3% — bezpieczne",
        ],
        correctIndex: 0,
        explanation:
          "600 + 400 = 1000 zł rat miesięcznie. 1000 ÷ 3000 = 33,3% — przekracza bezpieczny próg 30%. Karolina powinna najpierw spłacić kartę kredytową, zanim zaciągnie nowy kredyt.",
      },
    ],
  },
  missions: [
    {
      id: "rwd1-m1",
      skillId: "real-world-decisions-1",
      version: "1.0",
      order: 1,
      difficulty: "QUICK",
      title: "Analiza oferty kredytowej",
      description:
        "Przejrzyj prawdziwą ofertę kredytu i zidentyfikuj kluczowe informacje.",
      realLifeTask:
        "Znajdź w internecie ofertę kredytu gotówkowego dowolnego banku (szukaj 'kalkulator kredytu gotówkowego'). Zanotuj: kwotę kredytu, okres spłaty, oprocentowanie nominalne, RRSO, miesięczną ratę, całkowitą kwotę do spłaty, całkowity koszt finansowania (całkowita kwota minus pożyczona kwota). Oceń ofertę: czy jest uczciwa? Czy widzisz ukryte koszty?",
      estimatedMinutes: 20,
      successCriteria:
        "Masz zapisane wszystkie 7 elementów oferty i pisemną ocenę (uczciwa/nieuczciwa, z uzasadnieniem).",
    },
    {
      id: "rwd1-m2",
      skillId: "real-world-decisions-1",
      version: "1.0",
      order: 2,
      difficulty: "STANDARD",
      title: "Porównanie dwóch ofert kredytowych",
      description:
        "Porównaj dwie oferty kredytu i wybierz korzystniejszą, uzasadniając decyzję.",
      realLifeTask:
        "Wybierz hipotetyczną potrzebę: np. 5000 zł na laptop. Znajdź dwie oferty kredytów (raty, oprocentowanie, RRSO, okres) w dwóch różnych bankach lub użyj kalkulatora kredytowego z dwoma różnymi RRSO (np. 10% i 20%). Dla każdej oferty oblicz: miesięczną ratę, całkowity koszt spłaty, koszt finansowania. Stwórz tabelę porównawczą i wskaż, która oferta jest lepsza i dlaczego.",
      estimatedMinutes: 35,
      successCriteria:
        "Masz tabelę z porównaniem dwóch ofert i pisemne uzasadnienie wyboru korzystniejszej.",
      parentTip:
        "Możesz podzielić się swoim doświadczeniem z kredytami — co byś dziś zrobił/a inaczej? To prawdziwa nauka przez doświadczenie.",
    },
    {
      id: "rwd1-m3",
      skillId: "real-world-decisions-1",
      version: "1.0",
      order: 3,
      difficulty: "CHALLENGE",
      title: "Stwórz swój kodeks kredytobiorcy",
      description:
        "Na podstawie zdobytej wiedzy napisz własne zasady dotyczące brania kredytów.",
      realLifeTask:
        "Napisz swój osobisty 'Kodeks kredytobiorcy' — dokument, który pomoże ci w przyszłości podejmować dobre decyzje kredytowe. Zawrzyj: (1) Kiedy NIE wezmę kredytu — lista sytuacji, które dla ciebie są 'czerwoną flagą'. (2) Kiedy kredyt MOŻE mieć sens — twoje kryteria. (3) Moje zasady porównywania ofert (minimalne 3 zasady). (4) Mój limit raty jako procent dochodu. (5) Mój plan na sytuację awaryjną, gdy nie mogę spłacić raty. Kodeks powinien być co najmniej jedną stroną A4.",
      estimatedMinutes: 50,
      successCriteria:
        "Masz pisemny kodeks z co najmniej 5 punktami i każdy punkt jest konkretny, a nie ogólnikowy.",
    },
  ],
}

// ─────────────────────────────────────────────────────────────
// real-world-decisions-2 — Własna firma — podstawy
// ─────────────────────────────────────────────────────────────

export const realWorldDecisions2: SkillContent = {
  skillId: "real-world-decisions-2",
  lessons: [
    {
      id: "rwd2-l1",
      skillId: "real-world-decisions-2",
      version: "1.0",
      order: 1,
      title: "Formy działalności w Polsce — co wybrać i kiedy",
      learningObjective:
        "Znasz podstawowe formy działalności gospodarczej w Polsce i rozumiesz różnicę między JDG a spółką",
      estimatedMinutes: 20,
      introStory:
        "Kacper (17 lat) robi świetne strony internetowe. Klienci są zadowoleni, polecają go dalej, a pieniędzy jest coraz więcej. Pewnego dnia znajomy powiedział: 'Stary, ale czy ty to robisz legalnie? Nie powinieneś mieć firmy?' Kacper nie wiedział. I właśnie tu zaczyna się ważna lekcja: nawet jako nastolatek możesz prowadzić działalność zarobkową — legalnie. Pytanie tylko: w jakiej formie.",
      explanation:
        "W Polsce istnieje kilka form prowadzenia działalności gospodarczej. Jednoosobowa Działalność Gospodarcza (JDG) — najprostsza forma. Rejestrujesz się w CEIDG (Centralnej Ewidencji i Informacji o Działalności Gospodarczej) w internecie, bezpłatnie. Płacisz podatek dochodowy i składki ZUS. Odpowiadasz za długi firmy całym swoim majątkiem. Idealna na start i do małej skali działalności. Spółka z ograniczoną odpowiedzialnością (sp. z o.o.) — bardziej skomplikowana, wymaga kapitału zakładowego (min. 5000 zł), rejestracji w KRS (Krajowy Rejestr Sądowy). Wspólnicy odpowiadają tylko do wysokości wkładów — ich majątek prywatny jest chroniony. Lepsza przy wyższych obrotach i kiedy ryzyko jest większe. Spółka cywilna — umowa między co najmniej dwoma osobami, prowadzącymi wspólnie działalność. Każdy jest JDG. Spółka jawna, komandytowa — dla bardziej zaawansowanych przedsięwzięć. Dla nastolatka najważniejsze: jako osoba niepełnoletnia (do 18. roku życia) nie możesz samodzielnie zarejestrować JDG — potrzebujesz zgody i reprezentacji przez rodziców lub opiekuna prawnego. Ale możesz legalnie świadczyć usługi przez umowy cywilnoprawne.",
      example:
        "Porównanie: Monika (19 lat) rejestruje JDG jako fotografka eventowa. Płaci ZUS (~400–600 zł/miesiąc w pierwszych latach na preferencyjnych składkach 'mały ZUS na start') i podatek dochodowy od dochodu. Nie potrzebuje kapitału zakładowego. Rejestracja zajmuje 15 minut online. Jej starszy brat zakłada sp. z o.o. do obsługi większych kontraktów IT — potrzebuje notariusza, 5000 zł kapitału, wpisu do KRS (trwa tygodnie). Ale jest chroniony przed odpowiedzialnością osobistą.",
      challenge:
        "Dowiedz się, czym jest CEIDG i KRS. Wejdź na stronę ceidg.gov.pl i przejrzyj, jak wygląda formularz rejestracji JDG. Jakich danych się wymaga? Jakie są koszty? Zapisz 5 faktów, które cię zdziwiły lub zaciekawiły.",
      summary:
        "JDG to najprostsza forma działalności — rejestracja online, brak kapitału zakładowego, ale pełna odpowiedzialność majątkiem. Spółka z o.o. chroni majątek prywatny, ale jest bardziej skomplikowana. Jako nastolatek możesz legalnie zarabiać przez umowy zlecenie lub dzieło.",
      tags: ["JDG", "spółka z o.o.", "KRS", "CEIDG", "działalność gospodarcza", "przedsiębiorczość"],
    },
    {
      id: "rwd2-l2",
      skillId: "real-world-decisions-2",
      version: "1.0",
      order: 2,
      title: "ZUS, VAT i podatki dla przedsiębiorcy",
      learningObjective:
        "Rozumiesz, co to jest ZUS, kiedy płaci się VAT i jak działają podstawowe obowiązki podatkowe przedsiębiorcy",
      estimatedMinutes: 22,
      introStory:
        "Julia otworzyła JDG i przez pierwsze trzy miesiące była zachwycona. Zarabiała 4000 zł miesięcznie. Potem przyszły pierwsze faktury od ZUS i US — i okazało się, że z tych 4000 zł znacznie mniej jest 'jej'. Nikt jej wcześniej nie wytłumaczył, że bycie przedsiębiorcą to nie tylko przychody, ale też obowiązki. Lepiej to wiedzieć zanim się zaczyna, niż potem być zaskoczonym.",
      explanation:
        "Jako przedsiębiorca (JDG) masz trzy główne rodzaje zobowiązań. ZUS (Zakład Ubezpieczeń Społecznych) — płacisz składki na ubezpieczenie emerytalne, rentowe, chorobowe i zdrowotne. Dla nowych przedsiębiorców przez pierwsze 6 miesięcy można korzystać z 'ulgi na start' (brak składek społecznych). Potem przez 24 miesiące — 'mały ZUS' (składki od minimalnej podstawy). Składka zdrowotna jest obowiązkowa od pierwszego dnia. Podatek dochodowy — jako JDG możesz wybrać formę opodatkowania: skala podatkowa (12%/32% — jak PIT), podatek liniowy (19% od całego dochodu bez progów), ryczałt od przychodów ewidencjonowanych (stała stawka od przychodu, bez odliczania kosztów — prosta księgowość). VAT (Podatek od Towarów i Usług) — nie każdy przedsiębiorca musi być vatowcem. Jeśli twoje roczne przychody nie przekraczają 200 000 zł, możesz być zwolniony z VAT — i to jest atrakcyjna opcja na start, bo mniej formalności. Gdy przekroczysz ten próg lub dobrowolnie się zarejestrujesz — musisz wystawiać faktury VAT (najczęściej 23%) i co miesiąc lub kwartał rozliczać się z Urzędem Skarbowym. Ważne pojęcia: przychód = pieniądze, które wpłynęły do firmy; koszt uzyskania przychodu = wydatki firmowe (laptop, oprogramowanie, materiały — zmniejszają podstawę opodatkowania); dochód = przychód minus koszty; podatek = dochód × stawka.",
      example:
        "Bartek prowadzi JDG (grafik). W marcu zarobił 6000 zł (przychód). Kupił tablet za 1500 zł i oprogramowanie za 500 zł (koszty). Dochód: 6000 − 2000 = 4000 zł. Podatek liniowy 19%: 4000 × 0,19 = 760 zł. Do tego składka zdrowotna ~400 zł. Łącznie do zapłacenia: 1160 zł. Na rękę zostaje: 6000 − 2000 (koszty) − 1160 (podatek + ZUS) = 2840 zł. Plus ewentualny mały ZUS, jeśli go opłaca.",
      challenge:
        "Wejdź na stronę ZUS (zus.pl) i sprawdź, jaka jest aktualna wysokość składki zdrowotnej dla przedsiębiorców i co to jest 'ulga na start'. Oblicz: gdybyś zarabiał 3000 zł miesięcznie jako freelancer, ile musiałbyś zapłacić składki zdrowotnej? (Sprawdź aktualną stawkę na stronie ZUS.)",
      summary:
        "Przedsiębiorca płaci ZUS (składki ubezpieczeniowe), podatek dochodowy (od dochodu = przychód minus koszty) i ewentualnie VAT. Ulga na start i mały ZUS pomagają nowym przedsiębiorcom przez pierwsze 2,5 roku.",
      tags: ["ZUS", "VAT", "podatek liniowy", "ryczałt", "JDG", "koszty uzyskania przychodu"],
    },
    {
      id: "rwd2-l3",
      skillId: "real-world-decisions-2",
      version: "1.0",
      order: 3,
      title: "Jak zarabiać legalnie jako nastolatek",
      learningObjective:
        "Wiesz, jak nastolatek może legalnie świadczyć usługi i zarabiać pieniądze bez rejestracji firmy",
      estimatedMinutes: 18,
      introStory:
        "Marta ma 16 lat i robi przepiękne ilustracje cyfrowe. Klienci chcą płacić za jej prace. Problem: nie może jeszcze samodzielnie zarejestrować firmy. Czy musi czekać do 18. urodzin? Absolutnie nie. Polskie prawo przewiduje kilka legalnych sposobów, żeby młoda osoba mogła zarabiać — nawet bez własnej działalności gospodarczej. Marta właśnie się o tym dowiedziała.",
      explanation:
        "Jako osoba poniżej 18. roku życia masz ograniczoną zdolność do czynności prawnych — ale to nie znaczy, że nie możesz zarabiać. Oto legalne opcje. Umowa zlecenie — umowa cywilnoprawna, którą możesz zawrzeć jako osoba niepełnoletnia za zgodą rodziców lub opiekuna prawnego. Zleceniobiorca wykonuje określone czynności (np. obsługuje social media, prowadzi zajęcia sportowe, pracuje jako kelner na weekendach). Zleceniodawca odprowadza podatek i ZUS. Umowa o dzieło — podobna do zlecenia, ale dotyczy konkretnego efektu (np. strony internetowej, ilustracji, tekstu, tłumaczenia). Mniejsze obciążenia ZUS niż przy zleceniu. Odpowiednia dla twórców, freelancerów i osób wykonujących jednorazowe projekty. Praca sezonowa przez agencje — agencje pracy tymczasowej często zatrudniają osoby po 16. roku życia (za zgodą rodziców) do pracy w wakacje. Sprzedaż własnych produktów — sprzedaż ręcznie robionych rzeczy, ilustracji, produktów cyfrowych (np. przez platformy internetowe). Przy małej skali w Polsce nie wymaga rejestracji działalności — ale warto sprawdzić aktualny limit, który co roku może się zmieniać. Poniżej 26. roku życia + ulga dla młodych = zero podatku dochodowego do 85 528 zł rocznie z umów o pracę i zleceń. To ogromna korzyść dla młodych zarabiających.",
      example:
        "Kacper (17 lat) podpisuje umowę o dzieło za zgodą rodziców z lokalną firmą — tworzy im stronę internetową za 1200 zł. Firma wystawia mu rachunek, odprowadza zaliczkę na podatek. Kacper dostaje przelewem ok. 1056 zł (po odliczeniu zaliczki podatkowej). W przyszłym roku złoży PIT i jeśli kwalifikuje się do ulgi dla młodych — może odzyskać tę zaliczkę. Wszystko legalnie, bez własnej działalności.",
      challenge:
        "Wypisz wszystkie umiejętności, które posiadasz i za które ktoś mógłby zapłacić (minimum 5). Dla trzech z nich zastanów się: jaka umowa byłaby odpowiednia (zlecenie czy dzieło)? Ile mógłbyś zażądać za swoje usługi? Porozmawiaj z rodzicem o tym, jak mógłby pomóc ci zawrzeć pierwszą umowę.",
      summary:
        "Jako nastolatek możesz legalnie zarabiać przez umowę zlecenie lub dzieło za zgodą rodziców — i korzystać z ulgi dla młodych, żeby nie płacić podatku dochodowego.",
      tags: [
        "umowa zlecenie",
        "umowa o dzieło",
        "nastolatek",
        "praca",
        "ulga dla młodych",
        "zdolność prawna",
      ],
    },
  ],
  quiz: {
    id: "rwd2-quiz",
    skillId: "real-world-decisions-2",
    version: "1.0",
    title: "Quiz: Własna firma — podstawy",
    questions: [
      {
        id: "rwd2-q1",
        difficulty: "EASY",
        question: "Co to jest JDG?",
        options: [
          "Jeden z rodzajów konta bankowego dla przedsiębiorców",
          "Jednoosobowa Działalność Gospodarcza — najprostsza forma prowadzenia firmy",
          "Jednorazowa Deklaracja Gospodarcza składana do Urzędu Skarbowego",
          "Jednostka Doradztwa Gminnego — urząd wspierający przedsiębiorców",
        ],
        correctIndex: 1,
        explanation:
          "JDG (Jednoosobowa Działalność Gospodarcza) to najprostsza forma prowadzenia firmy w Polsce — rejestrujesz ją bezpłatnie online przez CEIDG. Płacisz podatek dochodowy i składki ZUS.",
      },
      {
        id: "rwd2-q2",
        difficulty: "MEDIUM",
        question: "Czym różni się umowa o dzieło od umowy zlecenie?",
        options: [
          "Umowa o dzieło jest tylko dla osób powyżej 18. roku życia",
          "Umowa zlecenie dotyczy konkretnego efektu (np. ilustracji), a o dzieło — czynności",
          "Umowa o dzieło dotyczy konkretnego efektu (np. strony www), a zlecenie — wykonywania czynności",
          "Obie umowy są identyczne, różnią się tylko nazwą",
        ],
        correctIndex: 2,
        explanation:
          "Umowa o dzieło dotyczy osiągnięcia konkretnego, mierzalnego efektu (ilustracja, strona www, tekst). Umowa zlecenie dotyczy wykonywania określonych czynności (obsługa social media, korepetycje). Istotna różnica dotyczy też ZUS — umowa o dzieło ma niższe obciążenia.",
      },
      {
        id: "rwd2-q3",
        difficulty: "MEDIUM",
        question: "Agnieszka prowadzi JDG. W miesiącu zarobiła 5000 zł i miała koszty 800 zł. Jaka jest jej podstawa opodatkowania (dochód)?",
        options: ["5000 zł", "5800 zł", "4200 zł", "4000 zł"],
        correctIndex: 2,
        explanation:
          "Dochód = przychód minus koszty uzyskania przychodu = 5000 − 800 = 4200 zł. To jest podstawa, od której oblicza się podatek dochodowy.",
      },
      {
        id: "rwd2-q4",
        difficulty: "HARD",
        question:
          "Jaką główną przewagę ma spółka z o.o. nad JDG w kontekście odpowiedzialności finansowej?",
        options: [
          "Spółka z o.o. nie płaci podatku dochodowego",
          "Wspólnicy spółki z o.o. odpowiadają za długi firmy tylko do wysokości wkładów — ich majątek prywatny jest chroniony",
          "Spółka z o.o. nie musi płacić ZUS za właścicieli",
          "Spółka z o.o. może zatrudniać pracowników, a JDG nie",
        ],
        correctIndex: 1,
        explanation:
          "Kluczowa zaleta sp. z o.o. to ograniczona odpowiedzialność — jeśli firma zbankrutuje, wierzyciele mogą sięgnąć tylko po majątek firmy, nie po prywatny majątek wspólników. W JDG właściciel odpowiada całym swoim majątkiem.",
      },
      {
        id: "rwd2-q5",
        difficulty: "HARD",
        question:
          "Mateusz ma 17 lat i chce legalnie zarabiać na projektowaniu graficznym. Które rozwiązanie jest poprawne?",
        options: [
          "Musi poczekać do 18. urodzin — niepełnoletni nie mogą zarabiać",
          "Może samodzielnie zarejestrować JDG bez zgody rodziców",
          "Może podpisać umowę o dzieło za zgodą rodziców lub opiekuna prawnego i legalnie zarabiać",
          "Jedyna opcja to praca 'na czarno' — prawo nie przewiduje innych opcji",
        ],
        correctIndex: 2,
        explanation:
          "Osoba niepełnoletnia może zawierać umowy cywilnoprawne (zlecenie, dzieło) za zgodą rodziców lub opiekuna prawnego. To w pełni legalna forma zarabiania. JDG wymaga pełnoletności lub reprezentacji przez rodziców.",
      },
    ],
  },
  missions: [
    {
      id: "rwd2-m1",
      skillId: "real-world-decisions-2",
      version: "1.0",
      order: 1,
      difficulty: "QUICK",
      title: "Moja usługa i jej cena",
      description:
        "Zidentyfikuj usługę, którą możesz świadczyć, i ustal dla niej realną cenę.",
      realLifeTask:
        "Wypisz 5 umiejętności, za które ktoś mógłby zapłacić (grafika, korepetycje, fotografia, programowanie, pisanie, naprawa sprzętów, opieka nad zwierzętami itp.). Wybierz jedną. Sprawdź w internecie, ile zarabiają inni za podobne usługi. Ustal swoją cenę (nie za nisko — szanuj swoją pracę). Napisz krótki opis usługi w jednym akapicie, tak jakbyś miał/a wysłać go potencjalnemu klientowi.",
      estimatedMinutes: 25,
      successCriteria:
        "Masz wybraną usługę, ustaloną cenę z uzasadnieniem i gotowy opis dla klienta.",
    },
    {
      id: "rwd2-m2",
      skillId: "real-world-decisions-2",
      version: "1.0",
      order: 2,
      difficulty: "STANDARD",
      title: "Wirtualna firma — biznesplan na jednej stronie",
      description:
        "Stwórz uproszczony biznesplan dla swojego hipotetycznego jednoosobowego mikroprzedsiębiorstwa.",
      realLifeTask:
        "Napisz biznesplan na jednej stronie A4 dla swojej usługi lub produktu. Zawrzyj: (1) Co sprzedaję i komu? (2) Ile pobiera za to konkurencja? (3) Moja cena i uzasadnienie. (4) Szacowane miesięczne przychody (ile klientów × cena). (5) Szacowane koszty miesięczne (materiały, oprogramowanie, transport). (6) Szacowany dochód (przychód minus koszty). (7) Jaką formę prawną wybrałbym/wybrałabym i dlaczego (umowa o dzieło, JDG po 18. roku życia).",
      estimatedMinutes: 50,
      successCriteria:
        "Masz kompletny, jednostronicowy biznesplan z numerycznymi szacunkami przychodów i kosztów.",
      parentTip:
        "Zaproponuj, żebyś był/a pierwszym klientem — zapłać dziecku za realnie wykonaną usługę. To da mu doświadczenie pierwszej transakcji biznesowej.",
    },
    {
      id: "rwd2-m3",
      skillId: "real-world-decisions-2",
      version: "1.0",
      order: 3,
      difficulty: "CHALLENGE",
      title: "Pierwsza prawdziwa usługa",
      description:
        "Wykonaj i sprzedaj swoją pierwszą usługę — nawet za symboliczną kwotę.",
      realLifeTask:
        "Znajdź pierwszego klienta na swoją usługę — może to być sąsiad, znajomy rodziny, ktoś z kręgu znajomych. Jeśli jesteś niepełnoletni/a — poproś rodzica o pomoc z formalnościami. Wykonaj usługę rzetelnie. Wyślij wiadomość z opisem wykonanej pracy i kwotą. Odbierz zapłatę. Następnie napisz krótką refleksję (5-10 zdań): jak się czułeś/aś, co było trudne, co byś zrobił/a inaczej, ile zarobiłeś/aś.",
      estimatedMinutes: 120,
      successCriteria:
        "Wykonałeś/aś usługę, otrzymałeś/aś zapłatę i masz pisemną refleksję z wnioskami.",
      parentTip:
        "Bądź pierwszym klientem lub pomóż dziecku znaleźć pierwszego — to bezcenne doświadczenie, które buduje pewność siebie i realną wiedzę o prowadzeniu biznesu.",
    },
  ],
}
