import React from 'react';
import { PlusCircle, Trophy, Users } from 'lucide-react';

const QuickActions = () => {
  return (
    <div className="bg-widget-bg p-6 rounded-lg">
      <h2 className="text-base font-semibold mb-4">Quick Actions</h2>
      <div className="flex justify-around">
        <button className="flex flex-col items-center">
          <PlusCircle className="mb-2" />
          <span>Add Task</span>
        </button>
        <button className="flex flex-col items-center">
          <Trophy className="mb-2" />
          <span>Achievements</span>
        </button>
        <button className="flex flex-col items-center">
          <Users className="mb-2" />
          <span>Challenge</span>
        </button>
      </div>
    </div>
  );
};

export default QuickActions;