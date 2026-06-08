"use client"

import { Flame, Star, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { XpBar } from "@/src/components/gamification/XpBar"

interface WelcomeCardProps {
  name: string
  xp: number
  level: number
  streakDays: number
  avatarUrl?: string | null
}

export function WelcomeCard({ name, xp, level, streakDays, avatarUrl }: WelcomeCardProps) {
  const hour = new Date().getHours()
  const greeting = hour < 12 ? "Dzień dobry" : hour < 18 ? "Cześć" : "Dobry wieczór"

  return (
    <Card className="relative overflow-hidden border-0 gradient-brand text-white">
      <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 translate-x-16 -translate-y-8 rounded-full bg-white/10 blur-2xl" />
      <div className="pointer-events-none absolute bottom-0 right-20 h-32 w-32 translate-y-8 rounded-full bg-white/10 blur-xl" />

      <CardContent className="relative p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <p className="text-white/70 text-sm font-medium">{greeting}, {name}! 👋</p>
            <h2 className="mt-1 text-2xl md:text-3xl font-extrabold">
              Czas na dzisiejszą lekcję! 🚀
            </h2>
            <div className="mt-4">
              <XpBar xp={xp} size="sm" showLabel={true} animate={true} className="[&_.text-primary]:text-white [&_.text-muted-foreground]:text-white/70 [&_.text-\\[10px\\]]:text-white/60" />
            </div>
          </div>

          <div className="hidden sm:flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/20 text-3xl">
            {avatarUrl ? (
              <img src={avatarUrl} alt={name} className="h-full w-full rounded-2xl object-cover" />
            ) : "🧒"}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <Badge className="bg-white/20 text-white border-0 gap-1.5 py-1.5 px-3">
            <Flame className="h-3.5 w-3.5 text-amber-300" />
            {streakDays} {streakDays === 1 ? "dzień" : "dni"} passa
          </Badge>
          <Badge className="bg-white/20 text-white border-0 gap-1.5 py-1.5 px-3">
            <Zap className="h-3.5 w-3.5 text-yellow-300" />
            {xp} XP
          </Badge>
          <Badge className="bg-white/20 text-white border-0 gap-1.5 py-1.5 px-3">
            <Star className="h-3.5 w-3.5 text-yellow-300" />
            Poziom {level}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
