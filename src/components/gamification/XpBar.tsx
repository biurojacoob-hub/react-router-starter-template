"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { getLevelForXp, getXpProgressPercent, getXpToNextLevel } from "@/src/gamification/retention/progression"

interface XpBarProps {
  xp: number
  className?: string
  showLabel?: boolean
  animate?: boolean
  size?: "sm" | "md" | "lg"
}

export function XpBar({ xp, className, showLabel = true, animate = true, size = "md" }: XpBarProps) {
  const level = getLevelForXp(xp)
  const percent = getXpProgressPercent(xp)
  const toNext = getXpToNextLevel(xp)

  const [displayPercent, setDisplayPercent] = useState(animate ? 0 : percent)

  useEffect(() => {
    if (!animate) return
    const t = setTimeout(() => setDisplayPercent(percent), 100)
    return () => clearTimeout(t)
  }, [percent, animate])

  const heightClass = size === "sm" ? "h-2" : size === "lg" ? "h-4" : "h-3"

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="mb-1 flex items-center justify-between text-xs font-medium">
          <span className="text-primary font-bold">Poziom {level}</span>
          <span className="text-muted-foreground">{toNext > 0 ? `${toNext} XP do nast. poziomu` : "MAX LEVEL"}</span>
        </div>
      )}
      <div className={cn("w-full overflow-hidden rounded-full bg-muted", heightClass)}>
        <div
          className={cn(
            "h-full rounded-full bg-gradient-to-r from-primary to-blue-400 transition-all duration-1000 ease-out",
          )}
          style={{ width: `${displayPercent}%` }}
        />
      </div>
      {showLabel && (
        <p className="mt-1 text-right text-[10px] text-muted-foreground">
          {xp} XP łącznie
        </p>
      )}
    </div>
  )
}

// ─── STREAK BADGE ────────────────────────────────────────────

interface StreakBadgeProps {
  streak: number
  className?: string
  size?: "sm" | "md" | "lg"
}

export function StreakBadge({ streak, className, size = "md" }: StreakBadgeProps) {
  const sizeClasses = {
    sm: "text-xs px-2 py-0.5 gap-1",
    md: "text-sm px-3 py-1 gap-1.5",
    lg: "text-base px-4 py-1.5 gap-2",
  }

  const color =
    streak >= 30 ? "bg-gradient-to-r from-amber-500 to-yellow-400 text-white" :
    streak >= 14 ? "bg-gradient-to-r from-orange-500 to-red-400 text-white" :
    streak >= 7  ? "bg-gradient-to-r from-primary to-blue-400 text-white" :
    streak >= 3  ? "bg-orange-100 text-orange-700" :
                   "bg-muted text-muted-foreground"

  return (
    <div className={cn("inline-flex items-center rounded-full font-bold", color, sizeClasses[size], className)}>
      <span>🔥</span>
      <span>{streak} {streak === 1 ? "dzień" : "dni"}</span>
    </div>
  )
}
