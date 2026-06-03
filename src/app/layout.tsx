import type { Metadata } from 'next';
import './globals.css';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import LayoutTransition from '../components/layout/LayoutTransition';

export const metadata: Metadata = {
  title: 'Premium Portfolio',
  description: 'A premium dark luxury design portfolio',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <LayoutTransition>
          {children}
        </LayoutTransition>
        <Footer />
      </body>
    </html>
  );
}
