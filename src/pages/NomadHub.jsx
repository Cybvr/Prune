import React, { useState } from 'react';
import { User, MessageSquare, ThumbsUp, Award, MapPin } from 'lucide-react';
import UserProfile from '../components/nomadHub/UserProfile';
import MessageIcon from '../components/common/MessageIcon';

const NomadActivity = ({ name, action, time, location, onConnect }) => (
  <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow mb-2">
    <div className="flex items-center">
      <div className="bg-gray-200 rounded-full p-2 mr-4">
        <User className="h-6 w-6 text-gray-600" />
      </div>
      <div>
        <p className="text-gray-800"><span className="font-semibold">{name}</span> {action}</p>
        <p className="text-sm text-gray-500 flex items-center mt-1">
          <MapPin size={14} className="mr-1" /> {location} • {time}
        </p>
      </div>
    </div>
    <button 
      onClick={() => onConnect(name)}
      className="bg-pink-600 text-white px-3 py-1 rounded-full text-sm hover:bg-pink-700"
    >
      Connect
    </button>
  </div>
);

const NomadHub = () => {
  const [activities, setActivities] = useState([
    { name: "John Doe", action: "completed a challenge in Bali", time: "2 hours ago", location: "Bali, Indonesia" },
    { name: "Jane Smith", action: "started working from a new co-working space", time: "4 hours ago", location: "Chiang Mai, Thailand" },
    { name: "Bob Johnson", action: "reached a 7-day productivity streak while traveling", time: "Yesterday", location: "Lisbon, Portugal" },
    { name: "Alice Brown", action: "joined the 'Southeast Asia Nomads' group", time: "2 days ago", location: "Ho Chi Minh City, Vietnam" },
  ]);

  const [selectedUser, setSelectedUser] = useState(null);

  const handleConnect = (name) => {
    setSelectedUser(name);
  };

  const closeProfile = () => {
    setSelectedUser(null);
  };

  return (
    <div className="p-4 sm:p-6 md:p-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-2 sm:mb-0">Nomad Community Hub</h1>
        <div className="flex items-center">
          <MessageIcon />
          <div className="flex items-center text-gray-600 ml-4">
            <MapPin size={18} className="mr-2" />
            <span>Global</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Nomad Activity</h2>
          {activities.map((activity, index) => (
            <NomadActivity key={index} {...activity} onConnect={handleConnect} />
          ))}
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Global Nomad Leaderboard</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">1. You</span>
              <span className="text-indigo-600">1250 pts</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span>2. John Doe</span>
              <span>1100 pts</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span>3. Jane Smith</span>
              <span>950 pts</span>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Your Nomad Stats</h3>
            <div className="flex flex-wrap justify-between text-sm text-gray-600">
              <span className="flex items-center mb-2"><MessageSquare size={16} className="mr-1" /> 120 connections</span>
              <span className="flex items-center mb-2"><ThumbsUp size={16} className="mr-1" /> 25 countries</span>
              <span className="flex items-center mb-2"><Award size={16} className="mr-1" /> 15 nomad badges</span>
            </div>
          </div>
        </div>
      </div>
      {selectedUser && <UserProfile name={selectedUser} onClose={closeProfile} />}
    </div>
  );
};

export default NomadHub;