import type { SafetyCheckResult } from "../types"

const FORBIDDEN_PATTERNS = [
  /\b(kup|sprzedaj|kupuj|sprzedawaj)\s+(akcj|obligacj|kryptowalut|fundusz)/i,
  /\b(buy|sell|purchase)\s+(stock|share|bond|crypto|fund)/i,
  /\b(inwestuj|invest)\s+(w|in)\s+(akcj|stock|crypto|coin)/i,
  /\bstopa\s+zwrotu\b/i,
  /\breturn\s+on\s+investment\b/i,
  /\b(dźwignia|leverage|margin\s+trading|short\s+selling)\b/i,
  /\bgwarantowany\s+(zysk|zwrot|dochód)\b/i,
  /\bguaranteed\s+(profit|return|income)\b/i,
  /\b(ryzyko\s+inwestycyjne|investment\s+risk)\b.*\b(możesz|you\s+can)\b/i,
]

const COMPLEXITY_PATTERNS: Record<string, string> = {
  "stopa procentowa": "odsetki (pieniądze, które bank daje za oszczędności)",
  "amortyzacja": "stopniowe spłacanie długu",
  "dywersyfikacja": "nie wkładanie wszystkich jajek do jednego koszyka",
  "inflacja": "wzrost cen, za które z czasem płacimy więcej",
  "deficyt": "wydawanie więcej, niż się ma",
  "płynność finansowa": "dostęp do gotówki gdy jej potrzebujesz",
}

export function checkSafety(content: string): SafetyCheckResult {
  const violations: string[] = []

  for (const pattern of FORBIDDEN_PATTERNS) {
    if (pattern.test(content)) {
      violations.push(`Zakazana treść: ${pattern.source}`)
    }
  }

  return {
    safe: violations.length === 0,
    violations,
  }
}

export function simplifyForAge(text: string, ageGroup: string): string {
  if (ageGroup === "EXPLORER" || ageGroup === "LEARNER") {
    let simplified = text
    for (const [term, replacement] of Object.entries(COMPLEXITY_PATTERNS)) {
      simplified = simplified.replace(
        new RegExp(`\\b${term}\\b`, "gi"),
        replacement
      )
    }
    return simplified
  }
  return text
}

export function buildSafetySystemPrompt(ageGroup: string): string {
  const ageInstructions: Record<string, string> = {
    EXPLORER: "Mówisz do dziecka 6-8 lat. Używaj prostych słów, krótkich zdań, porównań z zabawkami i codziennym życiem.",
    LEARNER: "Mówisz do dziecka 9-11 lat. Używaj konkretnych przykładów z życia szkolnego i kieszonkowego.",
    ACHIEVER: "Mówisz do nastolatka 12-14 lat. Możesz używać bardziej złożonych pojęć, ale zawsze wyjaśniaj je.",
    MASTER: "Mówisz do nastolatka 15-18 lat. Możesz używać pojęć finansowych, ale w kontekście edukacyjnym.",
  }

  return `
BEZWZGLĘDNE ZASADY BEZPIECZEŃSTWA:
1. NIE generuj porad inwestycyjnych ani rekomendacji kupna/sprzedaży aktywów finansowych
2. NIE używaj fraz "kup", "sprzedaj", "zainwestuj" w kontekście konkretnych aktywów
3. NIE obiecuj gwarantowanych zysków ani zwrotów
4. NIE używaj skomplikowanego języka finansowego bez prostego wyjaśnienia
5. ZAWSZE edukuj, nigdy nie doradzaj
6. Treści MUSZĄ być bezpieczne i odpowiednie dla dzieci

STYL KOMUNIKACJI:
${ageInstructions[ageGroup] ?? ageInstructions.LEARNER}

Twoja rola to NAUCZYCIEL finansów osobistych dla dzieci, nie doradca finansowy.
`.trim()
}
