import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface EmptyStateProps {
  emoji: string
  title: string
  description: string
  ctaLabel?: string
  ctaHref?: string
  onCta?: () => void
  className?: string
}

function EmptyState({ emoji, title, description, ctaLabel, ctaHref, onCta, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12 text-center", className)}>
      <div className="mb-4 text-6xl">{emoji}</div>
      <h3 className="mb-2 text-lg font-bold">{title}</h3>
      <p className="mb-6 max-w-xs text-sm text-muted-foreground leading-relaxed">{description}</p>
      {ctaLabel && ctaHref && (
        <Button asChild className="rounded-2xl">
          <Link href={ctaHref}>{ctaLabel}</Link>
        </Button>
      )}
      {ctaLabel && onCta && (
        <Button onClick={onCta} className="rounded-2xl">
          {ctaLabel}
        </Button>
      )}
    </div>
  )
}

export function NoCourses({ className }: { className?: string }) {
  return (
    <EmptyState
      emoji="📚"
      title="Brak kursów do wyświetlenia"
      description="Twój plan nauki jest jeszcze pusty. Zacznij od pierwszej lekcji — to zajmie tylko 8 minut!"
      ctaLabel="Zacznij pierwszą lekcję →"
      ctaHref="/lessons"
      className={className}
    />
  )
}

export function NoProgress({ className }: { className?: string }) {
  return (
    <EmptyState
      emoji="🌱"
      title="Tu pojawi się Twój postęp"
      description="Ukończ pierwszą lekcję, a zobaczysz tutaj swój wykres postępów, XP i osiągnięcia!"
      ctaLabel="Zacznij naukę"
      ctaHref="/lessons"
      className={className}
    />
  )
}

export function NoBadges({ className }: { className?: string }) {
  return (
    <EmptyState
      emoji="🏅"
      title="Odznaki czekają na Ciebie!"
      description="Ukończ pierwszą lekcję, zrób quiz lub wykonaj misję — odznaka jest już prawie Twoja!"
      ctaLabel="Zdobądź pierwszą odznakę"
      ctaHref="/lessons"
      className={className}
    />
  )
}

export function NoActivity({ className }: { className?: string }) {
  return (
    <EmptyState
      emoji="💤"
      title="Brak aktywności"
      description="Twoja historia nauki jest pusta. Czas to zmienić! Każda sesja liczy się do Twojej serii."
      ctaLabel="Zacznij teraz"
      ctaHref="/lessons"
      className={className}
    />
  )
}

export function NoMissions({ className }: { className?: string }) {
  return (
    <EmptyState
      emoji="🗺️"
      title="Brak aktywnych misji"
      description="Misje pojawiają się po ukończeniu lekcji. Każda misja to prawdziwe zadanie do wykonania offline!"
      ctaLabel="Idź do lekcji"
      ctaHref="/lessons"
      className={className}
    />
  )
}

export function NoMessages({ className }: { className?: string }) {
  return (
    <EmptyState
      emoji="🤖"
      title="Porozmawiaj z AI Mentorem"
      description="Twój AI Mentor jest gotowy odpowiadać na pytania o pieniądze. Zacznij pierwszą rozmowę!"
      ctaLabel="Zacznij rozmowę"
      ctaHref="/ai-mentor"
      className={className}
    />
  )
}

export function NoGoals({ className }: { className?: string }) {
  return (
    <EmptyState
      emoji="🎯"
      title="Ustal swój cel oszczędzania"
      description="Masz coś, na co chcesz oszczędzać? Wpisz cel i śledź postęp co tydzień!"
      ctaLabel="Ustal cel"
      ctaHref="/goals"
      className={className}
    />
  )
}
