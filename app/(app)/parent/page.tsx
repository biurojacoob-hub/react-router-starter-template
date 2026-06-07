import type { Metadata } from "next";
import { Users, TrendingUp, Bell, Shield, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const metadata: Metadata = { title: "Panel rodzica" };

const children = [
  { name: "Zosia", age: 12, level: 5, xp: 1240, streak: 7, lessonsCompleted: 12, goalsActive: 2 },
];

const recentActivity = [
  { text: 'Zosia ukończyła lekcję "Czym jest budżet"', time: "2h temu", type: "lesson" },
  { text: "Zosia zdobyła odznakę Oszczędny Mistrz", time: "wczoraj", type: "badge" },
  { text: 'Cel "Nowa gra" — postęp 67%', time: "2 dni temu", type: "goal" },
];

export default function ParentPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Panel rodzica</h1>
          <p className="text-muted-foreground text-sm mt-1">Śledź postępy i zarządzaj kontem rodziny</p>
        </div>
        <Button variant="gradient">
          <Plus className="h-4 w-4 mr-2" /> Dodaj dziecko
        </Button>
      </div>

      {/* Child profiles */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {children.map((child) => (
          <Card key={child.name}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="h-14 w-14">
                  <AvatarFallback className="gradient-brand text-white text-lg font-bold">
                    {child.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold text-lg">{child.name}</h3>
                  <p className="text-sm text-muted-foreground">{child.age} lat · Poziom {child.level}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="success" className="text-[10px]">🔥 {child.streak} dni</Badge>
                    <Badge variant="purple" className="text-[10px]">⚡ {child.xp} XP</Badge>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  { label: "Lekcje", value: child.lessonsCompleted },
                  { label: "Aktywne cele", value: child.goalsActive },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl bg-muted/50 p-3 text-center">
                    <div className="text-xl font-bold">{s.value}</div>
                    <div className="text-xs text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                <span>Postęp do poziomu {child.level + 1}</span>
                <span>62%</span>
              </div>
              <Progress value={62} className="h-2" indicatorClassName="bg-sky-500" />
              <Button variant="outline" size="sm" className="w-full mt-4">
                Zobacz szczegóły
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Overview panels */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {[
          { icon: TrendingUp, title: "Raporty postępu", desc: "Tygodniowe i miesięczne podsumowania aktywności dziecka.", color: "text-sky-600", bg: "bg-sky-50 dark:bg-sky-900/20" },
          { icon: Bell, title: "Powiadomienia", desc: "Alerty o ukończonych lekcjach, misjach i osiągnięciach.", color: "text-violet-600", bg: "bg-violet-50 dark:bg-violet-900/20" },
          { icon: Shield, title: "Kontrola rodzicielska", desc: "Zarządzaj dostępem, czasem nauki i nagrodami.", color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.title} className="cursor-pointer hover:-translate-y-1 transition-all">
              <CardContent className="p-6">
                <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${item.bg} mb-3`}>
                  <Icon className={`h-5 w-5 ${item.color}`} />
                </div>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Ostatnia aktywność</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentActivity.map((item, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b last:border-0">
              <div className="h-2 w-2 rounded-full bg-primary shrink-0" />
              <p className="flex-1 text-sm">{item.text}</p>
              <span className="text-xs text-muted-foreground shrink-0">{item.time}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
