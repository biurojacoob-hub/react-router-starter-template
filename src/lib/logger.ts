// Structured logger for production observability.
// All log lines are prefixed with a domain tag for easy filtering in Vercel logs.

type LogLevel = "info" | "warn" | "error"

function log(level: LogLevel, tag: string, message: string, data?: unknown) {
  const prefix = `[${tag}]`
  const payload = data !== undefined ? { message, data } : message
  if (level === "error") console.error(prefix, payload)
  else if (level === "warn") console.warn(prefix, payload)
  else console.log(prefix, payload)
}

export const logger = {
  auth: {
    info:  (msg: string, data?: unknown) => log("info",  "AUTH",        msg, data),
    warn:  (msg: string, data?: unknown) => log("warn",  "AUTH",        msg, data),
    error: (msg: string, data?: unknown) => log("error", "AUTH",        msg, data),
  },
  ai: {
    info:  (msg: string, data?: unknown) => log("info",  "AI",          msg, data),
    warn:  (msg: string, data?: unknown) => log("warn",  "AI",          msg, data),
    error: (msg: string, data?: unknown) => log("error", "AI",          msg, data),
  },
  mission: {
    info:  (msg: string, data?: unknown) => log("info",  "MISSION",     msg, data),
    warn:  (msg: string, data?: unknown) => log("warn",  "MISSION",     msg, data),
    error: (msg: string, data?: unknown) => log("error", "MISSION",     msg, data),
  },
  onboarding: {
    info:  (msg: string, data?: unknown) => log("info",  "ONBOARDING",  msg, data),
    warn:  (msg: string, data?: unknown) => log("warn",  "ONBOARDING",  msg, data),
    error: (msg: string, data?: unknown) => log("error", "ONBOARDING",  msg, data),
  },
  dashboard: {
    info:  (msg: string, data?: unknown) => log("info",  "DASHBOARD",   msg, data),
    warn:  (msg: string, data?: unknown) => log("warn",  "DASHBOARD",   msg, data),
    error: (msg: string, data?: unknown) => log("error", "DASHBOARD",   msg, data),
  },
  payment: {
    info:  (msg: string, data?: unknown) => log("info",  "PAYMENT",     msg, data),
    warn:  (msg: string, data?: unknown) => log("warn",  "PAYMENT",     msg, data),
    error: (msg: string, data?: unknown) => log("error", "PAYMENT",     msg, data),
  },
  db: {
    info:  (msg: string, data?: unknown) => log("info",  "DB",          msg, data),
    warn:  (msg: string, data?: unknown) => log("warn",  "DB",          msg, data),
    error: (msg: string, data?: unknown) => log("error", "DB",          msg, data),
  },
}
