import type { Metadata } from "next"
import { OnboardingOrchestrator } from "@/src/components/onboarding/OnboardingOrchestrator"

export const metadata: Metadata = { title: "Witaj w Family Finance Academy!" }

export default function ChildWelcomePage() {
  return <OnboardingOrchestrator />
}
