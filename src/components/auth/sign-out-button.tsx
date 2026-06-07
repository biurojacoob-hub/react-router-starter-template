"use client"

import { useTransition } from "react"
import { signOutAction } from "@/src/actions/auth/sign-out"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

export function SignOutButton({ className }: { className?: string }) {
  const [isPending, start] = useTransition()

  return (
    <Button
      variant="ghost"
      size="sm"
      disabled={isPending}
      onClick={() => start(() => signOutAction())}
      className={cn("gap-2 text-muted-foreground hover:text-destructive", className)}
    >
      <LogOut className="h-4 w-4" />
      {isPending ? "Wylogowywanie…" : "Wyloguj się"}
    </Button>
  )
}
