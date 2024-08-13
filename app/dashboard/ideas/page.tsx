'use client';

import React from 'react';
import Link from 'next/link';

const ideas = [
  { id: 1, name: 'Brainstorm Ideas for Brew & Beans', content: 'Generate creative ideas to enhance the ambiance, introduce new seasonal drinks, and improve customer engagement at Brew & Beans.', tags: ['Creativity', 'Innovation'] },
  { id: 2, name: 'Menu Redesign', content: 'Revamp the Brew & Beans menu to highlight bestsellers, seasonal specials, and new additions, making it more visually appealing and easier for customers to choose their favorites.', tags: ['Design', 'Menu'] },
  { id: 3, name: 'Customer Loyalty Program', content: 'Develop a customer loyalty program that rewards frequent visitors with discounts, exclusive offers, and a personalized experience to keep them coming back.', tags: ['Loyalty', 'Customer'] },
  { id: 4, name: 'Social Media Campaign', content: 'Plan a social media campaign to showcase Brew & Beans’ unique offerings, engaging content, and promotions to attract new customers and build an online community.', tags: ['Marketing', 'Social Media'] },
  { id: 5, name: 'Local Community Events', content: 'Organize events at Brew & Beans to engage with the local community, such as coffee tasting sessions, live music nights, or book club meetings.', tags: ['Community', 'Events'] },
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
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
        {ideas.map((idea) => (
          <div
            key={idea.id}
            className="bg-white shadow rounded-lg p-6 flex flex-col justify-between h-64 transition-shadow hover:shadow-lg"
          >
            <div>
              <div className="text-lg font-medium text-gray-900">{idea.name}</div>
              <div className="text-sm text-gray-600 mt-3">{idea.content}</div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {idea.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs font-medium px-2.5 py-0.5 rounded"
                  style={{
                    backgroundColor: getTagColor(index),
                    color: getTagTextColor(index),
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getTagColor(index) {
  const colors = ['#E0F7FA', '#FFEBEE', '#E8F5E9', '#FFF3E0', '#F3E5F5'];
  return colors[index % colors.length];
}

function getTagTextColor(index) {
  const darkColors = ['#00796B', '#C62828', '#2E7D32', '#EF6C00', '#6A1B9A'];
  return darkColors[index % darkColors.length];
}
