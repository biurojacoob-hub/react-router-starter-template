import Link from "next/link"
import { ArrowRight, Plus, Target } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { formatCurrency } from "@/lib/utils"

interface SavingsGoal {
  id: string
  title: string
  emoji: string
  targetAmount: number
  currentAmount: number
}

interface SavingsGoalWidgetProps {
  goals: SavingsGoal[]
}

export function SavingsGoalWidget({ goals }: SavingsGoalWidgetProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">Cele oszczędnościowe</CardTitle>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/goals">
              Więcej <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {goals.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-4 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-900/20">
              <Target className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Brak celów oszczędnościowych</p>
              <p className="text-xs text-muted-foreground mt-0.5">Ustaw pierwszy cel i zacznij odkładać!</p>
            </div>
            <Button size="sm" variant="outline" asChild>
              <Link href="/goals">
                <Plus className="h-3.5 w-3.5 mr-1" /> Utwórz pierwszy cel
              </Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-5">
            {goals.map((goal) => {
              const percent = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100))
              return (
                <div key={goal.id}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{goal.emoji}</span>
                      <span className="text-sm font-semibold">{goal.title}</span>
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">{percent}%</span>
                  </div>
                  <Progress value={percent} className="h-2.5 mb-1.5" indicatorClassName="bg-emerald-500" />
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{formatCurrency(goal.currentAmount)} odłożone</span>
                    <span className="text-xs font-medium">cel: {formatCurrency(goal.targetAmount)}</span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
