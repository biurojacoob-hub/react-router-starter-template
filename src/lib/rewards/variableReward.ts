// Deterministic seed per child per day — consistent within a day, unpredictable across days
function dailySeed(childId: string): number {
  const dateStr = new Date().toISOString().slice(0, 10) // YYYY-MM-DD
  const str = childId + dateStr
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

export type RewardType = "normal" | "lucky_day" | "discovery_bonus" | "finn_surprise"

export type DailyReward = {
  xpMultiplier: number          // 1.0 | 1.5 | 2.0 | 2.5
  rareEventChance: number       // 0–100 (just for display/debug)
  rewardType: RewardType
  rewardMessage: string
  isRare: boolean
}

const LUCKY_DAY_MESSAGES = [
  "🌟 Dziś jest Twój szczęśliwy dzień! Wszystkie XP x2!",
  "⚡ Finn wyczuł wyjątkową energię — dziś XP podwojone!",
  "🎰 Rzadka szansa! Szczęśliwy dzień aktywowany.",
]

const DISCOVERY_BONUS_MESSAGES = [
  "🗺️ Finn odkrył ukryty skarb wiedzy — specjalny bonus czeka!",
  "🔍 Dzień Odkrycia! Zdobądź extra XP za ciekawość.",
  "💡 Bonusowy dzień odkryć — Finn ma dla Ciebie niespodziankę!",
]

const FINN_SURPRISE_MESSAGES = [
  "🦉 Finn ma dla Ciebie sekretną wiadomość po ukończeniu dnia...",
  "✨ Dziś Finn przygotował specjalną niespodziankę. Ukończ przygodę!",
  "🎁 Ukryty prezent od Finna czeka na koniec dnia.",
]

const NORMAL_MESSAGES = [
  "Dobry dzień na przygodę. Zaczynamy!",
  "Finn jest gotowy. Ty też?",
  "Każdy ukończony dzień to krok naprzód.",
]

export function getDailyReward(childId: string, currentDay: number, streakDays: number): DailyReward {
  const seed = dailySeed(childId)
  const roll = seed % 100  // 0–99

  // Rare events: ~25% chance total, but NOT predictable
  // Lucky day: roll 0–14 (~15%)
  // Discovery bonus: roll 15–24 (~10%)
  // Finn surprise: roll 25–34 (~10%)
  // Normal: roll 35–99 (~65%)

  // Boost rare chance slightly on capstone days and high streaks
  const capstoneBonus = [5, 10, 15, 20, 25, 30].includes(currentDay) ? 10 : 0
  const streakBonus = streakDays >= 7 ? 5 : 0
  const adjustedRoll = (roll - capstoneBonus - streakBonus + 100) % 100

  if (adjustedRoll < 15) {
    return {
      xpMultiplier: 2.0,
      rareEventChance: 15,
      rewardType: "lucky_day",
      rewardMessage: LUCKY_DAY_MESSAGES[seed % LUCKY_DAY_MESSAGES.length]!,
      isRare: true,
    }
  }
  if (adjustedRoll < 25) {
    return {
      xpMultiplier: 1.5,
      rareEventChance: 10,
      rewardType: "discovery_bonus",
      rewardMessage: DISCOVERY_BONUS_MESSAGES[seed % DISCOVERY_BONUS_MESSAGES.length]!,
      isRare: true,
    }
  }
  if (adjustedRoll < 35) {
    return {
      xpMultiplier: 1.5,
      rareEventChance: 10,
      rewardType: "finn_surprise",
      rewardMessage: FINN_SURPRISE_MESSAGES[seed % FINN_SURPRISE_MESSAGES.length]!,
      isRare: true,
    }
  }

  // Normal day — slight multiplier on streak
  const xpMultiplier = streakDays >= 14 ? 1.2 : streakDays >= 7 ? 1.1 : 1.0
  return {
    xpMultiplier,
    rareEventChance: 0,
    rewardType: "normal",
    rewardMessage: NORMAL_MESSAGES[seed % NORMAL_MESSAGES.length]!,
    isRare: false,
  }
}
