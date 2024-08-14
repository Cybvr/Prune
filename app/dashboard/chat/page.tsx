'use client';

import { useState, useRef, useEffect } from 'react';
import { PaperAirplaneIcon, DocumentPlusIcon, PencilIcon, ListBulletIcon, HashtagIcon, CodeBracketIcon, BoldIcon, ItalicIcon, UnderlineIcon, LinkIcon, ChatBubbleBottomCenterTextIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'ai';
};

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Is there anything i can help you with?",
      sender: 'ai'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isDocumentOpen, setIsDocumentOpen] = useState(true);
  const [documentContent, setDocumentContent] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [documentTitle, setDocumentTitle] = useState('Untitled Document');
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        console.error('User not authenticated');
        // You might want to redirect to a login page here
        // router.push('/login');
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() === '') return;

    const newMessage: Message = { id: Date.now(), text: inputMessage, sender: 'user' };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInputMessage('');

    try {
      setLoading(true);
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'chat', message: inputMessage }),
      });

      if (!response.ok) throw new Error('Failed to get AI response');

      const data = await response.json();
      const aiResponse: Message = { id: Date.now(), text: data.response, sender: 'ai' };
      setMessages(prevMessages => [...prevMessages, aiResponse]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      // TODO: Show error message to the user
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToDocument = (messageText: string) => {
    setDocumentContent(prevContent => prevContent + '\n\n' + messageText);
    updateWordCount(documentContent + '\n\n' + messageText);
  };

  const updateWordCount = (text: string) => {
    const words = text.trim().split(/\s+/).length;
    setWordCount(words);
  };

  const handleSaveDocument = async () => {
    if (!userId) {
      console.error('User ID not available');
      return;
    }

    try {
      setLoading(true);

      const { data: existingDocs, error: fetchError } = await supabase
        .from('documents')
        .select('id')
        .eq('user_id', userId)
        .eq('title', documentTitle);

      if (fetchError) throw fetchError;

      let result;
      if (existingDocs && existingDocs.length > 0) {
        result = await supabase
          .from('documents')
          .update({ 
            content: documentContent, 
            updated_at: new Date().toISOString() 
          })
          .eq('id', existingDocs[0].id);
      } else {
        result = await supabase
          .from('documents')
          .insert({
            user_id: userId,
            title: documentTitle,
            content: documentContent,
          });
      }

      if (result.error) throw result.error;

      console.log('Document saved:', result.data);
      router.push('/dashboard/documents');
    } catch (error) {
      console.error('Error saving document:', error);
      // TODO: Show error message to the user
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-7xl mx-auto bg-gray-50">
      <div className="flex justify-between items-center p-4 bg-white shadow-sm">
        <input
          className="text-2xl font-bold focus:outline-none border-b-2 border-transparent focus:border-zinc-800 transition-colors duration-300"
          value={documentTitle}
          onChange={(e) => setDocumentTitle(e.target.value)}
          placeholder="Enter document title"
        />
        <div className="flex items-center space-x-2">
          <span className="bg-zinc-100 text-zinc-800 px-3 py-1 rounded-full text-sm font-medium">
            {wordCount}/2,000 Words Used ({Math.round((wordCount / 2000) * 100)}%)
          </span>
        </div>
      </div>
      <div className="flex flex-1 overflow-hidden">
        {isDocumentOpen && (
          <div className="flex-1 border-r border-gray-200 bg-white p-4 flex flex-col">
            <div className="flex mb-4 space-x-2 overflow-x-auto pb-2">
              <button className="bg-gray-100 text-gray-700 p-2 rounded hover:bg-gray-200 transition-colors duration-300"><BoldIcon className="h-4 w-4" /></button>
              <button className="bg-gray-100 text-gray-700 p-2 rounded hover:bg-gray-200 transition-colors duration-300"><ItalicIcon className="h-4 w-4" /></button>
              <button className="bg-gray-100 text-gray-700 p-2 rounded hover:bg-gray-200 transition-colors duration-300"><UnderlineIcon className="h-4 w-4" /></button>
              <button className="bg-gray-100 text-gray-700 p-2 rounded hover:bg-gray-200 transition-colors duration-300"><LinkIcon className="h-4 w-4" /></button>
              <button className="bg-gray-100 text-gray-700 p-2 rounded hover:bg-gray-200 transition-colors duration-300"><ChatBubbleBottomCenterTextIcon className="h-4 w-4" /></button>
              <button className="bg-gray-100 text-gray-700 p-2 rounded hover:bg-gray-200 transition-colors duration-300"><PhotoIcon className="h-4 w-4" /></button>
              <button className="bg-gray-100 text-gray-700 p-2 rounded hover:bg-gray-200 transition-colors duration-300"><ListBulletIcon className="h-4 w-4" /></button>
              <button className="bg-gray-100 text-gray-700 p-2 rounded hover:bg-gray-200 transition-colors duration-300"><HashtagIcon className="h-4 w-4" /></button>
              <button className="bg-gray-100 text-gray-700 p-2 rounded hover:bg-gray-200 transition-colors duration-300"><CodeBracketIcon className="h-4 w-4" /></button>
            </div>
            <textarea
              value={documentContent}
              onChange={(e) => {
                setDocumentContent(e.target.value);
                updateWordCount(e.target.value);
              }}
              className="w-full flex-1 border rounded p-2 resize-none overflow-y-auto focus:outline-none focus:ring-2 focus:ring-zinc-800"
              placeholder="What would you like to write about? Share your thoughts here..."
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={handleSaveDocument}
                className="bg-zinc-800 text-white px-4 py-2 rounded hover:bg-zinc-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-zinc-800 focus:ring-offset-2"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        )}
        <div className="w-1/3 flex flex-col relative bg-white">
          <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
            {messages.map(message => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-lg p-3 ${message.sender === 'user' ? 'bg-zinc-800 text-white' : 'bg-gray-100'}`}>
                  {message.text}
                  {message.sender === 'ai' && (
                    <button
                      onClick={() => handleSaveToDocument(message.text)}
                      className="ml-2 text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      <DocumentPlusIcon className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSendMessage} className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-zinc-800"
                placeholder="Start typing here..."
              />
              <button type="submit" className="bg-zinc-800 text-white rounded-full p-2 hover:bg-zinc-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-zinc-800 focus:ring-offset-2" disabled={loading}>
                <PaperAirplaneIcon className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}