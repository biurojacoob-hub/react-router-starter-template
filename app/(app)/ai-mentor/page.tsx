import type { Metadata } from "next";
import { Sparkles, Send, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "AI Mentor" };

const suggestedQuestions = [
  "Co to jest procent składany i jak działa?",
  "Jak mądrze wydawać kieszonkowe?",
  "Dlaczego warto oszczędzać od małego?",
  "Co to jest inflacja?",
  "Jak działają banki?",
  "Czym różni się akcja od obligacji?",
];

const messages = [
  {
    role: "assistant",
    content: "Cześć! Jestem Twoim osobistym mentorem finansowym 🤖 Pytaj mnie o wszystko, co dotyczy pieniędzy, oszczędzania i finansów. Wytłumaczę wszystko w prosty sposób!",
  },
];

export default function AiMentorPage() {
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

      {/* Chat area */}
      <Card className="min-h-[400px] flex flex-col">
        <CardContent className="flex-1 p-6 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              {msg.role === "assistant" && (
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl gradient-brand text-white">
                  <Sparkles className="h-4 w-4" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "assistant"
                    ? "bg-muted rounded-tl-none"
                    : "gradient-brand text-white rounded-tr-none"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </CardContent>

        {/* Input */}
        <div className="border-t p-4">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Zadaj pytanie o finanse..."
              className="flex-1 rounded-xl border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground"
            />
            <Button variant="gradient" size="icon" className="shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Suggested questions */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold">Sugerowane pytania</p>
          <Button variant="ghost" size="sm">
            <RefreshCw className="h-3.5 w-3.5 mr-1" /> Odśwież
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {suggestedQuestions.map((q) => (
            <button
              key={q}
              className="flex items-center gap-2 rounded-xl border bg-card px-4 py-3 text-sm text-left transition-colors hover:bg-accent hover:border-primary/30"
            >
              <Sparkles className="h-3.5 w-3.5 shrink-0 text-primary" />
              {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
