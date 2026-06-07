"use client"

import { useActionState, useEffect, useState } from "react"
import { saveStep3Action } from "@/src/actions/auth/onboarding"
import { AuthError } from "./auth-error"
import { Button } from "@/components/ui/button"

const initial: { success: boolean; error?: string } = { success: false }

export function OnboardingStep3({
  childrenCount,
  onNext,
}: {
  childrenCount: number
  onNext: () => void
}) {
  const [ages, setAges] = useState<number[]>(Array(childrenCount).fill(8))
  const [state, action, isPending] = useActionState(saveStep3Action, initial)

  useEffect(() => {
    if (state.success) onNext()
  }, [state.success, onNext])

  return (
    <form action={action} className="space-y-5">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">Ile lat mają Twoje dzieci?</h2>
        <p className="text-sm text-muted-foreground">
          Dostosujemy poziom trudności i treści do wieku każdego dziecka.
        </p>
      </div>

      <div className="space-y-3">
        {Array.from({ length: childrenCount }).map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <label className="text-sm font-medium w-24 shrink-0">
              Dziecko {i + 1}
            </label>
            <div className="flex items-center gap-2 flex-1">
              <input
                type="range"
                name="age"
                min={4}
                max={18}
                value={ages[i]}
                onChange={(e) => {
                  const next = [...ages]
                  next[i] = Number(e.target.value)
                  setAges(next)
                }}
                className="flex-1 accent-sky-500"
              />
              <span className="text-sm font-semibold w-12 text-right tabular-nums">
                {ages[i]} lat
              </span>
            </div>
          </div>
        ))}
      </div>

      {state.error && <AuthError message={state.error} />}

      <Button type="submit" className="w-full" size="lg" disabled={isPending}>
        {isPending ? "Zapisywanie…" : "Dalej →"}
      </Button>
    </form>
  )
}
