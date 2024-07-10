import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Users, Calendar, MapPin, ArrowLeft, CheckCircle } from 'lucide-react';

const ChallengeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState(null);
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    // Mock API call to fetch challenge data
    const fetchChallenge = async () => {
      // Simulating API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setChallenge({
        id,
        title: "30-Day Nomad Productivity Sprint",
        description: "Complete all your daily tasks while visiting a new location each week.",
        participants: 156,
        daysLeft: 20,
        location: "Global",
        tasks: [
          { id: 1, title: "Set up workspace in new location", completed: false },
          { id: 2, title: "Complete daily task list", completed: false },
          { id: 3, title: "Network with local digital nomads", completed: false },
        ]
      });
    };
    fetchChallenge();
  }, [id]);

  const handleJoinLeave = () => {
    setIsJoined(!isJoined);
    // Here you would typically make an API call to update the user's challenge status
  };

  if (!challenge) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button
        onClick={() => navigate('/challenges')}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Challenges
      </button>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4">{challenge.title}</h1>
        <p className="text-gray-600 mb-6">{challenge.description}</p>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Users size={20} className="text-[#be185c] mr-2" />
            <span>{challenge.participants} participants</span>
          </div>
          <div className="flex items-center">
            <Calendar size={20} className="text-[#be185c] mr-2" />
            <span>{challenge.daysLeft} days left</span>
          </div>
          <div className="flex items-center">
            <MapPin size={20} className="text-[#be185c] mr-2" />
            <span>{challenge.location}</span>
          </div>
        </div>

        <button
          onClick={handleJoinLeave}
          className={`w-full py-2 rounded-lg text-white font-semibold ${
            isJoined ? 'bg-red-500 hover:bg-red-600' : 'bg-[#be185c] hover:bg-[#9d1148]'
          }`}
        >
          {isJoined ? 'Leave Challenge' : 'Join Challenge'}
        </button>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Challenge Tasks</h2>
        <ul className="space-y-2">
          {challenge.tasks.map(task => (
            <li key={task.id} className="flex items-center justify-between bg-gray-100 p-3 rounded">
              <span>{task.title}</span>
              <CheckCircle size={20} className={task.completed ? 'text-green-500' : 'text-gray-300'} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChallengeDetail;