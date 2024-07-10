import React, { useState } from 'react';
import { X } from 'lucide-react';

const SettingsPopup = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('account');

  console.log('SettingsPopup rendered, isOpen:', isOpen);

  const tabs = [
    { id: 'account', label: 'Account' },
    { id: 'preferences', label: 'Preferences' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'integrations', label: 'Integrations' },
    { id: 'privacy', label: 'Privacy' },
  ];

  const renderContent = () => {
    console.log('Rendering content for tab:', activeTab);

    switch (activeTab) {
      case 'account':
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
            <p>Account settings content goes here.</p>
          </div>
        );
      case 'preferences':
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Preferences</h2>
            <p>Preferences content goes here.</p>
          </div>
        );
      // ... other cases ...
      default:
        return <div>Select a tab</div>;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-3/4 h-3/4 flex">
        <div className="w-1/6 bg-gray-100 p-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`block w-full text-left py-2 px-4 rounded ${
                activeTab === tab.id ? 'bg-indigo-600 text-white' : 'hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="w-5/6 p-6 overflow-y-auto">
          <button onClick={onClose} className="float-right">
            <X size={24} />
          </button>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default SettingsPopup;