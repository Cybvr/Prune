import React from 'react';
import { Inter, IBM_Plex_Sans } from "next/font/google";
import type { Metadata } from 'next';
import "./styles/globals.css";
import ClientLayout from './ClientLayout';

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
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}