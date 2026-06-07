"use client"

import { useActionState, useEffect } from "react"
import { saveStep2Action } from "@/src/actions/auth/onboarding"
import { AuthError } from "./auth-error"
import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react"
import { useState } from "react"

const initial: { success: boolean; error?: string } = { success: false }

export function OnboardingStep2({ onNext }: { onNext: (count: number) => void }) {
  const [count, setCount] = useState(1)
  const [state, action, isPending] = useActionState(saveStep2Action, initial)

  useEffect(() => {
    if (state.success) onNext(count)
  }, [state.success, count, onNext])

  return (
    <form action={action} className="space-y-5">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">Ile masz dzieci?</h2>
        <p className="text-sm text-muted-foreground">
          Możesz dodać więcej później.
        </p>
      </div>

      <input type="hidden" name="childrenCount" value={count} />

      <div className="flex items-center justify-center gap-6 py-4">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => setCount((c) => Math.max(1, c - 1))}
          disabled={count <= 1}
          className="h-12 w-12 rounded-full"
        >
          <Minus className="h-5 w-5" />
        </Button>
        <span className="text-5xl font-bold w-16 text-center tabular-nums">{count}</span>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => setCount((c) => Math.min(10, c + 1))}
          disabled={count >= 10}
          className="h-12 w-12 rounded-full"
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>

      {state.error && <AuthError message={state.error} />}

      <Button type="submit" className="w-full" size="lg" disabled={isPending}>
        {isPending ? "Zapisywanie…" : "Dalej →"}
      </Button>
    </form>
  )
}
