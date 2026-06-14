"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { WelcomeWizard } from "./WelcomeWizard"
import { AvatarPicker } from "./AvatarPicker"
import { GoalSelector } from "./GoalSelector"
import { FirstChallenge } from "./FirstChallenge"
import { FirstReward } from "./FirstReward"
import { MentorIntro } from "./MentorIntro"
import { type OnboardingState, type OnboardingStep } from "./types"
import { saveChildOnboarding } from "@/src/actions/child/saveOnboarding"

const STEPS: OnboardingStep[] = [
  "WELCOME",
  "AVATAR",
  "GOAL",
  "FIRST_CHALLENGE",
  "FIRST_REWARD",
  "MENTOR_INTRO",
]

const STEP_LABELS: Record<OnboardingStep, string> = {
  WELCOME:         "Witaj",
  AVATAR:          "Awatar",
  GOAL:            "Cel",
  FIRST_CHALLENGE: "Wyzwanie",
  FIRST_REWARD:    "Nagroda",
  MENTOR_INTRO:    "Mentor",
  DONE:            "Gotowe",
}

function StepIndicator({ currentStep }: { currentStep: OnboardingStep }) {
  const idx = STEPS.indexOf(currentStep)
  return (
    <div className="flex items-center justify-center gap-2 py-4">
      {STEPS.map((step, i) => (
        <div
          key={step}
          className={`flex items-center gap-1 text-xs font-medium transition-all ${
            i < idx ? "text-primary" : i === idx ? "text-foreground font-bold" : "text-muted-foreground"
          }`}
        >
          <div
            className={`h-2.5 w-2.5 rounded-full transition-all ${
              i < idx ? "bg-primary" : i === idx ? "bg-primary scale-125" : "bg-muted"
            }`}
          />
          {i === idx && <span>{STEP_LABELS[step]}</span>}
        </div>
      ))}
    </div>
  )
}

interface OnboardingOrchestratorProps {
  onComplete?: (state: OnboardingState) => void
}

export function OnboardingOrchestrator({ onComplete }: OnboardingOrchestratorProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [saveError, setSaveError] = useState<string | null>(null)
  const [state, setState] = useState<OnboardingState>({
    step: "WELCOME",
    childName: "",
    avatarId: "piggy",
    ageGroup: null,
    goalId: "",
    xpEarned: 0,
    firstBadgeEarned: false,
  })

  function updateStep(step: OnboardingStep, patch?: Partial<OnboardingState>) {
    setState((s) => ({ ...s, step, ...patch }))
  }

  function handleDone() {
    const finalState: OnboardingState = { ...state, step: "DONE" }
    onComplete?.(finalState)

    startTransition(async () => {
      const result = await saveChildOnboarding({
        firstName: finalState.childName,
        ageGroup: finalState.ageGroup ?? "EXPLORER",
        avatarId: finalState.avatarId,
        goalId: finalState.goalId,
        xpEarned: finalState.xpEarned,
      })

      if (!result.success) {
        setSaveError(result.error ?? "Wystąpił błąd. Spróbuj ponownie.")
        return
      }

      router.push("/dashboard")
    })
  }

  const { step, childName, avatarId, ageGroup, xpEarned } = state

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <StepIndicator currentStep={step} />

      <div className="flex-1 overflow-y-auto">
        {step === "WELCOME" && (
          <WelcomeWizard
            onComplete={(name, ag) =>
              updateStep("AVATAR", { childName: name, ageGroup: ag })
            }
          />
        )}

        {step === "AVATAR" && ageGroup && (
          <AvatarPicker
            ageGroup={ageGroup}
            childName={childName}
            onComplete={(avId) => updateStep("GOAL", { avatarId: avId })}
          />
        )}

        {step === "GOAL" && (
          <GoalSelector
            childName={childName}
            onComplete={(goalId) => updateStep("FIRST_CHALLENGE", { goalId })}
          />
        )}

        {step === "FIRST_CHALLENGE" && ageGroup && (
          <FirstChallenge
            ageGroup={ageGroup}
            childName={childName}
            onComplete={(xp) => updateStep("FIRST_REWARD", { xpEarned: xp })}
          />
        )}

        {step === "FIRST_REWARD" && ageGroup && (
          <FirstReward
            childName={childName}
            avatarId={avatarId}
            ageGroup={ageGroup}
            xpFromChallenge={xpEarned}
            onComplete={() => updateStep("MENTOR_INTRO", { firstBadgeEarned: true })}
          />
        )}

        {step === "MENTOR_INTRO" && ageGroup && (
          <MentorIntro
            ageGroup={ageGroup}
            childAvatarId={avatarId}
            childName={childName}
            onComplete={handleDone}
          />
        )}
      </div>

      {saveError && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 rounded-2xl bg-destructive px-5 py-3 text-sm text-white shadow-lg">
          {saveError}
        </div>
      )}

      {isPending && (
        <div className="fixed inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm z-50">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="text-sm font-medium">Zapisuję Twój profil…</p>
          </div>
        </div>
      )}
    </div>
  )
}
