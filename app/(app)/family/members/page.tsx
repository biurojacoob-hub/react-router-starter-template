import { requireRole } from "@/src/lib/auth/guards"
import { prisma } from "@/src/lib/db"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MemberActions } from "@/src/components/auth/member-actions"
import { UserCircle } from "lucide-react"
import type { User } from "@prisma/client"

export default async function MembersPage() {
  const session = await requireRole("PARENT", "ADMIN")

  const members = await prisma.user.findMany({
    where: { familyId: session.user.familyId!, deletedAt: null },
    orderBy: [{ role: "asc" }, { createdAt: "asc" }],
  })

  const roleLabel: Record<string, string> = {
    PARENT: "Rodzic",
    CHILD: "Dziecko",
    ADMIN: "Admin",
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Członkowie rodziny</h1>
        <p className="text-muted-foreground mt-1">{members.length} osób w rodzinie</p>
      </div>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-base">Wszyscy członkowie</CardTitle>
        </CardHeader>
        <CardContent className="divide-y divide-border">
          {members.map((member: User) => {
            const isCurrentUser = member.id === session.user.id
            return (
              <div key={member.id} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <UserCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {member.firstName} {member.lastName}
                      {isCurrentUser && (
                        <span className="ml-2 text-xs text-muted-foreground">(Ty)</span>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    variant={member.role === "PARENT" ? "secondary" : "outline"}
                    className="text-xs"
                  >
                    {roleLabel[member.role] ?? member.role}
                  </Badge>
                  {!isCurrentUser && (
                    <MemberActions
                      userId={member.id}
                      currentRole={member.role as "PARENT" | "CHILD"}
                    />
                  )}
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}
