'use client';
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

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
  const [isOpen, setIsOpen] = useState(false);
  const [newIdea, setNewIdea] = useState({ name: '', content: '', tags: '' });

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

  const handleCreateIdea = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('ideas')
          .insert([
            {
              user_id: user.id,
              name: newIdea.name || 'Untitled',
              content: newIdea.content,
              tags: newIdea.tags,
            }
          ]);
        if (error) throw error;
        fetchIdeas(); // Refresh the ideas list
        setIsOpen(false);
        setNewIdea({ name: '', content: '', tags: '' });
      }
    } catch (error) {
      console.error('Error creating idea:', error);
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
          <button
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            New Idea
          </button>
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

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {
          handleCreateIdea();
          setIsOpen(false);
        }}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    New Idea
                  </Dialog.Title>
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="Title"
                      className="w-full p-2 mb-4 border rounded"
                      value={newIdea.name}
                      onChange={(e) => setNewIdea({ ...newIdea, name: e.target.value })}
                    />
                    <textarea
                      placeholder="Content"
                      className="w-full p-2 mb-4 border rounded"
                      value={newIdea.content}
                      onChange={(e) => setNewIdea({ ...newIdea, content: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="Tags (comma separated)"
                      className="w-full p-2 border rounded"
                      value={newIdea.tags}
                      onChange={(e) => setNewIdea({ ...newIdea, tags: e.target.value })}
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}