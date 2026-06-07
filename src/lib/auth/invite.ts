import { randomBytes } from "crypto"

/**
 * Generate a cryptographically random 8-character invite code (uppercase alphanum).
 */
export function generateInviteCode(): string {
  return randomBytes(6)
    .toString("base64")
    .replace(/[^A-Z0-9]/gi, "")
    .toUpperCase()
    .slice(0, 8)
    .padEnd(8, "A")
}

/**
 * Build a full invite URL from a code.
 */
export function buildInviteUrl(code: string): string {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
  return `${base}/join/${code}`
}
