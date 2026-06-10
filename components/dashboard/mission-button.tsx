"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { startMission, completeMission } from "@/src/actions/learning/missionActions"
import { XpToast } from "@/src/components/gamification/CelebrationModal"

interface MissionButtonProps {
  title: string
  description: string
  isActive: boolean
}

export function MissionButton({ title, description, isActive: initialActive }: MissionButtonProps) {
  const [isActive, setIsActive] = useState(initialActive)
  const [isDone, setIsDone] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [showXp, setShowXp] = useState(false)
  const [xpEarned, setXpEarned] = useState(0)
  const [error, setError] = useState<string | null>(null)

  if (isDone) {
    return (
      <>
        <XpToast xp={xpEarned} visible={showXp} onDone={() => setShowXp(false)} />
        <p className="text-xs text-emerald-600 font-semibold">✓ Misja ukończona! +{xpEarned} XP</p>
      </>
    )
  }

  if (!isActive) {
    return (
      <>
        {error && <p className="text-xs text-destructive mb-1">{error}</p>}
        <Button
          size="sm"
          variant="outline"
          className="w-full h-7 text-xs border-violet-300 text-violet-700 hover:bg-violet-50"
          disabled={isPending}
          onClick={() => {
            setError(null)
            startTransition(async () => {
              const res = await startMission(title, description)
              if ("error" in res) { setError(res.error); return }
              setIsActive(true)
            })
          }}
        >
          {isPending ? "Startowanie..." : "🎯 Rozpocznij misję"}
        </Button>
      </>
    )
  }

  return (
    <>
      {error && <p className="text-xs text-destructive mb-1">{error}</p>}
      <div className="flex gap-2">
        <p className="text-xs text-violet-600 font-medium flex-1">Misja w toku... Ukończ zadanie!</p>
        <Button
          size="sm"
          variant="gradient"
          className="h-7 text-xs shrink-0"
          disabled={isPending}
          onClick={() => {
            setError(null)
            startTransition(async () => {
              const res = await completeMission(title, description)
              if ("error" in res) { setError(res.error); return }
              setXpEarned(res.xpEarned)
              setIsDone(true)
              if (res.xpEarned > 0) setShowXp(true)
            })
          }}
        >
          {isPending ? "Zapisywanie..." : "✓ Ukończono!"}
        </Button>
      </div>
    </>
  )
}
