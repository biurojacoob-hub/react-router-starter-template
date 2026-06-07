import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/lib/utils";

const goals = [
  {
    id: "1",
    title: "Nowa gra",
    emoji: "🎮",
    targetAmount: 200,
    currentAmount: 134,
  },
  {
    id: "2",
    title: "Rower",
    emoji: "🚲",
    targetAmount: 800,
    currentAmount: 120,
  },
];

export function SavingsGoalWidget() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">Cele oszczędnościowe</CardTitle>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="h-7 w-7" asChild>
            <Link href="/goals">
              <Plus className="h-3.5 w-3.5" />
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/goals">
              Więcej <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        {goals.map((goal) => {
          const percent = Math.round((goal.currentAmount / goal.targetAmount) * 100);
          return (
            <div key={goal.id}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{goal.emoji}</span>
                  <span className="text-sm font-semibold">{goal.title}</span>
                </div>
                <span className="text-xs text-muted-foreground font-medium">
                  {percent}%
                </span>
              </div>
              <Progress
                value={percent}
                className="h-2.5 mb-1.5"
                indicatorClassName="bg-emerald-500"
              />
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {formatCurrency(goal.currentAmount)} odłożone
                </span>
                <span className="text-xs font-medium">
                  cel: {formatCurrency(goal.targetAmount)}
                </span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
