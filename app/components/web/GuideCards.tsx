'use client';

import React, { useState, useEffect, useRef } from 'react';
import { PaperAirplaneIcon, DocumentTextIcon, ChatBubbleBottomCenterTextIcon, LightBulbIcon, PencilIcon } from '@heroicons/react/24/solid';

const cardOptions = [
  { title: "Summarize a long article", description: "Get key points from lengthy content", icon: DocumentTextIcon },
  { title: "Analyze text sentiment", description: "Understand the emotional tone of your writing", icon: ChatBubbleBottomCenterTextIcon },
  { title: "Generate content ideas", description: "Get inspiration for your next blog post", icon: LightBulbIcon },
  { title: "Improve your writing style", description: "Get suggestions to enhance your prose", icon: PencilIcon }
];

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const GuideCards: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() === '') return;

    const newUserMessage: Message = { role: 'user', content: inputText };
    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setInputText('');
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: inputText }),
      });

      const data = await response.json();

      if (!response.ok || !data.content) {
        const errorMessage = data.error || 'Failed to generate content';
        throw new Error(errorMessage);
      }

      const aiResponse: Message = { role: 'assistant', content: data.content };
      setMessages(prevMessages => [...prevMessages, aiResponse]);
    } catch (error) {
      console.error('Error generating content:', error.message);
      const errorMessage: Message = { role: 'assistant', content: `Sorry, I encountered an error processing your request: ${error.message}` };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardClick = (title: string) => {
    setInputText(title);
  };

  return (
    <div className="bg-gray-100 text-gray-800 py-12 px-4 sm:px-6 lg:px-8 relative min-h-[600px]">
      <div className="max-w-4xl mx-auto">
        <p className="text-center mb-12 text-gray-600">
          Select a task or type your own request to get started.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {cardOptions.map((option, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors duration-300 border border-gray-300 shadow-sm flex items-start"
              onClick={() => handleCardClick(option.title)}
            >
              <option.icon className="h-8 w-8 text-blue-500 mr-4 flex-shrink-0" />
              <div className="text-left">  {/* Ensures text is left-aligned */}
                <h3 className="font-semibold mb-2 text-gray-800">{option.title}</h3>
                <p className="text-sm text-gray-600">{option.description}</p>
              </div>
            </div>
          ))}
        </div>

        {messages.length > 0 && (
          <div className="bg-white rounded-xl p-6 mb-6 h-64 overflow-y-auto border border-gray-300 shadow-sm"> {/* Changed mb-24 to mb-6 */}
            {messages.map((message, index) => (
              <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block p-3 rounded-lg max-w-[80%] ${
                  message.role === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-800'
                }`}>
                  {message.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}

        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}

        <form onSubmit={handleSubmit} className="absolute bottom-0 left-0 right-0 bg-gray-100 p-4">
          <div className="max-w-4xl mx-auto relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full bg-white text-gray-800 rounded-full px-6 py-4 pr-16 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300"
              placeholder="Type your request here"
              disabled={isLoading}
            />
            <button 
              type="submit" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white rounded-full p-3 hover:bg-blue-600 transition-colors duration-300 disabled:bg-blue-300 disabled:text-gray-100"
              disabled={isLoading}
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <PaperAirplaneIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GuideCards;
