import React, { useState } from 'react';
import { X } from 'lucide-react';

const CreateChallenge = ({ onClose }) => {
  const [challengeData, setChallengeData] = useState({
    title: '',
    description: '',
    duration: '',
    type: 'global'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChallengeData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the challenge data to your backend
    console.log('Challenge created:', challengeData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Create New Challenge</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={challengeData.title}
            onChange={handleChange}
            placeholder="Challenge Title"
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <textarea
            name="description"
            value={challengeData.description}
            onChange={handleChange}
            placeholder="Challenge Description"
            className="w-full p-2 mb-4 border rounded h-32"
            required
          />
          <input
            type="number"
            name="duration"
            value={challengeData.duration}
            onChange={handleChange}
            placeholder="Duration (in days)"
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <select
            name="type"
            value={challengeData.type}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
            required
          >
            <option value="global">Global</option>
            <option value="local">Local</option>
          </select>
          <button type="submit" className="w-full bg-pink-600 text-white p-2 rounded hover:bg-pink-700">
            Create Challenge
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateChallenge;