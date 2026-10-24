/**
 * Rate limiter simple en memoria (por IP).
 * Se resetea con cada reinicio del servidor.
 */

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

interface RateLimitOptions {
  /** Máximo de peticiones permitidas en la ventana */
  limit: number;
  /** Duración de la ventana en segundos */
  windowSecs: number;
}

/**
 * Comprueba si una IP ha superado el límite.
 * @returns `{ ok: true }` si está dentro del límite, o `{ ok: false, retryAfter }` si lo superó.
 */
export function checkRateLimit(
  ip: string,
  key: string,
  { limit, windowSecs }: RateLimitOptions
): { ok: true } | { ok: false; retryAfter: number } {
  const bucketKey = `${key}:${ip}`;
  const now = Date.now();
  const existing = buckets.get(bucketKey);

  if (!existing || now > existing.resetAt) {
    buckets.set(bucketKey, { count: 1, resetAt: now + windowSecs * 1000 });
    return { ok: true };
  }

  if (existing.count >= limit) {
    const retryAfter = Math.ceil((existing.resetAt - now) / 1000);
    return { ok: false, retryAfter };
  }

  existing.count += 1;
  return { ok: true };
}

/** Extrae la IP del cliente de los headers de Next.js */
export function getClientIp(request: Request): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}
