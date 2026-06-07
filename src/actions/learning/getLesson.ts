"use server"

import { prisma } from "@/src/lib/db"
import { requireAuth } from "@/src/lib/auth/guards"
import type { LessonWithProgress } from "@/src/lib/learning/types"

export type LessonDetail = LessonWithProgress & {
  courseId: string
  courseCode: string
  courseTitle: string
  prevLessonId: string | null
  nextLessonId: string | null
}

export async function getLesson(lessonId: string): Promise<LessonDetail | null> {
  const session = await requireAuth()

  const child = session.user.role === "CHILD"
    ? await prisma.childProfile.findFirst({
        where: { userId: session.user.id, deletedAt: null },
        select: { id: true },
      })
    : null

  const lesson = await prisma.lesson.findFirst({
    where: { id: lessonId, published: true, deletedAt: null },
    include: {
      course: { select: { id: true, code: true, title: true } },
      contentBlocks: { orderBy: { orderIndex: "asc" } },
      quiz: {
        include: {
          questions: {
            where: { deletedAt: null },
            orderBy: { orderIndex: "asc" },
            // correctAnswer intentionally excluded
            select: {
              id: true, type: true, question: true,
              options: true, explanation: true, orderIndex: true,
            },
          },
        },
      },
      progress: child
        ? { where: { childId: child.id }, select: { completed: true, score: true, xpEarned: true } }
        : false,
    },
  })

  if (!lesson) return null

  // Get sibling lessons for prev/next navigation
  const siblings = await prisma.lesson.findMany({
    where: { courseId: lesson.course.id, published: true, deletedAt: null },
    orderBy: { orderIndex: "asc" },
    select: { id: true, orderIndex: true },
  })

  const currentIdx = siblings.findIndex((s) => s.id === lessonId)
  const prevLessonId = currentIdx > 0 ? siblings[currentIdx - 1].id : null
  const nextLessonId = currentIdx < siblings.length - 1 ? siblings[currentIdx + 1].id : null

  const prog = child ? (lesson.progress[0] ?? null) : null

  return {
    id: lesson.id,
    code: lesson.code,
    title: lesson.title,
    description: lesson.description,
    orderIndex: lesson.orderIndex,
    durationMinutes: lesson.durationMinutes,
    xpReward: lesson.xpReward,
    published: lesson.published,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    contentBlocks: lesson.contentBlocks as any,
    quiz: lesson.quiz
      ? {
          id: lesson.quiz.id,
          passingScore: lesson.quiz.passingScore,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          questions: lesson.quiz.questions as any,
        }
      : null,
    progress: prog ? { completed: prog.completed, score: prog.score, xpEarned: prog.xpEarned } : null,
    courseId: lesson.course.id,
    courseCode: lesson.course.code,
    courseTitle: lesson.course.title,
    prevLessonId,
    nextLessonId,
  }
}
