"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { AvatarDisplay } from "@/src/components/avatars/AvatarDisplay"
import { XpBar } from "@/src/components/gamification/XpBar"
import type { AvatarCategory } from "@/src/components/avatars/avatarData"

// ─────────────────────────────────────────────────────────────
// FIRST_STEP badge — awarded in the first minutes
// ─────────────────────────────────────────────────────────────

export const FIRST_STEP_BADGE = {
  id: "first-step",
  emoji: "👣",
  name: "Pierwszy Krok",
  description: "Zaczął swoją finansową podróż!",
  xpReward: 25,
  category: "MILESTONE" as const,
}

interface FirstRewardProps {
  childName: string
  avatarId: string
  ageGroup: AvatarCategory
  xpFromChallenge: number
  onComplete: () => void
}

type RewardPhase = "BADGE" | "XP" | "PREVIEW"

export function FirstReward({ childName, avatarId, xpFromChallenge, onComplete }: FirstRewardProps) {
  const [phase, setPhase] = useState<RewardPhase>("BADGE")
  const [badgeVisible, setBadgeVisible] = useState(false)
  const totalXp = xpFromChallenge + FIRST_STEP_BADGE.xpReward

  useEffect(() => {
    const t = setTimeout(() => setBadgeVisible(true), 200)
    return () => clearTimeout(t)
  }, [])

  function nextPhase() {
    if (phase === "BADGE") setPhase("XP")
    else if (phase === "XP") setPhase("PREVIEW")
    else onComplete()
  }

  return (
    <div className="flex flex-col items-center gap-6 px-4 text-center">
      {phase === "BADGE" && (
        <div className="animate-fade-in space-y-5">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">
            🏅 Odznaka odblokowana!
          </p>

          <div
            className={cn(
              "relative mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-yellow-300 to-amber-500 shadow-xl transition-all duration-700",
              badgeVisible ? "scale-100 opacity-100" : "scale-50 opacity-0"
            )}
          >
            <span className="text-6xl">{FIRST_STEP_BADGE.emoji}</span>
          </div>

          <div>
            <h2 className="text-2xl font-black">{FIRST_STEP_BADGE.name}</h2>
            <p className="text-sm text-muted-foreground">{FIRST_STEP_BADGE.description}</p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
            <span>⚡</span>
            <span>+{FIRST_STEP_BADGE.xpReward} XP</span>
          </div>

          <Button size="lg" className="w-full max-w-xs rounded-2xl" onClick={nextPhase}>
            Niesamowite! →
          </Button>
        </div>
      )}

      {phase === "XP" && (
        <div className="animate-fade-in space-y-5 w-full max-w-sm">
          <div className="flex flex-col items-center gap-3">
            <AvatarDisplay avatarId={avatarId} size="lg" showRing />
            <div>
              <h2 className="text-xl font-black">{childName}</h2>
              <p className="text-sm text-muted-foreground">Poziom 1 — Finansowy Nowicjusz</p>
            </div>
          </div>

          <div className="rounded-2xl bg-muted/50 p-4 space-y-3">
            <p className="text-sm font-semibold text-muted-foreground">Zdobyte dziś:</p>
            <div className="flex items-center justify-between text-sm">
              <span>🎯 Za wyzwanie</span>
              <span className="font-bold text-primary">+{xpFromChallenge} XP</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>👣 Odznaka Pierwszy Krok</span>
              <span className="font-bold text-primary">+{FIRST_STEP_BADGE.xpReward} XP</span>
            </div>
            <div className="border-t pt-2 flex items-center justify-between font-bold">
              <span>Razem</span>
              <span className="text-primary text-lg">+{totalXp} XP ⚡</span>
            </div>
          </div>

          <XpBar xp={totalXp} animate />

          <Button size="lg" className="w-full rounded-2xl" onClick={nextPhase}>
            Co dalej? →
          </Button>
        </div>
      )}

      {phase === "PREVIEW" && (
        <div className="animate-fade-in space-y-5 max-w-sm">
          <div className="text-5xl">🗺️</div>
          <div>
            <h2 className="text-2xl font-black mb-2">Twoja finansowa przygoda zaczyna się teraz!</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Czeka na Ciebie: <strong>27 umiejętności</strong>, <strong>81 lekcji</strong>,{" "}
              <strong>81 misji</strong> i <strong>AI Mentor</strong> zawsze gotowy pomóc.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 text-xs">
            {[
              ["📚", "Pierwsza lekcja", "8 min"],
              ["🤖", "AI Mentor", "zawsze"],
              ["🏅", "60 odznak", "do zdobycia"],
            ].map(([e, l, s]) => (
              <div key={l} className="rounded-2xl bg-muted p-3 text-center">
                <div className="text-2xl mb-1">{e}</div>
                <div className="font-medium">{l}</div>
                <div className="text-muted-foreground">{s}</div>
              </div>
            ))}
          </div>

          <Button size="lg" className="w-full rounded-2xl" onClick={onComplete}>
            Przejdź do panelu →
          </Button>
        </div>
      )}
    </div>
  )
}
