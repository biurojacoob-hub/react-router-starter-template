import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getLesson } from "@/src/actions/learning/getLesson"
import { ContentBlockRenderer } from "@/src/components/learning/ContentBlockRenderer"
import { LessonCompletionButton } from "@/src/components/learning/LessonCompletionButton"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = { title: "Lekcja" }

type Props = { params: Promise<{ courseId: string; lessonId: string }> }

export default async function LessonPage({ params }: Props) {
  const { courseId, lessonId } = await params
  const lesson = await getLesson(lessonId)

  if (!lesson) notFound()

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
        <Link href="/courses" className="hover:text-primary transition-colors">Kursy</Link>
        <span>/</span>
        <Link href={`/courses/${courseId}`} className="hover:text-primary transition-colors">
          {lesson.courseTitle}
        </Link>
        <span>/</span>
        <span className="text-foreground">{lesson.title}</span>
      </div>

      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">{lesson.title}</h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>⏱ {lesson.durationMinutes} min</span>
          <span>⚡ {lesson.xpReward} XP</span>
          {lesson.progress?.completed && (
            <span className="text-green-600 dark:text-green-400 font-medium">✓ Ukończono</span>
          )}
        </div>
        {lesson.description && (
          <p className="text-muted-foreground text-sm pt-1">{lesson.description}</p>
        )}
      </div>

      {/* Content blocks */}
      {lesson.contentBlocks.length > 0 ? (
        <div className="space-y-4">
          {lesson.contentBlocks.map((block) => (
            <ContentBlockRenderer key={block.id} block={block} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground text-sm py-10">
            Treść tej lekcji jest w przygotowaniu.
          </CardContent>
        </Card>
      )}

      {/* Quiz link */}
      {lesson.quiz && (
        <Card className="border-purple-300 dark:border-purple-700 bg-purple-50 dark:bg-purple-950/30">
          <CardContent className="pt-5 pb-5 flex items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-sm">Quiz do lekcji</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {lesson.quiz.questions.length} pytań · próg zaliczenia {lesson.quiz.passingScore}%
                {lesson.progress?.score != null && ` · Wynik: ${lesson.progress.score}%`}
              </p>
            </div>
            <Button asChild size="sm">
              <Link href={`/courses/${courseId}/lessons/${lessonId}/quiz`}>
                {lesson.progress?.score != null ? "Powtórz quiz" : "Rozpocznij quiz"}
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Complete lesson */}
      <LessonCompletionButton
        lessonId={lessonId}
        alreadyCompleted={lesson.progress?.completed ?? false}
      />

      {/* Prev / Next navigation */}
      <div className="flex items-center justify-between pt-2">
        {lesson.prevLessonId ? (
          <Button variant="outline" asChild size="sm">
            <Link href={`/courses/${courseId}/lessons/${lesson.prevLessonId}`}>← Poprzednia</Link>
          </Button>
        ) : (
          <div />
        )}
        {lesson.nextLessonId ? (
          <Button asChild size="sm">
            <Link href={`/courses/${courseId}/lessons/${lesson.nextLessonId}`}>Następna →</Link>
          </Button>
        ) : (
          <Button variant="outline" asChild size="sm">
            <Link href={`/courses/${courseId}`}>Powrót do kursu</Link>
          </Button>
        )}
      </div>
    </div>
  )
}
