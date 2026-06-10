import { Sparkles, ChevronRight, Trophy } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { TomorrowPreview } from "@/src/lib/learning/tomorrowPreview"

interface TomorrowHookCardProps {
  preview: TomorrowPreview
}

export function TomorrowHookCard({ preview }: TomorrowHookCardProps) {
  const isHigh = preview.curiosityScore >= 4
  return (
    <Card className={`border-0 overflow-hidden transition-all duration-300 ${
      isHigh
        ? "ring-2 ring-violet-400 dark:ring-violet-500 shadow-lg shadow-violet-200/50 dark:shadow-violet-900/30 bg-gradient-to-br from-violet-100/90 to-indigo-100/70 dark:from-violet-900/40 dark:to-indigo-900/30"
        : "ring-1 ring-violet-200 dark:ring-violet-800 bg-gradient-to-br from-violet-50/80 to-indigo-50/60 dark:from-violet-950/30 dark:to-indigo-950/20"
    }`}>
      <CardContent className="p-5 relative">
        {/* Background decoration */}
        <div className="absolute right-0 top-0 w-24 h-24 rounded-bl-full bg-violet-100/50 dark:bg-violet-900/20 -z-0" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className={`h-4 w-4 ${isHigh ? "text-violet-600 animate-pulse" : "text-violet-500"}`} />
            <span className="text-xs font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-wide">
              Jutro odkryjesz
            </span>
            <div className="flex items-center gap-1 ml-auto">
              {Array.from({ length: preview.curiosityScore }).map((_, i) => (
                <span key={i} className="h-1.5 w-1.5 rounded-full bg-violet-400 dark:bg-violet-500" />
              ))}
              {Array.from({ length: 5 - preview.curiosityScore }).map((_, i) => (
                <span key={i} className="h-1.5 w-1.5 rounded-full bg-violet-200 dark:bg-violet-800" />
              ))}
            </div>
            <Badge variant="purple" className="text-[10px]">
              Dzień {preview.day}/30
            </Badge>
          </div>

          <h3 className="font-bold text-base leading-snug mb-1 text-foreground">
            {preview.title}
          </h3>

          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            {preview.hook}
          </p>

          {preview.lessonHook && (
            <div className="rounded-lg bg-white/60 dark:bg-white/5 border border-violet-100 dark:border-violet-900/40 p-3 mb-3">
              <p className="text-xs text-muted-foreground italic leading-relaxed">
                &ldquo;{preview.lessonHook}&rdquo;
              </p>
            </div>
          )}

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="text-amber-500">⚡</span>
              <strong className="text-foreground">+{preview.xpReward} XP</strong> do zdobycia
            </span>
            {preview.isCapstoneDay && (
              <span className="flex items-center gap-1 text-amber-600 font-semibold">
                <Trophy className="h-3 w-3" /> Dzień Capstone!
              </span>
            )}
            <span className="flex items-center gap-1 ml-auto text-violet-600 font-medium">
              Wróć jutro <ChevronRight className="h-3 w-3" />
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
