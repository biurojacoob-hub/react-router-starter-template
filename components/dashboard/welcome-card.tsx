import { Flame, Star, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DEMO_USER } from "@/lib/constants";

export function WelcomeCard() {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Dzień dobry" : hour < 18 ? "Cześć" : "Dobry wieczór";

  return (
    <Card className="relative overflow-hidden border-0 gradient-brand text-white">
      {/* Background decoration */}
      <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 translate-x-16 -translate-y-8 rounded-full bg-white/10 blur-2xl" />
      <div className="pointer-events-none absolute bottom-0 right-20 h-32 w-32 translate-y-8 rounded-full bg-white/10 blur-xl" />

      <CardContent className="relative p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-white/70 text-sm font-medium">{greeting}, {DEMO_USER.name}!</p>
            <h2 className="mt-1 text-2xl md:text-3xl font-extrabold">
              Zosia robi świetne postępy! 🎉
            </h2>
            <p className="mt-2 text-white/80 text-sm max-w-md">
              Twoja córka ukończyła wczoraj 2 lekcje i zdobyła 80 XP.
              Zostało jeszcze 3 lekcje do następnego poziomu.
            </p>
          </div>

          {/* Avatar placeholder */}
          <div className="hidden sm:flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/20 text-3xl">
            👧
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-6 flex flex-wrap gap-3">
          <Badge className="bg-white/20 text-white border-0 gap-1.5 py-1.5 px-3">
            <Flame className="h-3.5 w-3.5 text-amber-300" />
            {DEMO_USER.streak} dni passa
          </Badge>
          <Badge className="bg-white/20 text-white border-0 gap-1.5 py-1.5 px-3">
            <Zap className="h-3.5 w-3.5 text-yellow-300" />
            {DEMO_USER.xp} XP
          </Badge>
          <Badge className="bg-white/20 text-white border-0 gap-1.5 py-1.5 px-3">
            <Star className="h-3.5 w-3.5 text-yellow-300" />
            Poziom {DEMO_USER.level}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
