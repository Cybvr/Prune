'use client';

import React, { useState } from 'react';
import { PaperAirplaneIcon, DocumentTextIcon, ChatBubbleBottomCenterTextIcon, LightBulbIcon, PencilIcon } from '@heroicons/react/24/solid';

const cardOptions = [
  { title: "Summarize a long article", description: "Get key points from lengthy content", icon: DocumentTextIcon, color: "text-purple-500" },
  { title: "Analyze text sentiment", description: "Understand the emotional tone of your writing", icon: ChatBubbleBottomCenterTextIcon, color: "text-blue-500" },
  { title: "Generate content ideas", description: "Get inspiration for your next blog post", icon: LightBulbIcon, color: "text-yellow-500" },
  { title: "Improve your writing style", description: "Get suggestions to enhance your prose", icon: PencilIcon, color: "text-green-500" }
];

const GuideCards: React.FC = () => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Submitted:', inputText);
    setInputText('');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <p className="text-gray-600 mb-6">
        Select a task or type your own request to get started.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {cardOptions.map((option, index) => (
          <div 
            key={index} 
            className="bg-white p-4 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-300 border border-gray-200"
          >
            <option.icon className={`h-8 w-8 ${option.color} mb-2`} />
            <h3 className="font-semibold text-gray-800 mb-1">{option.title}</h3>
            <p className="text-sm text-gray-600">{option.description}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="w-full bg-white text-gray-800 rounded-full px-6 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300"
          placeholder="Type your request here"
        />
        <button 
          type="submit" 
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition-colors duration-300"
        >
          <PaperAirplaneIcon className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
};

export default GuideCards;