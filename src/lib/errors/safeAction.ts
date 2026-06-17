"use server"

import { logger } from "@/src/lib/logger"
import { ZodError } from "zod"
import { Prisma } from "@prisma/client"

export type ActionResult<T = undefined> =
  | { success: true; data?: T }
  | { success: false; message: string }

/**
 * Wraps a server action with standardised error handling.
 * Auth errors, validation errors and Prisma errors are caught and returned
 * as { success: false, message } so the UI never sees raw stack traces.
 */
export async function safeAction<T>(
  domain: keyof typeof import("@/src/lib/logger").logger,
  label: string,
  fn: () => Promise<T>
): Promise<ActionResult<T>> {
  try {
    const data = await fn()
    return { success: true, data }
  } catch (err) {
    if (err instanceof ZodError) {
      const message = err.issues[0]?.message ?? "Nieprawidłowe dane."
      logger[domain].warn(`${label}: validation error`, { issues: err.issues })
      return { success: false, message }
    }

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      logger[domain].error(`${label}: prisma ${err.code}`, { code: err.code, meta: err.meta })
      if (err.code === "P2002") return { success: false, message: "Ten rekord już istnieje." }
      if (err.code === "P2025") return { success: false, message: "Nie znaleziono rekordu." }
      return { success: false, message: "Błąd bazy danych. Spróbuj ponownie." }
    }

    if (err instanceof Prisma.PrismaClientUnknownRequestError) {
      logger[domain].error(`${label}: prisma unknown`, err)
      return { success: false, message: "Błąd bazy danych. Spróbuj ponownie." }
    }

    // next/navigation redirect — must be re-thrown
    if (
      err instanceof Error &&
      (err.message === "NEXT_REDIRECT" || err.message.includes("NEXT_REDIRECT"))
    ) {
      throw err
    }

    logger[domain].error(`${label}: unhandled`, err)
    return { success: false, message: "Coś poszło nie tak. Spróbuj ponownie." }
  }
}
