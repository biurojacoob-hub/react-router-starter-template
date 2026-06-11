"use client"

import { Flame, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { XpBar } from "@/src/components/gamification/XpBar"
import type { HeroTitle } from "@/src/lib/hero/titles"

interface WelcomeCardProps {
  name: string
  xp: number
  level: number
  streakDays: number
  avatarUrl?: string | null
  heroTitle: HeroTitle
}

export function WelcomeCard({ name, xp, level, streakDays, avatarUrl, heroTitle }: WelcomeCardProps) {
  const hour = new Date().getHours()
  const greeting = hour < 12 ? "Dzień dobry" : hour < 18 ? "Cześć" : "Dobry wieczór"

  return (
    <Card className="relative overflow-hidden border-0 bg-muted/40 dark:bg-muted/20">
      <CardContent className="relative p-4 md:p-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-2xl">
              {avatarUrl ? (
                <img src={avatarUrl} alt={name} className="h-full w-full rounded-2xl object-cover" />
              ) : "🧒"}
            </div>
            <div>
              <p className="text-muted-foreground text-xs">{greeting}, {name}!</p>
              <p className="font-bold text-base leading-tight flex items-center gap-1.5">
                <span>{heroTitle.emoji}</span> {heroTitle.title}
              </p>
              <p className="text-xs text-muted-foreground">Poziom {level}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {streakDays > 0 && (
              <Badge className="gap-1 py-1 px-2.5 text-xs bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800">
                <Flame className="h-3 w-3" /> {streakDays}d
              </Badge>
            )}
            <Badge className="gap-1 py-1 px-2.5 text-xs bg-primary/5 text-primary border-primary/20">
              <Zap className="h-3 w-3" /> {xp} XP
            </Badge>
          </div>
        </div>

        <div className="mt-3">
          <XpBar xp={xp} size="sm" showLabel={false} animate={false} />
        </div>
      </CardContent>
    </Card>
  )
}
