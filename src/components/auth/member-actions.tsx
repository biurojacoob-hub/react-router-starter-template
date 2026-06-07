"use client"

import { useTransition, useState } from "react"
import { updateMemberRoleAction, removeMemberAction } from "@/src/actions/family/members"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Trash2, ArrowUpDown } from "lucide-react"

export function MemberActions({
  userId,
  currentRole,
}: {
  userId: string
  currentRole: "PARENT" | "CHILD"
}) {
  const [open, setOpen] = useState(false)
  const [rolePending, startRole] = useTransition()
  const [removePending, startRemove] = useTransition()

  const toggleRole = () => {
    const fd = new FormData()
    fd.set("userId", userId)
    fd.set("role", currentRole === "PARENT" ? "CHILD" : "PARENT")
    startRole(async () => {
      await updateMemberRoleAction({ success: false }, fd)
      setOpen(false)
    })
  }

  const remove = () => {
    if (!confirm("Czy na pewno chcesz usunąć tego członka z rodziny?")) return
    const fd = new FormData()
    fd.set("userId", userId)
    startRemove(async () => {
      await removeMemberAction({ success: false }, fd)
    })
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => setOpen((o) => !o)}
      >
        <MoreHorizontal className="h-4 w-4" />
      </Button>

      {open && (
        <div className="absolute right-0 top-9 z-20 w-44 rounded-xl border bg-popover shadow-lg overflow-hidden">
          <button
            onClick={toggleRole}
            disabled={rolePending}
            className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors"
          >
            <ArrowUpDown className="h-4 w-4" />
            {currentRole === "PARENT" ? "Zmień na Dziecko" : "Zmień na Rodzica"}
          </button>
          <button
            onClick={remove}
            disabled={removePending}
            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            Usuń z rodziny
          </button>
        </div>
      )}
    </div>
  )
}
