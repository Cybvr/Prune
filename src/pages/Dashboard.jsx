import React from "react";
import MetricCard from "../components/dashboard/MetricCard";
import TodaysTasks from "../components/dashboard/TodaysTasks";
import TaskOverview from "../components/dashboard/TaskOverview";
import DailyChallenge from "../components/dashboard/DailyChallenge";
import ProductivityStreak from "../components/dashboard/ProductivityStreak";
import WorkTravelBalance from "../components/dashboard/WorkTravelBalance";
import TaskInsights from "../components/dashboard/TaskInsights";
import { Plus, Trophy, Users, MapPin } from "lucide-react";

const Dashboard = () => {
  const currentLocation = "Bali, Indonesia"; // This would be dynamically set
  const workTravelBalance = 0.7; // This would be dynamically calculated

  const taskInsights = {
    mostProductiveTime: "10 AM - 12 PM",
    upcomingDeadline: "Project proposal - Jul 15",
    completionRate: 85,
    recommendation: "Consider scheduling your most important tasks during your peak productivity hours (10 AM - 12 PM) to maximize efficiency."
  };
  
  return (
    <div className="p-6 space-y-12">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Hello, Jide</h1>
        <div className="flex items-center text-gray-600">
          <MapPin size={18} className="mr-2" />
          <span>{currentLocation}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          icon={Plus}
          title="Add Task"
          number={7}
          subtitle="2 location-specific"
        />
        <MetricCard
          icon={Trophy}
          title="Achievements"
          number={12}
          subtitle="3 travel milestones"
        />
        <MetricCard
          icon={Users}
          title="Global Challenges"
          number={4}
          subtitle="1 local challenge"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TodaysTasks location={currentLocation} />
        <TaskOverview />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DailyChallenge location={currentLocation} />
        <ProductivityStreak />
      </div>
      <WorkTravelBalance balance={workTravelBalance} />
    </div>
  );
};

export default Dashboard;