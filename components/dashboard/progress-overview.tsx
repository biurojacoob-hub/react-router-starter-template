import { BookOpen, Target, PiggyBank, Trophy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const stats = [
  {
    label: "Lekcje ukończone",
    value: 12,
    total: 30,
    icon: BookOpen,
    color: "text-sky-600",
    bg: "bg-sky-50 dark:bg-sky-900/20",
    progressColor: "bg-sky-500",
  },
  {
    label: "Misje zrealizowane",
    value: 7,
    total: 15,
    icon: Target,
    color: "text-violet-600",
    bg: "bg-violet-50 dark:bg-violet-900/20",
    progressColor: "bg-violet-500",
  },
  {
    label: "Cel oszczędnościowy",
    value: 67,
    total: 100,
    icon: PiggyBank,
    color: "text-emerald-600",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    progressColor: "bg-emerald-500",
  },
  {
    label: "Odznaki zdobyte",
    value: 5,
    total: 20,
    icon: Trophy,
    color: "text-amber-600",
    bg: "bg-amber-50 dark:bg-amber-900/20",
    progressColor: "bg-amber-500",
  },
];

export function ProgressOverview() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        const percent =
          stat.label === "Cel oszczędnościowy"
            ? stat.value
            : Math.round((stat.value / stat.total) * 100);

        return (
          <Card key={stat.label}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={`rounded-xl p-2.5 ${stat.bg}`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <span className="text-xs text-muted-foreground font-medium">
                  {stat.label === "Cel oszczędnościowy"
                    ? `${stat.value}%`
                    : `${stat.value}/${stat.total}`}
                </span>
              </div>

              <div className="mb-1">
                <span className="text-2xl font-bold">
                  {stat.label === "Cel oszczędnościowy"
                    ? `${stat.value}%`
                    : stat.value}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">{stat.label}</p>

              <Progress
                value={percent}
                className="h-1.5"
                indicatorClassName={stat.progressColor}
              />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
