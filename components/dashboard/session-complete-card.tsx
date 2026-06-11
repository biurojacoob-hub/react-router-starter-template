"use client"

import { useState } from "react"
import { CheckCircle2, Zap, ChevronRight } from "lucide-react"
import { FINN } from "@/src/lib/hero/finn"
import type { TomorrowPreview } from "@/src/lib/learning/tomorrowPreview"

interface SessionCompleteCardProps {
  firstName: string
  currentDay: number
  xpReward: number
  endMessage: string
  tomorrowPreview: TomorrowPreview | null
}

export function SessionCompleteCard({
  firstName,
  currentDay,
  xpReward,
  endMessage,
  tomorrowPreview,
}: SessionCompleteCardProps) {
  const [closed, setClosed] = useState(false)

  if (closed) {
    return (
      <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/50 dark:border-emerald-800/30 px-4 py-3">
        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
        <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
          Dzień {currentDay} zamknięty. Do zobaczenia jutro, {firstName}!
        </p>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 p-6 shadow-xl shadow-emerald-500/20">
      {/* Background glow */}
      <div className="pointer-events-none absolute -top-8 right-0 h-48 w-48 translate-x-12 rounded-full bg-white/15 blur-3xl" />

      <div className="relative space-y-4">
        {/* Header */}
        <div className="flex items-center gap-3">
          <span className="text-4xl">🎉</span>
          <div>
            <p className="text-white/80 text-xs font-medium uppercase tracking-wider">Dzień {currentDay}/30 ukończony</p>
            <h2 className="text-xl font-extrabold text-white leading-snug">
              Pętla dnia zamknięta, {firstName}!
            </h2>
          </div>
        </div>

        {/* Finn end message */}
        <div className="flex items-start gap-2 rounded-2xl bg-white/15 px-3 py-2.5">
          <span className="text-xl shrink-0">{FINN.emoji}</span>
          <p className="text-sm text-white font-medium leading-snug">{endMessage}</p>
        </div>

        {/* XP earned */}
        <div className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2">
          <Zap className="h-4 w-4 text-yellow-300 shrink-0" />
          <p className="text-sm text-white font-semibold">
            +{xpReward} XP zdobyte dzisiaj
          </p>
        </div>

        {/* Tomorrow preview — one line only */}
        {tomorrowPreview && (
          <div className="rounded-xl bg-white/10 px-3 py-2.5 space-y-1">
            <p className="text-[10px] text-white/60 uppercase tracking-wider font-semibold">Jutro wracasz do…</p>
            <p className="text-sm text-white font-semibold leading-snug flex items-center gap-2">
              <ChevronRight className="h-3.5 w-3.5 text-white/60 shrink-0" />
              {tomorrowPreview.title}
            </p>
          </div>
        )}

        {/* Close CTA */}
        <button
          onClick={() => setClosed(true)}
          className="w-full rounded-2xl bg-white/20 hover:bg-white/30 active:bg-white/10 transition-colors py-2.5 text-sm font-bold text-white"
        >
          Zamknij dzień ✓
        </button>
      </div>
    </div>
  )
}
