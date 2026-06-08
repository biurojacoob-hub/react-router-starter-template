import { BookOpen, Target, Trophy } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface ProgressOverviewProps {
  lessonsCompleted: number
  lessonsTotal: number
  missionsCompleted: number
  missionsTotal: number
  badgesEarned: number
  badgesTotal: number
}

export function ProgressOverview({
  lessonsCompleted,
  lessonsTotal,
  missionsCompleted,
  missionsTotal,
  badgesEarned,
  badgesTotal,
}: ProgressOverviewProps) {
  const stats = [
    {
      label: "Lekcje ukończone",
      value: lessonsCompleted,
      total: lessonsTotal,
      icon: BookOpen,
      color: "text-sky-600",
      bg: "bg-sky-50 dark:bg-sky-900/20",
      progressColor: "bg-sky-500",
    },
    {
      label: "Misje zrealizowane",
      value: missionsCompleted,
      total: missionsTotal,
      icon: Target,
      color: "text-violet-600",
      bg: "bg-violet-50 dark:bg-violet-900/20",
      progressColor: "bg-violet-500",
    },
    {
      label: "Odznaki zdobyte",
      value: badgesEarned,
      total: badgesTotal,
      icon: Trophy,
      color: "text-amber-600",
      bg: "bg-amber-50 dark:bg-amber-900/20",
      progressColor: "bg-amber-500",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon
        const percent = stat.total > 0 ? Math.round((stat.value / stat.total) * 100) : 0

        return (
          <Card key={stat.label}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={`rounded-xl p-2.5 ${stat.bg}`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <span className="text-xs text-muted-foreground font-medium">
                  {stat.value}/{stat.total}
                </span>
              </div>

              <div className="mb-1">
                <span className="text-2xl font-bold">{stat.value}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">{stat.label}</p>

              <Progress value={percent} className="h-1.5" indicatorClassName={stat.progressColor} />
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
