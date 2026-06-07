import type { Metadata } from "next";
import Link from "next/link";
import { Check, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/shared/section-header";
import { PRICING_PLANS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Cennik",
  description: "Wybierz plan dla swojej rodziny. Zacznij za darmo.",
};

const faqs = [
  {
    q: "Czy mogę przetestować przed zakupem?",
    a: "Tak! Plan Starter jest bezpłatny na zawsze. Plany płatne oferują 14 dni bezpłatnego okresu próbnego.",
  },
  {
    q: "Ile dzieci mogę dodać?",
    a: "W planie Rodzina i Pro możesz dodać nieograniczoną liczbę dzieci.",
  },
  {
    q: "Czy mogę anulować w dowolnym momencie?",
    a: "Oczywiście. Anulacja jest prosta i dostępna z poziomu ustawień konta.",
  },
  {
    q: "Czy dane moich dzieci są bezpieczne?",
    a: "Tak. Jesteśmy zgodni z RODO. Nie sprzedajemy danych i nie wyświetlamy reklam dzieciom.",
  },
];

export default function PricingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="section pb-0">
        <div className="container">
          <SectionHeader
            eyebrow="Cennik"
            title="Prosty, uczciwy cennik"
            description="Bez ukrytych opłat. Zacznij za darmo, uaktualnij gdy będziesz gotowy."
          />

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            {PRICING_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={cn(
                  "relative rounded-2xl border p-8",
                  plan.highlighted
                    ? "border-primary shadow-2xl shadow-primary/10 bg-card"
                    : "bg-card hover:shadow-lg transition-shadow"
                )}
              >
                {plan.highlighted && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-brand text-white border-0">
                    Najpopularniejszy
                  </Badge>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-5xl font-extrabold">{plan.price}</span>
                    <span className="text-muted-foreground text-lg">zł</span>
                    <span className="text-muted-foreground text-sm">/mies.</span>
                  </div>
                  {plan.price > 0 && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      lub {plan.price * 10} zł/rok (2 miesiące gratis)
                    </p>
                  )}
                </div>

                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.highlighted ? "gradient" : "outline"}
                  className="w-full"
                  size="lg"
                  asChild
                >
                  <Link href="/dashboard">{plan.cta}</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container max-w-3xl">
          <SectionHeader
            eyebrow="FAQ"
            title="Często zadawane pytania"
          />
          <div className="mt-10 divide-y">
            {faqs.map((faq) => (
              <div key={faq.q} className="py-6">
                <div className="flex items-start gap-3">
                  <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <h4 className="font-semibold mb-1">{faq.q}</h4>
                    <p className="text-sm text-muted-foreground">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
