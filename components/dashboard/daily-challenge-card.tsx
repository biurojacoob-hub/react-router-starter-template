"use client"

import { useState, useEffect, useTransition } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { recordDailyLogin } from "@/src/actions/child/recordDailyLogin"
import { XpToast } from "@/src/components/gamification/CelebrationModal"
import type { ComebackTier } from "@/src/lib/learning/todayState"

interface DailyChallengeCardProps {
  challenge: string
  isFirstLoginToday: boolean
  comebackTier: ComebackTier
  daysSinceLastVisit: number
  streakDays: number
}

const COMEBACK_CONTENT: Record<Exclude<ComebackTier, "NONE">, { emoji: string; title: string; message: string; xpBonus: number }> = {
  THREE_DAYS: {
    emoji: "🌱",
    title: "Witaj z powrotem!",
    message: "Brakowało Cię! Mała przerwa nie zniszczy Twojego postępu. Zacznij od jednej lekcji — wróciłeś! 💪",
    xpBonus: 15,
  },
  SEVEN_DAYS: {
    emoji: "🌟",
    title: "Tydzień przerwy — to ok!",
    message: "Wróciłeś po tygodniu. Twoja wiedza finansowa nadal tu jest. Jeden krok wystarczy żeby odbudować serię! 🔥",
    xpBonus: 30,
  },
  TWO_WEEKS: {
    emoji: "🏆",
    title: "Wielki powrót!",
    message: "Dwa tygodnie to tylko chwila — wiedza finansowa czeka. Zaczynamy od nowa, z dużym bonusem XP! 🎉",
    xpBonus: 60,
  },
}

export function DailyChallengeCard({
  challenge,
  isFirstLoginToday,
  comebackTier,
  daysSinceLastVisit: _daysSinceLastVisit,
  streakDays,
}: DailyChallengeCardProps) {
  const [dismissed, setDismissed] = useState(false)
  const [challengeDone, setChallengeDone] = useState(false)
  const [showXp, setShowXp] = useState(false)
  const [xpAwarded, setXpAwarded] = useState(0)
  const [isPending, startTransition] = useTransition()
  const [registered, setRegistered] = useState(false)

  // Register daily login on first render if first login today
  useEffect(() => {
    if (!isFirstLoginToday || registered) return
    setRegistered(true)
    // Fire-and-forget registration
    recordDailyLogin().then((res) => {
      if (res.xpAwarded > 0) {
        setXpAwarded(res.xpAwarded)
        setShowXp(true)
      }
    })
  }, [isFirstLoginToday, registered])

  // Don't show if not first login today, or already dismissed this session
  if (!isFirstLoginToday || dismissed) return null

  const comeback = comebackTier !== "NONE" ? COMEBACK_CONTENT[comebackTier] : null

  return (
    <>
      <XpToast xp={xpAwarded} visible={showXp} onDone={() => setShowXp(false)} />

      {/* Comeback banner */}
      {comeback && !dismissed && (
        <Card className="border-amber-200 dark:border-amber-800 bg-amber-50/80 dark:bg-amber-900/20">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">{comeback.emoji}</span>
              <div className="flex-1">
                <p className="font-semibold text-amber-800 dark:text-amber-300">{comeback.title}</p>
                <p className="text-sm text-amber-700 dark:text-amber-400 mt-0.5">{comeback.message}</p>
                <p className="text-xs text-amber-600 mt-1">Bonus powrotu: <strong>+{comeback.xpBonus} XP</strong> za ukończenie pierwszej aktywności! 🎁</p>
              </div>
              <button
                onClick={() => setDismissed(true)}
                className="text-amber-500 hover:text-amber-700 rounded-full p-1 hover:bg-amber-100 transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Daily challenge */}
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-blue-50/50 dark:from-primary/10 dark:to-blue-950/20">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚡</span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-semibold text-sm">Wyzwanie dnia</p>
                <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">+15 XP</span>
              </div>
              <p className="text-sm text-muted-foreground">{challenge}</p>
              {streakDays > 0 && (
                <p className="text-xs text-amber-600 mt-1">🔥 Seria {streakDays} {streakDays === 1 ? "dzień" : "dni"} — trzymaj ją!</p>
              )}
            </div>
            {!challengeDone ? (
              <Button
                size="sm"
                variant="gradient"
                className="h-7 text-xs shrink-0"
                disabled={isPending}
                onClick={() => {
                  startTransition(async () => {
                    // Award challenge XP
                    const _res = await recordDailyLogin()
                    setXpAwarded(15)
                    setShowXp(true)
                    setChallengeDone(true)
                  })
                }}
              >
                Zrobione!
              </Button>
            ) : (
              <span className="text-xs text-emerald-600 font-semibold shrink-0">✓ +15 XP</span>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  )
}
