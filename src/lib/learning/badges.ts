/**
 * Badge codes — must match seeds in DB.
 */
export const BADGE_CODES = {
  FIRST_LESSON: "FIRST_LESSON",
  FIRST_QUIZ: "FIRST_QUIZ",
  STREAK_7: "STREAK_7",
  XP_100: "XP_100",
  XP_500: "XP_500",
  XP_1000: "XP_1000",
} as const

export type BadgeCode = (typeof BADGE_CODES)[keyof typeof BADGE_CODES]

export type BadgeCheckContext = {
  xp: number
  streakDays: number
  lessonsCompleted: number
  quizzesCompleted: number
  earnedBadgeCodes: string[]
}

/**
 * Returns badge codes the child has newly earned and not yet received.
 */
export function computeNewBadges(ctx: BadgeCheckContext): BadgeCode[] {
  const newBadges: BadgeCode[] = []

  const check = (code: BadgeCode, condition: boolean) => {
    if (condition && !ctx.earnedBadgeCodes.includes(code)) {
      newBadges.push(code)
    }
  }

  check(BADGE_CODES.FIRST_LESSON, ctx.lessonsCompleted >= 1)
  check(BADGE_CODES.FIRST_QUIZ, ctx.quizzesCompleted >= 1)
  check(BADGE_CODES.STREAK_7, ctx.streakDays >= 7)
  check(BADGE_CODES.XP_100, ctx.xp >= 100)
  check(BADGE_CODES.XP_500, ctx.xp >= 500)
  check(BADGE_CODES.XP_1000, ctx.xp >= 1000)

  return newBadges
}

/**
 * Static badge metadata used for seeding and display.
 */
export const BADGE_DEFINITIONS = [
  {
    code: BADGE_CODES.FIRST_LESSON,
    name: "Pierwszy Krok",
    description: "Ukończ swoją pierwszą lekcję",
    emoji: "📚",
    category: "EDUCATION" as const,
    xpReward: 50,
    condition: { type: "lessons_completed", threshold: 1 },
  },
  {
    code: BADGE_CODES.FIRST_QUIZ,
    name: "Pierwszy Quiz",
    description: "Ukończ swój pierwszy quiz",
    emoji: "✏️",
    category: "EDUCATION" as const,
    xpReward: 50,
    condition: { type: "quizzes_completed", threshold: 1 },
  },
  {
    code: BADGE_CODES.STREAK_7,
    name: "Tydzień z Rzędu",
    description: "Ucz się przez 7 dni bez przerwy",
    emoji: "🔥",
    category: "STREAK" as const,
    xpReward: 100,
    condition: { type: "streak_days", threshold: 7 },
  },
  {
    code: BADGE_CODES.XP_100,
    name: "100 XP",
    description: "Zdobądź 100 punktów XP",
    emoji: "⚡",
    category: "EDUCATION" as const,
    xpReward: 25,
    condition: { type: "total_xp", threshold: 100 },
  },
  {
    code: BADGE_CODES.XP_500,
    name: "500 XP",
    description: "Zdobądź 500 punktów XP",
    emoji: "🏅",
    category: "EDUCATION" as const,
    xpReward: 50,
    condition: { type: "total_xp", threshold: 500 },
  },
  {
    code: BADGE_CODES.XP_1000,
    name: "1000 XP",
    description: "Zdobądź 1000 punktów XP",
    emoji: "🏆",
    category: "EDUCATION" as const,
    xpReward: 100,
    condition: { type: "total_xp", threshold: 1000 },
  },
]
