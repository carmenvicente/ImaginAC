import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crear cuento con pictogramas',
  description:
    'Genera un cuento personalizado con pictogramas ARASAAC e inteligencia artificial en segundos. Ideal para profesores PT, logopedas y familias.',
  alternates: {
    canonical: 'https://imaginac.vercel.app/crear-cuento',
  },
};

export default function CrearCuentoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
