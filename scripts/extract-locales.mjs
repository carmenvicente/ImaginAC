/**
 * extract-locales.mjs
 *
 * Extracts the `traduccionesUI` object from useLanguageStore.ts and writes
 * each language as a separate JSON file under src/locales/.
 *
 * Usage: node scripts/extract-locales.mjs
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const SOURCE_FILE = join(ROOT, 'src/lib/stores/useLanguageStore.ts');
const LOCALES_DIR = join(ROOT, 'src/locales');

// Ensure output directory exists
mkdirSync(LOCALES_DIR, { recursive: true });

// Read the TypeScript source file
const source = readFileSync(SOURCE_FILE, 'utf8');

// Find the traduccionesUI object by locating its boundaries
const startMarker = 'export const traduccionesUI: Record<string, Record<string, string>> = {';
const startIndex = source.indexOf(startMarker);

if (startIndex === -1) {
  console.error('ERROR: Could not find traduccionesUI declaration in useLanguageStore.ts');
  process.exit(1);
}

// Find the matching closing brace by counting braces
const objectStart = source.indexOf('{', startIndex);
let depth = 0;
let objectEnd = -1;

for (let i = objectStart; i < source.length; i++) {
  if (source[i] === '{') depth++;
  else if (source[i] === '}') {
    depth--;
    if (depth === 0) {
      objectEnd = i;
      break;
    }
  }
}

if (objectEnd === -1) {
  console.error('ERROR: Could not find the end of traduccionesUI object');
  process.exit(1);
}

// Extract just the object body (including the outer braces)
const objectSource = source.slice(objectStart, objectEnd + 1);

// Use Function constructor to evaluate the object safely
// The object only contains string key-value pairs — no TS-specific syntax inside
let traduccionesUI;
try {
  // eslint-disable-next-line no-new-func
  traduccionesUI = new Function(`return (${objectSource})`)();
} catch (err) {
  console.error('ERROR: Failed to evaluate traduccionesUI object:', err.message);
  console.error('Attempting manual parse fallback...');
  process.exit(1);
}

// Language code → filename mapping
const LANG_FILES = {
  ES: 'es',
  EN: 'en',
  CA: 'ca',
  VA: 'va',
  GL: 'gl',
  EU: 'eu',
  FR: 'fr',
  DE: 'de',
  IT: 'it',
};

let totalWritten = 0;

for (const [langCode, filename] of Object.entries(LANG_FILES)) {
  const translations = traduccionesUI[langCode];

  if (!translations) {
    console.warn(`WARNING: Language ${langCode} not found in traduccionesUI — skipping`);
    continue;
  }

  const keyCount = Object.keys(translations).length;
  const outputPath = join(LOCALES_DIR, `${filename}.json`);
  const json = JSON.stringify(translations, null, 2);

  writeFileSync(outputPath, json + '\n', 'utf8');
  console.log(`✓ ${filename}.json — ${keyCount} keys`);
  totalWritten++;
}

console.log(`\nDone. ${totalWritten} locale files written to src/locales/`);
