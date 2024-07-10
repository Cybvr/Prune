import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Clock, MapPin } from 'lucide-react';

const ChallengeCard = ({ challenge, onJoinLeave }) => (
  <div className="bg-white p-4 sm:p-6 md:p-12 rounded-lg shadow mb-2 border-b border-slate-400">
    <Link to={`/challenges/${challenge.id}`} className="block mb-4">
      <div className="flex items-center mb-4">
        <challenge.icon className="h-6 w-6 text-pink-600 mr-2" />
        <h3 className="text-xl font-semibold text-gray-800">{challenge.title}</h3>
      </div>
      <p className="text-gray-600 mb-4">{challenge.description}</p>
    </Link>
    <div className="flex justify-between text-sm text-gray-500 mb-2">
      <span className="flex items-center"><Users size={16} className="mr-1" /> {challenge.participants} participants</span>
      <span className="flex items-center"><Clock size={16} className="mr-1" /> {challenge.timeLeft} left</span>
    </div>
    <div className="text-sm text-gray-500 flex items-center mb-4">
      <MapPin size={16} className="mr-1" /> {challenge.location}
    </div>
    {challenge.joined && (
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div className="bg-pink-600 h-2.5 rounded-full" style={{ width: `${challenge.progress}%` }}></div>
      </div>
    )}
    <button 
      onClick={() => onJoinLeave(challenge.id)}
      className={`w-full py-2 rounded-lg ${challenge.joined ? 'bg-red-100 text-red-600' : 'bg-pink-600 text-white'}`}
    >
      {challenge.joined ? 'Leave Challenge' : 'Join Challenge'}
    </button>
  </div>
);

export default ChallengeCard;