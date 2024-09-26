// @app/dashboard/documents/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  collection, query, where, getDocs, deleteDoc, doc,
} from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '@/firebase/firebaseConfig';
import { ClipLoader } from 'react-spinners';
import { Dialog, Transition } from '@headlessui/react';
import {
  DocumentIcon, SparklesIcon, TrashIcon, PencilIcon,
} from '@heroicons/react/24/outline';

type Document = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

const DocumentsPage: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
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
        where('userId', '==', uid),
      );
      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title,
          content: data.content,
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

  const handleDelete = async (docId: string) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      try {
        await deleteDoc(doc(db, 'documents', docId));
        setDocuments(documents.filter((doc) => doc.id !== docId));
      } catch (error) {
        console.error('Error deleting document:', error);
      }
    }
  };

  const formatDate = (date: Date) => date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="p-2 min-h-screen bg-background text-foreground">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Documents</h1>
          <p className="text-sm text-muted-foreground">Create and manage your documents</p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/dashboard/documents/new"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-sm hover:bg-primary-hover transition-colors"
          >
            <DocumentIcon className="inline-block w-5 h-5 mr-2" />
            Blank
          </Link>
          <button
            onClick={() => setIsTemplateModalOpen(true)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-sm hover:bg-primary-hover transition-colors"
          >
            <SparklesIcon className="inline-block w-5 h-5 mr-2" />
            New
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
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-card-foreground uppercase tracking-wider"
                >
                  Title
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-card-foreground uppercase tracking-wider"
                >
                  Content
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-card-foreground uppercase tracking-wider"
                >
                  Last Updated
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-card-foreground uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-popover divide-y divide-border">
              {documents.map((doc) => (
                <tr key={doc.id}>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-card-foreground">{doc.title}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-muted-foreground">{doc.content}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-muted-foreground">{formatDate(doc.updatedAt)}</div>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <Link
                      href={`/dashboard/document/${doc.id}`}
                      className="text-primary-foreground hover:text-primary-hover mr-4"
                    >
                      <PencilIcon className="h-5 w-5 inline" />
                    </Link>
                    <button
                      onClick={() => handleDelete(doc.id)}
                      className="text-destructive-foreground hover:text-destructive"
                    >
                      <TrashIcon className="h-5 w-5 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Transition appear show={isTemplateModalOpen} as={React.Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsTemplateModalOpen(false)}>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-card p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-card-foreground"
                  >
                    Choose a Template
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-muted-foreground">
                      Select a template to start your new document.
                    </p>
                    {/* Add your template selection UI here */}
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-muted px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-muted focus-visible:ring-offset-2"
                      onClick={() => setIsTemplateModalOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default DocumentsPage;