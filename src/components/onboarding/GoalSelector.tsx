"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { GOAL_OPTIONS } from "./types"

interface GoalSelectorProps {
  childName: string
  onComplete: (goalId: string) => void
}

export function GoalSelector({ childName, onComplete }: GoalSelectorProps) {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="flex flex-col items-center gap-6 px-4">
      <div className="text-center">
        <div className="text-5xl mb-3">🎯</div>
        <h2 className="text-2xl font-black mb-1">Co chcesz osiągnąć?</h2>
        <p className="text-sm text-muted-foreground max-w-xs">
          {childName}, wybierz swój główny cel finansowy. Możesz go zmienić w każdej chwili.
        </p>
      </div>

      <div className="w-full max-w-sm space-y-3">
        {GOAL_OPTIONS.map((goal) => (
          <button
            key={goal.id}
            type="button"
            onClick={() => setSelected(goal.id)}
            className={cn(
              "w-full flex items-center gap-4 rounded-2xl border-2 p-4 text-left transition-all hover:border-primary",
              selected === goal.id ? "border-primary bg-primary/5" : "border-border"
            )}
          >
            <span className="text-3xl flex-shrink-0">{goal.emoji}</span>
            <div>
              <p className="font-bold">{goal.label}</p>
              <p className="text-xs text-muted-foreground">{goal.description}</p>
            </div>
            {selected === goal.id && (
              <span className="ml-auto text-primary font-bold text-lg">✓</span>
            )}
          </button>
        ))}
      </div>

      <Button
        size="lg"
        className="w-full max-w-sm rounded-2xl"
        disabled={!selected}
        onClick={() => selected && onComplete(selected)}
      >
        To jest mój cel! →
      </Button>
    </div>
  )
}
