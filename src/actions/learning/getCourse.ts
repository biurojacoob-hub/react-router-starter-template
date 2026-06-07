"use server"

import { prisma } from "@/src/lib/db"
import { requireAuth } from "@/src/lib/auth/guards"
import type { LessonWithProgress } from "@/src/lib/learning/types"
import type { CourseData } from "@/src/lib/learning/types"

export type CourseDetail = CourseData & {
  lessons: LessonWithProgress[]
}

export async function getCourse(courseId: string): Promise<CourseDetail | null> {
  const session = await requireAuth()

  const child = session.user.role === "CHILD"
    ? await prisma.childProfile.findFirst({
        where: { userId: session.user.id, deletedAt: null },
        select: { id: true },
      })
    : null

  const course = await prisma.course.findFirst({
    where: { id: courseId, deletedAt: null },
    include: {
      lessons: {
        where: { published: true, deletedAt: null },
        orderBy: { orderIndex: "asc" },
        include: {
          contentBlocks: { orderBy: { orderIndex: "asc" } },
          quiz: {
            include: {
              questions: {
                where: { deletedAt: null },
                orderBy: { orderIndex: "asc" },
                select: {
                  id: true, type: true, question: true,
                  options: true, explanation: true, orderIndex: true,
                  // never expose correctAnswer to client via this query
                },
              },
            },
          },
          progress: child
            ? { where: { childId: child.id }, select: { completed: true, score: true, xpEarned: true } }
            : false,
        },
      },
    },
  })

  if (!course) return null

  const lessons = course.lessons.map((l) => {
    const prog = child ? (l.progress[0] ?? null) : null
    return {
      id: l.id,
      code: l.code,
      title: l.title,
      description: l.description,
      orderIndex: l.orderIndex,
      durationMinutes: l.durationMinutes,
      xpReward: l.xpReward,
      published: l.published,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      contentBlocks: l.contentBlocks as any,
      quiz: l.quiz
        ? {
            id: l.quiz.id,
            passingScore: l.quiz.passingScore,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            questions: l.quiz.questions as any,
          }
        : null,
      progress: prog ? { completed: prog.completed, score: prog.score, xpEarned: prog.xpEarned } : null,
    } satisfies LessonWithProgress
  })

  const completedCount = lessons.filter((l) => l.progress?.completed).length

  return {
    id: course.id,
    code: course.code,
    title: course.title,
    description: course.description,
    ageGroup: course.ageGroup,
    orderIndex: course.orderIndex,
    lessonCount: lessons.length,
    completedCount,
    completionPercent: lessons.length > 0 ? Math.round((completedCount / lessons.length) * 100) : 0,
    lessons,
  }
}
