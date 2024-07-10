import React from 'react';
import { CheckSquare, Square, MapPin } from 'lucide-react';

const TodaysTasks = ({ location }) => {
  const tasks = [
    { id: 1, text: "Complete project proposal", completed: false },
    { id: 2, text: "Review team members' work", completed: true },
    { id: 3, text: "Prepare for client meeting", completed: false },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Today's Tasks</h2>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <MapPin size={16} className="mr-1 text-pink-700 dark:text-pink-500" />
          <span>{location}</span>
        </div>
      </div>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center">
            {task.completed ? (
              <CheckSquare className="h-5 w-5 text-green-500 mr-2" />
            ) : (
              <Square className="h-5 w-5  text-pink-700 dark:text-pink-500 mr-2" />
            )}
            <span className={`${task.completed ? 'line-through text-gray-500' : 'text-gray-800 dark:text-gray-200'}`}>
              {task.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodaysTasks;