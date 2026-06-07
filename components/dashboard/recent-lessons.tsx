import Link from "next/link";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const lessons = [
  {
    id: "1",
    title: "Czym jest budżet domowy?",
    category: "Oszczędzanie",
    duration: 8,
    progress: 100,
    xp: 50,
  },
  {
    id: "2",
    title: "Potrzeby vs zachcianki",
    category: "Wydawanie",
    duration: 10,
    progress: 60,
    xp: 60,
  },
  {
    id: "3",
    title: "Jak działa kieszonkowe?",
    category: "Zarabianie",
    duration: 7,
    progress: 0,
    xp: 45,
  },
];

const categoryColors: Record<string, string> = {
  Oszczędzanie: "success",
  Wydawanie: "warning",
  Zarabianie: "purple",
  Inwestowanie: "default",
};

export function RecentLessons() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">Ostatnie lekcje</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/lessons">
            Wszystkie <ArrowRight className="ml-1 h-3.5 w-3.5" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="flex items-start gap-4 rounded-xl p-3 transition-colors hover:bg-muted/50"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 dark:bg-sky-900/20">
              <BookOpen className="h-5 w-5 text-sky-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm font-semibold truncate">{lesson.title}</p>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Badge
                  variant={
                    (categoryColors[lesson.category] as "success" | "warning" | "purple" | "default") ||
                    "default"
                  }
                  className="text-[10px] h-4"
                >
                  {lesson.category}
                </Badge>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {lesson.duration} min
                </span>
                <span className="text-xs text-muted-foreground">
                  +{lesson.xp} XP
                </span>
              </div>
              {lesson.progress > 0 && lesson.progress < 100 && (
                <Progress
                  value={lesson.progress}
                  className="h-1.5"
                  indicatorClassName="bg-sky-500"
                />
              )}
              {lesson.progress === 100 && (
                <span className="text-xs text-emerald-600 font-medium">
                  ✓ Ukończona
                </span>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
