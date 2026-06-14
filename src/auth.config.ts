import type { NextAuthConfig } from "next-auth"
import type { UserRole } from "@prisma/client"

// Edge-compatible auth config — NO Prisma, NO pg, NO Node.js-only imports.
// Used by middleware (Edge Runtime). Full auth.ts adds the Prisma adapter + providers.
export const authConfig = {
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  providers: [],
  callbacks: {
    jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id as string
        token.role = (user as { role: UserRole }).role
        token.familyId = (user as { familyId: string | null }).familyId
        token.onboardingDone = (user as { onboardingDone: boolean }).onboardingDone
      }
      if (trigger === "update" && session) {
        if (session.familyId !== undefined) token.familyId = session.familyId
        if (session.onboardingDone !== undefined) token.onboardingDone = session.onboardingDone
        if (session.role !== undefined) token.role = session.role
      }
      return token
    },
    session({ session, token }) {
      session.user.id = token.id as string
      session.user.role = token.role as UserRole
      session.user.familyId = token.familyId as string | null
      session.user.onboardingDone = token.onboardingDone as boolean
      return session
    },
  },
} satisfies NextAuthConfig
