import type { Badge } from "./types"

// ─────────────────────────────────────────────────────────────
// ACHIEVEMENT BADGES — 60 total
// Categories: CONSISTENCY, SAVINGS, LEARNING, MISSIONS, FAMILY, MENTOR, SPEED, ACCURACY, MILESTONE
// ─────────────────────────────────────────────────────────────

export const ALL_BADGES: Badge[] = [

  // ── CONSISTENCY (streak & daily activity) ────────────────
  { id: "streak-3",   name: "Trójka!",          description: "3 dni z rzędu",            category: "CONSISTENCY", xpReward: 15,  iconEmoji: "🌱", criteria: { type: "STREAK_DAYS", days: 3 },   isPremium: false },
  { id: "streak-7",   name: "Tygodniowy",        description: "7 dni z rzędu",            category: "CONSISTENCY", xpReward: 50,  iconEmoji: "🔥", criteria: { type: "STREAK_DAYS", days: 7 },   isPremium: false },
  { id: "streak-14",  name: "Dwa tygodnie",      description: "14 dni z rzędu",           category: "CONSISTENCY", xpReward: 100, iconEmoji: "💪", criteria: { type: "STREAK_DAYS", days: 14 },  isPremium: false },
  { id: "streak-21",  name: "Nawyk stworzony",   description: "21 dni z rzędu",           category: "CONSISTENCY", xpReward: 150, iconEmoji: "🧠", criteria: { type: "STREAK_DAYS", days: 21 },  isPremium: false },
  { id: "streak-30",  name: "Mistrz miesiąca",   description: "30 dni z rzędu",           category: "CONSISTENCY", xpReward: 250, iconEmoji: "🏆", criteria: { type: "STREAK_DAYS", days: 30 },  isPremium: false },
  { id: "streak-50",  name: "Legenda",           description: "50 dni z rzędu",           category: "CONSISTENCY", xpReward: 400, iconEmoji: "🌟", criteria: { type: "STREAK_DAYS", days: 50 },  isPremium: false },
  { id: "streak-100", name: "Setka!",            description: "100 dni z rzędu",          category: "CONSISTENCY", xpReward: 1000, iconEmoji: "💯", criteria: { type: "STREAK_DAYS", days: 100 }, isPremium: true  },
  { id: "active-7",   name: "Aktywny tydzień",   description: "7 aktywnych dni w sumie",  category: "CONSISTENCY", xpReward: 20,  iconEmoji: "📅", criteria: { type: "DAYS_ACTIVE", count: 7 },  isPremium: false },
  { id: "active-30",  name: "Miesięczny gracz",  description: "30 aktywnych dni w sumie", category: "CONSISTENCY", xpReward: 80,  iconEmoji: "🗓️", criteria: { type: "DAYS_ACTIVE", count: 30 }, isPremium: false },
  { id: "comeback",   name: "Powrót bohatera",   description: "Wrócił po przerwie",       category: "CONSISTENCY", xpReward: 30,  iconEmoji: "🔄", criteria: { type: "COMEBACK_AFTER_ABSENCE" }, isPremium: false },

  // ── LEARNING ─────────────────────────────────────────────
  { id: "first-lesson",   name: "Pierwszy krok",      description: "Ukończono pierwszą lekcję",     category: "LEARNING", xpReward: 10,  iconEmoji: "👣", criteria: { type: "FIRST_OF_TYPE", activityType: "LESSON" },      isPremium: false },
  { id: "lessons-5",      name: "Uczeń",              description: "5 lekcji ukończonych",          category: "LEARNING", xpReward: 25,  iconEmoji: "📖", criteria: { type: "LESSONS_COMPLETED", count: 5 },                isPremium: false },
  { id: "lessons-10",     name: "Zaangażowany",       description: "10 lekcji ukończonych",         category: "LEARNING", xpReward: 50,  iconEmoji: "📚", criteria: { type: "LESSONS_COMPLETED", count: 10 },               isPremium: false },
  { id: "lessons-25",     name: "Wiedzy spragnionych", description: "25 lekcji ukończonych",         category: "LEARNING", xpReward: 100, iconEmoji: "🎓", criteria: { type: "LESSONS_COMPLETED", count: 25 },               isPremium: false },
  { id: "lessons-50",     name: "Akademik",           description: "50 lekcji ukończonych",         category: "LEARNING", xpReward: 200, iconEmoji: "🏫", criteria: { type: "LESSONS_COMPLETED", count: 50 },               isPremium: false },
  { id: "lessons-81",     name: "Kompletny kurs",     description: "Wszystkie lekcje ukończone",    category: "LEARNING", xpReward: 500, iconEmoji: "🎊", criteria: { type: "LESSONS_COMPLETED", count: 81 },               isPremium: false },
  { id: "explorer-all",   name: "Mały Ekspert",       description: "Wszystkie skille EXPLORER",     category: "LEARNING", xpReward: 150, iconEmoji: "🔍", criteria: { type: "ALL_SKILLS_IN_GROUP", ageGroup: "EXPLORER" },   isPremium: false },
  { id: "learner-all",    name: "Budżetowy Ninja",    description: "Wszystkie skille LEARNER",      category: "LEARNING", xpReward: 200, iconEmoji: "⚡", criteria: { type: "ALL_SKILLS_IN_GROUP", ageGroup: "LEARNER" },    isPremium: false },
  { id: "achiever-all",   name: "Finansowy Strateg",  description: "Wszystkie skille ACHIEVER",     category: "LEARNING", xpReward: 300, iconEmoji: "♟️", criteria: { type: "ALL_SKILLS_IN_GROUP", ageGroup: "ACHIEVER" },   isPremium: false },
  { id: "master-all",     name: "Finansowy Mistrz",   description: "Wszystkie skille MASTER",       category: "LEARNING", xpReward: 500, iconEmoji: "👑", criteria: { type: "ALL_SKILLS_IN_GROUP", ageGroup: "MASTER" },     isPremium: true  },
  { id: "xp-100",         name: "Pierwsze 100",       description: "Zdobyto 100 XP",                category: "MILESTONE", xpReward: 10,  iconEmoji: "💫", criteria: { type: "XP_TOTAL", amount: 100 },                       isPremium: false },
  { id: "xp-500",         name: "Złota setka",        description: "Zdobyto 500 XP",                category: "MILESTONE", xpReward: 30,  iconEmoji: "🌙", criteria: { type: "XP_TOTAL", amount: 500 },                       isPremium: false },
  { id: "xp-1000",        name: "Tysiąc!",            description: "Zdobyto 1000 XP",               category: "MILESTONE", xpReward: 75,  iconEmoji: "💥", criteria: { type: "XP_TOTAL", amount: 1000 },                      isPremium: false },
  { id: "xp-5000",        name: "Pięć tysięcy",       description: "Zdobyto 5000 XP",               category: "MILESTONE", xpReward: 200, iconEmoji: "🔱", criteria: { type: "XP_TOTAL", amount: 5000 },                      isPremium: false },

  // ── ACCURACY ─────────────────────────────────────────────
  { id: "first-quiz",     name: "Pierwszy quiz",      description: "Ukończono pierwszy quiz",       category: "ACCURACY",  xpReward: 10,  iconEmoji: "❓", criteria: { type: "FIRST_OF_TYPE", activityType: "QUIZ" },         isPremium: false },
  { id: "perfect-quiz-1", name: "Perfekcja!",         description: "Pierwsze 100% w quizie",        category: "ACCURACY",  xpReward: 30,  iconEmoji: "🎯", criteria: { type: "QUIZ_PERFECT_SCORE", count: 1 },                isPremium: false },
  { id: "perfect-quiz-5", name: "Seryjny perfekcjonista", description: "5× 100% w quizach",         category: "ACCURACY",  xpReward: 80,  iconEmoji: "🏅", criteria: { type: "QUIZ_PERFECT_SCORE", count: 5 },                isPremium: false },
  { id: "perfect-quiz-10",name: "Ekspert quizów",     description: "10× 100% w quizach",            category: "ACCURACY",  xpReward: 150, iconEmoji: "🥇", criteria: { type: "QUIZ_PERFECT_SCORE", count: 10 },               isPremium: false },
  { id: "accuracy-80",    name: "Dokładny uczeń",     description: "80%+ średnia w quizach (min 5)", category: "ACCURACY", xpReward: 60,  iconEmoji: "🎪", criteria: { type: "ACCURACY_THRESHOLD", percent: 80, minQuizzes: 5 }, isPremium: false },
  { id: "accuracy-95",    name: "Prawie bez błędu",   description: "95%+ średnia w quizach (min 10)",category: "ACCURACY", xpReward: 150, iconEmoji: "💡", criteria: { type: "ACCURACY_THRESHOLD", percent: 95, minQuizzes: 10 }, isPremium: false },

  // ── MISSIONS ─────────────────────────────────────────────
  { id: "first-mission",  name: "Pierwsza misja",     description: "Ukończono pierwszą misję",      category: "MISSIONS",  xpReward: 15,  iconEmoji: "🎒", criteria: { type: "FIRST_OF_TYPE", activityType: "MISSION" },      isPremium: false },
  { id: "missions-5",     name: "Misjonarz",          description: "5 misji ukończonych",           category: "MISSIONS",  xpReward: 40,  iconEmoji: "🗺️", criteria: { type: "MISSIONS_COMPLETED", count: 5 },                isPremium: false },
  { id: "missions-10",    name: "Agent terenu",       description: "10 misji ukończonych",          category: "MISSIONS",  xpReward: 80,  iconEmoji: "🕵️", criteria: { type: "MISSIONS_COMPLETED", count: 10 },               isPremium: false },
  { id: "missions-25",    name: "Doświadczony agent", description: "25 misji ukończonych",          category: "MISSIONS",  xpReward: 150, iconEmoji: "🛡️", criteria: { type: "MISSIONS_COMPLETED", count: 25 },               isPremium: false },
  { id: "missions-50",    name: "Legendarny agent",   description: "50 misji ukończonych",          category: "MISSIONS",  xpReward: 300, iconEmoji: "⚔️", criteria: { type: "MISSIONS_COMPLETED", count: 50 },               isPremium: false },
  { id: "missions-81",    name: "Kompletny agent",    description: "Wszystkie misje ukończone",     category: "MISSIONS",  xpReward: 500, iconEmoji: "🏆", criteria: { type: "MISSIONS_COMPLETED", count: 81 },               isPremium: false },

  // ── FAMILY ───────────────────────────────────────────────
  { id: "family-first",   name: "Rodzinny starter",   description: "Pierwsze wyzwanie rodzinne",    category: "FAMILY",    xpReward: 30,  iconEmoji: "👨‍👩‍👧", criteria: { type: "FAMILY_CHALLENGE_DONE", count: 1 },              isPremium: false },
  { id: "family-5",       name: "Rodzinny team",      description: "5 wyzwań rodzinnych",           category: "FAMILY",    xpReward: 100, iconEmoji: "🤝", criteria: { type: "FAMILY_CHALLENGE_DONE", count: 5 },              isPremium: false },
  { id: "family-10",      name: "Rodzinny mistrz",    description: "10 wyzwań rodzinnych",          category: "FAMILY",    xpReward: 200, iconEmoji: "🏠", criteria: { type: "FAMILY_CHALLENGE_DONE", count: 10 },             isPremium: false },
  { id: "family-20",      name: "Rodzinna legenda",   description: "20 wyzwań rodzinnych",          category: "FAMILY",    xpReward: 400, iconEmoji: "👑", criteria: { type: "FAMILY_CHALLENGE_DONE", count: 20 },             isPremium: true  },

  // ── MENTOR ───────────────────────────────────────────────
  { id: "mentor-first",   name: "Pierwszy kontakt",   description: "Pierwsza sesja z Mentorem AI",  category: "MENTOR",    xpReward: 20,  iconEmoji: "🤖", criteria: { type: "MENTOR_SESSIONS", count: 1 },                   isPremium: false },
  { id: "mentor-5",       name: "Regularny uczeń",    description: "5 sesji z Mentorem AI",         category: "MENTOR",    xpReward: 60,  iconEmoji: "💬", criteria: { type: "MENTOR_SESSIONS", count: 5 },                   isPremium: false },
  { id: "mentor-20",      name: "Guru rozmów",        description: "20 sesji z Mentorem AI",        category: "MENTOR",    xpReward: 150, iconEmoji: "🧙", criteria: { type: "MENTOR_SESSIONS", count: 20 },                  isPremium: false },
  { id: "mentor-50",      name: "Mentor-Fan",         description: "50 sesji z Mentorem AI",        category: "MENTOR",    xpReward: 300, iconEmoji: "🌠", criteria: { type: "MENTOR_SESSIONS", count: 50 },                  isPremium: true  },

  // ── SPEED ────────────────────────────────────────────────
  { id: "speed-lesson",   name: "Błyskawica",         description: "Lekcja ukończona w rekordowym czasie", category: "SPEED", xpReward: 25, iconEmoji: "⚡", criteria: { type: "FIRST_OF_TYPE", activityType: "FAST_LESSON" }, isPremium: false },
  { id: "weekly-learner", name: "Tygodniowy uczeń",   description: "Nagroda za pełny tydzień nauki",       category: "CONSISTENCY", xpReward: 50, iconEmoji: "📅", criteria: { type: "DAYS_ACTIVE", count: 7 }, isPremium: false },
  { id: "monthly-master", name: "Miesięczny mistrz",  description: "Nagroda za pełny miesiąc nauki",       category: "MILESTONE", xpReward: 200, iconEmoji: "🥇", criteria: { type: "DAYS_ACTIVE", count: 30 }, isPremium: false },
  { id: "lucky-day",      name: "Szczęściarz",        description: "Znaleziono ukryty skarb",              category: "MILESTONE", xpReward: 100, iconEmoji: "🍀", criteria: { type: "FIRST_OF_TYPE", activityType: "SURPRISE" }, isPremium: false },

  // ── SAVINGS (mission-based) ───────────────────────────────
  { id: "savings-first",  name: "Pierwsza skarbonka", description: "Ukończono misję z oszczędzaniem",      category: "SAVINGS", xpReward: 20, iconEmoji: "🐷", criteria: { type: "SKILL_COMPLETED", skillId: "saving-basics-1" }, isPremium: false },
  { id: "savings-goal",   name: "Cel osiągnięty",     description: "Ukończono misję planowania celu",      category: "SAVINGS", xpReward: 40, iconEmoji: "🎯", criteria: { type: "SKILL_COMPLETED", skillId: "saving-basics-2" }, isPremium: false },
  { id: "budget-first",   name: "Budżetowiec",        description: "Ukończono pierwszą lekcję budżetu",    category: "SAVINGS", xpReward: 30, iconEmoji: "📊", criteria: { type: "SKILL_COMPLETED", skillId: "budget-basics-1" }, isPremium: false },
  { id: "budget-master",  name: "Mistrz budżetu",     description: "Ukończono cały moduł budżetowania",    category: "SAVINGS", xpReward: 100, iconEmoji: "💰", criteria: { type: "SKILL_COMPLETED", skillId: "budget-basics-3" }, isPremium: false },
  { id: "money-first",    name: "Pieniążkowe ABC",    description: "Ukończono pierwsze lekcje o pieniądzach", category: "LEARNING", xpReward: 25, iconEmoji: "🪙", criteria: { type: "SKILL_COMPLETED", skillId: "money-awareness-1" }, isPremium: false },
]

export const BADGES_BY_ID: Readonly<Record<string, Badge>> = Object.fromEntries(
  ALL_BADGES.map((b) => [b.id, b])
)

export const BADGES_BY_CATEGORY = ALL_BADGES.reduce<Record<string, Badge[]>>((acc, badge) => {
  if (!acc[badge.category]) acc[badge.category] = []
  acc[badge.category]!.push(badge)
  return acc
}, {})

export function checkBadgeEarned(
  badgeId: string,
  stats: {
    streakDays: number
    lessonsCompleted: number
    quizPerfectCount: number
    missionsCompleted: number
    mentorSessions: number
    familyChallenges: number
    daysActive: number
    xpTotal: number
    quizAccuracy: number
    totalQuizzes: number
    completedSkillIds: string[]
  }
): boolean {
  const badge = BADGES_BY_ID[badgeId]
  if (!badge) return false

  const c = badge.criteria
  switch (c.type) {
    case "STREAK_DAYS":             return stats.streakDays >= c.days
    case "LESSONS_COMPLETED":       return stats.lessonsCompleted >= c.count
    case "QUIZ_PERFECT_SCORE":      return stats.quizPerfectCount >= c.count
    case "MISSIONS_COMPLETED":      return stats.missionsCompleted >= c.count
    case "MENTOR_SESSIONS":         return stats.mentorSessions >= c.count
    case "FAMILY_CHALLENGE_DONE":   return stats.familyChallenges >= c.count
    case "DAYS_ACTIVE":             return stats.daysActive >= c.count
    case "XP_TOTAL":                return stats.xpTotal >= c.amount
    case "ACCURACY_THRESHOLD":
      return stats.totalQuizzes >= c.minQuizzes && stats.quizAccuracy >= c.percent
    case "SKILL_COMPLETED":
      return stats.completedSkillIds.includes(c.skillId)
    case "ALL_SKILLS_IN_GROUP":
    case "COMEBACK_AFTER_ABSENCE":
    case "FIRST_OF_TYPE":
      return false // evaluated externally
    default:
      return false
  }
}
