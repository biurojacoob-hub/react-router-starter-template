import type { AvatarCategory } from "@/src/components/avatars/avatarData"

export type { AvatarCategory }

export type OnboardingStep =
  | "WELCOME"
  | "AVATAR"
  | "GOAL"
  | "FIRST_CHALLENGE"
  | "FIRST_REWARD"
  | "MENTOR_INTRO"
  | "DONE"

export type AgeGroupSelection = {
  id: AvatarCategory
  label: string
  range: string
  emoji: string
  description: string
}

export const AGE_GROUPS: AgeGroupSelection[] = [
  { id: "EXPLORER",  label: "Odkrywca",   range: "6–9 lat",  emoji: "🔍", description: "Pierwsze kroki w świecie pieniędzy" },
  { id: "LEARNER",   label: "Uczeń",      range: "10–12 lat", emoji: "📚", description: "Buduję plan i uczę się budżetowania" },
  { id: "ACHIEVER",  label: "Zdobywca",   range: "13–15 lat", emoji: "🚀", description: "Zaawansowane finanse i zarabianie" },
  { id: "MASTER",    label: "Mistrz",     range: "16–18 lat", emoji: "👑", description: "Pełne zarządzanie finansami osobistymi" },
]

export type GoalOption = {
  id: string
  emoji: string
  label: string
  description: string
}

export const GOAL_OPTIONS: GoalOption[] = [
  { id: "save",    emoji: "🐷", label: "Oszczędzać",         description: "Chcę mieć pieniądze na marzenia" },
  { id: "budget",  emoji: "📊", label: "Planować wydatki",   description: "Chcę wiedzieć, gdzie idą moje pieniądze" },
  { id: "earn",    emoji: "💼", label: "Zarabiać pierwsze pieniądze", description: "Chcę zarobić własne pieniądze" },
  { id: "smart",   emoji: "🧠", label: "Mądrzej wydawać",   description: "Chcę podejmować lepsze decyzje zakupowe" },
]

export type OnboardingState = {
  step: OnboardingStep
  childName: string
  avatarId: string
  ageGroup: AvatarCategory | null
  goalId: string
  xpEarned: number
  firstBadgeEarned: boolean
}
