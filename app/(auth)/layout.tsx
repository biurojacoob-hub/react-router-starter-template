import type { ReactNode } from "react"
import { Logo } from "@/components/shared/logo"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left panel — branding */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-sky-600 to-emerald-600 text-white">
        <Logo variant="light" />
        <blockquote className="space-y-4">
          <p className="text-2xl font-medium leading-relaxed">
            &ldquo;Każde dziecko zasługuje na finansowy start, którego my nie mieliśmy.&rdquo;
          </p>
          <footer className="text-sky-100 text-sm">— Misja Family Finance Academy</footer>
        </blockquote>
        <div className="space-y-2 text-sky-100 text-sm">
          <p>✓ 500+ rodzin już się uczy</p>
          <p>✓ AI Mentor dopasowany do wieku dziecka</p>
          <p>✓ System gamifikacji nagradzający prawdziwą wiedzę</p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="lg:hidden flex justify-center mb-8">
            <Logo />
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
