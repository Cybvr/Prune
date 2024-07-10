import React, { useState } from 'react';
import { Clock, Calendar, TrendingUp, Info } from 'lucide-react';

const TaskInsights = ({ insights }) => {
  const [showExplanation, setShowExplanation] = useState(false);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Task Insights</h2>
        <button
          onClick={() => setShowExplanation(!showExplanation)}
          className="text-gray-500 hover:text-gray-700"
        >
          <Info size={18} />
        </button>
      </div>

      {showExplanation && (
        <div className="bg-gray-100 p-3 rounded-md text-sm mb-4">
          These insights are generated based on your task completion patterns and productivity trends over the past 30 days. Our AI analyzes your data to provide personalized recommendations.
        </div>
      )}

      <div className="space-y-3">
        <div className="flex items-center">
          <Clock className="text-pink-600 mr-2" size={20} />
          <span>Most productive: {insights.mostProductiveTime}</span>
        </div>
        <div className="flex items-center">
          <Calendar className="text-pink-600 mr-2" size={20} />
          <span>Upcoming deadline: {insights.upcomingDeadline}</span>
        </div>
        <div className="flex items-center">
          <TrendingUp className="text-pink-600 mr-2" size={20} />
          <span>Task completion rate: {insights.completionRate}%</span>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold mb-2">Recommendation:</h3>
        <p className="text-sm text-gray-600">{insights.recommendation}</p>
      </div>
    </div>
  );
};

export default TaskInsights;