import React, { useEffect, useState, Fragment } from 'react';
import Link from 'next/link';
import { FolderIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  where,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '@/firebase/firebaseConfig';
import { Menu, Transition } from '@headlessui/react';
import { cn } from '@/lib/utils';

const RecentlyOpened: React.FC<{ sidebarCollapsed: boolean }> = ({ sidebarCollapsed }) => {
  const [recentItems, setRecentItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingDocument, setEditingDocument] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState<string>('');

  useEffect(() => {
    const fetchRecentDocuments = async (uid: string) => {
      try {
        const q = query(
          collection(db, 'documents'),
          where('userId', '==', uid),
          orderBy('updatedAt', 'desc'),
          limit(5)
        );
        const querySnapshot = await getDocs(q);
        const docs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().title,
          href: `/dashboard/documents/${doc.id}`,
          icon: FolderIcon,
        }));
        setRecentItems(docs);
      } catch (error) {
        console.error('Error fetching recent documents:', error);
      } finally {
        setLoading(false);
      }
    };

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchRecentDocuments(user.uid);
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'documents', id));
      setRecentItems((items) => items.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  const handleRename = async (id: string) => {
    if (!newTitle) return;
    try {
      await updateDoc(doc(db, 'documents', id), { title: newTitle });
      setRecentItems((items) =>
        items.map((item) => (item.id === id ? { ...item, name: newTitle } : item))
      );
      setEditingDocument(null);
    } catch (error) {
      console.error('Error renaming document:', error);
    }
  };

  return (
    <div className="mt-4">
      <h3 className={cn("px-2 py-1 text-xs text-muted-foreground font-semibold", sidebarCollapsed ? "hidden" : "block")}>
        Recently Opened
      </h3>
      {loading ? (
        <p>Loading...</p>
      ) : recentItems.length > 0 ? (
        <ul className="space-y-1">
          {recentItems.map((item) => (
            <li key={item.id} className="flex items-center justify-between px-1 py-1 text-md font-normal rounded-md text-foreground hover:bg-secondary hover:text-secondary-foreground">
              {editingDocument === item.id ? (
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  onBlur={() => setEditingDocument(null)}
                  onKeyUp={(e) => e.key === 'Enter' && handleRename(item.id)}
                  className="flex-grow p-1 text-md border border-input rounded-md"
                />
              ) : (
                <Link href={item.href} className="flex items-center space-x-2">
                  <item.icon className="h-4 w-4" />
                  <span className="text-sm truncate" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '18ch' }}>
                    {item.name}
                  </span>
                </Link>
              )}
              <Menu as="div" className="relative">
                <Menu.Button className="p-1">
                  <EllipsisVerticalIcon className="h-4 w-4" />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-48 py-1 bg-background shadow-md ring-1 ring-border ring-opacity-5 rounded-md text-md">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${active ? 'bg-muted' : ''} flex px-4 py-2 w-full text-left`}
                          onClick={() => setEditingDocument(item.id)}
                        >
                          Rename
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${active ? 'bg-muted' : ''} flex px-4 py-2 w-full text-left`}
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-xs">No recently opened documents</p>
      )}
    </div>
  );
};

export default RecentlyOpened;