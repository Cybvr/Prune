import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Dialog, Transition } from '@headlessui/react';
import { 
  XMarkIcon, 
  MoonIcon, 
  SunIcon, 
  HomeIcon, 
  DocumentIcon, 
  UserGroupIcon, 
  ChevronLeftIcon, 
  ChevronRightIcon,
  Bars3Icon
} from '@heroicons/react/24/outline';
import { cn } from "@/lib/utils";

const menuItems = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  { name: 'Documents', href: '/dashboard/documents', icon: DocumentIcon },
  { name: 'Coach', href: '/dashboard/coach', icon: UserGroupIcon },
];

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { theme, setTheme } = useTheme();

  const SidebarContent = () => (
    <>
      <div className="flex h-16 items-center justify-between">
        {!collapsed && (
          <Image
            src="/images/logo-white.svg"
            alt="Logo"
            width={100}
            height={30}
            className="h-8 w-auto"
          />
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 text-gray-300 hover:bg-indigo-800 hover:text-white rounded-md lg:block hidden"
        >
          {collapsed ? (
            <ChevronRightIcon className="h-6 w-6" />
          ) : (
            <ChevronLeftIcon className="h-6 w-6" />
          )}
        </button>
      </div>
      <nav className="mt-5 flex flex-col gap-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-300 hover:bg-indigo-800 hover:text-white"
          >
            <item.icon className="h-6 w-6" />
            {(!collapsed || mobileOpen) && item.name}
          </Link>
        ))}
      </nav>
      <div className="mt-auto">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="flex items-center justify-center p-2 text-gray-300 hover:bg-indigo-800 hover:text-white rounded-md w-full"
        >
          {theme === 'dark' ? (
            <SunIcon className="h-6 w-6" />
          ) : (
            <MoonIcon className="h-6 w-6" />
          )}
          {(!collapsed || mobileOpen) && <span className="ml-2">Toggle theme</span>}
        </button>
        {(!collapsed || mobileOpen) && (
          <div className="flex items-center gap-x-4 px-3 py-3 text-sm text-gray-300 mt-4">
            <img
              className="h-8 w-8 rounded-full bg-gray-800"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <span className="sr-only">Your profile</span>
            <span aria-hidden="true">Tom Cook</span>
          </div>
        )}
      </div>
    </>
  );

  return (
    <>
      <div className={cn(
        "hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col",
        collapsed ? "lg:w-20" : "lg:w-64"
      )}>
        <div className="flex h-full flex-col justify-between overflow-y-auto bg-indigo-900 py-4 px-3">
          <SidebarContent />
        </div>
      </div>

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
            <div className="fixed inset-0 bg-gray-900/80" />
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
                    <button type="button" className="-m-2.5 p-2.5" onClick={() => setMobileOpen(false)}>
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-900 px-6 pb-4">
                  <SidebarContent />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-indigo-900 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-indigo-200 lg:hidden"
          onClick={() => setMobileOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className="flex-1 text-sm font-semibold leading-6 text-white">Dashboard</div>
      </div>
    </>
  );
}