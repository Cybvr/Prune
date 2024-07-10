import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart2 } from 'lucide-react';

const data = [
  { day: 'Mon', tasks: 4 },
  { day: 'Wed', tasks: 6 },
  { day: 'Fri', tasks: 5 },
  { day: 'Sun', tasks: 3 },
];

const TaskOverview = () => {
  return (
    <div className="bg-white p-6 rounded-lg">
      <div className="flex justify-between items-center pb-2 mb-4 border-b border-slate-400">
        <BarChart2 className="text-gray-800" size={20} />
        <h2 className="text-lg font-semibold text-gray-800">Overview</h2>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" fontSize={12} />
          <YAxis fontSize={12} />
          <Tooltip />
          <Bar dataKey="tasks" fill="#be185d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TaskOverview;