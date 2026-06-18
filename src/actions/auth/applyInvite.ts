"use server"

import { prisma } from "@/src/lib/db"
import { requireAuth } from "@/src/lib/auth/guards"
import { logger } from "@/src/lib/logger"

export type ApplyInviteResult = { success: true } | { success: false; message: string }

/**
 * Apply an invite code for a logged-in user.
 * Sets familyId + role on their User record and marks the invite as used.
 */
export async function applyInviteCode(code: string): Promise<ApplyInviteResult> {
  try {
    const session = await requireAuth()

    const invite = await prisma.familyInvite.findUnique({
      where: { code },
      select: { id: true, familyId: true, role: true, expiresAt: true, usedAt: true, deletedAt: true },
    })

    if (!invite || invite.deletedAt || invite.usedAt || invite.expiresAt < new Date()) {
      return { success: false, message: "Zaproszenie wygasło lub zostało już wykorzystane." }
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { familyId: true },
    })

    if (user?.familyId && user.familyId !== invite.familyId) {
      return { success: false, message: "Jesteś już przypisany do innej rodziny." }
    }

    await prisma.$transaction([
      prisma.user.update({
        where: { id: session.user.id },
        data: {
          familyId: invite.familyId,
          role: invite.role as "CHILD" | "PARENT",
          onboardingDone: false,
        },
      }),
      prisma.familyInvite.update({
        where: { id: invite.id },
        data: { usedAt: new Date() },
      }),
    ])

    logger.auth.info("Invite applied", { userId: session.user.id, familyId: invite.familyId, role: invite.role })
    return { success: true }
  } catch (err) {
    logger.auth.error("applyInviteCode failed", err)
    return { success: false, message: "Nie udało się dołączyć do rodziny. Spróbuj ponownie." }
  }
}
