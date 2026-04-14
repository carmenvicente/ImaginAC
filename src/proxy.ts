import { NextResponse, type NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  console.log(`[PROXY] Passthrough: ${request.nextUrl.pathname}`);

  const respuesta = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  return respuesta;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
