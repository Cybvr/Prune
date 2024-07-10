import React from 'react';
import { MapPin } from 'lucide-react';

const DailyChallenge = ({ location }) => {
  const progress = 3;
  const total = 5;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Daily Challenge</h2>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <MapPin size={16} className="mr-1 text-pink-700 dark:text-pink-500" />
          <span>{location}</span>
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-4">Complete 5 high-priority tasks today in {location}.</p>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <div
          className="bg-pink-700 dark:bg-pink-500 h-2.5 rounded-full"
          style={{ width: `${(progress / total) * 100}%` }}
        ></div>
      </div>
      <p className="text-right mt-2 text-sm text-gray-600 dark:text-gray-400">{progress}/{total} completed</p>
    </div>
  );
};

export default DailyChallenge;