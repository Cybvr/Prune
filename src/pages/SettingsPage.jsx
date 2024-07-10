import React, { useState } from 'react';
import { User, Bell, Lock, Globe, Mail, Key, Image, Moon, Sun, Bell as BellIcon, BellOff, Eye, EyeOff } from 'lucide-react';

const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [visibility, setVisibility] = useState('public');

  return (
    <div className="p-12 md:p-12 space-y-8">
      <h1 className="text-2xl md:text-3xl font-bold">Settings</h1>

      {/* Profile Settings */}
      <section>
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <User className="mr-2" /> Profile Settings
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                <Mail size={18} />
              </span>
              <input type="email" className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-pink-500 focus:border-pink-500" placeholder="you@example.com" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <button className="mt-1 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
              <Key className="mr-2" size={18} /> Change Password
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
            <div className="mt-1 flex items-center">
              <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                <Image className="h-full w-full text-gray-300" />
              </span>
              <button className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
                Change
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Notification Preferences */}
      <section>
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Bell className="mr-2" /> Notification Preferences
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="flex-grow flex flex-col">
              <span className="text-sm font-medium text-gray-900">Enable Notifications</span>
              <span className="text-sm text-gray-500">Receive notifications about your tasks and challenges</span>
            </span>
            <button 
              onClick={() => setNotifications(!notifications)}
              className={`${notifications ? 'bg-pink-600' : 'bg-gray-200'} relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500`}
            >
              <span className={`${notifications ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}></span>
            </button>
          </div>
          {notifications && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Notification Frequency</label>
              <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm rounded-md">
                <option>Immediately</option>
                <option>Daily Digest</option>
                <option>Weekly Digest</option>
              </select>
            </div>
          )}
        </div>
      </section>

      {/* Privacy & Security Settings */}
      <section>
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Lock className="mr-2" /> Privacy & Security Settings
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Profile Visibility</label>
            <select 
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm rounded-md"
            >
              <option value="public">Public</option>
              <option value="friends">Friends Only</option>
              <option value="private">Private</option>
            </select>
          </div>
          <div className="flex items-center">
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
              <Key className="mr-2" size={18} /> Enable Two-Factor Authentication
            </button>
          </div>
        </div>
      </section>

      {/* App Preferences */}
      <section>
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Globe className="mr-2" /> App Preferences
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="flex-grow flex flex-col">
              <span className="text-sm font-medium text-gray-900">Dark Mode</span>
              <span className="text-sm text-gray-500">Use dark theme for the app</span>
            </span>
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`${darkMode ? 'bg-pink-600' : 'bg-gray-200'} relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500`}
            >
              <span className={`${darkMode ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}>
                {darkMode ? <Moon size={14} className="text-pink-600 m-0.5" /> : <Sun size={14} className="text-yellow-400 m-0.5" />}
              </span>
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Language</label>
            <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm rounded-md">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              {/* Add more language options as needed */}
            </select>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SettingsPage;