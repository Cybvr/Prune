'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

type Idea = {
  id: number;
  user_id: string;
  name: string;
  content: string;
  tags: string;
  created_at: string;
  updated_at: string;
};

export default function IdeasPage() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchIdeas();
  }, []);

  const fetchIdeas = async () => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('ideas')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        if (error) throw error;
        setIdeas(data || []);
      }
    } catch (error) {
      console.error('Error fetching ideas:', error);
    } finally {
      setIsLoading(false);
    }
  };

  function getTagColor(index: number) {
    const colors = ['#E0F7FA', '#FFEBEE', '#E8F5E9', '#FFF3E0', '#F3E5F5'];
    return colors[index % colors.length];
  }

  function getTagTextColor(index: number) {
    const darkColors = ['#00796B', '#C62828', '#2E7D32', '#EF6C00', '#6A1B9A'];
    return darkColors[index % darkColors.length];
  }

  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Ideas</h1>
          <p className="mt-2 text-sm text-gray-700">A collection of all your innovative ideas.</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link href="/dashboard/ideas/new" className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600">
            New Idea
          </Link>
        </div>
      </div>
      {isLoading ? (
        <div className="mt-6 text-center">Loading ideas...</div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {ideas.map((idea) => (
            <div key={idea.id} className="bg-white shadow rounded-lg p-6 flex flex-col justify-between h-64 transition-shadow hover:shadow-lg">
              <div>
                <div className="text-lg font-medium text-gray-900">{idea.name}</div>
                <div className="text-sm text-gray-600 mt-3">{idea.content}</div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {idea.tags.split(',').map((tag, index) => (
                  <span key={index} className="text-xs font-medium px-2.5 py-0.5 rounded" style={{ backgroundColor: getTagColor(index), color: getTagTextColor(index) }}>
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}