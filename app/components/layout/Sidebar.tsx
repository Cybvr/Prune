import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { 
  XMarkIcon, 
  DocumentTextIcon,
  FolderIcon, 
  LightBulbIcon, 
  AcademicCapIcon, 
  RocketLaunchIcon,
  Cog6ToothIcon,
  ChevronUpIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

const navigation = [
  { name: 'My Ideas', href: '/dashboard/ideas', icon: LightBulbIcon, current: true },
  { name: 'Documents', href: '/dashboard/documents', icon: DocumentTextIcon, current: false },
  { name: 'Categories', href: '/dashboard/categories', icon: FolderIcon, current: false },
  { name: 'Learn', href: '/dashboard/learn', icon: AcademicCapIcon, current: false },
  { name: 'Execute', href: '/dashboard/execute', icon: RocketLaunchIcon, current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
          {/* Existing code */}
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-zinc-100 px-6 pt-4 pb-4">
          <div className="flex justify-between items-center pt-4">
            <span className="text-white font-semibold">Menu</span>
            <button onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? (
                <ChevronUpIcon className="h-6 w-6 text-white" aria-hidden="true" />
              ) : (
                <ChevronDownIcon className="h-6 w-6 text-white" aria-hidden="true" />
              )}
            </button>
          </div>
          {isExpanded && (
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={classNames(
                            item.current ? 'bg-blue-700 text-zinc-600' : 'text-zinc-600 hover:text-zinc-100 hover:bg-blue-700',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                          )}
                        >
                          <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="mt-auto">
                  <Link
                    href="/dashboard/settings"
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-zinc-600 hover:bg-blue-700 hover:text-zinc-100"
                  >
                    <Cog6ToothIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
                    Settings
                  </Link>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </>
  );
}