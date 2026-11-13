/**
 * Captures the thumbnails of the playground examples for the welcome card
 * (`src/playground/assets/example-thumbs/<key>.jpg`), from the real viewer.
 *
 * Start the dev server first (`npm.cmd run dev`), then run:
 *   node scripts/capture_example_thumbnails.mjs [base URL]
 * The base URL defaults to http://localhost:5173/. Each example is shown on the `?embed=true` page
 * without its toolbar, framed as a visitor first sees it, and saved as a JPEG of 160 x 96 pixels.
 * Run it again after an example network changes.
 */
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';

/** Keys of the examples (`examples.ts`); an example without a file is skipped with a warning. */
const EXAMPLE_KEYS = ['start', 'vex', 'foreach', 'params', 'looks', 'assets'];

/** Size of the viewer in CSS pixels: the 5:3 frame of a thumbnail, above the viewer's 320px minimum height. */
const VIEWPORT = { width: 560, height: 336 };

/** Pixel ratio that saves each thumbnail 160 x 96 pixels: 2.5 times its 64 x 38 on the card, sharp on high-density screens. */
const PIXEL_RATIO = 160 / VIEWPORT.width;

const OUT_DIR = fileURLToPath(new URL('../src/playground/assets/example-thumbs/', import.meta.url));
const baseUrl = process.argv[2] ?? 'http://localhost:5173/';

mkdirSync(OUT_DIR, { recursive: true });
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: VIEWPORT, deviceScaleFactor: PIXEL_RATIO });
  for (const key of EXAMPLE_KEYS) {
    const url = new URL(`?embed=true&demo=${key}&toolbar=false&inspector=false`, baseUrl).href;
    await page.goto(url);
    try {
      await page.locator('.react-flow__node').first().waitFor({ state: 'visible', timeout: 15_000 });
    } catch {
      console.warn(`skipped ${key}: no network on ${url}`);
      continue;
    }
    // Fonts and the start framing settle after the first nodes appear
    await page.evaluate(() => globalThis.document.fonts.ready);
    await page.waitForTimeout(800);
    const path = `${OUT_DIR}${key}.jpg`;
    await page.screenshot({ path, type: 'jpeg', quality: 82 });
    console.log(`saved ${path}`);
  }
} finally {
  await browser.close();
}
