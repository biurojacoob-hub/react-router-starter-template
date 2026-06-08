"use server"

import { prisma } from "@/src/lib/db"
import { requireAuth } from "@/src/lib/auth/guards"
import { AgeGroup } from "@prisma/client"
import { redirect } from "next/navigation"

const AGE_GROUP_MAP: Record<string, AgeGroup> = {
  EXPLORER: AgeGroup.EXPLORER,
  LEARNER: AgeGroup.LEARNER,
  ACHIEVER: AgeGroup.ACHIEVER,
  MASTER: AgeGroup.MASTER,
}

export type SaveOnboardingInput = {
  firstName: string
  ageGroup: string
  avatarId: string
  goalId: string
  xpEarned: number
}

export type SaveOnboardingResult = {
  success: boolean
  error?: string
}

export async function saveChildOnboarding(
  input: SaveOnboardingInput
): Promise<SaveOnboardingResult> {
  try {
    const session = await requireAuth()

    if (!input.firstName || input.firstName.trim().length < 2) {
      return { success: false, error: "Imię musi mieć co najmniej 2 znaki." }
    }

    const ageGroup = AGE_GROUP_MAP[input.ageGroup]
    if (!ageGroup) {
      return { success: false, error: "Nieprawidłowa grupa wiekowa." }
    }

    const firstName = input.firstName.trim().slice(0, 50)

    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { familyId: true, onboardingDone: true },
    })

    if (!currentUser?.familyId) {
      return { success: false, error: "Brak przypisanej rodziny. Skontaktuj się z rodzicem." }
    }

    const existingChild = await prisma.childProfile.findFirst({
      where: {
        OR: [
          { userId: session.user.id, deletedAt: null },
          { familyId: currentUser.familyId, userId: null, deletedAt: null },
        ],
      },
      select: { id: true },
      orderBy: { createdAt: "asc" },
    })

    if (existingChild) {
      await prisma.$transaction([
        prisma.childProfile.update({
          where: { id: existingChild.id },
          data: {
            userId: session.user.id,
            firstName,
            ageGroup,
            avatarUrl: input.avatarId,
            xp: input.xpEarned,
            lastActiveAt: new Date(),
          },
        }),
        prisma.user.update({
          where: { id: session.user.id },
          data: { onboardingDone: true },
        }),
      ])

      return { success: true }
    }

    const parent = await prisma.user.findFirst({
      where: { familyId: currentUser.familyId, role: "PARENT" },
      select: { id: true },
    })

    if (!parent) {
      return { success: false, error: "Nie znaleziono rodzica w tej rodzinie." }
    }

    await prisma.$transaction([
      prisma.childProfile.create({
        data: {
          userId: session.user.id,
          parentId: parent.id,
          familyId: currentUser.familyId,
          firstName,
          lastName: "",
          birthYear: new Date().getFullYear() - (ageGroup === "EXPLORER" ? 8 : ageGroup === "LEARNER" ? 11 : ageGroup === "ACHIEVER" ? 14 : 17),
          ageGroup,
          avatarUrl: input.avatarId,
          xp: input.xpEarned,
          lastActiveAt: new Date(),
        },
      }),
      prisma.user.update({
        where: { id: session.user.id },
        data: { onboardingDone: true },
      }),
    ])

    return { success: true }
  } catch (err) {
    console.error("[saveChildOnboarding]", err)
    return { success: false, error: "Wystąpił błąd podczas zapisywania. Spróbuj ponownie." }
  }
}

export async function saveChildOnboardingAndRedirect(
  input: SaveOnboardingInput
): Promise<void> {
  const result = await saveChildOnboarding(input)
  if (result.success) {
    redirect("/dashboard")
  }
}
