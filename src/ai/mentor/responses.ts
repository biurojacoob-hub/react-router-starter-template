import type { MentorResponse, ReasoningOutput, MentorChildContext } from "./types"
import { validateAndSanitizeMentorResponse } from "./safety"

// ─────────────────────────────────────────────────────────────
// PARSE STRUCTURED RESPONSE FROM AI TEXT
// ─────────────────────────────────────────────────────────────

export function parseMentorResponse(
  rawText: string,
  sessionId: string,
  reasoning: ReasoningOutput,
  ctx: MentorChildContext
): MentorResponse {
  // Try to parse JSON if the model returned structured output
  const jsonMatch = rawText.match(/```json\s*([\s\S]*?)\s*```/)
  if (jsonMatch?.[1]) {
    try {
      const parsed = JSON.parse(jsonMatch[1]) as Partial<MentorResponse>
      const response: MentorResponse = {
        message: parsed.message ?? rawText,
        suggestedSkill: parsed.suggestedSkill ?? reasoning.suggestedSkillId ?? undefined,
        xpHint: parsed.xpHint ?? reasoning.xpMotivationHint ?? undefined,
        followUpQuestions: parsed.followUpQuestions ?? reasoning.suggestedFollowUps,
        detectedMistake: parsed.detectedMistake ?? reasoning.detectedMistake ?? undefined,
        explanation: parsed.explanation,
        analogy: parsed.analogy,
        sessionId,
      }
      return validateAndSanitizeMentorResponse(response, ctx.ageGroup)
    } catch {
      // Fall through to plain text parsing
    }
  }

  // Plain text response — enrich with reasoning data
  const response: MentorResponse = {
    message: rawText.trim(),
    suggestedSkill: reasoning.suggestedSkillId ?? undefined,
    xpHint: reasoning.xpMotivationHint ?? undefined,
    followUpQuestions: reasoning.suggestedFollowUps,
    detectedMistake: reasoning.detectedMistake ?? undefined,
    sessionId,
  }

  return validateAndSanitizeMentorResponse(response, ctx.ageGroup)
}

// ─────────────────────────────────────────────────────────────
// FALLBACK RESPONSES (when AI fails or is unsafe)
// ─────────────────────────────────────────────────────────────

const FALLBACK_BY_AGE_GROUP: Record<string, string[]> = {
  EXPLORER: [
    "Ojej, coś mi się poplątało! Powiedz mi — czy masz już swoją skarbonkę? 🐷",
    "Ups! Zapomnij o tym co powiedziałem. Powiedz mi, co chciałbyś kupić za swoje kieszonkowe?",
    "Hej, chwileczka — czy wiesz skąd biorą się pieniądze? 💰",
  ],
  LEARNER: [
    "Przepraszam, trochę się zagalopowałem! Wróćmy do podstaw — masz już plan na swoje kieszonkowe?",
    "Zacznijmy od nowa. Czy wiesz jaka jest różnica między potrzebą a zachcianką?",
    "Hmm, lepiej zacznę inaczej. Co myślisz o oszczędzaniu na cel?",
  ],
  ACHIEVER: [
    "Przepraszam za zamieszanie! Wróćmy do czegoś konkretnego — jak planujesz swój budżet?",
    "Zacznijmy jeszcze raz. Jakie źródła dochodu są dostępne dla nastolatka?",
  ],
  MASTER: [
    "Przepraszam, zaczynamy od nowa. Jak rozumiesz pojęcie funduszu awaryjnego?",
    "Wróćmy do podstaw. Co sądzisz o regule 50/30/20?",
  ],
}

export function getFallbackResponse(
  ageGroup: string,
  sessionId: string,
  attempt = 0
): MentorResponse {
  const pool = FALLBACK_BY_AGE_GROUP[ageGroup] ?? FALLBACK_BY_AGE_GROUP.LEARNER!
  const message = pool[attempt % pool.length] ?? pool[0]!

  return {
    message,
    sessionId,
    followUpQuestions: [],
  }
}

// ─────────────────────────────────────────────────────────────
// GREETING RESPONSE (first turn in session)
// ─────────────────────────────────────────────────────────────

export function buildGreetingContext(ctx: MentorChildContext): string {
  const greetings: Record<string, string> = {
    EXPLORER: `Cześć ${ctx.name}! 🌟 Jestem Twoim finansowym pomocnikiem! Uczymy się dzisiaj o pieniądzach. Gotowy?`,
    LEARNER: `Hej ${ctx.name}! 💪 Fajnie, że jesteś! Dziś porozmawiamy o finansach. Od czego chcesz zacząć?`,
    ACHIEVER: `Hej ${ctx.name}! Cieszę się, że tu jesteś. Jesteś na poziomie ${ctx.level} z ${ctx.xp} XP — nieźle! O czym chcesz porozmawiać?`,
    MASTER: `Witaj ${ctx.name}! Widzę że jesteś na poziomie ${ctx.level}. Gotowy na poważną rozmowę o finansach?`,
  }

  return greetings[ctx.ageGroup] ?? greetings.LEARNER!
}
