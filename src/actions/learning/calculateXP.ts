"use server"

import { xpToLevel, levelProgress, xpForNextLevel } from "@/src/lib/learning/xp"

export type XPStats = {
  totalXp: number
  level: number
  levelProgress: number       // 0–1
  xpInCurrentLevel: number
  xpForNextLevel: number | null
}

export async function calculateXP(totalXp: number): Promise<XPStats> {
  const level = xpToLevel(totalXp)
  const progress = levelProgress(totalXp)
  const nextLevelXp = xpForNextLevel(totalXp)

  const { LEVEL_THRESHOLDS } = await import("@/src/lib/learning/xp")
  const levelStart = LEVEL_THRESHOLDS[level] ?? 0
  const xpInCurrentLevel = totalXp - levelStart

  return {
    totalXp,
    level,
    levelProgress: progress,
    xpInCurrentLevel,
    xpForNextLevel: nextLevelXp,
  }
}
