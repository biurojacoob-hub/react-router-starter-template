import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { auth } from "@/src/auth"
import { prisma } from "@/src/lib/db"
import { createSession } from "@/src/ai/mentor"
import { MentorChat } from "@/src/components/mentor/MentorChat"

export const metadata: Metadata = { title: "AI Mentor" }

export default async function AiMentorPage() {
  const session = await auth()
  if (!session?.user) redirect("/sign-in")

  const child = await prisma.childProfile.findFirst({
    where: { parentId: session.user.id, deletedAt: null },
    select: { id: true, firstName: true, ageGroup: true, level: true, streakDays: true },
  })

  if (!child) redirect("/onboarding")

  const { sessionId } = createSession(child.id)

  const greetings: Record<string, string> = {
    EXPLORER: `Cześć ${child.firstName}! 🌟 Jestem Twoim finansowym pomocnikiem! O czym chcesz się dziś dowiedzieć? 😊`,
    LEARNER: `Hej ${child.firstName}! 💪 Gotowy na finansowe pytania? Pytaj śmiało!`,
    ACHIEVER: `Hej ${child.firstName}! Mam dla Ciebie odpowiedzi na każde pytanie finansowe. Zaczynajmy!`,
    MASTER: `Witaj ${child.firstName}! Jestem tu, żeby dyskutować o finansach na poważnie. Od czego zaczynamy?`,
  }

  const greeting = greetings[child.ageGroup] ?? `Cześć ${child.firstName}! Jestem Twoim mentorem finansowym. Pytaj o wszystko! 🤖`

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl gradient-brand shadow-xl shadow-sky-500/25 text-white">
          <Sparkles className="h-8 w-8" />
        </div>
        <h1 className="text-2xl font-bold">AI Mentor</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Twój osobisty ekspert finansowy dostępny 24/7
        </p>
        <Badge variant="purple" className="mt-2">Beta — 50 wiadomości / miesiąc</Badge>
      </div>

      <MentorChat
        childId={child.id}
        initialGreeting={greeting}
        sessionId={sessionId}
      />
    </div>
  )
}
