import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { CustomPrismaAdapter } from "@/src/lib/auth/prisma-adapter"
import bcrypt from "bcryptjs"
import { prisma } from "@/src/lib/db"
import { authConfig } from "@/src/auth.config"

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: CustomPrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Hasło", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        let user
        try {
          user = await prisma.user.findUnique({
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
        } catch (err) {
          console.error("[DB MIGRATION] authorize DB error:", err)
          return null
        }

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
})
