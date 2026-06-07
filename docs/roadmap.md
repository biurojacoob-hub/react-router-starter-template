# Product Roadmap — Family Finance Academy

> Roadmapa produktowa zakładająca iteracyjne dostarczanie wartości, walidację PMF i skalowanie po osiągnięciu kluczowych KPI.

---

## Zasady roadmapy

1. **Każda faza wymaga walidacji KPI** zanim przejdziemy do następnej
2. **"Ship → Learn → Iterate"** — lepiej dostarczyć mniej a szybciej
3. **User research co 6 tygodni** (wywiady + analiza danych)
4. **AI features są priorytetem** — to nasz główny moat
5. **Mobile-first od MVP** — większość rodziców to iOS/Android

---

## MVP — "Fundament"
**Horyzont czasowy:** Miesiące 0–3 (Q2 2025)
**Cel:** 500 aktywnych użytkowników, walidacja core loop nauki

```
┌─────────────────────────────────────────────────────────────┐
│  MVP SCOPE                                                   │
│                                                             │
│  ✓ DONE (scaffold gotowy):                                  │
│    • Next.js 15 App Router                                  │
│    • System autentykacji (planowany: NextAuth)              │
│    • Dashboard (rodzic + dziecko)                           │
│    • UI Component Library (Shadcn-style)                    │
│    • Dark/Light mode                                        │
│    • Responsive design                                      │
│                                                             │
│  🔨 IN PROGRESS (MVP Q2 2025):                              │
│    • Prisma + PostgreSQL (schema produkcyjna)               │
│    • NextAuth / Clerk (autentykacja)                        │
│    • Stripe Billing integration                             │
│    • 24 lekcje (Kursy E1, E2, E3 — 6–10 lat)              │
│    • System XP i podstawowe odznaki                         │
│    • 3 misje startowe                                       │
│    • 1 cel oszczędnościowy                                  │
│    • AI Mentor v0 (GPT-4o mini, basic)                      │
│    • Panel rodzica (odczyt podstawowy)                      │
│    • Stripe Checkout (Family plan)                          │
│    • Email (Resend: transakcyjne)                           │
│    • Vercel deployment + CI/CD                              │
└─────────────────────────────────────────────────────────────┘
```

### MVP Success Criteria (przed wejściem do v1)
- [ ] 500 zarejestrowanych użytkowników
- [ ] 150 płacących rodzin (Family plan)
- [ ] D7 retention > 40%
- [ ] NPS > 35 (min. 50 respondentów)
- [ ] Crash-free rate > 99%
- [ ] Lesson completion rate > 60%

### MVP Technical Decisions

| Decision | Wybór | Uzasadnienie |
|---|---|---|
| Auth | Clerk | Szybka integracja, social login, RODO |
| DB | Supabase (Postgres) | Managed, realtime, storage |
| AI | OpenAI GPT-4o mini | Koszt, szybkość, jakość |
| Email | Resend | Developer-friendly, cena |
| Payments | Stripe | Standard, BLIK support |
| Deploy | Vercel | Next.js native, edge |
| Analytics | PostHog (self-hosted) | Privacy-first, RODO |
| Monitoring | Sentry | Error tracking |

---

## v1.0 — "Product-Market Fit"
**Horyzont czasowy:** Miesiące 3–9 (Q3–Q4 2025)
**Cel:** 2 500 płacących rodzin, NPS > 45, churn < 5%/mies.

### Priorytety v1.0

#### 🏆 Must Have

**Content Expansion**
- [ ] Kursy L1, L2, L3 (9–11 lat) — 27 lekcji
- [ ] Kurs A1 (12–14 lat) — 10 lekcji zaawansowanych
- [ ] 50 misji w bibliotece (5 kategorii)
- [ ] Quiz bank: 500 unikalnych pytań

**AI Ulepszenia**
- [ ] AI Mentor v1 — context-aware (wie co dziecko ukończyło)
- [ ] Raport tygodniowy AI (email, auto-generowany)
- [ ] AI Generator misji dla rodzica (Family plan)
- [ ] Guardrails + moderacja treści AI

**Mobile Apps**
- [ ] iOS App (React Native / Expo)
- [ ] Android App (React Native / Expo)
- [ ] Push notifications (Expo Notifications)
- [ ] Offline mode (lekcje cached lokalnie)

**Billing & Monetization**
- [ ] Family Plus plan (69 PLN/mies.)
- [ ] Roczne subskrypcje (ze zniżką)
- [ ] BLIK integration
- [ ] Faktury VAT automatyczne
- [ ] Zarządzanie subskrypcją w panelu

**UX & Retention**
- [ ] Streak system (pełny z freeze)
- [ ] System odznak (40 odznak w bibliotece)
- [ ] Ranking tygodniowy (anonimowy)
- [ ] Welcome email sequence (7 emaili onboarding)
- [ ] Reactivation flow (drip po 5 dniach nieaktywności)

#### 🔄 Should Have

- [ ] Referral program ("Zaproś znajomego, oboje dostaną miesiąc gratis")
- [ ] Family quiz mode (rodzic + dziecko grają razem)
- [ ] Cele oszczędnościowe — parent contribution
- [ ] Profil rodzica (dane, ustawienia, faktury)
- [ ] RODO compliance — export i delete danych

#### 💡 Nice to Have

- [ ] Tematy kosmetyczne w sklepie (monety)
- [ ] Avatar customization
- [ ] Sezonowe eventy (Powrót do Szkoły, Boże Narodzenie)

### v1.0 Success Criteria
- [ ] 2 500 płacących rodzin
- [ ] MRR > 90 000 PLN
- [ ] NPS > 45
- [ ] Churn < 5% miesięcznie
- [ ] App Store rating > 4.5
- [ ] Lesson completion rate > 70%

---

## v2.0 — "Growth Engine"
**Horyzont czasowy:** Miesiące 9–18 (Q1–Q2 2026)
**Cel:** 15 000 płacących rodzin, ARR 4M PLN, wejście B2B
**Funding:** Runda seed (~2M PLN) — po osiągnięciu KPI v1.0

### Priorytety v2.0

#### Content & Curriculum
- [ ] Poziom Master pełny (M1–M6, 60 lekcji, 15–18 lat)
- [ ] AI-generated quiz questions (auto-refresh bank pytań)
- [ ] Video lessons (30% lekcji z profesjonalnym video)
- [ ] Tłumaczenia: English (EN), Ukrainian (UA)
- [ ] Certyfikaty PDF z podpisem cyfrowym (Family Plus)

#### AI Zaawansowania
- [ ] AI Mentor v2 — personalizacja ścieżki nauki
- [ ] AI Coach dla rodzica (Family Plus)
- [ ] Miesięczny raport AI PDF (Family Plus)
- [ ] Roczny "Financial Wrapped" (Family Plus)
- [ ] AI Alert System (struggle detection, anomaly alerts)

#### B2B — Szkoły (Pilot)
- [ ] Panel nauczyciela (klasy, uczniowie, zadania)
- [ ] Integracja z e-dziennik (przyszłość)
- [ ] Raport klasowy AI
- [ ] Fakturowanie B2B
- [ ] 20 pilotowych szkół w Polsce

#### Growth & Viral
- [ ] Referral program v2 (tracking + payouts)
- [ ] Social sharing (certyfikaty, odznaki do social media)
- [ ] Family leaderboard (między znajomymi)
- [ ] "Zaproś szkołę" flow

#### Platform
- [ ] API publiczne v1 (dla partnerów B2B)
- [ ] Webhook system (dla integracji zewnętrznych)
- [ ] SSO (dla B2B — Google Workspace, Microsoft 365)

### v2.0 Success Criteria
- [ ] 15 000 płacących rodzin
- [ ] ARR > 4M PLN
- [ ] 20 szkół w B2B pilocie
- [ ] Churn < 3,5% miesięcznie
- [ ] NPS > 52
- [ ] EN version live (100 lekcji po angielsku)

---

## v3.0 — "Scale & Expand"
**Horyzont czasowy:** Miesiące 18–30 (Q3 2026 – Q2 2027)
**Cel:** 50 000 rodzin, ekspansja CEE, Series A
**Funding:** Series A (~8–12M EUR)

### Priorytety v3.0

#### Ekspansja geograficzna
- [ ] Czechy (CZ) — lokalizacja + local payment methods
- [ ] Słowacja (SK)
- [ ] Węgry (HU)
- [ ] Niemcy (DE) — największy rynek CEE
- [ ] Lokalne partnerstwa z bankami/insturacjami finansowymi

#### B2B Skalowanie
- [ ] 300 szkół w Polsce
- [ ] Pracodawcy — employee benefit (per seat)
- [ ] Ubezpieczyciele — co-brand program (pilot)
- [ ] API marketplace (external content creators)

#### Product
- [ ] AI Custom Curriculum (parent definiuje własną ścieżkę)
- [ ] Mentor Community (rodzice wymieniają się missjami i tipami)
- [ ] Live Sessions (webinary z ekspertami finansowymi)
- [ ] Podcast integration (lekcje audio dla starszych dzieci)
- [ ] Wearables (daily streak reminder na Apple Watch)

#### Tech Platform
- [ ] Fine-tuning własnego modelu AI na danych FFA
- [ ] Real-time multiplayer (family quiz, live lekcje)
- [ ] Native iOS / Android (pełna migracja z React Native)

### v3.0 Success Criteria
- [ ] 50 000 płacących rodzin
- [ ] ARR > 18M PLN
- [ ] 300 szkół B2B
- [ ] Obecność w 4+ krajach
- [ ] NPS > 60

---

## v4.0 — "Market Leader"
**Horyzont czasowy:** Miesiące 30–48 (Q3 2027 – Q4 2028)
**Cel:** 200 000 rodzin, #1 EdTech finanse w CEE

### Wizja v4.0

#### AI-First Platform
- [ ] Pełna personalizacja ścieżki nauki przez AI (bez stałego curriculum)
- [ ] AI generuje każdą lekcję na żywo (based on child's gaps)
- [ ] Adaptive difficulty (AI dostosowuje quizy w real-time)
- [ ] Predictive churn (AI interweniuje przed odejściem)

#### Ecosystem
- [ ] Marketplace treści (zewnętrzni twórcy, prowizja 30%)
- [ ] FFA Certifications — uznawane przez szkoły średnie i pracodawców
- [ ] FFA Foundation — program stypendialny dla dzieci z ubogich rodzin
- [ ] FFA API — platforma jako infrastruktura (BaaS dla EdTech)

#### Finansowe produkty (LONG TERM)
- [ ] Konto oszczędnościowe dla dziecka (partnerstwo z bankiem)
- [ ] Junior Investment Account (ETF, regulatory required)
- [ ] Insurance product ("Finansowa Polisa Przyszłości")

---

## Mapa decyzyjna

```
MVP (mies. 0–3)
        │
        ▼
   KPI spełnione?
   ├── TAK → v1.0
   └── NIE → Pivot / iterate (max 6 tygodni)
        │
        ▼
  v1.0 (mies. 3–9)
        │
        ▼
   KPI + seed funding?
   ├── TAK → v2.0
   └── NIE → Bootstrap dalej / mniejsza skala
        │
        ▼
  v2.0 (mies. 9–18)
        │
        ▼
   KPI + Series A?
   ├── TAK → v3.0 (pełne skalowanie)
   └── NIE → Profitability mode (nie skaluj, optymalizuj)
```

---

## Co NIE jest w roadmapie (deliberate exclusions)

| Feature | Dlaczego nie teraz |
|---|---|
| Własna waluta / crypto | Ryzyko regulacyjne, odwrócenie uwagi |
| Marketplace v1 | Za wcześnie — najpierw PMF |
| Własna bankowość | Licencja finansowa — v4.0 minimum |
| B2C reklamy | Sprzeczne z wartościami marki (brak reklam dla dzieci) |
| Gamble-like mechanics | Loot boxes, random rewards — etycznie niedopuszczalne |
| Ranking z pełnymi danymi dzieci | RODO + child safety |

---

*Dokument wersja 1.0 | Data: 2025 Q1 | Właściciel: CPO + CTO*
