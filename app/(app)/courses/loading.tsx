import { LessonCardSkeleton } from "@/src/components/ui/SkeletonLoaders"

export default function CoursesLoading() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <LessonCardSkeleton key={i} />
      ))}
    </div>
  )
}
