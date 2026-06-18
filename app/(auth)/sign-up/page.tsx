import type { Metadata } from "next"
import { SignUpForm } from "@/src/components/auth/sign-up-form"

export const metadata: Metadata = {
  title: "Utwórz konto",
  description: "Zarejestruj się w Family Finance Academy i zacznij uczyć dziecko finansów.",
}

interface Props {
  searchParams: Promise<{ invite?: string }>
}

export default async function SignUpPage({ searchParams }: Props) {
  const { invite } = await searchParams
  const isInvite = !!invite

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          {isInvite ? "Dołącz do rodziny" : "Utwórz konto rodzica"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {isInvite
            ? "Ktoś zaprosił Cię do Family Finance Academy. Utwórz konto, aby dołączyć."
            : "Zacznij darmowy 14-dniowy okres próbny. Bez karty kredytowej."}
        </p>
      </div>
      <SignUpForm inviteCode={invite} />
    </div>
  )
}
