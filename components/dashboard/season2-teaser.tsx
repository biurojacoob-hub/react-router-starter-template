import { Sparkles, Lock } from "lucide-react"
import { FINN } from "@/src/lib/hero/finn"

export function Season2Teaser() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 shadow-xl ring-1 ring-white/10">
      {/* Stars background */}
      <div className="pointer-events-none absolute inset-0">
        {["top-4 left-8", "top-8 right-12", "top-16 left-1/3", "bottom-8 right-8", "bottom-4 left-16"].map((pos, i) => (
          <Sparkles key={i} className={`absolute h-3 w-3 text-yellow-400/60 ${pos}`} />
        ))}
      </div>

      <div className="relative">
        {/* Badge */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-yellow-400/20 px-3 py-1.5 ring-1 ring-yellow-400/30">
          <Lock className="h-3.5 w-3.5 text-yellow-400" />
          <span className="text-xs font-bold text-yellow-300">SEZON 2 — WKRÓTCE</span>
        </div>

        {/* Main content */}
        <h2 className="text-2xl font-extrabold text-white leading-snug mb-2">
          🗺️ Nowa przygoda<br />właśnie się odblokuje
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed mb-5 max-w-sm">
          Ukończyłeś Sezon 1: Pierwsze Kroki. Ale to dopiero początek.
          W Sezonie 2 wyruszysz dalej — w świat inwestycji, przedsiębiorczości i prawdziwych decyzji finansowych.
        </p>

        {/* Season 2 preview */}
        <div className="space-y-2 mb-5">
          {[
            { emoji: "📈", label: "Świat Inwestycji", hint: "Jak pieniądze zarabiają same na siebie?" },
            { emoji: "🏪", label: "Małe Przedsiębiorstwo", hint: "Zbuduj swój pierwszy biznesplan" },
            { emoji: "🌍", label: "Pieniądze Świata",  hint: "Waluty, kursy i globalna ekonomia" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-2.5 ring-1 ring-white/10">
              <span className="text-xl">{item.emoji}</span>
              <div>
                <p className="text-sm font-semibold text-white">{item.label}</p>
                <p className="text-[11px] text-slate-400">{item.hint}</p>
              </div>
              <Lock className="ml-auto h-4 w-4 text-slate-500 shrink-0" />
            </div>
          ))}
        </div>

        {/* Finn */}
        <div className="flex items-center gap-2 rounded-2xl bg-white/10 px-3 py-2.5">
          <span className="text-xl">{FINN.emoji}</span>
          <p className="text-sm text-slate-200 font-medium">
            Finn tu będzie. Czeka na Ciebie w Sezonie 2.
          </p>
        </div>
      </div>
    </div>
  )
}
