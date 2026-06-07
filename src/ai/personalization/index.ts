import type {
  AgeGroup,
  ChildLearningProfile,
  LearningSpeed,
  MistakePattern,
} from "../types"

type RawChildData = {
  id: string
  ageGroup: AgeGroup
  xp: number
  level: number
  streakDays: number
  quizAttempts: Array<{
    score: number
    completedAt: Date
    quiz: { lesson: { title: string; topics?: string[] } }
    answers: Array<{
      correct: boolean
      question: { type: string; topic?: string }
    }>
  }>
  lessonProgress: Array<{
    completedAt: Date | null
    lesson: { title: string; topics?: string[] }
  }>
}

export function buildLearningProfile(
  data: RawChildData,
  interests: string[] = []
): ChildLearningProfile {
  const { weakTopics, strongTopics } = analyzeTopicPerformance(data.quizAttempts)
  const learningSpeed = computeLearningSpeed(data)
  const mistakePatterns = extractMistakePatterns(data.quizAttempts)
  const engagementScore = computeEngagementScore(data)
  const recentTopics = extractRecentTopics(data.lessonProgress)

  return {
    childId: data.id,
    ageGroup: data.ageGroup,
    xp: data.xp,
    level: data.level,
    streakDays: data.streakDays,
    weakTopics,
    strongTopics,
    learningSpeed,
    mistakePatterns,
    engagementScore,
    interests,
    recentTopics,
  }
}

function analyzeTopicPerformance(
  attempts: RawChildData["quizAttempts"]
): { weakTopics: string[]; strongTopics: string[] } {
  const topicScores: Record<string, number[]> = {}

  for (const attempt of attempts) {
    const topics = attempt.quiz.lesson.topics ?? [attempt.quiz.lesson.title]
    for (const topic of topics) {
      if (!topicScores[topic]) topicScores[topic] = []
      topicScores[topic].push(attempt.score)
    }
  }

  const weakTopics: string[] = []
  const strongTopics: string[] = []

  for (const [topic, scores] of Object.entries(topicScores)) {
    if (scores.length < 1) continue
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length
    if (avg < 60) weakTopics.push(topic)
    else if (avg >= 80) strongTopics.push(topic)
  }

  return { weakTopics: weakTopics.slice(0, 5), strongTopics: strongTopics.slice(0, 5) }
}

function computeLearningSpeed(data: RawChildData): LearningSpeed {
  const completedLessons = data.lessonProgress.filter((p) => p.completedAt)
  if (completedLessons.length < 3) return "AVERAGE"

  const dates = completedLessons
    .map((p) => p.completedAt!)
    .sort((a, b) => a.getTime() - b.getTime())

  const firstDate = dates[0]
  const lastDate = dates[dates.length - 1]
  const daysDiff = Math.max(
    1,
    (lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24)
  )
  const lessonsPerDay = completedLessons.length / daysDiff

  if (lessonsPerDay >= 2) return "FAST"
  if (lessonsPerDay <= 0.3) return "SLOW"
  return "AVERAGE"
}

function extractMistakePatterns(
  attempts: RawChildData["quizAttempts"]
): MistakePattern[] {
  const patterns: Record<string, { frequency: number; lastSeen: Date }> = {}

  for (const attempt of attempts) {
    for (const answer of attempt.answers) {
      if (!answer.correct) {
        const key = `${answer.question.topic ?? "general"}:${answer.question.type}`
        if (!patterns[key]) {
          patterns[key] = { frequency: 0, lastSeen: attempt.completedAt }
        }
        patterns[key].frequency++
        if (attempt.completedAt > patterns[key].lastSeen) {
          patterns[key].lastSeen = attempt.completedAt
        }
      }
    }
  }

  return Object.entries(patterns)
    .map(([key, data]) => {
      const [topic, questionType] = key.split(":")
      return {
        topic: topic ?? "general",
        questionType: questionType ?? "UNKNOWN",
        frequency: data.frequency,
        lastSeen: data.lastSeen,
      }
    })
    .sort((a, b) => b.frequency - a.frequency)
    .slice(0, 10)
}

function computeEngagementScore(data: RawChildData): number {
  let score = 5

  if (data.streakDays >= 7) score += 2
  else if (data.streakDays >= 3) score += 1

  const recentAttempts = data.quizAttempts.filter((a) => {
    const dayAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    return a.completedAt > dayAgo
  })
  if (recentAttempts.length >= 5) score += 2
  else if (recentAttempts.length >= 2) score += 1

  if (data.quizAttempts.length > 0) {
    const avgScore =
      data.quizAttempts.reduce((sum, a) => sum + a.score, 0) /
      data.quizAttempts.length
    if (avgScore >= 80) score += 1
  }

  return Math.min(10, Math.max(1, score))
}

function extractRecentTopics(
  lessonProgress: RawChildData["lessonProgress"]
): string[] {
  return lessonProgress
    .filter((p) => p.completedAt)
    .sort((a, b) => b.completedAt!.getTime() - a.completedAt!.getTime())
    .slice(0, 5)
    .flatMap((p) => p.lesson.topics ?? [p.lesson.title])
    .filter((t, i, arr) => arr.indexOf(t) === i)
    .slice(0, 5)
}

export function shouldFocusOnWeakTopics(profile: ChildLearningProfile): boolean {
  return profile.weakTopics.length > 0 && profile.engagementScore >= 5
}

export function getRecommendedDifficulty(
  profile: ChildLearningProfile
): "EASY" | "MEDIUM" | "HARD" {
  if (profile.engagementScore <= 3 || profile.learningSpeed === "SLOW") return "EASY"
  if (profile.engagementScore >= 8 && profile.learningSpeed === "FAST") return "HARD"
  return "MEDIUM"
}
