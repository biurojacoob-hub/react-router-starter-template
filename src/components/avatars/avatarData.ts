// ─────────────────────────────────────────────────────────────
// AVATAR SYSTEM — 24 avatars across 4 age-group categories
// ─────────────────────────────────────────────────────────────

export type AvatarCategory = "EXPLORER" | "LEARNER" | "ACHIEVER" | "MASTER"

export type Avatar = {
  id: string
  emoji: string
  name: string
  category: AvatarCategory
  unlockXP: number        // 0 = free
  color: string           // tailwind bg color
  description: string
}

export const ALL_AVATARS: Avatar[] = [
  // ── EXPLORER (6–9) — free + low XP ──────────────────────
  { id: "piggy",     emoji: "🐷", name: "Świnka Oszczędna",  category: "EXPLORER", unlockXP: 0,   color: "bg-pink-100",   description: "Mała świnka, która kocha zbierać monety" },
  { id: "rocket",    emoji: "🚀", name: "Rakieta Wiedzy",    category: "EXPLORER", unlockXP: 0,   color: "bg-blue-100",   description: "Śmiga przez lekcje jak rakieta!" },
  { id: "owl",       emoji: "🦉", name: "Mądra Sowa",        category: "EXPLORER", unlockXP: 0,   color: "bg-amber-100",  description: "Sowa, która zna odpowiedź na każde pytanie" },
  { id: "fox",       emoji: "🦊", name: "Sprytny Lis",       category: "EXPLORER", unlockXP: 50,  color: "bg-orange-100", description: "Sprytny jak lis, mądry jak finansista" },
  { id: "penguin",   emoji: "🐧", name: "Pingwinek",         category: "EXPLORER", unlockXP: 50,  color: "bg-slate-100",  description: "Pingwinek, który zbiera złotówki jak rybki" },
  { id: "dragon",    emoji: "🐲", name: "Smok Skarby",       category: "EXPLORER", unlockXP: 100, color: "bg-green-100",  description: "Smok pilnujący swojego skarbu" },

  // ── LEARNER (10–12) — low-mid XP ────────────────────────
  { id: "ninja",     emoji: "🥷", name: "Budżetowy Ninja",   category: "LEARNER",  unlockXP: 0,   color: "bg-gray-100",   description: "Tajemniczy mistrz budżetowania" },
  { id: "scientist", emoji: "🧪", name: "Naukowiec Finansów", category: "LEARNER", unlockXP: 0,   color: "bg-purple-100", description: "Bada pieniądze jak prawdziwy naukowiec" },
  { id: "detective", emoji: "🕵️", name: "Detektyw Cen",      category: "LEARNER",  unlockXP: 100, color: "bg-yellow-100", description: "Żaden wydatek nie ukryje się przed nim!" },
  { id: "astronaut", emoji: "👨‍🚀", name: "Astronauta",        category: "LEARNER",  unlockXP: 100, color: "bg-indigo-100", description: "Osiąga nieskończone oszczędności" },
  { id: "wizard",    emoji: "🧙", name: "Czarodziej Grosza", category: "LEARNER",  unlockXP: 200, color: "bg-violet-100", description: "Zmienia grosik w złotówkę za pomocą magii... planowania!" },
  { id: "robot",     emoji: "🤖", name: "Robot Finansów",    category: "LEARNER",  unlockXP: 200, color: "bg-cyan-100",   description: "Oblicza budżet z dokładnością co do grosza" },

  // ── ACHIEVER (13–15) — mid XP ────────────────────────────
  { id: "lion",      emoji: "🦁", name: "Lew Rynku",         category: "ACHIEVER", unlockXP: 0,   color: "bg-amber-100",  description: "Dominuje w świecie finansów jak lew" },
  { id: "eagle",     emoji: "🦅", name: "Orzeł Inwestycji",  category: "ACHIEVER", unlockXP: 0,   color: "bg-blue-100",   description: "Wysoko lata i daleko widzi" },
  { id: "shark",     emoji: "🦈", name: "Rekin Biznesu",     category: "ACHIEVER", unlockXP: 300, color: "bg-slate-100",  description: "Zawsze idzie naprzód, nigdy się nie zatrzymuje" },
  { id: "wolf",      emoji: "🐺", name: "Wilk Strategii",    category: "ACHIEVER", unlockXP: 300, color: "bg-gray-100",   description: "Działa w grupie i osiąga wielkie cele" },
  { id: "tiger",     emoji: "🐯", name: "Tygrys Celów",      category: "ACHIEVER", unlockXP: 500, color: "bg-orange-100", description: "Skupiony, szybki i precyzyjny" },
  { id: "phoenix",   emoji: "🦋", name: "Feniks Finansów",   category: "ACHIEVER", unlockXP: 500, color: "bg-rose-100",   description: "Z każdego błędu finansowego wychodzi silniejszy" },

  // ── MASTER (16–18) — premium avatars ────────────────────
  { id: "crown",     emoji: "👑", name: "Mistrz Finansów",   category: "MASTER",   unlockXP: 0,   color: "bg-yellow-100", description: "Korona należy się tym, którzy opanowali finanse" },
  { id: "diamond",   emoji: "💎", name: "Diamentowy Umysł",  category: "MASTER",   unlockXP: 0,   color: "bg-blue-100",   description: "Rzadki jak diament, cenny jak wiedza finansowa" },
  { id: "chess",     emoji: "♟️", name: "Strateg",           category: "MASTER",   unlockXP: 500, color: "bg-slate-100",  description: "Planuje 10 ruchów do przodu" },
  { id: "fire",      emoji: "🔥", name: "Płomień Ambicji",   category: "MASTER",   unlockXP: 500, color: "bg-red-100",    description: "Nigdy nie gaśnie, zawsze dąży do celu" },
  { id: "mountain",  emoji: "🏔️", name: "Zdobywca Szczytów", category: "MASTER",  unlockXP: 1000, color: "bg-emerald-100", description: "Każdy cel finansowy to kolejny szczyt do zdobycia" },
  { id: "galaxy",    emoji: "🌌", name: "Kosmiczny Wizjoner", category: "MASTER",  unlockXP: 1000, color: "bg-purple-100", description: "Wizja finansowa bez granic" },
]

export const AVATARS_BY_ID: Readonly<Record<string, Avatar>> = Object.fromEntries(
  ALL_AVATARS.map((a) => [a.id, a])
)

export const FREE_AVATARS = ALL_AVATARS.filter((a) => a.unlockXP === 0)

export function getUnlockedAvatars(xp: number): Avatar[] {
  return ALL_AVATARS.filter((a) => a.unlockXP <= xp)
}

export function getDefaultAvatarForCategory(category: AvatarCategory): Avatar {
  return ALL_AVATARS.find((a) => a.category === category && a.unlockXP === 0)!
}
