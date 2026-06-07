import { PrismaClient, AgeGroup, Difficulty, BadgeCategory, SubscriptionTier, SubscriptionStatus, MissionStatus, UserRole } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────

function daysFromNow(days: number): Date {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d
}

function daysAgo(days: number): Date {
  const d = new Date()
  d.setDate(d.getDate() - days)
  return d
}

// ─────────────────────────────────────────────────────────────
// MAIN SEED
// ─────────────────────────────────────────────────────────────

async function main() {
  console.log("🌱 Seeding Family Finance Academy...")

  // ── 1. FAMILY ───────────────────────────────────────────────

  const family = await prisma.family.upsert({
    where: { id: "00000000-0000-0000-0000-000000000001" },
    update: {},
    create: {
      id: "00000000-0000-0000-0000-000000000001",
      name: "Rodzina Kowalskich",
      subscriptionTier: SubscriptionTier.FAMILY,
    },
  })

  console.log(`  ✓ Family: ${family.name}`)

  // ── 2. PARENTS ──────────────────────────────────────────────

  const parentMarek = await prisma.user.upsert({
    where: { email: "marek.kowalski@example.com" },
    update: {},
    create: {
      id: "00000000-0000-0000-0001-000000000001",
      email: "marek.kowalski@example.com",
      firstName: "Marek",
      lastName: "Kowalski",
      role: UserRole.PARENT,
      familyId: family.id,
    },
  })

  const parentAnna = await prisma.user.upsert({
    where: { email: "anna.kowalska@example.com" },
    update: {},
    create: {
      id: "00000000-0000-0000-0001-000000000002",
      email: "anna.kowalska@example.com",
      firstName: "Anna",
      lastName: "Kowalska",
      role: UserRole.PARENT,
      familyId: family.id,
    },
  })

  console.log(`  ✓ Parents: ${parentMarek.firstName}, ${parentAnna.firstName}`)

  // ── 3. CHILDREN ─────────────────────────────────────────────

  const childZosia = await prisma.childProfile.upsert({
    where: { id: "00000000-0000-0000-0002-000000000001" },
    update: {},
    create: {
      id: "00000000-0000-0000-0002-000000000001",
      parentId: parentMarek.id,
      familyId: family.id,
      firstName: "Zosia",
      lastName: "Kowalska",
      birthYear: 2016,
      ageGroup: AgeGroup.EXPLORER,
      avatarUrl: null,
      xp: 420,
      level: 3,
      coins: 85,
      streakDays: 7,
      longestStreak: 12,
      lastActiveAt: new Date(),
    },
  })

  const childKacper = await prisma.childProfile.upsert({
    where: { id: "00000000-0000-0000-0002-000000000002" },
    update: {},
    create: {
      id: "00000000-0000-0000-0002-000000000002",
      parentId: parentMarek.id,
      familyId: family.id,
      firstName: "Kacper",
      lastName: "Kowalski",
      birthYear: 2011,
      ageGroup: AgeGroup.ACHIEVER,
      avatarUrl: null,
      xp: 1240,
      level: 5,
      coins: 210,
      streakDays: 14,
      longestStreak: 21,
      lastActiveAt: daysAgo(1),
    },
  })

  console.log(`  ✓ Children: ${childZosia.firstName}, ${childKacper.firstName}`)

  // ── 4. SUBSCRIPTION ─────────────────────────────────────────

  await prisma.subscription.upsert({
    where: { familyId: family.id },
    update: {},
    create: {
      familyId: family.id,
      plan: SubscriptionTier.FAMILY,
      status: SubscriptionStatus.ACTIVE,
      currentPeriodStart: daysAgo(15),
      currentPeriodEnd: daysFromNow(15),
      renewalDate: daysFromNow(15),
    },
  })

  console.log("  ✓ Subscription: FAMILY ACTIVE")

  // ── 5. COURSES ──────────────────────────────────────────────

  const courseE1 = await prisma.course.upsert({
    where: { code: "E1" },
    update: {},
    create: {
      id: "00000000-0000-0000-0003-000000000001",
      code: "E1",
      title: "Skąd się biorą pieniądze?",
      description: "Podstawy finansów dla najmłodszych — pieniądze, praca, sklep.",
      ageGroup: AgeGroup.EXPLORER,
      orderIndex: 1,
    },
  })

  const courseE2 = await prisma.course.upsert({
    where: { code: "E2" },
    update: {},
    create: {
      id: "00000000-0000-0000-0003-000000000002",
      code: "E2",
      title: "Moje pierwsze oszczędzanie",
      description: "Nauka oszczędzania, planowania małego zakupu i odkładania na marzenia.",
      ageGroup: AgeGroup.EXPLORER,
      orderIndex: 2,
    },
  })

  const courseL1 = await prisma.course.upsert({
    where: { code: "L1" },
    update: {},
    create: {
      id: "00000000-0000-0000-0003-000000000003",
      code: "L1",
      title: "Budżet to mój plan",
      description: "Przychody, wydatki, kategorie i planowanie miesięczne.",
      ageGroup: AgeGroup.LEARNER,
      orderIndex: 3,
    },
  })

  console.log(`  ✓ Courses: E1, E2, L1`)

  // ── 6. LESSONS (4 × E1, 4 × E2, 4 × L1) ────────────────────

  const lessonsData = [
    // E1 lessons
    { id: "00000000-0000-0000-0004-000000000001", courseId: courseE1.id, code: "E1.1", title: "Co to są pieniądze?", description: "Animacja tłumacząca czym są pieniądze i do czego służą.", orderIndex: 1, durationMinutes: 5, xpReward: 30, published: true },
    { id: "00000000-0000-0000-0004-000000000002", courseId: courseE1.id, code: "E1.2", title: "Monety i banknoty", description: "Interaktywna gra — rozpoznaj polskie monety i banknoty.", orderIndex: 2, durationMinutes: 6, xpReward: 35, published: true },
    { id: "00000000-0000-0000-0004-000000000003", courseId: courseE1.id, code: "E1.3", title: "Skąd tata i mama mają pieniądze?", description: "Historia o pracy i wynagrodzeniu.", orderIndex: 3, durationMinutes: 7, xpReward: 40, published: true },
    { id: "00000000-0000-0000-0004-000000000004", courseId: courseE1.id, code: "E1.4", title: "Jak działa sklep?", description: "Symulacja zakupów — kupowanie i reszta.", orderIndex: 4, durationMinutes: 8, xpReward: 45, published: true },
    // E2 lessons
    { id: "00000000-0000-0000-0004-000000000005", courseId: courseE2.id, code: "E2.1", title: "Co to znaczy oszczędzać?", description: "Animacja o odkładaniu pieniędzy na później.", orderIndex: 1, durationMinutes: 5, xpReward: 30, published: true },
    { id: "00000000-0000-0000-0004-000000000006", courseId: courseE2.id, code: "E2.2", title: "Moja skarbonka", description: "Interaktywna lekcja o zbieraniu monet.", orderIndex: 2, durationMinutes: 7, xpReward: 40, published: true },
    { id: "00000000-0000-0000-0004-000000000007", courseId: courseE2.id, code: "E2.3", title: "Planowanie małego zakupu", description: "Symulacja — ile tygodni oszczędzać na wymarzony zakup.", orderIndex: 3, durationMinutes: 8, xpReward: 45, published: true },
    { id: "00000000-0000-0000-0004-000000000008", courseId: courseE2.id, code: "E2.4", title: "Marzenie i plan", description: "Projekt — wybieram marzenie i tworzę plan oszczędzania.", orderIndex: 4, durationMinutes: 8, xpReward: 50, published: true },
    // L1 lessons
    { id: "00000000-0000-0000-0004-000000000009", courseId: courseL1.id, code: "L1.1", title: "Czym jest budżet?", description: "Wideo + quiz wyjaśniające ideę planowania finansów.", orderIndex: 1, durationMinutes: 10, xpReward: 50, published: true },
    { id: "00000000-0000-0000-0004-000000000010", courseId: courseL1.id, code: "L1.2", title: "Przychody vs wydatki", description: "Interaktywna tabela — klasyfikuj transakcje.", orderIndex: 2, durationMinutes: 12, xpReward: 60, published: true },
    { id: "00000000-0000-0000-0004-000000000011", courseId: courseL1.id, code: "L1.3", title: "Kategorie wydatków", description: "Sortowanie wydatków do kategorii.", orderIndex: 3, durationMinutes: 10, xpReward: 55, published: true },
    { id: "00000000-0000-0000-0004-000000000012", courseId: courseL1.id, code: "L1.4", title: "Mój budżet tygodniowy", description: "Ćwiczenie — stwórz swój pierwszy budżet.", orderIndex: 4, durationMinutes: 12, xpReward: 65, published: true },
  ]

  for (const lesson of lessonsData) {
    await prisma.lesson.upsert({
      where: { code: lesson.code },
      update: {},
      create: lesson,
    })
  }

  console.log(`  ✓ Lessons: 12 created`)

  // ── 7. QUIZZES for first lesson of each course ───────────────

  const quizData = [
    {
      lessonCode: "E1.1",
      questions: [
        {
          orderIndex: 1,
          question: "Do czego służą pieniądze?",
          type: "SINGLE_CHOICE" as const,
          options: ["Do zabawy", "Do kupowania rzeczy i usług", "Do jedzenia", "Do budowania domów"],
          correctAnswer: "Do kupowania rzeczy i usług",
          explanation: "Pieniądze służą jako środek wymiany — możemy za nie kupić towary i usługi.",
          difficulty: Difficulty.EASY,
          conceptTag: "money_basics",
        },
        {
          orderIndex: 2,
          question: "Co to jest moneta?",
          type: "SINGLE_CHOICE" as const,
          options: ["Papierowy pieniądz", "Metalowy pieniądz", "Plastikowa karta", "Czek bankowy"],
          correctAnswer: "Metalowy pieniądz",
          explanation: "Moneta to metalowy krążek używany jako środek płatniczy.",
          difficulty: Difficulty.EASY,
          conceptTag: "money_basics",
        },
        {
          orderIndex: 3,
          question: "Pieniądze można znaleźć rosnące na drzewach.",
          type: "TRUE_FALSE" as const,
          options: ["Prawda", "Fałsz"],
          correctAnswer: "Fałsz",
          explanation: "Pieniędzy nie można znaleźć na drzewach — trzeba je zarobić pracą.",
          difficulty: Difficulty.EASY,
          conceptTag: "money_basics",
        },
      ],
    },
    {
      lessonCode: "E2.1",
      questions: [
        {
          orderIndex: 1,
          question: "Co to znaczy oszczędzać?",
          type: "SINGLE_CHOICE" as const,
          options: ["Wydawać wszystkie pieniądze", "Odkładać część pieniędzy na później", "Pożyczać pieniądze", "Dawać pieniądze innym"],
          correctAnswer: "Odkładać część pieniędzy na później",
          explanation: "Oszczędzanie to odkładanie części pieniędzy zamiast ich natychmiastowego wydawania.",
          difficulty: Difficulty.EASY,
          conceptTag: "saving",
        },
        {
          orderIndex: 2,
          question: "Gdzie najlepiej przechowywać swoje oszczędności?",
          type: "SINGLE_CHOICE" as const,
          options: ["Pod poduszką", "W skarbonce lub banku", "W kieszeni", "Na podłodze"],
          correctAnswer: "W skarbonce lub banku",
          explanation: "Skarbonka to dobry początek — bank jest jeszcze lepszy, bo pieniądze są tam bezpieczne.",
          difficulty: Difficulty.EASY,
          conceptTag: "saving",
        },
      ],
    },
    {
      lessonCode: "L1.1",
      questions: [
        {
          orderIndex: 1,
          question: "Co to jest budżet?",
          type: "SINGLE_CHOICE" as const,
          options: ["Lista zakupów", "Plan przychodów i wydatków", "Konto bankowe", "Rodzaj podatku"],
          correctAnswer: "Plan przychodów i wydatków",
          explanation: "Budżet to plan pokazujący ile pieniędzy wpływa i ile wypływa w danym czasie.",
          difficulty: Difficulty.EASY,
          conceptTag: "budgeting",
        },
        {
          orderIndex: 2,
          question: "Które z poniższych to przychód?",
          type: "MULTI_SELECT" as const,
          options: ["Kieszonkowe", "Zakup gry", "Premia urodzinowa", "Opłata za internet"],
          correctAnswer: ["Kieszonkowe", "Premia urodzinowa"],
          explanation: "Przychód to pieniądze, które do nas wpływają. Kieszonkowe i premia to przychody — zakup gry i opłata za internet to wydatki.",
          difficulty: Difficulty.MEDIUM,
          conceptTag: "budgeting",
        },
        {
          orderIndex: 3,
          question: "Jeśli wydajesz więcej niż zarabiasz, masz nadwyżkę budżetową.",
          type: "TRUE_FALSE" as const,
          options: ["Prawda", "Fałsz"],
          correctAnswer: "Fałsz",
          explanation: "Gdy wydajesz więcej niż zarabiasz, masz deficyt (niedobór), nie nadwyżkę.",
          difficulty: Difficulty.MEDIUM,
          conceptTag: "budgeting",
        },
      ],
    },
  ]

  for (const { lessonCode, questions } of quizData) {
    const lesson = await prisma.lesson.findUnique({ where: { code: lessonCode } })
    if (!lesson) continue

    const quiz = await prisma.quiz.upsert({
      where: { lessonId: lesson.id },
      update: {},
      create: { lessonId: lesson.id, passingScore: 60 },
    })

    for (const q of questions) {
      const existing = await prisma.quizQuestion.findFirst({
        where: { quizId: quiz.id, orderIndex: q.orderIndex },
      })
      if (!existing) {
        await prisma.quizQuestion.create({
          data: { quizId: quiz.id, ...q },
        })
      }
    }
  }

  console.log("  ✓ Quizzes: 3 quizzes, 8 questions")

  // ── 8. MISSIONS ─────────────────────────────────────────────

  const missionsData = [
    { title: "Moja pierwsza skarbonka", description: "Odłóż 10 zł do skarbonki w tym tygodniu.", category: "Oszczędzanie", difficulty: Difficulty.EASY, durationDays: 7, xpReward: 100, coinReward: 15, ageMin: 6, ageMax: 8 },
    { title: "Zakupy z listą", description: "Zrób zakupy razem z rodzicem używając wcześniej przygotowanej listy.", category: "Budżetowanie", difficulty: Difficulty.EASY, durationDays: 3, xpReward: 80, coinReward: 10, ageMin: 6, ageMax: 10 },
    { title: "Cel: Nowa zabawka", description: "Ustal cel oszczędnościowy i odkładaj przez 2 tygodnie.", category: "Cele", difficulty: Difficulty.EASY, durationDays: 14, xpReward: 150, coinReward: 20, ageMin: 6, ageMax: 10 },
    { title: "Pomocnik w domu", description: "Wykonaj 3 obowiązki domowe i zapytaj rodzica o symboliczne wynagrodzenie.", category: "Zarabianie", difficulty: Difficulty.EASY, durationDays: 7, xpReward: 120, coinReward: 18, ageMin: 7, ageMax: 11 },
    { title: "Budżet na tydzień", description: "Zaplanuj i śledź swój budżet przez cały tydzień.", category: "Budżetowanie", difficulty: Difficulty.MEDIUM, durationDays: 7, xpReward: 200, coinReward: 30, ageMin: 9, ageMax: 14 },
    { title: "Porównaj ceny", description: "Podczas zakupów porównaj ceny 3 produktów w dwóch różnych sklepach.", category: "Mądre zakupy", difficulty: Difficulty.MEDIUM, durationDays: 5, xpReward: 160, coinReward: 22, ageMin: 9, ageMax: 14 },
    { title: "Wywiady z zawodem", description: "Przeprowadź wywiad z 2 osobami o ich pracy i wynagrodzeniu.", category: "Zarabianie", difficulty: Difficulty.MEDIUM, durationDays: 7, xpReward: 180, coinReward: 25, ageMin: 10, ageMax: 15 },
    { title: "Reguła 50/30/20", description: "Zastosuj regułę 50/30/20 do swojego miesięcznego budżetu.", category: "Budżetowanie", difficulty: Difficulty.HARD, durationDays: 30, xpReward: 350, coinReward: 50, ageMin: 12, ageMax: 18 },
    { title: "Fundusz awaryjny", description: "Zacznij budować fundusz awaryjny — odłóż 3-krotność tygodniowych wydatków.", category: "Oszczędzanie", difficulty: Difficulty.HARD, durationDays: 30, xpReward: 300, coinReward: 45, ageMin: 12, ageMax: 18 },
    { title: "Świąteczny planista", description: "Zaplanuj prezenty dla 3 osób w budżecie 100 zł.", category: "Cele", difficulty: Difficulty.MEDIUM, durationDays: 14, xpReward: 220, coinReward: 35, ageMin: 9, ageMax: 18 },
  ]

  const createdMissions: string[] = []
  for (const mission of missionsData) {
    const existing = await prisma.mission.findFirst({ where: { title: mission.title } })
    if (!existing) {
      const m = await prisma.mission.create({ data: { ...mission, published: true } })
      createdMissions.push(m.id)
    } else {
      createdMissions.push(existing.id)
    }
  }

  console.log(`  ✓ Missions: ${createdMissions.length} created`)

  // ── 9. BADGES ───────────────────────────────────────────────

  const badgesData = [
    {
      code: "FIRST_STEP",
      name: "Pierwszy Krok",
      description: "Ukończ swoją pierwszą lekcję",
      emoji: "📚",
      category: BadgeCategory.EDUCATION,
      xpReward: 50,
      condition: { type: "lessons_completed", threshold: 1 },
    },
    {
      code: "WEEK_STREAK",
      name: "Tydzień z Rzędu",
      description: "Ucz się przez 7 dni bez przerwy",
      emoji: "🔥",
      category: BadgeCategory.STREAK,
      xpReward: 100,
      condition: { type: "streak_days", threshold: 7 },
    },
    {
      code: "SAVER_MASTER",
      name: "Oszczędny Mistrz",
      description: "Osiągnij swój pierwszy cel oszczędnościowy",
      emoji: "🐷",
      category: BadgeCategory.FINANCIAL,
      xpReward: 200,
      condition: { type: "goals_achieved", threshold: 1 },
    },
    {
      code: "PERFECTIONIST",
      name: "Perfekcjonista",
      description: "Uzyskaj 100% w quizie 3 razy z rzędu",
      emoji: "💯",
      category: BadgeCategory.EDUCATION,
      xpReward: 200,
      condition: { type: "perfect_scores_streak", threshold: 3 },
    },
    {
      code: "FAMILY_TEAM",
      name: "Drużyna Rodzinna",
      description: "Rodzic i dziecko aktywni w tym samym tygodniu",
      emoji: "👨‍👩‍👧",
      category: BadgeCategory.FAMILY,
      xpReward: 100,
      condition: { type: "family_active_same_week", threshold: 1 },
    },
  ]

  const createdBadges: { id: string; code: string }[] = []
  for (const badge of badgesData) {
    const b = await prisma.badge.upsert({
      where: { code: badge.code },
      update: {},
      create: badge,
    })
    createdBadges.push({ id: b.id, code: b.code })
  }

  console.log(`  ✓ Badges: ${createdBadges.length} created`)

  // ── 10. ASSIGN BADGES to Zosia ──────────────────────────────

  const firstStepBadge = createdBadges.find((b) => b.code === "FIRST_STEP")
  const weekStreakBadge = createdBadges.find((b) => b.code === "WEEK_STREAK")

  if (firstStepBadge) {
    await prisma.childBadge.upsert({
      where: { childId_badgeId: { childId: childZosia.id, badgeId: firstStepBadge.id } },
      update: {},
      create: { childId: childZosia.id, badgeId: firstStepBadge.id, earnedAt: daysAgo(10) },
    })
  }
  if (weekStreakBadge) {
    await prisma.childBadge.upsert({
      where: { childId_badgeId: { childId: childZosia.id, badgeId: weekStreakBadge.id } },
      update: {},
      create: { childId: childZosia.id, badgeId: weekStreakBadge.id, earnedAt: new Date() },
    })
  }

  console.log("  ✓ Badges assigned to Zosia")

  // ── 11. SAVINGS GOALS ────────────────────────────────────────

  const goalZosia = await prisma.savingsGoal.upsert({
    where: { id: "00000000-0000-0000-0005-000000000001" },
    update: {},
    create: {
      id: "00000000-0000-0000-0005-000000000001",
      childId: childZosia.id,
      title: "Nowa gra do konsoli",
      emoji: "🎮",
      targetAmount: 200,
      currentAmount: 134,
      deadline: daysFromNow(30),
    },
  })

  await prisma.goalContribution.createMany({
    skipDuplicates: true,
    data: [
      { goalId: goalZosia.id, amount: 50, source: "child", note: "Kieszonkowe z 3 tygodni" },
      { goalId: goalZosia.id, amount: 50, source: "parent", note: "Prezent urodzinowy" },
      { goalId: goalZosia.id, amount: 34, source: "child", note: "Reszta z kieszonkowego" },
    ],
  })

  const goalKacper = await prisma.savingsGoal.upsert({
    where: { id: "00000000-0000-0000-0005-000000000002" },
    update: {},
    create: {
      id: "00000000-0000-0000-0005-000000000002",
      childId: childKacper.id,
      title: "Rower górski",
      emoji: "🚴",
      targetAmount: 1200,
      currentAmount: 480,
      deadline: daysFromNow(90),
    },
  })

  await prisma.goalContribution.createMany({
    skipDuplicates: true,
    data: [
      { goalId: goalKacper.id, amount: 300, source: "child", note: "Zaoszczędzone kieszonkowe" },
      { goalId: goalKacper.id, amount: 100, source: "parent", note: "Premii za oceny" },
      { goalId: goalKacper.id, amount: 80, source: "child", note: "Pomoc u sąsiadów" },
    ],
  })

  console.log("  ✓ Savings goals: 2 created (Zosia: 67%, Kacper: 40%)")

  // ── 12. LESSON PROGRESS ─────────────────────────────────────

  const completedLessonCodes = ["E1.1", "E1.2", "E1.3", "E2.1", "E2.2"]
  for (const code of completedLessonCodes) {
    const lesson = await prisma.lesson.findUnique({ where: { code } })
    if (!lesson) continue
    await prisma.lessonProgress.upsert({
      where: { childId_lessonId: { childId: childZosia.id, lessonId: lesson.id } },
      update: {},
      create: {
        childId: childZosia.id,
        lessonId: lesson.id,
        completed: true,
        score: Math.floor(Math.random() * 30) + 70, // 70–100
        attempts: 1,
        xpEarned: lesson.xpReward,
        completedAt: daysAgo(Math.floor(Math.random() * 14)),
      },
    })
  }

  console.log("  ✓ Lesson progress: 5 lessons completed for Zosia")

  // ── 13. MISSION PROGRESS ────────────────────────────────────

  const [mission1, mission2, mission3] = await prisma.mission.findMany({
    take: 3,
    where: { published: true },
    orderBy: { createdAt: "asc" },
  })

  if (mission1) {
    await prisma.missionProgress.upsert({
      where: { childId_missionId: { childId: childZosia.id, missionId: mission1.id } },
      update: {},
      create: {
        childId: childZosia.id,
        missionId: mission1.id,
        status: MissionStatus.COMPLETED,
        parentVerified: true,
        completedAt: daysAgo(5),
      },
    })
  }

  if (mission2) {
    const mp = await prisma.missionProgress.upsert({
      where: { childId_missionId: { childId: childZosia.id, missionId: mission2.id } },
      update: {},
      create: {
        childId: childZosia.id,
        missionId: mission2.id,
        status: MissionStatus.ACTIVE,
      },
    })

    await prisma.missionCheckIn.create({
      data: {
        progressId: mp.id,
        note: "Kupiłam mleko i chleb z listy!",
        checkedInAt: daysAgo(1),
      },
    })
  }

  if (mission3) {
    await prisma.missionProgress.upsert({
      where: { childId_missionId: { childId: childKacper.id, missionId: mission3.id } },
      update: {},
      create: {
        childId: childKacper.id,
        missionId: mission3.id,
        status: MissionStatus.ACTIVE,
      },
    })
  }

  console.log("  ✓ Mission progress: 3 entries created")

  // ── SUMMARY ─────────────────────────────────────────────────

  console.log("\n✅ Seed completed:")
  console.log(`   Family:   Rodzina Kowalskich`)
  console.log(`   Parents:  Marek, Anna`)
  console.log(`   Children: Zosia (Explorer, lvl ${childZosia.level}), Kacper (Achiever, lvl ${childKacper.level})`)
  console.log(`   Courses:  3  |  Lessons: 12  |  Missions: 10`)
  console.log(`   Badges:   5  |  Goals: 2`)
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
