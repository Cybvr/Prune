import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Star, Trophy, Users, CheckSquare, Menu, HelpCircle, Sun, Moon, Settings, LogOut, FileText } from 'lucide-react';
import { ThemeContext } from '../../contexts/ThemeContext';

const SidebarItem = ({ icon: Icon, text, to, onClick, isOpen }) => {
  const location = useLocation();
  const isActive = to && location.pathname === to;
  return (
    <li>
      {to ? (
        <Link
          to={to}
          className={`flex items-center px-4 py-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg ${
            isActive ? 'bg-gray-200 dark:bg-gray-700' : ''
          }`}
        >
          <Icon size={18} />
          {isOpen && <span className="ml-3">{text}</span>}
        </Link>
      ) : (
        <button
          onClick={onClick}
          className="flex items-center px-4 py-2 w-full text-sm text-left hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
        >
          <Icon size={18} />
          {isOpen && <span className="ml-3">{text}</span>}
        </button>
      )}
    </li>
  );
};

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const [recentNotes] = useState([
    { id: 1, title: "Meeting notes" },
    { id: 2, title: "Project ideas" },
    { id: 3, title: "Travel plans" },
    { id: 4, title: "Shopping list" },
  ]);

  const handleLogout = () => {
    window.location.href = 'http://prune.cc';
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`bg-sidebar-bg dark:bg-gray-800 text-text-primary dark:text-white transition-all duration-300 flex flex-col h-full ${isOpen ? 'w-64' : 'w-20'}`}>
      <div className="flex justify-between items-center p-6">
        <Link to="/" className={`${isOpen ? 'block' : 'hidden'}`}>
          <img src="assets/images/pruneLogoBlack.svg" alt="Prune Logo" className="w-24 dark:invert" />
        </Link>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <Menu size={20} />
        </button>
      </div>
      <nav className="flex-grow flex flex-col justify-between px-4">
        <ul className="space-y-1">
          <SidebarItem icon={Home} text="Home" to="/dashboard" isOpen={isOpen} />
          <SidebarItem icon={CheckSquare} text="Tasks" to="/tasks" isOpen={isOpen} />
          <SidebarItem icon={Star} text="Picks" to="/picks" isOpen={isOpen} />
          <SidebarItem icon={Trophy} text="Challenges" to="/challenges" isOpen={isOpen} />
          <SidebarItem icon={Users} text="Nomad Hub" to="/nomad-hub" isOpen={isOpen} />
        </ul>

        {isOpen && (
          <div className="mt-6 mb-4">
            <h3 className="text-xs font-semibold text-gray-500 mb-2 px-4">Recent Notes</h3>
            <ul className="space-y-1">
              {recentNotes.map((note) => (
                <li key={note.id}>
                  <Link
                    to={`/notes/${note.id}`}
                    className="flex items-center px-4 py-2 text-sm hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
                  >
                    <FileText size={14} className="mr-2" />
                    {note.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-auto mb-6">
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center px-4 py-2 w-full text-sm text-left hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
            >
              <img src="/path-to-avatar.jpg" alt="User Avatar" className="w-6 h-6 rounded-full mr-3" />
              {isOpen && (
                <span className="ml-3">Jide</span>
              )}
            </button>
            {isProfileOpen && isOpen && (
              <ul className="absolute bottom-full left-0 right-0 bg-white dark:bg-gray-700 shadow-lg rounded-lg py-2 mb-2">
                <li>
                  <Link to="/settings" className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600">
                    <Settings size={18} className="mr-2" />
                    Settings
                  </Link>
                </li>
                <li>
                  <Link to="/help" className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600">
                    <HelpCircle size={18} className="mr-2" />
                    Help
                  </Link>
                </li>
                <li>
                  <button onClick={toggleTheme} className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600">
                    {theme === 'light' ? <Moon size={18} className="mr-2" /> : <Sun size={18} className="mr-2" />}
                    {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                  </button>
                </li>
                <li>
                  <button onClick={handleLogout} className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600">
                    <LogOut size={18} className="mr-2" />
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;