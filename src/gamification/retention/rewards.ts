import type { ChestTier, ChestReward, ChestState, RewardEvent } from "./types"

// ─────────────────────────────────────────────────────────────
// CHEST REWARD POOLS
// ─────────────────────────────────────────────────────────────

type RewardPool = { xp: number; badgeId?: string; streakFreeze?: boolean; bonusMultiplier?: number; message: string }

const DAILY_POOL: RewardPool[] = [
  { xp: 10, message: "Dzienny bonus! Wracasz codziennie — to prawdziwy nawyk! 🌅" },
  { xp: 15, message: "Jesteś coraz bliżej swojego celu! +15 XP 🎯" },
  { xp: 10, bonusMultiplier: 1.5, message: "Szczęśliwy dzień! Dziś zdobywasz 1.5× więcej XP! ⚡" },
  { xp: 20, message: "Super bonus dzienny! Tak trzymaj! 🔥" },
  { xp: 10, streakFreeze: true, message: "Bonus: ZAMROŻENIE SERII! Użyj gdy nie możesz się zalogować ❄️" },
]

const WEEKLY_POOL: RewardPool[] = [
  { xp: 75, message: "Tygodniowy bonus — cały tydzień nauki! 🏆" },
  { xp: 100, message: "Tydzień ukończony! +100 XP tygodniowego bonusu! 🎉" },
  { xp: 75, streakFreeze: true, message: "Tygodniowy bonus + zamrożenie serii! 🧊" },
  { xp: 80, badgeId: "weekly-learner", message: "Odznaka Tygodniowego Ucznia! 📚" },
  { xp: 90, bonusMultiplier: 2.0, message: "Mega tydzień! Podwójne XP przez następną sesję! 💎" },
]

const MONTHLY_POOL: RewardPool[] = [
  { xp: 300, message: "MIESIĘCZNY BONUS! Cały miesiąc nauki finansów! 🌟" },
  { xp: 350, badgeId: "monthly-master", message: "Mistrz Miesiąca! +350 XP i odznaka! 🥇" },
  { xp: 250, bonusMultiplier: 3.0, message: "Miesiąc wiedzy — potrójne XP przez tydzień! 🚀" },
  { xp: 300, streakFreeze: true, message: "Miesięczny bonus + 3 zamrożenia serii! 🎁" },
]

const SURPRISE_POOL: RewardPool[] = [
  { xp: 50, message: "NIESPODZIANKA! Znalazłeś ukryty skarb! 🎊" },
  { xp: 30, bonusMultiplier: 2.0, message: "Losowy bonus — podwójne XP w tej sesji! 🎲" },
  { xp: 25, streakFreeze: true, message: "Surprise! Zamrożenie serii jako bonus! ❄️✨" },
  { xp: 100, badgeId: "lucky-day", message: "Twój szczęśliwy dzień! +100 XP! 🍀" },
]

// ─────────────────────────────────────────────────────────────
// CHEST LOGIC
// ─────────────────────────────────────────────────────────────

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!
}

export function openChest(tier: ChestTier): ChestReward {
  const pool =
    tier === "DAILY"   ? DAILY_POOL :
    tier === "WEEKLY"  ? WEEKLY_POOL :
    tier === "MONTHLY" ? MONTHLY_POOL :
                         SURPRISE_POOL

  return pickRandom(pool)
}

export function getChestAvailability(
  tier: ChestTier,
  lastOpenedAt: Date | null,
  now: Date = new Date()
): ChestState {
  if (!lastOpenedAt) {
    return { tier, isAvailable: true, availableAt: null, lastOpenedAt: null }
  }

  const msPerHour = 1000 * 60 * 60
  const cooldownMs =
    tier === "DAILY"   ? 24 * msPerHour :
    tier === "WEEKLY"  ? 7 * 24 * msPerHour :
    tier === "MONTHLY" ? 30 * 24 * msPerHour :
                         0   // SURPRISE — always available when triggered

  if (tier === "SURPRISE") {
    return { tier, isAvailable: false, availableAt: null, lastOpenedAt }
  }

  const nextOpen = new Date(lastOpenedAt.getTime() + cooldownMs)
  const isAvailable = now >= nextOpen

  return { tier, isAvailable, availableAt: isAvailable ? null : nextOpen, lastOpenedAt }
}

// ─────────────────────────────────────────────────────────────
// DAILY LOGIN REWARD
// ─────────────────────────────────────────────────────────────

export function buildDailyLoginReward(
  streak: number,
  isFirstLoginToday: boolean
): RewardEvent {
  if (!isFirstLoginToday) {
    return {
      type: "DAILY_LOGIN",
      xp: 0,
      message: "Witaj z powrotem! Kontynuuj naukę! 📚",
      timestamp: new Date(),
    }
  }

  const xp = streak >= 30 ? 25 : streak >= 14 ? 20 : streak >= 7 ? 15 : streak >= 3 ? 10 : 5
  const streakMsg =
    streak >= 30 ? `🔥 ${streak} dni z rzędu — MISTRZ!` :
    streak >= 14 ? `💎 ${streak} dni serii — niesamowite!` :
    streak >= 7  ? `⭐ ${streak} dni tygodniowej serii!` :
    streak >= 3  ? `🌱 ${streak} dni z rzędu — tak trzymaj!` :
                   `👋 Dzień ${streak} — zaczynamy!`

  return {
    type: "DAILY_LOGIN",
    xp,
    message: streakMsg,
    timestamp: new Date(),
  }
}

// ─────────────────────────────────────────────────────────────
// SURPRISE REWARD TRIGGER
// ─────────────────────────────────────────────────────────────

export function shouldTriggerSurprise(sessionCount: number): boolean {
  // ~10% chance, but guaranteed every 10 sessions
  if (sessionCount % 10 === 0) return true
  return Math.random() < 0.1
}
