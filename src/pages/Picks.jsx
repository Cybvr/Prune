import React, { useState } from 'react';
import { MapPin, Wifi, DollarSign, Shield, ThumbsUp, Globe, Info, Plus } from 'lucide-react';

const PickCard = ({ pick, onClick }) => (
  <div className="bg-white p-6 rounded-lg shadow border-b border-slate-400 cursor-pointer" onClick={() => onClick(pick)}>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{pick.location}</h3>
    <p className="text-gray-600 mb-4">{pick.description}</p>
    <div className="grid grid-cols-2 gap-2 text-sm text-gray-500">
      <span className="flex items-center"><DollarSign size={16} className="mr-1" /> Cost: {pick.cost}/5</span>
      <span className="flex items-center"><Wifi size={16} className="mr-1" /> Internet: {pick.internet}/5</span>
      <span className="flex items-center"><Shield size={16} className="mr-1" /> Safety: {pick.safety}/5</span>
      <span className="flex items-center"><ThumbsUp size={16} className="mr-1" /> {pick.likes} likes</span>
    </div>
  </div>
);

const Picks = () => {
  const [filter, setFilter] = useState("all");
  const [selectedPick, setSelectedPick] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [picks, setPicks] = useState([
    // ... (your existing recommendations data, renamed to picks)
  ]);

  const filteredPicks = picks.filter(pick => {
    if (filter === "all") return true;
    return pick.continent.toLowerCase() === filter;
  });

  const handleCardClick = (pick) => {
    setSelectedPick(pick);
  };

  const handleSubmitPick = () => {
    // Implement logic to open a form for submitting a new pick
    console.log("Open form to submit a new pick");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-gray-800">Nomad Picks</h1>
        <button 
          onClick={() => setShowInfo(!showInfo)}
          className="text-gray-500 hover:text-gray-700"
        >
          <Info size={24} />
        </button>
      </div>

      {showInfo && (
        <div className="bg-blue-100 p-4 rounded-md mb-4">
          <p>Picks are a curated selection of tools, workspaces, and travel destinations. They're based on your preferences, location, and community recommendations.</p>
        </div>
      )}

      <div className="flex space-x-4">
        <button onClick={() => setFilter("all")} className={`px-4 py-2 rounded-lg ${filter === "all" ? 'bg-pink-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
          <Globe size={18} className="inline mr-2" /> All
        </button>
        <button onClick={() => setFilter("asia")} className={`px-4 py-2 rounded-lg ${filter === "asia" ? 'bg-pink-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
          Asia
        </button>
        <button onClick={() => setFilter("europe")} className={`px-4 py-2 rounded-lg ${filter === "europe" ? 'bg-pink-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
          Europe
        </button>
        <button onClick={handleSubmitPick} className="px-4 py-2 rounded-lg bg-green-500 text-white">
          <Plus size={18} className="inline mr-2" /> Submit Pick
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPicks.map((pick) => (
          <PickCard key={pick.id} pick={pick} onClick={handleCardClick} />
        ))}
      </div>

      {selectedPick && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">{selectedPick.location}</h2>
            <p className="mb-4">{selectedPick.description}</p>
            <div className="grid grid-cols-2 gap-2 text-sm mb-4">
              <span>Cost: {selectedPick.cost}/5</span>
              <span>Internet: {selectedPick.internet}/5</span>
              <span>Safety: {selectedPick.safety}/5</span>
              <span>Likes: {selectedPick.likes}</span>
              <span>Overall: {selectedPick.overall}/5</span>
            </div>
            <button 
              onClick={() => setSelectedPick(null)}
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

export default Picks;