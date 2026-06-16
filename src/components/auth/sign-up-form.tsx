"use client"

import { useActionState, useEffect, useRef, useState } from "react"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { signUpAction, type SignUpState } from "@/src/actions/auth/sign-up"
import { Button } from "@/components/ui/button"
import { AuthInput } from "@/src/components/auth/auth-input"
import { AuthError } from "@/src/components/auth/auth-error"

const initialState: SignUpState = { success: false }

export function SignUpForm() {
  const passwordRef = useRef<HTMLInputElement>(null)
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [state, action, isPending] = useActionState(signUpAction, initialState)

  useEffect(() => {
    if (state.success && state.email) {
      const password = passwordRef.current?.value ?? ""
      setIsSigningIn(true)
      signIn("credentials", {
        email: state.email,
        password,
        callbackUrl: "/onboarding",
        redirect: true,
      })
    }
  }, [state.success, state.email])

  return (
    <form action={action} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <AuthInput
          name="firstName"
          label="Imię"
          placeholder="Marek"
          autoComplete="given-name"
          error={state.fieldErrors?.firstName}
          disabled={isPending || isSigningIn}
        />
        <AuthInput
          name="lastName"
          label="Nazwisko"
          placeholder="Kowalski"
          autoComplete="family-name"
          error={state.fieldErrors?.lastName}
          disabled={isPending || isSigningIn}
        />
      </div>

      <AuthInput
        name="email"
        label="Adres email"
        type="email"
        placeholder="marek@example.com"
        autoComplete="email"
        error={state.fieldErrors?.email}
        disabled={isPending || isSigningIn}
      />

      {/* Password with ref to read value for auto-login */}
      <div className="space-y-1.5">
        <label htmlFor="password" className="block text-sm font-medium text-foreground">
          Hasło
        </label>
        <input
          ref={passwordRef}
          id="password"
          name="password"
          type="password"
          placeholder="Min. 8 znaków, 1 wielka litera, 1 cyfra"
          autoComplete="new-password"
          disabled={isPending || isSigningIn}
          className="w-full rounded-xl border bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors border-border"
          aria-invalid={!!state.fieldErrors?.password}
        />
        {state.fieldErrors?.password && (
          <p className="text-xs text-destructive" role="alert">
            {state.fieldErrors.password}
          </p>
        )}
      </div>

      {state.error && <AuthError message={state.error} />}

      <Button type="submit" className="w-full" size="lg" disabled={isPending || isSigningIn}>
        {isPending ? "Tworzenie konta…" : isSigningIn ? "Logowanie…" : "Utwórz konto"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Masz już konto?{" "}
        <Link href="/sign-in" className="font-medium text-primary hover:underline">
          Zaloguj się
        </Link>
      </p>

      <p className="text-center text-xs text-muted-foreground">
        Rejestrując się, akceptujesz{" "}
        <Link href="/terms" className="hover:underline">Regulamin</Link>
        {" "}i{" "}
        <Link href="/privacy" className="hover:underline">Politykę prywatności</Link>.
      </p>
    </form>
  )
}
