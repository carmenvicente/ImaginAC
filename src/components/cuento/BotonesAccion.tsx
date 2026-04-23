import dynamic from 'next/dynamic';

const BotonesAccionInner = dynamic(
  () => import('./BotonesAccionInner').then((mod) => mod.BotonesAccionInner),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-col md:flex-row gap-4 mt-12 md:mt-16 px-4 pb-10">
        <div className="flex-1 py-3 px-6 bg-gray-200 rounded-xl animate-pulse h-12" />
        <div className="flex-1 py-3 px-6 bg-gray-200 rounded-xl animate-pulse h-12" />
      </div>
    ),
  }
);

export { BotonesAccionInner as BotonesAccion };
