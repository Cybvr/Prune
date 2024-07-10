import React, { useState } from 'react';
import { MapPin, Bell, Clock } from 'lucide-react';

const LocationSettings = () => {
  const [showLocalCoworking, setShowLocalCoworking] = useState(true);
  const [notifyNearbyEvents, setNotifyNearbyEvents] = useState(true);
  const [adjustToTimezone, setAdjustToTimezone] = useState(true);

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Location Settings</h1>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <MapPin className="mr-2" size={20} />
            <span>Show local coworking spaces</span>
          </div>
          <label className="switch">
            <input 
              type="checkbox" 
              checked={showLocalCoworking} 
              onChange={() => setShowLocalCoworking(!showLocalCoworking)}
            />
            <span className="slider round"></span>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Bell className="mr-2" size={20} />
            <span>Notify me of nearby digital nomad events</span>
          </div>
          <label className="switch">
            <input 
              type="checkbox" 
              checked={notifyNearbyEvents} 
              onChange={() => setNotifyNearbyEvents(!notifyNearbyEvents)}
            />
            <span className="slider round"></span>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Clock className="mr-2" size={20} />
            <span>Adjust my task schedule to my current time zone</span>
          </div>
          <label className="switch">
            <input 
              type="checkbox" 
              checked={adjustToTimezone} 
              onChange={() => setAdjustToTimezone(!adjustToTimezone)}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>

      <button className="mt-6 w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700">
        Save Settings
      </button>
    </div>
  );
};

export default LocationSettings;