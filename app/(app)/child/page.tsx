import type { Metadata } from "next";
import { Star, Flame, Trophy, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DEMO_USER } from "@/lib/constants";

export const metadata: Metadata = { title: "Panel dziecka" };

const badges = [
  { emoji: "🐷", name: "Oszczędny Mistrz", earned: true },
  { emoji: "📚", name: "Chętny Uczeń", earned: true },
  { emoji: "🎯", name: "Wypełniacz Misji", earned: true },
  { emoji: "🚀", name: "Szybki Start", earned: true },
  { emoji: "💰", name: "Bogacz Juniorzy", earned: false },
  { emoji: "🏆", name: "Ekspert Finansów", earned: false },
];

export default function ChildPage() {
  return (
    <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
      {/* Profile card */}
      <Card className="overflow-hidden">
        <div className="gradient-brand h-24" />
        <CardContent className="px-6 pb-6 -mt-10">
          <div className="flex items-end gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-background bg-white text-4xl shadow-lg">
              👧
            </div>
            <div className="mb-1">
              <h2 className="text-2xl font-bold">{DEMO_USER.childName}</h2>
              <p className="text-muted-foreground text-sm">{DEMO_USER.childAge} lat</p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { icon: Zap, label: "XP", value: DEMO_USER.xp, color: "text-amber-600" },
              { icon: Star, label: "Poziom", value: DEMO_USER.level, color: "text-sky-600" },
              { icon: Flame, label: "Passa", value: `${DEMO_USER.streak}d`, color: "text-rose-500" },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="rounded-xl bg-muted/50 p-3 text-center">
                  <Icon className={`h-5 w-5 mx-auto mb-1 ${s.color}`} />
                  <div className="font-bold">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              );
            })}
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-muted-foreground">Do poziomu {DEMO_USER.level + 1}</span>
              <span className="font-medium">62%</span>
            </div>
            <Progress value={62} className="h-2.5" indicatorClassName="gradient-brand" />
          </div>
        </CardContent>
      </Card>

      {/* Badges */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Trophy className="h-4 w-4 text-amber-500" /> Odznaki
            </h3>
            <Badge variant="secondary">{badges.filter((b) => b.earned).length}/{badges.length}</Badge>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {badges.map((badge) => (
              <div
                key={badge.name}
                className={`rounded-xl p-3 text-center transition-all ${
                  badge.earned
                    ? "bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800"
                    : "bg-muted/30 opacity-40 grayscale"
                }`}
              >
                <div className="text-2xl mb-1">{badge.emoji}</div>
                <div className="text-xs font-medium leading-tight">{badge.name}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button variant="gradient" size="lg" className="h-14">
          📚 Zacznij lekcję
        </Button>
        <Button variant="outline" size="lg" className="h-14">
          🎯 Sprawdź misje
        </Button>
      </div>
    </div>
  );
}
