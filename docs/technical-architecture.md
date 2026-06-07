# Technical Architecture — Family Finance Academy

> Kompletna architektura techniczna systemu: od warstwy frontendowej przez backend, bazę danych, AI, billing, po analitykę.

---

## 1. Przegląd architektury

```
┌─────────────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser / App)                        │
│                                                                     │
│   Next.js 15 App Router · TypeScript · Tailwind CSS · Radix UI     │
└──────────────────────────────┬──────────────────────────────────────┘
                               │ HTTPS
┌──────────────────────────────▼──────────────────────────────────────┐
│                        VERCEL EDGE NETWORK                           │
│                                                                     │
│   Edge Middleware (auth check, locale, A/B flags)                   │
│   Static assets (CDN, cache headers)                                │
└───────────────┬──────────────────────────────┬──────────────────────┘
                │                              │
┌───────────────▼──────────────┐  ┌────────────▼────────────────────┐
│    NEXT.JS SERVER (Vercel)   │  │   VERCEL EDGE FUNCTIONS          │
│                              │  │                                  │
│  App Router (RSC + Client)   │  │  /api/ai/chat (streaming)        │
│  Server Actions              │  │  /api/webhooks/stripe            │
│  API Routes                  │  │  /api/webhooks/clerk             │
└───────────────┬──────────────┘  └────────────┬────────────────────┘
                │                              │
┌───────────────▼──────────────────────────────▼────────────────────┐
│                         SUPABASE (PostgreSQL)                       │
│                                                                     │
│   Prisma ORM · Row Level Security · Realtime · Storage             │
└─────────────────────────────────────────────────────────────────────┘
                │                              │
┌───────────────▼──────────┐  ┌───────────────▼───────────────────┐
│   EXTERNAL SERVICES      │  │   BACKGROUND JOBS                  │
│                          │  │                                    │
│   Clerk (Auth)           │  │   Vercel Cron                      │
│   Stripe (Billing)       │  │   • Weekly AI reports (Mon 8:00)   │
│   Anthropic / OpenAI     │  │   • Streak processing (daily)      │
│   Resend (Email)         │  │   • Quiz bank refresh (monthly)    │
│   PostHog (Analytics)    │  │                                    │
│   Sentry (Errors)        │  │                                    │
└──────────────────────────┘  └───────────────────────────────────┘
```

---

## 2. Frontend

### 2.1 Stack

| Technologia | Wersja | Rola |
|---|---|---|
| Next.js | ^15.x | Framework (App Router, RSC, Server Actions) |
| React | ^19.x | UI runtime |
| TypeScript | ^5.x | Type safety |
| Tailwind CSS | ^3.4.x | Utility-first styling |
| Radix UI | latest | Headless accessible primitives |
| class-variance-authority | ^0.7.x | Variant-based component API |
| next-themes | ^0.4.x | Dark/Light mode |
| Lucide React | ^0.5x | Icon library |
| clsx + tailwind-merge | latest | Class merging utility |

### 2.2 Struktura katalogów

```
/
├── app/
│   ├── layout.tsx                  # Root layout (ThemeProvider, fonts)
│   ├── globals.css                 # CSS custom properties + utility classes
│   ├── (marketing)/                # Route group — public pages
│   │   ├── layout.tsx              # MarketingHeader + MarketingFooter
│   │   ├── page.tsx                # Landing page (/)
│   │   └── pricing/page.tsx        # Pricing page (/pricing)
│   └── (app)/                      # Route group — authenticated pages
│       ├── layout.tsx              # AppSidebar + AppTopbar + main
│       ├── dashboard/page.tsx
│       ├── lessons/page.tsx
│       ├── missions/page.tsx
│       ├── goals/page.tsx
│       ├── parent/page.tsx
│       ├── child/page.tsx
│       ├── ai-mentor/page.tsx
│       └── settings/page.tsx
├── components/
│   ├── ui/                         # Primitive UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── progress.tsx
│   │   ├── avatar.tsx
│   │   └── separator.tsx
│   ├── shared/                     # Cross-cutting components
│   │   ├── logo.tsx
│   │   ├── theme-toggle.tsx
│   │   └── section-header.tsx
│   ├── layout/                     # Layout shells
│   │   ├── marketing-header.tsx
│   │   ├── marketing-footer.tsx
│   │   ├── app-sidebar.tsx
│   │   └── app-topbar.tsx
│   ├── landing/                    # Landing page sections
│   │   ├── hero.tsx
│   │   ├── features.tsx
│   │   ├── how-it-works.tsx
│   │   ├── benefits.tsx
│   │   ├── pricing-preview.tsx
│   │   └── cta.tsx
│   └── dashboard/                  # Dashboard widgets
│       ├── welcome-card.tsx
│       ├── progress-overview.tsx
│       ├── recent-lessons.tsx
│       ├── current-missions.tsx
│       ├── savings-goal-widget.tsx
│       └── ai-mentor-widget.tsx
├── lib/
│   ├── utils.ts                    # cn(), formatCurrency(), formatPercent()
│   ├── constants.ts                # APP_NAME, NAV items, DEMO_USER, PRICING_PLANS
│   └── db.ts                       # Prisma client singleton (v1.0)
├── types/
│   └── index.ts                    # Domain types (User, Lesson, Mission, etc.)
└── docs/                           # Product documentation
```

### 2.3 Wzorce komponentów

#### React Server Components (domyślnie)
Wszystkie komponenty są RSC by default. Dostęp do DB bezpośrednio — bez API.

```typescript
// app/(app)/lessons/page.tsx
import { prisma } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"

export default async function LessonsPage() {
  const { userId } = await auth()
  const lessons = await prisma.lesson.findMany({ where: { published: true } })
  return <LessonsGrid lessons={lessons} />
}
```

#### Client Components — tylko gdy potrzebne
Interaktywne elementy: AI chat, streak widget, theme toggle.

```typescript
"use client"
// Używaj tylko dla: useState, useEffect, event handlers, browser APIs
```

#### Server Actions — formularze i mutacje

```typescript
// actions/goals.ts
"use server"
import { prisma } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

export async function createGoal(formData: FormData) {
  const { userId } = await auth()
  await prisma.savingsGoal.create({
    data: { childId: formData.get("childId") as string, ... }
  })
  revalidatePath("/goals")
}
```

### 2.4 Theming

Motywy oparte na CSS custom properties w `:root` i `.dark`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222 47% 11%;
  --primary: 199 89% 48%;      /* brand sky */
  --card: 0 0% 100%;
  ...
}
.dark {
  --background: 222 47% 7%;
  --foreground: 213 31% 91%;
  ...
}
```

---

## 3. Backend

### 3.1 API Routes

```
app/api/
├── ai/
│   ├── chat/route.ts           # POST — streaming AI conversation
│   ├── report/route.ts         # POST — generate weekly report (background)
│   └── missions/route.ts       # POST — AI mission generator
├── webhooks/
│   ├── stripe/route.ts         # POST — Stripe Billing events
│   └── clerk/route.ts          # POST — Clerk user events
├── lessons/
│   └── [id]/complete/route.ts  # POST — mark lesson complete, award XP
└── goals/
    └── [id]/contribute/route.ts # POST — add funds to savings goal
```

### 3.2 Middleware

```typescript
// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

const isPublicRoute = createRouteMatcher(["/", "/pricing", "/sign-in", "/sign-up"])
const isAdminRoute = createRouteMatcher(["/admin(.*)"])

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) await auth.protect()
  if (isAdminRoute(req)) await auth.protect({ role: "org:admin" })
})

export const config = {
  matcher: ["/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)", "/(api|trpc)(.*)"],
}
```

---

## 4. Baza danych — Prisma + PostgreSQL

### 4.1 Dostawca

**Supabase** (managed PostgreSQL):
- Connection pooling via Supabase Pooler (Transaction mode dla serverless)
- Row Level Security (RLS) jako dodatkowa warstwa
- Realtime subscriptions (future: live XP updates)
- Storage (future: certyfikaty PDF, avatary)

### 4.2 Schemat Prisma

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

// ─── AUTH ─────────────────────────────────────────────────────────────

model User {
  id          String    @id @default(cuid())
  clerkId     String    @unique
  email       String    @unique
  name        String
  role        UserRole  @default(PARENT)
  plan        Plan      @default(FREE)
  planExpiry  DateTime?
  stripeCustomerId String? @unique

  children    Child[]
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@index([clerkId])
}

enum UserRole { PARENT CHILD ADMIN }
enum Plan    { FREE FAMILY FAMILY_PLUS }

// ─── CHILD PROFILE ────────────────────────────────────────────────────

model Child {
  id          String   @id @default(cuid())
  parentId    String
  parent      User     @relation(fields: [parentId], references: [id])

  name        String
  birthYear   Int
  avatarUrl   String?
  xp          Int      @default(0)
  level       Int      @default(1)
  coins       Int      @default(0)
  streakDays  Int      @default(0)
  lastActive  DateTime?

  lessonProgress  LessonProgress[]
  missionProgress MissionProgress[]
  savingsGoals    SavingsGoal[]
  chatMessages    AiMessage[]
  badges          ChildBadge[]

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([parentId])
}

// ─── CONTENT ──────────────────────────────────────────────────────────

model Course {
  id          String    @id @default(cuid())
  code        String    @unique   // "E1", "L2", "A1", "M3"
  title       String
  description String
  ageMin      Int
  ageMax      Int
  orderIndex  Int

  lessons     Lesson[]
}

model Lesson {
  id          String   @id @default(cuid())
  courseId    String
  course      Course   @relation(fields: [courseId], references: [id])

  code        String   @unique   // "E1.1", "L2.3"
  title       String
  description String
  durationMin Int
  xpReward    Int
  orderIndex  Int
  published   Boolean  @default(false)

  questions   QuizQuestion[]
  progress    LessonProgress[]

  @@index([courseId])
}

model LessonProgress {
  id          String   @id @default(cuid())
  childId     String
  child       Child    @relation(fields: [childId], references: [id])
  lessonId    String
  lesson      Lesson   @relation(fields: [lessonId], references: [id])

  status      ProgressStatus @default(NOT_STARTED)
  quizScore   Int?           // 0–100
  xpEarned    Int            @default(0)
  completedAt DateTime?

  @@unique([childId, lessonId])
}

enum ProgressStatus { NOT_STARTED IN_PROGRESS COMPLETED }

model QuizQuestion {
  id          String       @id @default(cuid())
  lessonId    String
  lesson      Lesson       @relation(fields: [lessonId], references: [id])

  type        QuestionType
  question    String
  options     Json         // string[]
  correct     Json         // string | string[]
  explanation String
  difficulty  Difficulty   @default(MEDIUM)
  conceptTag  String?
  aiGenerated Boolean      @default(false)

  @@index([lessonId])
}

enum QuestionType { SINGLE_CHOICE MULTI_SELECT TRUE_FALSE DRAG_DROP CALCULATION }
enum Difficulty  { EASY MEDIUM HARD }

// ─── MISSIONS ─────────────────────────────────────────────────────────

model Mission {
  id          String   @id @default(cuid())
  title       String
  description String
  category    String
  durationDays Int
  xpReward    Int
  coinReward  Int
  difficulty  Difficulty
  ageMin      Int
  ageMax      Int
  aiGenerated Boolean  @default(false)
  published   Boolean  @default(false)

  progress    MissionProgress[]
}

model MissionProgress {
  id          String        @id @default(cuid())
  childId     String
  child       Child         @relation(fields: [childId], references: [id])
  missionId   String
  mission     Mission       @relation(fields: [missionId], references: [id])

  status      MissionStatus @default(ACTIVE)
  startedAt   DateTime      @default(now())
  completedAt DateTime?
  parentVerified Boolean    @default(false)

  checkIns    MissionCheckIn[]

  @@unique([childId, missionId])
}

enum MissionStatus { ACTIVE COMPLETED FAILED ABANDONED }

model MissionCheckIn {
  id          String          @id @default(cuid())
  progressId  String
  progress    MissionProgress @relation(fields: [progressId], references: [id])

  note        String?
  completedAt DateTime        @default(now())
}

// ─── SAVINGS GOALS ────────────────────────────────────────────────────

model SavingsGoal {
  id          String   @id @default(cuid())
  childId     String
  child       Child    @relation(fields: [childId], references: [id])

  title       String
  emoji       String   @default("🎯")
  targetAmount  Decimal @db.Decimal(10, 2)
  currentAmount Decimal @db.Decimal(10, 2) @default(0)
  deadline    DateTime?
  achieved    Boolean  @default(false)
  achievedAt  DateTime?

  contributions GoalContribution[]
  createdAt   DateTime @default(now())
}

model GoalContribution {
  id        String      @id @default(cuid())
  goalId    String
  goal      SavingsGoal @relation(fields: [goalId], references: [id])

  amount    Decimal     @db.Decimal(10, 2)
  source    String      // "child" | "parent" | "reward"
  note      String?
  createdAt DateTime    @default(now())
}

// ─── BADGES ───────────────────────────────────────────────────────────

model Badge {
  id          String       @id @default(cuid())
  code        String       @unique
  name        String
  description String
  emoji       String
  category    BadgeCategory
  xpReward    Int
  condition   Json         // { type, threshold } — evaluated server-side

  children    ChildBadge[]
}

model ChildBadge {
  id        String   @id @default(cuid())
  childId   String
  child     Child    @relation(fields: [childId], references: [id])
  badgeId   String
  badge     Badge    @relation(fields: [badgeId], references: [id])

  earnedAt  DateTime @default(now())

  @@unique([childId, badgeId])
}

enum BadgeCategory { EDUCATION FINANCIAL STREAK FAMILY AI SPECIAL }

// ─── AI ───────────────────────────────────────────────────────────────

model AiMessage {
  id        String      @id @default(cuid())
  childId   String
  child     Child       @relation(fields: [childId], references: [id])

  role      MessageRole
  content   String
  tokens    Int?
  model     String?     // "claude-haiku-3-5" | "claude-sonnet-4-5"

  createdAt DateTime    @default(now())

  @@index([childId, createdAt])
}

enum MessageRole { USER ASSISTANT }

// ─── BILLING ──────────────────────────────────────────────────────────

model Subscription {
  id                 String             @id @default(cuid())
  userId             String             @unique
  user               User               @relation(fields: [userId], references: [id])

  stripeSubId        String             @unique
  stripePriceId      String
  status             SubscriptionStatus
  plan               Plan
  currentPeriodStart DateTime
  currentPeriodEnd   DateTime
  cancelAtPeriodEnd  Boolean            @default(false)

  updatedAt          DateTime           @updatedAt
}

enum SubscriptionStatus { ACTIVE PAST_DUE CANCELED PAUSED TRIALING }
```

### 4.3 Indeksy i wydajność

```sql
-- Najczęstsze zapytania wymagające indeksów
CREATE INDEX idx_lesson_progress_child ON "LessonProgress"("childId");
CREATE INDEX idx_mission_progress_child ON "MissionProgress"("childId");
CREATE INDEX idx_ai_messages_child_date ON "AiMessage"("childId", "createdAt" DESC);
CREATE INDEX idx_savings_goal_child ON "SavingsGoal"("childId");
```

### 4.4 Singleton Prisma Client

```typescript
// lib/db.ts
import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === "development" ? ["query"] : [],
})

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
```

---

## 5. Autentykacja — Clerk

### Konfiguracja

```typescript
// .env.local
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
```

### Webhook — synchronizacja z DB

```typescript
// app/api/webhooks/clerk/route.ts
import { Webhook } from "svix"
import { prisma } from "@/lib/db"

export async function POST(req: Request) {
  const evt = await verifyClerkWebhook(req)

  if (evt.type === "user.created") {
    await prisma.user.create({
      data: {
        clerkId: evt.data.id,
        email: evt.data.email_addresses[0].email_address,
        name: `${evt.data.first_name} ${evt.data.last_name}`,
      }
    })
  }
  return new Response("OK")
}
```

---

## 6. Warstwa AI

### 6.1 AI Mentor — endpoint streamujący

```typescript
// app/api/ai/chat/route.ts
import Anthropic from "@anthropic-ai/sdk"
import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/db"
import { buildChildContext, selectModel } from "@/lib/ai/context"
import { checkRateLimit } from "@/lib/ai/rate-limit"

export async function POST(req: Request) {
  const { userId } = await auth()
  const { childId, message } = await req.json()

  await checkRateLimit(childId)  // 50 msg/mies. dla Family

  const child = await prisma.child.findUniqueOrThrow({
    where: { id: childId },
    include: { lessonProgress: { take: 3, orderBy: { completedAt: "desc" } } }
  })

  const context = buildChildContext(child)
  const model = selectModel(message)  // haiku vs. sonnet

  const client = new Anthropic()
  const stream = client.messages.stream({
    model,
    max_tokens: 1024,
    system: context.systemPrompt,
    messages: [...context.history, { role: "user", content: message }],
  })

  await prisma.aiMessage.create({
    data: { childId, role: "USER", content: message, model }
  })

  return new Response(stream.toReadableStream(), {
    headers: { "Content-Type": "text/event-stream" }
  })
}
```

### 6.2 System prompt — guardrails

```typescript
// lib/ai/prompts.ts
export function buildSystemPrompt(child: Child): string {
  const ageGroup = getAgeGroup(child.birthYear)

  return `
Jesteś Finnekiem — AI Mentorem Family Finance Academy.
Rozmawiasz z ${child.name}, ${getAge(child.birthYear)}-latkiem.

STYL KOMUNIKACJI (${ageGroup}):
${AGE_STYLE[ageGroup]}

DOZWOLONE TEMATY:
- Finanse osobiste, oszczędzanie, budżet, inwestycje (poziom dla wieku)
- Motywacja, cele, nagrody
- Tłumaczenie pojęć z lekcji

ZAKAZANE:
- Porady inwestycyjne (konkretne papiery wartościowe)
- Treści dla dorosłych
- Opinie polityczne
- Udawanie człowieka

Zawsze kończ odpowiedź pytaniem zwrotnym lub zadaniem do przemyślenia.
Jesteś AI — jeśli zapytany, powiedz o tym jasno.
  `.trim()
}
```

### 6.3 Dobór modelu (auto-escalation)

```typescript
// lib/ai/context.ts
export function selectModel(message: string): string {
  const isComplex = message.length > 200
    || /inwestycj|podatek|kredyt|procent składany/i.test(message)

  return isComplex ? "claude-sonnet-4-5" : "claude-haiku-3-5-20241022"
}
```

### 6.4 Rate limiting

```typescript
// lib/ai/rate-limit.ts
import { prisma } from "@/lib/db"

const LIMITS = { FREE: 5, FAMILY: 50, FAMILY_PLUS: Infinity }

export async function checkRateLimit(childId: string) {
  const child = await prisma.child.findUniqueOrThrow({
    where: { id: childId },
    include: { parent: true }
  })

  const limit = LIMITS[child.parent.plan]
  const startOfMonth = new Date(new Date().setDate(1))

  const count = await prisma.aiMessage.count({
    where: { childId, role: "USER", createdAt: { gte: startOfMonth } }
  })

  if (count >= limit) {
    throw new Error("RATE_LIMIT_EXCEEDED")
  }
}
```

---

## 7. Billing — Stripe

### 7.1 Konfiguracja produktów

```
Stripe Products:
  prod_family       → "Family Plan"
    price_family_monthly  → 39 PLN / month
    price_family_yearly   → 349 PLN / year

  prod_family_plus  → "Family Plus Plan"
    price_plus_monthly    → 69 PLN / month
    price_plus_yearly     → 599 PLN / year
```

### 7.2 Checkout flow

```typescript
// app/api/billing/checkout/route.ts
import Stripe from "stripe"
import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/db"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  const { userId } = await auth()
  const { priceId } = await req.json()

  const user = await prisma.user.findUniqueOrThrow({ where: { clerkId: userId! } })

  const session = await stripe.checkout.sessions.create({
    customer: user.stripeCustomerId ?? undefined,
    mode: "subscription",
    payment_method_types: ["card", "blik", "p24"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard?upgraded=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing`,
    subscription_data: {
      trial_period_days: priceId.includes("plus") ? 7 : 14,
      metadata: { userId: user.id }
    }
  })

  return Response.json({ url: session.url })
}
```

### 7.3 Webhook handler

```typescript
// app/api/webhooks/stripe/route.ts
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature")!
  const body = await req.text()
  const event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)

  switch (event.type) {
    case "customer.subscription.created":
    case "customer.subscription.updated":
      await syncSubscription(event.data.object as Stripe.Subscription)
      break
    case "customer.subscription.deleted":
      await cancelSubscription(event.data.object as Stripe.Subscription)
      break
    case "invoice.payment_failed":
      await handlePaymentFailure(event.data.object as Stripe.Invoice)
      break
  }

  return new Response("OK")
}

async function syncSubscription(sub: Stripe.Subscription) {
  const plan = getPlanFromPriceId(sub.items.data[0].price.id)
  await prisma.subscription.upsert({
    where: { stripeSubId: sub.id },
    update: { status: sub.status.toUpperCase() as any, plan, currentPeriodEnd: new Date(sub.current_period_end * 1000) },
    create: { userId: sub.metadata.userId, stripeSubId: sub.id, stripePriceId: sub.items.data[0].price.id, status: "ACTIVE", plan, currentPeriodStart: new Date(sub.current_period_start * 1000), currentPeriodEnd: new Date(sub.current_period_end * 1000) }
  })
  await prisma.user.update({ where: { id: sub.metadata.userId }, data: { plan } })
}
```

---

## 8. Email — Resend

### Szablony transakcyjne

| Trigger | Template | Czas |
|---|---|---|
| Rejestracja | `welcome` | natychmiast |
| Koniec trialu (3 dni przed) | `trial-ending` | T-3 dni |
| Nieaktywność 7 dni | `reactivation` | T+7 |
| Raport tygodniowy AI | `weekly-report` | poniedziałek 8:00 |
| Płatność nieudana | `payment-failed` | natychmiast |
| Subskrypcja anulowana | `cancellation` | natychmiast |
| Cel osiągnięty | `goal-achieved` | natychmiast |

```typescript
// lib/email.ts
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendWeeklyReport(userId: string) {
  const report = await generateAiReport(userId)

  await resend.emails.send({
    from: "Finnek <finnek@familyfinanceacademy.pl>",
    to: report.parentEmail,
    subject: `Raport tygodniowy ${report.childName} — ${report.dateRange}`,
    react: WeeklyReportEmail({ report }),
  })
}
```

---

## 9. Analityka — PostHog

### Konfiguracja

```typescript
// app/providers.tsx — PostHogProvider
import posthog from "posthog-js"
import { PostHogProvider } from "posthog-js/react"

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  api_host: "/ingest",   // proxy przez Next.js (adblocker bypass)
  person_profiles: "identified_only",
  capture_pageview: false,  // manual — po auth
})
```

### Kluczowe eventy

```typescript
// lib/analytics.ts
export const track = {
  lessonStarted:   (lessonId: string) => posthog.capture("lesson_started", { lessonId }),
  lessonCompleted: (lessonId: string, score: number) => posthog.capture("lesson_completed", { lessonId, score }),
  missionAccepted: (missionId: string) => posthog.capture("mission_accepted", { missionId }),
  goalCreated:     (targetAmount: number) => posthog.capture("goal_created", { targetAmount }),
  aiMessageSent:   (childAge: number) => posthog.capture("ai_message_sent", { childAge }),
  planSelected:    (plan: string, period: string) => posthog.capture("plan_selected", { plan, period }),
  trialStarted:    (plan: string) => posthog.capture("trial_started", { plan }),
  subscribed:      (plan: string, mrr: number) => posthog.capture("subscribed", { plan, mrr }),
  streakMilestone: (days: number) => posthog.capture("streak_milestone", { days }),
}
```

### Kluczowe metryki w PostHog

- **Funnel: Rejestracja → Trial → Płatność** (cel: 40% konwersja)
- **Retention cohorts** (D1 / D7 / D30)
- **Feature flags** — A/B testy cennika, onboardingu
- **Session recordings** (dla UX research)

---

## 10. Monitoring — Sentry

```typescript
// sentry.client.config.ts
import * as Sentry from "@sentry/nextjs"

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,       // 10% transactions
  replaysSessionSampleRate: 0.01,
  replaysOnErrorSampleRate: 1.0,
  environment: process.env.NODE_ENV,
  beforeSend(event) {
    // Strip PII before sending
    if (event.user) { delete event.user.email }
    return event
  }
})
```

### Alerty

| Alert | Threshold | Kanał |
|---|---|---|
| Error rate | > 1% w 5 min | Slack #alerts |
| AI API errors | > 5 w 1 min | Slack #alerts |
| Stripe webhook failures | jakikolwiek błąd | PagerDuty |
| P95 latency | > 3s | Slack #perf |

---

## 11. CI/CD — GitHub Actions + Vercel

```yaml
# .github/workflows/ci.yml
name: CI

on: [push, pull_request]

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: "20", cache: "npm" }
      - run: npm ci
      - run: npm run type-check   # tsc --noEmit
      - run: npm run lint          # eslint
      - run: npm run build         # next build
```

### Deployment

```
main branch  → auto-deploy → production (familyfinanceacademy.pl)
PR branches  → auto-deploy → preview URLs (vercel.app)
```

### Zmienne środowiskowe (Vercel)

```
# Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
CLERK_WEBHOOK_SECRET

# DB
DATABASE_URL          # Supabase pooler (Transaction mode)
DIRECT_URL            # Supabase direct (migrations only)

# AI
ANTHROPIC_API_KEY
OPENAI_API_KEY        # fallback

# Billing
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

# Email
RESEND_API_KEY

# Analytics
NEXT_PUBLIC_POSTHOG_KEY
NEXT_PUBLIC_POSTHOG_HOST

# Monitoring
NEXT_PUBLIC_SENTRY_DSN
SENTRY_AUTH_TOKEN

# App
NEXT_PUBLIC_URL       # https://familyfinanceacademy.pl
```

---

## 12. Bezpieczeństwo

### Ochrona danych dzieci (RODO + child safety)

- **Dane dzieci** — nie przechowujemy pełnych danych osobowych. Tylko imię + rok urodzenia.
- **Historia AI** — dostępna dla rodzica, nie dla dziecka (parent oversight)
- **Content moderation** — każda odpowiedź AI przechodzi przez filter przed wysłaniem do UI
- **RLS Supabase** — każdy użytkownik widzi tylko swoje dane na poziomie DB

### Nagłówki HTTP

```typescript
// next.config.ts
const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Content-Security-Policy", value: buildCSP() },
]
```

### Input validation

Wszystkie API Routes walidują input przez **Zod**:

```typescript
import { z } from "zod"

const CreateGoalSchema = z.object({
  childId: z.string().cuid(),
  title: z.string().min(1).max(100),
  targetAmount: z.number().positive().max(100_000),
  deadline: z.string().datetime().optional(),
})
```

---

*Dokument wersja 1.0 | Data: 2025 Q1 | Właściciel: CTO*
