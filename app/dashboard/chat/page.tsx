'use client';

import React, { useState, useRef, useEffect } from 'react';
import { PaperAirplaneIcon, DocumentPlusIcon } from '@heroicons/react/24/outline';

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'ai';
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isDocumentOpen, setIsDocumentOpen] = useState(false);
  const [documentContent, setDocumentContent] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() === '') return;

    const newMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInputMessage('');
    updateWordCount(inputMessage);

    // Simulated AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now(),
        text: "This is a simulated AI response. In a real application, this would be the response from your AI model.",
        sender: 'ai',
      };
      setMessages(prevMessages => [...prevMessages, aiResponse]);
      updateWordCount(aiResponse.text);
    }, 1000);
  };

  const handleSaveToDocument = (messageText: string) => {
    setDocumentContent(prevContent => prevContent + '\n\n' + messageText);
    setIsDocumentOpen(true);
  };

  const updateWordCount = (text: string) => {
    const words = text.trim().split(/\s+/).length;
    setWordCount(prevCount => prevCount + words);
  };

  return (
    <div className="flex flex-col h-screen max-w-5xl mx-auto">
      <div className="flex justify-between items-center p-4 border-b">
        <h1 className="text-2xl font-bold">Latest news on AI that writes</h1>
        <div className="flex items-center space-x-2">
          <span className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm">
            {wordCount}/2,000 Words Used ({Math.round((wordCount / 2000) * 100)}%)
          </span>
          <button className="bg-black text-white px-4 py-2 rounded">Create Project</button>
        </div>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(message => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-sm rounded-lg p-3 ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                  {message.text}
                  {message.sender === 'ai' && (
                    <button
                      onClick={() => handleSaveToDocument(message.text)}
                      className="ml-2 text-sm text-gray-500 hover:text-gray-700"
                    >
                      <DocumentPlusIcon className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSendMessage} className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 rounded-full border p-2"
                placeholder="Ask or search anything"
              />
              <button type="submit" className="bg-blue-500 text-white rounded-full p-2">
                <PaperAirplaneIcon className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
        {isDocumentOpen && (
          <div className="w-1/3 border-l p-4">
            <h2 className="text-lg font-semibold mb-4">Document</h2>
            <textarea
              value={documentContent}
              onChange={(e) => setDocumentContent(e.target.value)}
              className="w-full h-full border rounded p-2"
            />
          </div>
        )}
      </div>
    </div>
  );
}