import React from 'react';

const MetricCard = ({ icon: Icon, title, number, subtitle }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <div className="flex flex-col h-full">
        <Icon className="h-8 w-8 text-pink-700 dark:text-pink-500 mb-4" />
        <div className="mt-auto">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{title}</h2>
          <p className="text-3xl font-bold text-pink-700 dark:text-pink-500 mt-1">{number}</p>
          {subtitle && <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
};

export default MetricCard;