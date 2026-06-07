"use client";

import { Bell, Search } from "lucide-react";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DEMO_USER } from "@/lib/constants";

interface AppTopbarProps {
  title?: string;
}

export function AppTopbar({ title }: AppTopbarProps) {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-xl px-6">
      {/* Page title (desktop) */}
      {title && (
        <h1 className="hidden md:block text-lg font-semibold">{title}</h1>
      )}

      <div className="flex flex-1 items-center gap-3 justify-end">
        {/* Search */}
        <Button variant="ghost" size="icon" aria-label="Szukaj">
          <Search className="h-4 w-4" />
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" aria-label="Powiadomienia" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-primary" />
        </Button>

        <ThemeToggle />

        {/* Avatar */}
        <Avatar className="h-8 w-8 cursor-pointer">
          <AvatarFallback className="gradient-brand text-white text-xs font-bold">
            {DEMO_USER.name[0]}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
