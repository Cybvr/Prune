'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Dialog, Transition } from '@headlessui/react';
import { 
  XMarkIcon, 
  HomeIcon, 
  DocumentIcon, 
  UserGroupIcon, 
  ChevronLeftIcon, 
  ChevronRightIcon,
  Bars3Icon,
  QuestionMarkCircleIcon,
  MoonIcon,
  SunIcon,
  DocumentDuplicateIcon,  // Import a different icon
} from '@heroicons/react/24/outline';
import { cn } from "@/lib/utils";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const menuItems = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  { name: 'Documents', href: '/dashboard/documents', icon: DocumentIcon },
  { name: 'Coach', href: '/dashboard/coach', icon: UserGroupIcon },
  { name: 'Templates', href: '/dashboard/templates', icon: DocumentDuplicateIcon },  // Use a different icon
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    setMounted(true);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push('/auth/login');
      }
    });

    return () => unsubscribe();
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const SidebarContent = () => (
    <>
      <div className="flex h-16 items-center justify-between">
        <div className={cn(
          "transition-all duration-300 ease-in-out overflow-hidden",
          sidebarCollapsed ? "w-0" : "w-auto"
        )}>
          <Image
            src="/images/logo-white.svg"
            alt="Logo"
            width={100}
            height={30}
            className="h-8 w-auto"
          />
        </div>
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="p-2 text-blue-200 hover:bg-blue-600 hover:text-white rounded-md lg:block hidden"
        >
          {sidebarCollapsed ? (
            <ChevronRightIcon className="h-4 w-4" />
          ) : (
            <ChevronLeftIcon className="h-4 w-4" />
          )}
        </button>
      </div>
      <nav className="mt-5 flex flex-col gap-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-x-3 rounded-md p-2 text-sm font-medium leading-6 text-blue-200 hover:bg-blue-600 hover:text-white"
          >
            <item.icon className="h-4 w-4 shrink-0" />
            <span className={cn(
              "transition-all duration-300 ease-in-out overflow-hidden",
              sidebarCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
            )}>
              {item.name}
            </span>
          </Link>
        ))}
      </nav>
      <div className="mt-auto">
        <button
          onClick={toggleTheme}
          className="flex w-full items-center gap-x-3 rounded-md p-2 text-sm font-medium leading-6 text-blue-200 hover:bg-blue-600 hover:text-white"
        >
          {mounted && theme === 'dark' ? (
            <SunIcon className="h-4 w-4 shrink-0" />
          ) : (
            <MoonIcon className="h-4 w-4 shrink-0" />
          )}
          <span className={cn(
            "transition-all duration-300 ease-in-out overflow-hidden",
            sidebarCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
          )}>
            {mounted && theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </span>
        </button>
        <Link
          href="/support"
          className="flex items-center gap-x-3 rounded-md p-2 text-sm font-medium leading-6 text-blue-200 hover:bg-blue-600 hover:text-white"
        >
          <QuestionMarkCircleIcon className="h-4 w-4 shrink-0" />
          <span className={cn(
            "transition-all duration-300 ease-in-out overflow-hidden",
            sidebarCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
          )}>
            Support
          </span>
        </Link>
        {user && (
          <Link
            href="/dashboard/settings"
            className={cn(
              "flex items-center gap-x-4 px-3 py-3 text-sm text-blue-200 mt-4",
              "transition-all duration-300 ease-in-out overflow-hidden",
              sidebarCollapsed ? "opacity-0" : "opacity-100"
            )}
          >
            <Image
              src={user.photoURL || "/images/default-avatar.png"}
              alt="User avatar"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="sr-only">Your profile</span>
            <span aria-hidden="true">{user.displayName || user.email}</span>
          </Link>
        )}
      </div>
    </>
  );

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      {/* Mobile header */}
      <div className="lg:hidden sticky top-0 z-40 flex items-center justify-between bg-blue-950 px-4 py-4 shadow-sm">
        <Image
          src="/images/logo-white.svg"
          alt="Logo"
          width={100}
          height={30}
          className="h-8 w-auto"
        />
        <div className="flex items-center">
          <button
            onClick={toggleTheme}
            className="mr-4 p-2 text-blue-200 hover:bg-blue-600 hover:text-white rounded-md"
          >
            {mounted && theme === 'dark' ? (
              <SunIcon className="h-4 w-4" />
            ) : (
              <MoonIcon className="h-4 w-4" />
            )}
          </button>
          <button
            type="button"
            className="p-2 text-blue-200 hover:bg-blue-600 hover:text-white rounded-md focus:outline-none"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Bars3Icon className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop sidebar */}
        <div className={cn(
          "hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col",
          "transition-all duration-300 ease-in-out",
          sidebarCollapsed ? "lg:w-20" : "lg:w-64"
        )}>
          <div className="flex h-full flex-col justify-between overflow-y-auto bg-[#020241] py-4 px-3">
            <SidebarContent />
          </div>
        </div>

        {/* Mobile sidebar */}
        <Transition.Root show={mobileOpen} as={React.Fragment}>
          <Dialog as="div" className="relative z-50 lg:hidden" onClose={setMobileOpen}>
            <Transition.Child
              as={React.Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-background/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={React.Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={React.Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button type="button" className="p-2 text-blue-200 hover:bg-blue-600 hover:text-white rounded-md" onClick={() => setMobileOpen(false)}>
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-blue-700 px-6 pb-4">
                    <SidebarContent />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Main content */}
        <div className={cn(
          "flex-1 overflow-auto",
          "transition-all duration-300 ease-in-out",
          sidebarCollapsed ? "lg:pl-20" : "lg:pl-64"
        )}>
          <main className="p-4 sm:p-6 lg:pl-24 lg:pr-24">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}