import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { Target, Lock, Clock, Zap, BookOpen } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { auth } from "@/src/auth"
import { prisma } from "@/src/lib/db"
import { ALL_CONTENT } from "@/src/content/registry"
import { MissionButton } from "@/components/dashboard/mission-button"
import type { Mission } from "@/src/content/types"

export const metadata: Metadata = { title: "Misje" }

interface MissionWithStatus extends Mission {
  status: "active" | "completed" | "available" | "locked"
  progress: number
  daysLeft?: number | null
}

export default async function MissionsPage() {
  const session = await auth()
  if (!session?.user) redirect("/sign-in")

  const child = await prisma.childProfile.findFirst({
    where: { parentId: session.user.id, deletedAt: null },
    select: {
      id: true,
      ageGroup: true,
      missionProgress: {
        select: {
          id: true,
          status: true,
          startedAt: true,
          mission: { select: { id: true, title: true } },
          checkIns: { select: { id: true } },
        },
      },
      skillProgress: { select: { skillId: true, status: true } },
      lessonProgress: { where: { completed: true }, select: { id: true }, take: 1 },
    },
  })

  if (!child) redirect("/onboarding")

  const allContentMissions: Mission[] = ALL_CONTENT.flatMap((sc) => sc.missions)

  const activeTitles = new Set(
    child.missionProgress.filter((mp) => mp.status === "ACTIVE").map((mp) => mp.mission.title)
  )
  const completedTitles = new Set(
    child.missionProgress.filter((mp) => mp.status === "COMPLETED").map((mp) => mp.mission.title)
  )
  const completedSkillIds = new Set(
    child.skillProgress.filter((sp) => sp.status === "COMPLETED").map((sp) => sp.skillId)
  )

  const hasAnyLesson = child.lessonProgress.length > 0

  const enriched: MissionWithStatus[] = allContentMissions.map((m) => {
    if (completedTitles.has(m.title)) return { ...m, status: "completed", progress: 100 }
    if (activeTitles.has(m.title)) {
      const mp = child.missionProgress.find((p) => p.mission.title === m.title && p.status === "ACTIVE")
      const checkIns = mp?.checkIns.length ?? 0
      const durationDays = Math.ceil(m.estimatedMinutes / 10)
      const daysSinceStart = mp
        ? Math.floor((Date.now() - mp.startedAt.getTime()) / (1000 * 60 * 60 * 24))
        : 0
      const daysLeft = Math.max(0, durationDays - daysSinceStart)
      return {
        ...m,
        status: "active",
        progress: Math.min(99, Math.round((checkIns / Math.max(1, durationDays)) * 100)),
        daysLeft: daysLeft > 0 ? daysLeft : null,
      }
    }
    if (completedSkillIds.has(m.skillId)) return { ...m, status: "available", progress: 0 }
    return { ...m, status: "locked", progress: 0 }
  })

  const activeList = enriched.filter((m) => m.status === "active")
  const availableList = enriched.filter((m) => m.status === "available")
  const completedList = enriched.filter((m) => m.status === "completed")

  // Show locked only if child has at least some progress — never show a wall of locks to new user
  const showLocked = hasAnyLesson
  const lockedList = showLocked ? enriched.filter((m) => m.status === "locked").slice(0, 5) : []

  const visibleMissions = [...activeList, ...availableList, ...completedList, ...lockedList]

  const isNewChild = activeList.length === 0 && availableList.length === 0 && completedList.length === 0

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Misje</h1>
        <p className="text-muted-foreground text-sm mt-1">Wyzwania, które kształtują dobre nawyki finansowe</p>
      </div>

      {isNewChild ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 gap-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-50 dark:bg-violet-900/20">
              <BookOpen className="h-8 w-8 text-violet-600" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Ukończ pierwszą lekcję!</h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Misje odblokują się po ukończeniu pierwszych lekcji. Zacznij naukę, a misje będą na Ciebie czekać!
              </p>
            </div>
            <Button asChild variant="gradient">
              <Link href="/courses">
                <BookOpen className="h-4 w-4 mr-2" /> Przejdź do lekcji
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Aktywne", value: activeList.length, color: "text-violet-600" },
              { label: "Ukończone", value: completedList.length, color: "text-emerald-600" },
              { label: "Dostępne", value: availableList.length, color: "text-amber-600" },
            ].map((s) => (
              <Card key={s.label}>
                <CardContent className="p-4 text-center">
                  <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-4">
            {visibleMissions.map((mission) => (
              <Card key={mission.id} className={mission.status === "locked" ? "opacity-50" : ""}>
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                      mission.status === "completed" ? "bg-emerald-50 dark:bg-emerald-900/20"
                      : mission.status === "locked" ? "bg-muted"
                      : "bg-violet-50 dark:bg-violet-900/20"
                    }`}>
                      {mission.status === "locked" ? (
                        <Lock className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <Target className={`h-5 w-5 ${mission.status === "completed" ? "text-emerald-600" : "text-violet-600"}`} />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-semibold text-sm">{mission.title}</h3>
                        <Badge variant="purple" className="text-[10px] h-4 shrink-0">
                          +{mission.difficulty === "QUICK" ? 50 : mission.difficulty === "STANDARD" ? 100 : 200} XP
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{mission.description}</p>

                      {mission.status === "active" && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <Progress value={mission.progress} className="flex-1 h-2" indicatorClassName="bg-violet-500" />
                            <span className="text-xs font-medium w-8">{mission.progress}%</span>
                            {mission.daysLeft ? (
                              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" /> {mission.daysLeft}d
                              </span>
                            ) : null}
                          </div>
                          <MissionButton title={mission.title} description={mission.description} isActive={true} />
                        </div>
                      )}

                      {mission.status === "available" && (
                        <MissionButton title={mission.title} description={mission.description} isActive={false} />
                      )}

                      {mission.status === "completed" && (
                        <span className="text-xs text-emerald-600 font-semibold">✓ Misja ukończona!</span>
                      )}

                      {mission.status === "locked" && (
                        <div className="flex items-center gap-2">
                          <Zap className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            Ukończ poprzednią przygodę, aby odblokować tę misję
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
