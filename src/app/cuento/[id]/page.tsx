'use client';

import { use } from 'react';
import { VisorCuento } from '@/components/profesor/VisorCuento';
import Link from 'next/link';

interface PaginaCuentoProps {
  params: Promise<{ id: string }>;
}

export default function PaginaCuento({ params }: PaginaCuentoProps) {
  const { id } = use(params);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          href="/profesor"
          className="text-[var(--marca)] hover:underline flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Volver al panel
        </Link>
      </div>
      <VisorCuento cuentoId={id} />
    </div>
  );
}
