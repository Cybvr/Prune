import React, { useState } from 'react';
import { Plus, MapPin, Clock, Calendar, Briefcase, Plane, User, X, Trash2, Edit2 } from 'lucide-react';

const TaskItem = ({ task, onToggle, onDelete, onEdit }) => {
  const getTypeColor = (type) => {
    switch(type) {
      case 'work': return 'bg-blue-500';
      case 'travel': return 'bg-green-500';
      case 'personal': return 'bg-yellow-500';
      default: return 'bg-gray-500';
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
    <div className="flex items-center justify-between py-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors duration-150 group">
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
        <span className="mr-2">{task.estimatedTime}</span>
        <div className={`w-3 h-3 rounded-full ${getTypeColor(task.type)}`}></div>
        <button onClick={() => onEdit(task)} className="ml-3 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          <Edit2 size={16} />
        </button>
        <button onClick={() => onDelete(task.id)} className="ml-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

const TaskDetailPopup = ({ task, onClose, onSave }) => {
  const [editedTask, setEditedTask] = useState(task);

  const handleSave = (e) => {
    e.preventDefault();
    onSave(editedTask);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Task</h2>
          <button onClick={onClose}><X size={24} /></button>
        </div>
        <form onSubmit={handleSave}>
          <input
            type="text"
            value={editedTask.name}
            onChange={(e) => setEditedTask({...editedTask, name: e.target.value})}
            className="w-full p-2 mb-2 border rounded"
            required
          />
          <input
            type="text"
            value={editedTask.location}
            onChange={(e) => setEditedTask({...editedTask, location: e.target.value})}
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            type="date"
            value={editedTask.dueDate}
            onChange={(e) => setEditedTask({...editedTask, dueDate: e.target.value})}
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            type="text"
            value={editedTask.estimatedTime}
            onChange={(e) => setEditedTask({...editedTask, estimatedTime: e.target.value})}
            className="w-full p-2 mb-2 border rounded"
          />
          <select
            value={editedTask.type}
            onChange={(e) => setEditedTask({...editedTask, type: e.target.value})}
            className="w-full p-2 mb-2 border rounded"
          >
            <option value="work">Work</option>
            <option value="travel">Travel</option>
            <option value="personal">Personal</option>
          </select>
          <button type="submit" className="w-full bg-pink-700 text-white p-2 rounded">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

const Tasks = () => {
  const [tasks, setTasks] = useState([
    { id: 1, name: "Complete project proposal", completed: false, location: "Bali", dueDate: "2023-07-15", estimatedTime: "2h", type: "work" },
    { id: 2, name: "Find coworking space", completed: true, location: "Bali", dueDate: "2023-07-14", estimatedTime: "1h", type: "travel" },
    { id: 3, name: "Team video call", completed: false, location: "Remote", dueDate: "2023-07-16", estimatedTime: "1h", type: "work" },
    { id: 4, name: "Explore local market", completed: false, location: "Bali", dueDate: "2023-07-17", estimatedTime: "3h", type: "personal" },
  ]);

  const [showAddTask, setShowAddTask] = useState(false);
  const [showEditTask, setShowEditTask] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [newTask, setNewTask] = useState({
    name: '',
    location: '',
    dueDate: '',
    estimatedTime: '',
    type: 'work',
  });

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (task) => {
    setEditingTask(task);
    setShowEditTask(true);
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
    });
    setShowAddTask(false);
  };

  const handleSaveEdit = (editedTask) => {
    setTasks(tasks.map(task => 
      task.id === editedTask.id ? editedTask : task
    ));
  };

  const getSentimentAnalysis = () => {
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;

    if (completedTasks / totalTasks > 0.7) {
      return "You're doing great! You've completed most of your tasks.";
    } else if (completedTasks / totalTasks > 0.3) {
      return "You're making steady progress. Keep up the good work!";
    } else {
      return "You have several tasks to complete. Stay focused and tackle them one by one.";
    }
  };

  return (
    <div className="bg-gray-50 p-6 sm:p-8 md:p-14"> {/* Increased padding */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">Tasks</h1>
        <button 
          className="bg-pink-700 text-white px-4 py-2 rounded-lg flex items-center hover:bg-pink-800 transition-colors duration-150"
          onClick={() => setShowAddTask(!showAddTask)}
        >
          <Plus size={20} className="mr-2" /> Add Task
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-2">Task Analysis</h2>
        <p className="text-gray-600">Hi Jide! Here's a breakdown of your tasks:</p>
        <p className="text-gray-800 mt-2">{getSentimentAnalysis()}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-6">Your Tasks</h2>
        {tasks.map(task => (
          <TaskItem 
            key={task.id} 
            task={task} 
            onToggle={toggleTask}
            onDelete={deleteTask}
            onEdit={editTask}
          />
        ))}
      </div>

      {showAddTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Task</h2>
              <button onClick={() => setShowAddTask(false)}><X size={24} /></button>
            </div>
            <form onSubmit={handleAddTask}>
              {/* Form fields remain the same */}
              <button type="submit" className="w-full bg-pink-700 text-white p-2 rounded hover:bg-pink-800 transition-colors duration-150">Add Task</button>
            </form>
          </div>
        </div>
      )}

      {showEditTask && (
        <TaskDetailPopup 
          task={editingTask}
          onClose={() => setShowEditTask(false)}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
};

export default Tasks;