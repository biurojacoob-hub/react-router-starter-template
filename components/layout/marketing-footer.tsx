import Link from "next/link";
import { Logo } from "@/components/shared/logo";
import { APP_DESCRIPTION } from "@/lib/constants";

const footerLinks = {
  Produkt: [
    { label: "Funkcje", href: "/#features" },
    { label: "Jak działa", href: "/#how-it-works" },
    { label: "Cennik", href: "/pricing" },
    { label: "AI Mentor", href: "/ai-mentor" },
  ],
  "Dla rodzin": [
    { label: "Panel rodzica", href: "/parent" },
    { label: "Panel dziecka", href: "/child" },
    { label: "Lekcje", href: "/lessons" },
    { label: "Misje", href: "/missions" },
  ],
  Firma: [
    { label: "O nas", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Kontakt", href: "#" },
    { label: "Kariera", href: "#" },
  ],
  Prawne: [
    { label: "Polityka prywatności", href: "#" },
    { label: "Regulamin", href: "#" },
    { label: "Cookies", href: "#" },
  ],
};

export function MarketingFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {APP_DESCRIPTION}
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section} className="space-y-3">
              <h4 className="text-sm font-semibold">{section}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Family Finance Academy. Wszelkie prawa zastrzeżone.
          </p>
          <p className="text-xs text-muted-foreground">
            Zbudowane z ❤️ dla polskich rodzin
          </p>
        </div>
      </div>
    </footer>
  );
}
