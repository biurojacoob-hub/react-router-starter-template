import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"
import type { PoolConfig } from "pg"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function resolveConnectionUrl(raw: string): PoolConfig {
  try {
    const u = new URL(raw)
    const host = u.hostname
    const password = decodeURIComponent(u.password)
    const user = decodeURIComponent(u.username)

    // Auto-convert Supabase direct URL (IPv6, blocked on Vercel) to Transaction Pooler
    if (host.startsWith("db.") && host.endsWith(".supabase.co")) {
      const projectRef = host.replace(/^db\./, "").replace(/\.supabase\.co$/, "")
      const poolerHost = "aws-0-eu-west-1.pooler.supabase.com"
      const poolerUser = `postgres.${projectRef}`
      console.log(`[DB] Auto-converting direct URL to pooler: ${poolerHost} as ${poolerUser}`)
      return {
        host: poolerHost,
        port: 6543,
        database: "postgres",
        user: poolerUser,
        password,
        ssl: { rejectUnauthorized: false },
        max: 1,
      }
    }

    return {
      host,
      port: u.port ? parseInt(u.port) : 5432,
      database: u.pathname.replace(/^\//, ""),
      user,
      password,
      ssl: { rejectUnauthorized: false },
      max: 1,
    }
  } catch {
    return { connectionString: raw, ssl: { rejectUnauthorized: false }, max: 1 }
  }
}

function createClient(): PrismaClient {
  const url = process.env.DATABASE_URL
  if (!url) {
    console.error("[DB] DATABASE_URL is not set — all database queries will fail")
  }
  try {
    const config = url ? resolveConnectionUrl(url) : { ssl: { rejectUnauthorized: false }, max: 1 }
    const pool = new Pool(config)
    const adapter = new PrismaPg(pool)
    return new PrismaClient({ adapter })
  } catch (err) {
    console.error("[DB] Failed to create PrismaClient:", err)
    throw err
  }
}

export const prisma = globalForPrisma.prisma ?? createClient()

// Cache in ALL environments to prevent connection pool leaks
globalForPrisma.prisma = prisma
