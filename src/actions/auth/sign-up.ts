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

  try {
    const exists = await prisma.user.findUnique({ where: { email: lowerEmail } })
    if (exists) {
      return { success: false, error: "Konto z tym adresem email już istnieje." }
    }

    const passwordHash = await bcrypt.hash(password, 12)

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
  } catch (err) {
    console.error("[AUTH] signUpAction DB error:", err)
    const msg = err instanceof Error ? err.message : String(err)
    let dbHost = "unknown"
    try {
      const u = new URL(process.env.DATABASE_URL ?? "")
      dbHost = u.hostname
    } catch {}
    return { success: false, error: `DB HOST: ${dbHost} | ERROR: ${msg}` }
  }

  // Auto sign-in after registration
  try {
    await signIn("credentials", {
      email: lowerEmail,
      password,
      redirectTo: "/onboarding",
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
