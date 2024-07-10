import React from 'react';
import { PlusCircle, Trophy, Users } from 'lucide-react';

const StatItem = ({ icon: Icon, label, value }) => (
  <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center">
    <Icon size={24} className="mb-2" />
    <span className="text-sm text-gray-600">{label}</span>
    <span className="text-3xl font-semibold">{value}</span>
  </div>
);

const QuickStats = () => {
  return (
    <div className="grid grid-cols-3 gap-6">
      <StatItem icon={PlusCircle} label="Add Task" value="7" />
      <StatItem icon={Trophy} label="Achievements" value="12" />
      <StatItem icon={Users} label="Challenge" value="4" />
    </div>
  );
};

export default QuickStats;