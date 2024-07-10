import React from 'react';
import { MapPin, Wifi, DollarSign, Shield, ThumbsUp, MessageSquare, Bookmark, Link } from 'lucide-react';

const DestinationCard = ({ destination, onClick }) => (
  <div className="bg-white p-6 rounded-lg shadow border-b border-slate-400 cursor-pointer" onClick={() => onClick(destination)}>
    <img src={`/api/placeholder/300/200`} alt={`${destination.city}, ${destination.country}`} className="w-full h-40 object-cover rounded-md mb-4" />
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{destination.city}, {destination.country}</h3>
    <p className="text-gray-600 mb-4">{destination.description}</p>
    <div className="grid grid-cols-2 gap-2 text-sm text-gray-500 mb-4">
      <span className="flex items-center"><DollarSign size={16} className="mr-1" /> Cost: {destination.cost}/5</span>
      <span className="flex items-center"><Wifi size={16} className="mr-1" /> Internet: {destination.internet}/5</span>
      <span className="flex items-center"><Shield size={16} className="mr-1" /> Safety: {destination.safety}/5</span>
      <span className="flex items-center"><ThumbsUp size={16} className="mr-1" /> {destination.likes} likes</span>
    </div>
    <div className="flex justify-between items-center text-sm text-gray-600">
      <span className="flex items-center"><ThumbsUp size={14} className="mr-1" /> {destination.upvotes}</span>
      <span className="flex items-center"><MessageSquare size={14} className="mr-1" /> {destination.comments}</span>
      <span className="flex items-center"><Bookmark size={14} className="mr-1" /> {destination.bookmarks}</span>
      <Link size={14} className="text-pink-600 hover:text-pink-700 cursor-pointer" />
    </div>
  </div>
);

export default DestinationCard;