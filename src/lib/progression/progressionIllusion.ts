// Hidden growth metrics — computed from existing data, not stored in DB.
// These feel real to the child because they ARE derived from real behavior,
// just surfaced in a new vocabulary (confidence, curiosity, decision-making).

export type HiddenMetric = {
  name: string
  emoji: string
  value: number       // 0–100
  delta: number       // change since "yesterday" approximation
  label: string       // short descriptor of current level
}

export type InvisibleGrowthState = {
  metrics: HiddenMetric[]
  overallGrowthScore: number   // 0–100
  finnCommentOnGrowth: string
  topStrengthName: string
}

export type ProgressionInput = {
  lessonsCompleted: number
  missionsCompleted: number
  streakDays: number
  currentDay: number
  level: number
  badgesEarned: number
  dayProgressPercent: number
}

const CONFIDENCE_LABELS = ["Nowicjusz", "Obserwator", "Praktykant", "Pewny siebie", "Ekspert", "Mistrz"]
const CURIOSITY_LABELS  = ["Nieśmiały", "Ciekawski", "Badacz", "Odkrywca", "Poszukiwacz", "Legenda"]
const DECISION_LABELS   = ["Niezdecydowany", "Uczący się", "Rozważny", "Strategiczny", "Mądry", "Mędrzec"]

function labelFromValue(labels: string[], value: number): string {
  const idx = Math.min(Math.floor(value / 20), labels.length - 1)
  return labels[idx]!
}

const GROWTH_COMMENTS = [
  "Widzę wzrost, którego sam jeszcze nie widzisz. Jestem z Ciebie dumny.",
  "Między wczoraj a dziś zaszła w Tobie zmiana. Finn to czuje.",
  "Pewność siebie rośnie z każdą ukończoną przygodą. To nie przypadek.",
  "Twoja zdolność do decyzji finansowych rośnie szybciej niż u większości dorosłych.",
  "Ciekawość finansowa — to rzadki dar. Ty ją masz i rozwijasz każdego dnia.",
]

export function getInvisibleGrowth(input: ProgressionInput): InvisibleGrowthState {
  const { lessonsCompleted, missionsCompleted, streakDays, currentDay, level, badgesEarned, dayProgressPercent } = input

  // Confidence: driven by lessons + level + streak consistency
  const confidenceRaw = Math.min(100,
    lessonsCompleted * 6 +
    level * 4 +
    Math.min(streakDays, 20) * 2
  )

  // Financial curiosity: driven by day progress + discoveries + badges
  const curiosityRaw = Math.min(100,
    currentDay * 2.5 +
    lessonsCompleted * 3 +
    badgesEarned * 8
  )

  // Decision making: driven by missions (real-life tasks) + streak
  const decisionRaw = Math.min(100,
    missionsCompleted * 15 +
    level * 5 +
    Math.min(streakDays, 10) * 3
  )

  // Delta: approximate "since yesterday" — if did something today, +2–5 per metric
  const todayBonus = dayProgressPercent > 0 ? Math.round(dayProgressPercent / 33) : 0
  const confDelta  = todayBonus * 2
  const curDelta   = todayBonus * 3
  const decDelta   = dayProgressPercent === 100 ? 4 : todayBonus

  const metrics: HiddenMetric[] = [
    {
      name: "Pewność siebie",
      emoji: "💪",
      value: confidenceRaw,
      delta: confDelta,
      label: labelFromValue(CONFIDENCE_LABELS, confidenceRaw),
    },
    {
      name: "Ciekawość finansowa",
      emoji: "🔍",
      value: curiosityRaw,
      delta: curDelta,
      label: labelFromValue(CURIOSITY_LABELS, curiosityRaw),
    },
    {
      name: "Podejmowanie decyzji",
      emoji: "⚖️",
      value: decisionRaw,
      delta: decDelta,
      label: labelFromValue(DECISION_LABELS, decisionRaw),
    },
  ]

  const overallGrowthScore = Math.round((confidenceRaw + curiosityRaw + decisionRaw) / 3)

  // Deterministic pick of growth comment (seed from day+level)
  const commentIdx = (currentDay + level) % GROWTH_COMMENTS.length
  const finnCommentOnGrowth = GROWTH_COMMENTS[commentIdx]!

  // Top strength = highest metric
  const sorted = [...metrics].sort((a, b) => b.value - a.value)
  const topStrengthName = sorted[0]!.name

  return { metrics, overallGrowthScore, finnCommentOnGrowth, topStrengthName }
}
