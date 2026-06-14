"use server"

import { signIn } from "@/src/auth"
import { SignInSchema } from "@/src/lib/auth/validation"
import { AuthError } from "next-auth"

export type SignInState = {
  success: boolean
  error?: string
  fieldErrors?: Partial<Record<"email" | "password", string>>
}

export async function signInAction(
  _prev: SignInState,
  formData: FormData
): Promise<SignInState> {
  const raw = {
    email: formData.get("email"),
    password: formData.get("password"),
  }

  const parsed = SignInSchema.safeParse(raw)
  if (!parsed.success) {
    const fieldErrors: SignInState["fieldErrors"] = {}
    for (const [k, msgs] of Object.entries(parsed.error.flatten().fieldErrors)) {
      ;(fieldErrors as Record<string, string>)[k] = msgs?.[0] ?? ""
    }
    return { success: false, fieldErrors }
  }

  const callbackUrl =
    (formData.get("callbackUrl") as string | null) ?? "/dashboard"

  try {
    await signIn("credentials", {
      email: parsed.data.email.toLowerCase(),
      password: parsed.data.password,
      redirectTo: callbackUrl,
    })
    return { success: true }
  } catch (e) {
    if (e instanceof AuthError) {
      console.error("[AUTH] signInAction AuthError:", e.type, e.message)
      switch (e.type) {
        case "CredentialsSignin":
          return { success: false, error: "Nieprawidłowy email lub hasło." }
        default:
          return { success: false, error: "Coś poszło nie tak. Spróbuj ponownie." }
      }
    }
    // NEXT_REDIRECT is thrown on successful redirect — let it propagate
    const isRedirect =
      e instanceof Error && e.message === "NEXT_REDIRECT"
    if (!isRedirect) {
      console.error("[AUTH] signInAction unexpected error:", e)
    }
    throw e
  }
}
