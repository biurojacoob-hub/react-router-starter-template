import Link from "next/link"
import { ArrowRight, Target, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface MissionItem {
  id: string
  title: string
  xpReward: number
  coinsReward?: number
  daysLeft?: number | null
  progress: number
}

interface CurrentMissionsProps {
  missions: MissionItem[]
}

export function CurrentMissions({ missions }: CurrentMissionsProps) {
  if (missions.length === 0) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Aktywne misje</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/missions">
              Wszystkie <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-4">
            Brak aktywnych misji. Sprawdź dostępne misje! 🎯
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">Aktywne misje</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/missions">
            Wszystkie <ArrowRight className="ml-1 h-3.5 w-3.5" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {missions.map((mission) => (
          <div
            key={mission.id}
            className="rounded-xl border p-4 transition-colors hover:bg-muted/30"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-50 dark:bg-violet-900/20">
                <Target className="h-4 w-4 text-violet-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold leading-tight mb-1">{mission.title}</p>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="purple" className="text-[10px] h-4">+{mission.xpReward} XP</Badge>
                  {mission.coinsReward ? (
                    <Badge variant="warning" className="text-[10px] h-4">🪙 {mission.coinsReward}</Badge>
                  ) : null}
                  {mission.daysLeft ? (
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {mission.daysLeft} dni
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Progress value={mission.progress} className="flex-1 h-1.5" indicatorClassName="bg-violet-500" />
              <span className="text-xs font-medium text-muted-foreground w-8 text-right">{mission.progress}%</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
