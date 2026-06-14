import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createClient(): PrismaClient {
  const url = process.env.DATABASE_URL
  if (!url) {
    console.error("[DB] DATABASE_URL is not set — all database queries will fail")
  }
  try {
    const pool = new Pool({
      connectionString: url,
      max: 1, // Serverless: limit pool size to 1 per Lambda instance
      ssl: { rejectUnauthorized: false }, // Supabase requires SSL
    })
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
