"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AvatarGrid, AvatarDisplay } from "@/src/components/avatars/AvatarDisplay"
import { ALL_AVATARS, FREE_AVATARS, type AvatarCategory } from "@/src/components/avatars/avatarData"

interface AvatarPickerProps {
  ageGroup: AvatarCategory
  childName: string
  onComplete: (avatarId: string) => void
}

export function AvatarPicker({ ageGroup, childName, onComplete }: AvatarPickerProps) {
  const [selected, setSelected] = useState<string>(
    FREE_AVATARS.find((a) => a.category === ageGroup)?.id ?? FREE_AVATARS[0]!.id
  )

  // Show age-group avatars first, then others
  const primary = ALL_AVATARS.filter((a) => a.category === ageGroup)
  const others = ALL_AVATARS.filter((a) => a.category !== ageGroup && a.unlockXP === 0)
  const avatarsToShow = [...primary, ...others]

  const selectedAvatar = ALL_AVATARS.find((a) => a.id === selected)

  return (
    <div className="flex flex-col items-center gap-6 px-4">
      <div className="text-center">
        <h2 className="text-2xl font-black mb-1">Wybierz swój awatar</h2>
        <p className="text-sm text-muted-foreground">
          Cześć {childName}! Jak chcesz wyglądać?
        </p>
      </div>

      {/* Preview */}
      <div className="flex flex-col items-center gap-2">
        <AvatarDisplay avatarId={selected} size="xl" showRing />
        {selectedAvatar && (
          <div className="text-center">
            <p className="font-bold">{selectedAvatar.name}</p>
            <p className="text-xs text-muted-foreground">{selectedAvatar.description}</p>
          </div>
        )}
      </div>

      {/* Grid */}
      <div className="w-full max-w-sm">
        <p className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Dla twojego poziomu
        </p>
        <AvatarGrid
          avatars={avatarsToShow}
          selectedId={selected}
          unlockedIds={avatarsToShow.filter((a) => a.unlockXP === 0).map((a) => a.id)}
          onSelect={setSelected}
          size="sm"
        />
      </div>

      <Button
        size="lg"
        className="w-full max-w-sm rounded-2xl"
        onClick={() => onComplete(selected)}
      >
        To jest mój awatar! →
      </Button>
    </div>
  )
}
