# Gamification System — Family Finance Academy

> System grywalizacji zaprojektowany tak, by nagradzać prawdziwy postęp edukacyjny, a nie tylko czas spędzony w aplikacji.

---

## 1. Filozofia projektowania

**Zasada #1: Nagradzaj naukę, nie czas.**
XP i odznaki są przyznawane za zrozumienie konceptu (quiz), nie za kliknięcia.

**Zasada #2: Każdy sukces jest widoczny dla rodziny.**
Osiągnięcia dziecka są automatycznie komunikowane rodzicowi — buduje to wspólne doświadczenie.

**Zasada #3: Porażka jest częścią nauki.**
System nie karze za błędne odpowiedzi. Karze za rezygnację. Nagradza za wytrwałość.

**Zasada #4: Elementy gry wzmacniają edukację, nie ją zastępują.**
Odznaka "Oszczędny Mistrz" jest wartościowa tylko dlatego, że stoi za nią realna wiedza.

---

## 2. System XP (Experience Points)

### Źródła XP

| Aktywność | XP bazowe | Bonusy |
|---|---|---|
| Ukończenie lekcji | 30–150 | +25% za Perfect Score (100% quiz) |
| Ukończenie kursu | 200–500 | +50% jeśli bez pominięć |
| Ukończenie misji | 100–400 | +30% za wcześniejsze ukończenie |
| Dzienny streak (każdy dzień) | 10 | ×2 za streak 7+, ×3 za 30+ |
| Ustawienie celu | 50 | — |
| Osiągnięcie celu | 300 | +100 za każdy zł powyżej celu |
| Quiz familijny (z rodzicem) | 75 | +50 jeśli rodzic też odpowie |
| Zapytanie AI Mentora | 5 | max 20 XP/dzień z tego źródła |
| Polecenie znajomego | 500 | jednorazowe |
| Ocena lekcji (feedback) | 10 | — |

### Mnożniki XP

```
STREAK MULTIPLIER:
  1–6 dni:    ×1.0
  7–13 dni:   ×1.5  ("Tygodniowy Mistrz")
  14–29 dni:  ×2.0  ("Dwutygodniowy Wojownik")
  30–89 dni:  ×2.5  ("Miesięczna Legenda")
  90+ dni:    ×3.0  ("Niezniszczalny")

LEVEL BONUS (zaawansowani użytkownicy):
  Poziom 10+: +10% XP per lekcję
  Poziom 20+: +25% XP per lekcję
```

### Zachowanie XP po przerwie

- Przerwa 1–3 dni: streak freeze (używany raz na 7 dni, automatycznie)
- Przerwa 4–6 dni: streak reset, ale XP zachowane
- Przerwa 7+ dni: streak reset, powitalny "comeback bonus" +200 XP

---

## 3. System poziomów (Levels)

### Tabela poziomów

| Poziom | Nazwa | XP od–do | Odblokowanie |
|---|---|---|---|
| 1 | Żółtodziób 🐣 | 0–150 | Starter |
| 2 | Uczeń 📚 | 150–400 | Kurs E2 |
| 3 | Odkrywca 🔍 | 400–800 | Kurs E3 |
| 4 | Oszczędzający 🐷 | 800–1 500 | Kurs L1 |
| 5 | Budżetmistrz 📊 | 1 500–2 500 | Kurs L2 |
| 6 | Zarabiający ⚒️ | 2 500–4 000 | Kurs L3 |
| 7 | Kupujący Sprytnie 🛒 | 4 000–6 000 | Kurs A1 |
| 8 | Inwestor Początkujący 📈 | 6 000–9 000 | Kurs A2 |
| 9 | Finansowy Detektyw 🔎 | 9 000–13 000 | Kurs A3 |
| 10 | Ekspert 🏆 | 13 000–18 000 | Kurs M1 |
| 11 | Guru Finansów 🧠 | 18 000–25 000 | Kurs M2 |
| 12 | Mentor 🌟 | 25 000–35 000 | Kurs M3 |
| 13 | Wizjoner 🚀 | 35 000–50 000 | Kurs M4 |
| 14 | Kapitan Kapitału 💎 | 50 000–75 000 | Kurs M5 |
| 15 | Finansowy Mistrz 👑 | 75 000+ | Kurs M6 |

### Nagrody za awans

- Nowe poziomy: animacja awansu + konfetti + push do rodzica
- Co 5 poziomów: nowy avatar frame / skórka postaci
- Poziom 10: odblokowanie "Trybu Eksperta" (zaawansowane quizy)
- Poziom 15: certyfikat "Family Finance Academy Graduate"

---

## 4. System odznak (Badges)

### Kategorie odznak

#### 🎓 Odznaki edukacyjne (za wiedzę)

| Odznaka | Warunek | XP za zdobycie |
|---|---|---|
| 📚 Pierwszy Krok | Ukończ pierwszą lekcję | 50 |
| 🎓 Kurs Ukończony | Ukończ dowolny kurs | 100 |
| 💯 Perfekcjonista | 100% quizu 3 razy z rzędu | 200 |
| 🧠 Encyklopedia | Ukończ 10 lekcji | 300 |
| 🏆 Mistrz Wiedzy | Ukończ 50 lekcji | 500 |
| 👑 Absolwent | Ukończ wszystkie kursy poziomu | 1000 |

#### 💰 Odznaki finansowe (za nawyki)

| Odznaka | Warunek | XP za zdobycie |
|---|---|---|
| 🐷 Oszczędny Mistrz | Osiągnij pierwszy cel oszczędnościowy | 200 |
| 🎯 Celowniczy | Ustaw 3 cele naraz | 150 |
| 💎 Diamencik | Oszczędź łącznie 1 000 PLN w celach | 500 |
| 🚀 Rakieta Celów | Osiągnij 5 celów | 750 |
| 🏦 Bankier | Obserwuj swoje finanse przez 30 dni | 300 |

#### 🔥 Odznaki za wytrwałość (za regularność)

| Odznaka | Warunek | XP za zdobycie |
|---|---|---|
| 🔥 Tydzień z Rzędu | 7-dniowy streak | 100 |
| ⚡ Miesięczna Passa | 30-dniowy streak | 500 |
| 💪 Nie Do Zatrzymania | 90-dniowy streak | 2000 |
| 🌟 Legenda | 365-dniowy streak | 10000 |

#### 🤝 Odznaki rodzinne (za współpracę)

| Odznaka | Warunek | XP za zdobycie |
|---|---|---|
| 👨‍👩‍👧 Drużyna Rodzinna | Rodzic i dziecko aktywni w tym tygodniu | 100 |
| 🎓 Nauczyciel Rodzic | Rodzic ukończy quiz razem z dzieckiem | 150 |
| 🌈 Super Rodzina | Wszystkie dzieci aktywne przez 4 tygodnie | 500 |
| 💬 Dialog Finansowy | 10 misji zatwierdzonych przez rodzica | 300 |

#### 🤖 Odznaki AI (za użycie mentora)

| Odznaka | Warunek | XP za zdobycie |
|---|---|---|
| 🤖 Pierwsza Rozmowa | Pierwsze pytanie do AI | 30 |
| 🧐 Ciekawski | 20 pytań do AI | 100 |
| 🎓 Student AI | 100 pytań do AI | 400 |
| 🌟 Ambasador | Polecenie znajomemu (3 rejestracje) | 500 |

### Rare & Special badges

- 🎂 **Urodzinowa Odznaka** — aktywność w dniu urodzin dziecka
- 🎄 **Świąteczny Oszczędzający** — aktywność 24–31 grudnia
- 🏅 **Beta Tester** — użytkownicy z pierwszych 500 rejestracji
- 🌍 **Globalny Finansista** — ukończenie misji z partnerami zagranicznymi

---

## 5. System Streaks (passatki)

### Mechanika streak

```
Streak liczy się, gdy dziecko wykonuje co najmniej 1 aktywność dziennie:
  - Ukończy lekcję
  - Wykona check-in misji
  - Odpowie na pytanie AI Mentora
  - Doda/edytuje cel

STREAK FREEZE:
  - 1 freeze przysługuje raz na 7 dni (automatyczny)
  - Freeze aktywuje się przy nieaktywności JEDNEGO dnia
  - Rodzic może kupić dodatkowe freeze (max 3 naraz) — premium feature

STREAK SHIELD (Family Plus):
  - Weekend shield: automatyczna ochrona piątku-niedzieli
  - Wakacyjny shield: 14 dni ochrony / rok (aktywowany przez rodzica)
```

### Powiadomienia streak

| Sytuacja | Notyfikacja | Czas |
|---|---|---|
| Streak > 3 dni | "🔥 {imię} ma {n} dni z rzędu!" (do rodzica) | 20:00 |
| Streak zagrożony | "⚠️ {imię}, nie zapomnij o dzisiejszej nauce!" | 18:00 |
| Streak reset | "😢 Passa się skończyła. Zacznij od nowa!" | 09:00 |
| Streak milestone | "🎉 14 dni z rzędu! Jesteś niesamowity!" | instant |

---

## 6. Rankingi rodzinne

### Rodzaje rankingów

#### 1. Ranking Tygodniowy (resetowany w poniedziałek)
- Zasięg: Wszyscy aktywni użytkownicy w danym tygodniu
- Metryka: XP zdobyte w bieżącym tygodniu
- Nagrody: Top 10% → odznaka "Top Uczeń Tygodnia"

#### 2. Ranking Kursowy
- Zasięg: Wszyscy, którzy ukończyli dany kurs
- Metryka: Wynik quizu finalnego (%)
- Brak resetu — historyczny

#### 3. Ranking Rodzinny (wewnętrzny)
- Zasięg: Dzieci w ramach jednego konta rodzinnego
- Metryka: XP tygodniowe
- Cel: Friendly competition między rodzeństwem
- Rodzic może wyłączyć (RODO / wellbeing)

#### 4. Ranking Szkolny (v3.0)
- Zasięg: Uczniowie danej szkoły (jeśli szkoła ma B2B)
- Metryka: XP miesięczne
- Widoczność: Imiona + awatary (bez nazwisk)

### Prywatność rankingów

```
Ustawienia widoczności (zarządzane przez rodzica):
  ○ Widoczny dla wszystkich użytkowników (domyślny)
  ○ Widoczny tylko dla znajomych (zaproszeni)
  ○ Prywatny (tylko rodzina)

Dane w rankingu:
  ✓ Pseudonim / imię dziecka
  ✓ Avatar
  ✓ XP tygodniowe
  ✗ Żadnych danych osobowych
  ✗ Żadnych danych finansowych
```

### Anty-toxicity features

- Brak możliwości komentowania w rankingach
- Ranking pokazuje "twoje miejsce" bez pełnej listy (jeśli > #100)
- Opcja "Ukryj ranking" dla wrażliwych dzieci
- Rodzic otrzymuje alert jeśli dziecko spada o > 20 miejsc w tydzień

---

## 7. System monet (wewnętrzna waluta)

### Mechanika

- **Monety** to waluta wewnętrzna (nie prawdziwe pieniądze)
- Służą do zakupu kosmetycznych elementów (avatary, ramki, tematy)
- NIE można kupić monet za prawdziwe pieniądze (anty-pay-to-win)
- NIE można wymienić monet na prawdziwe pieniądze

### Źródła monet

| Źródło | Monety |
|---|---|
| Ukończenie lekcji | 5–15 🪙 |
| Ukończenie misji | 10–50 🪙 |
| Dzienny streak | 2 🪙 |
| Osiągnięcie celu | 30–100 🪙 |
| Specjalne eventy | 50–200 🪙 |

### Sklep z monetami (kosmetyki)

| Przedmiot | Cena | Opis |
|---|---|---|
| Nowy avatar | 200 🪙 | Dodatkowe postacie |
| Ramka avatara | 100 🪙 | Złota, platynowa, tęczowa |
| Motyw lekcji | 300 🪙 | Kosmiczny, podwodny, dżungla |
| Animacja XP | 150 🪙 | Specjalna animacja przy zdobyciu XP |
| Streak shield | 400 🪙 | Dodatkowy freeze streak |

---

## 8. Eventy sezonowe

| Event | Czas | Mechanika | Nagroda |
|---|---|---|---|
| 🎒 Powrót do szkoły | Sierpień–Wrzesień | Podwójne XP za lekcje | Odznaka "Szkolny Start" |
| 🎄 Świąteczny Budżet | Grudzień | Misja: "Zaplanuj prezenty w budżecie" | Zimowa ramka avatara |
| 🌸 Wiosenne Cele | Marzec–Kwiecień | Event rankingowy "Kto więcej oszczędza" | Wiosenna odznaka |
| 🌍 Dzień Ziemi | 22 Kwietnia | Misja: "Oszczędzanie = dbanie o planetę" | Zielona odznaka |
| 👨‍👩‍👧 Dzień Rodziny | Maj | Bonus za aktywność rodzic+dziecko razem | Rodzinna odznaka |

---

*Dokument wersja 1.0 | Data: 2025 Q1 | Właściciel: Product + Game Design*
