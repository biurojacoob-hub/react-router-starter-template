"use server"

import { auth } from "@/src/auth"
import { prisma } from "@/src/lib/db"

const DAILY_LOGIN_XP = 5

export async function recordDailyLogin(): Promise<{ xpAwarded: number }> {
  try {
    const session = await auth()
    if (!session?.user) return { xpAwarded: 0 }

    const child = await prisma.childProfile.findFirst({
      where: { userId: session.user.id, deletedAt: null },
      select: { id: true, xp: true, level: true, lastActiveAt: true },
    })
    if (!child) return { xpAwarded: 0 }

    const today = new Date()
    today.setUTCHours(0, 0, 0, 0)

    // Only award XP if this is the first login today
    const isFirst = !child.lastActiveAt || child.lastActiveAt < today
    const xpAwarded = isFirst ? DAILY_LOGIN_XP : 0

    await prisma.childProfile.update({
      where: { id: child.id },
      data: {
        lastActiveAt: new Date(),
        ...(isFirst ? { xp: { increment: DAILY_LOGIN_XP } } : {}),
      },
    })

    return { xpAwarded }
  } catch {
    return { xpAwarded: 0 }
  }
}
