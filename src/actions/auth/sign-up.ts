"use server"

import bcrypt from "bcryptjs"
import { prisma } from "@/src/lib/db"
import { SignUpSchema } from "@/src/lib/auth/validation"
import { signIn } from "@/src/auth"
import { AuthError } from "next-auth"

export type SignUpState = {
  success: boolean
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

  const { firstName, lastName, email, password } = parsed.data
  const lowerEmail = email.toLowerCase()

  const exists = await prisma.user.findUnique({ where: { email: lowerEmail } })
  if (exists) {
    return { success: false, error: "Konto z tym adresem email już istnieje." }
  }

  const passwordHash = await bcrypt.hash(password, 12)

  // Create user + family in a single transaction
  await prisma.$transaction(async (tx) => {
    const family = await tx.family.create({
      data: { name: `Rodzina ${lastName}` },
    })

    await tx.user.create({
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
  })

  // Auto sign-in after registration
  try {
    await signIn("credentials", {
      email: lowerEmail,
      password,
      redirect: false,
    })
  } catch (e) {
    if (e instanceof AuthError) {
      // Account created but auto-login failed — user can sign in manually
      return { success: true }
    }
    throw e
  }

  return { success: true }
}
