import type { Metadata } from "next";
import { User, Bell, Shield, CreditCard, Palette, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = { title: "Ustawienia" };

const settingsSections = [
  {
    icon: User,
    title: "Profil",
    description: "Imię, email, zdjęcie profilowe",
    color: "text-sky-600",
    bg: "bg-sky-50 dark:bg-sky-900/20",
  },
  {
    icon: Bell,
    title: "Powiadomienia",
    description: "Email, push, tygodniowe raporty",
    color: "text-violet-600",
    bg: "bg-violet-50 dark:bg-violet-900/20",
  },
  {
    icon: Shield,
    title: "Prywatność i bezpieczeństwo",
    description: "Hasło, 2FA, dane dzieci",
    color: "text-emerald-600",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
  },
  {
    icon: CreditCard,
    title: "Subskrypcja i płatności",
    description: "Plan, faktury, zmiana metody płatności",
    color: "text-amber-600",
    bg: "bg-amber-50 dark:bg-amber-900/20",
  },
  {
    icon: Palette,
    title: "Wygląd",
    description: "Motyw ciemny/jasny, język, rozmiar tekstu",
    color: "text-rose-600",
    bg: "bg-rose-50 dark:bg-rose-900/20",
  },
  {
    icon: Globe,
    title: "Język i region",
    description: "Język, waluta, format daty",
    color: "text-indigo-600",
    bg: "bg-indigo-50 dark:bg-indigo-900/20",
  },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold">Ustawienia</h1>
        <p className="text-muted-foreground text-sm mt-1">Zarządzaj kontem i preferencjami</p>
      </div>

      <Card>
        <CardContent className="p-0">
          {settingsSections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div key={section.title}>
                <button className="flex w-full items-center gap-4 p-5 transition-colors hover:bg-muted/40 text-left">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${section.bg}`}>
                    <Icon className={`h-5 w-5 ${section.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{section.title}</p>
                    <p className="text-xs text-muted-foreground">{section.description}</p>
                  </div>
                  <span className="text-muted-foreground">›</span>
                </button>
                {index < settingsSections.length - 1 && <Separator />}
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Danger zone */}
      <Card className="border-destructive/30">
        <CardHeader>
          <CardTitle className="text-base text-destructive">Strefa niebezpieczna</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Usuń wszystkie dane dzieci</p>
              <p className="text-xs text-muted-foreground">Tej operacji nie można cofnąć.</p>
            </div>
            <Button variant="outline" size="sm" className="text-destructive border-destructive/30 hover:bg-destructive/5">
              Usuń
            </Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Usuń konto</p>
              <p className="text-xs text-muted-foreground">Trwale usuwa konto i wszystkie dane.</p>
            </div>
            <Button variant="destructive" size="sm">Usuń konto</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
