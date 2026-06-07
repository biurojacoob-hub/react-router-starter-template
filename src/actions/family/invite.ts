"use server"

import { prisma } from "@/src/lib/db"
import { requireRole } from "@/src/lib/auth/guards"
import { generateInviteCode } from "@/src/lib/auth/invite"
import { InviteByEmailSchema } from "@/src/lib/auth/validation"

export type InviteState = {
  success: boolean
  code?: string
  error?: string
}

/**
 * Generate a generic invite code for the family (share manually or via link).
 */
export async function generateInviteAction(): Promise<InviteState> {
  const session = await requireRole("PARENT", "ADMIN")

  if (!session.user.familyId) {
    return { success: false, error: "Brak przypisanej rodziny." }
  }

  const code = generateInviteCode()

  await prisma.familyInvite.create({
    data: {
      familyId: session.user.familyId,
      invitedBy: session.user.id,
      code,
      role: "CHILD",
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    },
  })

  return { success: true, code }
}

/**
 * Send a targeted invite to a specific email address.
 */
export async function inviteByEmailAction(
  _prev: InviteState,
  formData: FormData
): Promise<InviteState> {
  const session = await requireRole("PARENT", "ADMIN")

  const parsed = InviteByEmailSchema.safeParse({
    email: formData.get("email"),
    role: formData.get("role"),
  })

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message }
  }

  if (!session.user.familyId) {
    return { success: false, error: "Brak przypisanej rodziny." }
  }

  // Check if this email already belongs to a family member
  const existing = await prisma.user.findFirst({
    where: { email: parsed.data.email.toLowerCase(), familyId: session.user.familyId },
  })
  if (existing) {
    return { success: false, error: "Ten email jest już w Twojej rodzinie." }
  }

  // Revoke any pending invite for the same email
  await prisma.familyInvite.updateMany({
    where: {
      familyId: session.user.familyId,
      email: parsed.data.email.toLowerCase(),
      usedAt: null,
    },
    data: { deletedAt: new Date() },
  })

  const code = generateInviteCode()

  await prisma.familyInvite.create({
    data: {
      familyId: session.user.familyId,
      invitedBy: session.user.id,
      code,
      email: parsed.data.email.toLowerCase(),
      role: parsed.data.role as "CHILD" | "PARENT",
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  })

  return { success: true, code }
}

/**
 * Revoke (soft-delete) an invite by its code.
 */
export async function revokeInviteAction(code: string): Promise<InviteState> {
  const session = await requireRole("PARENT", "ADMIN")

  const invite = await prisma.familyInvite.findUnique({ where: { code } })

  if (!invite || invite.familyId !== session.user.familyId) {
    return { success: false, error: "Zaproszenie nie istnieje." }
  }

  await prisma.familyInvite.update({
    where: { code },
    data: { deletedAt: new Date() },
  })

  return { success: true }
}
