"use server"

import bcrypt from "bcryptjs"
import { prisma } from "@/src/lib/db"
import { SignUpSchema } from "@/src/lib/auth/validation"
import { signIn } from "@/src/auth"
import { AuthError } from "next-auth"
import { logger } from "@/src/lib/logger"

export type SignUpState = {
  success: boolean
  error?: string
  fieldErrors?: Partial<Record<"firstName" | "lastName" | "email" | "password", string>>
}

export async function signUpAction(
  _prev: SignUpState,
  formData: FormData
): Promise<SignUpState> {
  const inviteCode = (formData.get("inviteCode") as string | null)?.trim() || null

  const raw = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
  }

  const parsed = SignUpSchema.safeParse(raw)
  if (!parsed.success) {
    const fieldErrors: SignUpState["fieldErrors"] = {}
    for (const [k, msgs] of Object.entries(parsed.error.flatten().fieldErrors)) {
      ;(fieldErrors as Record<string, string>)[k] = msgs?.[0] ?? ""
    }
    return { success: false, fieldErrors }
  }

  const { firstName, lastName, email, password } = parsed.data
  const lowerEmail = email.toLowerCase()

  try {
    const exists = await prisma.user.findUnique({ where: { email: lowerEmail } })
    if (exists) {
      return { success: false, error: "Konto z tym adresem email już istnieje." }
    }

    const passwordHash = await bcrypt.hash(password, 12)

    // If invite code provided — join existing family as CHILD
    if (inviteCode) {
      const invite = await prisma.familyInvite.findUnique({
        where: { code: inviteCode },
        select: { id: true, familyId: true, role: true, expiresAt: true, usedAt: true, deletedAt: true },
      })

      if (!invite || invite.deletedAt || invite.usedAt || invite.expiresAt < new Date()) {
        return { success: false, error: "Zaproszenie wygasło lub jest nieważne. Poproś rodzica o nowe." }
      }

      await prisma.$transaction([
        prisma.user.create({
          data: {
            firstName,
            lastName,
            email: lowerEmail,
            passwordHash,
            role: invite.role as "CHILD" | "PARENT",
            familyId: invite.familyId,
            onboardingDone: false,
          },
        }),
        prisma.familyInvite.update({
          where: { id: invite.id },
          data: { usedAt: new Date() },
        }),
      ])

      logger.auth.info("Child registered via invite", { email: lowerEmail, familyId: invite.familyId })
    } else {
      // Create family first, then user — sequential to avoid interactive transaction issues
      const family = await prisma.family.create({
        data: { name: `Rodzina ${lastName}` },
      })

      await prisma.user.create({
        data: {
          firstName,
          lastName,
          email: lowerEmail,
          passwordHash,
          role: "PARENT",
          familyId: family.id,
          onboardingDone: false,
        },
      })
    }
  } catch (err) {
    logger.auth.error("signUpAction DB error", err)
    return { success: false, error: "Nie udało się utworzyć konta. Spróbuj ponownie." }
  }

  // Auto sign-in after registration
  const redirectTo = inviteCode ? "/child/welcome" : "/onboarding"
  try {
    await signIn("credentials", {
      email: lowerEmail,
      password,
      redirectTo,
    })
  } catch (e) {
    if (e instanceof AuthError) {
      console.error("[AUTH] signUpAction auto-login failed:", e.type)
      // Account created but auto-login failed — user can sign in manually
      return { success: true }
    }
    // NEXT_REDIRECT propagates on successful redirect
    throw e
  }

  return { success: true }
}
