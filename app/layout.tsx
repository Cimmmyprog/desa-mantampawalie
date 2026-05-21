'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Header from './components/header';
import Footer from './components/footer';
import './globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const hideHeaderFooter =
    pathname === '/login' ||
    pathname === '/dashboard' ||
    pathname.startsWith('/dashboard/');

  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        {!hideHeaderFooter && <Header />}

        <main
          className={
            hideHeaderFooter
              ? 'min-h-screen'
              : 'min-h-[calc(100vh-160px)]'
          }
        >
          {children}
        </main>

        {!hideHeaderFooter && <Footer />}
      </body>
    </html>
  );
}