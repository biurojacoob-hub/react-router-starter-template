"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { OnboardingStep1 } from "@/src/components/auth/onboarding-step1"
import { OnboardingStep2 } from "@/src/components/auth/onboarding-step2"
import { OnboardingStep3 } from "@/src/components/auth/onboarding-step3"
import { OnboardingStep4 } from "@/src/components/auth/onboarding-step4"

const STEPS = [
  { label: "Rodzina" },
  { label: "Dzieci" },
  { label: "Wiek" },
  { label: "Cele" },
]

export default function OnboardingPage() {
  const router = useRouter()
  const { update } = useSession()
  const [step, setStep] = useState(0)
  const [data, setData] = useState({ childrenCount: 1 })

  const next = () => setStep((s) => s + 1)

  const finish = async () => {
    await update({ onboardingDone: true })
    router.push("/dashboard")
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Skonfiguruj swoją rodzinę</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Krok {step + 1} z {STEPS.length} — zajmie to mniej niż 2 minuty.
        </p>
      </div>

      {/* Progress indicators */}
      <div className="flex items-center gap-2">
        {STEPS.map((s, i) => (
          <div key={s.label} className="flex items-center gap-2 flex-1">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold shrink-0 transition-colors",
                i < step
                  ? "bg-emerald-500 text-white"
                  : i === step
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {i < step ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
            </div>
            <span
              className={cn(
                "text-xs hidden sm:block",
                i === step ? "text-foreground font-medium" : "text-muted-foreground"
              )}
            >
              {s.label}
            </span>
            {i < STEPS.length - 1 && (
              <div
                className={cn(
                  "h-px flex-1 mx-1 transition-colors",
                  i < step ? "bg-emerald-500" : "bg-border"
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div>
        {step === 0 && <OnboardingStep1 onNext={next} />}
        {step === 1 && (
          <OnboardingStep2
            onNext={(count) => {
              setData((d) => ({ ...d, childrenCount: count }))
              next()
            }}
          />
        )}
        {step === 2 && (
          <OnboardingStep3 childrenCount={data.childrenCount} onNext={next} />
        )}
        {step === 3 && <OnboardingStep4 onFinish={finish} />}
      </div>
    </div>
  )
}
