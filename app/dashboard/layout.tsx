'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { 
  HomeIcon,
  DocumentTextIcon,
  LightBulbIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import Image from 'next/image';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'My Ideas', href: '/dashboard/ideas', icon: LightBulbIcon },
  { name: 'Documents', href: '/dashboard/documents', icon: DocumentTextIcon },
  { name: 'Chat', href: '/dashboard/chat', icon: ChatBubbleLeftEllipsisIcon },
];

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex h-screen">
      {/* Mobile and small screen header */}
      <div className="lg:hidden fixed inset-x-0 top-0 z-40 flex items-center justify-between bg-white dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700 px-4 py-2">
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={100}
          height={30}
          className="h-8 w-auto"
        />
        <button
          type="button"
          className="text-gray-500 focus:outline-none"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-0 lg:inset-y-0 lg:flex lg:w-64 transition-transform transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 bg-white dark:bg-zinc-800 z-30`}>
        <div className="flex-1 flex flex-col">
          {/* Sidebar content */}
          <div className="flex items-center justify-between p-4 border-b dark:border-zinc-700">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={120}
              height={40}
              className="h-7 w-auto hidden lg:block"
            />
            <button 
              className="lg:hidden text-gray-500"
              onClick={() => setSidebarOpen(false)}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-2 py-2 text-sm font-medium rounded-md ${pathname === item.href ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
              >
                <item.icon className="mr-3 h-6 w-6" aria-hidden="true" />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="flex-shrink-0 p-4 border-t border-gray-200 dark:border-zinc-700">
            <Link
              href="/dashboard/settings"
              className="flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <Cog6ToothIcon className="mr-3 h-6 w-6" aria-hidden="true" />
              Settings
            </Link>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
