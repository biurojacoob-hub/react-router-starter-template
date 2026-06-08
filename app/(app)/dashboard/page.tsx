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
      badges: {
        select: { badge: { select: { id: true } } },
        take: 100,
      },
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
          mission: {
            select: { id: true, title: true, xpReward: true, coinReward: true, durationDays: true },
          },
          checkIns: { select: { id: true } },
        },
        take: 3,
      },
    },
  })

  if (!child) redirect("/onboarding")

  const [totalLessons, lessonsCompleted, totalMissions, missionsCompleted, totalBadges] =
    await Promise.all([
      prisma.lesson.count({ where: { published: true, deletedAt: null } }),
      prisma.lessonProgress.count({ where: { childId: child.id, completed: true } }),
      prisma.mission.count({ where: { published: true, deletedAt: null } }),
      prisma.missionProgress.count({ where: { childId: child.id, status: "COMPLETED" } }),
      prisma.badge.count(),
    ])

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
    const progress = Math.min(100, Math.round((checkInCount / durationDays) * 100))
    return {
      id: mp.mission.id,
      title: mp.mission.title,
      xpReward: mp.mission.xpReward,
      coinsReward: mp.mission.coinReward,
      daysLeft: daysLeft > 0 ? daysLeft : null,
      progress,
    }
  })

  return (
    <div className="space-y-6 animate-fade-in">
      <WelcomeCard
        name={child.firstName}
        xp={child.xp}
        level={child.level}
        streakDays={child.streakDays}
        avatarUrl={child.avatarUrl}
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
          <RecentLessons lessons={recentLessons} />
          <CurrentMissions missions={activeMissions} />
        </div>
        <div className="space-y-6">
          <SavingsGoalWidget />
          <AiMentorWidget />
        </div>
      </div>
    </div>
  )
}
