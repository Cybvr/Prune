import React from 'react';
import { Inter } from "next/font/google";
import type { Metadata } from 'next';
import "./styles/globals.css";
import ClientLayout from './ClientLayout';

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}