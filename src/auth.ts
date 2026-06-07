import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { CustomPrismaAdapter } from "@/src/lib/auth/prisma-adapter"
import bcrypt from "bcryptjs"
import { prisma } from "@/src/lib/db"
import type { UserRole } from "@prisma/client"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: CustomPrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Hasło", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const user = await prisma.user.findUnique({
          where: {
            email: (credentials.email as string).toLowerCase(),
            deletedAt: null,
          },
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            passwordHash: true,
            role: true,
            familyId: true,
            onboardingDone: true,
            image: true,
          },
        })

        if (!user?.passwordHash) return null

        const valid = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash
        )
        if (!valid) return null

        return {
          id: user.id,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          image: user.image,
          role: user.role,
          familyId: user.familyId,
          onboardingDone: user.onboardingDone,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // Initial sign-in — copy user data into token
      if (user) {
        token.id = user.id as string
        token.role = (user as { role: UserRole }).role
        token.familyId = (user as { familyId: string | null }).familyId
        token.onboardingDone = (user as { onboardingDone: boolean }).onboardingDone
      }

      // Handle session updates (e.g. after onboarding)
      if (trigger === "update" && session) {
        if (session.familyId !== undefined) token.familyId = session.familyId
        if (session.onboardingDone !== undefined) token.onboardingDone = session.onboardingDone
        if (session.role !== undefined) token.role = session.role
      }

      return token
    },
    async session({ session, token }) {
      session.user.id = token.id as string
      session.user.role = token.role as UserRole
      session.user.familyId = token.familyId as string | null
      session.user.onboardingDone = token.onboardingDone as boolean
      return session
    },
  },
})
