import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const SUGGESTED_QUESTIONS = [
  "Co to jest procent składany?",
  "Jak mądrze wydawać kieszonkowe?",
  "Dlaczego warto oszczędzać?",
]

interface AiMentorWidgetProps {
  firstName: string
  ageGroup: string
}

const GREETING_BY_AGE: Record<string, string> = {
  EXPLORER: "Mam dla Ciebie pytanie na dziś: ile procent kieszonkowego odkładasz w tym miesiącu? 🤔",
  LEARNER: "Gotowy na finansowe wyzwanie? Zapytaj mnie o cokolwiek! 💪",
  ACHIEVER: "Czego chcesz się dziś nauczyć? Jestem tu, żeby pomóc! 🎯",
  MASTER: "O czym porozmawiamy dziś? Mam dla Ciebie ciekawe pytanie finansowe. 🧠",
}

export function AiMentorWidget({ firstName, ageGroup }: AiMentorWidgetProps) {
  const greeting = GREETING_BY_AGE[ageGroup] ?? "Mam dla Ciebie pytanie na dziś! 👋"

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-sky-50/50 to-violet-50/50 dark:from-sky-900/10 dark:to-violet-900/10">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <CardTitle className="text-base">AI Mentor</CardTitle>
          <Badge variant="purple" className="text-[10px] h-4">Beta</Badge>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/ai-mentor">
            Otwórz <ArrowRight className="ml-1 h-3.5 w-3.5" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex items-start gap-3 mb-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl gradient-brand text-white shadow-lg shadow-sky-500/25">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="rounded-2xl rounded-tl-none bg-background border px-4 py-3 text-sm">
            <p>
              Cześć {firstName}! 👋 {greeting}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs text-muted-foreground font-medium">Zapytaj mnie o:</p>
          {SUGGESTED_QUESTIONS.map((q) => (
            <Link
              key={q}
              href={`/ai-mentor?q=${encodeURIComponent(q)}`}
              className="flex w-full items-center gap-2 rounded-xl border bg-background px-3 py-2.5 text-xs text-left transition-colors hover:bg-accent hover:text-foreground"
            >
              <Sparkles className="h-3 w-3 shrink-0 text-primary" />
              {q}
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
