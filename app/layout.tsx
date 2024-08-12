
'use client';

import React from 'react';
import { Inter } from "next/font/google";
import { usePathname } from 'next/navigation';
import "./styles/globals.css";
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboardPage = pathname?.startsWith('/dashboard');

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          {!isDashboardPage && <Header />}
          <main className="flex-grow">
            {children}
          </main>
          {!isDashboardPage && <Footer />}
        </div>
      </body>
    </html>
  );
}
