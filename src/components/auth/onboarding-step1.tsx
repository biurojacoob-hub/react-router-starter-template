"use client"

import { useActionState, useEffect } from "react"
import { saveStep1Action } from "@/src/actions/auth/onboarding"
import { AuthInput } from "./auth-input"
import { AuthError } from "./auth-error"
import { Button } from "@/components/ui/button"

const initial: { success: boolean; error?: string } = { success: false }

export function OnboardingStep1({ onNext }: { onNext: () => void }) {
  const [state, action, isPending] = useActionState(saveStep1Action, initial)

  useEffect(() => {
    if (state.success) onNext()
  }, [state.success, onNext])

  return (
    <form action={action} className="space-y-5">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">Jak ma na imię Wasza rodzina?</h2>
        <p className="text-sm text-muted-foreground">
          Zostanie wyświetlona w Twoim panelu.
        </p>
      </div>

      <AuthInput
        name="familyName"
        label="Nazwa rodziny"
        placeholder="np. Rodzina Kowalskich"
        autoComplete="off"
        disabled={isPending}
      />

      {state.error && <AuthError message={state.error} />}

      <Button type="submit" className="w-full" size="lg" disabled={isPending}>
        {isPending ? "Zapisywanie…" : "Dalej →"}
      </Button>
    </form>
  )
}
