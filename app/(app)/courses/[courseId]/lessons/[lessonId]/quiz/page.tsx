import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getLesson } from "@/src/actions/learning/getLesson"
import { QuizEngine } from "@/src/components/learning/QuizEngine"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = { title: "Quiz" }

type Props = { params: Promise<{ courseId: string; lessonId: string }> }

export default async function QuizPage({ params }: Props) {
  const { courseId, lessonId } = await params
  const lesson = await getLesson(lessonId)

  if (!lesson || !lesson.quiz) notFound()

  return (
    <div className="max-w-xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
        <Link href={`/courses/${courseId}/lessons/${lessonId}`} className="hover:text-primary transition-colors">
          ← {lesson.title}
        </Link>
      </div>

      <div>
        <h1 className="text-2xl font-bold">Quiz</h1>
        <p className="text-muted-foreground text-sm mt-1">
          {lesson.quiz.questions.length} pytań · próg zaliczenia {lesson.quiz.passingScore}%
        </p>
      </div>

      <QuizEngine quiz={lesson.quiz} />

      <Button variant="outline" asChild className="w-full">
        <Link href={`/courses/${courseId}/lessons/${lessonId}`}>Powrót do lekcji</Link>
      </Button>
    </div>
  )
}
