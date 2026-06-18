import { redirect } from "next/navigation"
import { prisma } from "@/src/lib/db"
import { auth } from "@/src/auth"
import { applyInviteCode } from "@/src/actions/auth/applyInvite"

interface Props {
  params: Promise<{ code: string }>
}

export default async function JoinPage({ params }: Props) {
  const { code } = await params

  const invite = await prisma.familyInvite.findUnique({
    where: { code },
    select: { id: true, familyId: true, role: true, expiresAt: true, usedAt: true, deletedAt: true },
  })

  if (!invite || invite.deletedAt || invite.usedAt || invite.expiresAt < new Date()) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <div className="text-center space-y-4 max-w-sm">
          <div className="text-5xl">😕</div>
          <h1 className="text-2xl font-bold">Zaproszenie nieważne</h1>
          <p className="text-muted-foreground text-sm">
            Ten link wygasł lub został już wykorzystany. Poproś rodzica o nowe zaproszenie.
          </p>
          <a
            href="/sign-in"
            className="inline-block mt-4 rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground"
          >
            Zaloguj się
          </a>
        </div>
      </div>
    )
  }

  const session = await auth()

  if (!session?.user) {
    redirect(`/sign-up?invite=${code}`)
  }

  // User is logged in — apply the invite immediately
  const result = await applyInviteCode(code)
  if (!result.success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <div className="text-center space-y-4 max-w-sm">
          <div className="text-5xl">⚠️</div>
          <h1 className="text-2xl font-bold">Nie można dołączyć</h1>
          <p className="text-muted-foreground text-sm">{result.message}</p>
          <a
            href="/dashboard"
            className="inline-block mt-4 rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground"
          >
            Idź do dashboardu
          </a>
        </div>
      </div>
    )
  }

  redirect("/child/welcome")
}
