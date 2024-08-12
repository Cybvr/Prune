'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function NavigationItem({ item, isCollapsed }) {
  const pathname = usePathname();

  return (
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
  );
}
