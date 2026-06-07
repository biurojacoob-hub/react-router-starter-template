import { redirect } from "next/navigation"
import { auth } from "@/src/auth"
import type { UserRole } from "@prisma/client"

/**
 * Require an authenticated session in a Server Component or Action.
 * Redirects to /sign-in if unauthenticated.
 */
export async function requireAuth() {
  const session = await auth()
  if (!session?.user) redirect("/sign-in")
  return session
}

/**
 * Require a specific role (or one of many roles).
 * Redirects to /dashboard if the role doesn't match.
 */
export async function requireRole(...roles: UserRole[]) {
  const session = await requireAuth()
  if (!roles.includes(session.user.role)) redirect("/dashboard")
  return session
}

/**
 * Require that onboarding is complete.
 * Redirects to /onboarding if not yet done.
 */
export async function requireOnboarding() {
  const session = await requireAuth()
  if (!session.user.onboardingDone) redirect("/onboarding")
  return session
}

/**
 * Require that the user belongs to a family.
 */
export async function requireFamily() {
  const session = await requireOnboarding()
  if (!session.user.familyId) redirect("/onboarding")
  return session as typeof session & { user: { familyId: string } }
}

/**
 * Returns the current session or null — never redirects.
 * Safe to use on public pages.
 */
export async function getOptionalSession() {
  return auth()
}
