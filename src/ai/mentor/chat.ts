import { generateText, streamText } from "../client"
import { buildMentorSafetyBlock } from "./safety"
import { buildChildContextBlock } from "./context"
import { buildReasoningInstructions, analyzeMessageAndReason } from "./reasoning"
import { buildMemorySummary } from "./memory"
import {
  createSession,
  getSession,
  addMessageToSession,
  getRecentMessages,
  recordMistakeInSession,
} from "./memory"
import { parseMentorResponse, getFallbackResponse } from "./responses"
import type {
  MentorChildContext,
  MentorRequest,
  MentorResponse,
  LongTermMemory,
  ContextWindow,
  ChatMessage,
} from "./types"

const MAX_CONTEXT_TURNS = 12

// ─────────────────────────────────────────────────────────────
// buildContextWindow
// ─────────────────────────────────────────────────────────────

export function buildContextWindow(
  ctx: MentorChildContext,
  longTerm: LongTermMemory,
  conversationHistory: ChatMessage[],
  userMessage: string
): ContextWindow {
  const session = getSession(ctx.childId) ?? createSession(ctx.childId)
  const reasoning = analyzeMessageAndReason(userMessage, ctx, session)
  const memorySummary = buildMemorySummary(session, longTerm)

  const systemPrompt = [
    "# AI MENTOR — Family Finance Academy",
    "",
    buildMentorSafetyBlock(ctx.ageGroup),
    "",
    buildChildContextBlock(ctx),
    "",
    `## HISTORIA NAUKI`,
    memorySummary,
    "",
    buildReasoningInstructions(reasoning),
    "",
    "## FORMAT ODPOWIEDZI",
    "Odpowiadaj naturalnie, jak życzliwy nauczyciel.",
    "Możesz opcjonalnie zwrócić JSON na końcu w bloku ```json { ... }``` z polami:",
    '{ "suggestedSkill": "skill-id", "xpHint": number, "followUpQuestions": ["..."], "detectedMistake": "..." }',
    "Ale priorytetem jest NATURALNA odpowiedź tekstowa.",
  ].join("\n")

  // Trim history to MAX_CONTEXT_TURNS
  const trimmed = conversationHistory.slice(-(MAX_CONTEXT_TURNS * 2))

  return {
    systemPrompt,
    messages: trimmed,
    childContext: ctx,
    reasoning,
  }
}

// ─────────────────────────────────────────────────────────────
// sendMessage — non-streaming
// ─────────────────────────────────────────────────────────────

export async function sendMessage(
  request: MentorRequest,
  ctx: MentorChildContext,
  longTerm: LongTermMemory
): Promise<MentorResponse> {
  const sessionId = request.sessionId

  let session = getSession(sessionId)
  if (!session) session = createSession(ctx.childId)

  const { systemPrompt, messages, reasoning } = buildContextWindow(
    ctx,
    longTerm,
    request.conversationHistory,
    request.message
  )

  // Record user message in session
  addMessageToSession(sessionId, {
    role: "USER",
    content: request.message,
    timestamp: new Date(),
    skillId: request.currentSkillId,
  })

  try {
    const rawText = await generateText(
      systemPrompt,
      buildUserTurn(messages, request.message),
      { maxRetries: 2 }
    )

    const response = parseMentorResponse(rawText, sessionId, reasoning, ctx)

    // Record assistant reply in session
    addMessageToSession(sessionId, {
      role: "ASSISTANT",
      content: response.message,
      timestamp: new Date(),
      skillId: response.suggestedSkill,
      detectedMistake: response.detectedMistake,
    })

    // Track detected mistake
    if (response.detectedMistake) {
      recordMistakeInSession(sessionId, response.detectedMistake, "Detected in conversation")
    }

    return response
  } catch {
    return getFallbackResponse(ctx.ageGroup, sessionId)
  }
}

// ─────────────────────────────────────────────────────────────
// getResponse — alias for sendMessage (compatibility)
// ─────────────────────────────────────────────────────────────

export async function getResponse(
  request: MentorRequest,
  ctx: MentorChildContext,
  longTerm: LongTermMemory
): Promise<MentorResponse> {
  return sendMessage(request, ctx, longTerm)
}

// ─────────────────────────────────────────────────────────────
// streamResponse — streaming version
// ─────────────────────────────────────────────────────────────

export async function* streamResponse(
  request: MentorRequest,
  ctx: MentorChildContext,
  longTerm: LongTermMemory
): AsyncGenerator<string> {
  const sessionId = request.sessionId

  let session = getSession(sessionId)
  if (!session) session = createSession(ctx.childId)

  const { systemPrompt, messages } = buildContextWindow(
    ctx,
    longTerm,
    request.conversationHistory,
    request.message
  )

  addMessageToSession(sessionId, {
    role: "USER",
    content: request.message,
    timestamp: new Date(),
    skillId: request.currentSkillId,
  })

  const userTurn = buildUserTurn(messages, request.message)

  let fullResponse = ""
  try {
    for await (const chunk of streamText(systemPrompt, userTurn)) {
      fullResponse += chunk
      yield chunk
    }

    // After streaming finishes, record the full response
    addMessageToSession(sessionId, {
      role: "ASSISTANT",
      content: fullResponse,
      timestamp: new Date(),
    })
  } catch {
    const fallback = getFallbackResponse(ctx.ageGroup, sessionId).message
    yield fallback
  }
}

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

function buildUserTurn(history: ChatMessage[], newMessage: string): string {
  if (history.length === 0) return newMessage

  const historyText = history
    .map((m) => `${m.role === "USER" ? "Dziecko" : "Mentor"}: ${m.content}`)
    .join("\n")

  return `${historyText}\nDziecko: ${newMessage}`
}
