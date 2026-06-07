/**
 * Custom Auth.js v5 adapter for Prisma 7.
 * @auth/prisma-adapter is not yet compatible with Prisma 7's adapter-based client.
 */
import type { Adapter, AdapterUser, AdapterSession, AdapterAccount, VerificationToken } from "next-auth/adapters"
import type { PrismaClient } from "@prisma/client"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyPrisma = any

function mapUser(u: AnyPrisma): AdapterUser {
  return {
    id: u.id as string,
    email: u.email as string,
    emailVerified: u.emailVerified as Date | null,
    name: `${u.firstName ?? ""} ${u.lastName ?? ""}`.trim(),
    image: u.image as string | null,
    // custom fields preserved on the object
    role: u.role,
    familyId: u.familyId,
    onboardingDone: u.onboardingDone,
  } as AdapterUser
}

const USER_SELECT = {
  id: true,
  email: true,
  emailVerified: true,
  firstName: true,
  lastName: true,
  image: true,
  role: true,
  familyId: true,
  onboardingDone: true,
}

export function CustomPrismaAdapter(p: PrismaClient): Adapter {
  const db = p as AnyPrisma

  return {
    async createUser(data) {
      const user = await db.user.create({
        data: {
          email: data.email!,
          emailVerified: data.emailVerified,
          firstName: (data as AnyPrisma).firstName ?? "",
          lastName: (data as AnyPrisma).lastName ?? "",
          image: data.image,
        },
        select: USER_SELECT,
      })
      return mapUser(user)
    },

    async getUser(id) {
      const user = await db.user.findUnique({ where: { id }, select: USER_SELECT })
      return user ? mapUser(user) : null
    },

    async getUserByEmail(email) {
      const user = await db.user.findUnique({ where: { email }, select: USER_SELECT })
      return user ? mapUser(user) : null
    },

    async getUserByAccount({ provider, providerAccountId }) {
      const account = await db.account.findUnique({
        where: { provider_providerAccountId: { provider, providerAccountId } },
        include: { user: { select: USER_SELECT } },
      })
      return account ? mapUser(account.user) : null
    },

    async updateUser(data) {
      const user = await db.user.update({
        where: { id: data.id },
        data: { emailVerified: data.emailVerified, image: data.image },
        select: USER_SELECT,
      })
      return mapUser(user)
    },

    async linkAccount(data: AdapterAccount) {
      await db.account.create({ data })
    },

    async createSession(data: { sessionToken: string; userId: string; expires: Date }): Promise<AdapterSession> {
      return db.session.create({ data })
    },

    async getSessionAndUser(sessionToken: string) {
      const result = await db.session.findUnique({
        where: { sessionToken },
        include: { user: { select: USER_SELECT } },
      })
      if (!result) return null
      const { user, ...session } = result
      return { session: session as AdapterSession, user: mapUser(user) }
    },

    async updateSession(data: Partial<AdapterSession> & { sessionToken: string }): Promise<AdapterSession | null | undefined> {
      return db.session.update({ where: { sessionToken: data.sessionToken }, data })
    },

    async deleteSession(sessionToken: string) {
      await db.session.delete({ where: { sessionToken } })
    },

    async createVerificationToken(data: VerificationToken): Promise<VerificationToken | null | undefined> {
      return db.verificationToken.create({ data })
    },

    async useVerificationToken({ identifier, token }: { identifier: string; token: string }): Promise<VerificationToken | null> {
      try {
        return await db.verificationToken.delete({
          where: { identifier_token: { identifier, token } },
        })
      } catch {
        return null
      }
    },
  }
}
