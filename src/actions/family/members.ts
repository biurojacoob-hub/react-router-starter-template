"use server"

import { prisma } from "@/src/lib/db"
import { requireRole } from "@/src/lib/auth/guards"
import { z } from "zod"

export type MemberActionState = {
  success: boolean
  error?: string
}

const UpdateRoleSchema = z.object({
  userId: z.string().uuid(),
  role: z.enum(["PARENT", "CHILD"]),
})

/**
 * Change a family member's role. Only PARENT/ADMIN can do this.
 */
export async function updateMemberRoleAction(
  _prev: MemberActionState,
  formData: FormData
): Promise<MemberActionState> {
  const session = await requireRole("PARENT", "ADMIN")

  const parsed = UpdateRoleSchema.safeParse({
    userId: formData.get("userId"),
    role: formData.get("role"),
  })
  if (!parsed.success) {
    return { success: false, error: "Nieprawidłowe dane." }
  }

  const { userId, role } = parsed.data

  if (userId === session.user.id) {
    return { success: false, error: "Nie możesz zmienić własnej roli." }
  }

  // Verify target belongs to same family
  const target = await prisma.user.findFirst({
    where: { id: userId, familyId: session.user.familyId ?? "", deletedAt: null },
  })
  if (!target) {
    return { success: false, error: "Użytkownik nie należy do Twojej rodziny." }
  }

  await prisma.user.update({
    where: { id: userId },
    data: { role },
  })

  return { success: true }
}

/**
 * Soft-delete a family member. Only PARENT/ADMIN can remove others.
 */
export async function removeMemberAction(
  _prev: MemberActionState,
  formData: FormData
): Promise<MemberActionState> {
  const session = await requireRole("PARENT", "ADMIN")

  const userId = formData.get("userId") as string

  if (!z.string().uuid().safeParse(userId).success) {
    return { success: false, error: "Nieprawidłowy ID użytkownika." }
  }

  if (userId === session.user.id) {
    return { success: false, error: "Nie możesz usunąć siebie z rodziny." }
  }

  const target = await prisma.user.findFirst({
    where: { id: userId, familyId: session.user.familyId ?? "", deletedAt: null },
  })
  if (!target) {
    return { success: false, error: "Użytkownik nie należy do Twojej rodziny." }
  }

  await prisma.user.update({
    where: { id: userId },
    data: { deletedAt: new Date(), familyId: null },
  })

  return { success: true }
}
