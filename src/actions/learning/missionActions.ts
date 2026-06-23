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
      select: { id: true },
    })
    if (!child) return { error: "Child not found" }

    const mission = await findOrCreateMission(missionTitle, missionDescription)

    // Atomic race-condition-safe completion:
    // updateMany's WHERE executes as a single SQL UPDATE ... WHERE status != 'COMPLETED'.
    // PostgreSQL acquires a row-level lock on the matching row — the second concurrent
    // request blocks until the first commits, then sees status='COMPLETED' → count=0 → no XP.
    const xpEarned = await prisma.$transaction(async (tx) => {
      // Step 1: ensure MissionProgress row exists (idempotent upsert to ACTIVE)
      await tx.missionProgress.upsert({
        where: { childId_missionId: { childId: child.id, missionId: mission.id } },
        create: { childId: child.id, missionId: mission.id, status: "ACTIVE" },
        update: {},
      })

      // Step 2: atomically flip ACTIVE → COMPLETED; count=0 means already done
      const updated = await tx.missionProgress.updateMany({
        where: {
          childId: child.id,
          missionId: mission.id,
          status: { not: "COMPLETED" },
        },
        data: { status: "COMPLETED", completedAt: new Date() },
      })

      if (updated.count === 0) return 0

      // Step 3: atomically increment XP, then read back to compute level
      const updatedChild = await tx.childProfile.update({
        where: { id: child.id },
        data: { xp: { increment: MISSION_XP }, lastActiveAt: new Date() },
        select: { xp: true },
      })
      const newLevel = xpToLevel(updatedChild.xp)
      await tx.childProfile.update({
        where: { id: child.id },
        data: { level: newLevel },
      })

      logger.mission.info("Mission completed, XP awarded", {
        childId: child.id,
        missionTitle,
        xpEarned: MISSION_XP,
        newXp: updatedChild.xp,
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
