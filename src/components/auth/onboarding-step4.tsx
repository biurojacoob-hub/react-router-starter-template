"use client"

import { useActionState, useEffect } from "react"
import { saveStep4Action } from "@/src/actions/auth/onboarding"
import { AuthError } from "./auth-error"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const GOALS = [
  { value: "saving", label: "💰 Oszczędzanie", description: "Nauka odkładania na cele" },
  { value: "budgeting", label: "📊 Budżetowanie", description: "Planowanie wydatków" },
  { value: "investing", label: "📈 Inwestowanie", description: "Podstawy giełdy i ETF" },
  { value: "earning", label: "⚒️ Zarabianie", description: "Wartość pracy i czasu" },
  { value: "responsibility", label: "🎯 Odpowiedzialność", description: "Mądre decyzje finansowe" },
  { value: "digital", label: "💳 Płatności cyfrowe", description: "Bezpieczeństwo online" },
]

const initial: { success: boolean; error?: string } = { success: false }

export function OnboardingStep4({ onFinish }: { onFinish: () => void }) {
  const [selected, setSelected] = useGoals()
  const [state, action, isPending] = useActionState(saveStep4Action, initial)

  useEffect(() => {
    if (state.success) onFinish()
  }, [state.success, onFinish])

  return (
    <form action={action} className="space-y-5">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">Jakie są Wasze cele edukacyjne?</h2>
        <p className="text-sm text-muted-foreground">
          Wybierz przynajmniej jeden. Możesz zmienić to w ustawieniach.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {GOALS.map((goal) => {
          const isSelected = selected.includes(goal.value)
          return (
            <label
              key={goal.value}
              className={cn(
                "flex flex-col gap-1 rounded-xl border p-3 cursor-pointer transition-colors",
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              )}
            >
              <input
                type="checkbox"
                name="goals"
                value={goal.value}
                checked={isSelected}
                onChange={() =>
                  setSelected((prev) =>
                    isSelected ? prev.filter((g) => g !== goal.value) : [...prev, goal.value]
                  )
                }
                className="sr-only"
              />
              <span className="text-sm font-medium">{goal.label}</span>
              <span className="text-xs text-muted-foreground">{goal.description}</span>
            </label>
          )
        })}
      </div>

      {state.error && <AuthError message={state.error} />}

      <Button
        type="submit"
        className="w-full"
        size="lg"
        disabled={isPending || selected.length === 0}
      >
        {isPending ? "Kończenie…" : "Zacznij naukę 🎉"}
      </Button>
    </form>
  )
}

// tiny local hook to keep selected state
import { useState } from "react"
function useGoals() {
  return useState<string[]>([])
}
