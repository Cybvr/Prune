import React, { useState, useContext } from 'react';
import { MapPin, Bell, Plus, ChevronDown, Menu, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

const Header = ({ isMobile, toggleSidebar }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user } = useContext(UserContext);
  const currentLocation = user?.currentLocation || "Unknown Location";

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center">
        <Link to="/" className="flex items-center mr-4">
          <img src="../../assets/images/pruneLogoBlack.svg" alt="Prune" className="h-8 w-auto" />
        </Link>
        {isMobile && (
          <button onClick={toggleSidebar} className="text-gray-600">
            <Menu size={24} />
          </button>
        )}
      </div>

      <div className="flex items-center space-x-4">
        {!isMobile && (
          <>
            <button className="bg-[#be185c] text-white px-3 py-2 rounded-lg flex items-center">
              <Plus size={20} className="mr-2" /> New Task
            </button>

            <div className="flex items-center text-gray-600">
              <MapPin size={18} className="mr-2" />
              <span>{currentLocation}</span>
            </div>
          </>
        )}

        <button className="relative">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            3
          </span>
        </button>

        <button className="relative">
          <Award size={20} />
          <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {user?.achievements || 0}
          </span>
        </button>

        <div className="relative">
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center text-gray-700 focus:outline-none"
          >
            <img src="../../assets/images/avatar.png" alt="Profile" className="h-8 w-8 rounded-full mr-2" />
            <ChevronDown size={16} />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
              <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
              <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</Link>
              <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;