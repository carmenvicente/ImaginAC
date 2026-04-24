import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import { FeedbackWidget } from '@/components/ui/FeedbackWidget';
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

const BASE_URL = 'https://imaginac.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'ImaginAC – Generador de cuentos con pictogramas e IA',
    template: '%s | ImaginAC',
  },
  description:
    'Crea cuentos personalizados con pictogramas ARASAAC e inteligencia artificial. Herramienta gratuita para profesores, logopedas y familias de alumnos con necesidades educativas especiales.',
  keywords: [
    'generador de cuentos con IA',
    'generador de cuentos con pictogramas',
    'cuentos con pictogramas',
    'pictogramas ARASAAC',
    'accesibilidad cognitiva',
    'cuentos para niños con autismo',
    'cuentos NEE',
    'ImaginAC',
    'herramienta PT',
    'educación especial',
  ],
  authors: [{ name: 'Carmen Vicente Crespo' }],
  creator: 'Carmen Vicente Crespo',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: BASE_URL,
    siteName: 'ImaginAC',
    title: 'ImaginAC – Generador de cuentos con pictogramas e IA',
    description:
      'Crea cuentos personalizados con pictogramas ARASAAC e inteligencia artificial. Gratis para profesores, logopedas y familias.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ImaginAC – Generador de cuentos con pictogramas e IA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ImaginAC – Generador de cuentos con pictogramas e IA',
    description:
      'Crea cuentos personalizados con pictogramas ARASAAC e inteligencia artificial. Gratis para profesores PT y familias.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${escolar.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <FeedbackWidget />
      </body>
    </html>
  );
}
