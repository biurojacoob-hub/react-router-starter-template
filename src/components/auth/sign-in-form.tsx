"use client"

import { useActionState } from "react"
import Link from "next/link"
import { signInAction, type SignInState } from "@/src/actions/auth/sign-in"
import { Button } from "@/components/ui/button"
import { AuthInput } from "@/src/components/auth/auth-input"
import { AuthError } from "@/src/components/auth/auth-error"

const initialState: SignInState = { success: false }

export function SignInForm({ callbackUrl }: { callbackUrl?: string }) {
  const [state, action, isPending] = useActionState(signInAction, initialState)

  return (
    <form action={action} className="space-y-5">
      {callbackUrl && (
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
      )}

      <AuthInput
        name="email"
        label="Adres email"
        type="email"
        placeholder="marek@example.com"
        autoComplete="email"
        error={state.fieldErrors?.email}
        disabled={isPending}
      />

      <div className="space-y-1">
        <AuthInput
          name="password"
          label="Hasło"
          type="password"
          placeholder="Twoje hasło"
          autoComplete="current-password"
          error={state.fieldErrors?.password}
          disabled={isPending}
        />
        <div className="text-right">
          <Link
            href="/forgot-password"
            className="text-xs text-muted-foreground hover:text-primary hover:underline"
          >
            Zapomniałeś hasła?
          </Link>
        </div>
      </div>

      {state.error && <AuthError message={state.error} />}

      <Button type="submit" className="w-full" size="lg" disabled={isPending}>
        {isPending ? "Logowanie…" : "Zaloguj się"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Nie masz jeszcze konta?{" "}
        <Link href="/sign-up" className="font-medium text-primary hover:underline">
          Zarejestruj się
        </Link>
      </p>
    </form>
  )
}
