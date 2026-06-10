"use client"

import { useState, useTransition } from "react"
import { completeLesson } from "@/src/actions/learning/completeLesson"
import { Button } from "@/components/ui/button"
import { XpToast, LevelUpModal } from "@/src/components/gamification/CelebrationModal"
import type { CompleteLessonResult } from "@/src/lib/learning/types"

type Props = {
  lessonId: string
  alreadyCompleted: boolean
  onComplete?: (result: CompleteLessonResult) => void
}

export function LessonCompletionButton({ lessonId, alreadyCompleted, onComplete }: Props) {
  const [done, setDone] = useState(alreadyCompleted)
  const [result, setResult] = useState<CompleteLessonResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const [showXpToast, setShowXpToast] = useState(false)
  const [showLevelUp, setShowLevelUp] = useState(false)

  if (done && !result) {
    return (
      <div className="text-center text-sm text-green-600 dark:text-green-400 font-medium py-2">
        ✓ Lekcja ukończona
      </div>
    )
  }

  if (result) {
    return (
      <>
        <XpToast
          xp={result.xpEarned}
          visible={showXpToast}
          onDone={() => setShowXpToast(false)}
        />
        <LevelUpModal
          open={showLevelUp}
          newLevel={result.newLevel}
          onClose={() => setShowLevelUp(false)}
        />
        <div className="rounded-xl border border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-950/30 p-4 space-y-1 text-center">
          <p className="font-semibold text-green-700 dark:text-green-300">✓ Lekcja ukończona!</p>
          {result.xpEarned > 0 && <p className="text-sm">⚡ +{result.xpEarned} XP</p>}
          {result.levelUp && (
            <p className="text-sm font-bold text-primary">🆙 Poziom {result.newLevel}!</p>
          )}
          {result.streakIncremented && (
            <p className="text-sm">🔥 Seria: {result.streakDays} dni</p>
          )}
          {result.newBadges.length > 0 && (
            <p className="text-sm">🏅 Nowe odznaki: {result.newBadges.length}</p>
          )}
        </div>
      </>
    )
  }

  return (
    <div className="space-y-2">
      {error && <p className="text-destructive text-sm text-center">{error}</p>}
      <Button
        className="w-full"
        size="lg"
        onClick={() => {
          setError(null)
          startTransition(async () => {
            try {
              const res = await completeLesson(lessonId)
              if ("error" in res) {
                setError(res.error)
                return
              }
              setResult(res)
              setDone(true)
              if (res.xpEarned > 0) setShowXpToast(true)
              if (res.levelUp) setTimeout(() => setShowLevelUp(true), 600)
              onComplete?.(res)
            } catch (e) {
              setError(e instanceof Error ? e.message : "Błąd podczas oznaczania lekcji")
            }
          })
        }}
        disabled={isPending}
      >
        {isPending ? "Zapisywanie..." : "Oznacz jako ukończoną"}
      </Button>
    </div>
  )
}
