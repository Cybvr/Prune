import React from 'react';
import { Flame } from 'lucide-react';

const ProductivityStreak = () => {
  const currentStreak = 7;
  const longestStreak = 14;

  return (
    <div className="bg-white p-6 rounded-lg">
      <div className="flex justify-between items-center pb-2 mb-4 border-b border-slate-400">
        <Flame className="text-pink-500" size={20} />
        <h2 className="text-lg font-semibold text-gray-800">Productivity Streak</h2>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">Current Streak</p>
          <p className="text-2xl font-bold text-pink-700">{currentStreak} days</p>
        </div>
        <Flame className="h-10 w-10 text-orange-500" />
      </div>
      <p className="mt-4 text-xs text-gray-600">Longest streak: {longestStreak} days</p>
    </div>
  );
};

export default ProductivityStreak;