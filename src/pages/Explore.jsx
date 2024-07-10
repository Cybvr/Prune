import React, { useState } from 'react';
import { MapPin, Wifi, DollarSign, Shield, ThumbsUp, Globe, Info, Plus, MessageSquare, Bookmark, Link } from 'lucide-react';

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

const Explore = () => {
  const [filter, setFilter] = useState("all");
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [destinations, setDestinations] = useState([
    {
      id: 1,
      city: "Bali",
      country: "Indonesia",
      continent: "asia",
      description: "Digital nomad paradise with beautiful beaches and affordable living.",
      cost: 3,
      internet: 4,
      safety: 4,
      likes: 1250,
      overall: 4.5,
      upvotes: 782,
      comments: 56,
      bookmarks: 230,
    },
    {
      id: 2,
      city: "Lisbon",
      country: "Portugal",
      continent: "europe",
      description: "Vibrant city with a growing tech scene and great quality of life.",
      cost: 4,
      internet: 5,
      safety: 5,
      likes: 980,
      overall: 4.7,
      upvotes: 645,
      comments: 42,
      bookmarks: 189,
    },
    {
      id: 3,
      city: "Cape Town",
      country: "South Africa",
      continent: "africa",
      description: "Beautiful coastal city with a diverse culture and stunning landscapes.",
      cost: 3,
      internet: 4,
      safety: 3,
      likes: 750,
      overall: 4.2,
      upvotes: 521,
      comments: 38,
      bookmarks: 142,
    },
    {
      id: 4,
      city: "Medellin",
      country: "Colombia",
      continent: "america",
      description: "Modern city with a pleasant climate and growing digital nomad community.",
      cost: 2,
      internet: 4,
      safety: 3,
      likes: 820,
      overall: 4.0,
      upvotes: 598,
      comments: 45,
      bookmarks: 176,
    }
  ]);

  const filteredDestinations = destinations.filter(destination => {
    if (filter === "all") return true;
    return destination.continent.toLowerCase() === filter;
  });

  const handleCardClick = (destination) => {
    setSelectedDestination(destination);
  };

  const handleSubmitDestination = () => {
    console.log("Open form to submit a new destination");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-gray-800">Explore Destinations</h1>
        <button 
          onClick={() => setShowInfo(!showInfo)}
          className="text-gray-500 hover:text-gray-700"
        >
          <Info size={24} />
        </button>
      </div>

      {showInfo && (
        <div className="bg-blue-100 p-4 rounded-md mb-4">
          <p>Explore curated travel destinations based on your preferences, location, and community recommendations.</p>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <button onClick={() => setFilter("all")} className={`px-4 py-2 rounded-lg ${filter === "all" ? 'bg-pink-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
          <Globe size={18} className="inline mr-2" /> All
        </button>
        <button onClick={() => setFilter("asia")} className={`px-4 py-2 rounded-lg ${filter === "asia" ? 'bg-pink-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
          Asia
        </button>
        <button onClick={() => setFilter("europe")} className={`px-4 py-2 rounded-lg ${filter === "europe" ? 'bg-pink-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
          Europe
        </button>
        <button onClick={() => setFilter("africa")} className={`px-4 py-2 rounded-lg ${filter === "africa" ? 'bg-pink-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
          Africa
        </button>
        <button onClick={() => setFilter("america")} className={`px-4 py-2 rounded-lg ${filter === "america" ? 'bg-pink-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
          Americas
        </button>
        <button onClick={handleSubmitDestination} className="px-4 py-2 rounded-lg bg-green-500 text-white">
          <Plus size={18} className="inline mr-2" /> Submit Destination
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDestinations.map((destination) => (
          <DestinationCard key={destination.id} destination={destination} onClick={handleCardClick} />
        ))}
      </div>

      {selectedDestination && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">{selectedDestination.city}, {selectedDestination.country}</h2>
            <p className="mb-4">{selectedDestination.description}</p>
            <div className="grid grid-cols-2 gap-2 text-sm mb-4">
              <span>Cost: {selectedDestination.cost}/5</span>
              <span>Internet: {selectedDestination.internet}/5</span>
              <span>Safety: {selectedDestination.safety}/5</span>
              <span>Likes: {selectedDestination.likes}</span>
              <span>Overall: {selectedDestination.overall}/5</span>
            </div>
            <button 
              onClick={() => setSelectedDestination(null)}
              className="w-full py-2 bg-pink-600 text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Explore;