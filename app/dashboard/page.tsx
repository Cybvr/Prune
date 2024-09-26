'use client';

import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '@/firebase/firebaseConfig';
import { ClipLoader } from 'react-spinners';
import { DocumentIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

type Document = {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
};

const DashboardPage: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        fetchDocuments(user.uid);
      } else {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

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
      setDocuments(docs.slice(0, 3)); // Display only the first 3 documents
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="p-2 min-h-screen bg-background text-foreground">
      <h1 className="text-2xl font-bold text-foreground">Hi, Welcome back</h1>
      <p className="text-sm text-muted-foreground mb-6">Here's a summary of your recent documents.</p>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader color="#4F46E5" size={50} />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-card">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-card-foreground uppercase tracking-wider">
                  Title
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-card-foreground uppercase tracking-wider">
                  Last Updated
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-card-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-popover divide-y divide-border">
              {documents.map((doc) => (
                <tr key={doc.id}>
                  <td className="px-6 py-4">
                    <Link
                      href={`/dashboard/documents/${doc.id}`}
                      className="text-primary-foreground hover:text-primary-hover flex items-center"
                    >
                      <div className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-500 rounded-full mr-2">
                        <DocumentIcon className="h-4 w-4" />
                      </div>
                      <div className="text-sm font-medium text-foreground">{doc.title}</div>
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-muted-foreground">{formatDate(doc.updatedAt)}</div>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <button className="text-destructive-foreground hover:text-destructive">
                      <TrashIcon className="h-5 w-5 inline" />
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
};

export default DashboardPage;