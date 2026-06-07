# AI Strategy — Family Finance Academy

> Strategia integracji sztucznej inteligencji jako warstwy wartości dodanej — nie jako feature, ale jako infrastruktura produktu.

---

## 1. Filozofia AI w produkcie

### Zasada #1: AI jako mentor, nie jako nauczyciel
AI nie zastępuje ustrukturyzowanego curriculum. AI rozmawia, odpowiada, motywuje i personalizuje — natomiast wiedza pochodzi z kuratorowanych lekcji tworzonych przez ekspertów.

### Zasada #2: Bezpieczeństwo dzieci ponad wszystko
Każda interakcja AI z dzieckiem jest:
- Ograniczona tematycznie (finanse, edukacja, motywacja)
- Moderowana przez content filter
- Dostępna do wglądu rodzica (pełna historia rozmów)
- Dostosowana językowo do wieku (wykryta na podstawie profilu)

### Zasada #3: AI poprawia się dzięki danym platformy
Własne dane behawioralne (jakie koncepty sprawiają trudność, jakie pytania zadają dzieci) są unikalnym aktywem do fine-tuningu modeli.

### Zasada #4: Przejrzystość AI
Dziecko zawsze wie, że rozmawia z AI. Brak "udawania człowieka". Komunikat: "Jestem AI Mentorem — mogę się mylić, zapytaj też rodziców!"

---

## 2. AI Mentor (dla dzieci)

### Opis
Konwersacyjny asystent dostępny w zakładce /ai-mentor oraz jako widget w dashboardzie. Rozmawia z dzieckiem jak "mądry, przyjazny starszy kolega, który zna się na finansach".

### Persona AI Mentora

```
Imię:        Finnek (nazwa robocza — do decyzji brandingowej)
Charakter:   Ciepły, cierpliwy, lekko humorystyczny
Styl:        Zadaje pytania zwrotne, nie daje gotowych odpowiedzi
Granice:     Nie odpowiada na pytania niezwiązane z finansami/edukacją
Wiek języka: Dostosowany automatycznie (6–8 lat: proste / 15+ lat: dorosłe)
```

### Możliwości AI Mentora

| Funkcja | Opis | Plan |
|---|---|---|
| Odpowiedzi na pytania finansowe | "Co to jest inflacja?" → wyjaśnienie dopasowane do wieku | Family |
| Tłumaczenie pojęć z lekcji | "Nie rozumiem co to procent składany" | Family |
| Motywacja i coaching | "Minął tydzień — jak ci idzie cel Lego?" | Family |
| Quiz dnia | Codzienne pytanie finansowe push → rewarded answer | Family |
| Sugestia kolejnych kroków | Na podstawie postępu → "Czas na lekcję o budżecie!" | Family |
| Nieograniczona rozmowa | Bez limitu wiadomości | Family Plus |

### Ograniczenia i guardrails

```python
# Pseudokod — system prompt guardrails

ALLOWED_TOPICS = [
    "personal finance", "saving", "spending", "investing",
    "economics basics", "career and earning", "math basics",
    "motivation and goal setting", "financial products"
]

FORBIDDEN_BEHAVIORS = [
    "provide specific investment advice",
    "discuss adult content",
    "political opinions",
    "medical advice",
    "discuss other children's data",
    "claim to be human"
]

AGE_ADAPTATION = {
    "6-8":  "simple words, short sentences, emoji, analogies to toys",
    "9-11": "clear language, real-life examples, some humor",
    "12-14": "conversational, peer-like, use of proper terms",
    "15-18": "adult tone, factual, data-driven, no condescension"
}
```

### Architektura techniczna AI Mentora

```
[Dziecko] → [Next.js API Route /api/ai/chat]
                    │
                    ▼
            [Input validation + age filter]
                    │
                    ▼
            [Rate limiter (50 msg/mies. na Family)]
                    │
                    ▼
            [Context builder]
              • System prompt (persona + guardrails)
              • Age context (z profilu dziecka)
              • Recent lessons (ostatnie 3 ukończone)
              • Active goals (aktywne cele)
              • Conversation history (last 10 turns)
                    │
                    ▼
            [Anthropic Claude API / OpenAI GPT-4o]
                    │
                    ▼
            [Output filter (content moderation)]
                    │
                    ▼
            [Response → UI streaming]
                    │
                    ▼
            [Log to DB: message, timestamp, child_id]
            [Available to parent in panel]
```

### Koszt AI Mentora (szacunki)

```
Avg. tokens per conversation turn: ~800 (input) + ~400 (output)
Avg. turns per session: 5
Avg. sessions per child per month: 8

Monthly AI cost per child (Family):
  Claude Haiku: ~0.15 PLN / mies.
  GPT-4o mini:  ~0.18 PLN / mies.
  GPT-4o:       ~1.20 PLN / mies.

Decision: Claude Haiku dla rutynowych rozmów,
          Claude Sonnet dla złożonych pytań (auto-escalation)
```

---

## 3. AI dla rodzica (Parent AI Assistant)

### Opis
Oddzielny asystent w panelu rodzica, skupiony na danych i raportach — rozmawia z rodzicem jak doradca edukacyjny.

### Funkcje

#### 3.1 Raport tygodniowy AI (automatyczny)
```
Co poniedziałek o 8:00 → email do rodzica z AI-generowanym podsumowaniem:

"Raport tygodniowy Zosia — 03–09 lutego 2025

📊 Aktywność: 5 z 7 dni aktywnych (streak: 12 dni!)
📚 Lekcje: Ukończyła 3 lekcje (budżet, oszczędzanie, zakupy)
🎯 Misje: 1 misja w toku (57% postępu)
💰 Cel: Nowa gra — 67% (134/200 PLN)
🤖 AI: 12 pytań zadanych Mentorowi

💡 Insight AI: Zosia zadaje dużo pytań o 'skąd się biorą pieniądze'.
   Sugerujemy lekcję L2.3 'Jak działa praca?' — pasuje do jej ciekawości.

📋 Sugerowane tematy do rozmowy przy kolacji:
   • 'Zosia, co cię najbardziej zaskoczyło w lekcji o budżecie?'
   • 'Jak ci idzie misja tygodnia?'
```

#### 3.2 AI Insights Dashboard
- Trendlines postępu dziecka (tygodniowe, miesięczne)
- Identyfikacja słabych stron: "Zosia ma trudności z pojęciem procentu"
- Rekomendacje misji: "Misja 'Budżet na zakupy spożywcze' wzmocni umiejętność L1.3"
- Porównanie do grupy wiekowej (anonymized benchmark): "Zosia jest w top 30% w swojej grupie wiekowej"

#### 3.3 AI Coach dla rodzica
- Odpowiada na pytania: "Jak rozmawiać z 8-latkiem o oszczędzaniu?"
- Sugeruje aktywności poza aplikacją: "Weekend challenge: idźcie razem na zakupy z budżetem 50 PLN"
- Przygotowuje rodzica do trudnych rozmów: "Jak wytłumaczyć czym jest kredyt?"

---

## 4. AI Generator misji

### Problem
Misje statyczne szybko się nudzą. Dzieci potrzebują misji dopasowanych do ich sytuacji życiowej.

### Mechanika

```
TRIGGER: Dziecko ukończyło kurs / Rodzic kliknie "Wygeneruj misję"

INPUT do modelu:
  - Wiek dziecka
  - Ukończone kursy
  - Aktywne cele oszczędnościowe
  - Pora roku / bieżące eventy
  - Poprzednie misje (unikanie powtórzeń)
  - Trudność (wybrana przez rodzica: łatwa/średnia/trudna)

OUTPUT:
  - Tytuł misji
  - Opis (max 80 słów, dostosowany do wieku)
  - Czas trwania (1 dzień / 3 dni / 7 dni)
  - Sposób weryfikacji (self-report / parent-verify / auto)
  - XP i nagrody
  - Wskazówki dla dziecka (3 bullet points)
  - Wskazówki dla rodzica (jak wspierać)
```

### Przykłady generowanych misji

```
WIEK: 9 lat | KURS: Budżet | PORA: Przed Świętami

Wygenerowana misja:
  Tytuł: "Świąteczny Planista"
  Opis: "Masz 50 PLN na prezenty dla rodziny. 
         Zaplanuj, co kupisz dla każdej osoby, 
         żeby starczyło dla wszystkich!"
  Czas: 3 dni
  Weryfikacja: Rodzic (akceptuje plan zakupów)
  XP: 200 | Monety: 30
  Wskazówka dla dziecka: "Zrób listę osób i napisz obok ile chcesz wydać"
  Wskazówka dla rodzica: "Pomóż dziecku sprawdzić ceny online"

---

WIEK: 15 lat | KURS: Inwestycje intro | PORA: Zwykły tydzień

Wygenerowana misja:
  Tytuł: "Portfel 1000 PLN"
  Opis: "Masz wirtualne 1000 PLN do zainwestowania 
         przez tydzień. Wybierz 3 spółki i śledź 
         ich ceny codziennie. Co tydzień raport!"
  Czas: 7 dni
  Weryfikacja: Self-report (screenshoty cen)
  XP: 350 | Monety: 50
```

---

## 5. AI Generator quizów

### Problem
Stałe pytania quizowe zostają zapamiętane. Potrzebne są świeże pytania generowane dynamicznie.

### Architektura

```
TRIGGER: Wyczerpanie banku pytań (< 30% unikalnych) / miesięczny cron

INPUT:
  - Tekst lekcji (pełna treść)
  - Wiek docelowy
  - Typ pytania (single/multi/tf/drag)
  - Obecny bank pytań (do uniknięcia duplikacji)

OUTPUT (per pytanie):
  {
    question: "...",
    type: "single_choice",
    options: ["A", "B", "C", "D"],
    correct: "B",
    explanation: "...",  // pokazywane po odpowiedzi
    difficulty: "medium",
    concept_tag: "compound_interest"
  }

QUALITY GATE:
  - Każde pytanie przechodzi przez walidację AI (consistency check)
  - Human review dla pytań z tagiem "financial_advice"
  - A/B test: nowe pytania vs. stare (pass rate comparison)
```

### Volume targets

- MVP: ~500 pytań (ręcznie + AI review)
- v1.0: ~2 000 pytań + 200 nowych / miesiąc (AI)
- v2.0: Real-time generation dla advanced learners

---

## 6. AI Raporty i analityka

### Raporty dla rodzica

#### Miesięczny raport postępu (PDF + email)

```
SEKCJE RAPORTU:

1. Executive Summary (AI napisane)
   "Kacper miał bardzo aktywny miesiąc — ukończył 8 lekcji 
   i zdobył 1 240 XP. Jego najsilniejszym obszarem jest 
   oszczędzanie, natomiast pojęcia związane z zarabianiem 
   wymagają jeszcze pracy."

2. Wykres aktywności (heatmap)

3. Kompetencje finansowe (radar chart)
   - Oszczędzanie: ████████░░ 78%
   - Budżetowanie: ██████░░░░ 58%
   - Zarabianie:   ████░░░░░░ 42%
   - Inwestowanie: ██░░░░░░░░ 20%
   - Dawanie:      ███████░░░ 70%

4. AI Rekomendacje
   "Sugerujemy skupienie się w przyszłym miesiącu na 
   Kursie L2 (Zarabianie). Kacper jest gotowy na 
   koncepcje pracy i wartości pieniądza."

5. Pytania do rozmowy (AI generated, 5 sztuk)

6. Porównanie do poprzedniego miesiąca
```

#### Roczny raport "Finansowy rok Kacpra" (Family Plus)

- Podsumowanie roku w stylu "Spotify Wrapped"
- Top 3 pojęcia finansowe, które dziecko opanowało
- Ewolucja nawyków (wykres rok-do-roku)
- Prognoza AI: "Przy obecnym tempie, Kacper osiągnie poziom 8 za 4 miesiące"
- Certyfikat ukończenia (jeśli > 80% kursu poziomu)

### Alerty AI dla rodzica

| Alert | Trigger | Akcja |
|---|---|---|
| Brak aktywności | 5 dni bez logowania | Push + email z personalized message |
| Struggle signal | Fail tego samego quizu 3× | "Kacper ma trudności z X — jak możesz pomóc?" |
| Milestone | Nowy poziom / odznaka | Celebracja w panelu + propozycja rozmowy |
| Goal at risk | Cel nie zostanie osiągnięty w terminie | "Zosia potrzebuje 15 PLN tygodniowo — jest na 8 PLN" |
| Unusual pattern | Aktywność po 22:00 | "Kacper uczył się późno. Sprawdź czy to OK." |

---

## 7. Model AI — wybór dostawcy i strategia

### Hierarchia modeli

```
TIER 1 — Rutynowe konwersacje AI Mentora (koszt: niski)
  Model: Claude Haiku 3.5 / GPT-4o mini
  Użycie: 80% zapytań
  Latency: < 1 sek.

TIER 2 — Złożone pytania / raporty (koszt: średni)
  Model: Claude Sonnet 4.5 / GPT-4o
  Użycie: 18% zapytań (auto-escalation gdy kompleksowe pytanie)
  Latency: < 3 sek.

TIER 3 — Generowanie quizów / misji / raportów PDF (koszt: wyższy, async)
  Model: Claude Opus / GPT-4o
  Użycie: 2% zapytań (batch jobs, nie real-time)
  Latency: async, background job
```

### Prompt engineering strategia

- **System prompts** wersjonowane w kodzie (nie w UI)
- **Few-shot examples** dla każdego typu generacji
- **Eval suite** — 50 golden test cases per feature
- **Prompt regression testing** przy każdym deploy

### Roadmapa AI

| Faza | Feature | Model |
|---|---|---|
| MVP | AI Mentor (podstawowy) | GPT-4o mini |
| v1.0 | Raporty tygodniowe | GPT-4o |
| v1.0 | Generator misji (rodzic) | GPT-4o |
| v2.0 | Generator quizów | Claude Sonnet |
| v2.0 | AI Coach dla rodzica | Claude Sonnet |
| v3.0 | Fine-tuned model na danych FFA | Custom model |
| v4.0 | Personalizacja ścieżki nauki (AI curriculum) | Custom model |

---

*Dokument wersja 1.0 | Data: 2025 Q1 | Właściciel: CTO + AI Lead*
