'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '@/firebase/firebaseConfig';
import { ClipLoader } from 'react-spinners';
import { DocumentIcon, TrashIcon, PlusIcon, XCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import debounce from 'lodash/debounce';
import Link from 'next/link';
import { Toaster, toast } from 'sonner'; // Using sonner for toasts
import { Button } from '@/components/ui/button';

type Document = {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
};

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
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
      const docs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
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

  const filteredDocuments = documents.filter((doc) =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase())
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

  return (
    <div className="p-4 min-h-screen bg-background text-foreground">
      <Toaster />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Documents</h1>
          <p className="text-sm text-muted-foreground">Manage your documents</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search documents..."
              className="w-full pl-10 pr-4 py-2 border border-input rounded"
              onChange={(e) => handleSearchChange(e.target.value)}
              value={searchTerm}
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  handleSearchChange('');
                }}
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <XCircleIcon className="h-5 w-5 text-muted-foreground" />
              </button>
            )}
          </div>
          <Link
            href="/dashboard/documents/new"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-sm hover:bg-primary/90 transition-colors flex items-center justify-center"
          >
            <PlusIcon className="inline-block w-5 h-5 mr-2" />
            New Document
          </Link>
        </div>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader color="var(--ring)" size={50} />
        </div>
      ) : filteredDocuments.length === 0 ? (
        <div className="text-center text-muted-foreground mt-8">
          No documents found. Create a new one to get started!
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-card">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-card-foreground uppercase tracking-wider">
                  <input
                    type="checkbox"
                    checked={selectedDocuments.length === filteredDocuments.length}
                    onChange={(e) =>
                      setSelectedDocuments(e.target.checked ? filteredDocuments.map((doc) => doc.id) : [])
                    }
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-card-foreground uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-card-foreground uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-card-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-popover divide-y divide-border">
              {filteredDocuments.map((doc) => (
                <tr key={doc.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedDocuments.includes(doc.id)}
                      onChange={() => toggleSelectDocument(doc.id)}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <DocumentIcon className="h-5 w-5 text-primary mr-2" />
                      <Link href={`/dashboard/documents/${doc.id}`} className="text-sm font-medium text-foreground">
                        {doc.title}
                      </Link>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm text-muted-foreground">{formatDate(doc.updatedAt)}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => toggleSelectDocument(doc.id)}
                      className="text-sm text-destructive hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}