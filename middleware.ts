export const runtime = "nodejs"

import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { decode } from "next-auth/jwt"

const PROTECTED_PREFIXES = [
  "/dashboard",
  "/lessons",
  "/missions",
  "/goals",
  "/parent",
  "/child",
  "/family",
  "/settings",
  "/ai-mentor",
]

const AUTH_ONLY_ROUTES = ["/sign-in", "/sign-up"]

const POST_ONBOARDING_PREFIXES = [
  "/dashboard",
  "/lessons",
  "/missions",
  "/goals",
  "/parent",
  "/child",
  "/family",
  "/ai-mentor",
]

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname

  // Decode JWT session cookie directly — avoids NextAuth() module-level init crash
  let token = null
  try {
    const secret = process.env.AUTH_SECRET
    if (secret) {
      token = await decode({
        token: req.cookies.get("authjs.session-token")?.value ??
               req.cookies.get("__Secure-authjs.session-token")?.value,
        secret,
        salt: req.cookies.get("__Secure-authjs.session-token")
          ? "__Secure-authjs.session-token"
          : "authjs.session-token",
      })
    }
  } catch {
    // no valid session
  }

  const isAuthenticated = !!token
  const onboardingDone = (token as { onboardingDone?: boolean } | null)?.onboardingDone ?? false
  const role = (token as { role?: string } | null)?.role ?? ""

  // Logged-in users shouldn't see sign-in/sign-up
  if (isAuthenticated && AUTH_ONLY_ROUTES.some((r) => pathname.startsWith(r))) {
    const dest = onboardingDone ? "/dashboard" : role === "CHILD" ? "/child/welcome" : "/onboarding"
    return NextResponse.redirect(new URL(dest, req.url))
  }

  // Protect app routes
  if (PROTECTED_PREFIXES.some((p) => pathname.startsWith(p)) && !isAuthenticated) {
    const url = new URL("/sign-in", req.url)
    url.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(url)
  }

  // Require onboarding before accessing app
  // Also pass through if onboarding_done cookie is set (JWT not yet refreshed after step 4)
  const justFinishedOnboarding = req.cookies.get("onboarding_done")?.value === "1"
  if (isAuthenticated && !onboardingDone && !justFinishedOnboarding && POST_ONBOARDING_PREFIXES.some((p) => pathname.startsWith(p))) {
    const dest = role === "CHILD" ? "/child/welcome" : "/onboarding"
    return NextResponse.redirect(new URL(dest, req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|api/).*)",
  ],
}
