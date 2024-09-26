'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebaseConfig';
import { ClipLoader } from 'react-spinners';
import Header from './components/header';
import Footer from './components/footer';

export default function MarketingLayout({
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
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader color="#4A90E2" size={50} />
      </div>
    );
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