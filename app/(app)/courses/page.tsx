import type { Metadata } from "next"
import Link from "next/link"
import { getCourses } from "@/src/actions/learning/getCourses"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = { title: "Kursy" }

export default async function CoursesPage() {
  const courses = await getCourses()

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Kursy</h1>
        <p className="text-muted-foreground text-sm mt-1">Wybierz kurs, od którego chcesz zacząć</p>
      </div>

      {courses.length === 0 ? (
        <p className="text-muted-foreground">Brak dostępnych kursów.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Link key={course.id} href={`/courses/${course.id}`}>
              <Card className="h-full cursor-pointer hover:border-primary/60 transition-colors">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base leading-snug">{course.title}</CardTitle>
                    <Badge variant="outline" className="shrink-0 text-xs">
                      {course.ageGroup.replace("_", " ")}
                    </Badge>
                  </div>
                  <CardDescription className="text-xs line-clamp-2">{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{course.lessonCount} lekcji</span>
                    <span>{course.completionPercent}% ukończono</span>
                  </div>
                  <Progress value={course.completionPercent} className="h-1.5" />
                  {course.completedCount > 0 && (
                    <p className="text-xs text-primary font-medium">
                      {course.completedCount} z {course.lessonCount} ukończono
                    </p>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
