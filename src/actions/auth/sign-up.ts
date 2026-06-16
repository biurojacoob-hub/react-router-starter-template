"use server"

import bcrypt from "bcryptjs"
import { prisma } from "@/src/lib/db"
import { SignUpSchema } from "@/src/lib/auth/validation"

export type SignUpState = {
  success: boolean
  email?: string
  error?: string
  fieldErrors?: Partial<Record<"firstName" | "lastName" | "email" | "password", string>>
}

export async function signUpAction(
  _prev: SignUpState,
  formData: FormData
): Promise<SignUpState> {
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

  const { firstName, lastName, email, password: _password } = parsed.data
  const lowerEmail = email.toLowerCase()

  try {
    const exists = await prisma.user.findUnique({ where: { email: lowerEmail } })
    if (exists) {
      return { success: false, error: "Konto z tym adresem email już istnieje." }
    }

    const passwordHash = await bcrypt.hash(_password, 12)

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
  } catch (err) {
    console.error("[AUTH] signUpAction DB error:", err)
    const msg = err instanceof Error ? err.message : String(err)
    return { success: false, error: `Nie udało się utworzyć konta: ${msg}` }
  }

  // Return success — client will handle sign-in to avoid NEXT_REDIRECT conflicts
  return { success: true, email: lowerEmail }
}
