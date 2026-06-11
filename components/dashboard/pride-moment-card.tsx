import { Trophy, Star, Flame } from "lucide-react"
import { FINN } from "@/src/lib/hero/finn"

type Milestone =
  | { type: "level"; value: number }
  | { type: "day"; value: number }
  | { type: "daily"; value: 0 }

interface PrideMomentCardProps {
  milestone: Milestone
  firstName: string
}

const MILESTONE_CONFIG: Record<string, {
  emoji: string
  headline: string
  body: string
  bg: string
  textColor: string
}> = {
  "level-5": {
    emoji: "⭐",
    headline: "Poziom 5 — Pierwszy wielki kamień milowy!",
    body: "Doszedłeś dalej niż większość dzieci, które zaczynają. To nie przypadek — to Twoja praca.",
    bg: "from-amber-500 to-orange-500",
    textColor: "text-white",
  },
  "level-10": {
    emoji: "🌟",
    headline: "Poziom 10 — Jesteś w elicie!",
    body: "80% uczniów rezygnuje przed poziomem 10. Ty właśnie udowodniłeś, że należysz do tych, którym się udaje.",
    bg: "from-violet-600 to-purple-600",
    textColor: "text-white",
  },
  "day-7": {
    emoji: "🔥",
    headline: "7 dni przygody — Tydzień Bohatera!",
    body: "Wróciłeś siedem razy. Wiesz co to znaczy? Zaczyna się w Tobie rodzić nawyk, który zmieni Twoje życie.",
    bg: "from-rose-500 to-pink-600",
    textColor: "text-white",
  },
  "day-14": {
    emoji: "🚀",
    headline: "14 dni — Jesteś w połowie epickiej wyprawy!",
    body: "Dwa tygodnie finansowej przygody. Finn widział wielu uczniów — ale niewielu dotarło tak daleko.",
    bg: "from-sky-500 to-blue-600",
    textColor: "text-white",
  },
  "day-30": {
    emoji: "👑",
    headline: "Dzień 30 — Osiągnąłeś szczyt!",
    body: "Ukończyłeś pełną 30-dniową przygodę finansową. To rzadkość. To osiągnięcie, które zostanie z Tobą na zawsze.",
    bg: "from-emerald-500 to-teal-600",
    textColor: "text-white",
  },
}

function getMilestoneKey(milestone: Milestone): string {
  return `${milestone.type}-${milestone.value}`
}

export function detectMilestone(
  level: number,
  currentDay: number,
  dayProgressPercent: number,
): Milestone | null {
  // Level milestones — persistent while at that level
  if (level === 5) return { type: "level", value: 5 }
  if (level === 10) return { type: "level", value: 10 }
  // Named day milestones — shown when complete
  if (dayProgressPercent === 100) {
    if (currentDay === 7)  return { type: "day", value: 7 }
    if (currentDay === 14) return { type: "day", value: 14 }
    if (currentDay === 30) return { type: "day", value: 30 }
    // Any other completed day — lighter daily pride
    return { type: "daily", value: 0 }
  }
  return null
}

// Lighter card for daily hero flow completion (non-milestone days)
export function DailyCompletionCard({ firstName, currentDay }: { firstName: string; currentDay: number }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/20 border border-emerald-200/60 dark:border-emerald-800/30 p-4">
      <span className="text-3xl shrink-0">🎉</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300 leading-tight">
          Dzień {currentDay} ukończony, {firstName}!
        </p>
        <p className="text-xs text-emerald-700/80 dark:text-emerald-400 mt-0.5">
          {FINN.emoji} Finn mówi: Wróć jutro po Dzień {Math.min(currentDay + 1, 30)}. Czeka na Ciebie nowa przygoda.
        </p>
      </div>
    </div>
  )
}

export function PrideMomentCard({ milestone, firstName }: PrideMomentCardProps) {
  const key = getMilestoneKey(milestone)
  const config = MILESTONE_CONFIG[key]
  if (!config) return null

  return (
    <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${config.bg} p-6 shadow-xl`}>
      {/* Background glow */}
      <div className="pointer-events-none absolute -top-8 -right-8 h-40 w-40 rounded-full bg-white/20 blur-3xl" />

      <div className="relative">
        {/* Icon */}
        <div className="mb-4 flex items-center gap-3">
          <span className="text-5xl">{config.emoji}</span>
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-white/60 text-white/60" />
            ))}
          </div>
        </div>

        {/* Headline */}
        <h2 className={`text-xl font-extrabold leading-snug mb-2 ${config.textColor}`}>
          {config.headline}
        </h2>
        <p className={`text-sm leading-relaxed mb-4 opacity-90 ${config.textColor}`}>
          {config.body}
        </p>

        {/* Finn says */}
        <div className="flex items-center gap-2 rounded-2xl bg-white/20 px-3 py-2">
          <span className="text-xl">{FINN.emoji}</span>
          <p className={`text-sm font-medium ${config.textColor}`}>
            {firstName}, Finn jest z Ciebie naprawdę dumny.
          </p>
        </div>
      </div>
    </div>
  )
}
