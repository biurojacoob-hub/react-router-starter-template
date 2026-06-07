import {
  BookOpen,
  Target,
  PiggyBank,
  Sparkles,
  BarChart3,
  Shield,
} from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";

const features = [
  {
    icon: BookOpen,
    title: "Interaktywne lekcje",
    description:
      "Angażujące lekcje dostosowane do wieku dziecka. Od podstaw budżetowania po pierwsze inwestycje.",
    color: "text-sky-600",
    bg: "bg-sky-50 dark:bg-sky-900/20",
  },
  {
    icon: Target,
    title: "System misji",
    description:
      "Grywalizacja motywuje dzieci do nauki przez ciekawe wyzwania, odznaki i nagrody XP.",
    color: "text-violet-600",
    bg: "bg-violet-50 dark:bg-violet-900/20",
  },
  {
    icon: PiggyBank,
    title: "Cele oszczędnościowe",
    description:
      "Dzieci uczą się cierpliwości i planowania, odkładając na wymarzony przedmiot lub cel.",
    color: "text-emerald-600",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
  },
  {
    icon: Sparkles,
    title: "AI Mentor",
    description:
      "Przyjazny asystent AI odpowiada na pytania finansowe językiem zrozumiałym dla dzieci.",
    color: "text-amber-600",
    bg: "bg-amber-50 dark:bg-amber-900/20",
  },
  {
    icon: BarChart3,
    title: "Raporty dla rodziców",
    description:
      "Pełny wgląd w postępy dziecka. Śledź ukończone lekcje, misje i nawyki finansowe.",
    color: "text-rose-600",
    bg: "bg-rose-50 dark:bg-rose-900/20",
  },
  {
    icon: Shield,
    title: "Bezpieczeństwo",
    description:
      "Platforma zgodna z RODO. Brak reklam, pełna kontrola rodzicielska, bezpieczne środowisko.",
    color: "text-indigo-600",
    bg: "bg-indigo-50 dark:bg-indigo-900/20",
  },
];

export function Features() {
  return (
    <section id="features" className="section bg-muted/30">
      <div className="container">
        <SectionHeader
          eyebrow="Funkcje"
          title="Wszystko, czego potrzebuje Twoja rodzina"
          description="Kompletna platforma łącząca naukę, zabawę i narzędzia dla rodziców w jednym miejscu."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative rounded-2xl border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div
                  className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.bg}`}
                >
                  <Icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
