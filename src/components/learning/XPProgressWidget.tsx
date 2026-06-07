"use client"

import { calculateXP } from "@/src/actions/learning/calculateXP"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useEffect, useState } from "react"
import type { XPStats } from "@/src/actions/learning/calculateXP"

type Props = { totalXp: number }

export function XPProgressWidget({ totalXp }: Props) {
  const [stats, setStats] = useState<XPStats | null>(null)

  useEffect(() => {
    calculateXP(totalXp).then(setStats)
  }, [totalXp])

  if (!stats) return null

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <span>⚡</span> XP & Poziom
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-primary">Poziom {stats.level}</p>
            <p className="text-sm text-muted-foreground">{stats.totalXp} XP łącznie</p>
          </div>
          {stats.xpForNextLevel !== null && (
            <div className="text-right text-sm text-muted-foreground">
              <p>{stats.xpInCurrentLevel} / {stats.xpInCurrentLevel + stats.xpForNextLevel} XP</p>
              <p>do kolejnego poziomu</p>
            </div>
          )}
        </div>
        {stats.xpForNextLevel !== null ? (
          <Progress value={stats.levelProgress * 100} className="h-2" />
        ) : (
          <p className="text-sm text-primary font-semibold">🏆 Maksymalny poziom!</p>
        )}
      </CardContent>
    </Card>
  )
}
