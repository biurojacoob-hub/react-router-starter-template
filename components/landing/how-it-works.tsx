import { SectionHeader } from "@/components/shared/section-header";

const steps = [
  {
    step: "01",
    title: "Zakładasz konto dla rodziny",
    description:
      "Rejestracja zajmuje 2 minuty. Tworzysz profil rodzica i dodajesz profile dzieci z personalizacją dla każdego wieku.",
    emoji: "👨‍👩‍👧",
  },
  {
    step: "02",
    title: "Dzieci uczą się przez zabawę",
    description:
      "Krótkie, angażujące lekcje i misje dostosowane do wieku. System XP i odznaki sprawiają, że nauka wciąga.",
    emoji: "🎮",
  },
  {
    step: "03",
    title: "AI Mentor wspiera na każdym kroku",
    description:
      "Przyjazny asystent odpowiada na pytania, tłumaczy trudne pojęcia i motywuje do dalszej nauki.",
    emoji: "🤖",
  },
  {
    step: "04",
    title: "Rodzic śledzi postępy",
    description:
      "Pełny panel rodziców z raportami, alertami i możliwością ustawiania celów i nagród dla dzieci.",
    emoji: "📊",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section">
      <div className="container">
        <SectionHeader
          eyebrow="Jak działa"
          title="Cztery kroki do finansowej mądrości"
          description="Prosta ścieżka od rejestracji do pierwszych efektów — już w pierwszym tygodniu."
        />

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.step} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-border -translate-y-1/2 z-0" />
              )}

              <div className="relative z-10 text-center">
                {/* Step number + emoji */}
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-primary/20 bg-primary/5 text-2xl">
                  {step.emoji}
                </div>
                <div className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">
                  Krok {step.step}
                </div>
                <h3 className="mb-3 text-lg font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
