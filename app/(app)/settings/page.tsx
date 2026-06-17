"use client"

import { useActionState } from "react"
import { User, Lock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { updateDisplayName, changePassword } from "@/src/actions/settings/updateProfile"
import type { SettingsResult } from "@/src/actions/settings/updateProfile"

const initialState: SettingsResult = { success: true }

function StatusMessage({ state }: { state: SettingsResult }) {
  if (state.success) return null
  return (
    <p className="text-sm text-destructive mt-2">{state.message}</p>
  )
}

function SuccessBanner({ state }: { state: SettingsResult }) {
  if (!state.success || !("_show" in state)) return null
  return null
}

function DisplayNameForm() {
  const [state, action, pending] = useActionState(updateDisplayName, initialState)
  return (
    <form action={action} className="space-y-4">
      {state.success === false && (
        <p className="text-sm text-destructive">{state.message}</p>
      )}
      {(state as { success: true; _ok?: boolean })._ok && (
        <p className="text-sm text-emerald-600">Zapisano pomyślnie.</p>
      )}
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="firstName">Imię</Label>
          <Input id="firstName" name="firstName" placeholder="Imię" required minLength={2} maxLength={50} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="lastName">Nazwisko</Label>
          <Input id="lastName" name="lastName" placeholder="Nazwisko (opcjonalne)" maxLength={50} />
        </div>
      </div>
      <Button type="submit" disabled={pending} size="sm">
        {pending ? "Zapisywanie…" : "Zapisz imię"}
      </Button>
    </form>
  )
}

function PasswordForm() {
  const [state, action, pending] = useActionState(changePassword, initialState)
  return (
    <form action={action} className="space-y-4">
      {state.success === false && (
        <p className="text-sm text-destructive">{state.message}</p>
      )}
      <div className="space-y-1.5">
        <Label htmlFor="currentPassword">Aktualne hasło</Label>
        <Input id="currentPassword" name="currentPassword" type="password" autoComplete="current-password" required />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="newPassword">Nowe hasło</Label>
        <Input id="newPassword" name="newPassword" type="password" autoComplete="new-password" required minLength={8} />
      </div>
      <Button type="submit" disabled={pending} size="sm">
        {pending ? "Zmienianie…" : "Zmień hasło"}
      </Button>
    </form>
  )
}

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-2xl animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Ustawienia</h1>
        <p className="text-muted-foreground text-sm mt-1">Zarządzaj kontem</p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-50 dark:bg-sky-900/20">
              <User className="h-4 w-4 text-sky-600" />
            </div>
            Wyświetlana nazwa
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DisplayNameForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-900/20">
              <Lock className="h-4 w-4 text-emerald-600" />
            </div>
            Zmiana hasła
          </CardTitle>
        </CardHeader>
        <CardContent>
          <PasswordForm />
        </CardContent>
      </Card>
    </div>
  )
}
