'use client';
import React, { useState, useEffect } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs, doc, updateDoc, writeBatch } from 'firebase/firestore';
import { db } from '@/firebase/firebaseConfig';
import { ClipLoader } from 'react-spinners';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import KanbanColumn from './KanbanColumn';
import { Document, KanbanColumnType } from '@/types/kanban';
import { Toaster } from '@/components/ui/toaster';

const columns: KanbanColumnType[] = [
  { id: 'Backlog', title: 'Backlog' },
  { id: 'Planned', title: 'Planned' },
  { id: 'In Progress', title: 'In Progress' },
  { id: 'Completed', title: 'Completed' },
  { id: 'Canceled', title: 'Canceled' },
];

export default function KanbanBoard() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchDocuments(user.uid);
      } else {
        setIsLoading(false);
        router.push('/auth/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const fetchDocuments = async (uid: string) => {
    try {
      setIsLoading(true);
      const q = query(
        collection(db, 'documents'),
        where('userId', '==', uid)
      );
      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt instanceof Date ? data.createdAt : new Date(data.createdAt),
          updatedAt: data.updatedAt instanceof Date ? data.updatedAt : new Date(data.updatedAt),
        } as Document;
      });
      setDocuments(docs);
    } catch (error) {
      console.error('Error fetching documents:', error);
      toast.error('Error fetching documents.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (ids: string[]) => {
    try {
      const batch = writeBatch(db);
      ids.forEach((id) => {
        const docRef = doc(db, 'documents', id);
        batch.update(docRef, { status: 'Canceled' });
      });
      await batch.commit();

      setDocuments(documents.map(doc => 
        ids.includes(doc.id) ? { ...doc, status: 'Canceled' } : doc
      ));
      setSelectedDocuments([]);
      toast.success(`${ids.length} document(s) deleted.`);
    } catch (error) {
      console.error('Error deleting documents:', error);
      toast.error('Error deleting documents.');
    }
  };

  const handleRename = async (id: string, newTitle: string) => {
    try {
      await updateDoc(doc(db, 'documents', id), { title: newTitle });
      setDocuments(documents.map(doc => 
        doc.id === id ? { ...doc, title: newTitle } : doc
      ));
      toast.success('Document renamed successfully');
    } catch (error) {
      console.error('Error renaming document:', error);
      toast.error('Error renaming document');
    }
  };

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const updatedDocuments = Array.from(documents);
    const documentIndex = updatedDocuments.findIndex(doc => String(doc.id) === draggableId);

    if (documentIndex === -1) {
      console.error(`Document with id ${draggableId} not found`);
      return;
    }

    const [movedDocument] = updatedDocuments.splice(documentIndex, 1);
    const updatedDocument = { ...movedDocument, status: destination.droppableId };

    // Insert the document at the new position
    updatedDocuments.splice(destination.index, 0, updatedDocument);

    setDocuments(updatedDocuments);

    try {
      await updateDoc(doc(db, 'documents', draggableId), {
        status: destination.droppableId,
      });
      toast.success(`Document moved to ${destination.droppableId}`);
    } catch (error) {
      console.error('Error updating document status:', error);
      toast.error('Error updating document status');
      // Revert the state if the database update fails
      setDocuments(documents);
    }
  };

  const toggleSelectDocument = (id: string) => {
    setSelectedDocuments(prev =>
      prev.includes(id) ? prev.filter(docId => docId !== id) : [...prev, id]
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="var(--ring)" size={50} />
      </div>
    );
  }

  return (
    <div className="p-2 min-h-screen bg-background text-foreground">
      <Toaster />
      <header className="p-4 border-b border-border">
        <h1 className="text-2xl font-bold">Board</h1>
        <p className="text-xs text-muted-foreground">Organize your time</p>
      </header>
      <main className="flex flex-1 flex-col p-4 overflow-hidden">
        {selectedDocuments.length > 0 && (
          <div className="mb-4 flex items-center justify-between">
            <span>{selectedDocuments.length} item(s) selected</span>
            <Button onClick={() => handleDelete(selectedDocuments)}>
              Delete Selected
            </Button>
          </div>
        )}
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex overflow-x-auto space-x-4">
            {columns.map((column) => (
              <KanbanColumn
                key={column.id}
                column={column}
                documents={documents.filter((doc) => doc.status === column.id)}
                handleDelete={handleDelete}
                handleRename={handleRename}
                toggleSelectDocument={toggleSelectDocument}
                selectedDocuments={selectedDocuments}
              />
            ))}
          </div>
        </DragDropContext>
      </main>
    </div>
  );
}