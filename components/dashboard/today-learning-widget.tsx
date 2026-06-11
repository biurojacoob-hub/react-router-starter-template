import Link from "next/link"
import { BookOpen, Brain, Target, CheckCircle2, Lock, ChevronRight, Zap, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import type { TodayLearningState } from "@/src/lib/learning/todayState"
import type { DailyAdventureState, AdventureAction } from "@/src/lib/learning/dailyAdventure"
import { MissionButton } from "@/components/dashboard/mission-button"
import { FINN } from "@/src/lib/hero/finn"

interface TodayLearningWidgetProps {
  state: TodayLearningState
  adventure: DailyAdventureState
  activeMissionId: string | null
}

const ACTION_META: Record<string, { icon: React.ReactNode; label: string; doneLabel: string; lockedLabel: string }> = {
  lesson:  { icon: <BookOpen className="h-4 w-4" />,  label: "Odkrycie dnia",  doneLabel: "Odkryte ✓",    lockedLabel: "Wkrótce" },
  quiz:    { icon: <Brain className="h-4 w-4" />,     label: "Wyzwanie dnia",  doneLabel: "Zaliczone ✓",  lockedLabel: "Po odkryciu" },
  mission: { icon: <Target className="h-4 w-4" />,    label: "Misja terenowa", doneLabel: "Wykonana ✓",   lockedLabel: "Czeka" },
}

const ACTION_CTA: Record<string, string> = {
  lesson:  "Odkryj teraz",
  quiz:    "Zmierz się",
  mission: "Ruszaj na misję",
}

export function TodayLearningWidget({ state, adventure, activeMissionId }: TodayLearningWidgetProps) {
  const { currentDay, dayProgressPercent, today } = state
  const { heroAction, secondaryActions, dayTheme, emotionTone, finnOpening, finnHeroComplete, finnDayComplete, allDone, heroActionDone } = adventure

  return (
    <Card className="border-0 ring-1 ring-primary/20 bg-gradient-to-br from-primary/5 to-blue-50/50 dark:from-primary/10 dark:to-blue-950/30 overflow-hidden">
      <CardHeader className="pb-3 pt-4">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <span className="text-base">{FINN.emoji}</span>
            Przygoda dnia
          </CardTitle>
          <div className="flex items-center gap-2 flex-wrap justify-end">
            <Badge variant="purple" className="text-[10px]">Dzień {currentDay}/30</Badge>
            <Badge variant="secondary" className="text-[10px]">{dayTheme}</Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Finn opening — only before day starts */}
        {!heroActionDone && !allDone && (
          <div className="flex items-start gap-2 rounded-xl bg-background/70 border border-border/50 px-3 py-2.5">
            <span className="text-base leading-none shrink-0 mt-0.5">{FINN.emoji}</span>
            <p className="text-xs text-muted-foreground leading-relaxed italic">
              &ldquo;{finnOpening}&rdquo;
            </p>
          </div>
        )}

        {/* Hero action after complete */}
        {heroActionDone && !allDone && (
          <div className="flex items-start gap-2 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200/50 dark:border-emerald-800/30 px-3 py-2.5">
            <span className="text-base leading-none shrink-0 mt-0.5">{FINN.emoji}</span>
            <p className="text-xs text-emerald-700 dark:text-emerald-300 leading-relaxed font-medium">
              {finnHeroComplete}
            </p>
          </div>
        )}

        {allDone && (
          <div className="flex items-start gap-2 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200/50 dark:border-emerald-800/30 px-3 py-2.5">
            <span className="text-base leading-none shrink-0 mt-0.5">{FINN.emoji}</span>
            <p className="text-xs text-emerald-700 dark:text-emerald-300 leading-relaxed font-medium">
              {finnDayComplete}
            </p>
          </div>
        )}

        {/* HERO ACTION — one primary action */}
        {!allDone && (
          <HeroActionBlock
            action={heroAction}
            activeMissionId={activeMissionId}
            today={today}
          />
        )}

        {/* SECONDARY ACTIONS — small chips */}
        {secondaryActions.length > 0 && (
          <div className="space-y-1.5">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold px-0.5">
              {allDone ? "Wszystkie ukończone" : "Pozostałe"}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {secondaryActions.map((action) => (
                <SecondaryChip key={action.type} action={action} />
              ))}
            </div>
          </div>
        )}

        {/* Progress */}
        <div className="pt-1 border-t border-primary/10">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
            <span>Postęp przygody</span>
            <span className="font-semibold text-primary">{dayProgressPercent}%</span>
          </div>
          <Progress value={dayProgressPercent} className="h-2" indicatorClassName="bg-gradient-to-r from-primary to-blue-400" />
        </div>

        {/* XP preview */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Zap className="h-3 w-3 text-yellow-500" />
          <span>Do zdobycia dziś: <strong className="text-foreground">+{today.xpReward} XP</strong></span>
        </div>
      </CardContent>
    </Card>
  )
}

// ─── Hero Action Block ────────────────────────────────────────────────

interface HeroActionBlockProps {
  action: AdventureAction
  activeMissionId: string | null
  today: TodayLearningState["today"]
}

function HeroActionBlock({ action, activeMissionId, today }: HeroActionBlockProps) {
  const meta = ACTION_META[action.type]!
  const cta = ACTION_CTA[action.type]!

  if (action.done) {
    return (
      <div className="flex items-center gap-3 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200/50 dark:border-emerald-800/30 p-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600">
          <CheckCircle2 className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] uppercase tracking-wider text-emerald-600 font-semibold">{meta.label}</p>
          <p className="text-sm font-bold truncate">{action.title}</p>
        </div>
        <Badge variant="success" className="text-[10px] shrink-0">{meta.doneLabel}</Badge>
      </div>
    )
  }

  if (action.locked) {
    return (
      <div className="flex items-center gap-3 rounded-2xl bg-muted/40 border border-border/50 p-4 opacity-60">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
          <Lock className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">{meta.label}</p>
          <p className="text-sm font-bold truncate">{action.title}</p>
        </div>
        <Badge variant="secondary" className="text-[10px] shrink-0">{meta.lockedLabel}</Badge>
      </div>
    )
  }

  // Mission hero — inline expand with MissionButton
  if (action.type === "mission") {
    return (
      <div className="rounded-2xl bg-gradient-to-br from-violet-500/10 to-purple-500/5 border border-violet-300/40 dark:border-violet-700/30 p-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 dark:bg-violet-900/40 text-violet-600">
            <Target className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] uppercase tracking-wider text-violet-600 dark:text-violet-400 font-semibold">{meta.label} · Główna przygoda</p>
            <p className="text-sm font-bold truncate">{action.title}</p>
          </div>
          <span className="text-[10px] text-muted-foreground shrink-0">{action.estimatedMin} min</span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">{today.mission.realLifeTask}</p>
        <MissionButton
          title={today.mission.title}
          description={today.mission.description}
          isActive={activeMissionId !== null}
        />
      </div>
    )
  }

  // Lesson or Quiz hero — big link button
  return (
    <Link href={action.href} className="block">
      <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/15 to-blue-500/10 border border-primary/30 p-4 transition-all hover:from-primary/20 hover:border-primary/50 hover:shadow-md cursor-pointer">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
            {meta.icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] uppercase tracking-wider text-primary/80 font-semibold">{meta.label} · Główna przygoda</p>
            <p className="text-sm font-bold truncate">{action.title}</p>
          </div>
          <span className="text-[10px] text-muted-foreground shrink-0">{action.estimatedMin} min</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{today.lesson.hook ? `"${today.lesson.hook.slice(0, 60)}…"` : ""}</span>
          <span className="flex items-center gap-1 text-xs font-bold text-primary group-hover:translate-x-0.5 transition-transform">
            {cta} <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  )
}

// ─── Secondary Chip ───────────────────────────────────────────────────

function SecondaryChip({ action }: { action: AdventureAction }) {
  const meta = ACTION_META[action.type]!

  const chipContent = (
    <div className={`flex items-center gap-2 rounded-xl border px-3 py-2 transition-colors ${
      action.done
        ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200/50 dark:border-emerald-800/30"
        : action.locked
        ? "bg-muted/30 border-border/40 opacity-50"
        : "bg-background border-border/60 hover:bg-muted/50 cursor-pointer"
    }`}>
      <div className={`shrink-0 ${
        action.done ? "text-emerald-500" : action.locked ? "text-muted-foreground" : "text-primary"
      }`}>
        {action.done ? <CheckCircle2 className="h-3.5 w-3.5" /> : action.locked ? <Lock className="h-3.5 w-3.5" /> : meta.icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] text-muted-foreground font-medium">{meta.label}</p>
        <p className="text-xs font-semibold truncate leading-tight">
          {action.done ? meta.doneLabel : action.locked ? meta.lockedLabel : action.title}
        </p>
      </div>
    </div>
  )

  if (!action.done && !action.locked) {
    return <Link href={action.href}>{chipContent}</Link>
  }
  return chipContent
}
