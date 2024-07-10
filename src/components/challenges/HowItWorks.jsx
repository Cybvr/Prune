import React from 'react';
import { X, CheckCircle } from 'lucide-react';

const HowItWorks = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">How Challenges Work</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <ul className="space-y-4">
          <li className="flex items-start">
            <CheckCircle size={20} className="text-green-500 mr-2 mt-1" />
            <span>Challenges are a mix of app-generated and community-created goals designed to boost your productivity and travel experiences.</span>
          </li>
          <li className="flex items-start">
            <CheckCircle size={20} className="text-green-500 mr-2 mt-1" />
            <span>Join challenges that align with your goals, whether they're global or specific to your current location.</span>
          </li>
          <li className="flex items-start">
            <CheckCircle size={20} className="text-green-500 mr-2 mt-1" />
            <span>Complete challenge tasks to earn points and climb the leaderboard.</span>
          </li>
          <li className="flex items-start">
            <CheckCircle size={20} className="text-green-500 mr-2 mt-1" />
            <span>Finishing challenges unlocks achievements and boosts your overall productivity score.</span>
          </li>
          <li className="flex items-start">
            <CheckCircle size={20} className="text-green-500 mr-2 mt-1" />
            <span>Create your own challenges to share with the Prune community and inspire others!</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HowItWorks;