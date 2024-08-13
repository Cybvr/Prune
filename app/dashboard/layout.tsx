'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { 
  HomeIcon,
  DocumentTextIcon,
  LightBulbIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ArrowRightOnRectangleIcon,
  MoonIcon
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import Image from 'next/image';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'My Ideas', href: '/dashboard/ideas', icon: LightBulbIcon },
  { name: 'Documents', href: '/dashboard/documents', icon: DocumentTextIcon },
  { name: 'Chat', href: '/dashboard/chat', icon: ChatBubbleLeftEllipsisIcon }
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
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

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Add logic here to actually change the theme
  };

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logging out...');
  };

  return (
    <div className={`flex h-screen overflow-hidden ${isDarkMode ? 'dark' : ''}`}>
      {/* Mobile sidebar */}
      <div className="lg:hidden">
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 flex">
            <div className="fixed inset-0 bg-gray-900 bg-opacity-100" aria-hidden="true" onClick={() => setSidebarOpen(false)}></div>
            <div className="relative flex w-full max-w-xs flex-1 flex-col bg-zinc-50 dark:bg-zinc-800">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
              {/* Mobile sidebar content */}
              <div className="flex-1 flex flex-col overflow-y-auto">
                <nav className="flex-1 px-2 py-4 space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        pathname === item.href ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100',
                        'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                      )}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <item.icon className="mr-4 flex-shrink-0 h-6 w-6" aria-hidden="true" />
                      {item.name}
                    </Link>
                  ))}
                </nav>
                <div className="flex-shrink-0 flex border-t border-gray-200 dark:border-gray-700 p-4">
                  <Link
                    href="/dashboard/settings"
                    className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Cog6ToothIcon className="mr-4 flex-shrink-0 h-6 w-6" aria-hidden="true" />
                    Settings
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Static sidebar for desktop */}
      <div className={classNames(
        isCollapsed ? 'lg:w-16' : 'lg:w-56',
        'hidden lg:fixed lg:inset-y-0 lg:flex lg:flex-col transition-all duration-300'
      )}>
        <div className="flex flex-col h-full bg-white dark:bg-zinc-800 border-r">
          {/* Sidebar content */}
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              {!isCollapsed && (
                <Image
                  src="/images/logo.png"
                  alt="Logo"
                  width={150}
                  height={40}
                  className="h-7 w-auto"
                />
              )}
              <button 
                onClick={() => setIsCollapsed(!isCollapsed)} 
                className={`${isCollapsed ? 'mx-auto' : 'ml-auto'} p-1 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700`}
              >
                {isCollapsed ? (
                  <ChevronDoubleRightIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" aria-hidden="true" />
                ) : (
                  <ChevronDoubleLeftIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" aria-hidden="true" />
                )}
              </button>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    pathname === item.href ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100',
                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                  )}
                >
                  <item.icon className={`flex-shrink-0 h-6 w-6 ${isCollapsed ? 'mx-auto' : 'mr-3'}`} aria-hidden="true" />
                  {!isCollapsed && item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex flex-col border-t border-gray-200 dark:border-gray-700">
            <Link
              href="/dashboard/settings"
              className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
            >
              <Cog6ToothIcon className={`flex-shrink-0 h-6 w-6 ${isCollapsed ? 'mx-auto' : 'mr-3'}`} aria-hidden="true" />
              {!isCollapsed && 'Settings'}
            </Link>
            {/* User profile */}
            <div className="relative p-4">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center w-full text-left"
              >
                <Image
                  className="inline-block h-9 w-9 rounded-full"
                  src="/path-to-your-avatar-image.jpg"
                  alt=""
                  width={36}
                  height={36}
                />
                {!isCollapsed && (
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">John Doe</p>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">john@example.com</p>
                  </div>
                )}
              </button>
              {isUserMenuOpen && (
                <div className={`absolute ${isCollapsed ? 'left-full ml-2' : 'bottom-full left-0 mb-2'} w-48 rounded-md shadow-lg py-1 bg-white dark:bg-zinc-700 ring-1 ring-black ring-opacity-5 focus:outline-none`}>
                  <button
                    onClick={toggleDarkMode}
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-600 w-full text-left"
                  >
                    <MoonIcon className="mr-3 inline-block h-5 w-5" aria-hidden="true" />
                    Dark Mode
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-600 w-full text-left"
                  >
                    <ArrowRightOnRectangleIcon className="mr-3 inline-block h-5 w-5" aria-hidden="true" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={`flex-1 flex flex-col overflow-hidden ${isCollapsed ? 'lg:ml-16' : 'lg:ml-56'}`}>
        {/* Page content */}
        <main className="flex-1 overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {/* Mobile menu button */}
              <button
                type="button"
                className="lg:hidden px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}