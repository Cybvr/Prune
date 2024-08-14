'use client';

import React from 'react';
import Link from 'next/link';
import { UserIcon, BellIcon, ShieldCheckIcon, PaintBrushIcon } from '@heroicons/react/24/outline';

const settingsCategories = [
  { name: 'Account', description: 'Manage your account settings', icon: UserIcon, href: '/dashboard/settings/account' },
  { name: 'Notifications', description: 'Configure your notification preferences', icon: BellIcon, href: '/dashboard/settings/notifications' },
  { name: 'Security', description: 'Update your security settings', icon: ShieldCheckIcon, href: '/dashboard/settings/security' },
  { name: 'Appearance', description: 'Customize the app appearance', icon: PaintBrushIcon, href: '/dashboard/settings/appearance' },
];

export default function SettingsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {settingsCategories.map((category) => (
          <Link key={category.name} href={category.href} className="block">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <category.icon className="h-8 w-8 text-gray-400" aria-hidden="true" />
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-medium text-gray-900">{category.name}</h2>
                  <p className="mt-1 text-sm text-gray-500">{category.description}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}