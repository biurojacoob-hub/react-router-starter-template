import Link from "next/link"
import { BookOpen, Brain, Target, CheckCircle2, Lock, ChevronRight, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { TodayLearningState } from "@/src/lib/learning/todayState"
import { MissionButton } from "@/components/dashboard/mission-button"
import { FINN } from "@/src/lib/hero/finn"

interface TodayLearningWidgetProps {
  state: TodayLearningState
  nextLessonHref: string
  nextQuizHref: string
}

const PHASE_LABELS: Record<string, string> = {
  FOUNDATION: "Fundamenty",
  CORE:        "Rdzeń",
  ADVANCED:    "Zaawansowany",
  INTEGRATION: "Integracja",
}

// P2: Language of adventure, not school
const ACTIVITY_LABELS = {
  lesson:  { label: "Odkrycie dnia",       done: "Odkryte ✓",      locked: "Wkrótce",    cta: "Odkryj" },
  quiz:    { label: "Wyzwanie dnia",        done: "Zaliczone ✓",    locked: "Po odkryciu", cta: "Zmierz się" },
  mission: { label: "Misja terenowa",       done: "Wykonana ✓",     locked: "Czeka",      cta: "Ruszaj" },
}

export function TodayLearningWidget({ state, nextLessonHref, nextQuizHref }: TodayLearningWidgetProps) {
  const { currentDay, today, lessonDoneToday, quizDoneToday, missionDoneToday, dayProgressPercent } = state
  const allDone = lessonDoneToday && quizDoneToday && missionDoneToday
  const partialDone = !allDone && dayProgressPercent > 0

  return (
    <Card className="border-0 ring-1 ring-primary/20 bg-gradient-to-br from-primary/5 to-blue-50/50 dark:from-primary/10 dark:to-blue-950/30">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm text-muted-foreground font-medium flex items-center gap-2">
            Kroki do ukończenia
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="purple" className="text-[10px]">Dzień {currentDay}/30</Badge>
            <Badge variant="secondary" className="text-[10px]">{PHASE_LABELS[today.phase] ?? today.phase}</Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Odkrycie (Lesson) */}
        <ActivityRow
          icon={<BookOpen className="h-4 w-4" />}
          labels={ACTIVITY_LABELS.lesson}
          title={today.lesson.title}
          done={lessonDoneToday}
          href={nextLessonHref}
          estimatedMin={today.lesson.estimatedMinutes}
          locked={false}
        />

        {/* Wyzwanie (Quiz) */}
        <ActivityRow
          icon={<Brain className="h-4 w-4" />}
          labels={ACTIVITY_LABELS.quiz}
          title={today.quiz.title}
          done={quizDoneToday}
          href={nextQuizHref}
          estimatedMin={today.quiz.estimatedMinutes}
          locked={!lessonDoneToday}
        />

        {/* Misja terenowa (Mission) */}
        <MissionActivityRow
          title={today.mission.title}
          description={today.mission.description}
          realLifeTask={today.mission.realLifeTask}
          done={missionDoneToday}
          estimatedMin={today.mission.estimatedMinutes}
          activeMissionId={state.activeMissionId}
        />

        {/* Progress */}
        <div className="pt-2 border-t border-primary/10">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
            <span>Postęp przygody</span>
            <span className="font-semibold text-primary">{dayProgressPercent}%</span>
          </div>
          <Progress value={dayProgressPercent} className="h-2" indicatorClassName="bg-gradient-to-r from-primary to-blue-400" />

          {/* P6: Partial Success — positive framing */}
          {partialDone && (
            <div className="mt-2 flex items-start gap-2 rounded-xl bg-amber-50 dark:bg-amber-900/20 p-2.5">
              <span className="text-lg leading-none">{FINN.emoji}</span>
              <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                <strong>Świetny start!</strong> Jutro czeka na Ciebie kolejny krok.
              </p>
            </div>
          )}

          {allDone && (
            <p className="text-xs text-emerald-600 font-semibold mt-2 text-center">
              🎉 Przygoda dnia ukończona! Wróć jutro po Dzień {Math.min(currentDay + 1, 30)}.
            </p>
          )}

          {!allDone && today.isCapstoneDay && (
            <p className="text-xs text-amber-600 mt-2 text-center">
              🏆 Dzień Capstone — ukończ wszystkie kroki po specjalną nagrodę!
            </p>
          )}
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

interface ActivityLabels {
  label: string
  done: string
  locked: string
  cta: string
}

interface ActivityRowProps {
  icon: React.ReactNode
  labels: ActivityLabels
  title: string
  done: boolean
  href: string
  estimatedMin: number
  locked: boolean
}

function ActivityRow({ icon, labels, title, done, href, estimatedMin, locked }: ActivityRowProps) {
  const content = (
    <div className={`flex items-center gap-3 rounded-xl p-3 transition-colors ${
      done    ? "bg-emerald-50 dark:bg-emerald-900/20" :
      locked  ? "bg-muted/30 opacity-60" :
                "bg-background hover:bg-muted/50 cursor-pointer"
    }`}>
      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
        done   ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600" :
        locked ? "bg-muted text-muted-foreground" :
                 "bg-primary/10 text-primary"
      }`}>
        {done ? <CheckCircle2 className="h-4 w-4" /> : locked ? <Lock className="h-4 w-4" /> : icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] text-muted-foreground uppercase tracking-wide font-medium">{labels.label}</p>
        <p className="text-sm font-semibold truncate leading-tight">{title}</p>
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        {!done && !locked && (
          <span className="text-[10px] text-muted-foreground">{estimatedMin} min</span>
        )}
        {done ? (
          <Badge variant="success" className="text-[10px] h-4">{labels.done}</Badge>
        ) : locked ? (
          <Badge variant="secondary" className="text-[10px] h-4">{labels.locked}</Badge>
        ) : (
          <Badge variant="outline" className="text-[10px] h-4 text-primary border-primary/30">
            {labels.cta} <ChevronRight className="h-2.5 w-2.5 ml-0.5" />
          </Badge>
        )}
      </div>
    </div>
  )

  if (done || locked) return content
  return <Link href={href}>{content}</Link>
}

interface MissionActivityRowProps {
  title: string
  description: string
  realLifeTask: string
  done: boolean
  estimatedMin: number
  activeMissionId: string | null
}

function MissionActivityRow({ title, description, realLifeTask, done, estimatedMin, activeMissionId }: MissionActivityRowProps) {
  return (
    <div className={`rounded-xl p-3 ${done ? "bg-emerald-50 dark:bg-emerald-900/20" : "bg-background"}`}>
      <div className="flex items-center gap-3 mb-2">
        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
          done ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600" : "bg-violet-50 dark:bg-violet-900/20 text-violet-600"
        }`}>
          {done ? <CheckCircle2 className="h-4 w-4" /> : <Target className="h-4 w-4" />}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] text-muted-foreground uppercase tracking-wide font-medium">
            {ACTIVITY_LABELS.mission.label}
          </p>
          <p className="text-sm font-semibold truncate leading-tight">{title}</p>
        </div>
        {done ? (
          <Badge variant="success" className="text-[10px] h-4 shrink-0">{ACTIVITY_LABELS.mission.done}</Badge>
        ) : (
          <span className="text-[10px] text-muted-foreground shrink-0">{estimatedMin} min</span>
        )}
      </div>
      {!done && (
        <>
          <p className="text-xs text-muted-foreground mb-2 leading-relaxed">{realLifeTask}</p>
          <MissionButton title={title} description={description} isActive={activeMissionId !== null} />
        </>
      )}
    </div>
  )
}
