"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { AGE_GROUPS } from "./types"
import type { AvatarCategory } from "@/src/components/avatars/avatarData"

interface WelcomeWizardProps {
  onComplete: (name: string, ageGroup: AvatarCategory) => void
}

export function WelcomeWizard({ onComplete }: WelcomeWizardProps) {
  const [subStep, setSubStep] = useState<"GREETING" | "NAME" | "AGE">("GREETING")
  const [name, setName] = useState("")
  const [selectedAge, setSelectedAge] = useState<AvatarCategory | null>(null)

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      {subStep === "GREETING" && (
        <div className="animate-fade-in space-y-6 max-w-sm">
          <div className="text-7xl">👋</div>
          <div>
            <h1 className="text-3xl font-black tracking-tight mb-2">
              Witaj w <span className="text-primary">Family Finance Academy!</span>
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              Tu nauczysz się, jak zarządzać pieniędzmi — przez zabawy, misje i wyzwania.
              Gotowy na swoją pierwszą lekcję?
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 text-sm">
            {[["🎯", "Lekcje"], ["🏅", "Odznaki"], ["⚡", "XP"]].map(([e, l]) => (
              <div key={l} className="rounded-2xl bg-muted p-3">
                <div className="text-2xl mb-1">{e}</div>
                <div className="font-medium">{l}</div>
              </div>
            ))}
          </div>
          <Button size="lg" className="w-full rounded-2xl text-base" onClick={() => setSubStep("NAME")}>
            Zaczynamy! 🚀
          </Button>
        </div>
      )}

      {subStep === "NAME" && (
        <div className="animate-fade-in space-y-6 max-w-sm w-full">
          <div className="text-6xl">😊</div>
          <div>
            <h2 className="text-2xl font-black mb-2">Jak masz na imię?</h2>
            <p className="text-sm text-muted-foreground">Twój AI Mentor będzie cię tak nazywać</p>
          </div>
          <Input
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            placeholder="Wpisz swoje imię..."
            className="text-center text-lg h-14 rounded-2xl"
            maxLength={20}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && name.trim().length >= 2 && setSubStep("AGE")}
            autoFocus
          />
          <Button
            size="lg"
            className="w-full rounded-2xl"
            disabled={name.trim().length < 2}
            onClick={() => setSubStep("AGE")}
          >
            To jest moje imię! →
          </Button>
        </div>
      )}

      {subStep === "AGE" && (
        <div className="animate-fade-in space-y-5 max-w-sm w-full">
          <div>
            <h2 className="text-2xl font-black mb-1">Cześć, {name}! 👋</h2>
            <p className="text-sm text-muted-foreground">Ile masz lat? Dopasujemy lekcje do Ciebie</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {AGE_GROUPS.map((group) => (
              <button
                key={group.id}
                type="button"
                onClick={() => setSelectedAge(group.id)}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-2xl border-2 p-4 text-left transition-all hover:border-primary",
                  selectedAge === group.id ? "border-primary bg-primary/5" : "border-border"
                )}
              >
                <span className="text-3xl">{group.emoji}</span>
                <div>
                  <div className="font-bold text-sm">{group.label}</div>
                  <div className="text-xs text-muted-foreground">{group.range}</div>
                </div>
              </button>
            ))}
          </div>
          <Button
            size="lg"
            className="w-full rounded-2xl"
            disabled={!selectedAge}
            onClick={() => selectedAge && onComplete(name.trim(), selectedAge)}
          >
            Dalej →
          </Button>
        </div>
      )}
    </div>
  )
}
