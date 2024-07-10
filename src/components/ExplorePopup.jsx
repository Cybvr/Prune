import React from 'react';
import { X, ThumbsUp, MessageSquare, Share2 } from 'lucide-react';

const ExplorePopup = ({ isOpen, onClose, location }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg w-full max-w-2xl overflow-hidden">
        <div className="relative">
          <img src={`/images/${location.id}.jpg`} alt={location.name} className="w-full h-48 object-cover" />
          <button onClick={onClose} className="absolute top-2 right-2 bg-white rounded-full p-1">
            <X size={24} />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-2">{location.name}</h2>
          <p className="text-gray-600 mb-4">{location.description}</p>
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-4">
              <button className="flex items-center space-x-1 text-gray-600">
                <ThumbsUp size={18} />
                <span>{location.likes}</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-600">
                <MessageSquare size={18} />
                <span>{location.comments}</span>
              </button>
            </div>
            <button className="flex items-center space-x-1 text-gray-600">
              <Share2 size={18} />
              <span>Share</span>
            </button>
          </div>
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-2">Other Locations</h3>
            <div className="grid grid-cols-3 gap-2">
              {['Lagos', 'Porto Rico', 'Schenzhen'].map((city) => (
                <div key={city} className="bg-gray-200 rounded p-2">
                  <div className="bg-gray-400 h-16 mb-1 rounded"></div>
                  <p className="text-sm font-medium">{city}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorePopup;