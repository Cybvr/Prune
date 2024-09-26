// @app/layout.tsx
import React from 'react';
import { Inter, IBM_Plex_Sans } from "next/font/google";
import { Metadata } from 'next'; // Use regular import
import "./styles/globals.css";
import dynamic from 'next/dynamic';
import '@/app/styles/quill.css'
import 'draft-js/dist/Draft.css';

const ClientWrapper = dynamic(() => import('./ClientWrapper'), { ssr: false });

const inter = Inter({ subsets: ["latin"] });
const ibmPlex = IBM_Plex_Sans({ 
  weight: ['400', '700'],
  subsets: ["latin"],
  variable: '--font-ibm-plex',
});

export const metadata: Metadata = {
  title: "Prune",
  description: "Your AI writing assistant",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${ibmPlex.variable} font-sans`}>
      <body className={inter.className}>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}