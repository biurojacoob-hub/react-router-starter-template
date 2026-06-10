"use client"

import { useState, useRef, useEffect, useTransition } from "react"
import { Send, RefreshCw, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface Message {
  role: "user" | "assistant"
  content: string
}

interface MentorChatProps {
  childId: string
  initialGreeting: string
  sessionId: string
}

const SUGGESTED_QUESTIONS = [
  "Co to jest procent składany i jak działa?",
  "Jak mądrze wydawać kieszonkowe?",
  "Dlaczego warto oszczędzać od małego?",
  "Co to jest inflacja?",
  "Jak działają banki?",
  "Czym różni się akcja od obligacji?",
]

export function MentorChat({ childId, initialGreeting, sessionId: initialSessionId }: MentorChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: initialGreeting },
  ])
  const [input, setInput] = useState("")
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [rateLimited, setRateLimited] = useState(false)
  const [sessionId] = useState(initialSessionId)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isStreaming])

  async function sendMessage(text: string) {
    if (!text.trim() || isStreaming) return
    setError(null)
    setRateLimited(false)

    const userMsg: Message = { role: "user", content: text }
    const history = messages.map((m) => ({ role: m.role === "user" ? "USER" : "ASSISTANT" as const, content: m.content }))

    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsStreaming(true)

    // Add empty assistant bubble immediately
    setMessages((prev) => [...prev, { role: "assistant", content: "" }])

    abortRef.current = new AbortController()

    try {
      const res = await fetch("/api/mentor/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          childId,
          message: text,
          sessionId,
          conversationHistory: history,
        }),
        signal: abortRef.current.signal,
      })

      if (res.status === 429) {
        const data = await res.json().catch(() => ({}))
        setRateLimited(true)
        setError(data.error ?? "Przekroczono limit wiadomości. Spróbuj ponownie za chwilę.")
        // Remove empty bubble
        setMessages((prev) => prev.slice(0, -1))
        setIsStreaming(false)
        return
      }

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`)
      }

      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      if (!reader) throw new Error("No response body")

      let full = ""
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        full += chunk
        setMessages((prev) => {
          const copy = [...prev]
          copy[copy.length - 1] = { role: "assistant", content: full }
          return copy
        })
      }
    } catch (err) {
      if ((err as Error).name === "AbortError") return
      setError("Coś poszło nie tak. Spróbuj ponownie. 🙏")
      setMessages((prev) => prev.slice(0, -1))
    } finally {
      setIsStreaming(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  function handleSuggestion(q: string) {
    sendMessage(q)
    inputRef.current?.focus()
  }

  return (
    <div className="space-y-4">
      {/* Chat area */}
      <Card className="flex flex-col" style={{ minHeight: 420 }}>
        <CardContent className="flex-1 p-6 space-y-4 overflow-y-auto max-h-[480px]">
          {messages.map((msg, i) => (
            <div key={i} className={cn("flex gap-3", msg.role === "user" ? "flex-row-reverse" : "")}>
              {msg.role === "assistant" && (
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl gradient-brand text-white">
                  <Sparkles className="h-4 w-4" />
                </div>
              )}
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                  msg.role === "assistant"
                    ? "bg-muted rounded-tl-none"
                    : "gradient-brand text-white rounded-tr-none"
                )}
              >
                {msg.content === "" && msg.role === "assistant" ? (
                  <TypingIndicator />
                ) : (
                  msg.content
                )}
              </div>
            </div>
          ))}

          {isStreaming && messages[messages.length - 1]?.content === "" && null}

          <div ref={bottomRef} />
        </CardContent>

        {/* Input */}
        <div className="border-t p-4">
          {error && (
            <p className={cn(
              "text-sm mb-3 px-2",
              rateLimited ? "text-amber-600 dark:text-amber-400" : "text-destructive"
            )}>
              {error}
            </p>
          )}
          <div className="flex gap-3">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Zadaj pytanie o finanse..."
              disabled={isStreaming || rateLimited}
              className="flex-1 rounded-xl border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground disabled:opacity-50"
            />
            <Button
              variant="gradient"
              size="icon"
              className="shrink-0"
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isStreaming || rateLimited}
              aria-label="Wyślij"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Suggested questions */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold">Sugerowane pytania</p>
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {SUGGESTED_QUESTIONS.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => handleSuggestion(q)}
              disabled={isStreaming || rateLimited}
              className="flex items-center gap-2 rounded-xl border bg-card px-4 py-3 text-sm text-left transition-colors hover:bg-accent hover:border-primary/30 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Sparkles className="h-3.5 w-3.5 shrink-0 text-primary" />
              {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 h-5">
      {[0, 150, 300].map((delay) => (
        <span
          key={delay}
          className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce"
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
    </div>
  )
}
