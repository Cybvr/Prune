import React from 'react';
import { X, User, MapPin, Calendar, Award } from 'lucide-react';

const UserProfile = ({ name, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{name}'s Profile</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="flex items-center mb-4">
          <div className="bg-gray-200 rounded-full p-4 mr-4">
            <User className="h-12 w-12 text-gray-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-sm text-gray-500 flex items-center">
              <MapPin size={14} className="mr-1" /> Current: Bali, Indonesia
            </p>
          </div>
        </div>
        <div className="mb-4">
          <p className="text-sm text-gray-600 flex items-center mb-2">
            <Calendar size={14} className="mr-2" /> Nomad since: January 2022
          </p>
          <p className="text-sm text-gray-600 flex items-center">
            <Award size={14} className="mr-2" /> 10 completed challenges
          </p>
        </div>
        <p className="text-gray-700 mb-4">
          Digital nomad passionate about web development and exploring new cultures. Always looking for the next adventure!
        </p>
        <button className="w-full bg-pink-600 text-white p-2 rounded hover:bg-pink-700">
          Send Message
        </button>
      </div>
    </div>
  );
};

export default UserProfile;