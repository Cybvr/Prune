'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Editor } from '@tinymce/tinymce-react';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// TinyMCE API Key
const tinyApiKey = process.env.NEXT_PUBLIC_TINY_API_KEY;

export default function EditDocumentPage({ params }: { params: { id: string } }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();
  const editorRef = useRef(null);

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
    // ... (keep this function as is)
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
        .update({ title, content: editorRef.current.getContent() })
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
      <Editor
        apiKey={tinyApiKey}
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue={content}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar: 'undo redo | formatselect | ' +
          'bold italic backcolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
        disabled={isLoading}
      >
        {isLoading ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  );
}