import React, { useContext } from 'react';
import { Award, Gift, Star } from 'lucide-react';
import { UserContext } from '../contexts/UserContext';

const RewardCard = ({ title, description, icon: Icon, unlocked }) => (
  <div className={`bg-white p-4 rounded-lg shadow ${unlocked ? 'border-green-500 border-2' : 'opacity-50'}`}>
    <div className="flex items-center mb-2">
      <Icon size={24} className={unlocked ? 'text-green-500' : 'text-gray-400'} />
      <h3 className="text-lg font-semibold ml-2">{title}</h3>
    </div>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

const Rewards = () => {
  const { user } = useContext(UserContext);

  const rewards = [
    { 
      title: 'Productivity Master', 
      description: 'Complete 50 tasks in a week', 
      icon: Award, 
      unlocked: user.completedTasks >= 50 
    },
    { 
      title: 'Globe Trotter', 
      description: 'Visit 5 different countries', 
      icon: Gift, 
      unlocked: user.visitedCountries >= 5 
    },
    { 
      title: 'Challenge Champion', 
      description: 'Win 10 challenges', 
      icon: Star, 
      unlocked: user.wonChallenges >= 10 
    },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Rewards</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Your Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rewards.map((reward, index) => (
            <RewardCard key={index} {...reward} />
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Available Perks</h2>
        <ul className="list-disc list-inside">
          <li>10% discount on co-working spaces</li>
          <li>Early access to new features</li>
          <li>Exclusive community events</li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Redeem Rewards</h2>
        <p className="text-gray-600">Coming soon! Stay tuned for exciting rewards you can redeem with your points.</p>
      </div>
    </div>
  );
};

export default Rewards;