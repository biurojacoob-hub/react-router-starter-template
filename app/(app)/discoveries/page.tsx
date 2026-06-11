import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { Lock } from "lucide-react"
import { auth } from "@/src/auth"
import { prisma } from "@/src/lib/db"
import { MONEY_FACTS, getUnlockedFacts } from "@/src/lib/discoveries/facts"

export const metadata: Metadata = { title: "Moje Odkrycia" }

const CATEGORY_COLORS: Record<string, string> = {
  historia:  "from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/20 border-amber-200/60 dark:border-amber-800/40",
  świat:     "from-sky-50 to-blue-50 dark:from-sky-950/30 dark:to-blue-950/20 border-sky-200/60 dark:border-sky-800/40",
  tajemnica: "from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/20 border-violet-200/60 dark:border-violet-800/40",
  nauka:     "from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/20 border-emerald-200/60 dark:border-emerald-800/40",
}

const CATEGORY_BADGE: Record<string, string> = {
  historia:  "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300",
  świat:     "bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300",
  tajemnica: "bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300",
  nauka:     "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300",
}

export default async function DiscoveriesPage() {
  const session = await auth()
  if (!session?.user) redirect("/sign-in")

  const child = await prisma.childProfile.findFirst({
    where: { userId: session.user.id, deletedAt: null },
    select: { createdAt: true },
  })
  if (!child) redirect("/onboarding")

  const rawDay = Math.floor((Date.now() - child.createdAt.getTime()) / (1000 * 60 * 60 * 24)) + 1
  const currentDay = Math.max(1, Math.min(30, rawDay))

  const unlockedIds = new Set(getUnlockedFacts(currentDay).map((f) => f.id))

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-extrabold">🗺️ Moje Odkrycia</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Skarby wiedzy zdobyte podczas Twojej przygody ·{" "}
          <span className="font-semibold text-foreground">{unlockedIds.size}/{MONEY_FACTS.length} odkrytych</span>
        </p>
      </div>

      {/* Progress bar */}
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 transition-all duration-500"
          style={{ width: `${Math.round((unlockedIds.size / MONEY_FACTS.length) * 100)}%` }}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {MONEY_FACTS.map((fact) => {
          const unlocked = unlockedIds.has(fact.id)
          const gradientClass = CATEGORY_COLORS[fact.category] ?? ""
          const badgeClass = CATEGORY_BADGE[fact.category] ?? ""

          return (
            <div
              key={fact.id}
              className={`relative rounded-2xl border bg-gradient-to-br p-4 transition-all ${
                unlocked
                  ? `${gradientClass} shadow-sm`
                  : "border-border/40 bg-muted/20 opacity-50"
              }`}
            >
              {!unlocked && (
                <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-background/60 backdrop-blur-[2px]">
                  <div className="flex flex-col items-center gap-1">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                    <p className="text-[11px] text-muted-foreground font-medium">
                      Odblokuj w Dniu {fact.unlocksOnDay}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <span className="text-3xl leading-none shrink-0">{fact.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-bold leading-tight">{fact.title}</p>
                    <span className={`text-[9px] font-semibold uppercase px-1.5 py-0.5 rounded-full ${badgeClass}`}>
                      {fact.category}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{fact.fact}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
