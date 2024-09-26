'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '@/firebase/firebaseConfig';
import Editor from '@/app/dashboard/components/Editor';
import AIAssistant from '@/app/dashboard/components/AIAssistant';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import debounce from 'lodash/debounce';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DocumentOptions from '@/app/dashboard/components/DocumentOptions';

const statuses = ["Backlog", "Planned", "In Progress", "Completed", "Canceled"];
const priorities = ["No Priority", "Low", "Medium", "High", "Urgent"];

export default function NewDocumentPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const [documentId, setDocumentId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(statuses[0]);
  const [selectedPriority, setSelectedPriority] = useState<string | null>(priorities[0]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [favorite, setFavorite] = useState<boolean>(false);
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        router.push('/auth/login');
      }
    });

    return () => unsubscribe();
  }, [auth, router]);

  const saveDocument = useCallback(async () => {
    if (!userId) {
      console.error('User not authenticated');
      return;
    }

    setIsSaving(true);
    try {
      if (documentId) {
        // Update existing document
        await updateDoc(doc(db, 'documents', documentId), {
          title,
          content,
          updatedAt: new Date().toISOString(),
          status: selectedStatus,
          priority: selectedPriority,
          startDate: startDate ? startDate.toISOString() : null,
          endDate: endDate ? endDate.toISOString() : null,
          favorite,
        });
      } else {
        // Create new document
        const docRef = await addDoc(collection(db, 'documents'), {
          title,
          content,
          userId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          status: selectedStatus,
          priority: selectedPriority,
          startDate: startDate ? startDate.toISOString() : null,
          endDate: endDate ? endDate.toISOString() : null,
          favorite
        });
        setDocumentId(docRef.id);
      }
      console.log('Document saved successfully');
    } catch (error) {
      console.error('Error saving document:', error);
    } finally {
      setIsSaving(false);
    }
  }, [userId, documentId, title, content, selectedStatus, selectedPriority, startDate, endDate, favorite]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

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
        <div className="w-1/4 border-l overflow-auto">
          <div className="p-4">
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
            <Button
              onClick={saveDocument}
              className="w-full text-sm bg-primary text-primary-foreground hover:bg-primary/90 mt-4"
            >
              Save
            </Button>
          </div>

          <AIAssistant content={content} />
        </div>
      </div>
    </div>
  );
}