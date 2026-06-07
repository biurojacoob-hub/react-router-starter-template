import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getCourse } from "@/src/actions/learning/getCourse"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export const metadata: Metadata = { title: "Kurs" }

type Props = { params: Promise<{ courseId: string }> }

export default async function CourseDetailPage({ params }: Props) {
  const { courseId } = await params
  const course = await getCourse(courseId)

  if (!course) notFound()

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
      <div className="space-y-1">
        <Link href="/courses" className="text-sm text-muted-foreground hover:text-primary transition-colors">
          ← Wszystkie kursy
        </Link>
        <h1 className="text-2xl font-bold mt-2">{course.title}</h1>
        <p className="text-muted-foreground text-sm">{course.description}</p>
      </div>

      <Card>
        <CardContent className="pt-5 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{course.lessonCount} lekcji</span>
            <span className="font-medium">{course.completionPercent}%</span>
          </div>
          <Progress value={course.completionPercent} className="h-2" />
        </CardContent>
      </Card>

      <div className="space-y-2">
        {course.lessons.map((lesson, idx) => {
          const done = lesson.progress?.completed
          return (
            <Link key={lesson.id} href={`/courses/${course.id}/lessons/${lesson.id}`}>
              <Card className={cn(
                "cursor-pointer hover:border-primary/60 transition-colors",
                done && "border-green-300 dark:border-green-700"
              )}>
                <CardHeader className="py-4 px-5">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0",
                      done
                        ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                        : "bg-muted text-muted-foreground"
                    )}>
                      {done ? "✓" : idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-sm leading-snug">{lesson.title}</CardTitle>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {lesson.durationMinutes} min · {lesson.xpReward} XP
                        {lesson.progress?.score != null && ` · Quiz: ${lesson.progress.score}%`}
                      </p>
                    </div>
                    {lesson.quiz && (
                      <span className="text-xs bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded-full shrink-0">
                        Quiz
                      </span>
                    )}
                  </div>
                </CardHeader>
              </Card>
            </Link>
          )
        })}
      </div>

      {course.lessons.length > 0 && (
        <Button asChild className="w-full" size="lg">
          <Link href={`/courses/${course.id}/lessons/${
            course.lessons.find((l) => !l.progress?.completed)?.id ?? course.lessons[0].id
          }`}>
            {course.completedCount === 0 ? "Rozpocznij kurs" : "Kontynuuj"}
          </Link>
        </Button>
      )}
    </div>
  )
}
