import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { auth } from "@/src/auth"
import { prisma } from "@/src/lib/db"
import { WelcomeCard } from "@/components/dashboard/welcome-card"
import { RecentLessons } from "@/components/dashboard/recent-lessons"
import { CurrentMissions } from "@/components/dashboard/current-missions"
import { SavingsGoalWidget } from "@/components/dashboard/savings-goal-widget"
import { AiMentorWidget } from "@/components/dashboard/ai-mentor-widget"
import { TodayLearningWidget } from "@/components/dashboard/today-learning-widget"
import { getTodayLearningState } from "@/src/lib/learning/todayState"
import { DailyHeroCard } from "@/components/dashboard/daily-hero-card"
import { AdventureMap } from "@/components/dashboard/adventure-map"
import { DiscoveryWidget } from "@/components/dashboard/discovery-widget"
import { PrideMomentCard } from "@/components/dashboard/pride-moment-card"
import { Season2Teaser } from "@/components/dashboard/season2-teaser"
import { getLatestUnlockedFact, MONEY_FACTS } from "@/src/lib/discoveries/facts"
import { ComebackMomentCard } from "@/components/dashboard/comeback-moment-card"
import { SessionCompleteCard } from "@/components/dashboard/session-complete-card"
import { getDailyUXState } from "@/src/lib/product/getDailyUXState"

export const metadata: Metadata = { title: "Dashboard" }

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user) redirect("/sign-in")

  let child
  try {
    child = await prisma.childProfile.findFirst({
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
  } catch (err) {
    console.error("[dashboard] DB error fetching child profile", err)
    throw err
  }

  if (!child) redirect("/onboarding")

  const completedSkillIds = child.skillProgress.map((sp) => sp.skillId)

  let lessonsCompleted = 0
  let missionsCompleted = 0
  let todayState
  let nextLesson
  try {
    ;[lessonsCompleted, missionsCompleted, todayState] = await Promise.all([
      prisma.lessonProgress.count({ where: { childId: child.id, completed: true } }),
      prisma.missionProgress.count({ where: { childId: child.id, status: "COMPLETED" } }),
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

    nextLesson = await prisma.lesson.findFirst({
      where: {
        published: true,
        deletedAt: null,
        course: { ageGroup: child.ageGroup, deletedAt: null },
        progress: { none: { childId: child.id, completed: true } },
      },
      select: { id: true, courseId: true, quiz: { select: { id: true } } },
      orderBy: [{ course: { orderIndex: "asc" } }, { orderIndex: "asc" }],
    })
  } catch (err) {
    console.error("[dashboard] DB error loading learning state", err)
    throw err
  }

  const nextLessonHref = nextLesson ? `/courses/${nextLesson.courseId}/lessons/${nextLesson.id}` : "/courses"
  const nextQuizHref   = nextLesson?.quiz ? `/courses/${nextLesson.courseId}/lessons/${nextLesson.id}/quiz` : nextLessonHref

  // ── Single UX source of truth ─────────────────────────────────
  const ux = getDailyUXState({
    childId: child.id,
    ageGroup: child.ageGroup,
    xp: child.xp,
    level: child.level,
    streakDays: child.streakDays,
    childCreatedAt: child.createdAt,
    completedSkillIds,
    lessonsCompleted,
    missionsCompleted,
    badgesEarned: child.badges.length,
    todayState: todayState!,
    nextLessonHref,
    nextQuizHref,
  })

  // Discoveries (pure computation, no DB)
  const latestFact         = getLatestUnlockedFact(todayState.currentDay)
  const unlockedFactsCount = MONEY_FACTS.filter((f) => f.unlocksOnDay <= todayState.currentDay).length

  const recentLessons = child.lessonProgress.map((lp) => ({
    id: lp.lesson.id,
    title: lp.lesson.title,
    category: lp.lesson.course?.title ?? "Finanse",
    xpReward: lp.lesson.xpReward,
    progress: lp.completed ? 100 : 50,
  }))

  const activeMissions = child.missionProgress.map((mp) => {
    const durationDays  = mp.mission.durationDays ?? 1
    const checkInCount  = mp.checkIns.length
    const daysSinceStart = Math.floor((Date.now() - mp.startedAt.getTime()) / (1000 * 60 * 60 * 24))
    const daysLeft      = Math.max(0, durationDays - daysSinceStart)
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
    <div className="space-y-5 animate-fade-in">

      {/* 1. NARRATIVE START */}
      <DailyHeroCard
        state={todayState}
        nextActionHref={ux.nextBestActionHref}
        heroTitle={ux.heroTitle}
        streakDays={child.streakDays}
        firstName={child.firstName}
      />

      {/* 2. COMEBACK MOMENT */}
      {ux.showComeback && (
        <ComebackMomentCard
          firstName={child.firstName}
          daysSinceLastVisit={ux.comebackDaysSince}
          streakDays={child.streakDays}
          dailyReward={ux.comebackDailyReward}
          finnNudge={ux.comebackFinnNudge}
        />
      )}

      {/* 3. VARIABLE REWARD BANNER — rare events only */}
      {ux.showRareBanner && (
        <div className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950/30 dark:to-amber-950/20 border border-yellow-300/40 dark:border-yellow-700/30 px-4 py-3">
          <span className="text-2xl shrink-0">🎰</span>
          <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-300">{ux.rareBannerMessage}</p>
        </div>
      )}

      {/* 4. NAMED MILESTONE PRIDE */}
      {ux.prideMilestone && (
        <PrideMomentCard milestone={ux.prideMilestone} firstName={child.firstName} />
      )}

      {/* MAIN LAYOUT GRID */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">

        {/* Main column (2/3) */}
        <div className="lg:col-span-2 space-y-5">

          {/* TODAY */}
          <TodayLearningWidget
            finnLine={ux.finnLine}
            uiMode={ux.uiMode}
            sessionState={ux.sessionState}
            visualDensity={ux.visualDensity}
            pacingLabel={ux.pacingLabel}
            primaryAction={ux.primaryAction}
            secondaryActions={ux.secondaryActions}
            dayProgressPercent={ux.dayProgressPercent}
            currentDay={ux.currentDay}
            xpDisplay={ux.xpDisplay}
            xpLabel={ux.xpLabel}
            activeMissionId={ux.activeMissionId}
            missionRealLifeTask={ux.missionRealLifeTask}
            lessonHook={ux.lessonHook}
          />

          {/* SESSION END — single card */}
          {ux.sessionEndDetected && (
            ux.isDay30Complete ? (
              <Season2Teaser />
            ) : (
              <SessionCompleteCard
                firstName={child.firstName}
                currentDay={ux.currentDay}
                xpReward={ux.xpDisplay}
                endMessage={ux.endMessage}
                tomorrowPreview={ux.tomorrowPreview}
              />
            )
          )}

          <RecentLessons lessons={recentLessons} />
          <CurrentMissions missions={activeMissions} />
        </div>

        {/* Sidebar (1/3) */}
        <div className="space-y-5">

          <WelcomeCard
            name={child.firstName}
            xp={child.xp}
            level={child.level}
            streakDays={child.streakDays}
            avatarUrl={child.avatarUrl}
            heroTitle={ux.heroTitle}
          />

          {ux.showMap && (
            <AdventureMap
              currentDay={ux.currentDay}
              dayProgressPercent={ux.dayProgressPercent}
            />
          )}

          {ux.showDiscoveries && latestFact && (
            <DiscoveryWidget
              latestFact={latestFact}
              totalUnlocked={unlockedFactsCount}
              totalFacts={MONEY_FACTS.length}
            />
          )}

          <SavingsGoalWidget goals={child.savingsGoals.map((g) => ({
            id: g.id,
            title: g.title,
            emoji: g.emoji,
            targetAmount: Number(g.targetAmount),
            currentAmount: Number(g.currentAmount),
          }))} />

          <AiMentorWidget
            finnChatLine={ux.finnChatLine}
            pulseStatus={ux.pulseStatus}
            topStrength={ux.growthTopStrength}
          />
        </div>
      </div>
    </div>
  )
}
