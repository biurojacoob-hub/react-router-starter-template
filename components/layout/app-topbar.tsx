"use client"

import { Bell, Search } from "lucide-react"
import { ThemeToggle } from "@/components/shared/theme-toggle"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface TopbarProfile {
  name: string
  avatarUrl?: string | null
}

interface AppTopbarProps {
  title?: string
  profile?: TopbarProfile | null
}

export function AppTopbar({ title, profile }: AppTopbarProps) {
  const initials = profile?.name?.[0]?.toUpperCase() ?? "?"

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-xl px-6">
      {title && (
        <h1 className="hidden md:block text-lg font-semibold">{title}</h1>
      )}

      <div className="flex flex-1 items-center gap-3 justify-end">
        <Button variant="ghost" size="icon" aria-label="Szukaj">
          <Search className="h-4 w-4" />
        </Button>

        <Button variant="ghost" size="icon" aria-label="Powiadomienia" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-primary" />
        </Button>

        <ThemeToggle />

        <Avatar className="h-8 w-8 cursor-pointer">
          {profile?.avatarUrl && <AvatarImage src={profile.avatarUrl} alt={profile.name} />}
          <AvatarFallback className="gradient-brand text-white text-xs font-bold">
            {initials}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
