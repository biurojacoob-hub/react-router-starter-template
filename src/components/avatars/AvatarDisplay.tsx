"use client"

import { cn } from "@/lib/utils"
import { AVATARS_BY_ID, type Avatar } from "./avatarData"

type Size = "xs" | "sm" | "md" | "lg" | "xl"

const SIZE_CLASSES: Record<Size, { wrapper: string; emoji: string }> = {
  xs: { wrapper: "h-8 w-8 text-base rounded-lg",       emoji: "text-base" },
  sm: { wrapper: "h-10 w-10 text-xl rounded-xl",       emoji: "text-xl" },
  md: { wrapper: "h-14 w-14 text-2xl rounded-2xl",     emoji: "text-2xl" },
  lg: { wrapper: "h-20 w-20 text-4xl rounded-3xl",     emoji: "text-4xl" },
  xl: { wrapper: "h-28 w-28 text-5xl rounded-3xl",     emoji: "text-5xl" },
}

interface AvatarDisplayProps {
  avatarId: string
  size?: Size
  className?: string
  showRing?: boolean
  showName?: boolean
  locked?: boolean
}

export function AvatarDisplay({
  avatarId,
  size = "md",
  className,
  showRing = false,
  showName = false,
  locked = false,
}: AvatarDisplayProps) {
  const avatar = AVATARS_BY_ID[avatarId]
  const s = SIZE_CLASSES[size]

  if (!avatar) return null

  return (
    <div className={cn("flex flex-col items-center gap-1", className)}>
      <div
        className={cn(
          "relative flex items-center justify-center border-2 border-white shadow-md transition-transform",
          avatar.color,
          s.wrapper,
          showRing && "ring-2 ring-primary ring-offset-2",
          locked && "opacity-50 grayscale"
        )}
      >
        <span className={s.emoji} role="img" aria-label={avatar.name}>
          {locked ? "🔒" : avatar.emoji}
        </span>
      </div>
      {showName && (
        <span className="text-xs font-medium text-muted-foreground text-center leading-tight max-w-[80px]">
          {avatar.name}
        </span>
      )}
    </div>
  )
}

interface AvatarGridProps {
  avatars: Avatar[]
  selectedId?: string
  unlockedIds?: string[]
  onSelect?: (id: string) => void
  size?: Size
}

export function AvatarGrid({
  avatars,
  selectedId,
  unlockedIds,
  onSelect,
  size = "md",
}: AvatarGridProps) {
  const s = SIZE_CLASSES[size]

  return (
    <div className="grid grid-cols-4 gap-3 sm:grid-cols-6">
      {avatars.map((avatar) => {
        const isLocked = unlockedIds ? !unlockedIds.includes(avatar.id) : false
        const isSelected = avatar.id === selectedId

        return (
          <button
            key={avatar.id}
            type="button"
            disabled={isLocked}
            onClick={() => !isLocked && onSelect?.(avatar.id)}
            aria-label={`Wybierz awatar: ${avatar.name}`}
            className={cn(
              "group relative flex flex-col items-center gap-1 rounded-2xl p-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              isSelected ? "bg-primary/10 ring-2 ring-primary" : "hover:bg-muted",
              isLocked && "cursor-not-allowed"
            )}
          >
            <div
              className={cn(
                "flex items-center justify-center border-2 border-white shadow transition-transform group-hover:scale-110",
                avatar.color,
                s.wrapper,
                isSelected && "border-primary",
                isLocked && "opacity-40 grayscale"
              )}
            >
              <span className={s.emoji} role="img" aria-label={avatar.name}>
                {isLocked ? "🔒" : avatar.emoji}
              </span>
            </div>
            <span className="text-[10px] font-medium text-center leading-tight text-muted-foreground line-clamp-1 w-full">
              {isLocked ? `${avatar.unlockXP} XP` : avatar.name}
            </span>
          </button>
        )
      })}
    </div>
  )
}
