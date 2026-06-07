"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

// ─────────────────────────────────────────────────────────────
// XP GAIN TOAST
// ─────────────────────────────────────────────────────────────

interface XpToastProps {
  xp: number
  visible: boolean
  onDone?: () => void
}

export function XpToast({ xp, visible, onDone }: XpToastProps) {
  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => onDone?.(), 2000)
      return () => clearTimeout(t)
    }
  }, [visible, onDone])

  return (
    <div
      className={cn(
        "pointer-events-none fixed bottom-24 left-1/2 z-50 -translate-x-1/2 transition-all duration-500",
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      )}
    >
      <div className="flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-white shadow-lg">
        <span className="text-xl">⚡</span>
        <span className="text-lg font-bold">+{xp} XP</span>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// BADGE EARNED MODAL
// ─────────────────────────────────────────────────────────────

interface BadgeMomentProps {
  open: boolean
  badgeEmoji: string
  badgeName: string
  badgeDescription: string
  xpReward: number
  onClose: () => void
}

export function BadgeMoment({
  open,
  badgeEmoji,
  badgeName,
  badgeDescription,
  xpReward,
  onClose,
}: BadgeMomentProps) {
  const [burst, setBurst] = useState(false)

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => setBurst(true), 150)
      return () => clearTimeout(t)
    } else {
      setBurst(false)
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div
        className={cn(
          "relative w-full max-w-sm rounded-3xl bg-white p-8 text-center shadow-2xl transition-all duration-500 dark:bg-slate-900",
          burst ? "scale-100 opacity-100" : "scale-75 opacity-0"
        )}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground hover:bg-muted"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Confetti dots */}
        <ConfettiDots />

        {/* Badge */}
        <div className="relative mx-auto mb-4 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-yellow-300 to-amber-500 shadow-xl">
          <span className="text-6xl" role="img" aria-label={badgeName}>
            {badgeEmoji}
          </span>
          <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm text-white">
            ✓
          </span>
        </div>

        <p className="mb-1 text-sm font-semibold uppercase tracking-widest text-primary">
          Odznaka odblokowana!
        </p>
        <h2 className="mb-2 text-2xl font-bold">{badgeName}</h2>
        <p className="mb-4 text-sm text-muted-foreground">{badgeDescription}</p>

        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
          <span>⚡</span>
          <span>+{xpReward} XP</span>
        </div>

        <Button onClick={onClose} className="w-full rounded-2xl" size="lg">
          Niesamowite! 🎉
        </Button>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// LEVEL UP MODAL
// ─────────────────────────────────────────────────────────────

interface LevelUpModalProps {
  open: boolean
  newLevel: number
  onClose: () => void
}

export function LevelUpModal({ open, newLevel, onClose }: LevelUpModalProps) {
  const [burst, setBurst] = useState(false)

  useEffect(() => {
    if (open) setTimeout(() => setBurst(true), 150)
    else setBurst(false)
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div
        className={cn(
          "relative w-full max-w-sm rounded-3xl bg-gradient-to-br from-primary to-blue-600 p-8 text-center text-white shadow-2xl transition-all duration-500",
          burst ? "scale-100 opacity-100" : "scale-75 opacity-0"
        )}
      >
        <ConfettiDots light />
        <div className="mb-4 text-7xl">⬆️</div>
        <p className="mb-1 text-sm font-semibold uppercase tracking-widest opacity-80">
          Awans na poziom
        </p>
        <p className="mb-4 text-7xl font-black">{newLevel}</p>
        <p className="mb-6 text-sm opacity-90">
          Osiągnąłeś nowy poziom finansowej mądrości!
        </p>
        <Button onClick={onClose} variant="secondary" className="w-full rounded-2xl" size="lg">
          Wow, niesamowite! 🚀
        </Button>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// LESSON COMPLETE MODAL
// ─────────────────────────────────────────────────────────────

interface LessonCompleteProps {
  open: boolean
  lessonTitle: string
  xpEarned: number
  onContinue: () => void
  onClose: () => void
}

export function LessonCompleteModal({
  open,
  lessonTitle,
  xpEarned,
  onContinue,
  onClose,
}: LessonCompleteProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-sm rounded-3xl bg-white p-8 text-center shadow-2xl dark:bg-slate-900">
        <ConfettiDots />
        <div className="mb-4 text-6xl">🎓</div>
        <p className="mb-1 text-sm font-semibold uppercase tracking-widest text-primary">
          Lekcja ukończona!
        </p>
        <h2 className="mb-3 text-xl font-bold leading-snug">{lessonTitle}</h2>
        <div className="mb-6 flex items-center justify-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
          <span>⚡</span>
          <span>+{xpEarned} XP zdobyte</span>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1 rounded-2xl">
            Koniec
          </Button>
          <Button onClick={onContinue} className="flex-1 rounded-2xl">
            Dalej →
          </Button>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// CONFETTI DECORATION
// ─────────────────────────────────────────────────────────────

function ConfettiDots({ light = false }: { light?: boolean }) {
  const dots = ["🎉", "⭐", "✨", "🎊", "💫", "🌟"]
  return (
    <>
      {dots.map((d, i) => (
        <span
          key={i}
          className={cn(
            "pointer-events-none absolute text-lg",
            light ? "opacity-40" : "opacity-60"
          )}
          style={{
            top: `${Math.random() * 80 + 5}%`,
            left: `${Math.random() * 90 + 5}%`,
            transform: `rotate(${Math.random() * 40 - 20}deg)`,
            animationDelay: `${i * 0.1}s`,
          }}
        >
          {d}
        </span>
      ))}
    </>
  )
}
