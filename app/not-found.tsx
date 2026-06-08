import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-6 text-center">
      <div className="text-7xl">🗺️</div>
      <div>
        <h1 className="text-3xl font-black mb-2">Strona nie istnieje</h1>
        <p className="text-muted-foreground max-w-sm">
          Tej strony nie ma w naszej aplikacji. Może link jest nieprawidłowy?
        </p>
      </div>
      <Button asChild>
        <Link href="/dashboard">Wróć do aplikacji</Link>
      </Button>
    </div>
  )
}
