import React, { useState, useEffect } from 'react';
import { Trophy, Target, Users, Globe, Home, CheckCircle, MapPin, Plus, HelpCircle } from 'lucide-react';
import ChallengeCard from '../components/challenges/ChallengeCard';
import CreateChallenge from '../components/challenges/CreateChallenge';
import HowItWorks from '../components/challenges/HowItWorks';

const Challenges = () => {
  const [currentLocation, setCurrentLocation] = useState("Bali, Indonesia");
  const [filter, setFilter] = useState("all");
  const [challenges, setChallenges] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateChallenge, setShowCreateChallenge] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  useEffect(() => {
    const fetchChallenges = async () => {
      setIsLoading(true);
      try {
        // Simulating API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setChallenges([
          { 
            id: 1,
            icon: Trophy,
            title: "30-Day Nomad Productivity Sprint",
            description: "Complete all your daily tasks while visiting a new location each week.",
            participants: 156,
            timeLeft: "20 days",
            location: "Global",
            joined: true,
            progress: 60,
            type: "global"
          },
          // ... (other challenge objects remain the same)
        ]);
      } catch (err) {
        setError("Failed to fetch challenges. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchChallenges();
  }, []);

  const handleJoinLeave = (id) => {
    setChallenges(challenges.map(challenge => 
      challenge.id === id ? { ...challenge, joined: !challenge.joined } : challenge
    ));
    // Here you would typically make an API call to update the user's challenge status
  };

  const filteredChallenges = challenges.filter(challenge => {
    if (filter === "all") return true;
    if (filter === "global") return challenge.type === "global";
    if (filter === "local") return challenge.type === "local";
    if (filter === "completed") return challenge.progress === 100;
    return true;
  });

  if (isLoading) return <div className="text-center mt-8">Loading challenges...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div className="p-4 sm:p-6 md:p-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-2 sm:mb-0">Challenges</h1>
        <div className="flex items-center text-gray-600">
          <MapPin size={18} className="mr-2" />
          <span>{currentLocation}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <button onClick={() => setFilter("all")} className={`px-4 py-2 rounded-lg ${filter === "all" ? 'bg-pink-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
          <Globe size={18} className="inline mr-2" /> All
        </button>
        <button onClick={() => setFilter("global")} className={`px-4 py-2 rounded-lg ${filter === "global" ? 'bg-pink-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
          <Target size={18} className="inline mr-2" /> Global
        </button>
        <button onClick={() => setFilter("local")} className={`px-4 py-2 rounded-lg ${filter === "local" ? 'bg-pink-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
          <Home size={18} className="inline mr-2" /> Local
        </button>
        <button onClick={() => setFilter("completed")} className={`px-4 py-2 rounded-lg ${filter === "completed" ? 'bg-pink-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
          <CheckCircle size={18} className="inline mr-2" /> Completed
        </button>
        <button onClick={() => setShowCreateChallenge(true)} className="px-4 py-2 rounded-lg bg-green-500 text-white">
          <Plus size={18} className="inline mr-2" /> Create Challenge
        </button>
        <button onClick={() => setShowHowItWorks(true)} className="px-4 py-2 rounded-lg bg-blue-500 text-white">
          <HelpCircle size={18} className="inline mr-2" /> How It Works
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChallenges.map((challenge) => (
          <ChallengeCard key={challenge.id} challenge={challenge} onJoinLeave={handleJoinLeave} />
        ))}
      </div>

      {showCreateChallenge && (
        <CreateChallenge onClose={() => setShowCreateChallenge(false)} />
      )}

      {showHowItWorks && (
        <HowItWorks onClose={() => setShowHowItWorks(false)} />
      )}
    </div>
  );
};

export default Challenges;