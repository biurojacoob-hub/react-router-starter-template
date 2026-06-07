import type { EngagementFactors, EngagementScore } from "./types"

// ─────────────────────────────────────────────────────────────
// ENGAGEMENT SCORE  — 0–100
//
// Breakdown:
//   Learning     (0–30): lessons completed relative to program
//   Accuracy     (0–20): quiz accuracy percent
//   Consistency  (0–25): streak + days active this week
//   Missions     (0–15): missions completed
//   Mentor Usage (0–10): mentor sessions
// ─────────────────────────────────────────────────────────────

export function calculateEngagementScore(factors: EngagementFactors): EngagementScore {
  // Learning score — max 30 pts
  const learningScore = Math.min(30, Math.round((factors.lessonsCompleted / 27) * 30))

  // Accuracy score — max 20 pts
  const accuracyScore = Math.round((factors.quizAccuracyPercent / 100) * 20)

  // Consistency score — max 25 pts
  const streakScore = Math.min(15, Math.round((Math.min(factors.currentStreak, 30) / 30) * 15))
  const weekScore = Math.min(10, Math.round((factors.daysActiveThisWeek / 7) * 10))
  const consistencyScore = streakScore + weekScore

  // Missions score — max 15 pts (27 skills × 3 missions = 81 total)
  const missionScore = Math.min(15, Math.round((factors.missionsCompleted / 81) * 15))

  // Mentor score — max 10 pts (10+ sessions = full score)
  const mentorScore = Math.min(10, Math.round((factors.mentorSessionsCount / 10) * 10))

  // Recency penalty — reduce score if inactive
  const recencyPenalty =
    factors.lastActivityDaysAgo >= 7  ? 20 :
    factors.lastActivityDaysAgo >= 3  ? 10 :
    factors.lastActivityDaysAgo >= 2  ? 5  : 0

  const rawTotal =
    learningScore + accuracyScore + consistencyScore + missionScore + mentorScore
  const total = Math.max(0, Math.min(100, rawTotal - recencyPenalty))

  const tier =
    total >= 85 ? "CHAMPION" :
    total >= 65 ? "HIGHLY_ENGAGED" :
    total >= 45 ? "ENGAGED" :
    total >= 25 ? "WARMING" :
                  "COLD"

  // Trend: based on recent activity
  const trend =
    factors.lastActivityDaysAgo === 0 && factors.daysActiveThisWeek >= 5 ? "RISING" :
    factors.lastActivityDaysAgo <= 1 && factors.daysActiveThisWeek >= 3  ? "STABLE" :
                                                                            "FALLING"

  return {
    total,
    breakdown: {
      learning: learningScore,
      accuracy: accuracyScore,
      consistency: consistencyScore,
      missions: missionScore,
      mentorUsage: mentorScore,
    },
    tier,
    trend,
  }
}

// ─────────────────────────────────────────────────────────────
// DROP-OFF RISK
// ─────────────────────────────────────────────────────────────

export function assessDropOffRisk(
  score: EngagementScore,
  lastActivityDaysAgo: number
): "LOW" | "MEDIUM" | "HIGH" {
  if (lastActivityDaysAgo >= 7 || score.total < 20) return "HIGH"
  if (lastActivityDaysAgo >= 3 || score.total < 45) return "MEDIUM"
  return "LOW"
}

// ─────────────────────────────────────────────────────────────
// RETENTION INDICATORS
// ─────────────────────────────────────────────────────────────

export function buildRetentionIndicators(
  childId: string,
  factors: EngagementFactors,
  sessionDates: Date[],
  lastActivityAt: Date | null,
  totalSkills: number
) {
  const score = calculateEngagementScore(factors)

  const now = Date.now()
  const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000
  const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000

  const sevenDayRetention = sessionDates.some((d) => d.getTime() >= sevenDaysAgo)
  const thirtyDayRetention = sessionDates.some((d) => d.getTime() >= thirtyDaysAgo)

  const weekSessions = sessionDates.filter((d) => d.getTime() >= sevenDaysAgo).length
  const averageSessionsPerWeek = Math.round(weekSessions)

  const completionRatePercent = Math.round((factors.lessonsCompleted / (totalSkills * 3)) * 100)

  return {
    childId,
    engagementScore: score.total,
    sevenDayRetention,
    thirtyDayRetention,
    dropOffRisk: assessDropOffRisk(score, factors.lastActivityDaysAgo),
    lastActivityAt,
    averageSessionsPerWeek,
    peakActivityHour: null,
    weakestSkillCategory: null,
    completionRatePercent,
  }
}
