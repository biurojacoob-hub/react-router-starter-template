import type {
  ShortTermMemory,
  LongTermMemory,
  MemoryMessage,
  DetectedMistake,
  ExplanationStyle,
  ResponseLength,
  ChatMessage,
} from "./types"

// ─────────────────────────────────────────────────────────────
// SHORT-TERM MEMORY (in-memory, per session)
// ─────────────────────────────────────────────────────────────

const sessionStore = new Map<string, ShortTermMemory>()

export function createSession(childId: string): ShortTermMemory {
  const sessionId = `${childId}-${Date.now()}`
  const session: ShortTermMemory = {
    sessionId,
    childId,
    startedAt: new Date(),
    messages: [],
    detectedMistakes: [],
    topicsDiscussed: [],
    currentFocus: null,
    turnCount: 0,
  }
  sessionStore.set(sessionId, session)
  return session
}

export function getSession(sessionId: string): ShortTermMemory | null {
  return sessionStore.get(sessionId) ?? null
}

export function addMessageToSession(
  sessionId: string,
  message: MemoryMessage
): ShortTermMemory | null {
  const session = sessionStore.get(sessionId)
  if (!session) return null

  session.messages.push(message)
  session.turnCount = Math.floor(session.messages.length / 2)

  if (message.skillId && !session.topicsDiscussed.includes(message.skillId)) {
    session.topicsDiscussed.push(message.skillId)
    session.currentFocus = message.skillId
  }

  return session
}

export function recordMistakeInSession(
  sessionId: string,
  concept: string,
  description: string
): void {
  const session = sessionStore.get(sessionId)
  if (!session) return

  const existing = session.detectedMistakes.find((m) => m.concept === concept)
  if (existing) {
    existing.frequency++
    existing.lastDetectedAt = new Date()
  } else {
    session.detectedMistakes.push({
      concept,
      description,
      frequency: 1,
      lastDetectedAt: new Date(),
      corrected: false,
    })
  }
}

export function getRecentMessages(
  sessionId: string,
  maxTurns = 10
): ChatMessage[] {
  const session = sessionStore.get(sessionId)
  if (!session) return []

  // Keep last N turns (each turn = user + assistant)
  const maxMessages = maxTurns * 2
  const recent = session.messages.slice(-maxMessages)

  return recent.map((m) => ({ role: m.role, content: m.content }))
}

export function clearSession(sessionId: string): void {
  sessionStore.delete(sessionId)
}

// ─────────────────────────────────────────────────────────────
// LONG-TERM MEMORY (serializable, DB-ready)
// ─────────────────────────────────────────────────────────────

export function createLongTermMemory(childId: string): LongTermMemory {
  return {
    childId,
    totalSessions: 0,
    lastSessionAt: null,
    persistentMistakes: [],
    masteredConcepts: [],
    preferredExplanationStyle: "ANALOGY",
    averageResponseLength: "MEDIUM",
    lastSkillId: null,
  }
}

export function mergSessionIntoLongTerm(
  longTerm: LongTermMemory,
  session: ShortTermMemory
): LongTermMemory {
  const updated = { ...longTerm }
  updated.totalSessions++
  updated.lastSessionAt = new Date()

  if (session.currentFocus) {
    updated.lastSkillId = session.currentFocus
  }

  // Persist mistakes that appeared 2+ times in session
  for (const mistake of session.detectedMistakes) {
    if (mistake.frequency >= 2) {
      const existing = updated.persistentMistakes.find(
        (m) => m.concept === mistake.concept
      )
      if (existing) {
        existing.frequency += mistake.frequency
        existing.lastDetectedAt = mistake.lastDetectedAt
        existing.corrected = mistake.corrected
      } else {
        updated.persistentMistakes.push({ ...mistake })
      }
    }
  }

  // Detect preferred explanation style from message patterns
  const assistantMessages = session.messages.filter((m) => m.role === "ASSISTANT")
  if (assistantMessages.length > 0) {
    const avgLength =
      assistantMessages.reduce((sum, m) => sum + m.content.length, 0) /
      assistantMessages.length
    updated.averageResponseLength =
      avgLength < 200 ? "SHORT" : avgLength > 500 ? "LONG" : "MEDIUM"
  }

  return updated
}

export function serializeLongTermMemory(memory: LongTermMemory): string {
  return JSON.stringify({
    ...memory,
    lastSessionAt: memory.lastSessionAt?.toISOString() ?? null,
    persistentMistakes: memory.persistentMistakes.map((m) => ({
      ...m,
      lastDetectedAt: m.lastDetectedAt.toISOString(),
    })),
  })
}

export function deserializeLongTermMemory(json: string): LongTermMemory {
  const raw = JSON.parse(json) as Record<string, unknown>
  return {
    ...(raw as LongTermMemory),
    lastSessionAt: raw.lastSessionAt ? new Date(raw.lastSessionAt as string) : null,
    persistentMistakes: ((raw.persistentMistakes as Array<Record<string, unknown>>) ?? []).map(
      (m) => ({
        ...(m as DetectedMistake),
        lastDetectedAt: new Date(m.lastDetectedAt as string),
      })
    ),
  }
}

// ─────────────────────────────────────────────────────────────
// MEMORY SUMMARY — for context window injection
// ─────────────────────────────────────────────────────────────

export function buildMemorySummary(
  shortTerm: ShortTermMemory,
  longTerm: LongTermMemory
): string {
  const parts: string[] = []

  if (longTerm.totalSessions > 0) {
    parts.push(`Dziecko odbyło już ${longTerm.totalSessions} sesji z mentorem.`)
  }

  if (longTerm.persistentMistakes.length > 0) {
    const top = longTerm.persistentMistakes
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, 3)
      .map((m) => m.concept)
    parts.push(`Trudności w poprzednich sesjach: ${top.join(", ")}.`)
  }

  if (longTerm.masteredConcepts.length > 0) {
    parts.push(`Dobrze opanowane: ${longTerm.masteredConcepts.slice(0, 3).join(", ")}.`)
  }

  if (shortTerm.turnCount > 0) {
    parts.push(`W tej sesji omówiono: ${shortTerm.topicsDiscussed.join(", ") || "ogólne tematy"}.`)
  }

  if (shortTerm.detectedMistakes.length > 0) {
    const mistakes = shortTerm.detectedMistakes.map((m) => m.concept).join(", ")
    parts.push(`Błędy w tej sesji: ${mistakes}.`)
  }

  return parts.join(" ") || "Pierwsza sesja z dzieckiem."
}

export function getPreferredStyle(longTerm: LongTermMemory): ExplanationStyle {
  return longTerm.preferredExplanationStyle
}

export function getPreferredLength(longTerm: LongTermMemory): ResponseLength {
  return longTerm.averageResponseLength
}
