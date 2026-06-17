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
      where: { parentId: session.user.id, deletedAt: null },
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
      where: { parentId: session.user.id, deletedAt: null },
      select: { id: true, xp: true },
    })
    if (!child) return { error: "Child not found" }

    const mission = await findOrCreateMission(missionTitle, missionDescription)

    // Upsert MissionProgress to COMPLETED
    const existing = await prisma.missionProgress.findUnique({
      where: { childId_missionId: { childId: child.id, missionId: mission.id } },
      select: { id: true, status: true },
    })

    const alreadyDone = existing?.status === "COMPLETED"
    const xpEarned = alreadyDone ? 0 : MISSION_XP

    if (!alreadyDone) {
      const newXp = child.xp + MISSION_XP
      const newLevel = xpToLevel(newXp)

      if (existing) {
        await prisma.$transaction([
          prisma.missionProgress.update({
            where: { id: existing.id },
            data: { status: "COMPLETED", completedAt: new Date() },
          }),
          prisma.childProfile.update({
            where: { id: child.id },
            data: { xp: newXp, level: newLevel, lastActiveAt: new Date() },
          }),
        ])
      } else {
        await prisma.$transaction([
          prisma.missionProgress.create({
            data: {
              childId: child.id,
              missionId: mission.id,
              status: "COMPLETED",
              completedAt: new Date(),
            },
          }),
          prisma.childProfile.update({
            where: { id: child.id },
            data: { xp: newXp, level: newLevel, lastActiveAt: new Date() },
          }),
        ])
      }

      logger.mission.info("Mission completed, XP awarded", {
        childId: child.id,
        missionTitle,
        xpEarned,
        newXp,
        newLevel,
      })
    }

    return { xpEarned }
  } catch (err) {
    logger.mission.error("completeMission failed", err)
    return { error: "Wystąpił błąd" }
  }
}
