"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function MentorError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => { console.error("[MentorError]", error) }, [error])
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <div className="text-4xl">🤖</div>
      <h2 className="text-lg font-bold">AI Mentor jest niedostępny</h2>
      <p className="text-sm text-muted-foreground">Spróbuj ponownie za chwilę.</p>
      <Button onClick={reset}>Spróbuj ponownie</Button>
    </div>
  )
}
