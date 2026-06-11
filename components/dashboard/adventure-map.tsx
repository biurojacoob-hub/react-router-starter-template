import { CheckCircle2, MapPin, Lock, Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AdventureMapProps {
  currentDay: number
  dayProgressPercent: number
}

type Waypoint = {
  day: number
  emoji: string
  title: string
  subtitle: string
}

const WAYPOINTS: Waypoint[] = [
  { day: 1,  emoji: "🏠", title: "Start Przygody",      subtitle: "Pierwsze Monety" },
  { day: 5,  emoji: "🌱", title: "Odkrywca",            subtitle: "Kapstone: Fundament" },
  { day: 10, emoji: "🛒", title: "Mistrz Zakupów",      subtitle: "Kapstone: Rdzeń I" },
  { day: 15, emoji: "💰", title: "Strażnik Budżetu",    subtitle: "Kapstone: Rdzeń II" },
  { day: 20, emoji: "🏦", title: "Bankowy Ekspert",     subtitle: "Kapstone: Zaawansowany I" },
  { day: 25, emoji: "🚀", title: "Finansowy Ninja",     subtitle: "Kapstone: Zaawansowany II" },
  { day: 30, emoji: "👑", title: "Wielki Skarb",        subtitle: "Kapstone Finałowy" },
]

function waypointStatus(waypoint: Waypoint, currentDay: number, dayProgressPercent: number) {
  if (currentDay > waypoint.day) return "done"
  if (currentDay === waypoint.day && dayProgressPercent === 100) return "done"
  if (currentDay === waypoint.day) return "active"
  return "locked"
}

export function AdventureMap({ currentDay, dayProgressPercent }: AdventureMapProps) {
  return (
    <Card className="border-0 ring-1 ring-border/60 overflow-hidden">
      <CardHeader className="pb-2 pt-4 px-4">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          Mapa Twojej Przygody
          <span className="ml-auto text-xs font-normal text-muted-foreground">Dzień {currentDay}/30</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-[22px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-primary/60 via-primary/20 to-muted/30" />

          <div className="space-y-3">
            {WAYPOINTS.map((wp, i) => {
              const status = waypointStatus(wp, currentDay, dayProgressPercent)
              const isLast = i === WAYPOINTS.length - 1

              return (
                <div key={wp.day} className="relative flex items-center gap-3">
                  {/* Node */}
                  <div className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 text-lg transition-all ${
                    status === "done"
                      ? "border-primary bg-primary/10"
                      : status === "active"
                      ? "border-primary bg-primary text-white shadow-lg shadow-primary/30 scale-110"
                      : "border-muted bg-background text-muted-foreground/40"
                  }`}>
                    {status === "done" ? (
                      <span className="text-base">{wp.emoji}</span>
                    ) : status === "active" ? (
                      <span className="text-base">{wp.emoji}</span>
                    ) : (
                      <Lock className="h-4 w-4" />
                    )}
                    {status === "done" && (
                      <CheckCircle2 className="absolute -top-1 -right-1 h-4 w-4 text-primary bg-background rounded-full" />
                    )}
                    {status === "active" && (
                      <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-yellow-400 border-2 border-background animate-pulse" />
                    )}
                  </div>

                  {/* Label */}
                  <div className={`flex-1 min-w-0 ${status === "locked" ? "opacity-40" : ""}`}>
                    <p className={`text-sm font-semibold leading-tight ${status === "active" ? "text-primary" : ""}`}>
                      {wp.emoji} {wp.title}
                    </p>
                    <p className="text-[11px] text-muted-foreground">{wp.subtitle} · Dzień {wp.day}</p>
                  </div>

                  {/* Badge */}
                  {status === "active" && (
                    <span className="shrink-0 text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                      Jesteś tu!
                    </span>
                  )}
                  {status === "done" && (
                    <Star className="h-4 w-4 shrink-0 text-yellow-400 fill-yellow-400" />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
