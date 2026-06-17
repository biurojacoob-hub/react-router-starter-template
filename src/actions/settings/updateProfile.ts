"use server"

import { requireAuth } from "@/src/lib/auth/guards"
import { prisma } from "@/src/lib/db"
import { logger } from "@/src/lib/logger"
import bcrypt from "bcryptjs"
import { z } from "zod"

const NameSchema = z.object({
  firstName: z.string().min(2, "Imię musi mieć co najmniej 2 znaki.").max(50),
  lastName:  z.string().max(50).optional(),
})

const PasswordSchema = z.object({
  currentPassword: z.string().min(1, "Podaj aktualne hasło."),
  newPassword:     z.string().min(8, "Nowe hasło musi mieć co najmniej 8 znaków."),
})

export type SettingsResult = { success: true } | { success: false; message: string }

export async function updateDisplayName(
  _prev: SettingsResult,
  formData: FormData
): Promise<SettingsResult> {
  try {
    const session = await requireAuth()
    const parsed = NameSchema.safeParse({
      firstName: formData.get("firstName"),
      lastName:  formData.get("lastName"),
    })
    if (!parsed.success) {
      return { success: false, message: parsed.error.issues[0].message }
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        firstName: parsed.data.firstName,
        ...(parsed.data.lastName !== undefined && { lastName: parsed.data.lastName }),
      },
    })

    logger.auth.info("Display name updated", { userId: session.user.id })
    return { success: true }
  } catch (err) {
    logger.auth.error("updateDisplayName failed", err)
    return { success: false, message: "Nie udało się zaktualizować imienia." }
  }
}

export async function changePassword(
  _prev: SettingsResult,
  formData: FormData
): Promise<SettingsResult> {
  try {
    const session = await requireAuth()
    const parsed = PasswordSchema.safeParse({
      currentPassword: formData.get("currentPassword"),
      newPassword:     formData.get("newPassword"),
    })
    if (!parsed.success) {
      return { success: false, message: parsed.error.issues[0].message }
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { passwordHash: true },
    })

    if (!user?.passwordHash) {
      return { success: false, message: "Konto nie ma hasła (zalogowano przez zewnętrznego dostawcę)." }
    }

    const valid = await bcrypt.compare(parsed.data.currentPassword, user.passwordHash)
    if (!valid) {
      return { success: false, message: "Aktualne hasło jest nieprawidłowe." }
    }

    const hash = await bcrypt.hash(parsed.data.newPassword, 12)
    await prisma.user.update({
      where: { id: session.user.id },
      data: { passwordHash: hash },
    })

    logger.auth.info("Password changed", { userId: session.user.id })
    return { success: true }
  } catch (err) {
    logger.auth.error("changePassword failed", err)
    return { success: false, message: "Nie udało się zmienić hasła." }
  }
}

export async function updateChildAvatar(
  childId: string,
  avatarUrl: string
): Promise<SettingsResult> {
  try {
    const session = await requireAuth()
    await prisma.childProfile.updateMany({
      where: { id: childId, parentId: session.user.id, deletedAt: null },
      data: { avatarUrl },
    })
    logger.auth.info("Avatar updated", { childId })
    return { success: true }
  } catch (err) {
    logger.auth.error("updateChildAvatar failed", err)
    return { success: false, message: "Nie udało się zaktualizować avatara." }
  }
}
