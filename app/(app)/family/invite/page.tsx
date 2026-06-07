"use client"

import { useState, useTransition } from "react"
import { generateInviteAction, inviteByEmailAction } from "@/src/actions/family/invite"
import { buildInviteUrl } from "@/src/lib/auth/invite"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AuthInput } from "@/src/components/auth/auth-input"
import { AuthError, AuthSuccess } from "@/src/components/auth/auth-error"
import { Copy, Link2, Mail, CheckCircle2 } from "lucide-react"

export default function InvitePage() {
  const [code, setCode] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [linkPending, startLink] = useTransition()
  const [emailState, setEmailState] = useState<{ success?: boolean; error?: string } | null>(null)
  const [emailPending, startEmail] = useTransition()

  const handleGenerateCode = () => {
    startLink(async () => {
      const result = await generateInviteAction()
      if (result.success && result.code) setCode(result.code)
    })
  }

  const copyToClipboard = async () => {
    if (!code) return
    await navigator.clipboard.writeText(buildInviteUrl(code))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleEmailInvite = (formData: FormData) => {
    startEmail(async () => {
      const result = await inviteByEmailAction({ success: false }, formData)
      setEmailState(result)
      if (result.success && result.code) setCode(result.code)
    })
  }

  return (
    <div className="max-w-xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Zaproś do rodziny</h1>
        <p className="text-muted-foreground mt-1">
          Wyślij zaproszenie dziecku lub drugiemu rodzicowi.
        </p>
      </div>

      {/* Link invite */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Link2 className="h-5 w-5 text-primary" />
            Link zapraszający
          </CardTitle>
          <CardDescription>
            Wygeneruj jednorazowy link ważny 7 dni. Idealny do wysłania przez SMS lub WhatsApp.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {code ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2 rounded-xl border bg-muted px-4 py-2.5">
                <code className="flex-1 text-sm font-mono break-all">
                  {buildInviteUrl(code)}
                </code>
                <Button variant="ghost" size="icon" onClick={copyToClipboard} className="shrink-0">
                  {copied ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Kod: <code className="font-mono font-semibold">{code}</code> · wygasa za 7 dni
              </p>
            </div>
          ) : (
            <Button onClick={handleGenerateCode} disabled={linkPending} className="w-full">
              {linkPending ? "Generowanie…" : "Generuj link zapraszający"}
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Email invite */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Mail className="h-5 w-5 text-primary" />
            Zaproś przez email
          </CardTitle>
          <CardDescription>
            Wyślij zaproszenie bezpośrednio na adres email.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleEmailInvite} className="space-y-4">
            <AuthInput
              name="email"
              label="Adres email"
              type="email"
              placeholder="zosia@example.com"
            />
            <div className="space-y-1.5">
              <label className="block text-sm font-medium">Rola</label>
              <select
                name="role"
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="CHILD">Dziecko</option>
                <option value="PARENT">Drugi rodzic</option>
              </select>
            </div>

            {emailState?.error && <AuthError message={emailState.error} />}
            {emailState?.success && (
              <AuthSuccess message="Zaproszenie wysłane! Kod jest aktywny przez 7 dni." />
            )}

            <Button type="submit" disabled={emailPending} className="w-full">
              {emailPending ? "Wysyłanie…" : "Wyślij zaproszenie"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
