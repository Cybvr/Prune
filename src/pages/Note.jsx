import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Save, ArrowLeft, Plus, Clock, MapPin, Briefcase, User, Link as LinkIcon } from 'lucide-react';

const Note = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState({ title: '', content: '', relatedTasks: [] });
  const [isEditing, setIsEditing] = useState(false);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const fetchNote = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      setNote({
        title: `Note ${id}`,
        content: `This is the content of note ${id}.`,
        relatedTasks: [
          { id: 1, title: 'Complete project proposal', deadline: '2023-07-15', type: 'work' },
          { id: 2, title: 'Team video call', deadline: '2023-07-16', type: 'work' },
          { id: 3, title: 'Explore local market', deadline: '2023-07-17', type: 'personal' }
        ]
      });
    };
    fetchNote();
  }, [id]);

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => {
    console.log('Saving note:', note);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTask = () => {
    if (newTask.trim()) {
      setNote(prev => ({
        ...prev,
        relatedTasks: [...prev.relatedTasks, { id: Date.now(), title: newTask, deadline: '', type: 'work' }]
      }));
      setNewTask('');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back
        </button>
        {isEditing ? (
          <button
            onClick={handleSave}
            className="flex items-center bg-[#be185c] text-white px-4 py-2 rounded hover:bg-[#9d1148]"
          >
            <Save size={20} className="mr-2" />
            Save
          </button>
        ) : (
          <button
            onClick={handleEdit}
            className="bg-[#be185c] text-white px-4 py-2 rounded hover:bg-[#9d1148]"
          >
            Edit
          </button>
        )}
      </div>

      {isEditing ? (
        <>
          <input
            type="text"
            name="title"
            value={note.title}
            onChange={handleChange}
            className="w-full text-2xl font-bold mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#be185c]"
          />
          <textarea
            name="content"
            value={note.content}
            onChange={handleChange}
            className="w-full h-64 p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#be185c]"
          />
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">{note.title}</h1>
          <p className="whitespace-pre-wrap mb-4">{note.content}</p>
        </>
      )}

      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Related Tasks</h2>
          <Link to="/tasks" className="text-[#be185c] hover:underline flex items-center">
            <LinkIcon size={16} className="mr-1" />
            View all tasks
          </Link>
        </div>
        <ul className="space-y-2">
          {note.relatedTasks.map(task => (
            <li key={task.id} className="flex items-center justify-between bg-white p-3 rounded shadow">
              <span className="flex items-center">
                {task.type === 'work' ? (
                  <Briefcase size={16} className="mr-2 text-[#be185c]" />
                ) : (
                  <User size={16} className="mr-2 text-green-500" />
                )}
                {task.title}
              </span>
              <div className="flex items-center">
                <Clock size={16} className="mr-2 text-gray-500" />
                <span className="text-sm text-gray-500">{task.deadline}</span>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task"
            className="flex-grow p-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-[#be185c]"
          />
          <button
            onClick={handleAddTask}
            className="bg-[#be185c] text-white px-4 py-2 rounded-r hover:bg-[#9d1148]"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>

      <div className="mt-8 bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Task Insights</h2>
        <p className="flex items-center mb-2">
          <Clock size={16} className="mr-2 text-[#be185c]" />
          Most productive: 10 AM - 12 PM
        </p>
        <p className="flex items-center">
          <MapPin size={16} className="mr-2 text-[#be185c]" />
          Current Location: Bali, Indonesia
        </p>
      </div>
    </div>
  );
};

export default Note;