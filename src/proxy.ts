import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  const rutaActual = request.nextUrl.pathname;
  const RUTAS_PUBLICAS = [
    '/',
    '/login',
    '/registro',
    '/privacidad',
    '/terminos',
    '/sobre-nosotros',
    '/configuracion',
    '/profesor/crear-cuento',
  ];
  const esRutaPublica = RUTAS_PUBLICAS.includes(rutaActual);

  console.log(`[MIDDLEWARE] Procesando: ${rutaActual}, esPública: ${esRutaPublica}`);

  const respuesta = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          respuesta.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          });
          respuesta.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  // 1. EL CAMBIO CLAVE: Usamos getUser() para mayor seguridad
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log(`[MIDDLEWARE] Usuario validado: ${user ? '存在 (existe)' : '不存在 (no existe)'}`);
  console.log(`[MIDDLEWARE] ID Usuario: ${user?.id || 'ninguno'}`);

  // 2. Cambiamos las comprobaciones de "session" a "user"
  if (!user && !esRutaPublica) {
    console.log(`[MIDDLEWARE] Sin sesión, redirigiendo a /login`);
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (user) {
    // 3. Usamos user.id directamente
    const { data: perfil, error: perfilError } = await supabase
      .from('usuarios')
      .select('rol')
      .eq('id', user.id)
      .single();

    console.log(
      `[MIDDLEWARE] Perfil - rol: ${perfil?.rol || 'null'}, error: ${perfilError?.message || 'ninguno'}`
    );

    const rol = perfil?.rol;

    if (esRutaPublica && perfil) {
      console.log(`[MIDDLEWARE] Con sesión y en ruta pública, redirigiendo según rol: ${rol}`);
      if (rol === 'PROFESOR_PT') {
        return NextResponse.redirect(new URL('/profesor', request.url));
      } else if (rol === 'ALUMNO') {
        return NextResponse.redirect(new URL('/alumno', request.url));
      }
    }

    const esRutaProfesor = rutaActual.startsWith('/profesor');
    const esRutaAlumno = rutaActual.startsWith('/alumno');

    if (esRutaProfesor && rol && rol !== 'PROFESOR_PT') {
      console.log(
        `[MIDDLEWARE] Acceso denegado a /profesor para rol: ${rol}, redirigiendo a /alumno`
      );
      return NextResponse.redirect(new URL('/alumno', request.url));
    }

    if (esRutaAlumno && rol && rol !== 'ALUMNO') {
      console.log(
        `[MIDDLEWARE] Acceso denegado a /alumno para rol: ${rol}, redirigiendo a /profesor`
      );
      return NextResponse.redirect(new URL('/profesor', request.url));
    }
  }

  console.log(`[MIDDLEWARE] Permitiendo acceso a ${rutaActual}`);
  return respuesta;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
