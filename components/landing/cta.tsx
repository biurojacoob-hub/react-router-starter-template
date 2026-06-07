import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="section">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl gradient-brand px-8 py-16 md:px-16 text-center text-white">
          {/* Background decoration */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-2xl">
            <div className="mb-4 text-5xl">🚀</div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
              Zacznij budować finansową przyszłość Twojej rodziny już dziś
            </h2>
            <p className="text-lg text-white/80 mb-8 text-balance">
              Dołącz do 2,400+ rodzin, które już korzystają z Family Finance Academy.
              Pierwsze 14 dni całkowicie bezpłatnie.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="xl"
                className="bg-white text-sky-600 hover:bg-white/90 font-bold shadow-xl"
                asChild
              >
                <Link href="/dashboard">
                  Zacznij bezpłatnie
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="xl"
                variant="ghost"
                className="text-white hover:bg-white/10 border border-white/30"
                asChild
              >
                <Link href="/pricing">Zobacz wszystkie plany</Link>
              </Button>
            </div>

            <p className="mt-6 text-sm text-white/60">
              Nie wymagamy karty kredytowej · Anuluj w każdej chwili
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
