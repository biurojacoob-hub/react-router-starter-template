import Link from "next/link"
import { ChevronRight, Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { MoneyFact } from "@/src/lib/discoveries/facts"

interface DiscoveryWidgetProps {
  latestFact: MoneyFact
  totalUnlocked: number
  totalFacts: number
}

const CATEGORY_COLORS: Record<string, string> = {
  historia:  "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800",
  świat:     "bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800",
  tajemnica: "bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800",
  nauka:     "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
}

export function DiscoveryWidget({ latestFact, totalUnlocked, totalFacts }: DiscoveryWidgetProps) {
  return (
    <Card className="border-0 ring-1 ring-yellow-300/50 dark:ring-yellow-700/30 bg-gradient-to-br from-yellow-50/60 to-amber-50/30 dark:from-yellow-950/20 dark:to-amber-950/10">
      <CardHeader className="pb-2 pt-4 px-4">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <span className="text-lg">🗺️</span>
          Twoje Odkrycia
          <Badge variant="secondary" className="ml-auto text-[10px]">
            {totalUnlocked}/{totalFacts}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4 space-y-3">
        {/* Latest fact card */}
        <div className={`rounded-xl border p-3 ${CATEGORY_COLORS[latestFact.category] ?? ""}`}>
          <div className="flex items-start gap-2.5">
            <span className="text-2xl leading-none shrink-0">{latestFact.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold leading-tight mb-1">{latestFact.title}</p>
              <p className="text-[11px] leading-relaxed opacity-90">{latestFact.fact}</p>
            </div>
          </div>
        </div>

        {/* Progress + link */}
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {Array.from({ length: Math.min(totalFacts, 10) }).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 w-1.5 rounded-full ${
                  i < Math.min(totalUnlocked, 10) ? "bg-amber-400" : "bg-muted"
                }`}
              />
            ))}
            {totalFacts > 10 && <span className="text-[10px] text-muted-foreground ml-1">+{totalFacts - 10}</span>}
          </div>
          <Link
            href="/discoveries"
            className="flex items-center gap-1 text-[11px] text-amber-700 dark:text-amber-400 font-medium hover:underline"
          >
            <Sparkles className="h-3 w-3" />
            Zobacz kolekcję
            <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
