import type { AgeGroup } from "../types"
import type { MentorResponse } from "./types"

// ─────────────────────────────────────────────────────────────
// FORBIDDEN OUTPUT PATTERNS
// ─────────────────────────────────────────────────────────────

const FORBIDDEN_OUTPUT_PATTERNS: Array<{ pattern: RegExp; reason: string }> = [
  {
    pattern: /\b(kup|kupuj|nabywaj)\s+(akcj|obligacj|kryptowalut|ETF|fundusz|Bitcoin|Ethereum)/i,
    reason: "Rekomendacja kupna aktywów finansowych",
  },
  {
    pattern: /\b(sprzedaj|sprzedawaj)\s+(akcj|obligacj|kryptowalut|fundusz)/i,
    reason: "Rekomendacja sprzedaży aktywów finansowych",
  },
  {
    pattern: /\b(zainwestuj|inwestuj)\s+w\s+(konkretną|tę|tą|daną)/i,
    reason: "Konkretna rekomendacja inwestycyjna",
  },
  {
    pattern: /gwarantow(any|ane|anym)\s+(zysk|zwrot|dochód|zarobek)/i,
    reason: "Obietnica gwarantowanego zysku",
  },
  {
    pattern: /\b(zarobisz|zarobię|zarobimy)\s+\d+/i,
    reason: "Konkretna prognoza zarobku",
  },
  {
    pattern: /\b(dźwignia finansowa|leverage|margin trading|short selling|opcje|kontrakty terminowe)\b/i,
    reason: "Zaawansowane instrumenty finansowe",
  },
  {
    pattern: /\b(ticker|ISIN|WIG20|S&P|Nasdaq|NYSE|GPW)\b/i,
    reason: "Konkretne indeksy i tickery giełdowe",
  },
]

// Patterns that need age-appropriate blocking
const AGE_RESTRICTED_PATTERNS: Partial<Record<AgeGroup, RegExp[]>> = {
  EXPLORER: [
    /\b(kredyt|pożyczka|dług|hipoteka|leasing)\b/i,
    /\b(podatek|VAT|PIT|ZUS|składk)\b/i,
    /\b(inflacja|deflacja|PKB|stopa procentowa)\b/i,
  ],
  LEARNER: [
    /\b(hipoteka|leasing|obligacj)\b/i,
    /\b(instrumenty pochodne|kontrakty|opcje)\b/i,
  ],
}

// ─────────────────────────────────────────────────────────────
// COMPLEXITY SIMPLIFICATION MAP
// ─────────────────────────────────────────────────────────────

const SIMPLIFICATION_MAP: Array<{ term: RegExp; replacement: string }> = [
  { term: /\bstopa procentowa\b/gi, replacement: "procent, który bank płaci za twoje oszczędności" },
  { term: /\bdywersyfikacja\b/gi, replacement: "rozkładanie pieniędzy na różne rzeczy" },
  { term: /\binflacja\b/gi, replacement: "wzrost cen (za te same rzeczy płacisz więcej)" },
  { term: /\bamortyzacja\b/gi, replacement: "stopniowe spłacanie" },
  { term: /\bpłynność\b/gi, replacement: "łatwy dostęp do gotówki" },
  { term: /\bportfel inwestycyjny\b/gi, replacement: "zbiór swoich oszczędności" },
  { term: /\bkapitał\b/gi, replacement: "zaoszczędzone pieniądze" },
]

// ─────────────────────────────────────────────────────────────
// CHECK FUNCTIONS
// ─────────────────────────────────────────────────────────────

export function checkMentorOutput(
  text: string,
  ageGroup: AgeGroup
): { safe: boolean; violations: string[] } {
  const violations: string[] = []

  for (const { pattern, reason } of FORBIDDEN_OUTPUT_PATTERNS) {
    if (pattern.test(text)) violations.push(reason)
  }

  const agePatterns = AGE_RESTRICTED_PATTERNS[ageGroup] ?? []
  for (const pattern of agePatterns) {
    if (pattern.test(text)) violations.push(`Nieodpowiednie dla wieku ${ageGroup}`)
  }

  return { safe: violations.length === 0, violations }
}

export function simplifyForChild(text: string, ageGroup: AgeGroup): string {
  if (ageGroup === "ACHIEVER" || ageGroup === "MASTER") return text

  let result = text
  for (const { term, replacement } of SIMPLIFICATION_MAP) {
    result = result.replace(term, replacement)
  }
  return result
}

export function validateAndSanitizeMentorResponse(
  response: MentorResponse,
  ageGroup: AgeGroup
): MentorResponse {
  const check = checkMentorOutput(response.message, ageGroup)

  if (!check.safe) {
    return {
      ...response,
      message:
        "Ups, zaplątałem się! Pamiętaj — uczę cię o finansach, ale nie mówię co kupować ani sprzedawać. Mam inne pytanie — co już wiesz o oszczędzaniu? 😊",
      detectedMistake: undefined,
      followUpQuestions: ["Co to jest oszczędzanie?", "Dlaczego warto oszczędzać?"],
    }
  }

  return {
    ...response,
    message: simplifyForChild(response.message, ageGroup),
  }
}

// ─────────────────────────────────────────────────────────────
// SAFETY SYSTEM PROMPT SECTION
// ─────────────────────────────────────────────────────────────

export function buildMentorSafetyBlock(ageGroup: AgeGroup): string {
  const ageInstructions: Record<AgeGroup, string> = {
    EXPLORER: [
      "Mówisz do dziecka 6–9 lat.",
      "Używaj BARDZO prostych słów. Maksymalnie 2 zdania na raz.",
      "Porównuj do zabawek, słodyczy, kieszonkowego.",
      "Nigdy nie używaj słów: kredyt, podatek, inflacja, inwestycja.",
      "Bądź entuzjastyczny i zachęcający — jak najlepszy nauczyciel w szkole.",
    ].join("\n"),
    LEARNER: [
      "Mówisz do dziecka 10–12 lat.",
      "Używaj prostego języka z przykładami z życia szkolnego.",
      "Możesz mówić o kieszonkowym, oszczędzaniu, celach.",
      "Unikaj: kredytu hipotecznego, zaawansowanych pojęć finansowych.",
      "Krótkie odpowiedzi (3–5 zdań). Zawsze zakończ pytaniem zwrotnym.",
    ].join("\n"),
    ACHIEVER: [
      "Mówisz do nastolatka 13–15 lat.",
      "Możesz używać pojęć takich jak: budżet, cel, procent, ryzyko.",
      "Zawsze wyjaśniaj nowe pojęcia przez analogię.",
      "Nigdy nie dawaj konkretnych rekomendacji inwestycyjnych.",
      "Odpowiedzi mogą być dłuższe (5–8 zdań).",
    ].join("\n"),
    MASTER: [
      "Mówisz do nastolatka 16–18 lat.",
      "Możesz używać dojrzałego języka finansowego.",
      "Tłumacz mechanizmy, nie dawaj porad.",
      "Skupiaj się na zrozumieniu zasad, nie na konkretnych produktach.",
      "Odpowiedzi mogą być szczegółowe, ale zawsze edukacyjne.",
    ].join("\n"),
  }

  return `
## BEZWZGLĘDNE ZASADY MENTORA (NIGDY ICH NIE ŁAMAJ):

1. NIE dawaj porad inwestycyjnych — nie mów co kupić, sprzedać ani w co zainwestować
2. NIE wymieniaj konkretnych akcji, kryptowalut, funduszy ani ich tickerów
3. NIE obiecuj konkretnych zysków ani zwrotów
4. NIE używaj języka: "na pewno zarobisz", "gwarantowany zysk", "na pewno wzrośnie"
5. ZAWSZE edukuj — tłumacz zasady, mechanizmy, koncepcje
6. Twoja rola: NAUCZYCIEL i MENTOR, nie doradca finansowy

## STYL DLA TEJ GRUPY WIEKOWEJ:
${ageInstructions[ageGroup]}
`.trim()
}
