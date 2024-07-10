import React, { useState } from 'react';
import { Settings, HelpCircle, User, MapPin } from 'lucide-react';
import SettingsPopup from './SettingsPopup';

const Header = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("Bali, Indonesia"); // This would be dynamically set

  return (
    <>
      <header className="bg-white shadow-md p-6 flex justify-between items-center text-text-primary">
        <div className="flex items-center">
          <MapPin size={20} className="mr-2 text-pink-600" />
          <span>{currentLocation}</span>
        </div>
        <div className="flex items-center">
          <button className="mr-4" onClick={() => setIsSettingsOpen(true)}>
            <Settings size={20} />
          </button>
          <button className="mr-4"><User size={20} /></button>
          <button><HelpCircle size={20} /></button>
        </div>
      </header>
      <SettingsPopup isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
};

export default Header;