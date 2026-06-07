"use client"

import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { signUpAction, type SignUpState } from "@/src/actions/auth/sign-up"
import { Button } from "@/components/ui/button"
import { AuthInput } from "@/src/components/auth/auth-input"
import { AuthError } from "@/src/components/auth/auth-error"

const initialState: SignUpState = { success: false }

export function SignUpForm() {
  const router = useRouter()
  const [state, action, isPending] = useActionState(signUpAction, initialState)

  useEffect(() => {
    if (state.success) router.push("/onboarding")
  }, [state.success, router])

  return (
    <form action={action} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <AuthInput
          name="firstName"
          label="Imię"
          placeholder="Marek"
          autoComplete="given-name"
          error={state.fieldErrors?.firstName}
          disabled={isPending}
        />
        <AuthInput
          name="lastName"
          label="Nazwisko"
          placeholder="Kowalski"
          autoComplete="family-name"
          error={state.fieldErrors?.lastName}
          disabled={isPending}
        />
      </div>

      <AuthInput
        name="email"
        label="Adres email"
        type="email"
        placeholder="marek@example.com"
        autoComplete="email"
        error={state.fieldErrors?.email}
        disabled={isPending}
      />

      <AuthInput
        name="password"
        label="Hasło"
        type="password"
        placeholder="Min. 8 znaków, 1 wielka litera, 1 cyfra"
        autoComplete="new-password"
        error={state.fieldErrors?.password}
        disabled={isPending}
      />

      {state.error && <AuthError message={state.error} />}

      <Button type="submit" className="w-full" size="lg" disabled={isPending}>
        {isPending ? "Tworzenie konta…" : "Utwórz konto"}
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
