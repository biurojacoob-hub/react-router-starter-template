import path from "node:path"
import { defineConfig } from "prisma/config"

// Prisma 7 configuration
// Connection adapter is passed to PrismaClient constructor in src/lib/db.ts
export default defineConfig({
  schema: path.join("prisma", "schema.prisma"),
})
