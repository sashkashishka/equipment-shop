import type { Metadata } from 'next';
import './globals.css';

import { NavigationBar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NavigationBar />

        <div className="content">{children}</div>

        <Footer />
      </body>
    </html>
  );
}
