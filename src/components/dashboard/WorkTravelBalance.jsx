import React, { useState } from 'react';
import { InfoIcon } from 'lucide-react';

const WorkTravelBalance = ({ balance }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  // Convert balance to percentage
  const balancePercentage = Math.round(balance * 100);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Work-Travel Balance</h2>
        <button
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <InfoIcon size={18} />
        </button>
      </div>
      {showTooltip && (
        <div className="bg-gray-100 p-2 rounded-md text-sm mb-2">
          This metric represents the ratio of work-related tasks to travel/leisure activities. 
          A balanced score is 50%. Higher scores indicate more focus on work, while lower scores 
          suggest more emphasis on travel and leisure.
        </div>
      )}
      <div className="flex items-center">
        <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
          <div 
            className="bg-blue-600 h-2.5 rounded-full" 
            style={{ width: `${balancePercentage}%` }}
          ></div>
        </div>
        <span className="text-sm font-medium">{balancePercentage}%</span>
      </div>
      <div className="flex justify-between mt-2 text-sm text-gray-500">
        <span>Travel</span>
        <span>Work</span>
      </div>
    </div>
  );
};

export default WorkTravelBalance;