export type HeroTitle = {
  title: string
  emoji: string
  tagline: string
}

const TITLES: HeroTitle[] = [
  { title: "Poszukiwacz Monet",   emoji: "🔍", tagline: "Twoja finansowa przygoda się zaczyna!" },
  { title: "Tropiciel Skarbów",   emoji: "🗺️", tagline: "Śledzisz każdą złotówkę jak detektyw!" },
  { title: "Strażnik Budżetu",    emoji: "🛡️", tagline: "Twój budżet jest pod ochroną!" },
  { title: "Mistrz Oszczędzania", emoji: "💎", tagline: "Odkładasz jak prawdziwy mistrz!" },
  { title: "Łowca Okazji",        emoji: "🎯", tagline: "Zawsze znajdziesz najlepszą cenę!" },
  { title: "Finansowy Ninja",     emoji: "🥷", tagline: "Zarządzasz pieniędzmi w cieniu i skutecznie!" },
  { title: "Ekspert Kieszonkowy", emoji: "⭐", tagline: "Twoje kieszonkowe zawsze pracuje!" },
  { title: "Guru Pieniędzy",      emoji: "🌟", tagline: "Inni przychodzą do Ciebie po radę!" },
  { title: "Legenda Finansów",    emoji: "🏆", tagline: "Jesteś inspiracją dla innych!" },
  { title: "Wielki Skarb",        emoji: "👑", tagline: "Osiągnąłeś szczyt finansowej mądrości!" },
]

export function getHeroTitle(level: number): HeroTitle {
  const idx = Math.min(Math.max(level - 1, 0), TITLES.length - 1)
  return TITLES[idx]!
}
