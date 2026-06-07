import type { UserRole } from "@prisma/client"
import type { DefaultSession } from "next-auth"

// Augment built-in session types so TypeScript knows about our fields
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: UserRole
      familyId: string | null
      onboardingDone: boolean
    } & DefaultSession["user"]
  }

  interface User {
    role: UserRole
    familyId: string | null
    onboardingDone: boolean
  }

  interface JWT {
    id: string
    role: UserRole
    familyId: string | null
    onboardingDone: boolean
  }
}

export type AuthUser = {
  id: string
  email: string
  name: string
  role: UserRole
  familyId: string | null
  onboardingDone: boolean
}
