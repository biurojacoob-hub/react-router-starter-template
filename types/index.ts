/* ─────────────────────────────────────────────
   Domain types – ready for Prisma model alignment
   ───────────────────────────────────────────── */

export type UserRole = "parent" | "child";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  xp: number;
  level: number;
  streak: number;
  createdAt: Date;
}

export interface Child {
  id: string;
  parentId: string;
  name: string;
  age: number;
  avatarUrl?: string;
  xp: number;
  level: number;
  streak: number;
}

/* ─── Learning ─────────────────────────────── */

export type LessonCategory =
  | "saving"
  | "spending"
  | "earning"
  | "investing"
  | "giving";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface Lesson {
  id: string;
  title: string;
  description: string;
  category: LessonCategory;
  difficulty: Difficulty;
  durationMinutes: number;
  xpReward: number;
  completed: boolean;
  progress: number; // 0–100
  thumbnailUrl?: string;
}

export type MissionStatus = "locked" | "active" | "completed";

export interface Mission {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  coinReward: number;
  status: MissionStatus;
  daysLeft?: number;
  progress: number; // 0–100
}

/* ─── Goals / Savings ─────────────────────── */

export interface SavingsGoal {
  id: string;
  title: string;
  description?: string;
  targetAmount: number;
  currentAmount: number;
  emoji?: string;
  deadline?: Date;
  completed: boolean;
}

/* ─── AI ──────────────────────────────────── */

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: Date;
}

/* ─── Pricing ─────────────────────────────── */

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: readonly string[];
  cta: string;
  highlighted: boolean;
}

/* ─── Navigation ──────────────────────────── */

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  badge?: string | number;
}
