import type { Metadata } from "next";
import { TrendingUp, BookOpen, Brain, Target, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { requireAuth } from "@/src/lib/auth/guards";
import { prisma } from "@/src/lib/db";
import { xpToLevel, levelProgress } from "@/src/lib/learning/xp";

export const metadata: Metadata = { title: "Panel rodzica" };

async function getParentData(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { familyId: true },
  });

  if (!user?.familyId) return { children: [], recentActivity: [], weeklyInsights: [] };

  const children = await prisma.childProfile.findMany({
    where: { familyId: user.familyId, deletedAt: null },
    select: {
      id: true,
      firstName: true,
      ageGroup: true,
      xp: true,
      level: true,
      streakDays: true,
      avatarUrl: true,
      badges: { select: { id: true }, orderBy: { createdAt: "desc" } },
      lessonProgress: {
        where: { completed: true },
        select: { id: true },
      },
      savingsGoals: {
        where: { deletedAt: null },
        select: { id: true },
      },
    },
    orderBy: { createdAt: "asc" },
  });

  const recentActivity = await prisma.lessonProgress.findMany({
    where: {
      child: { familyId: user.familyId, deletedAt: null },
      completed: true,
    },
    select: {
      completedAt: true,
      child: { select: { firstName: true } },
      lesson: { select: { title: true } },
    },
    orderBy: { completedAt: "desc" },
    take: 10,
  });

  // Weekly insight — last 7 days per child
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  const childIds = children.map((c) => c.id);

  const [weekLessons, weekQuizzes, weekMissions] = await Promise.all([
    prisma.lessonProgress.groupBy({
      by: ["childId"],
      where: { childId: { in: childIds }, completed: true, updatedAt: { gte: weekAgo } },
      _count: { id: true },
      _sum: { xpEarned: true },
    }),
    prisma.quizAttempt.groupBy({
      by: ["childId"],
      where: { childId: { in: childIds }, createdAt: { gte: weekAgo } },
      _count: { id: true },
      _avg: { score: true },
    }),
    prisma.missionProgress.groupBy({
      by: ["childId"],
      where: { childId: { in: childIds }, status: "COMPLETED", completedAt: { gte: weekAgo } },
      _count: { id: true },
    }),
  ]);

  const weeklyInsights = children.map((child) => {
    const lessons = weekLessons.find((l) => l.childId === child.id);
    const quizzes = weekQuizzes.find((q) => q.childId === child.id);
    const missions = weekMissions.find((m) => m.childId === child.id);
    return {
      childId: child.id,
      childName: child.firstName,
      lessonsThisWeek: lessons?._count.id ?? 0,
      xpThisWeek: lessons?._sum.xpEarned ?? 0,
      quizzesThisWeek: quizzes?._count.id ?? 0,
      avgQuizScore: quizzes?._avg.score ? Math.round(quizzes._avg.score) : null,
      missionsThisWeek: missions?._count.id ?? 0,
    };
  });

  return { children, recentActivity, weeklyInsights };
}

function timeAgo(date: Date | null): string {
  if (!date) return "";
  const diff = Date.now() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes} min temu`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h temu`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "wczoraj";
  return `${days} dni temu`;
}

export default async function ParentPage() {
  const session = await requireAuth();
  const { children, recentActivity, weeklyInsights } = await getParentData(session.user.id);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Panel rodzica</h1>
        <p className="text-muted-foreground text-sm mt-1">Śledź postępy dzieci w rodzinie</p>
      </div>

      {children.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 gap-4 text-center">
            <div className="text-5xl">👨‍👩‍👧</div>
            <div>
              <h3 className="font-bold text-lg mb-1">Brak dzieci w rodzinie</h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Zaproś dziecko do rodziny lub poczekaj, aż dziecko ukończy onboarding.
              </p>
            </div>
            <p className="text-xs text-muted-foreground">Poproś dziecko o założenie konta — dołączy do rodziny automatycznie.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {children.map((child) => {
            const level = child.level ?? xpToLevel(child.xp);
            const progressPercent = Math.round(levelProgress(child.xp));
            return (
              <Card key={child.id}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="h-14 w-14">
                      <AvatarFallback className="gradient-brand text-white text-lg font-bold">
                        {child.firstName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-bold text-lg">{child.firstName}</h3>
                      <p className="text-sm text-muted-foreground">
                        {child.ageGroup} · Poziom {level}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="success" className="text-[10px]">🔥 {child.streakDays} dni</Badge>
                        <Badge variant="purple" className="text-[10px]">⚡ {child.xp} XP</Badge>
                        {child.badges.length > 0 && (
                          <Badge variant="outline" className="text-[10px]">🏅 {child.badges.length}</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {[
                      { label: "Lekcje", value: child.lessonProgress.length },
                      { label: "Aktywne cele", value: child.savingsGoals.length },
                    ].map((s) => (
                      <div key={s.label} className="rounded-xl bg-muted/50 p-3 text-center">
                        <div className="text-xl font-bold">{s.value}</div>
                        <div className="text-xs text-muted-foreground">{s.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                    <span>Postęp do poziomu {level + 1}</span>
                    <span>{progressPercent}%</span>
                  </div>
                  <Progress value={progressPercent} className="h-2" indicatorClassName="bg-sky-500" />
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {weeklyInsights.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-sky-600" /> Aktywność tego tygodnia
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {weeklyInsights.map((insight) => (
              <div key={insight.childId} className="rounded-xl border p-4">
                <p className="font-semibold mb-3">{insight.childName}</p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    { icon: BookOpen, label: "Lekcje", value: insight.lessonsThisWeek, color: "text-sky-600", bg: "bg-sky-50 dark:bg-sky-900/20" },
                    { icon: Brain, label: "Quizy", value: insight.avgQuizScore !== null ? `${insight.quizzesThisWeek} (śr. ${insight.avgQuizScore}%)` : insight.quizzesThisWeek, color: "text-violet-600", bg: "bg-violet-50 dark:bg-violet-900/20" },
                    { icon: Target, label: "Misje", value: insight.missionsThisWeek, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
                    { icon: Zap, label: "XP", value: `+${insight.xpThisWeek}`, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-900/20" },
                  ].map((s) => {
                    const Icon = s.icon;
                    return (
                      <div key={s.label} className={`rounded-lg p-3 ${s.bg} flex items-center gap-2`}>
                        <Icon className={`h-4 w-4 shrink-0 ${s.color}`} />
                        <div>
                          <div className="text-xs text-muted-foreground">{s.label}</div>
                          <div className="font-bold text-sm">{s.value}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {recentActivity.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Ostatnia aktywność</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-center gap-3 py-2 border-b last:border-0">
                <div className="h-2 w-2 rounded-full bg-primary shrink-0" />
                <p className="flex-1 text-sm">
                  <span className="font-medium">{item.child.firstName}</span> ukończyła lekcję{" "}
                  <span className="font-medium">&ldquo;{item.lesson.title}&rdquo;</span>
                </p>
                <span className="text-xs text-muted-foreground shrink-0">
                  {timeAgo(item.completedAt)}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
