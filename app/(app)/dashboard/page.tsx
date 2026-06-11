import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { auth } from "@/src/auth"
import { prisma } from "@/src/lib/db"
import { WelcomeCard } from "@/components/dashboard/welcome-card"
import { ProgressOverview } from "@/components/dashboard/progress-overview"
import { RecentLessons } from "@/components/dashboard/recent-lessons"
import { CurrentMissions } from "@/components/dashboard/current-missions"
import { SavingsGoalWidget } from "@/components/dashboard/savings-goal-widget"
import { AiMentorWidget } from "@/components/dashboard/ai-mentor-widget"
import { TodayLearningWidget } from "@/components/dashboard/today-learning-widget"
import { DailyChallengeCard } from "@/components/dashboard/daily-challenge-card"
import { TomorrowHookCard } from "@/components/dashboard/tomorrow-hook-card"
import { getTodayLearningState } from "@/src/lib/learning/todayState"
import { getTomorrowPreview } from "@/src/lib/learning/tomorrowPreview"
import { buildDailyMotivation } from "@/src/gamification/retention/dailyMotivation"
import { getXpToNextLevel } from "@/src/gamification/retention/progression"
import { DailyHeroCard } from "@/components/dashboard/daily-hero-card"
import { getHeroTitle } from "@/src/lib/hero/titles"

export const metadata: Metadata = { title: "Dashboard" }

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user) redirect("/sign-in")

  const child = await prisma.childProfile.findFirst({
    where: { userId: session.user.id, deletedAt: null },
    select: {
      id: true,
      firstName: true,
      xp: true,
      level: true,
      streakDays: true,
      avatarUrl: true,
      ageGroup: true,
      createdAt: true,
      lastActiveAt: true,
      badges: { select: { badge: { select: { id: true } } }, take: 100 },
      lessonProgress: {
        select: {
          id: true,
          completed: true,
          lesson: {
            select: {
              id: true,
              title: true,
              xpReward: true,
              course: { select: { title: true } },
            },
          },
        },
        orderBy: { updatedAt: "desc" },
        take: 5,
      },
      missionProgress: {
        where: { status: "ACTIVE", deletedAt: null },
        select: {
          id: true,
          startedAt: true,
          mission: { select: { id: true, title: true, xpReward: true, coinReward: true, durationDays: true } },
          checkIns: { select: { id: true } },
        },
        take: 3,
      },
      skillProgress: {
        where: { status: "COMPLETED" },
        select: { skillId: true },
      },
      savingsGoals: {
        where: { deletedAt: null, achieved: false },
        select: { id: true, title: true, emoji: true, targetAmount: true, currentAmount: true },
        orderBy: { createdAt: "asc" },
        take: 3,
      },
    },
  })

  if (!child) redirect("/onboarding")

  const completedSkillIds = child.skillProgress.map((sp) => sp.skillId)

  const [totalLessons, lessonsCompleted, totalMissions, missionsCompleted, totalBadges, todayState] =
    await Promise.all([
      prisma.lesson.count({ where: { published: true, deletedAt: null } }),
      prisma.lessonProgress.count({ where: { childId: child.id, completed: true } }),
      prisma.mission.count({ where: { published: true, deletedAt: null } }),
      prisma.missionProgress.count({ where: { childId: child.id, status: "COMPLETED" } }),
      prisma.badge.count(),
      getTodayLearningState({
        childId: child.id,
        ageGroup: child.ageGroup,
        xp: child.xp,
        level: child.level,
        streakDays: child.streakDays,
        childCreatedAt: child.createdAt,
        lastActiveAt: child.lastActiveAt,
        completedSkillIds,
      }),
    ])

  // Find next recommended lesson + quiz href
  const nextLesson = await prisma.lesson.findFirst({
    where: {
      published: true,
      deletedAt: null,
      course: { ageGroup: child.ageGroup, deletedAt: null },
      progress: { none: { childId: child.id, completed: true } },
    },
    select: { id: true, courseId: true, quiz: { select: { id: true } } },
    orderBy: [{ course: { orderIndex: "asc" } }, { orderIndex: "asc" }],
  })

  const nextLessonHref = nextLesson
    ? `/courses/${nextLesson.courseId}/lessons/${nextLesson.id}`
    : "/courses"
  const nextQuizHref = nextLesson?.quiz
    ? `/courses/${nextLesson.courseId}/lessons/${nextLesson.id}/quiz`
    : nextLessonHref

  const tomorrowPreview = getTomorrowPreview({
    childId: child.id,
    ageGroup: child.ageGroup,
    xp: child.xp,
    level: child.level,
    streakDays: child.streakDays,
    childCreatedAt: child.createdAt,
    completedSkillIds,
    currentDay: todayState.currentDay,
  })

  const heroTitle = getHeroTitle(child.level)

  // Next action href: first incomplete activity
  const nextActionHref = !todayState.lessonDoneToday
    ? nextLessonHref
    : !todayState.quizDoneToday
    ? nextQuizHref
    : "/missions"

  const motivation = buildDailyMotivation(
    child.ageGroup,
    child.streakDays,
    getXpToNextLevel(child.xp),
    5,
    `Dzień ${todayState.currentDay}/30 programu`,
    new Date().getHours(),
    child.id.charCodeAt(0) + new Date().getDate()
  )

  const recentLessons = child.lessonProgress.map((lp) => ({
    id: lp.lesson.id,
    title: lp.lesson.title,
    category: lp.lesson.course?.title ?? "Finanse",
    xpReward: lp.lesson.xpReward,
    progress: lp.completed ? 100 : 50,
  }))

  const activeMissions = child.missionProgress.map((mp) => {
    const durationDays = mp.mission.durationDays ?? 1
    const checkInCount = mp.checkIns.length
    const daysSinceStart = Math.floor(
      (Date.now() - mp.startedAt.getTime()) / (1000 * 60 * 60 * 24)
    )
    const daysLeft = Math.max(0, durationDays - daysSinceStart)
    return {
      id: mp.mission.id,
      title: mp.mission.title,
      xpReward: mp.mission.xpReward,
      coinsReward: mp.mission.coinReward,
      daysLeft: daysLeft > 0 ? daysLeft : null,
      progress: Math.min(100, Math.round((checkInCount / durationDays) * 100)),
    }
  })

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero CTA — ONE BIG BUTTON, primary retention surface */}
      <DailyHeroCard
        state={todayState}
        nextActionHref={nextActionHref}
        heroTitle={heroTitle}
        streakDays={child.streakDays}
        firstName={child.firstName}
      />

      <WelcomeCard
        name={child.firstName}
        xp={child.xp}
        level={child.level}
        streakDays={child.streakDays}
        avatarUrl={child.avatarUrl}
        heroTitle={heroTitle}
      />

      {/* Daily challenge + comeback — client component, shows on first login today */}
      <DailyChallengeCard
        challenge={motivation.dailyChallenge}
        isFirstLoginToday={todayState.isFirstLoginToday}
        comebackTier={todayState.comebackTier}
        daysSinceLastVisit={todayState.daysSinceLastVisit}
        streakDays={child.streakDays}
      />

      <ProgressOverview
        lessonsCompleted={lessonsCompleted}
        lessonsTotal={totalLessons}
        missionsCompleted={missionsCompleted}
        missionsTotal={totalMissions}
        badgesEarned={child.badges.length}
        badgesTotal={totalBadges}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* TODAY — primary retention widget */}
          <TodayLearningWidget state={todayState} nextLessonHref={nextLessonHref} nextQuizHref={nextQuizHref} />
          {/* TOMORROW HOOK — shown when all today's activities are done */}
          {todayState.dayProgressPercent === 100 && tomorrowPreview && (
            <TomorrowHookCard preview={tomorrowPreview} />
          )}
          <RecentLessons lessons={recentLessons} />
          <CurrentMissions missions={activeMissions} />
        </div>
        <div className="space-y-6">
          <SavingsGoalWidget goals={child.savingsGoals.map((g) => ({
            id: g.id,
            title: g.title,
            emoji: g.emoji,
            targetAmount: Number(g.targetAmount),
            currentAmount: Number(g.currentAmount),
          }))} />
          <AiMentorWidget firstName={child.firstName} ageGroup={child.ageGroup} />
        </div>
      </div>
    </div>
  )
}
