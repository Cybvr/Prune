'use client'
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebaseConfig';
import DocumentOptions from '@/app/dashboard/components/DocumentOptions';
import Editor from '@/app/dashboard/components/Editor';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import MyDialog from '@/components/ui/MyDialog';
import AIAssistant from '@/app/dashboard/components/AIAssistant'; // Add this line

export default function EditDocumentPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedPriority, setSelectedPriority] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [favorite, setFavorite] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
      const docRef = doc(db, 'documents', docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists() && docSnap.data().userId === uid) {
        const documentData = docSnap.data();
        setTitle(documentData.title);
        setContent(documentData.content);
        setSelectedStatus(documentData.status);
        setSelectedPriority(documentData.priority);
        setStartDate(documentData.start_date ? new Date(documentData.start_date.toDate()) : null);
        setEndDate(documentData.end_date ? new Date(documentData.end_date.toDate()) : null);
        setFavorite(documentData.favorite);
      } else {
        console.error('No document found or unauthorized access');
      }
    } catch (error) {
      console.error('Error fetching document:', error);
    }
  };

  const saveDocument = async (newContent?: string) => {
    if (!userId || !id) {
      console.error('User ID or document ID not available');
      return;
    }
    try {
      setIsSaving(true);
      const docRef = doc(db, 'documents', id);
      await updateDoc(docRef, {
        title,
        content: newContent || content,
        status: selectedStatus,
        priority: selectedPriority,
        start_date: startDate ? startDate.toISOString() : null,
        end_date: endDate ? endDate.toISOString() : null,
        favorite,
        updatedAt: new Date().toISOString(),
      });
      console.log('Document saved successfully');
    } catch (error) {
      console.error('Error saving document:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  const handleGenerateContent = async (description: string) => {
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const newContent = data.content;
      setContent(newContent);
      await saveDocument(newContent);
    } catch (error) {
      console.error('Error generating content:', error);
      throw error; // Re-throw to be caught in MyDialog
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-[100vw] overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center flex-grow">
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
            className="flex-grow text-2xl font-bold outline-none bg-transparent"
            placeholder="Enter document title"
          />
        </div>
        <div className="flex items-center">
          <span className="hidden sm:inline text-sm text-gray-500 mr-4">
            {isSaving ? 'Saving...' : 'All changes saved'}
          </span>
          <Button onClick={() => setIsDialogOpen(true)} className="bg-primary text-primary-foreground hover:bg-primary/90">
            Generate Content
          </Button>
          <Button
            onClick={() => saveDocument()}
            className="bg-primary text-primary-foreground hover:bg-primary/90 ml-2"
          >
            Save
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-grow overflow-auto p-4">
          <div className="max-w-3xl mx-auto">
            <Editor content={content} setContent={handleContentChange} />
          </div>
        </div>
        <div className="lg:w-80 border-l overflow-auto p-4">
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
          <AIAssistant content={content} /> {/* Add this line */}
        </div>
      </div>

      <MyDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        title="Generate Content"
        subtitle="Describe what you want to generate:"
        onSubmit={handleGenerateContent}
      />
    </div>
  );
}