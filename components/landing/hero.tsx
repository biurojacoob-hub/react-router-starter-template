import Link from "next/link";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background gradient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-sky-400/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full bg-violet-400/10 blur-3xl" />
      </div>

      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center">
          {/* Eyebrow badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-1.5 text-sm shadow-sm backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-muted-foreground">
              Platforma #1 dla finansowej edukacji rodzin
            </span>
            <Badge variant="success" className="h-5 text-[10px]">Nowe</Badge>
          </div>

          {/* Headline */}
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl text-balance leading-[1.1] mb-6">
            Naucz dzieci{" "}
            <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
              mądrości finansowej
            </span>{" "}
            przez zabawę
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto text-balance">
            Interaktywne lekcje, misje i cele oszczędnościowe wspierane przez AI —
            razem z rodzicami budujemy fundament finansowej przyszłości Twoich dzieci.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="gradient" size="xl" asChild>
              <Link href="/dashboard">
                Zacznij bezpłatnie
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <Link href="/#how-it-works">
                Jak to działa?
              </Link>
            </Button>
          </div>

          {/* Social proof */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <div className="flex -space-x-2">
                {["MK", "AN", "PW", "JK"].map((initials) => (
                  <div
                    key={initials}
                    className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-background gradient-brand text-white text-[10px] font-bold"
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <span>2,400+ rodzin już korzysta</span>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="ml-1">4.9/5 ocena</span>
            </div>
          </div>
        </div>

        {/* Hero visual — dashboard preview mockup */}
        <div className="mt-16 mx-auto max-w-4xl">
          <div className="relative rounded-2xl border bg-card shadow-2xl shadow-sky-500/10 overflow-hidden">
            {/* Browser bar mockup */}
            <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-amber-400" />
                <div className="h-3 w-3 rounded-full bg-emerald-400" />
              </div>
              <div className="flex-1 mx-4 rounded-md bg-background/80 px-3 py-1 text-xs text-muted-foreground text-center">
                familyfinanceacademy.pl/dashboard
              </div>
            </div>

            {/* Dashboard preview */}
            <div className="p-6 bg-gradient-to-br from-background to-muted/30">
              <div className="grid grid-cols-3 gap-4 mb-4">
                {[
                  { label: "Ukończone lekcje", value: "12", color: "bg-sky-500" },
                  { label: "Aktywne misje", value: "3", color: "bg-violet-500" },
                  { label: "Cel oszczędnościowy", value: "67%", color: "bg-emerald-500" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl border bg-card p-4">
                    <div className={`h-2 w-8 rounded-full ${stat.color} mb-3`} />
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl border bg-card p-4 space-y-3">
                  <div className="h-3 w-24 rounded bg-muted" />
                  <div className="space-y-2">
                    {[70, 45, 90].map((w, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        <div className={`h-2 rounded bg-muted`} style={{ width: `${w}%` }} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl border bg-card p-4 flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl gradient-brand flex items-center justify-center text-white text-xl">
                    🤖
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-2.5 w-24 rounded bg-muted" />
                    <div className="h-2 w-32 rounded bg-muted" />
                    <div className="h-2 w-20 rounded bg-muted" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
