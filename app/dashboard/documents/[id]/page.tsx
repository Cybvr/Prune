'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebaseConfig';
import Editor from '@/app/dashboard/components/Editor';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import debounce from 'lodash/debounce';
import DocumentOptions from '@/app/dashboard/components/DocumentOptions';
import AIAssistant from '@/app/dashboard/components/AIAssistant';
import { Button } from '@/components/ui/button'; // Correct import for Button

export default function EditDocumentPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedPriority, setSelectedPriority] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [favorite, setFavorite] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
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
        setSelectedStatus(documentData.status);
        setSelectedPriority(documentData.priority);
        setStartDate(documentData.startDate ? new Date(documentData.startDate) : null);
        setEndDate(documentData.endDate ? new Date(documentData.endDate) : null);
        setFavorite(documentData.favorite);
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
        status: selectedStatus,
        priority: selectedPriority,
        startDate: startDate ? startDate.toISOString() : null,
        endDate: endDate ? endDate.toISOString() : null,
        favorite,
        updatedAt: new Date().toISOString(),
      });
      router.push('/dashboard/documents');
    } catch (error) {
      console.error('Error saving document:', error);
    } finally {
      setIsSaving(false); // End saving
    }
  }, [userId, id, title, content, selectedStatus, selectedPriority, startDate, endDate, favorite, router]);

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
    <div className="flex flex-col h-screen text-xs">
      <div className="flex items-center p-2 border-b">
        <button 
          onClick={() => router.back()} 
          className="mr-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeftIcon className="h-4 w-4" />
        </button>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          className="flex-grow text-xl font-bold outline-none text-xs"
          placeholder="Enter document title"
        />
        <span className="text-xs text-gray-500 ml-2">
          {isSaving ? 'Saving...' : 'All changes saved'}
        </span>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-grow overflow-auto p-2">
          <Editor content={content} setContent={handleContentChange} />
          <Button
            onClick={saveDocument}
            className="w-full text-xs bg-primary text-primary-foreground hover:bg-primary/90 mt-2"
          >
            Save
          </Button>
        </div>
        <div className="w-1/4 border-l overflow-auto p-2">
          <DocumentOptions
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            selectedPriority={selectedPriority}
            setSelectedPriority={setSelectedPriority}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            favorite={favorite}
            setFavorite={setFavorite}
          />
          <AIAssistant content={content} />
        </div>
      </div>
    </div>
  );
}