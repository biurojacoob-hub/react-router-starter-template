import Link from "next/link"
import { ArrowRight, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { TodayLearningState } from "@/src/lib/learning/todayState"
import type { HeroTitle } from "@/src/lib/hero/titles"
import { FINN } from "@/src/lib/hero/finn"

interface DailyHeroCardProps {
  state: TodayLearningState
  nextActionHref: string
  heroTitle: HeroTitle
  streakDays: number
  firstName: string
}

export function DailyHeroCard({ state, nextActionHref, heroTitle, streakDays, firstName: _firstName }: DailyHeroCardProps) {
  const { today, currentDay, lessonDoneToday, quizDoneToday, missionDoneToday, dayProgressPercent } = state
  const allDone = lessonDoneToday && quizDoneToday && missionDoneToday
  const nothingDone = dayProgressPercent === 0

  // What's next label
  const nextLabel = !lessonDoneToday
    ? "Rozpocznij odkrycie dnia →"
    : !quizDoneToday
    ? "Zmierz się z wyzwaniem →"
    : !missionDoneToday
    ? "Ruszaj na misję terenową →"
    : "Dzień ukończony! 🎉"

  if (allDone) return null // TomorrowHookCard handles this state

  return (
    <div className="relative overflow-hidden rounded-3xl gradient-brand text-white p-6 md:p-8 shadow-xl shadow-sky-500/20">
      {/* Background glows */}
      <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 translate-x-20 -translate-y-10 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-10 h-32 w-32 translate-y-10 rounded-full bg-white/10 blur-2xl" />

      <div className="relative">
        {/* Top row: hero status */}
        <div className="flex items-center gap-2 mb-5 flex-wrap">
          <Badge className="bg-white/20 text-white border-0 gap-1.5 py-1 px-3 text-xs">
            {heroTitle.emoji} {heroTitle.title}
          </Badge>
          <Badge className="bg-white/20 text-white border-0 gap-1.5 py-1 px-3 text-xs">
            Dzień {currentDay}/30
          </Badge>
          {streakDays > 0 && (
            <Badge className="bg-white/20 text-white border-0 gap-1.5 py-1 px-3 text-xs">
              <Flame className="h-3 w-3 text-amber-300" /> {streakDays} dni
            </Badge>
          )}
        </div>

        {/* Finn intro */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">{FINN.emoji}</span>
          <span className="text-white/80 text-sm font-medium">{FINN.name} mówi:</span>
        </div>

        {/* Story hook — THE main text */}
        <h2 className="text-xl md:text-2xl font-extrabold leading-snug mb-2">
          {today.engagementHook || today.title}
        </h2>

        {nothingDone && today.lesson.hook && (
          <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-lg italic">
            &ldquo;{today.lesson.hook}&rdquo;
          </p>
        )}

        {!nothingDone && dayProgressPercent > 0 && (
          <p className="text-white/80 text-sm mb-6">
            ✓ {dayProgressPercent === 33 ? "1" : dayProgressPercent === 67 ? "2" : "1"} z 3 kroków ukończone — świetny start!
          </p>
        )}

        {/* ONE BIG BUTTON */}
        <Button
          asChild
          size="lg"
          className="bg-white text-primary hover:bg-white/90 font-bold text-base h-13 px-8 rounded-2xl shadow-lg shadow-black/10 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Link href={nextActionHref}>
            {nextLabel} <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>

        {/* XP reward micro */}
        <p className="text-white/60 text-xs mt-3">
          ⚡ Do zdobycia dziś: +{today.xpReward} XP
        </p>
      </div>
    </div>
  )
}
