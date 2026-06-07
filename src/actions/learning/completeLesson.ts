"use server"

import { prisma } from "@/src/lib/db"
import { requireAuth } from "@/src/lib/auth/guards"
import { XP_REWARDS, xpToLevel } from "@/src/lib/learning/xp"
import { computeStreakUpdate } from "@/src/lib/learning/streak"
import { computeNewBadges } from "@/src/lib/learning/badges"
import type { CompleteLessonResult } from "@/src/lib/learning/types"

export async function completeLesson(lessonId: string): Promise<CompleteLessonResult> {
  const session = await requireAuth()

  if (session.user.role !== "CHILD") {
    throw new Error("Only children can complete lessons")
  }

  const child = await prisma.childProfile.findFirst({
    where: { userId: session.user.id, deletedAt: null },
    select: {
      id: true,
      xp: true,
      streakDays: true,
      longestStreak: true,
      lastStreakDate: true,
      badges: { select: { badge: { select: { code: true } } } },
    },
  })

  if (!child) throw new Error("Child profile not found")

  const lesson = await prisma.lesson.findFirst({
    where: { id: lessonId, published: true, deletedAt: null },
    select: { id: true, xpReward: true },
  })

  if (!lesson) throw new Error("Lesson not found")

  const existingProgress = await prisma.lessonProgress.findFirst({
    where: { childId: child.id, lessonId },
    select: { id: true, completed: true },
  })

  const alreadyCompleted = existingProgress?.completed ?? false
  const xpEarned = alreadyCompleted ? 0 : XP_REWARDS.LESSON_COMPLETE

  const streakUpdate = computeStreakUpdate(
    child.lastStreakDate,
    child.streakDays,
    child.longestStreak
  )

  const newTotalXp = child.xp + xpEarned
  const oldLevel = xpToLevel(child.xp)
  const newLevel = xpToLevel(newTotalXp)

  const earnedBadgeCodes = child.badges.map((b) => b.badge.code)
  const lessonsCompletedCount = await prisma.lessonProgress.count({
    where: { childId: child.id, completed: true },
  })
  const quizzesCompletedCount = await prisma.quizAttempt.count({
    where: { childId: child.id, passed: true },
  })

  const newBadgeCodes = computeNewBadges({
    xp: newTotalXp,
    streakDays: streakUpdate.action === "increment" || streakUpdate.action === "reset"
      ? streakUpdate.newStreak
      : child.streakDays,
    lessonsCompleted: lessonsCompletedCount + (alreadyCompleted ? 0 : 1),
    quizzesCompleted: quizzesCompletedCount,
    earnedBadgeCodes,
  })

  const newBadgeIds = newBadgeCodes.length > 0
    ? await prisma.badge.findMany({
        where: { code: { in: newBadgeCodes } },
        select: { id: true, code: true, xpReward: true },
      })
    : []

  const badgeXp = newBadgeIds.reduce((sum, b) => sum + b.xpReward, 0)
  const finalTotalXp = newTotalXp + badgeXp
  const finalLevel = xpToLevel(finalTotalXp)

  await prisma.$transaction(async (tx) => {
    if (existingProgress) {
      if (!alreadyCompleted) {
        await tx.lessonProgress.update({
          where: { id: existingProgress.id },
          data: { completed: true, xpEarned },
        })
      }
    } else {
      await tx.lessonProgress.create({
        data: {
          childId: child.id,
          lessonId,
          completed: true,
          xpEarned,
        },
      })
    }

    const streakData =
      streakUpdate.action === "increment"
        ? {
            streakDays: streakUpdate.newStreak,
            longestStreak: streakUpdate.newLongest,
            lastStreakDate: new Date(),
          }
        : streakUpdate.action === "reset"
        ? {
            streakDays: 1,
            longestStreak: streakUpdate.newLongest,
            lastStreakDate: new Date(),
          }
        : {}

    await tx.childProfile.update({
      where: { id: child.id },
      data: {
        xp: finalTotalXp,
        ...streakData,
      },
    })

    if (newBadgeIds.length > 0) {
      await tx.childBadge.createMany({
        data: newBadgeIds.map((b) => ({ childId: child.id, badgeId: b.id })),
        skipDuplicates: true,
      })
    }
  })

  return {
    xpEarned: xpEarned + badgeXp,
    newLevel: finalLevel,
    levelUp: finalLevel > oldLevel,
    newBadges: newBadgeCodes,
    streakDays:
      streakUpdate.action === "increment" || streakUpdate.action === "reset"
        ? streakUpdate.newStreak
        : child.streakDays,
    streakIncremented: streakUpdate.action === "increment" || streakUpdate.action === "reset",
  }
}
