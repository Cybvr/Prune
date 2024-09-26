'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router'; // Import useRouter
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '@/firebase/firebaseConfig';
import { ClipLoader } from 'react-spinners';
import { DocumentIcon, TrashIcon } from '@heroicons/react/24/outline';
import debounce from 'lodash/debounce';
import Link from 'next/link';

type Document = {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
};

const DocumentsPage: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedDocuments, setSelectedDocuments] = useState<Set<string>>(new Set());
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
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
      const docs = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title,
          createdAt: new Date(data.createdAt),
          updatedAt: new Date(data.updatedAt),
        } as Document;
      });
      setDocuments(docs);
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete the selected documents?')) {
      try {
        const deletePromises = Array.from(selectedDocuments).map(docId =>
          deleteDoc(doc(db, 'documents', docId))
        );
        await Promise.all(deletePromises);
        setDocuments(documents.filter(doc => !selectedDocuments.has(doc.id)));
        setSelectedDocuments(new Set());
      } catch (error) {
        console.error('Error deleting documents:', error);
      }
    }
  };

  const handleSearchChange = useCallback(debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, 300), []);

  const filteredDocuments = documents.filter(doc => 
    doc.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCheckboxChange = (docId: string) => {
    setSelectedDocuments((prev) => {
      const updated = new Set(prev);
      if (updated.has(docId)) {
        updated.delete(docId);
      } else {
        updated.add(docId);
      }
      return updated;
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

 return (
    <div className="p-2 min-h-screen bg-background text-foreground">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Documents</h1>
          <p className="text-sm text-muted-foreground">Create and manage your documents</p>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search documents..."
            className="p-2 border border-input rounded"
            onChange={handleSearchChange}
          />
          <Link
            href="/dashboard/documents/new"
            className="px-4 py-2 border border-primary text-primary rounded-sm hover:bg-primary transition-colors"
          >
            <DocumentIcon className="inline-block w-5 h-5 mr-2" />
            Blank
          </Link>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-sm hover:bg-primary-hover transition-colors"
          >
            <TrashIcon className="inline-block w-5 h-5 mr-2" />
            Delete
          </button>
        </div>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader color="var(--ring)" size={50} />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-card">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-card-foreground uppercase tracking-wider">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      if (isChecked) {
                        const allDocIds = documents.map(doc => doc.id);
                        setSelectedDocuments(new Set(allDocIds));
                      } else {
                        setSelectedDocuments(new Set());
                      }
                    }}
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-card-foreground uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-card-foreground uppercase tracking-wider">
                  Last Updated
                </th>
              </tr>
            </thead>
            <tbody className="bg-popover divide-y divide-border">
              {filteredDocuments.map((doc) => (
                <tr key={doc.id} onClick={() => router.push(`/dashboard/documents/${doc.id}`)} className="cursor-pointer">
                  <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedDocuments.has(doc.id)}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleCheckboxChange(doc.id);
                      }}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-primary-foreground flex items-center">
                      <div className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-500 rounded-full mr-2">
                        <DocumentIcon className="h-4 w-4" />
                      </div>
                      <div className="text-sm font-medium text-foreground">{doc.title}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="text-sm text-muted-foreground">{formatDate(doc.updatedAt)}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DocumentsPage;