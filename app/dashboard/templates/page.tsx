'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '@/firebase/firebaseConfig';
import { ClipLoader } from 'react-spinners';
import { DocumentIcon, TrashIcon, SpeakerphoneIcon } from '@heroicons/react/24/outline';
import debounce from 'lodash/debounce';
import Link from 'next/link';

type Template = {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
};

const TemplatesPage: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedTemplates, setSelectedTemplates] = useState<Set<string>>(new Set());
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        fetchTemplates(user.uid);
      } else {
        setIsLoading(false);
        router.push('/auth/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const fetchTemplates = async (uid: string) => {
    try {
      setIsLoading(true);
      const q = query(
        collection(db, 'templates'),
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
        } as Template;
      });
      setTemplates(docs);
    } catch (error) {
      console.error('Error fetching templates:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete the selected templates?')) {
      try {
        const deletePromises = Array.from(selectedTemplates).map(docId =>
          deleteDoc(doc(db, 'templates', docId))
        );
        await Promise.all(deletePromises);
        setTemplates(templates.filter(doc => !selectedTemplates.has(doc.id)));
        setSelectedTemplates(new Set());
      } catch (error) {
        console.error('Error deleting templates:', error);
      }
    }
  };

  const handleSearchChange = useCallback(debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, 300), []);

  const filteredTemplates = templates.filter(doc => 
    doc.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCheckboxChange = (docId: string) => {
    setSelectedTemplates((prev) => {
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
          <h1 className="text-2xl font-bold">Templates</h1>
          <p className="text-sm text-muted-foreground">Create and manage your templates</p>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search templates..."
            className="p-2 border border-input rounded"
            onChange={handleSearchChange}
          />
          <Link
            href="/dashboard/templates/new"
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
                        const allDocIds = templates.map(doc => doc.id);
                        setSelectedTemplates(new Set(allDocIds));
                      } else {
                        setSelectedTemplates(new Set());
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
              {filteredTemplates.map((doc) => (
                <tr key={doc.id} onClick={() => router.push(`/dashboard/templates/${doc.id}`)} className="cursor-pointer">
                  <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedTemplates.has(doc.id)}
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

export default TemplatesPage;