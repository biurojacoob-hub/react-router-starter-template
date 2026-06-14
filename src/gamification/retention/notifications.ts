import type { AgeGroup } from "@/src/learning/graph/types"
import type { AbsenceTier } from "./types"

// ─────────────────────────────────────────────────────────────
// NOTIFICATION TYPES
// ─────────────────────────────────────────────────────────────

export type NotificationType =
  | "STREAK_AT_RISK"
  | "COMEBACK"
  | "LEVEL_UP"
  | "BADGE_EARNED"
  | "CHEST_AVAILABLE"
  | "FAMILY_CHALLENGE"
  | "WEEKLY_SUMMARY"
  | "MISSION_REMINDER"
  | "GOAL_MILESTONE"

export type Notification = {
  type: NotificationType
  title: string
  body: string
  emoji: string
  actionLabel: string
  priority: "LOW" | "MEDIUM" | "HIGH"
  scheduledFor?: Date
}

// ─────────────────────────────────────────────────────────────
// NOTIFICATION BUILDERS
// ─────────────────────────────────────────────────────────────

export function buildStreakAtRiskNotification(
  streak: number,
  ageGroup: AgeGroup
): Notification {
  const messages: Record<AgeGroup, { title: string; body: string }> = {
    EXPLORER: {
      title: "Twoja seria jest w niebezpieczeństwie! 😬",
      body: `Masz serię ${streak} dni! Dzisiaj musisz wrócić, żeby jej nie stracić. Tylko 5 minut!`,
    },
    LEARNER: {
      title: `${streak}-dniowa seria zagrożona!`,
      body: "Zaloguj się dziś, żeby nie stracić serii. Szybka lekcja wystarczy!",
    },
    ACHIEVER: {
      title: `Seria ${streak} dni — ostatnie godziny!`,
      body: "Twoja seria czeka na reaktywację. Wróć dziś i utrzymaj impet.",
    },
    MASTER: {
      title: `Seria ${streak} dni — interwencja wymagana`,
      body: "Konsekwencja to klucz. Zaloguj się dziś i utrzymaj serię.",
    },
  }

  const msg = messages[ageGroup]
  return {
    type: "STREAK_AT_RISK",
    title: msg.title,
    body: msg.body,
    emoji: "🔥",
    actionLabel: "Ratuj serię!",
    priority: "HIGH",
  }
}

export function buildComebackNotification(
  absenceTier: AbsenceTier,
  _ageGroup: AgeGroup
): Notification {
  const titles: Record<AbsenceTier, string> = {
    ONE_DAY: "Wróć po dzienny bonus!",
    THREE_DAYS: "Brakuje Cię — mamy bonus powrotu!",
    SEVEN_DAYS: "Tydzień przerwy — czas na restart!",
    TWO_WEEKS_PLUS: "Witamy z powrotem — specjalny bonus czeka!",
  }

  const bonuses: Record<AbsenceTier, number> = {
    ONE_DAY: 10, THREE_DAYS: 25, SEVEN_DAYS: 50, TWO_WEEKS_PLUS: 100,
  }

  return {
    type: "COMEBACK",
    title: titles[absenceTier],
    body: `Wróć i odbierz ${bonuses[absenceTier]} XP bonusu powrotu! Przygotowaliśmy dla Ciebie łatwą misję startową.`,
    emoji: "🎁",
    actionLabel: "Odbierz bonus",
    priority: absenceTier === "TWO_WEEKS_PLUS" ? "HIGH" : "MEDIUM",
  }
}

export function buildLevelUpNotification(
  newLevel: number,
  ageGroup: AgeGroup
): Notification {
  const messages: Record<AgeGroup, string> = {
    EXPLORER: `Brawo! Jesteś teraz Ekspertem Poziomu ${newLevel}! 🎉`,
    LEARNER: `Awans! Osiągnąłeś Poziom ${newLevel} finansowej wiedzy! 🚀`,
    ACHIEVER: `Level ${newLevel} odblokowany! Twoje umiejętności rosną! 💪`,
    MASTER: `Poziom ${newLevel}. Doskonalisz się jak zawodowy finansista. 🏆`,
  }

  return {
    type: "LEVEL_UP",
    title: `Poziom ${newLevel} odblokowany! 🎊`,
    body: messages[ageGroup],
    emoji: "⬆️",
    actionLabel: "Zobacz nagrody",
    priority: "HIGH",
  }
}

export function buildChestAvailableNotification(
  chestTier: "DAILY" | "WEEKLY" | "MONTHLY"
): Notification {
  const data = {
    DAILY:   { title: "Dzienny skrzynia jest gotowa!", emoji: "📦", xp: 10 },
    WEEKLY:  { title: "Tygodniowa skrzynia czeka!", emoji: "🎁", xp: 75 },
    MONTHLY: { title: "MIESIĘCZNA SKRZYNIA OTWARTA!", emoji: "💎", xp: 300 },
  }

  const d = data[chestTier]
  return {
    type: "CHEST_AVAILABLE",
    title: d.title,
    body: `Odbierz do ${d.xp} XP i bonusy! Nie daj mu przepaść!`,
    emoji: d.emoji,
    actionLabel: "Otwórz skrzynię",
    priority: chestTier === "MONTHLY" ? "HIGH" : "MEDIUM",
  }
}

export function buildWeeklySummaryNotification(
  lessonsThisWeek: number,
  xpEarned: number,
  streak: number
): Notification {
  return {
    type: "WEEKLY_SUMMARY",
    title: "Twoje tygodniowe podsumowanie! 📊",
    body: `Ten tydzień: ${lessonsThisWeek} lekcji, ${xpEarned} XP, ${streak} dni serii. Sprawdź szczegóły!`,
    emoji: "📈",
    actionLabel: "Zobacz raport",
    priority: "LOW",
  }
}

export function buildFamilyChallengeNotification(
  challengeTitle: string
): Notification {
  return {
    type: "FAMILY_CHALLENGE",
    title: "Nowe wyzwanie rodzinne! 👨‍👩‍👧",
    body: `Rodzinne wyzwanie: "${challengeTitle}". Wykonaj swoją część i zdobądź podwójne XP!`,
    emoji: "🤝",
    actionLabel: "Przyjmij wyzwanie",
    priority: "MEDIUM",
  }
}

// ─────────────────────────────────────────────────────────────
// NOTIFICATION SCHEDULE
// ─────────────────────────────────────────────────────────────

export type NotificationScheduleEntry = {
  notification: Notification
  sendAt: Date
}

export function buildDailyNotificationSchedule(
  streak: number,
  ageGroup: AgeGroup,
  lastActivityDate: Date | null,
  preferredHour: number = 17,
  now: Date = new Date()
): NotificationScheduleEntry[] {
  const schedule: NotificationScheduleEntry[] = []

  const tomorrow = new Date(now)
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(preferredHour, 0, 0, 0)

  // Streak at risk — send if last activity was today (so they have to come back tomorrow)
  if (lastActivityDate) {
    const diffDays = Math.floor(
      (now.getTime() - lastActivityDate.getTime()) / (1000 * 60 * 60 * 24)
    )
    if (diffDays === 1 && streak > 2) {
      schedule.push({
        notification: buildStreakAtRiskNotification(streak, ageGroup),
        sendAt: tomorrow,
      })
    }
  }

  // Daily chest reminder — morning
  const morningChest = new Date(tomorrow)
  morningChest.setHours(9, 0, 0, 0)
  schedule.push({
    notification: buildChestAvailableNotification("DAILY"),
    sendAt: morningChest,
  })

  return schedule
}
