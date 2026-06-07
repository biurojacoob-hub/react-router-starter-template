"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { AvatarDisplay } from "@/src/components/avatars/AvatarDisplay"
import type { AvatarCategory } from "@/src/components/avatars/avatarData"

type Message = { from: "mentor" | "user"; text: string }

const MENTOR_SCRIPT: Record<AvatarCategory, Message[]> = {
  EXPLORER: [
    { from: "mentor", text: "Hej! Jestem Twoim AI Mentorem finansowym! 🤖 Właśnie zrobiłeś pierwszy krok — gratulacje! 🎉" },
    { from: "user",   text: "Dzięki! Co teraz?" },
    { from: "mentor", text: "Twoja pierwsza prawdziwa lekcja czeka! Dowiesz się czym są pieniądze — przez historię i zabawę. To tylko 8 minut!" },
    { from: "mentor", text: "A ja będę tu zawsze — jak masz pytanie o pieniądze, tylko pisz! Jestem Twoim personalnym ekspertem finansowym 😊" },
  ],
  LEARNER: [
    { from: "mentor", text: "Hej! Jestem Twoim AI Mentorem. Widzę, że zaczynasz naukę budżetowania — świetna decyzja! 💪" },
    { from: "user",   text: "Super! Od czego zacznę?" },
    { from: "mentor", text: "Zaczniesz od podstaw budżetu — zrozumiesz jak planować wydatki. To umiejętność, którą większość dorosłych nigdy nie opanowała!" },
    { from: "mentor", text: "Pamiętaj: jestem tu zawsze. Masz pytanie o finanse? Pisz! Tłumaczę prosto i bez akademickiego żargonu 📚" },
  ],
  ACHIEVER: [
    { from: "mentor", text: "Cześć! Jako Twój AI Mentor — od razu: dobra decyzja, że zaczynasz teraz. W 13-15 lat to rzadkość. 🚀" },
    { from: "user",   text: "Chcę wiedzieć jak zarabiać i inwestować." },
    { from: "mentor", text: "Świetnie! Zaczniemy od źródeł dochodu dla nastolatka, potem koncepcje inwestowania (bez porad giełdowych!) i zarządzanie ryzykiem." },
    { from: "mentor", text: "Jestem tutaj do pytań. Cokolwiek finansowego Cię ciekawi — pytaj. Nie będę dawać porad 'kup X' — będę tłumaczyć jak system działa 💡" },
  ],
  MASTER: [
    { from: "mentor", text: "Cześć. Jestem Twoim AI Mentorem finansowym. Zaczynasz program na poziomie MASTER — rzadkość w Twoim wieku. 👑" },
    { from: "user",   text: "Co tu jest inaczej niż w podstawowych kursach?" },
    { from: "mentor", text: "Tutaj mówimy o systemie: majątek netto, fundusz awaryjny, podatki, kredyt, własna działalność. Pełny obraz zarządzania finansami osobistymi." },
    { from: "mentor", text: "Jestem tu do dyskusji. Masz pytanie o cokolwiek finansowego — pytaj. Tłumaczę mechanizmy, nie daję porad inwestycyjnych. Zaczynamy? 📊" },
  ],
}

interface MentorIntroProps {
  ageGroup: AvatarCategory
  childAvatarId: string
  childName: string
  onComplete: () => void
}

export function MentorIntro({ ageGroup, childAvatarId, childName, onComplete }: MentorIntroProps) {
  const script = MENTOR_SCRIPT[ageGroup]
  const [visibleCount, setVisibleCount] = useState(0)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (visibleCount >= script.length) return
    const delay = visibleCount === 0 ? 600 : 1200
    const t = setTimeout(() => {
      setVisibleCount((c) => c + 1)
    }, delay)
    return () => clearTimeout(t)
  }, [visibleCount, script.length])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [visibleCount])

  const isDone = visibleCount >= script.length

  return (
    <div className="flex flex-col h-full max-h-[70vh]">
      <div className="text-center mb-4">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">AI Mentor</p>
        <h2 className="text-xl font-black">Poznaj swojego mentora</h2>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 px-4 pb-4">
        {script.slice(0, visibleCount).map((msg, i) => (
          <div
            key={i}
            className={`flex gap-3 animate-fade-in ${msg.from === "user" ? "flex-row-reverse" : ""}`}
          >
            {msg.from === "mentor" ? (
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xl text-white shadow">
                🤖
              </div>
            ) : (
              <AvatarDisplay avatarId={childAvatarId} size="sm" />
            )}
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.from === "mentor"
                  ? "bg-muted text-foreground rounded-tl-none"
                  : "bg-primary text-white rounded-tr-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {!isDone && (
          <div className="flex gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-xl text-white shadow">
              🤖
            </div>
            <div className="flex items-center gap-1 rounded-2xl bg-muted px-4 py-3 rounded-tl-none">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {isDone && (
        <div className="px-4 pt-2">
          <Button size="lg" className="w-full rounded-2xl" onClick={onComplete}>
            Idziemy do panelu! 🚀
          </Button>
        </div>
      )}
    </div>
  )
}
