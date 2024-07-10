import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, CheckSquare, FileText, Trophy, Compass, Users } from 'lucide-react';

const SidebarItem = ({ icon: Icon, text, to }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center p-2 space-x-3 rounded-md ${
        isActive ? 'bg-[#be185c] text-[#010101]' : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <Icon size={20} />
      <span>{text}</span>
    </Link>
  );
};

const Sidebar = () => {
  return (
    <div className="flex flex-col h-full p-3 bg-white shadow w-60">
      <div className="space-y-3">
        <div className="flex-1">
          <ul className="pt-2 pb-4 space-y-1 text-sm">
            <li><SidebarItem icon={Home} text="Home" to="/dashboard" /></li>
            <li><SidebarItem icon={CheckSquare} text="Tasks" to="/tasks" /></li>
            <li><SidebarItem icon={FileText} text="Notes" to="/notes" /></li>
            <li><SidebarItem icon={Trophy} text="Challenges" to="/challenges" /></li>
          </ul>
        </div>

        <div className="flex-1">
          <h2 className="px-2 text-lg font-semibold">Discover</h2>
          <ul className="pt-2 pb-4 space-y-1 text-sm">
            <li><SidebarItem icon={Compass} text="Explore" to="/explore" /></li>
            <li><SidebarItem icon={Users} text="Nomad Hub" to="/nomad-hub" /></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;