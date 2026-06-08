const REQUIRED_VARS = [
  "DATABASE_URL",
  "AUTH_SECRET",
  "ANTHROPIC_API_KEY",
] as const

type RequiredVar = (typeof REQUIRED_VARS)[number]

function validateEnv(): void {
  const missing: string[] = []
  const invalid: string[] = []

  for (const key of REQUIRED_VARS) {
    const value = process.env[key]
    if (!value) {
      missing.push(key)
      continue
    }
    if (key === "AUTH_SECRET" && value === "REPLACE_WITH_GENERATED_SECRET") {
      invalid.push(`${key} (placeholder not replaced — run: npx auth secret)`)
    }
  }

  if (missing.length > 0 || invalid.length > 0) {
    const lines: string[] = ["", "❌ Environment validation failed:", ""]
    if (missing.length > 0) {
      lines.push("  Missing variables:")
      missing.forEach((v) => lines.push(`    • ${v}`))
      lines.push("")
    }
    if (invalid.length > 0) {
      lines.push("  Invalid values:")
      invalid.forEach((v) => lines.push(`    • ${v}`))
      lines.push("")
    }
    lines.push("  Copy .env.example to .env.local and fill in the values.", "")
    throw new Error(lines.join("\n"))
  }
}

export function getEnv(key: RequiredVar): string {
  const value = process.env[key]
  if (!value) throw new Error(`Missing environment variable: ${key}`)
  return value
}

// Validate at import time in server context only
if (typeof window === "undefined" && process.env.NODE_ENV !== "test") {
  validateEnv()
}
