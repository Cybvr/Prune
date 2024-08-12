'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboardPage = pathname?.startsWith('/dashboard');

  return (
    <div className="flex flex-col min-h-screen">
      {!isDashboardPage && <Header />}
      <main className="flex-grow">
        {children}
      </main>
      {!isDashboardPage && <Footer />}
    </div>
  );
}