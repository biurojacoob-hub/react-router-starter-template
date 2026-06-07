import type { Metadata } from "next";
import { Target, Lock, Clock, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export const metadata: Metadata = { title: "Misje" };

const missions = [
  { id: "1", title: "Tydzień bez impulsywnych zakupów", description: "Przez 7 dni zastanów się przed każdym zakupem czy to potrzeba czy zachcianka.", xp: 150, coins: 20, daysLeft: 3, progress: 57, status: "active" },
  { id: "2", title: "Odłóż 10% kieszonkowego", description: "Przez cały miesiąc odkładaj co najmniej 10% swojego kieszonkowego.", xp: 200, coins: 30, daysLeft: 18, progress: 25, status: "active" },
  { id: "3", title: "Ukończ 5 lekcji o inwestowaniu", description: "Poznaj podstawy inwestowania przez serię dedykowanych lekcji.", xp: 300, coins: 50, daysLeft: null, progress: 40, status: "active" },
  { id: "4", title: "Ustaw swój pierwszy cel oszczędnościowy", description: "Stwórz cel oszczędnościowy i zacznij do niego odkładać.", xp: 100, coins: 15, daysLeft: null, progress: 100, status: "completed" },
  { id: "5", title: "Zaawansowany budżet domowy", description: "Naucz się tworzyć miesięczny budżet jak prawdziwy ekspert finansowy.", xp: 400, coins: 60, daysLeft: null, progress: 0, status: "locked" },
];

export default function MissionsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Misje</h1>
        <p className="text-muted-foreground text-sm mt-1">Wyzwania, które kształtują dobre nawyki finansowe</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Aktywne", value: 3, color: "text-violet-600" },
          { label: "Ukończone", value: 7, color: "text-emerald-600" },
          { label: "Dostępne", value: 2, color: "text-amber-600" },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4 text-center">
              <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mission list */}
      <div className="space-y-4">
        {missions.map((mission) => (
          <Card
            key={mission.id}
            className={mission.status === "locked" ? "opacity-60" : ""}
          >
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                  mission.status === "completed" ? "bg-emerald-50 dark:bg-emerald-900/20" :
                  mission.status === "locked" ? "bg-muted" :
                  "bg-violet-50 dark:bg-violet-900/20"
                }`}>
                  {mission.status === "locked" ? (
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <Target className={`h-5 w-5 ${mission.status === "completed" ? "text-emerald-600" : "text-violet-600"}`} />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-sm">{mission.title}</h3>
                    <div className="flex gap-1.5 shrink-0">
                      <Badge variant="purple" className="text-[10px] h-4">+{mission.xp} XP</Badge>
                      <Badge variant="warning" className="text-[10px] h-4">🪙 {mission.coins}</Badge>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{mission.description}</p>

                  {mission.status === "active" && (
                    <div className="flex items-center gap-3">
                      <Progress value={mission.progress} className="flex-1 h-2" indicatorClassName="bg-violet-500" />
                      <span className="text-xs font-medium w-8">{mission.progress}%</span>
                      {mission.daysLeft && (
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" /> {mission.daysLeft}d
                        </span>
                      )}
                    </div>
                  )}
                  {mission.status === "completed" && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-emerald-600 font-semibold">✓ Misja ukończona!</span>
                    </div>
                  )}
                  {mission.status === "locked" && (
                    <div className="flex items-center gap-2">
                      <Zap className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Odblokuj po ukończeniu poprzednich misji</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
