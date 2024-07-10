import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const TaskList = () => {
  // Assume you have a list of tasks
  const tasks = [
    { id: 1, title: 'Complete project proposal', completed: false },
    { id: 2, title: 'Review team members work', completed: true },
    { id: 3, title: 'Prepare for client meeting', completed: false },
  ];

  // Data for pie chart
  const completedTasks = tasks.filter(task => task.completed).length;
  const uncompletedTasks = tasks.length - completedTasks;

  const pieData = {
    labels: ['Completed', 'Uncompleted'],
    datasets: [
      {
        data: [completedTasks, uncompletedTasks],
        backgroundColor: ['#4CAF50', '#FFA000'],
      },
    ],
  };

  // Data for bar chart (simulated weekly data)
  const barData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Tasks per Day',
        data: [3, 5, 2, 4, 3, 1, 2],
        backgroundColor: '#2196F3',
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Tasks per Day (Last Week)',
      },
    },
  };

  return (
    <div className="bg-widget-bg p-6 rounded-lg">
      <h2 className="text-base font-semibold mb-4">Today's Tasks</h2>
      <ul className="space-y-2 mb-6">
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center">
            <input type="checkbox" checked={task.completed} className="mr-2" readOnly />
            <span className={task.completed ? 'line-through' : ''}>{task.title}</span>
          </li>
        ))}
      </ul>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-semibold mb-2">Task Completion</h3>
          <Pie data={pieData} />
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-2">Weekly Task Distribution</h3>
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
    </div>
  );
};

export default TaskList;