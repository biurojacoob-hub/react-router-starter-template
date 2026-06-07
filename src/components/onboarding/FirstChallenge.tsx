"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { XpToast } from "@/src/components/gamification/CelebrationModal"
import type { AvatarCategory } from "@/src/components/avatars/avatarData"

// ─────────────────────────────────────────────────────────────
// FIRST CHALLENGE — a quick mini-quiz tailored to age group
// ─────────────────────────────────────────────────────────────

type QuizItem = {
  question: string
  emoji: string
  options: string[]
  correct: number
  explanation: string
}

const FIRST_QUIZ: Record<AvatarCategory, QuizItem> = {
  EXPLORER: {
    question: "Co to są pieniądze?",
    emoji: "🪙",
    options: [
      "Zabawki do zbierania",
      "Umowa — coś, co wszyscy akceptują przy wymianie",
      "Papier do rysowania",
      "Tylko złote monety",
    ],
    correct: 1,
    explanation: "Pieniądze to umowa społeczna — wszyscy zgadzamy się, że mają wartość, żeby łatwiej wymieniać rzeczy!",
  },
  LEARNER: {
    question: "Co to jest budżet?",
    emoji: "📊",
    options: [
      "Skrzynka na pieniądze",
      "Plan jak podzielić pieniądze, które masz",
      "Specjalny rodzaj konta bankowego",
      "Oszczędności na wakacje",
    ],
    correct: 1,
    explanation: "Budżet to plan! Decydujesz z góry, na co wydasz swoje pieniądze — to supermoc w zarządzaniu finansami.",
  },
  ACHIEVER: {
    question: "Czym różni się dochód aktywny od pasywnego?",
    emoji: "💼",
    options: [
      "Aktywny to więcej, pasywny to mniej",
      "Aktywny zarabiasz swoim czasem, pasywny — bez ciągłej pracy",
      "Aktywny to gotówka, pasywny to karta",
      "Nie ma różnicy",
    ],
    correct: 1,
    explanation: "Dochód aktywny = płacą ci za twój czas (praca). Pasywny = zarabiasz bez ciągłej pracy (np. sprzedaż czegoś, co stworzyłeś raz).",
  },
  MASTER: {
    question: "Co oznacza 'majątek netto' (net worth)?",
    emoji: "📈",
    options: [
      "Twoja miesięczna pensja",
      "Suma wszystkich aktywów minus wszystkie zobowiązania",
      "Oszczędności na koncie bankowym",
      "Wartość domu, w którym mieszkasz",
    ],
    correct: 1,
    explanation: "Majątek netto = co posiadasz (aktywa) minus co jesteś winien (pasywa/zobowiązania). To najważniejszy wskaźnik finansowy!",
  },
}

interface FirstChallengeProps {
  ageGroup: AvatarCategory
  childName: string
  onComplete: (xpEarned: number) => void
}

export function FirstChallenge({ ageGroup, childName, onComplete }: FirstChallengeProps) {
  const quiz = FIRST_QUIZ[ageGroup]
  const [selected, setSelected] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [showXp, setShowXp] = useState(false)

  const isCorrect = selected === quiz.correct
  const xpEarned = isCorrect ? 30 : 15

  function handleAnswer(idx: number) {
    if (answered) return
    setSelected(idx)
    setAnswered(true)
  }

  function handleContinue() {
    setShowXp(true)
    setTimeout(() => onComplete(xpEarned), 1500)
  }

  return (
    <div className="flex flex-col items-center gap-6 px-4">
      <div className="text-center">
        <div className="text-5xl mb-3">{quiz.emoji}</div>
        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
          Pierwsze wyzwanie, {childName}!
        </p>
        <h2 className="text-xl font-black leading-tight max-w-xs">{quiz.question}</h2>
      </div>

      <div className="w-full max-w-sm space-y-3">
        {quiz.options.map((opt, idx) => (
          <button
            key={idx}
            type="button"
            disabled={answered}
            onClick={() => handleAnswer(idx)}
            className={cn(
              "w-full rounded-2xl border-2 p-4 text-left text-sm font-medium transition-all",
              !answered && "hover:border-primary cursor-pointer",
              answered && idx === quiz.correct && "border-green-500 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
              answered && idx === selected && idx !== quiz.correct && "border-red-400 bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
              !answered && "border-border",
              answered && idx !== selected && idx !== quiz.correct && "border-border opacity-50"
            )}
          >
            <span className="mr-2">{["A", "B", "C", "D"][idx]}.</span>
            {opt}
            {answered && idx === quiz.correct && " ✓"}
            {answered && idx === selected && idx !== quiz.correct && " ✗"}
          </button>
        ))}
      </div>

      {answered && (
        <div
          className={cn(
            "w-full max-w-sm rounded-2xl p-4 text-sm",
            isCorrect ? "bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200" : "bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-200"
          )}
        >
          <p className="font-bold mb-1">{isCorrect ? "🎉 Świetnie!" : "💡 Dobra próba!"}</p>
          <p>{quiz.explanation}</p>
          <p className="mt-2 font-bold">+{xpEarned} XP zdobyte!</p>
        </div>
      )}

      {answered && (
        <Button size="lg" className="w-full max-w-sm rounded-2xl" onClick={handleContinue}>
          Dalej do nagrody! →
        </Button>
      )}

      <XpToast xp={xpEarned} visible={showXp} />
    </div>
  )
}
