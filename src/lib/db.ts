import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"
import type { PoolConfig } from "pg"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createClient(): PrismaClient {
  const url = process.env.DATABASE_URL
  if (!url) {
    console.error("[DB] DATABASE_URL is not set — all database queries will fail")
  }
  try {
    // Parse URL manually so pg doesn't mishandle usernames with dots (pooler format)
    let config: PoolConfig = { max: 1, ssl: { rejectUnauthorized: false } }
    if (url) {
      try {
        const u = new URL(url)
        config = {
          host: u.hostname,
          port: u.port ? parseInt(u.port) : 5432,
          database: u.pathname.replace(/^\//, ""),
          user: decodeURIComponent(u.username),
          password: decodeURIComponent(u.password),
          ssl: { rejectUnauthorized: false },
          max: 1,
        }
        console.log(`[DB] Connecting to ${u.hostname}:${u.port || 5432} as ${decodeURIComponent(u.username)}`)
      } catch {
        config = { connectionString: url, ssl: { rejectUnauthorized: false }, max: 1 }
      }
    }
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
