import { NextResponse, type NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const respuesta = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  respuesta.headers.set('X-Content-Type-Options', 'nosniff');
  respuesta.headers.set('X-Frame-Options', 'DENY');
  respuesta.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  return respuesta;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
