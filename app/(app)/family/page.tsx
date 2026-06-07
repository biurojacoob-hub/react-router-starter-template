import type { User, FamilyInvite } from "@prisma/client"
import { requireRole } from "@/src/lib/auth/guards"
import { prisma } from "@/src/lib/db"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, UserPlus, Settings } from "lucide-react"
import Link from "next/link"

export default async function FamilyPage() {
  const session = await requireRole("PARENT", "ADMIN")

  const family = await prisma.family.findUnique({
    where: { id: session.user.familyId! },
    include: {
      members: {
        where: { deletedAt: null },
        orderBy: { createdAt: "asc" },
      },
      subscription: true,
      invites: {
        where: { deletedAt: null, usedAt: null, expiresAt: { gt: new Date() } },
        orderBy: { createdAt: "desc" },
      },
    },
  })

  if (!family) return <div>Nie znaleziono rodziny.</div>

  const planLabel: Record<string, string> = {
    FREE: "Starter",
    FAMILY: "Family",
    FAMILY_PLUS: "Family Plus",
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">{family.name}</h1>
          <p className="text-muted-foreground mt-1">Zarządzaj rodziną i zaproszeniami</p>
        </div>
        <Badge variant={family.subscriptionTier === "FREE" ? "secondary" : "default"}>
          {planLabel[family.subscriptionTier] ?? family.subscriptionTier}
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Members */}
        <Card className="rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Członkowie rodziny
              </CardTitle>
              <CardDescription>{family.members.length} osób</CardDescription>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/family/members">Zarządzaj</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {family.members.map((member: User) => (
              <div key={member.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">
                    {member.firstName} {member.lastName}
                  </p>
                  <p className="text-xs text-muted-foreground">{member.email}</p>
                </div>
                <Badge variant={member.role === "PARENT" ? "secondary" : "outline"} className="text-xs">
                  {member.role === "PARENT" ? "Rodzic" : member.role === "CHILD" ? "Dziecko" : "Admin"}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Invite */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-primary" />
              Zaproszenia
            </CardTitle>
            <CardDescription>
              {family.invites.length} aktywnych zaproszeń
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {family.invites.length === 0 ? (
              <p className="text-sm text-muted-foreground">Brak aktywnych zaproszeń.</p>
            ) : (
              family.invites.slice(0, 3).map((inv: FamilyInvite) => (
                <div key={inv.id} className="flex items-center justify-between text-sm">
                  <code className="rounded bg-muted px-2 py-0.5 font-mono text-xs">{inv.code}</code>
                  <span className="text-muted-foreground text-xs">
                    wygasa {inv.expiresAt.toLocaleDateString("pl-PL")}
                  </span>
                </div>
              ))
            )}
            <Button asChild className="w-full" variant="outline">
              <Link href="/family/invite">
                <UserPlus className="h-4 w-4 mr-2" />
                Zaproś członka rodziny
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Subscription */}
      <Card className="rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              Plan subskrypcji
            </CardTitle>
            <CardDescription>
              Aktualny plan: <strong>{planLabel[family.subscriptionTier]}</strong>
              {family.subscription?.currentPeriodEnd && (
                <> · odnawia się {family.subscription.currentPeriodEnd.toLocaleDateString("pl-PL")}</>
              )}
            </CardDescription>
          </div>
          {family.subscriptionTier === "FREE" && (
            <Button asChild variant="gradient" size="sm">
              <Link href="/pricing">Ulepsz plan</Link>
            </Button>
          )}
        </CardHeader>
      </Card>
    </div>
  )
}
