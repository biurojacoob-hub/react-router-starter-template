"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("[GlobalError]", error)
  }, [error])

  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-6 text-center">
          <div className="text-6xl">😵</div>
          <div>
            <h1 className="text-2xl font-black mb-2">Coś poszło nie tak</h1>
            <p className="text-muted-foreground max-w-sm">
              Wystąpił nieoczekiwany błąd. Spróbuj odświeżyć stronę.
            </p>
            {error.digest && (
              <p className="mt-2 text-xs text-muted-foreground font-mono">
                Kod błędu: {error.digest}
              </p>
            )}
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => window.location.reload()}>
              Odśwież stronę
            </Button>
            <Button onClick={reset}>Spróbuj ponownie</Button>
          </div>
        </div>
      </body>
    </html>
  )
}
