import { determineNextSkill } from "@/src/learning/graph/progression"
import type { AgeGroup } from "../types"
import type { MentorChildContext, ReasoningOutput, ExplanationStyle, ResponseLength, ShortTermMemory } from "./types"
import { findSkillByMention } from "./context"

// ─────────────────────────────────────────────────────────────
// DETECT CHILD UNDERSTANDING FROM MESSAGE
// ─────────────────────────────────────────────────────────────

const CONFUSION_SIGNALS = [
  /nie rozumiem/i,
  /co to (jest|znaczy|oznacza)/i,
  /nie wiem/i,
  /o co chodzi/i,
  /dlaczego/i,
  /jak to (działa|możliwe)/i,
  /\?{2,}/,
  /to trudne/i,
  /skomplikowane/i,
]

const UNDERSTANDING_SIGNALS = [
  /rozumiem/i,
  /ok,?\s*(już\s+)?wiem/i,
  /to ma sens/i,
  /jasne/i,
  /super/i,
  /dzięki/i,
  /już wiem/i,
  /aha/i,
]

const EXCELLENCE_SIGNALS = [
  /bo (to|się)/i,     // child explains reasoning
  /czyli/i,           // child draws conclusion
  /to znaczy że/i,
  /dlatego że/i,
]

type UnderstandingLevel = "CONFUSED" | "PARTIAL" | "GOOD" | "EXCELLENT"

function detectUnderstandingLevel(message: string): UnderstandingLevel {
  const lower = message.toLowerCase()

  if (CONFUSION_SIGNALS.some((p) => p.test(lower))) return "CONFUSED"
  if (EXCELLENCE_SIGNALS.some((p) => p.test(lower))) return "EXCELLENT"
  if (UNDERSTANDING_SIGNALS.some((p) => p.test(lower))) return "GOOD"
  return "PARTIAL"
}

// ─────────────────────────────────────────────────────────────
// DETECT MISTAKE IN MESSAGE
// ─────────────────────────────────────────────────────────────

type MistakeConcept = { concept: string; trigger: RegExp; description: string }

const COMMON_MISCONCEPTIONS: MistakeConcept[] = [
  {
    concept: "oszczędzanie vs wydawanie",
    trigger: /oszczędzanie (jest|to) (nudne|złe|bezsensowne)/i,
    description: "Dziecko uważa oszczędzanie za bezsensowne",
  },
  {
    concept: "bogactwo a praca",
    trigger: /(bogaci|milionerzy) nie (pracują|muszą pracować)/i,
    description: "Błędne przekonanie o źródle bogactwa",
  },
  {
    concept: "pieniądze rosną same",
    trigger: /pieniądze (rosną|mnożą się) same/i,
    description: "Brak rozumienia mechanizmu inwestowania",
  },
  {
    concept: "kredyt to darmowe pieniądze",
    trigger: /kredyt (to|jest) (darmow|bezpłatn)/i,
    description: "Brak rozumienia kosztu kredytu",
  },
]

function detectMistake(message: string): MistakeConcept | null {
  return COMMON_MISCONCEPTIONS.find((m) => m.trigger.test(message)) ?? null
}

// ─────────────────────────────────────────────────────────────
// PREFERRED EXPLANATION STYLE
// ─────────────────────────────────────────────────────────────

function selectExplanationStyle(
  ageGroup: AgeGroup,
  understandingLevel: UnderstandingLevel,
  turnCount: number
): ExplanationStyle {
  // Confused children need analogy or story
  if (understandingLevel === "CONFUSED") {
    return ageGroup === "EXPLORER" ? "STORY" : "ANALOGY"
  }
  // Excellent — push deeper with step-by-step
  if (understandingLevel === "EXCELLENT") return "STEP_BY_STEP"
  // Vary by turn to keep engagement
  const styles: ExplanationStyle[] = ["ANALOGY", "EXAMPLE", "STEP_BY_STEP"]
  return styles[turnCount % styles.length] ?? "ANALOGY"
}

function selectResponseLength(
  ageGroup: AgeGroup,
  understandingLevel: UnderstandingLevel
): ResponseLength {
  if (ageGroup === "EXPLORER") return "SHORT"
  if (understandingLevel === "CONFUSED") return "SHORT"  // confused → shorter, clearer
  if (understandingLevel === "EXCELLENT") return "LONG"
  return "MEDIUM"
}

// ─────────────────────────────────────────────────────────────
// GENERATE FOLLOW-UP QUESTIONS
// ─────────────────────────────────────────────────────────────

const FOLLOW_UPS_BY_AGE: Record<AgeGroup, string[][]> = {
  EXPLORER: [
    ["Czy masz swoją skarbonkę?", "Co chciałbyś kupić za swoje pieniądze?"],
    ["Czy wiesz skąd masz kieszonkowe?", "Co robisz kiedy skończy Ci się kieszonkowe?"],
    ["Czy wolisz kupić coś teraz czy poczekać na lepszą rzecz?"],
  ],
  LEARNER: [
    ["Jak planujesz swoje wydatki?", "Czy odkładasz część kieszonkowego?"],
    ["Czy masz jakiś finansowy cel?", "Ile czasu potrzeba żeby go osiągnąć?"],
    ["Co zrobiłbyś gdybyś dostał 100 zł?"],
  ],
  ACHIEVER: [
    ["Jakie znasz sposoby na zarabianie pieniędzy w Twoim wieku?"],
    ["Czy widzisz różnicę między potrzebą a zachcianką?", "Podaj przykład."],
    ["Jak myślisz — dlaczego warto oszczędzać zamiast wydawać od razu?"],
  ],
  MASTER: [
    ["Jak zbudowałbyś fundusz awaryjny?", "Od czego zaczniesz?"],
    ["Jaka jest różnica między aktywem a pasywyrem?"],
    ["Gdybyś miał 1000 zł — jaka byłaby Twoja strategia?"],
  ],
}

function generateFollowUpQuestions(
  ageGroup: AgeGroup,
  turnCount: number,
  _topicFocus: string | null
): string[] {
  const pool = FOLLOW_UPS_BY_AGE[ageGroup] ?? FOLLOW_UPS_BY_AGE.LEARNER
  const set = pool[turnCount % pool.length] ?? pool[0]!
  return set.slice(0, 2)
}

// ─────────────────────────────────────────────────────────────
// XP MOTIVATION HINT
// ─────────────────────────────────────────────────────────────

function computeXpHint(ctx: MentorChildContext, understandingLevel: UnderstandingLevel): number | null {
  if (understandingLevel === "EXCELLENT") return ctx.currentSkill?.xpReward ?? null
  if (understandingLevel === "GOOD") return null
  return null
}

// ─────────────────────────────────────────────────────────────
// MAIN REASONING FUNCTION
// ─────────────────────────────────────────────────────────────

export function analyzeMessageAndReason(
  userMessage: string,
  ctx: MentorChildContext,
  session: ShortTermMemory
): ReasoningOutput {
  const understandingLevel = detectUnderstandingLevel(userMessage)
  const mistake = detectMistake(userMessage)
  const mentionedSkill = findSkillByMention(userMessage, ctx.ageGroup)

  const nextSkill = determineNextSkill(
    {
      child: ctx.skillState,
      preferWeakCategories: ctx.weakCategories,
    }
  )

  const style = selectExplanationStyle(ctx.ageGroup, understandingLevel, session.turnCount)
  const length = selectResponseLength(ctx.ageGroup, understandingLevel)
  const followUps = generateFollowUpQuestions(ctx.ageGroup, session.turnCount, ctx.currentSkill?.id ?? null)
  const xpHint = computeXpHint(ctx, understandingLevel)

  return {
    detectedTopic: mentionedSkill?.name ?? ctx.currentSkill?.name ?? null,
    detectedSkillId: mentionedSkill?.id ?? ctx.currentSkill?.id ?? null,
    detectedMistake: mistake ? mistake.concept : null,
    childUnderstandingLevel: understandingLevel,
    recommendedStyle: style,
    recommendedLength: length,
    suggestedFollowUps: followUps,
    suggestedSkillId: nextSkill?.id ?? null,
    xpMotivationHint: xpHint,
  }
}

// ─────────────────────────────────────────────────────────────
// BUILD REASONING INSTRUCTIONS for the system prompt
// ─────────────────────────────────────────────────────────────

export function buildReasoningInstructions(reasoning: ReasoningOutput): string {
  const parts: string[] = ["## INSTRUKCJE DLA TEJ ODPOWIEDZI"]

  const styleInstructions: Record<string, string> = {
    STORY: "Odpowiedz za pomocą krótkiej historyjki lub bajki finansowej.",
    ANALOGY: "Użyj analogii do codziennego życia dziecka (zabawki, jedzenie, szkoła).",
    STEP_BY_STEP: "Wyjaśnij krok po kroku, ponumeruj punkty.",
    EXAMPLE: "Podaj konkretny przykład z życia wzięty.",
    VISUAL: "Opisz to obrazowo — co by widział, gdyby to narysował.",
  }

  const lengthInstructions: Record<string, string> = {
    SHORT: "Odpowiedź: maksymalnie 2–3 zdania. Krótko i jasno.",
    MEDIUM: "Odpowiedź: 4–6 zdań. Wyjaśnij, ale nie przesadzaj.",
    LONG: "Odpowiedź: 7–10 zdań. Możesz być szczegółowy.",
  }

  parts.push(styleInstructions[reasoning.recommendedStyle] ?? "")
  parts.push(lengthInstructions[reasoning.recommendedLength] ?? "")

  if (reasoning.childUnderstandingLevel === "CONFUSED") {
    parts.push("Dziecko jest zdezorientowane — uprość maksymalnie, użyj prostszego języka.")
  }

  if (reasoning.detectedMistake) {
    parts.push(`Wykryto błędne przekonanie: "${reasoning.detectedMistake}". Delikatnie je popraw, nie zawstydzaj.`)
  }

  if (reasoning.xpMotivationHint) {
    parts.push(`Możesz wspomnieć, że za opanowanie tego tematu dziecko zdobędzie ${reasoning.xpMotivationHint} XP.`)
  }

  parts.push("Zakończ jednym pytaniem zwrotnym do dziecka.")

  return parts.join("\n")
}
