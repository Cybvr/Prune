'use client';

import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'next-themes';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firebaseConfig } from '@/firebase/firebaseConfig';
import { usePathname, useRouter } from 'next/navigation';
import { ClipLoader } from 'react-spinners';
import CookiesPopup from '@/app/(marketing)/components/CookiesPopup';
import { initializeApp } from 'firebase/app';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);
  const [user, loading] = useAuthState(auth);
  const pathname = usePathname();
  const router = useRouter();
  const isDashboardPage = pathname?.startsWith('/dashboard');

  useEffect(() => {
    try {
      initializeApp(firebaseConfig);
      setFirebaseInitialized(true);
    } catch (error) {
      console.error("Error initializing Firebase:", error);
    }
  }, []);

  useEffect(() => {
    if (firebaseInitialized && !loading && !user && isDashboardPage) {
      router.push('/auth/login');
    }
  }, [firebaseInitialized, user, loading, isDashboardPage, router]);

  if (!firebaseInitialized || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader color="#4A90E2" size={50} />
      </div>
    );
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {isDashboardPage && !user ? (
        <div>Redirecting to login...</div>
      ) : (
        <>
          {children}
        </>
      )}
      <CookiesPopup />
    </ThemeProvider>
  );
}