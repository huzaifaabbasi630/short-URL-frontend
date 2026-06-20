import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Smart URL Shortener',
  description: 'Ultra-fast URL shortener with advanced analytics',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
