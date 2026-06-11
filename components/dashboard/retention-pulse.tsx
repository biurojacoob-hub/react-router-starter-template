interface RetentionPulseProps {
  status: "SAFE" | "AT_RISK" | "CRITICAL"
}

const PULSE_CONFIG = {
  SAFE: {
    dot: "bg-emerald-400",
    ring: "ring-emerald-400/30",
    glow: "shadow-emerald-400/50",
    animate: false,
  },
  AT_RISK: {
    dot: "bg-amber-400",
    ring: "ring-amber-400/30",
    glow: "shadow-amber-400/50",
    animate: true,
  },
  CRITICAL: {
    dot: "bg-rose-400",
    ring: "ring-rose-400/30",
    glow: "shadow-rose-400/50",
    animate: true,
  },
}

export function RetentionPulse({ status }: RetentionPulseProps) {
  const cfg = PULSE_CONFIG[status]
  return (
    <span
      className={`relative inline-flex h-2.5 w-2.5 shrink-0`}
      title={status === "SAFE" ? "Przygoda trwa" : status === "AT_RISK" ? "Czas na przygodę!" : "Finn czeka na Ciebie!"}
    >
      {cfg.animate && (
        <span className={`absolute inline-flex h-full w-full rounded-full ${cfg.dot} opacity-75 animate-ping`} />
      )}
      <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${cfg.dot} ring-2 ${cfg.ring} shadow-sm ${cfg.glow}`} />
    </span>
  )
}
