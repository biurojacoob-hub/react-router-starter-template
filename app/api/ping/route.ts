export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET() {
  const dbUrl = process.env.DATABASE_URL ?? ""
  let dbHost = "MISSING"
  let dbProtocol = "MISSING"
  let dbError = null
  if (dbUrl) {
    try {
      const u = new URL(dbUrl)
      dbHost = u.host
      dbProtocol = u.protocol
    } catch (e) {
      dbError = "INVALID URL: " + (e instanceof Error ? e.message : String(e))
    }
  }

  const pgPrismaUrl = process.env.POSTGRES_PRISMA_URL ?? ""
  let pgPrismaHost = "MISSING"
  if (pgPrismaUrl) {
    try { pgPrismaHost = new URL(pgPrismaUrl).host } catch {}
  }

  // Try raw TCP connection using best available URL
  const bestUrl =
    process.env.DATABASE_POOLER_URL ??
    process.env.POSTGRES_PRISMA_URL ??
    process.env.POSTGRES_URL ??
    dbUrl
  let tcpOk = false
  let tcpError = null
  try {
    const { Pool } = await import("pg")
    const pool = new Pool({ connectionString: bestUrl, max: 1, ssl: { rejectUnauthorized: false }, connectionTimeoutMillis: 4000 })
    const client = await pool.connect()
    await client.query("SELECT 1")
    client.release()
    await pool.end()
    tcpOk = true
  } catch (e) {
    tcpError = e instanceof Error ? e.message : String(e)
  }

  return new Response(JSON.stringify({
    ok: true,
    env: {
      DATABASE_URL: dbUrl ? "SET" : "MISSING",
      DATABASE_HOST: dbHost,
      DATABASE_PROTOCOL: dbProtocol,
      DATABASE_URL_ERROR: dbError,
      DATABASE_POOLER_URL: process.env.DATABASE_POOLER_URL ? "SET" : "MISSING",
      POSTGRES_PRISMA_URL: pgPrismaUrl ? "SET" : "MISSING",
      POSTGRES_PRISMA_HOST: pgPrismaHost,
      POSTGRES_URL: process.env.POSTGRES_URL ? "SET" : "MISSING",
      POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD ? "SET" : "MISSING",
      AUTH_SECRET: process.env.AUTH_SECRET ? `SET (${process.env.AUTH_SECRET.length} chars)` : "MISSING",
      ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY ? "SET" : "MISSING",
      NODE_ENV: process.env.NODE_ENV,
    },
    db: { connected: tcpOk, error: tcpError },
  }, null, 2), { headers: { "content-type": "application/json" } })
}
