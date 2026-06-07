"use server"

import { prisma } from "@/src/lib/db"
import { requireAuth } from "@/src/lib/auth/guards"
import { XP_REWARDS, xpToLevel, quizXpReward } from "@/src/lib/learning/xp"
import { computeStreakUpdate } from "@/src/lib/learning/streak"
import { computeNewBadges } from "@/src/lib/learning/badges"
import type { QuizAnswer, QuizResult } from "@/src/lib/learning/types"

export async function submitQuiz(quizId: string, answers: QuizAnswer[]): Promise<QuizResult> {
  const session = await requireAuth()

  if (session.user.role !== "CHILD") {
    throw new Error("Only children can submit quizzes")
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

  const quiz = await prisma.quiz.findFirst({
    where: { id: quizId },
    include: {
      questions: {
        where: { deletedAt: null },
        select: { id: true, correctAnswer: true, type: true },
      },
    },
  })

  if (!quiz) throw new Error("Quiz not found")

  // Grade answers
  let correctCount = 0
  const totalCount = quiz.questions.length

  for (const question of quiz.questions) {
    const submitted = answers.find((a) => a.questionId === question.id)
    if (!submitted) continue

    const correct = question.correctAnswer
    const given = submitted.answer

    if (Array.isArray(given)) {
      const correctArr = Array.isArray(correct) ? correct : [correct]
      const sortedCorrect = [...correctArr].sort().join(",")
      const sortedGiven = [...given].sort().join(",")
      if (sortedCorrect === sortedGiven) correctCount++
    } else {
      if (given === correct) correctCount++
    }
  }

  const score = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0
  const passed = score >= quiz.passingScore
  const isPerfect = score === 100

  const xpEarned = passed ? quizXpReward(score) : 0

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
    streakDays:
      streakUpdate.action === "increment" || streakUpdate.action === "reset"
        ? streakUpdate.newStreak
        : child.streakDays,
    lessonsCompleted: lessonsCompletedCount,
    quizzesCompleted: quizzesCompletedCount + (passed ? 1 : 0),
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
    await tx.quizAttempt.create({
      data: {
        childId: child.id,
        quizId,
        score,
        passed,
        isPerfect,
        xpEarned,
        answers: answers as object[],
      },
    })

    const streakData =
      streakUpdate.action === "increment"
        ? { streakDays: streakUpdate.newStreak, longestStreak: streakUpdate.newLongest, lastStreakDate: new Date() }
        : streakUpdate.action === "reset"
        ? { streakDays: 1, longestStreak: streakUpdate.newLongest, lastStreakDate: new Date() }
        : {}

    await tx.childProfile.update({
      where: { id: child.id },
      data: { xp: finalTotalXp, ...streakData },
    })

    if (newBadgeIds.length > 0) {
      await tx.childBadge.createMany({
        data: newBadgeIds.map((b) => ({ childId: child.id, badgeId: b.id })),
        skipDuplicates: true,
      })
    }
  })

  return {
    score,
    passed,
    isPerfect,
    xpEarned: xpEarned + badgeXp,
    correctCount,
    totalCount,
    newBadges: newBadgeCodes,
    levelUp: finalLevel > oldLevel,
    newLevel: finalLevel,
  }
}
