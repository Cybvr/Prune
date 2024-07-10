import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, CheckSquare, FileText, Trophy, Compass, Users, ChevronsLeft, ChevronsRight } from 'lucide-react';

const SidebarItem = ({ icon: Icon, text, to, isOpen }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      className={`flex items-center p-2 space-x-2 rounded-md ${
        isActive ? 'bg-[#be185c] text-gray-800' : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <Icon size={18} />
      {isOpen && <span className="text-sm">{text}</span>}
    </Link>
  );
};

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const recentNotes = [
    { id: 1, title: "Meeting notes" },
    { id: 2, title: "Project ideas" },
    { id: 3, title: "Travel plans" },
    { id: 4, title: "Shopping list" },
  ];

  return (
    <div className={`flex flex-col h-full bg-white shadow transition-all duration-300 ${isOpen ? 'w-52' : 'w-16'}`}>
      <div className="flex-grow overflow-y-auto">
        <div className="space-y-3 p-3">
          <div>
            <ul className="space-y-1">
              <li><SidebarItem icon={Home} text="Home" to="/dashboard" isOpen={isOpen} /></li>
              <li><SidebarItem icon={CheckSquare} text="Tasks" to="/tasks" isOpen={isOpen} /></li>
              <li><SidebarItem icon={FileText} text="Notes" to="/notes" isOpen={isOpen} /></li>
              <li><SidebarItem icon={Trophy} text="Challenges" to="/challenges" isOpen={isOpen} /></li>
            </ul>
          </div>
          {isOpen && (
            <>
              <div>
                <h2 className="px-2 text-xs font-semibold text-gray-600 uppercase tracking-wider">Discover</h2>
                <ul className="mt-2 space-y-1">
                  <li><SidebarItem icon={Compass} text="Explore" to="/explore" isOpen={isOpen} /></li>
                  <li><SidebarItem icon={Users} text="Nomad Hub" to="/nomad-hub" isOpen={isOpen} /></li>
                </ul>
              </div>
              <div>
                <h2 className="px-2 text-xs font-semibold text-gray-600 uppercase tracking-wider">Activity</h2>
                <ul className="mt-2 space-y-1">
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
            </>
          )}
        </div>
      </div>
      <div className="p-3 border-t border-gray-200">
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="w-full flex items-center justify-center p-2 text-gray-500 hover:bg-gray-100 rounded-md transition-colors duration-200"
        >
          {isOpen ? <ChevronsLeft size={20} /> : <ChevronsRight size={20} />}
          {isOpen && <span className="ml-2 text-sm">Collapse</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;