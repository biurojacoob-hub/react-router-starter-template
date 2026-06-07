import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/shared/section-header";
import { PRICING_PLANS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function PricingPreview() {
  return (
    <section id="pricing" className="section">
      <div className="container">
        <SectionHeader
          eyebrow="Cennik"
          title="Prosty, uczciwy cennik"
          description="Zacznij bezpłatnie. Uaktualnij, gdy będziesz gotowy. Bez ukrytych opłat."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                "relative rounded-2xl border p-8 transition-all duration-300",
                plan.highlighted
                  ? "border-primary shadow-xl shadow-primary/10 bg-card scale-[1.02]"
                  : "bg-card hover:shadow-lg hover:-translate-y-1"
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
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  <span className="text-muted-foreground">zł/mies.</span>
                </div>
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
  );
}
