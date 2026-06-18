import Anthropic from "@anthropic-ai/sdk"
import type { AIClientOptions } from "./types"

const MODEL = "claude-haiku-4-5-20251001"

let _client: Anthropic | null = null

function getClient(): Anthropic {
  if (!_client) {
    _client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    })
  }
  return _client
}

async function withRetry<T>(fn: () => Promise<T>, maxRetries = 3): Promise<T> {
  let lastError: Error | null = null
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn()
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err))
      const isRateLimit =
        err instanceof Anthropic.RateLimitError ||
        (err instanceof Anthropic.APIError && err.status === 529)
      if (!isRateLimit || attempt === maxRetries) throw lastError
      const delay = Math.pow(2, attempt) * 1000 + Math.random() * 500
      await new Promise((r) => setTimeout(r, delay))
    }
  }
  throw lastError
}

export async function generateText(
  systemPrompt: string,
  userMessage: string,
  options: AIClientOptions = {}
): Promise<string> {
  const client = getClient()
  const { maxRetries = 3 } = options

  return withRetry(async () => {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 2048,
      system: systemPrompt,
      messages: [{ role: "user", content: userMessage }],
    })

    const textBlock = response.content.find((b) => b.type === "text")
    if (!textBlock || textBlock.type !== "text") {
      throw new Error("No text in AI response")
    }
    return textBlock.text
  }, maxRetries)
}

export async function generateJSON<T>(
  systemPrompt: string,
  userMessage: string,
  validator: (raw: unknown) => T,
  options: AIClientOptions = {}
): Promise<T> {
  const fullSystem = `${systemPrompt}\n\nRespond ONLY with valid JSON. No markdown, no code fences, no explanation.`
  const text = await generateText(fullSystem, userMessage, options)

  const jsonMatch = text.match(/\{[\s\S]*\}|\[[\s\S]*\]/)
  if (!jsonMatch) throw new Error("AI response contained no JSON")

  const parsed: unknown = JSON.parse(jsonMatch[0])
  return validator(parsed)
}

export async function* streamText(
  systemPrompt: string,
  userMessage: string
): AsyncGenerator<string> {
  const client = getClient()

  const stream = await client.messages.create({
    model: MODEL,
    max_tokens: 2048,
    system: systemPrompt,
    messages: [{ role: "user", content: userMessage }],
    stream: true,
  })

  for await (const event of stream) {
    if (
      event.type === "content_block_delta" &&
      event.delta.type === "text_delta"
    ) {
      yield event.delta.text
    }
  }
}
