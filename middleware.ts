export const runtime = "nodejs"

import NextAuth from "next-auth"
import { authConfig } from "@/src/auth.config"
import { NextResponse } from "next/server"
import type { NextFetchEvent } from "next/server"
import type { NextAuthRequest } from "next-auth"

const { auth } = NextAuth(authConfig)

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

export default auth(
  (req: NextAuthRequest, _event: NextFetchEvent) => {
    const session = req.auth
    const pathname = req.nextUrl.pathname
    const isAuthenticated = !!session?.user

    // Logged-in users shouldn't see sign-in/sign-up
    if (isAuthenticated && AUTH_ONLY_ROUTES.some((r) => pathname.startsWith(r))) {
      const dest = session!.user.onboardingDone
        ? "/dashboard"
        : session!.user.role === "CHILD"
        ? "/child/welcome"
        : "/onboarding"
      return NextResponse.redirect(new URL(dest, req.url))
    }

    // Protect app routes
    if (PROTECTED_PREFIXES.some((p) => pathname.startsWith(p)) && !isAuthenticated) {
      const url = new URL("/sign-in", req.url)
      url.searchParams.set("callbackUrl", pathname)
      return NextResponse.redirect(url)
    }

    // Require onboarding before accessing app
    if (
      isAuthenticated &&
      !session!.user.onboardingDone &&
      POST_ONBOARDING_PREFIXES.some((p) => pathname.startsWith(p))
    ) {
      const dest = session!.user.role === "CHILD" ? "/child/welcome" : "/onboarding"
      return NextResponse.redirect(new URL(dest, req.url))
    }

    return NextResponse.next()
  }
)

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|api/auth).*)",
  ],
}
