'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebaseConfig';
import Editor from '@/app/dashboard/components/Editor';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import debounce from 'lodash/debounce';

export default function EditDocumentPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false); // Add isSaving state
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();
  const { id } = useParams();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        fetchDocument(user.uid, id);
      } else {
        router.push('/auth/login');
      }
    });
    return () => unsubscribe();
  }, [id, router, auth]);

  const fetchDocument = async (uid: string, docId: string) => {
    try {
      const docRef = doc(collection(db, 'documents'), docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists() && docSnap.data().userId === uid) {
        const documentData = docSnap.data();
        setTitle(documentData.title);
        setContent(documentData.content);
      } else {
        console.error('No document found or unauthorized access');
      }
    } catch (error) {
      console.error('Error fetching document:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveDocument = useCallback(async () => {
    if (!userId) {
      console.error('User ID not available');
      return;
    }
    try {
      setIsSaving(true); // Start saving
      const docRef = doc(collection(db, 'documents'), id);
      await updateDoc(docRef, {
        title,
        content,
        updatedAt: new Date().toISOString()
      });
      router.push('/dashboard/documents');
    } catch (error) {
      console.error('Error saving document:', error);
    } finally {
      setIsSaving(false); // End saving
    }
  }, [userId, id, title, content, router]);

  const debouncedSave = useCallback(debounce(saveDocument, 1000), [saveDocument]);

  useEffect(() => {
    if (title || content) {
      debouncedSave();
    }
  }, [title, content, debouncedSave]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center p-4 border-b">
        <button 
          onClick={() => router.back()} 
          className="mr-4 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          className="flex-grow text-2xl font-bold outline-none"
          placeholder="Enter document title"
        />
        <span className="text-sm text-gray-500">
          {isSaving ? 'Saving...' : 'All changes saved'}
        </span>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-grow overflow-auto">
          <Editor content={content} setContent={handleContentChange} />
        </div>
      </div>
    </div>
  );
}