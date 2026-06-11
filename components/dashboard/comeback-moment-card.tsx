import { Flame } from "lucide-react"
import { FINN } from "@/src/lib/hero/finn"
import type { DailyReward } from "@/src/lib/rewards/variableReward"

interface ComebackMomentCardProps {
  firstName: string
  daysSinceLastVisit: number
  streakDays: number
  dailyReward: DailyReward
  finnNudge: string
}

const COMEBACK_CONFIGS = {
  same_day: null,  // didn't leave
  short: {        // 1 day
    emoji: "🌅",
    headline: "Wróciłeś — to wszystko co się liczy!",
    tone: "bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-950/30 dark:to-blue-950/20 border-sky-200/60 dark:border-sky-800/30",
    textColor: "text-sky-800 dark:text-sky-300",
  },
  medium: {       // 2–3 dni
    emoji: "🔥",
    headline: "Przerwa się skończyła. Czas wracać na ścieżkę!",
    tone: "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20 border-amber-200/60 dark:border-amber-800/30",
    textColor: "text-amber-800 dark:text-amber-300",
  },
  long: {         // 4+ dni
    emoji: "👋",
    headline: "Finn czekał. Wiedział, że wrócisz.",
    tone: "bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/20 border-violet-200/60 dark:border-violet-800/30",
    textColor: "text-violet-800 dark:text-violet-300",
  },
}

export function ComebackMomentCard({ firstName, daysSinceLastVisit, streakDays, dailyReward, finnNudge }: ComebackMomentCardProps) {
  if (daysSinceLastVisit < 1) return null

  const cfg = daysSinceLastVisit === 1 ? COMEBACK_CONFIGS.short
    : daysSinceLastVisit <= 3 ? COMEBACK_CONFIGS.medium
    : COMEBACK_CONFIGS.long

  if (!cfg) return null

  return (
    <div className={`rounded-2xl border p-4 space-y-3 ${cfg.tone}`}>
      {/* Header */}
      <div className="flex items-center gap-3">
        <span className="text-3xl shrink-0">{cfg.emoji}</span>
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-bold leading-tight ${cfg.textColor}`}>
            {cfg.headline}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {daysSinceLastVisit === 1
              ? `Byłeś tu wczoraj, ${firstName}.`
              : `${daysSinceLastVisit} dni przerwy, ${firstName}.`}
            {streakDays > 0 && ` Seria: ${streakDays} dni.`}
          </p>
        </div>
      </div>

      {/* Finn says */}
      <div className="flex items-start gap-2 rounded-xl bg-white/50 dark:bg-white/5 px-3 py-2">
        <span className="text-base shrink-0">{FINN.emoji}</span>
        <p className="text-xs leading-relaxed text-muted-foreground italic">&ldquo;{finnNudge}&rdquo;</p>
      </div>

      {/* Variable reward — if rare, show bonus */}
      {dailyReward.isRare && (
        <div className="flex items-center gap-2 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200/50 dark:border-yellow-800/30 px-3 py-2">
          <Flame className="h-4 w-4 text-yellow-500 shrink-0" />
          <p className="text-xs font-semibold text-yellow-700 dark:text-yellow-300">{dailyReward.rewardMessage}</p>
        </div>
      )}
    </div>
  )
}
