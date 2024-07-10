import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import ProductivityStreak from "../components/dashboard/ProductivityStreak";
import WorkTravelBalance from "../components/dashboard/WorkTravelBalance";
import TaskInsights from "../components/dashboard/TaskInsights";
import { MapPin, Wifi, DollarSign, Shield, ThumbsUp, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const DestinationCard = ({ destination }) => (
  <div className="bg-white p-4 rounded-lg shadow border-b border-slate-400">
    <h3 className="text-lg font-semibold text-gray-800 mb-2">{destination.city}, {destination.country}</h3>
    <p className="text-gray-600 mb-2 text-sm">{destination.description.substring(0, 100)}...</p>
    <div className="grid grid-cols-2 gap-1 text-xs text-gray-500">
      <span className="flex items-center"><DollarSign size={12} className="mr-1" /> Cost: {destination.cost}/5</span>
      <span className="flex items-center"><Wifi size={12} className="mr-1" /> Internet: {destination.internet}/5</span>
      <span className="flex items-center"><Shield size={12} className="mr-1" /> Safety: {destination.safety}/5</span>
      <span className="flex items-center"><ThumbsUp size={12} className="mr-1" /> {destination.likes} likes</span>
    </div>
  </div>
);

const RecentNotesWidget = ({ notes }) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <h2 className="text-lg font-semibold mb-4">Recent Notes</h2>
    <ul className="space-y-2">
      {notes.map(note => (
        <li key={note.id} className="flex items-start">
          <FileText size={16} className="mr-2 mt-1 flex-shrink-0" />
          <Link to={`/notes/${note.id}`} className="text-sm hover:text-pink-600">{note.title}</Link>
        </li>
      ))}
    </ul>
    <Link to="/notes" className="text-pink-600 hover:text-pink-700 text-sm mt-4 inline-block">View all notes</Link>
  </div>
);

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [dashboardData, setDashboardData] = useState(null);
  const [destinations, setDestinations] = useState([
    {
      id: 1,
      city: "Bali",
      country: "Indonesia",
      description: "Digital nomad paradise with beautiful beaches and affordable living.",
      cost: 3,
      internet: 4,
      safety: 4,
      likes: 1250,
    },
    {
      id: 2,
      city: "Lisbon",
      country: "Portugal",
      description: "Vibrant city with a growing tech scene and great quality of life.",
      cost: 4,
      internet: 5,
      safety: 5,
      likes: 980,
    },
    {
      id: 3,
      city: "Cape Town",
      country: "South Africa",
      description: "Beautiful coastal city with a diverse culture and stunning landscapes.",
      cost: 3,
      internet: 4,
      safety: 3,
      likes: 750,
    },
  ]);
  const [recentNotes, setRecentNotes] = useState([
    { id: 1, title: "Travel Plans for Next Month" },
    { id: 2, title: "Project Ideas Brainstorm" },
    { id: 3, title: "Language Learning Progress" },
  ]);

  useEffect(() => {
    // Fetch dashboard data (simulated)
    const fetchDashboardData = async () => {
      // Simulating API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setDashboardData({
        workTravelBalance: 0.7,
        taskInsights: {
          mostProductiveTime: "10 AM - 12 PM",
          upcomingDeadline: "Project proposal - Jul 15",
          completionRate: 85,
          recommendation: "Consider scheduling your most important tasks during your peak productivity hours (10 AM - 12 PM) to maximize efficiency."
        }
      });
    };
    fetchDashboardData();
  }, []);

  if (!dashboardData) return <div>Loading...</div>;

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-semibold text-gray-800">Welcome back, {user.name}</h1>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Explore Destinations</h2>
          <Link to="/explore" className="text-pink-600 hover:text-pink-700">View all</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {destinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ProductivityStreak />
        <WorkTravelBalance balance={dashboardData.workTravelBalance} />
        <RecentNotesWidget notes={recentNotes} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TaskInsights insights={dashboardData.taskInsights} />
      </div>
    </div>
  );
};

export default Dashboard;