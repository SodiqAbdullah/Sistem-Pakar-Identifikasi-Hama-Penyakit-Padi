import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sistem Pakar Identifikasi Hama & Penyakit Padi',
  description: 'Aplikasi AI untuk identifikasi hama dan penyakit tanaman padi secara akurat',
  keywords: 'padi, hama, penyakit, AI, deteksi, diagnosis',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {children}
        </div>
      </body>
    </html>
  );
}
