import type { Metadata } from "next";
import { BookOpen, Clock, Filter, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export const metadata: Metadata = { title: "Lekcje" };

const categories = ["Wszystkie", "Oszczędzanie", "Wydawanie", "Zarabianie", "Inwestowanie", "Dawanie"];

const lessons = [
  { id: "1", title: "Czym jest budżet domowy?", category: "Oszczędzanie", difficulty: "Podstawowy", duration: 8, xp: 50, progress: 100 },
  { id: "2", title: "Potrzeby vs zachcianki", category: "Wydawanie", difficulty: "Podstawowy", duration: 10, xp: 60, progress: 60 },
  { id: "3", title: "Jak działa kieszonkowe?", category: "Zarabianie", difficulty: "Podstawowy", duration: 7, xp: 45, progress: 0 },
  { id: "4", title: "Pierwsze kroki w oszczędzaniu", category: "Oszczędzanie", difficulty: "Podstawowy", duration: 12, xp: 70, progress: 0 },
  { id: "5", title: "Co to są akcje?", category: "Inwestowanie", difficulty: "Średni", duration: 15, xp: 100, progress: 0 },
  { id: "6", title: "Pomaganie innym — dlaczego warto?", category: "Dawanie", difficulty: "Podstawowy", duration: 9, xp: 55, progress: 0 },
];

const difficultyVariant: Record<string, "success" | "warning" | "purple"> = {
  Podstawowy: "success",
  Średni: "warning",
  Zaawansowany: "purple",
};

export default function LessonsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Lekcje</h1>
          <p className="text-muted-foreground text-sm mt-1">Nauka finansów krok po kroku</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Search className="h-4 w-4 mr-2" /> Szukaj
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" /> Filtruj
          </Button>
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((cat, i) => (
          <Button key={cat} variant={i === 0 ? "default" : "outline"} size="sm" className="rounded-full">
            {cat}
          </Button>
        ))}
      </div>

      {/* Lessons grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {lessons.map((lesson) => (
          <Card key={lesson.id} className="cursor-pointer group hover:-translate-y-1 transition-all duration-200">
            {/* Thumbnail placeholder */}
            <div className="h-32 rounded-t-2xl bg-gradient-to-br from-sky-100 to-blue-200 dark:from-sky-900/40 dark:to-blue-900/40 flex items-center justify-center text-4xl">
              <BookOpen className="h-10 w-10 text-sky-400" />
            </div>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant={difficultyVariant[lesson.difficulty] ?? "default"} className="text-[10px] h-4">
                  {lesson.difficulty}
                </Badge>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {lesson.duration} min
                </span>
                <span className="text-xs text-muted-foreground ml-auto">+{lesson.xp} XP</span>
              </div>
              <CardTitle className="text-sm font-semibold leading-tight">{lesson.title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <Badge variant="secondary" className="text-[10px] mb-3">{lesson.category}</Badge>
              {lesson.progress > 0 && lesson.progress < 100 && (
                <div>
                  <Progress value={lesson.progress} className="h-1.5" indicatorClassName="bg-sky-500" />
                  <p className="text-xs text-muted-foreground mt-1">{lesson.progress}% ukończone</p>
                </div>
              )}
              {lesson.progress === 100 && (
                <p className="text-xs text-emerald-600 font-semibold">✓ Ukończona</p>
              )}
              {lesson.progress === 0 && (
                <Button size="sm" className="w-full mt-1" variant="outline">Rozpocznij</Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
