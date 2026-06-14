import type { Metadata } from "next"
import { redirect } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Star, Flame, Trophy, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { auth } from "@/src/auth"
import { prisma } from "@/src/lib/db"
import { getXpProgressPercent, getLevelForXp, getXpToNextLevel } from "@/src/gamification/retention/progression"

export const metadata: Metadata = { title: "Panel dziecka" }

export default async function ChildPage() {
  const session = await auth()
  if (!session?.user) redirect("/sign-in")

  const child = await prisma.childProfile.findFirst({
    where: { userId: session.user.id, deletedAt: null },
    select: {
      firstName: true,
      lastName: true,
      birthYear: true,
      ageGroup: true,
      xp: true,
      level: true,
      streakDays: true,
      avatarUrl: true,
      badges: {
        select: {
          badge: { select: { id: true, emoji: true, name: true, description: true } },
        },
        orderBy: { createdAt: "desc" },
        take: 20,
      },
    },
  })

  if (!child) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 text-center max-w-md mx-auto">
        <div className="text-5xl">👋</div>
        <h2 className="text-xl font-bold">Brak profilu dziecka</h2>
        <p className="text-muted-foreground text-sm">
          Dokończ onboarding, aby zobaczyć swój profil.
        </p>
        <Button asChild variant="gradient">
          <Link href="/child/welcome">Zacznij tutaj</Link>
        </Button>
      </div>
    )
  }

  const currentYear = new Date().getFullYear()
  const age = child.birthYear ? currentYear - child.birthYear : null
  const percent = getXpProgressPercent(child.xp)
  const nextLevel = getLevelForXp(child.xp) + 1
  const toNext = getXpToNextLevel(child.xp)

  const earnedBadges = child.badges.map((b) => b.badge)

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
      {/* Profile card */}
      <Card className="overflow-hidden">
        <div className="gradient-brand h-24" />
        <CardContent className="px-6 pb-6 -mt-10">
          <div className="flex items-end gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-background bg-white text-4xl shadow-lg overflow-hidden">
              {child.avatarUrl ? (
                <Image src={child.avatarUrl} alt={child.firstName} width={80} height={80} className="h-full w-full object-cover" />
              ) : "🧒"}
            </div>
            <div className="mb-1">
              <h2 className="text-2xl font-bold">
                {child.firstName}{child.lastName ? ` ${child.lastName}` : ""}
              </h2>
              {age && <p className="text-muted-foreground text-sm">{age} lat</p>}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { icon: Zap, label: "XP", value: child.xp, color: "text-amber-600" },
              { icon: Star, label: "Poziom", value: child.level, color: "text-sky-600" },
              { icon: Flame, label: "Passa", value: `${child.streakDays}d`, color: "text-rose-500" },
            ].map((s) => {
              const Icon = s.icon
              return (
                <div key={s.label} className="rounded-xl bg-muted/50 p-3 text-center">
                  <Icon className={`h-5 w-5 mx-auto mb-1 ${s.color}`} />
                  <div className="font-bold">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              )
            })}
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-muted-foreground">
                {toNext > 0 ? `Do poziomu ${nextLevel}: ${toNext} XP` : "MAX LEVEL"}
              </span>
              <span className="font-medium">{percent}%</span>
            </div>
            <Progress value={percent} className="h-2.5" indicatorClassName="gradient-brand" />
          </div>
        </CardContent>
      </Card>

      {/* Badges */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Trophy className="h-4 w-4 text-amber-500" /> Odznaki
            </h3>
            <Badge variant="secondary">{earnedBadges.length} zdobyte</Badge>
          </div>
          {earnedBadges.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              Ukończ lekcje i misje, żeby zdobyć odznaki! 🏅
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-3">
              {earnedBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="rounded-xl p-3 text-center bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800"
                  title={badge.description}
                >
                  <div className="text-2xl mb-1">{badge.emoji}</div>
                  <div className="text-xs font-medium leading-tight">{badge.name}</div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button variant="gradient" size="lg" className="h-14" asChild>
          <Link href="/courses">📚 Zacznij lekcję</Link>
        </Button>
        <Button variant="outline" size="lg" className="h-14" asChild>
          <Link href="/missions">🎯 Sprawdź misje</Link>
        </Button>
      </div>
    </div>
  )
}
