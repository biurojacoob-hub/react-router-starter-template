"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function CoursesError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => { console.error("[CoursesError]", error) }, [error])
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <div className="text-4xl">📚</div>
      <h2 className="text-lg font-bold">Nie udało się załadować kursów</h2>
      <Button onClick={reset}>Spróbuj ponownie</Button>
    </div>
  )
}
