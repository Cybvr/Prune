import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, CheckSquare, FileText, Trophy, Compass, Users } from 'lucide-react';

const SidebarItem = ({ icon: Icon, text, to }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      className={`flex items-center p-2 space-x-2 rounded-md ${
        isActive ? 'bg-[#be185c] text-[#010101]' : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <Icon size={18} />
      <span className="text-sm">{text}</span>
    </Link>
  );
};

const Sidebar = () => {
  const recentNotes = [
    { id: 1, title: "Meeting notes" },
    { id: 2, title: "Project ideas" },
    { id: 3, title: "Travel plans" },
    { id: 4, title: "Shopping list" },
  ];

  return (
    <div className="flex flex-col h-full p-3 bg-white shadow w-52">
      <div className="space-y-3">
        <div className="flex-1">
          <ul className="pt-2 pb-4 space-y-1">
            <li><SidebarItem icon={Home} text="Home" to="/dashboard" /></li>
            <li><SidebarItem icon={CheckSquare} text="Tasks" to="/tasks" /></li>
            <li><SidebarItem icon={FileText} text="Notes" to="/notes" /></li>
            <li><SidebarItem icon={Trophy} text="Challenges" to="/challenges" /></li>
          </ul>
        </div>
        <div className="flex-1">
          <h2 className="px-2 text-sm font-semibold text-gray-600">Discover</h2>
          <ul className="pt-2 pb-4 space-y-1">
            <li><SidebarItem icon={Compass} text="Explore" to="/explore" /></li>
            <li><SidebarItem icon={Users} text="Nomad Hub" to="/nomad-hub" /></li>
          </ul>
        </div>
        <div className="flex-1">
          <h2 className="px-2 text-sm font-semibold text-gray-600">Activity</h2>
          <ul className="pt-2 pb-4 space-y-1">
            {recentNotes.map((note) => (
              <li key={note.id}>
                <Link to={`/notes/${note.id}`} className="flex items-center p-2 space-x-2 rounded-md text-gray-600 hover:bg-gray-100">
                  <FileText size={18} />
                  <span className="text-sm">{note.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;