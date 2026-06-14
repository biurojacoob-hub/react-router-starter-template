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

  // Try raw TCP connection
  let tcpOk = false
  let tcpError = null
  try {
    const { Pool } = await import("pg")
    const pool = new Pool({ connectionString: dbUrl, max: 1, ssl: { rejectUnauthorized: false }, connectionTimeoutMillis: 4000 })
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
      AUTH_SECRET: process.env.AUTH_SECRET ? `SET (${process.env.AUTH_SECRET.length} chars)` : "MISSING",
      ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY ? "SET" : "MISSING",
      NODE_ENV: process.env.NODE_ENV,
    },
    db: { connected: tcpOk, error: tcpError },
  }, null, 2), { headers: { "content-type": "application/json" } })
}
