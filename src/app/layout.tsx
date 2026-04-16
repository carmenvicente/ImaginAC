import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const escolar = localFont({
  src: '../../public/fonts/Escolar_G.ttf',
  variable: '--font-escolar',
  weight: '400',
  style: 'normal',
});

export const metadata: Metadata = {
  title: 'ImaginAC - Accesibilidad Cognitiva',
  description:
    'Plataforma de accesibilidad cognitiva para profesores PT y alumnos con necesidades educativas especiales.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${escolar.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
