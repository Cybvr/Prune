'use client';

import React from 'react';
import Link from 'next/link';

const ideas = [
  { id: 1, name: 'Brainstorm Ideas for Brew & Beans', timestamp: 'Yesterday at 8:09 PM' },
  { id: 2, name: 'Menu Redesign', timestamp: 'Today at 10:15 AM' },
  { id: 3, name: 'Customer Loyalty Program', timestamp: 'August 10 at 3:45 PM' },
  { id: 4, name: 'Social Media Campaign', timestamp: 'August 9 at 6:30 PM' },
  { id: 5, name: 'Local Community Events', timestamp: 'August 8 at 12:20 PM' },
];

export default function IdeasPage() {
  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Ideas</h1>
          <p className="mt-2 text-sm text-gray-700">A collection of all your innovative ideas.</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            href="/dashboard/chat"
            className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            New Idea
          </Link>
        </div>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search"
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
          <select className="p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600">
            <option>Last modified</option>
            <option>Alphabetical</option>
            <option>Most popular</option>
            <option>Recently added</option>
          </select>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ideas.map((idea) => (
          <div
            key={idea.id}
            className="bg-white shadow rounded-lg p-6 flex flex-col justify-between h-32 transition-shadow hover:shadow-lg"
          >
            <div className="flex justify-between items-center">
              <div className="text-lg font-medium text-gray-900">{idea.name}</div>
              <button className="text-gray-500 hover:text-gray-700">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 10a2 2 0 114 0 2 2 0 01-4 0zM2 10a2 2 0 114 0 2 2 0 01-4 0zM10 10a2 2 0 114 0 2 2 0 01-4 0z"></path>
                </svg>
              </button>
            </div>
            <div className="text-sm text-zinc-500 mt-4">{idea.timestamp}</div>
          </div>
        ))}
      </div>
    </div>
  );
}