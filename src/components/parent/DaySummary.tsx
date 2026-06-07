import { cn } from "@/lib/utils"
import { AvatarDisplay } from "@/src/components/avatars/AvatarDisplay"
import { XpBar } from "@/src/components/gamification/XpBar"

export type DaySummaryData = {
  childName: string
  avatarId: string
  xpEarned: number
  totalXp: number
  streak: number
  lessonsCompleted: string[]
  badgesEarned: { emoji: string; name: string }[]
  timeSpentMinutes: number
  nextDayRecommendation: string
}

interface DaySummaryProps {
  data: DaySummaryData
  className?: string
}

export function ParentDaySummary({ data, className }: DaySummaryProps) {
  return (
    <div className={cn("rounded-3xl border bg-card shadow-sm overflow-hidden", className)}>
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 px-6 py-5 border-b">
        <div className="flex items-center gap-4">
          <AvatarDisplay avatarId={data.avatarId} size="md" />
          <div>
            <h3 className="font-black text-lg">{data.childName} — podsumowanie dnia</h3>
            <p className="text-sm text-muted-foreground">
              Spędził {data.timeSpentMinutes} minut na nauce finansów
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 divide-x">
        {[
          { label: "XP zdobyte", value: `+${data.xpEarned}`, emoji: "⚡" },
          { label: "Seria dni", value: `${data.streak}`, emoji: "🔥" },
          { label: "Lekcje", value: `${data.lessonsCompleted.length}`, emoji: "📚" },
        ].map((s) => (
          <div key={s.label} className="px-4 py-4 text-center">
            <div className="text-2xl font-black">{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.emoji} {s.label}</div>
          </div>
        ))}
      </div>

      <div className="px-6 py-5 space-y-5">
        {/* XP Progress */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Postęp XP</p>
          <XpBar xp={data.totalXp} animate={false} size="sm" />
        </div>

        {/* Lessons completed */}
        {data.lessonsCompleted.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
              Ukończone lekcje
            </p>
            <ul className="space-y-1">
              {data.lessonsCompleted.map((lesson) => (
                <li key={lesson} className="flex items-center gap-2 text-sm">
                  <span className="text-green-500">✓</span>
                  {lesson}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Badges */}
        {data.badgesEarned.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
              Zdobyte odznaki
            </p>
            <div className="flex flex-wrap gap-2">
              {data.badgesEarned.map((b) => (
                <div
                  key={b.name}
                  className="flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 px-3 py-1.5 text-xs font-medium dark:bg-amber-950 dark:border-amber-800"
                >
                  <span>{b.emoji}</span>
                  <span>{b.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Next day recommendation */}
        <div className="rounded-2xl bg-primary/5 border border-primary/20 px-4 py-3">
          <p className="text-xs font-bold text-primary mb-1 uppercase tracking-wide">
            📅 Rekomendacja na jutro
          </p>
          <p className="text-sm leading-relaxed">{data.nextDayRecommendation}</p>
        </div>
      </div>
    </div>
  )
}
