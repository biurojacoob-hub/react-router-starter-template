"use server"

import { auth } from "@/src/auth"
import { prisma } from "@/src/lib/db"
import { xpToLevel } from "@/src/lib/learning/xp"
import { logger } from "@/src/lib/logger"

const MISSION_XP = 50
const MISSION_COINS = 10

async function findOrCreateMission(title: string, description: string) {
  let mission = await prisma.mission.findFirst({
    where: { title, category: "DAILY_PROGRAM" },
    select: { id: true },
  })
  if (!mission) {
    mission = await prisma.mission.create({
      data: {
        title,
        description,
        category: "DAILY_PROGRAM",
        difficulty: "MEDIUM",
        durationDays: 1,
        xpReward: MISSION_XP,
        coinReward: MISSION_COINS,
        ageMin: 6,
        ageMax: 18,
        published: false,
      },
      select: { id: true },
    })
  }
  return mission
}

export async function startMission(
  missionTitle: string,
  missionDescription: string
): Promise<{ missionProgressId: string } | { error: string }> {
  try {
    const session = await auth()
    if (!session?.user) return { error: "Unauthorized" }

    const child = await prisma.childProfile.findFirst({
      where: { userId: session.user.id, deletedAt: null },
      select: { id: true },
    })
    if (!child) return { error: "Child not found" }

    const mission = await findOrCreateMission(missionTitle, missionDescription)

    const existing = await prisma.missionProgress.findUnique({
      where: { childId_missionId: { childId: child.id, missionId: mission.id } },
      select: { id: true, status: true },
    })

    if (existing) return { missionProgressId: existing.id }

    const mp = await prisma.missionProgress.create({
      data: { childId: child.id, missionId: mission.id, status: "ACTIVE" },
      select: { id: true },
    })
    return { missionProgressId: mp.id }
  } catch (err) {
    console.error("[startMission]", err)
    return { error: "Wystąpił błąd" }
  }
}

export async function completeMission(
  missionTitle: string,
  missionDescription: string
): Promise<{ xpEarned: number } | { error: string }> {
  try {
    const session = await auth()
    if (!session?.user) return { error: "Unauthorized" }

    const child = await prisma.childProfile.findFirst({
      where: { userId: session.user.id, deletedAt: null },
      select: { id: true, xp: true },
    })
    if (!child) return { error: "Child not found" }

    const mission = await findOrCreateMission(missionTitle, missionDescription)

    // Atomic check-and-award: status check and XP increment in a single transaction
    // to prevent double-XP on concurrent requests (TOCTOU race condition).
    const xpEarned = await prisma.$transaction(async (tx) => {
      const existing = await tx.missionProgress.findUnique({
        where: { childId_missionId: { childId: child.id, missionId: mission.id } },
        select: { id: true, status: true },
      })

      if (existing?.status === "COMPLETED") return 0

      const freshChild = await tx.childProfile.findUnique({
        where: { id: child.id },
        select: { xp: true },
      })
      const newXp = (freshChild?.xp ?? child.xp) + MISSION_XP
      const newLevel = xpToLevel(newXp)

      if (existing) {
        await tx.missionProgress.update({
          where: { id: existing.id },
          data: { status: "COMPLETED", completedAt: new Date() },
        })
      } else {
        await tx.missionProgress.create({
          data: {
            childId: child.id,
            missionId: mission.id,
            status: "COMPLETED",
            completedAt: new Date(),
          },
        })
      }

      await tx.childProfile.update({
        where: { id: child.id },
        data: { xp: newXp, level: newLevel, lastActiveAt: new Date() },
      })

      logger.mission.info("Mission completed, XP awarded", {
        childId: child.id,
        missionTitle,
        xpEarned: MISSION_XP,
        newXp,
        newLevel,
      })

      return MISSION_XP
    })

    return { xpEarned }
  } catch (err) {
    logger.mission.error("completeMission failed", err)
    return { error: "Wystąpił błąd" }
  }
}
