import type { Metadata } from "next";
import { WelcomeCard } from "@/components/dashboard/welcome-card";
import { ProgressOverview } from "@/components/dashboard/progress-overview";
import { RecentLessons } from "@/components/dashboard/recent-lessons";
import { CurrentMissions } from "@/components/dashboard/current-missions";
import { SavingsGoalWidget } from "@/components/dashboard/savings-goal-widget";
import { AiMentorWidget } from "@/components/dashboard/ai-mentor-widget";

export const metadata: Metadata = { title: "Dashboard" };

export default function DashboardPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome banner */}
      <WelcomeCard />

      {/* Stats row */}
      <ProgressOverview />

      {/* Main content grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left column — 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          <RecentLessons />
          <CurrentMissions />
        </div>

        {/* Right column — 1/3 width */}
        <div className="space-y-6">
          <SavingsGoalWidget />
          <AiMentorWidget />
        </div>
      </div>
    </div>
  );
}
