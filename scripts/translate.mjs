/**
 * translate.mjs
 *
 * Gemini-powered auto-translation script for AdaptAC (ImaginAC) locale files.
 *
 * For each target language, it:
 *   1. Reads src/locales/es.json as the source of truth
 *   2. Reads the existing target JSON (if it exists)
 *   3. Detects keys that are MISSING from the target (new keys added to es.json)
 *   4. Sends them to Gemini in batches for translation
 *   5. Merges translated keys with existing translations and writes back
 *
 * Usage:
 *   node scripts/translate.mjs          — translate ALL languages
 *   node scripts/translate.mjs fr       — translate only French
 *   node scripts/translate.mjs fr de    — translate French and German
 *
 * Requirements:
 *   - GEMINI_API_KEY in .env or environment variable
 *   - @google/generative-ai package installed (already in package.json)
 *
 * Model: gemini-3.1-flash-lite-preview (as per AGENTS.md)
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from '@google/generative-ai';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const LOCALES_DIR = join(ROOT, 'src/locales');
const ENV_FILE = join(ROOT, '.env');

// ---------------------------------------------------------------------------
// Load environment variables from .env (dotenv-style manual parse)
// ---------------------------------------------------------------------------
function loadEnv(envPath) {
  if (!existsSync(envPath)) return;
  const lines = readFileSync(envPath, 'utf8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIndex = trimmed.indexOf('=');
    if (eqIndex === -1) continue;
    const key = trimmed.slice(0, eqIndex).trim();
    const value = trimmed.slice(eqIndex + 1).trim().replace(/^["']|["']$/g, '');
    if (key && !process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadEnv(ENV_FILE);

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error('ERROR: GEMINI_API_KEY not found in environment or .env file');
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Language configuration
// ---------------------------------------------------------------------------

/** Maps short code → full language name used in the Gemini prompt */
const LANG_NAMES = {
  EN: 'English',
  CA: 'Catalan',
  VA: 'Valencian',
  GL: 'Galician',
  EU: 'Basque',
  FR: 'French',
  DE: 'German',
  IT: 'Italian',
};

/** Maps short code → JSON filename (without .json) */
const LANG_FILES = {
  EN: 'en',
  CA: 'ca',
  VA: 'va',
  GL: 'gl',
  EU: 'eu',
  FR: 'fr',
  DE: 'de',
  IT: 'it',
};

// All available target languages (excluding ES which is always the source)
const ALL_TARGET_LANGS = Object.keys(LANG_FILES);

// Model name as specified in AGENTS.md
const GEMINI_MODEL = 'gemini-3.1-flash-lite-preview';

// Number of keys per Gemini request batch
const BATCH_SIZE = 25;

// ---------------------------------------------------------------------------
// Gemini translation helper
// ---------------------------------------------------------------------------

const genai = new GoogleGenerativeAI(GEMINI_API_KEY);

/**
 * Translates a batch of key-value pairs from Spanish to the target language.
 *
 * @param {Record<string, string>} batch - Object with {key: spanishString} pairs
 * @param {string} targetLang - e.g. "French"
 * @returns {Promise<Record<string, string>>} - Same keys, translated values
 */
async function translateBatch(batch, targetLang) {
  const model = genai.getGenerativeModel({ model: GEMINI_MODEL });

  const batchJson = JSON.stringify(batch, null, 2);

  const prompt = `You are a professional translator working on a Spanish educational web application called ImaginAC, designed for special education teachers (PT teachers) to create accessible stories with pictograms.

Translate the following UI strings from Spanish to ${targetLang}.

RULES:
- Keep brand names unchanged: ImaginAC, ARASAAC, Google Gemini, Supabase, Resend
- Keep strings that are entirely in ALL CAPS in ALL CAPS (e.g. "CREA UN CUENTO" → "CREATE A STORY" in English)
- Preserve special characters, apostrophes, and diacritics appropriate for ${targetLang}
- Use formal/professional register appropriate for educational software
- Return ONLY a valid JSON object with the EXACT same keys as the input
- Do NOT add any explanation, markdown fences, or extra text — only raw JSON

Input JSON:
${batchJson}`;

  let attempts = 0;
  const maxAttempts = 3;

  while (attempts < maxAttempts) {
    attempts++;
    try {
      const result = await model.generateContent(prompt);
      const responseText = result.response.text().trim();

      // Strip markdown code fences if present
      const cleaned = responseText
        .replace(/^```(?:json)?\s*/i, '')
        .replace(/\s*```\s*$/, '')
        .trim();

      const parsed = JSON.parse(cleaned);
      return parsed;
    } catch (err) {
      if (attempts < maxAttempts) {
        console.warn(`  Attempt ${attempts} failed: ${err.message} — retrying...`);
        await sleep(2000 * attempts);
      } else {
        throw new Error(`Failed to translate batch after ${maxAttempts} attempts: ${err.message}`);
      }
    }
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ---------------------------------------------------------------------------
// Split an object into chunks of `size`
// ---------------------------------------------------------------------------
function chunkObject(obj, size) {
  const entries = Object.entries(obj);
  const chunks = [];
  for (let i = 0; i < entries.length; i += size) {
    chunks.push(Object.fromEntries(entries.slice(i, i + size)));
  }
  return chunks;
}

// ---------------------------------------------------------------------------
// Translate a single language
// ---------------------------------------------------------------------------
async function translateLanguage(langCode) {
  const langName = LANG_NAMES[langCode];
  const filename = LANG_FILES[langCode];

  if (!langName || !filename) {
    console.error(`ERROR: Unknown language code "${langCode}". Valid codes: ${ALL_TARGET_LANGS.join(', ')}`);
    return;
  }

  console.log(`\n── ${langCode} (${langName}) ──`);

  // Load source (Spanish)
  const sourcePath = join(LOCALES_DIR, 'es.json');
  if (!existsSync(sourcePath)) {
    console.error(`ERROR: Source file not found: ${sourcePath}`);
    console.error('Run `node scripts/extract-locales.mjs` first.');
    process.exit(1);
  }
  const source = JSON.parse(readFileSync(sourcePath, 'utf8'));

  // Load existing target translations (if any)
  const targetPath = join(LOCALES_DIR, `${filename}.json`);
  let existing = {};
  if (existsSync(targetPath)) {
    existing = JSON.parse(readFileSync(targetPath, 'utf8'));
    console.log(`  Existing: ${Object.keys(existing).length} keys`);
  } else {
    console.log(`  No existing file — will translate all keys`);
  }

  // Find missing keys (keys in source that are absent from target)
  const sourceKeys = Object.keys(source);
  const missingKeys = sourceKeys.filter((key) => !(key in existing));

  if (missingKeys.length === 0) {
    console.log(`  Nothing to translate — all ${sourceKeys.length} keys already present`);
    return;
  }

  console.log(`  Missing keys to translate: ${missingKeys.length}`);

  // Build object of missing entries using Spanish values
  const missingEntries = Object.fromEntries(missingKeys.map((k) => [k, source[k]]));

  // Translate in batches
  const batches = chunkObject(missingEntries, BATCH_SIZE);
  const translated = {};

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    const batchKeys = Object.keys(batch).length;
    process.stdout.write(`  Batch ${i + 1}/${batches.length} (${batchKeys} keys)...`);

    try {
      const result = await translateBatch(batch, langName);

      // Validate: check all expected keys are present in result
      let validCount = 0;
      for (const key of Object.keys(batch)) {
        if (key in result) {
          translated[key] = result[key];
          validCount++;
        } else {
          console.warn(`\n  WARNING: Key "${key}" missing from Gemini response — using Spanish fallback`);
          translated[key] = batch[key]; // fallback to Spanish
        }
      }
      console.log(` done (${validCount}/${batchKeys} translated)`);

      // Brief pause between batches to be polite to the API
      if (i < batches.length - 1) {
        await sleep(500);
      }
    } catch (err) {
      console.error(`\n  ERROR in batch ${i + 1}: ${err.message}`);
      console.error('  Falling back to Spanish for this batch');
      for (const [k, v] of Object.entries(batch)) {
        translated[k] = v;
      }
    }
  }

  // Merge: preserve existing translations, add new ones
  // Key order: follow source (es.json) key order for consistency
  const merged = {};
  for (const key of sourceKeys) {
    if (key in existing) {
      merged[key] = existing[key];
    } else if (key in translated) {
      merged[key] = translated[key];
    } else {
      merged[key] = source[key]; // ultimate fallback
    }
  }

  // Write back
  writeFileSync(targetPath, JSON.stringify(merged, null, 2) + '\n', 'utf8');
  console.log(`  Saved ${Object.keys(merged).length} keys → ${filename}.json`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  const args = process.argv.slice(2).map((a) => a.toUpperCase());

  let targetLangs;

  if (args.length === 0) {
    targetLangs = ALL_TARGET_LANGS;
    console.log(`Translating all ${targetLangs.length} languages...`);
  } else {
    // Validate provided language codes
    const invalid = args.filter((a) => !ALL_TARGET_LANGS.includes(a));
    if (invalid.length > 0) {
      console.error(`ERROR: Unknown language code(s): ${invalid.join(', ')}`);
      console.error(`Valid codes: ${ALL_TARGET_LANGS.join(', ')}`);
      process.exit(1);
    }
    targetLangs = args;
    console.log(`Translating: ${targetLangs.join(', ')}`);
  }

  for (const lang of targetLangs) {
    await translateLanguage(lang);
  }

  console.log('\nTranslation complete.');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
