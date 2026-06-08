"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("[DashboardError]", error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-20 text-center">
      <div className="text-5xl">⚡</div>
      <div>
        <h2 className="text-xl font-black mb-2">Dashboard niedostępny</h2>
        <p className="text-muted-foreground text-sm">Nie udało się załadować danych. Spróbuj ponownie.</p>
      </div>
      <Button onClick={reset}>Spróbuj ponownie</Button>
    </div>
  )
}
