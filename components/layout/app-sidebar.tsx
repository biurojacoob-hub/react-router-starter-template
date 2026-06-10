"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  BookOpen,
  Target,
  PiggyBank,
  Sparkles,
  Users,
  User,
  Settings,
  ChevronRight,
} from "lucide-react"
import { Logo } from "@/components/shared/logo"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface SidebarProfile {
  name: string
  xp: number
  level: number
  streakDays: number
  avatarUrl?: string | null
}

interface AppSidebarProps {
  profile: SidebarProfile | null
}

const mainNav = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Kursy", href: "/courses", icon: BookOpen },
  { label: "Misje", href: "/missions", icon: Target },
  { label: "Cele", href: "/goals", icon: PiggyBank },
  { label: "AI Mentor", href: "/ai-mentor", icon: Sparkles, badge: "Beta" },
]

const familyNav = [
  { label: "Panel rodzica", href: "/parent", icon: Users },
  { label: "Panel dziecka", href: "/child", icon: User },
  { label: "Ustawienia", href: "/settings", icon: Settings },
]

export function AppSidebar({ profile }: AppSidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex flex-col w-64 border-r bg-card h-screen sticky top-0 overflow-y-auto">
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b">
        <Link href="/">
          <Logo />
        </Link>
      </div>

      {/* User info */}
      <div className="px-4 py-4 border-b">
        <Link href="/child">
          <div className="flex items-center gap-3 rounded-xl bg-muted/50 p-3 hover:bg-muted/80 transition-colors cursor-pointer">
            <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-brand text-white font-bold text-sm shrink-0">
              {profile?.avatarUrl ? (
                <img src={profile.avatarUrl} alt={profile.name} className="h-full w-full rounded-full object-cover" />
              ) : (
                profile?.name?.[0]?.toUpperCase() ?? "?"
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{profile?.name ?? "Wczytywanie..."}</p>
              <p className="text-xs text-muted-foreground">
                {profile ? `Poziom ${profile.level} · ${profile.xp} XP` : ""}
              </p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
          </div>
        </Link>
      </div>

      {/* Main navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        <p className="px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          Nauka
        </p>
        {mainNav.map((item) => {
          const Icon = item.icon
          const active = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150",
                active
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <Badge
                  variant={active ? "outline" : "secondary"}
                  className="text-[10px] h-4 px-1.5"
                >
                  {item.badge}
                </Badge>
              )}
            </Link>
          )
        })}

        <div className="pt-4">
          <p className="px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            Rodzina
          </p>
          {familyNav.map((item) => {
            const Icon = item.icon
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150",
                  active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Streak widget */}
      {profile && profile.streakDays > 0 && (
        <div className="px-4 pb-4">
          <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">🔥</span>
              <div>
                <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">
                  {profile.streakDays} {profile.streakDays === 1 ? "dzień" : "dni"} z rzędu!
                </p>
                <p className="text-xs text-amber-600 dark:text-amber-400">
                  Świetna passa, trzymaj tak!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}
