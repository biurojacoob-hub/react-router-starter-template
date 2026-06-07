import { AlertCircle } from "lucide-react"

export function AuthError({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
    >
      <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
      <span>{message}</span>
    </div>
  )
}

export function AuthSuccess({ message }: { message: string }) {
  return (
    <div
      role="status"
      className="flex items-start gap-2 rounded-xl border border-emerald-300 bg-emerald-50 dark:bg-emerald-950/30 dark:border-emerald-800 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-400"
    >
      <span>✓</span>
      <span>{message}</span>
    </div>
  )
}
