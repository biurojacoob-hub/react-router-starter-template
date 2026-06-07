import { cn } from "@/lib/utils"

function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse rounded-md bg-muted", className)} />
  )
}

export function LessonCardSkeleton() {
  return (
    <div className="rounded-2xl border bg-card p-5 space-y-3">
      <div className="flex items-start gap-3">
        <Skeleton className="h-12 w-12 rounded-xl flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-2 w-full rounded-full" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-12 rounded-full" />
      </div>
    </div>
  )
}

export function ProfileSkeleton() {
  return (
    <div className="rounded-2xl border bg-card overflow-hidden">
      <Skeleton className="h-24 w-full" />
      <div className="px-6 pb-6 -mt-8 space-y-3">
        <Skeleton className="h-20 w-20 rounded-3xl" />
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-full" />
      </div>
    </div>
  )
}

export function BadgeGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col items-center gap-1 p-2">
          <Skeleton className="h-14 w-14 rounded-2xl" />
          <Skeleton className="h-3 w-12" />
        </div>
      ))}
    </div>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Welcome card */}
      <Skeleton className="h-32 w-full rounded-2xl" />
      {/* Stats row */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-2xl" />
        ))}
      </div>
      {/* Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <LessonCardSkeleton />
          <LessonCardSkeleton />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-40 rounded-2xl" />
          <Skeleton className="h-32 rounded-2xl" />
        </div>
      </div>
    </div>
  )
}

export function MentorSkeleton() {
  return (
    <div className="space-y-4 p-4">
      {/* AI bubble */}
      <div className="flex gap-3">
        <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
      {/* User bubble */}
      <div className="flex gap-3 flex-row-reverse">
        <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-2/3 ml-auto" />
        </div>
      </div>
    </div>
  )
}
