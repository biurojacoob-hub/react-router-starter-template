import { prisma } from "@/src/lib/db"

export const runtime = "nodejs"

export async function GET(): Promise<Response> {
  const results: Record<string, unknown> = {}

  // 1. Check env vars
  results.env = {
    DATABASE_URL: process.env.DATABASE_URL ? "SET" : "MISSING",
    AUTH_SECRET: process.env.AUTH_SECRET
      ? `SET (${process.env.AUTH_SECRET.length} chars)`
      : "MISSING",
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY ? "SET" : "MISSING",
    NEXTAUTH_URL: process.env.NEXTAUTH_URL ?? "NOT SET (ok on Vercel)",
    NODE_ENV: process.env.NODE_ENV,
  }

  // 2. Test DB connection
  try {
    const result = await prisma.$queryRaw<[{ now: Date }]>`SELECT NOW() as now`
    results.db = { status: "OK", time: result[0]?.now }
  } catch (err) {
    console.error("[HEALTH] DB error:", err)
    results.db = {
      status: "ERROR",
      message: err instanceof Error ? err.message : String(err),
    }
  }

  // 3. Test table access
  try {
    const userCount = await prisma.user.count()
    const sessionCount = await prisma.session.count()
    results.tables = { status: "OK", users: userCount, sessions: sessionCount }
  } catch (err) {
    console.error("[HEALTH] Table error:", err)
    results.tables = {
      status: "ERROR",
      message: err instanceof Error ? err.message : String(err),
    }
  }

  // 4. Test Anthropic SDK init
  try {
    const { default: Anthropic } = await import("@anthropic-ai/sdk")
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
    results.anthropic = {
      status: process.env.ANTHROPIC_API_KEY ? "SDK_INITIALIZED" : "NO_API_KEY",
      baseURL: client.baseURL,
    }
  } catch (err) {
    console.error("[HEALTH] Anthropic error:", err)
    results.anthropic = {
      status: "ERROR",
      message: err instanceof Error ? err.message : String(err),
    }
  }

  console.log("[HEALTH] Diagnostic result:", JSON.stringify(results, null, 2))

  return Response.json(results)
}
