// app/dashboard/ideas/page.tsx
'use client';

import React from 'react';
import { LightBulbIcon, PencilIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const ideas = [
  { id: 1, name: 'New Product Idea', category: 'Product', created: '2023-06-15', lastEdited: '2023-06-16' },
  { id: 2, name: 'Marketing Strategy', category: 'Marketing', created: '2023-06-14', lastEdited: '2023-06-14' },
  { id: 3, name: 'App Feature', category: 'Development', created: '2023-06-13', lastEdited: '2023-06-15' },
  { id: 4, name: 'Customer Feedback Analysis', category: 'Research', created: '2023-06-12', lastEdited: '2023-06-13' },
  { id: 5, name: 'Team Building Event', category: 'HR', created: '2023-06-11', lastEdited: '2023-06-12' },
];

export default function IdeasPage() {
  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-base font-semibold leading-6 text-gray-900">Ideas</h1>
          <p className="mt-2 text-sm text-gray-700">A collection of all your innovative ideas.</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            href="/dashboard/chat"
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <LightBulbIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            Create New Idea
          </Link>
        </div>
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ideas.map((idea) => (
          <div key={idea.id} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <LightBulbIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="truncate text-sm font-medium text-gray-500">{idea.name}</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{idea.category}</div>
                    </dd>
                  </dl>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <PencilIcon className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-500" aria-hidden="true" />
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <div className="font-medium text-gray-700">
                  Created: <time dateTime={idea.created}>{idea.created}</time>
                </div>
                <div className="mt-1 font-medium text-gray-700">
                  Last edited: <time dateTime={idea.lastEdited}>{idea.lastEdited}</time>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}