import './globals.css';
import type { ReactNode } from 'react';
import Head from 'next/head';

export const metadata = {
  title: 'Portfólio de Naia',
  description: 'Portfólio artístico de Shanaia de Sousa',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt">
      <head>
        <link rel="icon" href="/images/favicon.png" type="image/png" />
      </head>
      <body className="bg-purple3 text-white font-helvetica min-h-screen">
        {children}
      </body>
    </html>
  );
}
