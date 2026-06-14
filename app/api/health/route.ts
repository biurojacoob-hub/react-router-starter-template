export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(): Promise<Response> {
  const results: Record<string, unknown> = {}

  // 1. Check env vars
  results.env = {
    DATABASE_URL: process.env.DATABASE_URL
      ? `SET (${process.env.DATABASE_URL.substring(0, 50)}...)`
      : "MISSING",
    AUTH_SECRET: process.env.AUTH_SECRET
      ? `SET (${process.env.AUTH_SECRET.length} chars)`
      : "MISSING",
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY
      ? `SET (${process.env.ANTHROPIC_API_KEY.substring(0, 15)}...)`
      : "MISSING",
    NEXTAUTH_URL: process.env.NEXTAUTH_URL ?? "NOT SET (ok on Vercel)",
    NODE_ENV: process.env.NODE_ENV,
  }

  // 2. Test raw pg connection (no Prisma)
  try {
    const { Pool } = await import("pg")
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 1,
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: 5000,
    })
    const client = await pool.connect()
    const res = await client.query("SELECT NOW() as now")
    client.release()
    await pool.end()
    results.pg_direct = { status: "OK", time: res.rows[0]?.now }
  } catch (err) {
    console.error("[HEALTH] pg direct error:", err)
    results.pg_direct = {
      status: "ERROR",
      message: err instanceof Error ? err.message : String(err),
    }
  }

  // 3. Test Prisma via dynamic import
  try {
    const { PrismaClient } = await import("@prisma/client")
    const { PrismaPg } = await import("@prisma/adapter-pg")
    const { Pool } = await import("pg")
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 1,
      ssl: { rejectUnauthorized: false },
    })
    const adapter = new PrismaPg(pool)
    const prisma = new PrismaClient({ adapter })
    const result = await prisma.$queryRaw<[{ now: Date }]>`SELECT NOW() as now`
    const userCount = await prisma.user.count()
    await prisma.$disconnect()
    results.prisma = { status: "OK", time: result[0]?.now, userCount }
  } catch (err) {
    console.error("[HEALTH] Prisma error:", err)
    results.prisma = {
      status: "ERROR",
      message: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack?.split("\n").slice(0, 5).join(" | ") : undefined,
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

  console.log("[HEALTH] Result:", JSON.stringify(results, null, 2))
  return Response.json(results)
}
