import React, { useState } from 'react';
import { Plus, MapPin, BarChart2, Clock, Calendar, Briefcase, Plane, User, TrendingUp, AlertTriangle, ClipboardCheck, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const TaskItem = ({ task, onToggle }) => {
  // ... (TaskItem component remains the same)
};

const Tasks = () => {
  const [tasks, setTasks] = useState([
    { id: 1, name: "Complete project proposal", completed: false, location: "Bali", dueDate: "2023-07-15", estimatedTime: "2h", type: "work", urgency: "high" },
    { id: 2, name: "Find coworking space", completed: true, location: "Bali", dueDate: "2023-07-14", estimatedTime: "1h", type: "travel", urgency: "medium" },
    { id: 3, name: "Team video call", completed: false, location: "Remote", dueDate: "2023-07-16", estimatedTime: "1h", type: "work", urgency: "low" },
    { id: 4, name: "Explore local market", completed: false, location: "Bali", dueDate: "2023-07-17", estimatedTime: "3h", type: "personal", urgency: "low" },
  ]);

  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({
    name: '',
    location: '',
    dueDate: '',
    estimatedTime: '',
    type: 'work',
    urgency: 'medium'
  });

  const currentLocation = "Bali, Indonesia";

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    setTasks([...tasks, { ...newTask, id: Date.now(), completed: false }]);
    setNewTask({
      name: '',
      location: '',
      dueDate: '',
      estimatedTime: '',
      type: 'work',
      urgency: 'medium'
    });
    setShowAddTask(false);
  };

  return (
    <div className="p-4 sm:p-6 md:p-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-2 sm:mb-0">Tasks</h1>
        <div className="flex items-center text-gray-600">
          <MapPin size={18} className="mr-2" />
          <span>{currentLocation}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <button 
          className="bg-pink-700 text-white px-4 py-2 rounded-lg flex items-center"
          onClick={() => setShowAddTask(!showAddTask)}
        >
          <Plus size={20} className="mr-2" /> Add Task
        </button>
        <Link to="/notes/new" className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center">
          <FileText size={20} className="mr-2" /> New Note
        </Link>
      </div>

      {showAddTask && (
        <form onSubmit={handleAddTask} className="bg-white p-4 rounded-lg shadow mb-6">
          <input
            type="text"
            placeholder="Task name"
            value={newTask.name}
            onChange={(e) => setNewTask({...newTask, name: e.target.value})}
            className="w-full p-2 mb-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={newTask.location}
            onChange={(e) => setNewTask({...newTask, location: e.target.value})}
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            type="date"
            value={newTask.dueDate}
            onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            type="text"
            placeholder="Estimated time"
            value={newTask.estimatedTime}
            onChange={(e) => setNewTask({...newTask, estimatedTime: e.target.value})}
            className="w-full p-2 mb-2 border rounded"
          />
          <select
            value={newTask.type}
            onChange={(e) => setNewTask({...newTask, type: e.target.value})}
            className="w-full p-2 mb-2 border rounded"
          >
            <option value="work">Work</option>
            <option value="travel">Travel</option>
            <option value="personal">Personal</option>
          </select>
          <select
            value={newTask.urgency}
            onChange={(e) => setNewTask({...newTask, urgency: e.target.value})}
            className="w-full p-2 mb-2 border rounded"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button type="submit" className="w-full bg-pink-700 text-white p-2 rounded">Add Task</button>
        </form>
      )}

      {/* ... (Rest of the component remains the same) */}

      <div className="w-full">
        {tasks.map(task => <TaskItem key={task.id} task={task} onToggle={toggleTask} />)}
      </div>
    </div>
  );
};

export default Tasks;