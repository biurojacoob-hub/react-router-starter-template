import { Star } from "lucide-react"
import { FINN } from "@/src/lib/hero/finn"
import type { Milestone } from "@/src/lib/product/getDailyUXState"

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

export function PrideMomentCard({ milestone, firstName }: PrideMomentCardProps) {
  const key = `${milestone.type}-${milestone.value}`
  const config = MILESTONE_CONFIG[key]
  if (!config) return null

  return (
    <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${config.bg} p-6 shadow-xl`}>
      <div className="pointer-events-none absolute -top-8 -right-8 h-40 w-40 rounded-full bg-white/20 blur-3xl" />

      <div className="relative">
        <div className="mb-4 flex items-center gap-3">
          <span className="text-5xl">{config.emoji}</span>
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-white/60 text-white/60" />
            ))}
          </div>
        </div>

        <h2 className={`text-xl font-extrabold leading-snug mb-2 ${config.textColor}`}>
          {config.headline}
        </h2>
        <p className={`text-sm leading-relaxed mb-4 opacity-90 ${config.textColor}`}>
          {config.body}
        </p>

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
