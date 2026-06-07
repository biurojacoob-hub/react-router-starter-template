"use server"

import { prisma } from "@/src/lib/db"
import { requireAuth } from "@/src/lib/auth/guards"
import type { CourseData } from "@/src/lib/learning/types"
import type { AgeGroup } from "@prisma/client"

export async function getCourses(ageGroup?: AgeGroup): Promise<CourseData[]> {
  const session = await requireAuth()

  // Resolve childId from session — works for CHILD role or parent viewing
  const child = session.user.role === "CHILD"
    ? await prisma.childProfile.findFirst({
        where: { userId: session.user.id, deletedAt: null },
        select: { id: true, ageGroup: true },
      })
    : null

  const resolvedAgeGroup = ageGroup ?? child?.ageGroup

  const courses = await prisma.course.findMany({
    where: {
      ...(resolvedAgeGroup ? { ageGroup: resolvedAgeGroup } : {}),
      deletedAt: null,
    },
    orderBy: { orderIndex: "asc" },
    include: {
      lessons: {
        where: { published: true, deletedAt: null },
        select: {
          id: true,
          progress: child
            ? { where: { childId: child.id }, select: { completed: true } }
            : false,
        },
      },
    },
  })

  return courses.map((c) => {
    const lessons = c.lessons
    const completedCount = child
      ? lessons.filter((l) => l.progress.some((p) => p.completed)).length
      : 0
    const lessonCount = lessons.length

    return {
      id: c.id,
      code: c.code,
      title: c.title,
      description: c.description,
      ageGroup: c.ageGroup,
      orderIndex: c.orderIndex,
      lessonCount,
      completedCount,
      completionPercent: lessonCount > 0 ? Math.round((completedCount / lessonCount) * 100) : 0,
    }
  })
}
