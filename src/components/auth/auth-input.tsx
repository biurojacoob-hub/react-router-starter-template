import { cn } from "@/lib/utils"

type AuthInputProps = {
  name: string
  label: string
  type?: string
  placeholder?: string
  autoComplete?: string
  error?: string
  disabled?: boolean
  defaultValue?: string
}

export function AuthInput({
  name,
  label,
  type = "text",
  placeholder,
  autoComplete,
  error,
  disabled,
  defaultValue,
}: AuthInputProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="block text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        disabled={disabled}
        className={cn(
          "w-full rounded-xl border bg-background px-4 py-2.5 text-sm",
          "placeholder:text-muted-foreground",
          "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "transition-colors",
          error ? "border-destructive focus:ring-destructive/50" : "border-border"
        )}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && (
        <p id={`${name}-error`} className="text-xs text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
