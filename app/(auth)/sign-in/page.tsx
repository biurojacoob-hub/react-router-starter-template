import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { auth } from "@/src/auth"
import { SignInForm } from "@/src/components/auth/sign-in-form"

export const metadata: Metadata = {
  title: "Zaloguj się",
  description: "Zaloguj się do Family Finance Academy.",
}

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string; error?: string; invite?: string }>
}) {
  const session = await auth()
  if (session?.user) {
    redirect(session.user.onboardingDone ? "/dashboard" : "/onboarding")
  }

  const { callbackUrl, error, invite } = await searchParams
  // If user arrives from an invite link, redirect back to apply it after login
  const effectiveCallbackUrl = invite ? `/join/${invite}` : callbackUrl

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Witaj z powrotem</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Zaloguj się do swojego konta rodzica.
        </p>
      </div>
      {error === "OAuthAccountNotLinked" && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          Ten email jest już zarejestrowany inną metodą logowania.
        </div>
      )}
      <SignInForm callbackUrl={effectiveCallbackUrl} />
    </div>
  )
}
