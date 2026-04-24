import sharp from 'sharp';
import { readFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const W = 1200;
const H = 630;

// Logo redimensionado: 420px ancho, proporcional (604x413 → 420x287)
const LOGO_W = 420;
const LOGO_H = Math.round(LOGO_W * (413 / 604));

// Tarjeta blanca centrada arriba
const CARD_PAD_X = 50;
const CARD_PAD_Y = 30;
const CARD_W = LOGO_W + CARD_PAD_X * 2;
const CARD_H = LOGO_H + CARD_PAD_Y * 2;
const CARD_X = Math.round((W - CARD_W) / 2);
const CARD_Y = 28;

// Logo dentro de la tarjeta
const LOGO_X = CARD_X + CARD_PAD_X;
const LOGO_Y = CARD_Y + CARD_PAD_Y;

const svg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#d4feff"/>
      <stop offset="100%" stop-color="#9ee8ea"/>
    </linearGradient>
    <filter id="sombra">
      <feDropShadow dx="0" dy="4" stdDeviation="12" flood-color="#00000020"/>
    </filter>
  </defs>

  <!-- Fondo degradado -->
  <rect width="${W}" height="${H}" fill="url(#bg)"/>

  <!-- Tarjeta blanca con sombra -->
  <rect
    x="${CARD_X}" y="${CARD_Y}"
    width="${CARD_W}" height="${CARD_H}"
    rx="24" fill="white"
    filter="url(#sombra)"
  />

  <!-- Tagline -->
  <text
    x="${W / 2}" y="435"
    font-family="system-ui, -apple-system, Arial, sans-serif"
    font-size="36" font-weight="700"
    fill="#1a3a5c" text-anchor="middle"
  >Generador de cuentos con pictogramas e IA</text>

  <!-- Subtítulo -->
  <text
    x="${W / 2}" y="492"
    font-family="system-ui, -apple-system, Arial, sans-serif"
    font-size="22" fill="#3a6a7c" text-anchor="middle"
  >Gratis para profesores, logopedas y familias</text>

  <!-- URL -->
  <text
    x="${W / 2}" y="590"
    font-family="system-ui, -apple-system, Arial, sans-serif"
    font-size="19" fill="#5a8a9c" text-anchor="middle"
  >imaginac.vercel.app</text>
</svg>
`;

const logoResized = await sharp(readFileSync(join(ROOT, 'public/logo_ImaginAC_completo.png')))
  .resize(LOGO_W, LOGO_H)
  .png()
  .toBuffer();

mkdirSync(join(ROOT, 'public'), { recursive: true });

await sharp(Buffer.from(svg))
  .png()
  .composite([{ input: logoResized, top: LOGO_Y, left: LOGO_X }])
  .toFile(join(ROOT, 'public/og-image.png'));

console.log(`✓ og-image.png generada (${W}x${H}px) → public/og-image.png`);
