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
import { getTomorrowPreview } from "@/src/lib/learning/tomorrowPreview"
import { getDailyAdventureState } from "@/src/lib/learning/dailyAdventure"
import { DailyHeroCard } from "@/components/dashboard/daily-hero-card"
import { getHeroTitle } from "@/src/lib/hero/titles"
import { AdventureMap } from "@/components/dashboard/adventure-map"
import { DiscoveryWidget } from "@/components/dashboard/discovery-widget"
import { PrideMomentCard, detectMilestone } from "@/components/dashboard/pride-moment-card"
import { Season2Teaser } from "@/components/dashboard/season2-teaser"
import { getLatestUnlockedFact, MONEY_FACTS } from "@/src/lib/discoveries/facts"
import { getFinnMemoryLine } from "@/src/lib/hero/finnMemory"
import { getRetentionState } from "@/src/lib/retention/retentionEngine"
import { getAdaptivePacingState } from "@/src/lib/pacing/adaptivePacing"
import {
  FINN_ADAPTIVE_BORED, FINN_ADAPTIVE_FRUSTRATED,
  FINN_ADAPTIVE_FATIGUED, FINN_ADAPTIVE_FLOW, pickRandom,
} from "@/src/lib/hero/finn"
import { getDailyReward } from "@/src/lib/rewards/variableReward"
import { getInvisibleGrowth } from "@/src/lib/progression/progressionIllusion"
import { ComebackMomentCard } from "@/components/dashboard/comeback-moment-card"
import { SessionCompleteCard } from "@/components/dashboard/session-complete-card"
import { getHabitLoopState } from "@/src/lib/habit/habitLoop"

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

  const [lessonsCompleted, missionsCompleted, todayState] = await Promise.all([
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

  // Next recommended lesson + quiz hrefs
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

  const nextLessonHref = nextLesson ? `/courses/${nextLesson.courseId}/lessons/${nextLesson.id}` : "/courses"
  const nextQuizHref   = nextLesson?.quiz ? `/courses/${nextLesson.courseId}/lessons/${nextLesson.id}/quiz` : nextLessonHref

  // Daily adventure state — pure computation, no DB
  const adventure = getDailyAdventureState(todayState, nextLessonHref, nextQuizHref)

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

  // Discoveries
  const latestFact         = getLatestUnlockedFact(todayState.currentDay)
  const unlockedFactsCount = MONEY_FACTS.filter((f) => f.unlocksOnDay <= todayState.currentDay).length

  // ── Retention Engine ─────────────────────────────────────────
  const retentionState = getRetentionState({
    daysSinceLastVisit: todayState.daysSinceLastVisit,
    streakDays: child.streakDays,
    dayProgressPercent: todayState.dayProgressPercent,
    heroActionDone: adventure.heroActionDone,
    currentDay: todayState.currentDay,
    isFirstLoginToday: todayState.isFirstLoginToday,
  })

  // ── Variable Reward Engine ────────────────────────────────────
  const dailyReward = getDailyReward(child.id, todayState.currentDay, child.streakDays)

  // ── Progression Illusion ──────────────────────────────────────
  const growthState = getInvisibleGrowth({
    lessonsCompleted,
    missionsCompleted,
    streakDays: child.streakDays,
    currentDay: todayState.currentDay,
    level: child.level,
    badgesEarned: child.badges.length,
    dayProgressPercent: todayState.dayProgressPercent,
  })

  // ── Adaptive Pacing Engine ────────────────────────────────────
  const pacingState = getAdaptivePacingState({
    lessonsCompleted,
    missionsCompleted,
    streakDays: child.streakDays,
    daysSinceLastVisit: todayState.daysSinceLastVisit,
    currentDay: todayState.currentDay,
    level: child.level,
    dayProgressPercent: todayState.dayProgressPercent,
    heroActionDone: adventure.heroActionDone,
    isFirstLoginToday: todayState.isFirstLoginToday,
  })

  // Finn adaptive line — selected based on emotional tone, null if neutral
  const ADAPTIVE_POOLS: Record<string, string[]> = {
    bored:      FINN_ADAPTIVE_BORED,
    frustrated: FINN_ADAPTIVE_FRUSTRATED,
    fatigued:   FINN_ADAPTIVE_FATIGUED,
    flow:       FINN_ADAPTIVE_FLOW,
  }
  const finnAdaptiveLine = pacingState.finnEmotionalTone !== "neutral"
    ? pickRandom(ADAPTIVE_POOLS[pacingState.finnEmotionalTone]!)
    : null

  // ── Habit Loop State ──────────────────────────────────────────
  const habitLoop = getHabitLoopState(todayState, adventure)

  // Comeback — show when first login today AND was away
  const showComeback = todayState.isFirstLoginToday && todayState.daysSinceLastVisit >= 1

  // Finn Memory line
  const finnMemoryLine = getFinnMemoryLine({
    streakDays: child.streakDays,
    missionsCompleted,
    badgesEarned: child.badges.length,
    currentDay: todayState.currentDay,
    level: child.level,
    lessonsDoneTotal: lessonsCompleted,
  })

  // Milestone detection
  const prideMilestone = detectMilestone(child.level, todayState.currentDay, todayState.dayProgressPercent)
  const isNamedMilestone = prideMilestone?.type === "level" || prideMilestone?.type === "day"
  const isDay30Complete  = todayState.currentDay === 30 && todayState.dayProgressPercent === 100

  // Next action for DailyHeroCard CTA
  const nextActionHref = !todayState.lessonDoneToday ? nextLessonHref
    : !todayState.quizDoneToday ? nextQuizHref
    : "/missions"

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

      {/* ── 1. NARRATIVE START — Finn + story + ONE CTA ── */}
      <DailyHeroCard
        state={todayState}
        nextActionHref={nextActionHref}
        heroTitle={heroTitle}
        streakDays={child.streakDays}
        firstName={child.firstName}
      />

      {/* ── 2. COMEBACK MOMENT — emotional return, variable reward ── */}
      {showComeback && (
        <ComebackMomentCard
          firstName={child.firstName}
          daysSinceLastVisit={todayState.daysSinceLastVisit}
          streakDays={child.streakDays}
          dailyReward={dailyReward}
          finnNudge={retentionState.finnNudgeMessage}
        />
      )}

      {/* ── 3. VARIABLE REWARD BANNER — rare events only ── */}
      {!showComeback && dailyReward.isRare && (
        <div className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950/30 dark:to-amber-950/20 border border-yellow-300/40 dark:border-yellow-700/30 px-4 py-3">
          <span className="text-2xl shrink-0">🎰</span>
          <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-300">{dailyReward.rewardMessage}</p>
        </div>
      )}

      {/* ── 4. NAMED MILESTONE PRIDE — level 5/10, day 7/14/30 ── */}
      {isNamedMilestone && prideMilestone && (
        <PrideMomentCard milestone={prideMilestone} firstName={child.firstName} />
      )}

      {/* ── MAIN LAYOUT GRID ── */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">

        {/* ── Main column (2/3) ── */}
        <div className="lg:col-span-2 space-y-5">

          {/* 3. TODAY — pacing-adaptive, focus lock when mid-loop */}
          <TodayLearningWidget
            state={todayState}
            adventure={adventure}
            activeMissionId={todayState.activeMissionId}
            loopStage={habitLoop.loopStage}
            shouldShowFocusLock={habitLoop.shouldShowFocusLock}
            finnFocusLine={habitLoop.finnFocusLine}
            pacing={pacingState}
            finnAdaptiveLine={finnAdaptiveLine}
          />

          {/* 4. CLEAN CLOSURE — single session end screen when day_completed */}
          {habitLoop.sessionEndDetected ? (
            isDay30Complete ? (
              <Season2Teaser />
            ) : (
              <SessionCompleteCard
                firstName={child.firstName}
                currentDay={todayState.currentDay}
                xpReward={todayState.today.xpReward}
                endMessage={habitLoop.endMessage}
                tomorrowPreview={tomorrowPreview}
              />
            )
          ) : null}

          <RecentLessons lessons={recentLessons} />
          <CurrentMissions missions={activeMissions} />
        </div>

        {/* ── Sidebar (1/3) ── */}
        <div className="space-y-5">

          {/* Compact identity + XP bar */}
          <WelcomeCard
            name={child.firstName}
            xp={child.xp}
            level={child.level}
            streakDays={child.streakDays}
            avatarUrl={child.avatarUrl}
            heroTitle={heroTitle}
          />

          {/* Journey map — where am I in the 30-day adventure */}
          <AdventureMap
            currentDay={todayState.currentDay}
            dayProgressPercent={todayState.dayProgressPercent}
          />

          {/* Discoveries collection */}
          {latestFact && (
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

          {/* Finn — with memory line, growth comment, pulse status */}
          <AiMentorWidget
            firstName={child.firstName}
            ageGroup={child.ageGroup}
            finnMemoryLine={finnMemoryLine}
            pulseStatus={retentionState.pulseStatus}
            growthComment={growthState.finnCommentOnGrowth}
            topStrength={growthState.topStrengthName}
          />
        </div>
      </div>
    </div>
  )
}
