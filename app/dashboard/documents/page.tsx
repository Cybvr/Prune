'use client';

import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '@/firebase/firebaseConfig';
import debounce from 'lodash/debounce';
import Link from 'next/link';
import { Toaster, toast } from 'sonner'; 
import { PlusIcon, ListBulletIcon, Squares2X2Icon, DocumentIcon, MagnifyingGlassIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { ClipLoader } from 'react-spinners'; // Importing ClipLoader
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import DocumentsFilter from '@/app/dashboard/documents/DocumentsFilter';
import DocumentsTable from '@/app/dashboard/documents/DocumentsTable';

type Document = {
  id: string;
  title: string;
  status: string;
  priority: string;
  createdAt: Date;
  updatedAt: Date;
};

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [view, setView] = useState<'list' | 'cards'>('list');
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
      const q = query(collection(db, 'documents'), where('userId', '==', uid));
      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
        status: doc.data().status,
        priority: doc.data().priority,
        createdAt: new Date(doc.data().createdAt),
        updatedAt: new Date(doc.data().updatedAt),
      }));
      setDocuments(docs);
    } catch (error) {
      console.error('Error fetching documents:', error);
      toast.error('Error fetching documents.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const deletePromises = selectedDocuments.map((id) => deleteDoc(doc(db, 'documents', id)));
      await Promise.all(deletePromises);
      setDocuments(documents.filter((doc) => !selectedDocuments.includes(doc.id)));
      setSelectedDocuments([]);
      toast.success(`${selectedDocuments.length} documents deleted successfully!`);
    } catch (error) {
      console.error('Error deleting document:', error);
      toast.error('Error deleting document.');
    }
  };

  const toggleSelectDocument = (id: string) => {
    const newSelectedDocuments = selectedDocuments.includes(id)
      ? selectedDocuments.filter((docId) => docId !== id)
      : [...selectedDocuments, id];

    setSelectedDocuments(newSelectedDocuments);

    if (newSelectedDocuments.length > 0) {
      toast(`${newSelectedDocuments.length} document(s) selected`, {
        description: 'Click the delete button to remove selected documents',
        action: {
          label: 'Delete',
          onClick: handleDelete,
        },
      });
    } else {
      toast.dismiss();
    }
  };

  const handleSearchChange = useCallback(
    debounce((value: string) => {
      setSearchTerm(value);
    }, 300),
    []
  );

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const filteredDocuments = documents.filter((doc) =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 min-h-screen bg-background text-foreground">
      <Toaster />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Documents</h1>
          <p className="text-sm text-muted-foreground">Manage your documents</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <DocumentsFilter
          setColumnFilters={setColumnFilters}
          handleSearchChange={handleSearchChange}
          searchTerm={searchTerm}
        />

        <div className="flex items-center space-x-2">
          {/* New document button */}
          <Link
            href="/dashboard/documents/new"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-sm hover:bg-primary/80 transition-colors flex items-center justify-center"
          >
            <PlusIcon className="inline-block w-5 h-5 mr-2" />
            New
          </Link>

          {/* View toggle buttons */}
          <button
            onClick={() => setView('list')}
            className={`p-2 border rounded ${view === 'list' ? 'border-foreground bg-secondary text-secondary-foreground' : 'border-muted bg-muted text-muted-foreground'}`}
          >
            <ListBulletIcon className="h-5 w-5" />
          </button>
          <button
            onClick={() => setView('cards')}
            className={`p-2 border rounded ${view === 'cards' ? 'border-foreground bg-secondary text-secondary-foreground' : 'border-muted bg-muted text-muted-foreground'}`}
          >
            <Squares2X2Icon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <Separator className="my-4" />

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader color="var(--ring)" size={50} />
        </div>
      ) : filteredDocuments.length === 0 ? (
        <div className="text-center text-muted-foreground mt-8">
          No documents found. Create a new one to get started!
        </div>
      ) : view === 'list' ? (
        <DocumentsTable
          documents={filteredDocuments}
          columnFilters={columnFilters}
          sorting={sorting}
          setSorting={setSorting}
          setColumnFilters={setColumnFilters}
          selectedDocuments={selectedDocuments}
          toggleSelectDocument={toggleSelectDocument}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocuments.map((doc) => (
            <div key={doc.id} className="bg-card p-4 rounded shadow hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <DocumentIcon className="h-5 w-5 text-primary mr-2" />
                  <Link href={`/dashboard/documents/${doc.id}`} className="text-sm font-medium text-foreground hover:underline">
                    {doc.title}
                  </Link>
                </div>
                <input
                  type="checkbox"
                  checked={selectedDocuments.includes(doc.id)}
                  onChange={() => toggleSelectDocument(doc.id)}
                  className="text-primary-foreground bg-background border-input"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">{formatDate(doc.updatedAt)}</p>
              <button
                onClick={() => toggleSelectDocument(doc.id)}
                className="text-sm text-destructive hover:underline mt-2"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}