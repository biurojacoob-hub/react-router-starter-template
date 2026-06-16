"use server"

import { cookies } from "next/headers"
import { prisma } from "@/src/lib/db"
import { requireAuth } from "@/src/lib/auth/guards"
import {
  OnboardingStep1Schema,
  OnboardingStep2Schema,
  OnboardingStep4Schema,
} from "@/src/lib/auth/validation"
import { AgeGroup } from "@prisma/client"

function ageToAgeGroup(age: number): AgeGroup {
  if (age <= 8) return AgeGroup.EXPLORER
  if (age <= 11) return AgeGroup.LEARNER
  if (age <= 14) return AgeGroup.ACHIEVER
  return AgeGroup.MASTER
}

export type OnboardingState = {
  success: boolean
  error?: string
}

// Step 1 — set family name
export async function saveStep1Action(
  _prev: OnboardingState,
  formData: FormData
): Promise<OnboardingState> {
  const session = await requireAuth()
  const parsed = OnboardingStep1Schema.safeParse({
    familyName: formData.get("familyName"),
  })
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message }
  }

  if (!session.user.familyId) {
    return { success: false, error: "Brak przypisanej rodziny." }
  }

  await prisma.family.update({
    where: { id: session.user.familyId },
    data: { name: parsed.data.familyName },
  })

  return { success: true }
}

// Step 2 — children count
export async function saveStep2Action(
  _prev: OnboardingState,
  formData: FormData
): Promise<OnboardingState> {
  const session = await requireAuth()
  const parsed = OnboardingStep2Schema.safeParse({
    childrenCount: formData.get("childrenCount"),
  })
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message }
  }

  if (!session.user.familyId) {
    return { success: false, error: "Brak przypisanej rodziny." }
  }

  await prisma.family.update({
    where: { id: session.user.familyId },
    data: { childrenCount: parsed.data.childrenCount },
  })

  return { success: true }
}

// Step 3 — children ages → create ChildProfile stubs
export async function saveStep3Action(
  _prev: OnboardingState,
  formData: FormData
): Promise<OnboardingState> {
  const session = await requireAuth()

  const agesRaw = formData.getAll("age").map(Number)
  const ages = agesRaw.filter((a) => a >= 4 && a <= 18)

  if (ages.length === 0) {
    return { success: false, error: "Podaj wiek przynajmniej jednego dziecka." }
  }

  if (!session.user.familyId) {
    return { success: false, error: "Brak przypisanej rodziny." }
  }

  const parentId = session.user.id
  const familyId = session.user.familyId
  const currentYear = new Date().getFullYear()

  await prisma.childProfile.createMany({
    data: ages.map((age, i) => ({
      parentId,
      familyId,
      firstName: `Dziecko ${i + 1}`,
      lastName: "",
      birthYear: currentYear - age,
      ageGroup: ageToAgeGroup(age),
    })),
  })

  return { success: true }
}

// Step 4 — educational goals + mark onboarding done
export async function saveStep4Action(
  _prev: OnboardingState,
  formData: FormData
): Promise<OnboardingState> {
  try {
    const session = await requireAuth()

    const goals = formData.getAll("goals") as string[]
    const parsed = OnboardingStep4Schema.safeParse({ educationalGoals: goals })
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message }
    }

    if (!session.user.familyId) {
      return { success: false, error: "Brak przypisanej rodziny." }
    }

    await prisma.family.update({
      where: { id: session.user.familyId },
      data: {
        educationalGoals: parsed.data.educationalGoals,
        onboardingDone: true,
      },
    })

    await prisma.user.update({
      where: { id: session.user.id },
      data: { onboardingDone: true },
    })

    // Set a short-lived cookie so middleware allows /dashboard before JWT refreshes
    const cookieStore = await cookies()
    cookieStore.set("onboarding_done", "1", {
      path: "/",
      maxAge: 300,
      httpOnly: false,
      sameSite: "lax",
    })

    return { success: true }
  } catch (err) {
    console.error("[ONBOARDING] saveStep4Action error:", err)
    const msg = err instanceof Error ? err.message : String(err)
    return { success: false, error: `Błąd zapisu: ${msg}` }
  }
}
