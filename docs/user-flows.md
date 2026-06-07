# User Flows — Family Finance Academy

> Pełne ścieżki użytkownika dla kluczowych procesów produktowych. Każdy flow zawiera kroki, stany ekranu, triggery i metryki.

---

## Flow 1 — Rejestracja

**Aktor:** Rodzic (Anna, 38 lat, mobile)
**Trigger:** Kliknięcie "Zacznij bezpłatnie" z Landing Page / polecenie od znajomej
**Czas docelowy:** < 3 minuty

```
[Landing Page]
      │
      ▼
[CTA "Zacznij bezpłatnie"]
      │
      ▼
┌─────────────────────────────────────────────────┐
│  KROK 1: Dane konta rodzica                     │
│  ─────────────────────────────────────────────  │
│  • Imię rodzica                                 │
│  • Email                                        │
│  • Hasło (min. 8 znaków)                       │
│  ─────────────────────────────────────────────  │
│  [LUB: Kontynuuj z Google] [Kontynuuj z Apple]  │
│  Zgoda RODO (checkbox, rozwijana treść)          │
└─────────────────────────────────────────────────┘
      │
      ▼
┌─────────────────────────────────────────────────┐
│  KROK 2: Twoje dziecko                          │
│  ─────────────────────────────────────────────  │
│  • Imię dziecka                                 │
│  • Wiek dziecka (slider: 6–18 lat)              │
│  • Wybór avatara (6 opcji)                      │
│  ─────────────────────────────────────────────  │
│  Możliwe: "Mam więcej dzieci" → dodanie drugiego│
│  (max 1 na Starter)                             │
└─────────────────────────────────────────────────┘
      │
      ▼
┌─────────────────────────────────────────────────┐
│  KROK 3: Co jest ważne dla Ciebie?              │
│  (personalizacja treści — 1 ekran)              │
│  ─────────────────────────────────────────────  │
│  □ Nauka oszczędzania                          │
│  □ Mądre wydawanie                             │
│  □ Pierwsze kieszonkowe                        │
│  □ Inwestowanie dla nastolatka                 │
│  □ Dialog o pieniądzach w rodzinie             │
└─────────────────────────────────────────────────┘
      │
      ▼
[Weryfikacja emaila]
  • Email z linkiem (ważny 24h)
  • Możliwość "Wyślij ponownie"
  • Skip na mobile (weryfikacja przy pierwszym zakupie)
      │
      ▼
[→ Onboarding Flow]

```

**Metryki:**
- Completion rate: cel > 75%
- Drop-off #1: krok 1 (email/hasło) → rozwiązanie: social login
- Drop-off #2: weryfikacja email → rozwiązanie: skip na start
- Time to register: < 2,5 min.

---

## Flow 2 — Onboarding

**Aktor:** Rodzic (po rejestracji) + Dziecko (pierwsze logowanie)
**Trigger:** Zakończenie rejestracji
**Czas docelowy:** 5–8 minut (rodzic) + 3 minuty (dziecko)

```
[ONBOARDING RODZICA]

Krok 1/4: "Witaj w Family Finance Academy!"
  • Animacja powitalna (5 sek., pomijalna)
  • Wyjaśnienie: "Twój panel" vs "Panel Zosia"

Krok 2/4: Ustaw pierwsze kieszonkowe
  • Ile Zosia dostaje tygodniowo? [input: PLN]
  • Kiedy? [Wybór dnia tygodnia]
  • "To nie jest obowiązkowe — możesz to pominąć"
  
Krok 3/4: Wybierz pierwszy cel
  • Propozycje AI na podstawie wieku:
    - "Zosia (8 l.): Zaoszczędź na coś fajnego 🎮"
    - "Ustaw cel → dziecko widzi postęp"
  • Input: Cel, kwota, emoji

Krok 4/4: Zaproś Zosię
  • "Teraz czas na Zosię!"
  • QR kod do zeskanowania lub link SMS
  • LUB: "Skonfiguruj razem" → otwiera tryb dziecka
  
[Dziecko loguje się po raz pierwszy]

Ekran 1: "Hej Zosia! 👋"
  • Animacja z avatarem dziecka
  • "Twój mentor finansowy na Ciebie czeka!"

Ekran 2: Wybierz swojego bohatera
  • 6 avatarów (zwierzęta/postacie)
  • Nadaj mu imię (opcjonalne)

Ekran 3: Twoja pierwsza misja
  • Automatycznie przypisana misja "starter"
  • Animacja "3, 2, 1 — start!" → pierwsza lekcja

[→ Dashboard dziecka]

```

**Metryki:**
- Onboarding completion: cel > 60%
- "Aha moment": dziecko kończy pierwszą lekcję < 24h od rejestracji
- Activation: rodzic + dziecko aktywni w ciągu 7 dni

---

## Flow 3 — Zakup subskrypcji

**Aktor:** Rodzic (Anna)
**Trigger:** Paywall po wyczerpaniu 3 lekcji Starter / prompt po 7 dniach
**Czas docelowy:** < 5 minut

```
[Trigger: Modal "Zosia jest gotowa na więcej!"]
  • Kontekst: "Zosia ukończyła wszystkie darmowe lekcje"
  • Emotion anchor: zdjęcie/avatar postępu dziecka
  • CTA: "Odblokuj wszystkie lekcje"
      │
      ▼
[Strona cennika — uproszczona]
  • 3 plany (Starter, Family, Family Plus)
  • Family pre-selected + badge "Najpopularniejszy"
  • Toggle: Miesięcznie / Rocznie (domyślnie: roczny)
  • Wyraźna oszczędność: "Zaoszczędź 119 zł/rok"
      │
      ▼
[Klik: "Wybierz Family"]
      │
      ▼
┌─────────────────────────────────────────────────┐
│  CHECKOUT                                       │
│  ─────────────────────────────────────────────  │
│  Plan: Family Roczny — 349 PLN                  │
│  ─────────────────────────────────────────────  │
│  [Karta płatnicza]    [BLIK]    [PayPal]        │
│                                                 │
│  Nr karty: ________________                     │
│  Data ważności: ___  CVV: ___                   │
│  ─────────────────────────────────────────────  │
│  □ Zapamiętaj kartę (Stripe Vault)             │
│  □ Faktura VAT (opcjonalnie)                   │
│  ─────────────────────────────────────────────  │
│  Łącznie: 349 PLN                               │
│  [KUP TERAZ — bezpieczna płatność 🔒]           │
│  ─────────────────────────────────────────────  │
│  Anuluj w każdej chwili · Nie wymagamy karty   │
│  do darmowego okresu próbnego                   │
└─────────────────────────────────────────────────┘
      │
      ▼
[Sukces płatności]
  • Animacja konfetti
  • "Zosia może teraz uczyć się bez limitów! 🎉"
  • Email potwierdzający z fakturą (jeśli zaznaczono)
  • CTA: "Wróć do Zosia → pierwsze lekcje"
      │
      ▼
[→ Dashboard z odblokowanymi treściami]

```

**Błędy i obsługa:**
- Karta odrzucona → jasny komunikat + propozycja BLIK
- Timeout płatności → zapisany koszyk, email przypominający
- Stripe 3DS → obsługiwany w modalnym iframe

**Metryki:**
- Checkout conversion rate: cel > 65% (od paywall do zakupu)
- BLIK vs karta: przewidywany split 55/45 (Polska)
- Roczny vs miesięczny: cel > 55% rocznych

---

## Flow 4 — Ukończenie lekcji

**Aktor:** Kacper (8 lat) / Michał (15 lat)
**Trigger:** Kliknięcie lekcji z dashboardu / powiadomienie push
**Czas docelowy:** 8–15 minut

```
[Dashboard dziecka]
      │
      ▼
[Klik: Lekcja "Czym jest budżet?"]
      │
      ▼
┌─────────────────────────────────────────────────┐
│  EKRAN INTRO LEKCJI                             │
│  ─────────────────────────────────────────────  │
│  🎓 "Czym jest budżet domowy?"                 │
│  ⏱️ 8 minut  ⚡ +50 XP  🏆 Trudność: Łatwa   │
│                                                 │
│  [ZACZNIJ LEKCJĘ →]                             │
└─────────────────────────────────────────────────┘
      │
      ▼
[Slajd 1/6: Tekst + ilustracja]
  "Budżet to plan, ile pieniędzy wpływa i wypływa."
  [Dalej →]
      │
      ▼
[Slajd 2/6: Animacja / wideo 60 sek.]
  Animowany przykład: rodzina Kowalskich i ich budżet
      │
      ▼
[Slajd 3/6: Interaktywny element]
  Przeciągnij wydatki do kategorii: POTRZEBY / ZACHCIANKI
  [3 przedmioty do posortowania]
      │
      ▼
[Slajd 4/6: Tekst + przykład]
      │
      ▼
[Slajd 5/6: Quiz — 3 pytania]

  P1: "Co to jest przychód?"
  ○ Pieniądze które wydajesz
  ● Pieniądze które zarabiasz  ← poprawna
  ○ Pieniądze w banku
  [Feedback: "Świetnie! Przychód to pieniądze, które wpływają."]
  
  P2: ...
  P3: ...
      │
      ▼
[Slajd 6/6: ZAKOŃCZENIE LEKCJI 🎉]
  • Animacja confetti
  • "+50 XP" (animacja latającego XP)
  • "Ukończyłeś lekcję!"
  • Progress bar do następnego poziomu
  • [Następna lekcja →] [Wróć do dashboardu]
      │
      ▼
[Push do rodzica]
  "Zosia właśnie ukończyła lekcję o budżecie! 🎓 +50 XP"

```

**Obsługa krawędzi:**
- Porzucenie w trakcie → lekcja zapisuje postęp (resume)
- Niepoprawna odpowiedź → wyjaśnienie + możliwość ponowienia
- Brak internetu → tryb offline dla załadowanej lekcji

**Metryki:**
- Lesson completion rate: cel > 72%
- Average time in lesson: 9 min.
- Quiz pass rate (first attempt): cel > 65%

---

## Flow 5 — Wykonanie misji

**Aktor:** Kacper + Rodzic (weryfikacja)
**Trigger:** Nowa misja dostępna / push notyfikacja
**Czas trwania:** 1 dzień – 1 tydzień (misja ciągła)

```
[PRZYZNANIE MISJI]

Rodzic w panelu / AI automatycznie:
  → "Misja tygodnia: Nie kupuj słodyczy przez 5 dni"
  → Misja pojawia się w dashboardzie dziecka

[DZIECKO WIDZI MISJĘ]
┌─────────────────────────────────────────────────┐
│  🎯 MISJA: Tydzień Oszczędzania                 │
│  ─────────────────────────────────────────────  │
│  Nie kupuj słodyczy przez 5 dni pod rząd.       │
│  Każdy dzień bez słodyczy = 2 PLN oszczędności! │
│  ─────────────────────────────────────────────  │
│  Nagroda: +150 XP, 🪙 20 monet, Odznaka 🐷     │
│  Pozostało: 5 dni                               │
│  Progress: ░░░░░░░░░░ 0%                        │
│  [ZAAKCEPTUJ MISJĘ]                             │
└─────────────────────────────────────────────────┘
      │  [Kacper akceptuje]
      ▼
[Dzień 1–5: Codzienne check-in]
  • Kacper klika "Dziś też dałem radę! ✓"
  • Progress rośnie o 20% / dzień
  • Push do rodzica: "Kacper zalicza misję — dzień 3/5! 🔥"
      │
      ▼
[Dzień 5: WERYFIKACJA]
  Kacper: "Ukończyłem misję!"
      │
  [OPCJA A: Auto-weryfikacja]
  Brak transakcji na koncie rodzica w kategorii "słodycze" → 
  automatyczna weryfikacja przez API banku (przyszłość)
      │
  [OPCJA B: Weryfikacja rodzica]
  Rodzic dostaje push: "Kacper prosi o zaliczenie misji"
  Panel rodzica → [Zatwierdź] / [Odrzuć z komentarzem]
      │
      ▼
[UKOŃCZENIE MISJI 🎉]
  • +150 XP
  • Animacja zdobycia odznaki "Oszczędny Mistrz 🐷"
  • 20 monet dodanych do skarbonki
  • Email do rodzica: "Kacper ukończył misję!"
  • Propozycja następnej misji (AI generated)

```

**Metryki:**
- Mission acceptance rate: cel > 80%
- Mission completion rate: cel > 55%
- Parent verification rate: cel > 90%

---

## Flow 6 — Ustawienie celu oszczędnościowego

**Aktor:** Dziecko (Kacper) lub Rodzic + Dziecko razem
**Trigger:** Sekcja "Moje cele" / prompt AI Mentora
**Czas docelowy:** 3–5 minut

```
[Dashboard → "Cele" → "+ Nowy cel"]
      │
      ▼
┌─────────────────────────────────────────────────┐
│  KROK 1: Na co chcesz oszczędzać?               │
│  ─────────────────────────────────────────────  │
│  Sugestie AI (na podstawie wieku):              │
│  🎮 Gra / Console   🚲 Rower   📱 Telefon      │
│  🎒 Plecak           ✈️ Wakacje  🎨 Inne       │
│                                                 │
│  [LUB wpisz własny cel...]                      │
│  [Wybierz emoji dla celu]                       │
└─────────────────────────────────────────────────┘
      │
      ▼
┌─────────────────────────────────────────────────┐
│  KROK 2: Ile to kosztuje?                       │
│  ─────────────────────────────────────────────  │
│  Cel: 🎮 Nowa gra                              │
│  Kwota docelowa: [200] PLN                      │
│                                                 │
│  Masz już: [  0  ] PLN (opcjonalne)            │
│  ─────────────────────────────────────────────  │
│  Termin: [opcjonalny — wybierz datę]            │
└─────────────────────────────────────────────────┘
      │
      ▼
┌─────────────────────────────────────────────────┐
│  KROK 3: Twój plan (wyliczony przez AI)         │
│  ─────────────────────────────────────────────  │
│  🤖 AI Mentor mówi:                             │
│  "Jeśli odkładasz 10 zł tygodniowo z          │
│   kieszonkowego, osiągniesz cel za 20 tygodni  │
│   — dokładnie przed Świętami! 🎄"               │
│  ─────────────────────────────────────────────  │
│  Plan tygodniowy: [10] PLN (edytowalne)         │
│  Szacowany czas: 20 tygodni                     │
└─────────────────────────────────────────────────┘
      │
      ▼
[KLIK: "Utwórz cel! 🎯"]
      │
      ▼
[POTWIERDZENIE]
  • Animacja skarbonki wypełniającej się
  • "Twój cel jest aktywny!"
  • Goal pojawia się w dashboardzie z progress barem
  • Opcja: "Powiedz mamie/tacie o celu" → share do rodzica

[RODZIC WIDZI NOWY CEL]
  Panel rodzica: "Kacper ustawił nowy cel: 🎮 Nowa gra — 200 PLN"
  • Opcja: Dofinansuj cel (parent contribution)
  • Opcja: Ustaw misję powiązaną z celem

```

**Metryki:**
- Goal creation completion: cel > 85%
- Goals with parent connection: cel > 50%
- Active goals per child (avg): cel 2,5

---

## Diagram ogólny — mapa ścieżek

```
NOWY UŻYTKOWNIK
      │
      ▼
  Rejestracja (3 min.)
      │
      ▼
  Onboarding (7 min.)
      │
      ├──────────────────────────────────┐
      ▼                                  ▼
RODZIC (panel)                    DZIECKO (panel)
  │                                      │
  ├─ Ustaw kieszonkowe                   ├─ Pierwsza lekcja ← FLOW 4
  ├─ Dodaj cel ← FLOW 6                 ├─ Pierwsza misja ← FLOW 5
  ├─ Przypisz misję                      ├─ Ustaw cel ← FLOW 6
  └─ Sprawdź raporty                     └─ Zapytaj AI Mentora
      │                                      │
      ▼                                      ▼
  Paywall po 7 dniach              Paywall po 3 lekcjach
      │                                      │
      └──────────┬───────────────────────────┘
                 ▼
           ZAKUP ← FLOW 3
                 │
                 ▼
         PŁATNY UŻYTKOWNIK
                 │
        ┌────────┼────────┐
        ▼        ▼        ▼
    Lekcje    Misje    Cele
   (co dzień)(co tydz.)(ciągłe)
```

---

*Dokument wersja 1.0 | Data: 2025 Q1 | Właściciel: Product + Design*
