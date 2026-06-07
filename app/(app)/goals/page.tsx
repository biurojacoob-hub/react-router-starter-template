import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = { title: "Cele" };

const goals = [
  { id: "1", title: "Nowa gra", emoji: "🎮", target: 200, current: 134, deadline: "2025-08-01" },
  { id: "2", title: "Rower górski", emoji: "🚲", target: 800, current: 120, deadline: "2025-12-31" },
  { id: "3", title: "Książki na wakacje", emoji: "📚", target: 80, current: 80, deadline: null },
];

export default function GoalsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Cele oszczędnościowe</h1>
          <p className="text-muted-foreground text-sm mt-1">Odkładaj na marzenia krok po kroku</p>
        </div>
        <Button variant="gradient">
          <Plus className="h-4 w-4 mr-2" /> Nowy cel
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {goals.map((goal) => {
          const percent = Math.min(100, Math.round((goal.current / goal.target) * 100));
          const done = percent === 100;
          return (
            <Card key={goal.id} className={done ? "border-emerald-300 bg-emerald-50/30 dark:bg-emerald-900/10" : ""}>
              <CardContent className="p-6">
                <div className="text-4xl mb-3">{goal.emoji}</div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold">{goal.title}</h3>
                  {done && <Badge variant="success">Osiągnięty!</Badge>}
                </div>
                <div className="text-sm text-muted-foreground mb-4">
                  {formatCurrency(goal.current)} z {formatCurrency(goal.target)}
                  {goal.deadline && ` · do ${new Date(goal.deadline).toLocaleDateString("pl-PL")}`}
                </div>
                <Progress value={percent} className="h-3 mb-2" indicatorClassName={done ? "bg-emerald-500" : "bg-sky-500"} />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">{percent}%</span>
                  {!done && (
                    <Button size="sm" variant="outline">Dodaj środki</Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}

        {/* Add new goal card */}
        <Card className="border-dashed cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
          <CardContent className="p-6 flex flex-col items-center justify-center h-full min-h-[200px] text-muted-foreground">
            <Plus className="h-8 w-8 mb-2" />
            <p className="text-sm font-medium">Dodaj nowy cel</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
