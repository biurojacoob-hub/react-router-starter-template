import type { SkillContent } from "./types"

// Explorer
import {
  moneyAwareness1,
  moneyAwareness2,
  moneyAwareness3,
} from "./skills/explorer/money-awareness"
import { savingBasics1, savingBasics2 } from "./skills/explorer/saving-basics"
import { needsWants1, needsWants2 } from "./skills/explorer/needs-wants"

// Learner
import {
  budgetBasics1,
  budgetBasics2,
  budgetBasics3,
} from "./skills/learner/budget-basics"
import { goalSetting1, goalSetting2 } from "./skills/learner/goal-setting"
import {
  delayedGratification1,
  delayedGratification2,
} from "./skills/learner/delayed-gratification"

// Achiever
import { incomeSources1, incomeSources2 } from "./skills/achiever/income-sources"
import {
  investingConcepts1,
  investingConcepts2,
} from "./skills/achiever/investing-concepts"
import {
  riskUnderstanding1,
  riskUnderstanding2,
} from "./skills/achiever/risk-understanding"

// Master
import {
  personalFinance1,
  personalFinance2,
  personalFinance3,
} from "./skills/master/personal-finance"
import {
  budgetOptimization1,
  budgetOptimization2,
} from "./skills/master/budget-optimization"
import {
  realWorldDecisions1,
  realWorldDecisions2,
} from "./skills/master/real-world-decisions"

// ─────────────────────────────────────────────────────────────
// REGISTRY — all content indexed by skillId
// ─────────────────────────────────────────────────────────────

const ALL_CONTENT: SkillContent[] = [
  // Explorer
  moneyAwareness1,
  moneyAwareness2,
  moneyAwareness3,
  savingBasics1,
  savingBasics2,
  needsWants1,
  needsWants2,
  // Learner
  budgetBasics1,
  budgetBasics2,
  budgetBasics3,
  goalSetting1,
  goalSetting2,
  delayedGratification1,
  delayedGratification2,
  // Achiever
  incomeSources1,
  incomeSources2,
  investingConcepts1,
  investingConcepts2,
  riskUnderstanding1,
  riskUnderstanding2,
  // Master
  personalFinance1,
  personalFinance2,
  personalFinance3,
  budgetOptimization1,
  budgetOptimization2,
  realWorldDecisions1,
  realWorldDecisions2,
]

export const CONTENT_BY_SKILL_ID: Readonly<Record<string, SkillContent>> =
  Object.fromEntries(ALL_CONTENT.map((c) => [c.skillId, c]))

export function getSkillContent(skillId: string): SkillContent | undefined {
  return CONTENT_BY_SKILL_ID[skillId]
}

export function getLessons(skillId: string) {
  return CONTENT_BY_SKILL_ID[skillId]?.lessons ?? []
}

export function getQuiz(skillId: string) {
  return CONTENT_BY_SKILL_ID[skillId]?.quiz
}

export function getMissions(skillId: string) {
  return CONTENT_BY_SKILL_ID[skillId]?.missions ?? []
}

export { ALL_CONTENT }
