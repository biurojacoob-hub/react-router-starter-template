import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"

// Prevent multiple Prisma Client instances in development (hot reload)
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is not set")
  }
  const pool = new Pool({ connectionString })
  const adapter = new PrismaPg(pool)
  return new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  })
}

// Lazy singleton — defers initialization (and any throw) to first query,
// not module load. Prevents cold-start crashes when DATABASE_URL is missing.
let _client: PrismaClient | undefined

function getClient(): PrismaClient {
  if (globalForPrisma.prisma) return globalForPrisma.prisma
  if (_client) return _client
  _client = createPrismaClient()
  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = _client
  }
  return _client
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (getClient() as any)[prop]
  },
})
