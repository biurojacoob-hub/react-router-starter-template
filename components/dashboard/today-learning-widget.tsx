import Link from "next/link"
import { BookOpen, Brain, Target, CheckCircle2, Lock, ChevronRight, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { TodayLearningState } from "@/src/lib/learning/todayState"
import { MissionButton } from "@/components/dashboard/mission-button"

interface TodayLearningWidgetProps {
  state: TodayLearningState
}

const PHASE_LABELS: Record<string, string> = {
  FOUNDATION: "Fundamenty",
  CORE: "Rdzeń",
  ADVANCED: "Zaawansowany",
  INTEGRATION: "Integracja",
}

export function TodayLearningWidget({ state }: TodayLearningWidgetProps) {
  const { currentDay, today, lessonDoneToday, quizDoneToday, missionDoneToday, dayProgressPercent } = state
  const allDone = lessonDoneToday && quizDoneToday && missionDoneToday

  return (
    <Card className="border-0 ring-1 ring-primary/20 bg-gradient-to-br from-primary/5 to-blue-50/50 dark:from-primary/10 dark:to-blue-950/30">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <span className="text-lg">📅</span>
            Dziś w Twojej nauce
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="purple" className="text-[10px]">
              Dzień {currentDay}/30
            </Badge>
            <Badge variant="secondary" className="text-[10px]">
              {PHASE_LABELS[today.phase] ?? today.phase}
            </Badge>
          </div>
        </div>
        <p className="text-sm font-semibold text-foreground mt-1">{today.title}</p>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Story hero block */}
        {!allDone && (today.engagementHook || today.lesson.hook) && (
          <div className="rounded-xl bg-white/70 dark:bg-white/5 border border-primary/10 p-4 mb-1">
            {today.engagementHook && (
              <p className="text-sm font-semibold leading-snug text-foreground mb-1">
                {today.engagementHook}
              </p>
            )}
            {today.lesson.hook && (
              <p className="text-xs text-muted-foreground italic leading-relaxed">
                &ldquo;{today.lesson.hook}&rdquo;
              </p>
            )}
          </div>
        )}

        {/* Lesson */}
        <ActivityRow
          icon={<BookOpen className="h-4 w-4" />}
          label="Lekcja dnia"
          title={today.lesson.title}
          done={lessonDoneToday}
          href="/courses"
          estimatedMin={today.lesson.estimatedMinutes}
          locked={false}
        />

        {/* Quiz */}
        <ActivityRow
          icon={<Brain className="h-4 w-4" />}
          label="Quiz dnia"
          title={today.quiz.title}
          done={quizDoneToday}
          href="/courses"
          estimatedMin={today.quiz.estimatedMinutes}
          locked={!lessonDoneToday}
        />

        {/* Mission */}
        <MissionActivityRow
          title={today.mission.title}
          description={today.mission.description}
          realLifeTask={today.mission.realLifeTask}
          done={missionDoneToday}
          estimatedMin={today.mission.estimatedMinutes}
          activeMissionId={state.activeMissionId}
        />

        {/* Day progress */}
        <div className="pt-2 border-t border-primary/10">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
            <span>Postęp dnia</span>
            <span className="font-semibold text-primary">{dayProgressPercent}%</span>
          </div>
          <Progress value={dayProgressPercent} className="h-2" indicatorClassName="bg-gradient-to-r from-primary to-blue-400" />
          {allDone && (
            <p className="text-xs text-emerald-600 font-semibold mt-2 text-center">
              🎉 Dzień ukończony! Wróć jutro po Dzień {Math.min(currentDay + 1, 30)}.
            </p>
          )}
          {!allDone && today.isCapstoneDay && (
            <p className="text-xs text-amber-600 mt-2 text-center">
              🏆 Dzień Capstone — ukończ wszystkie aktywności po specjalną nagrodę!
            </p>
          )}
        </div>

        {/* XP reward preview */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Zap className="h-3 w-3 text-yellow-500" />
          <span>Do zdobycia dziś: <strong className="text-foreground">+{today.xpReward} XP</strong></span>
        </div>
      </CardContent>
    </Card>
  )
}

interface ActivityRowProps {
  icon: React.ReactNode
  label: string
  title: string
  done: boolean
  href: string
  estimatedMin: number
  locked: boolean
}

function ActivityRow({ icon, label, title, done, href, estimatedMin, locked }: ActivityRowProps) {
  const content = (
    <div className={`flex items-center gap-3 rounded-xl p-3 transition-colors ${
      done ? "bg-emerald-50 dark:bg-emerald-900/20" :
      locked ? "bg-muted/30 opacity-60" :
      "bg-background hover:bg-muted/50 cursor-pointer"
    }`}>
      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
        done ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600" :
        locked ? "bg-muted text-muted-foreground" :
        "bg-primary/10 text-primary"
      }`}>
        {done ? <CheckCircle2 className="h-4 w-4" /> : locked ? <Lock className="h-4 w-4" /> : icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] text-muted-foreground uppercase tracking-wide font-medium">{label}</p>
        <p className="text-sm font-semibold truncate leading-tight">{title}</p>
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        {!done && !locked && (
          <span className="text-[10px] text-muted-foreground">{estimatedMin} min</span>
        )}
        {done ? (
          <Badge variant="success" className="text-[10px] h-4">Ukończone</Badge>
        ) : locked ? (
          <Badge variant="secondary" className="text-[10px] h-4">Zablokowane</Badge>
        ) : (
          <Badge variant="outline" className="text-[10px] h-4 text-primary border-primary/30">
            Start <ChevronRight className="h-2.5 w-2.5 ml-0.5" />
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
    <div className={`rounded-xl p-3 ${
      done ? "bg-emerald-50 dark:bg-emerald-900/20" : "bg-background"
    }`}>
      <div className="flex items-center gap-3 mb-2">
        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
          done ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600" : "bg-violet-50 dark:bg-violet-900/20 text-violet-600"
        }`}>
          {done ? <CheckCircle2 className="h-4 w-4" /> : <Target className="h-4 w-4" />}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] text-muted-foreground uppercase tracking-wide font-medium">Misja dnia</p>
          <p className="text-sm font-semibold truncate leading-tight">{title}</p>
        </div>
        {done ? (
          <Badge variant="success" className="text-[10px] h-4 shrink-0">Ukończone</Badge>
        ) : (
          <span className="text-[10px] text-muted-foreground shrink-0">{estimatedMin} min</span>
        )}
      </div>
      {!done && (
        <>
          <p className="text-xs text-muted-foreground mb-2 leading-relaxed">{realLifeTask}</p>
          <MissionButton
            title={title}
            description={description}
            isActive={activeMissionId !== null}
          />
        </>
      )}
    </div>
  )
}
