'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function EditDocumentPage({ params }: { params: { id: string } }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        fetchDocument(user.uid, params.id);
      } else {
        console.error('User not authenticated');
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, [params.id]);

  const fetchDocument = async (uid: string, docId: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('documents')
        .select('title, content')
        .eq('user_id', uid)
        .eq('id', docId)
        .single();

      if (error) throw error;
      if (data) {
        setTitle(data.title);
        setContent(data.content);
      }
    } catch (error) {
      console.error('Error fetching document:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!userId) {
      console.error('User ID not available');
      return;
    }

    try {
      setIsLoading(true);
      const { error } = await supabase
        .from('documents')
        .update({ title, content })
        .eq('user_id', userId)
        .eq('id', params.id);

      if (error) throw error;
      router.push('/dashboard/documents');
    } catch (error) {
      console.error('Error saving document:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Edit Document</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        placeholder="Document Title"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 mb-4 border rounded h-64"
        placeholder="Document Content"
      />
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        disabled={isLoading}
      >
        {isLoading ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  );
}