import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SII ITC',
  description: 'Sistema de información estudiantil ITC',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-gray-50 min-h-screen text-gray-800">
        {children}
      </body>
    </html>
  );
}
