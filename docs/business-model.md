# Business Model — Family Finance Academy

---

## 1. Model biznesowy — przegląd

Family Finance Academy operuje w modelu **B2C SaaS z freemium**, z planowanym rozszerzeniem na **B2B2C** w fazie v3. Podstawowym motorem wzrostu jest subskrypcja miesięczna/roczna, wzmocniona efektami sieciowymi i wysokim retention wynikającym z postępów edukacyjnych dziecka.

```
┌─────────────────────────────────────────────────────────────┐
│                    WARTOŚĆ DLA RODZINY                       │
│                                                             │
│  Dziecko uczy się → Rodzic widzi postępy → Rodzina rośnie  │
│         ↓                    ↓                    ↓         │
│    Zaangażowanie        Zaufanie             Retencja       │
└─────────────────────────────────────────────────────────────┘
                              ↓
                    Subskrypcja miesięczna
                              ↓
                    ARR jako główna metryka
```

---

## 2. Model subskrypcji

### Plany

| | **Starter** | **Family** | **Family Plus** |
|---|---|---|---|
| **Cena miesięczna** | 0 PLN | 39 PLN | 69 PLN |
| **Cena roczna** | 0 PLN | 349 PLN | 599 PLN |
| **Oszczędność roczna** | — | 119 PLN (25%) | 229 PLN (28%) |
| **Liczba dzieci** | 1 | Do 5 | Nieograniczona |
| **Lekcje** | 3/mies. | Nieograniczone | Nieograniczone |
| **Misje** | Podstawowe | Wszystkie | Wszystkie + customowe |
| **Cele oszczędnościowe** | 1 | Nieograniczone | Nieograniczone |
| **AI Mentor** | — | 50 msg/mies. | Nieograniczony |
| **Panel rodzica** | Odczyt | Pełny | Pełny + raporty AI |
| **Eksport danych** | — | PDF | PDF + CSV + API |
| **Wsparcie** | Email | Email + Chat | Priorytetowy + 2 sesje 1:1/mies. |
| **Certyfikaty** | — | — | ✓ |
| **Szkoła domowa** | — | — | ✓ |

### Strategia cenowa

**Cel: Starter → Family w ciągu 14–30 dni.**

- Trial 14 dni Family gratis (bez karty) dla każdego Starter
- Conversion trigger: dziecko ukończy 3 lekcje → prompt upgrade
- Roczna subskrypcja oferowana jako "default" przy checkout (prezentowana jako 2 miesiące gratis)
- Roczny plan generuje 2.2x wyższy LTV niż miesięczny

---

## 3. Segmenty klientów

### Segmentacja według wartości

```
Segment A — "Świadomi inwestorzy w dziecko"
  Profil:   35–45 lat, wykształcenie wyższe, dochód 8–15K PLN netto
  Motywacja: Długoterminowa edukacja dziecka
  Plan:     Family lub Family Plus roczny
  Udział:   ~30% bazy, ~55% przychodu

Segment B — "Zatroskani rodzice"  
  Profil:   30–40 lat, klasa średnia, 1–2 dzieci
  Motywacja: Dziecko uczy się oszczędzać
  Plan:     Family miesięczny
  Udział:   ~45% bazy, ~35% przychodu

Segment C — "Próbujący"
  Profil:   Różnorodny, niezdecydowany
  Motywacja: Ciekawość, polecenie znajomych
  Plan:     Starter → konwersja w ciągu 60 dni lub churn
  Udział:   ~25% bazy, ~10% przychodu
```

### Kanały pozyskania (CAC per kanał)

| Kanał | CAC | Wolumen | Jakość leadu |
|---|---|---|---|
| Organic SEO | 12 PLN | Wysoki | Wysoka |
| Polecenie (referral) | 8 PLN | Średni | Bardzo wysoka |
| Social Media (Meta) | 45 PLN | Bardzo wysoki | Średnia |
| Influencer parenting | 28 PLN | Wysoki | Wysoka |
| Google Ads | 62 PLN | Wysoki | Średnia |
| Szkoły (B2B) | 180 PLN / szkoła | Niski | Bardzo wysoka |
| PR / Media | 5 PLN | Niski | Wysoka |

---

## 4. Ekonomika jednostkowa

### Customer Acquisition Cost (CAC)

```
Blended CAC (rok 1):  38 PLN
Blended CAC (rok 2):  29 PLN  (efekt referral + SEO)
Blended CAC (rok 3):  22 PLN  (skala + brand)

CAC Payback Period:
  - Plan Family miesięczny:  2,1 miesiąca
  - Plan Family roczny:      natychmiastowy (prepaid)
```

### Lifetime Value (LTV)

```
Założenia:
  - ARPU Family:         39 PLN/mies.
  - ARPU Family Plus:    69 PLN/mies.
  - Średni ARPU (blended): 47 PLN/mies.
  - Churn rate miesięczny:  3,5% (target dojrzały)
  - Średni czas życia: 1 / 0,035 = 28,6 mies.

LTV = ARPU × Avg. lifespan × Gross Margin
LTV = 47 × 28,6 × 0,82 = ~1 103 PLN

LTV/CAC ratio (target): > 29x (cel rok 3)
LTV/CAC ratio (rok 1):  ~29x (29 PLN CAC → 1103 PLN LTV — znakomity wynik)
```

### Gross Margin

```
Przychód ARPU:          100%
  - Hosting / infrastruktura:   8%
  - API AI (OpenAI/Anthropic):  6%
  - Payment processing:         2%
  - Support (proporcjonalny):   4%
─────────────────────────────────
Gross Margin:                  80%
```

### Churn waterfall

| Etap życia klienta | Churn (miesięczny) | Działania retencyjne |
|---|---|---|
| Miesiące 1–2 | 8% | Onboarding, quick wins, pierwsze osiągnięcia |
| Miesiące 3–6 | 5% | Raporty, nowe lekcje, milestone celebration |
| Miesiące 7–12 | 3,5% | Roczna oferta, loyalty bonusy |
| Rok 2+ | 2% | Community, certyfikaty, advanced features |

---

## 5. Źródła przychodu

### Rok 1–2: Core Subscription

```
Miesięczny ARR build-up (rok 1):

Mies. 1:   150 subskrybentów × 42 PLN ARPU = 6 300 PLN MRR
Mies. 3:   400 subskrybentów × 44 PLN ARPU = 17 600 PLN MRR
Mies. 6: 1 000 subskrybentów × 46 PLN ARPU = 46 000 PLN MRR
Mies. 12: 2 500 subskrybentów × 48 PLN ARPU = 120 000 PLN MRR

ARR rok 1: ~720 000 PLN
```

### Rok 3+: Dywersyfikacja przychodów

| Strumień | Model | Udział ARR (rok 3) |
|---|---|---|
| Subskrypcje B2C | Miesięczna / roczna | 72% |
| B2B Szkoły | Per szkoła, 2 400 PLN/rok | 12% |
| B2B Pracodawcy | Per pracownik, 15 PLN/mies. | 8% |
| White-label (banki) | Licencja roczna | 5% |
| Marketplace treści | Prowizja 30% | 3% |

---

## 6. Struktura kosztów

### Rok 1 (bootstrap / pre-seed)

```
Zatrudnienie (2 FTE):          144 000 PLN
Infrastruktura (Vercel + DB):    18 000 PLN
AI API (OpenAI):                 12 000 PLN
Marketing:                       60 000 PLN
Prawne / administracja:          15 000 PLN
Narzędzia / SaaS:                 9 000 PLN
────────────────────────────────────────────
Suma kosztów operacyjnych:       258 000 PLN
Przychody:                       720 000 PLN
────────────────────────────────────────────
EBITDA rok 1:                   +462 000 PLN  ← break-even Q3
```

### Rok 2 (po rundzie seed)

```
Zatrudnienie (7 FTE):          560 000 PLN
Infrastruktura:                  48 000 PLN
AI API:                          60 000 PLN
Marketing (skalowanie):         480 000 PLN
Prawne / ekspansja:              60 000 PLN
────────────────────────────────────────────
Suma kosztów:                 1 208 000 PLN
Przychody (target):           4 000 000 PLN
EBITDA rok 2:                +2 792 000 PLN
```

---

## 7. Strategia wzrostu

### Faza 1: Product-Market Fit (0–12 mies.)
- Cel: 2 500 płacących rodzin, NPS > 40
- Strategia: Referral-first, influencer parenting, SEO
- KPI: Churn < 5%/mies., D30 retention > 55%

### Faza 2: Growth (12–24 mies.)
- Cel: 15 000 rodzin, pierwsze kontrakty B2B
- Strategia: Paid acquisition, szkoły pilotowe, PR
- Runda seed: 2–3M PLN na skalowanie

### Faza 3: Scale (24–48 mies.)
- Cel: 100 000 rodzin, ekspansja CEE (CZ, SK, HU)
- Strategia: Lokalizacja, partnerstwa z bankami
- Runda Series A: 8–12M EUR

### Growth loops

```
VIRAL LOOP:
Dziecko osiąga odznakę
        ↓
Rodzic udostępnia w social media
        ↓
Nowi użytkownicy rejestrują się
        ↓
(Viral coefficient K ≥ 0,4)

CONTENT LOOP:
SEO traffic → Blog / lekcje preview
        ↓
Rejestracja Starter
        ↓
Quick win → Upgrade do Family
        ↓
Użytkownik zostaje ambasadorem
```

---

*Dokument wersja 1.0 | Data: 2025 Q1 | Confidential — dla inwestorów*
