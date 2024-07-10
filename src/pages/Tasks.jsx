import React, { useState } from 'react';
import { Plus, MapPin, BarChart2, Clock, Calendar, Briefcase, Plane, User, TrendingUp, AlertTriangle, ClipboardCheck, FileText, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const TaskItem = ({ task, onToggle }) => {
  const getTypeColor = (type) => {
    switch(type) {
      case 'work': return 'border-blue-500';
      case 'travel': return 'border-green-500';
      case 'personal': return 'border-yellow-500';
      default: return 'border-gray-500';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch(urgency) {
      case 'high': return 'bg-red-100';
      case 'medium': return 'bg-yellow-100';
      case 'low': return 'bg-green-100';
      default: return 'bg-gray-100';
    }
  };

  const TypeIcon = () => {
    switch(task.type) {
      case 'work': return <Briefcase size={14} className="text-blue-500" />;
      case 'travel': return <Plane size={14} className="text-green-500" />;
      case 'personal': return <User size={14} className="text-yellow-500" />;
      default: return null;
    }
  };

  return (
    <div className={`flex items-center justify-between p-3 rounded-lg shadow mb-2 ${getUrgencyColor(task.urgency)} ${getTypeColor(task.type)} border-l-4`}>
      <div className="flex items-center">
        <input type="checkbox" className="mr-3" checked={task.completed} onChange={() => onToggle(task.id)} />
        <span className={`${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>{task.name}</span>
      </div>
      <div className="flex items-center text-sm text-gray-500">
        <TypeIcon />
        <span className="ml-2 mr-3">{task.type}</span>
        <MapPin size={14} className="mr-1" />
        <span className="mr-3">{task.location}</span>
        <Calendar size={14} className="mr-1" />
        <span className="mr-3">{task.dueDate}</span>
        <Clock size={14} className="mr-1" />
        <span>{task.estimatedTime}</span>
      </div>
    </div>
  );
};

const Tasks = () => {
  const [tasks, setTasks] = useState([
    { id: 1, name: "Complete project proposal", completed: false, location: "Bali", dueDate: "2023-07-15", estimatedTime: "2h", type: "work", urgency: "high" },
    { id: 2, name: "Find coworking space", completed: true, location: "Bali", dueDate: "2023-07-14", estimatedTime: "1h", type: "travel", urgency: "medium" },
    { id: 3, name: "Team video call", completed: false, location: "Remote", dueDate: "2023-07-16", estimatedTime: "1h", type: "work", urgency: "low" },
    { id: 4, name: "Explore local market", completed: false, location: "Bali", dueDate: "2023-07-17", estimatedTime: "3h", type: "personal", urgency: "low" },
    { id: 5, name: "Write blog post about Bali", completed: false, location: "Bali", dueDate: "2023-07-18", estimatedTime: "2h", type: "work", urgency: "medium" },
    { id: 6, name: "Research next destination", completed: false, location: "Remote", dueDate: "2023-07-20", estimatedTime: "3h", type: "travel", urgency: "low" },
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">Tasks</h1>
        <div className="flex items-center text-gray-600">
          <MapPin size={18} className="mr-2" />
          <span>{currentLocation}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Task Insights</h2>
          <p className="text-sm text-gray-600">Most productive: 10 AM - 12 PM</p>
          <p className="text-sm text-gray-600">Completed this week: 12 tasks</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Upcoming Deadlines</h2>
          <ul className="text-sm text-gray-600">
            <li>Project proposal - Jul 15</li>
            <li>Team video call - Jul 16</li>
          </ul>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Task Distribution</h2>
          <p className="text-sm text-gray-600">Work: 60%</p>
          <p className="text-sm text-gray-600">Travel: 20%</p>
          <p className="text-sm text-gray-600">Personal: 20%</p>
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Task</h2>
              <button onClick={() => setShowAddTask(false)}><X size={24} /></button>
            </div>
            <form onSubmit={handleAddTask}>
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
          </div>
        </div>
      )}

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
        {tasks.map(task => <TaskItem key={task.id} task={task} onToggle={toggleTask} />)}
      </div>
    </div>
  );
};

export default Tasks;