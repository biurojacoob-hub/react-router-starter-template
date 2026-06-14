export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET() {
  return new Response(JSON.stringify({
    ok: true,
    DATABASE_URL: process.env.DATABASE_URL ? "SET" : "MISSING",
    AUTH_SECRET: process.env.AUTH_SECRET ? "SET" : "MISSING",
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY ? "SET" : "MISSING",
    NODE_ENV: process.env.NODE_ENV,
  }), { headers: { "content-type": "application/json" } })
}
