/* App-wide constants — single source of truth */

export const APP_NAME = "Family Finance Academy";
export const APP_TAGLINE = "Naucz swoje dzieci mądrości finansowej";
export const APP_DESCRIPTION =
  "Interaktywna platforma EdTech pomagająca rodzicom uczyć dzieci i nastolatków zdrowych nawyków finansowych.";

/* Navigation links for marketing pages */
export const MARKETING_NAV = [
  { label: "Funkcje", href: "/#features" },
  { label: "Jak działa", href: "/#how-it-works" },
  { label: "Cennik", href: "/pricing" },
  { label: "AI Mentor", href: "/ai-mentor" },
] as const;

/* Navigation links for authenticated app */
export const APP_NAV = [
  { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "Lekcje", href: "/lessons", icon: "BookOpen" },
  { label: "Misje", href: "/missions", icon: "Target" },
  { label: "Cele", href: "/goals", icon: "PiggyBank" },
  { label: "AI Mentor", href: "/ai-mentor", icon: "Sparkles" },
] as const;

export const PARENT_NAV = [
  { label: "Panel rodzica", href: "/parent", icon: "Users" },
  { label: "Panel dziecka", href: "/child", icon: "User" },
  { label: "Ustawienia", href: "/settings", icon: "Settings" },
] as const;

/* Pricing plans */
export const PRICING_PLANS = [
  {
    id: "free",
    name: "Starter",
    price: 0,
    description: "Idealny na start – bezpłatnie na zawsze",
    features: [
      "3 lekcje miesięcznie",
      "Podstawowe misje",
      "1 cel oszczędnościowy",
      "Panel rodzica (tylko odczyt)",
    ],
    cta: "Zacznij bezpłatnie",
    highlighted: false,
  },
  {
    id: "family",
    name: "Rodzina",
    price: 39,
    description: "Pełny dostęp dla całej rodziny",
    features: [
      "Nieograniczone lekcje",
      "Wszystkie misje i wyzwania",
      "Nieograniczone cele",
      "Panel rodzica z pełną kontrolą",
      "AI Mentor – 50 wiadomości / mies.",
      "Raporty postępu",
    ],
    cta: "Wypróbuj 14 dni gratis",
    highlighted: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: 69,
    description: "Dla rodzin, które chcą najlepszego wsparcia",
    features: [
      "Wszystko z planu Rodzina",
      "Nieograniczony AI Mentor",
      "Sesje 1:1 z ekspertem (2/mies.)",
      "Certyfikaty ukończenia",
      "Priorytetowe wsparcie",
    ],
    cta: "Skontaktuj się",
    highlighted: false,
  },
] as const;

/* Demo data constants — replaced by real DB later */
export const DEMO_USER = {
  name: "Marek Kowalski",
  childName: "Zosia",
  childAge: 12,
  avatar: "/avatars/parent.png",
  childAvatar: "/avatars/child.png",
  xp: 1240,
  level: 5,
  streak: 7,
} as const;
