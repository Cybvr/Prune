'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

type Document = {
  id: string;
  title: string;
  created_at: string;
};

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('last_modified');

  useEffect(() => {
    fetchDocuments();
  }, [sortOption]);

  const fetchDocuments = async () => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        let query = supabase
          .from('documents')
          .select('id, title, created_at, updated_at')
          .eq('user_id', user.id);

        if (sortOption === 'last_modified') {
          query = query.order('updated_at', { ascending: false });
        } else if (sortOption === 'alphabetical') {
          query = query.order('title');
        } else if (sortOption === 'recently_added') {
          query = query.order('created_at', { ascending: false });
        }

        const { data, error } = await query;

        if (error) throw error;
        setDocuments(data || []);
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredDocuments = documents.filter(doc =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Documents</h1>
          <p className="mt-2 text-sm text-gray-700">A collection of all your documents.</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            href="/dashboard/chat"
            className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            New Document
          </Link>
        </div>
      </div>
      <div className="mt-6 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6h12M4 10h12m-7 4h7"></path>
            </svg>
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4h4v4H4V4zM4 12h4v4H4v-4zM12 4h4v4h-4V4zM12 12h4v4h-4v-4z"></path>
            </svg>
          </button>
          <select 
            className="p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
            value={sortOption}
            onChange={(e) => {
              setSortOption(e.target.value);
              fetchDocuments();
            }}
          >
            <option value="last_modified">Last modified</option>
            <option value="alphabetical">Alphabetical</option>
            <option value="recently_added">Recently added</option>
          </select>
        </div>
      </div>
      {isLoading ? (
        <div className="mt-6 text-center">Loading documents...</div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              className="bg-white shadow rounded-lg p-6 flex flex-col justify-between h-32 transition-shadow hover:shadow-lg"
            >
              <div className="flex justify-between items-center">
                <div className="text-lg font-medium text-gray-900">{doc.title}</div>
                <button className="text-gray-500 hover:text-gray-700">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 10a2 2 0 114 0 2 2 0 01-4 0zM2 10a2 2 0 114 0 2 2 0 01-4 0zM10 10a2 2 0 114 0 2 2 0 01-4 0z"></path>
                  </svg>
                </button>
              </div>
              <div className="text-sm text-zinc-500 mt-4">
                {new Date(doc.created_at).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}