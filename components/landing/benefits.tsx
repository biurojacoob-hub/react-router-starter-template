import { Check } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";

const parentBenefits = [
  "Pełny wgląd w postępy i aktywność dziecka",
  "Ustalanie celów i nagród motywacyjnych",
  "Alerty i powiadomienia o osiągnięciach",
  "Raporty tygodniowe na email",
  "Zarządzanie wieloma profilami dzieci",
  "Wskazówki od ekspertów finansowych",
];

const childBenefits = [
  "Lekcje dopasowane do wieku (7–17 lat)",
  "Grywalizacja: XP, poziomy, odznaki",
  "Przyjazny AI Mentor zawsze dostępny",
  "Własne cele i śledzenie postępów",
  "Wyzwania tygodniowe z nagrodami",
  "Certyfikaty ukończenia modułów",
];

function BenefitList({
  benefits,
  accent,
}: {
  benefits: string[];
  accent: string;
}) {
  return (
    <ul className="space-y-3">
      {benefits.map((benefit) => (
        <li key={benefit} className="flex items-start gap-3">
          <div
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${accent}`}
          >
            <Check className="h-3 w-3 text-white" />
          </div>
          <span className="text-sm text-muted-foreground leading-relaxed">
            {benefit}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function Benefits() {
  return (
    <section id="benefits" className="section bg-muted/30">
      <div className="container">
        <SectionHeader
          eyebrow="Korzyści"
          title="Dla każdego w rodzinie"
          description="Platforma zaprojektowana z myślą zarówno o rodzicach, jak i dzieciach w każdym wieku."
        />

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Parents */}
          <div className="rounded-2xl border bg-card p-8">
            <div className="mb-6">
              <div className="mb-3 text-4xl">👨‍👩‍👧</div>
              <h3 className="text-2xl font-bold">Dla rodziców</h3>
              <p className="mt-2 text-muted-foreground">
                Pełna kontrola i spokój ducha — wiesz, czego uczy się Twoje dziecko.
              </p>
            </div>
            <BenefitList benefits={parentBenefits} accent="bg-sky-500" />
          </div>

          {/* Children */}
          <div className="rounded-2xl border bg-card p-8">
            <div className="mb-6">
              <div className="mb-3 text-4xl">🧒</div>
              <h3 className="text-2xl font-bold">Dla dzieci</h3>
              <p className="mt-2 text-muted-foreground">
                Nauka finansów, która wciąga jak gra — bez nudy i trudnych słów.
              </p>
            </div>
            <BenefitList benefits={childBenefits} accent="bg-violet-500" />
          </div>
        </div>
      </div>
    </section>
  );
}
