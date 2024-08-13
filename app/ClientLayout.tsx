'use client'

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase/firebaseConfig';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const isDashboardPage = pathname?.startsWith('/dashboard');
  const isAuthPage = pathname?.startsWith('/auth/');

  useEffect(() => {
    if (!loading && !user && isDashboardPage) {
      router.push('/auth/login');
    }
  }, [user, loading, isDashboardPage, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {!isDashboardPage && !isAuthPage && <Header />}
      <main className="flex-grow">
        {isDashboardPage && !user ? (
          <div>Redirecting to login...</div>
        ) : (
          <>
            {children}
          </>
        )}
      </main>
      {!isDashboardPage && !isAuthPage && <Footer />}
    </div>
  );
}
