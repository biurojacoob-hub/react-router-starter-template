import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { Plus, Target } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"
import { auth } from "@/src/auth"
import { prisma } from "@/src/lib/db"

export const metadata: Metadata = { title: "Cele" }

export default async function GoalsPage() {
  const session = await auth()
  if (!session?.user) redirect("/sign-in")

  const child = await prisma.childProfile.findFirst({
    where: { userId: session.user.id, deletedAt: null },
    select: { id: true },
  })

  if (!child) redirect("/onboarding")

  const goals = await prisma.savingsGoal.findMany({
    where: { childId: child.id, deletedAt: null },
    orderBy: { createdAt: "asc" },
  })

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Cele oszczędnościowe</h1>
          <p className="text-muted-foreground text-sm mt-1">Odkładaj na marzenia krok po kroku</p>
        </div>
      </div>

      {goals.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 gap-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-900/20">
              <Target className="h-8 w-8 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Brak celów oszczędnościowych</h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Cele oszczędnościowe pomogą Ci odkładać na marzenia. Zapytaj rodzica, żeby ustawił Ci pierwszy cel!
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {goals.map((goal) => {
            const percent = Math.min(100, Math.round((Number(goal.currentAmount) / Number(goal.targetAmount)) * 100))
            const done = goal.achieved
            return (
              <Card key={goal.id} className={done ? "border-emerald-300 bg-emerald-50/30 dark:bg-emerald-900/10" : ""}>
                <CardContent className="p-6">
                  <div className="text-4xl mb-3">{goal.emoji}</div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold">{goal.title}</h3>
                    {done && <Badge variant="success">Osiągnięty!</Badge>}
                  </div>
                  <div className="text-sm text-muted-foreground mb-4">
                    {formatCurrency(Number(goal.currentAmount))} z {formatCurrency(Number(goal.targetAmount))}
                    {goal.deadline && ` · do ${new Date(goal.deadline).toLocaleDateString("pl-PL")}`}
                  </div>
                  <Progress
                    value={percent}
                    className="h-3 mb-2"
                    indicatorClassName={done ? "bg-emerald-500" : "bg-sky-500"}
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold">{percent}%</span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
