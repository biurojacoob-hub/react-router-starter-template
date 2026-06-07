"use client"

import { useState, useTransition } from "react"
import { submitQuiz } from "@/src/actions/learning/submitQuiz"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { QuizData } from "@/src/lib/learning/types"
import type { QuizResult } from "@/src/lib/learning/types"

type Props = {
  quiz: QuizData
  onComplete?: (result: QuizResult) => void
}

type Answers = Record<string, string | string[]>

export function QuizEngine({ quiz, onComplete }: Props) {
  const [answers, setAnswers] = useState<Answers>({})
  const [result, setResult] = useState<QuizResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const allAnswered = quiz.questions.every((q) => {
    const a = answers[q.id]
    return a !== undefined && (Array.isArray(a) ? a.length > 0 : a !== "")
  })

  function handleSingle(questionId: string, value: string) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  function handleMulti(questionId: string, value: string, checked: boolean) {
    setAnswers((prev) => {
      const current = (prev[questionId] as string[] | undefined) ?? []
      const next = checked ? [...current, value] : current.filter((v) => v !== value)
      return { ...prev, [questionId]: next }
    })
  }

  function handleSubmit() {
    setError(null)
    startTransition(async () => {
      try {
        const payload = quiz.questions.map((q) => ({
          questionId: q.id,
          answer: answers[q.id] ?? "",
        }))
        const res = await submitQuiz(quiz.id, payload)
        setResult(res)
        onComplete?.(res)
      } catch (e) {
        setError(e instanceof Error ? e.message : "Błąd podczas wysyłania quizu")
      }
    })
  }

  if (result) {
    return (
      <Card className="border-2 border-primary/30">
        <CardContent className="pt-6 space-y-4 text-center">
          <div className="text-5xl">{result.isPerfect ? "🏆" : result.passed ? "🎉" : "📖"}</div>
          <h3 className="text-xl font-bold">
            {result.isPerfect ? "Idealnie!" : result.passed ? "Zaliczono!" : "Spróbuj ponownie"}
          </h3>
          <p className="text-3xl font-bold text-primary">{result.score}%</p>
          <p className="text-muted-foreground text-sm">
            {result.correctCount} z {result.totalCount} poprawnych odpowiedzi
          </p>
          {result.xpEarned > 0 && (
            <div className="inline-flex items-center gap-1.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 px-3 py-1.5 rounded-full text-sm font-semibold">
              ⚡ +{result.xpEarned} XP
            </div>
          )}
          {result.levelUp && (
            <div className="text-primary font-bold animate-pulse">
              🆙 Nowy poziom: {result.newLevel}!
            </div>
          )}
          {result.newBadges.length > 0 && (
            <div className="space-y-1">
              <p className="text-sm font-semibold">Nowe odznaki!</p>
              <div className="flex flex-wrap justify-center gap-2">
                {result.newBadges.map((code) => (
                  <span key={code} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                    🏅 {code}
                  </span>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {quiz.questions.map((q, idx) => {
        const isMulti = q.type === "MULTI_SELECT"
        const currentAnswer = answers[q.id]

        return (
          <Card key={q.id}>
            <CardContent className="pt-5 space-y-3">
              <p className="font-medium text-sm text-muted-foreground">Pytanie {idx + 1}</p>
              <p className="font-semibold leading-snug">{q.question}</p>
              <div className="space-y-2">
                {q.options.map((option) => {
                  const selected = isMulti
                    ? ((currentAnswer as string[] | undefined) ?? []).includes(option)
                    : currentAnswer === option
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        if (isMulti) handleMulti(q.id, option, !selected)
                        else handleSingle(q.id, option)
                      }}
                      className={cn(
                        "w-full text-left px-4 py-3 rounded-xl border text-sm transition-colors",
                        selected
                          ? "border-primary bg-primary/10 text-primary font-medium"
                          : "border-border hover:bg-muted/60"
                      )}
                    >
                      {option}
                    </button>
                  )
                })}
              </div>
              {q.explanation && currentAnswer && (
                <p className="text-xs text-muted-foreground italic">{q.explanation}</p>
              )}
            </CardContent>
          </Card>
        )
      })}

      {error && <p className="text-destructive text-sm text-center">{error}</p>}

      <Button
        onClick={handleSubmit}
        disabled={!allAnswered || isPending}
        className="w-full"
        size="lg"
      >
        {isPending ? "Sprawdzanie..." : "Zatwierdź odpowiedzi"}
      </Button>
    </div>
  )
}
