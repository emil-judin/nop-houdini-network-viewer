// Icon pre-screen (Stage 3 of the icon workflow in docs/ICON_ART_BIBLE.md, section 9).
//
// Renders operator icon drawings with the real TSX registry, checks them automatically and writes
// a contact sheet:
//   [Houdini ref 48px | ours 48px on #cccccc | ours 48px on #3d3d3d | 21px on #cccccc | #3d3d3d |
//    a saturated node color | Houdini ref 21px]
//
// Checks per icon: forbidden SVG elements, uid-prefixed and unique ids, painted bounds (2..22, thin
// strokes 1.5..22.5), minimum stroke width (0.6), light strokes without a dark casing, 21px contrast
// ink and overfill on three node colors, and a coarse match against the local Houdini reference
// (silhouette IoU and hue histogram overlap).
//
// The Houdini references are read from the gitignored local-refs/ folder only when it exists; they
// never enter the repository or a build. Usage:
//   node scripts/icon_prescreen.mjs [--set pilot|review|all] [--ids sop.a,sop.b] [--out dir] [--strict]
// Output (gitignored): test-results/icon-prescreen/sheet-N.png, report.json, report.md.

/* global document, Image, getComputedStyle -- used inside page.evaluate, which runs in Chromium */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const arg = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : fallback;
};
const SET = arg('set', 'pilot');
const IDS = arg('ids', '');
const OUT = path.resolve(ROOT, arg('out', 'test-results/icon-prescreen'));
const STRICT = args.includes('--strict');
const ROWS_PER_SHEET = 12;
const NODE_COLORS = { light: '#cccccc', dark: '#3d3d3d', saturated: '#4a90e2' };

/** Loads the TSX icon registry through Vite and renders every selected icon to static SVG markup. */
async function renderIcons() {
  const server = await createServer({
    root: ROOT,
    configFile: false,
    logLevel: 'error',
    server: { middlewareMode: true, hmr: false },
    appType: 'custom',
    esbuild: { jsx: 'automatic' },
    optimizeDeps: { noDiscovery: true, include: [] },
  });
  try {
    const review = await server.ssrLoadModule('/src/components/nodes/icons/sop/review/index.ts');
    const pilot = await server.ssrLoadModule('/src/components/nodes/icons/sop/review/b03/familyPilot.ts');
    const registry = await server.ssrLoadModule('/src/components/nodes/icons/iconRegistry.ts');
    const pool = new Map();
    for (const def of [...registry.OPERATOR_ICONS, ...review.REVIEW_ICONS]) pool.set(def.id, def);
    let defs;
    if (IDS) defs = IDS.split(',').map((id) => pool.get(id.includes('.') ? id : `sop.${id}`)).filter(Boolean);
    else if (SET === 'review') defs = review.REVIEW_ICONS;
    else if (SET === 'all') defs = [...pool.values()];
    else defs = pilot.REVIEW_BATCH_03_PILOT;
    return defs.map((def) => {
      const uid = `u${def.id.replace(/[^a-z0-9]/gi, '')}`;
      const svg = renderToStaticMarkup(
        createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24' }, def.render(uid)),
      );
      return { id: def.id, label: def.label, refKey: def.refKey, description: def.description, uid, svg };
    });
  } finally {
    await server.close();
  }
}

/** Markup-level checks that need no browser. */
function staticChecks(icon) {
  const fails = [];
  for (const tag of ['image', 'style', 'filter', 'foreignObject', 'script', 'mask']) {
    if (new RegExp(`<${tag}[\\s>]`, 'i').test(icon.svg)) fails.push(`forbidden <${tag}>`);
  }
  if (/\shref="(?!#)/.test(icon.svg)) fails.push('external href');
  const ids = [...icon.svg.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  for (const id of ids) if (!id.startsWith(icon.uid)) fails.push(`id "${id}" not uid-prefixed`);
  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (dupes.length) fails.push(`duplicate ids: ${[...new Set(dupes)].join(', ')}`);
  if (/[\u2013\u2014]/.test(icon.description)) fails.push('en or em dash in description');
  return fails;
}

/** In-page measurement code (runs in Chromium). */
async function measure(page, icon, refUri) {
  return page.evaluate(
    async ({ svg, refUri: ref, colors }) => {
      const uri = (s) => `data:image/svg+xml;utf8,${encodeURIComponent(s)}`;
      const load = (src) =>
        new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = src;
        });
      const raster = (img, size, bg) => {
        const c = document.createElement('canvas');
        c.width = size;
        c.height = size;
        const ctx = c.getContext('2d');
        if (bg) {
          ctx.fillStyle = bg;
          ctx.fillRect(0, 0, size, size);
        }
        ctx.drawImage(img, 0, 0, size, size);
        return ctx.getImageData(0, 0, size, size).data;
      };
      const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
      const lum = (r, g, b) => (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

      // DOM geometry checks at 1 unit = 1 px.
      const host = document.createElement('div');
      host.innerHTML = svg.replace('<svg ', '<svg width="24" height="24" ');
      document.body.appendChild(host);
      const root = host.querySelector('svg');
      let minStroke = Infinity;
      const thin = [];
      const uncased = [];
      const shapes = [...root.querySelectorAll('path,line,polyline,polygon,rect,circle,ellipse')];
      const geomKey = (el) => ['d', 'points', 'x1', 'y1', 'x2', 'y2', 'cx', 'cy', 'rx', 'ry', 'x', 'y', 'width', 'height', 'transform'].map((a) => el.getAttribute(a)).join('|');
      shapes.forEach((el, i) => {
        if (el.closest('clipPath') || el.closest('defs')) return;
        const cs = getComputedStyle(el);
        if (cs.stroke === 'none' || cs.strokeOpacity === '0') return;
        const m = el.getCTM();
        const scale = m ? Math.sqrt(Math.abs(m.a * m.d - m.b * m.c)) : 1;
        const w = parseFloat(cs.strokeWidth) * scale;
        if (w > 0 && w < minStroke) minStroke = w;
        if (w > 0 && w < 0.58) thin.push(`${el.tagName} ${w.toFixed(2)}`);
        const rgb = cs.stroke.match(/\d+/g);
        const fillNone = cs.fill === 'none' || cs.fillOpacity === '0';
        if (rgb && fillNone && lum(+rgb[0], +rgb[1], +rgb[2]) > 0.72 && parseFloat(cs.strokeOpacity) > 0.6) {
          const key = geomKey(el);
          const cased = shapes.slice(0, i).some((prev) => {
            const ps = getComputedStyle(prev);
            const prgb = ps.stroke.match(/\d+/g);
            return geomKey(prev) === key && prgb && lum(+prgb[0], +prgb[1], +prgb[2]) < 0.25 && parseFloat(ps.strokeWidth) > parseFloat(cs.strokeWidth);
          });
          if (!cased) uncased.push(el.tagName);
        }
      });
      host.remove();

      // Painted bounds from a 240 px transparent raster (10 px per unit).
      const img = await load(uri(svg));
      const big = raster(img, 240, null);
      let x0 = 240;
      let y0 = 240;
      let x1 = -1;
      let y1 = -1;
      for (let y = 0; y < 240; y += 1) {
        for (let x = 0; x < 240; x += 1) {
          if (big[(y * 240 + x) * 4 + 3] > 40) {
            if (x < x0) x0 = x;
            if (y < y0) y0 = y;
            if (x > x1) x1 = x;
            if (y > y1) y1 = y;
          }
        }
      }
      const bounds = [x0 / 10, y0 / 10, (x1 + 1) / 10, (y1 + 1) / 10];

      // 21 px legibility on each node color: contrast ink and overfill.
      const legibility = {};
      for (const [name, bg] of Object.entries(colors)) {
        const px = raster(img, 21, bg);
        const [br, bgc, bb] = hex(bg);
        const bl = lum(br, bgc, bb);
        let ink = 0;
        let contrast = 0;
        for (let i = 0; i < px.length; i += 4) {
          const d = Math.abs(px[i] - br) + Math.abs(px[i + 1] - bgc) + Math.abs(px[i + 2] - bb);
          if (d > 45) ink += 1;
          if (Math.abs(lum(px[i], px[i + 1], px[i + 2]) - bl) > 0.2) contrast += 1;
        }
        legibility[name] = { ink: ink / 441, contrast: contrast / 441 };
      }

      // Coarse reference match at 48 px: silhouette IoU after bbox normalization, hue overlap.
      let match = null;
      if (ref) {
        const refImg = await load(ref);
        const grid = (data, size) => {
          let gx0 = size;
          let gy0 = size;
          let gx1 = -1;
          let gy1 = -1;
          for (let y = 0; y < size; y += 1)
            for (let x = 0; x < size; x += 1)
              if (data[(y * size + x) * 4 + 3] > 150) {
                gx0 = Math.min(gx0, x);
                gy0 = Math.min(gy0, y);
                gx1 = Math.max(gx1, x);
                gy1 = Math.max(gy1, y);
              }
          const n = 16;
          const cells = new Array(n * n).fill(0);
          const w = Math.max(1, gx1 - gx0 + 1);
          const h = Math.max(1, gy1 - gy0 + 1);
          const counts = new Array(n * n).fill(0);
          for (let y = gy0; y <= gy1; y += 1)
            for (let x = gx0; x <= gx1; x += 1) {
              const c = Math.min(n - 1, Math.floor(((y - gy0) / h) * n)) * n + Math.min(n - 1, Math.floor(((x - gx0) / w) * n));
              counts[c] += 1;
              if (data[(y * size + x) * 4 + 3] > 150) cells[c] += 1;
            }
          return cells.map((v, i) => (counts[i] ? v / counts[i] > 0.5 : false));
        };
        const hues = (data) => {
          const bins = new Array(12).fill(0);
          let total = 0;
          for (let i = 0; i < data.length; i += 4) {
            if (data[i + 3] < 150) continue;
            const r = data[i] / 255;
            const g = data[i + 1] / 255;
            const b = data[i + 2] / 255;
            const mx = Math.max(r, g, b);
            const mn = Math.min(r, g, b);
            if (mx < 0.2 || mx - mn < 0.3 * mx) continue;
            let hdeg;
            if (mx === r) hdeg = ((g - b) / (mx - mn)) * 60;
            else if (mx === g) hdeg = (2 + (b - r) / (mx - mn)) * 60;
            else hdeg = (4 + (r - g) / (mx - mn)) * 60;
            bins[Math.floor((((hdeg % 360) + 360) % 360) / 30)] += 1;
            total += 1;
          }
          return { bins: bins.map((v) => (total ? v / total : 0)), total };
        };
        const a = raster(img, 48, null);
        const b = raster(refImg, 48, null);
        const ga = grid(a, 48);
        const gb = grid(b, 48);
        let inter = 0;
        let union = 0;
        ga.forEach((v, i) => {
          if (v && gb[i]) inter += 1;
          if (v || gb[i]) union += 1;
        });
        const ha = hues(a);
        const hb = hues(b);
        const overlap = ha.total && hb.total ? ha.bins.reduce((s, v, i) => s + Math.min(v, hb.bins[i]), 0) : null;
        match = { iou: union ? inter / union : 0, hueOverlap: overlap };
      }
      return { minStroke: Number.isFinite(minStroke) ? minStroke : null, thin, uncased, bounds, legibility, match };
    },
    { svg: icon.svg, refUri, colors: NODE_COLORS },
  );
}

/** Turns measurements into hard failures and soft warnings. */
function judge(m) {
  const fails = [];
  const warns = [];
  const [bx0, by0, bx1, by1] = m.bounds;
  // Shapes end at 2..22, their outline and antialiasing may paint to about 1.4..22.6.
  if (bx0 < 1.3 || by0 < 1.3 || bx1 > 22.7 || by1 > 22.7) fails.push(`painted bounds ${m.bounds.join(', ')} outside the 1.5..22.5 margin`);
  if (m.thin.length) fails.push(`strokes thinner than 0.6: ${m.thin.slice(0, 4).join('; ')}`);
  if (m.uncased.length) warns.push(`${m.uncased.length} light stroke(s) without a dark casing (fine only on a saturated fill)`);
  for (const [name, v] of Object.entries(m.legibility)) {
    if (v.contrast < 0.06) fails.push(`21px on ${name}: low contrast ink ${(v.contrast * 100).toFixed(0)}%`);
    else if (v.contrast < 0.1) warns.push(`21px on ${name}: weak contrast ink ${(v.contrast * 100).toFixed(0)}%`);
    if (v.ink > 0.85) warns.push(`21px on ${name}: fills ${(v.ink * 100).toFixed(0)}% of the badge (blob?)`);
  }
  if (m.match) {
    if (m.match.iou < 0.35) warns.push(`silhouette IoU vs reference ${m.match.iou.toFixed(2)} (check metaphor and framing)`);
    if (m.match.hueOverlap !== null && m.match.hueOverlap < 0.25) warns.push(`hue overlap vs reference ${m.match.hueOverlap.toFixed(2)} (check colors)`);
  }
  return { fails, warns };
}

const icons = await renderIcons();
if (!icons.length) {
  console.error('No icons selected.');
  process.exit(1);
}
const refPath = path.join(ROOT, 'local-refs', 'houdini_ref_icons.json');
const refs = existsSync(refPath) ? JSON.parse(readFileSync(refPath, 'utf8')) : {};
if (!existsSync(refPath)) console.warn('local-refs/houdini_ref_icons.json not found: reference columns and matching are skipped.');
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ deviceScaleFactor: 1 });
await page.setContent('<html><body></body></html>');
const results = [];
for (const icon of icons) {
  const refUri = icon.refKey ? refs[icon.refKey] : undefined;
  const m = await measure(page, icon, refUri);
  const verdict = judge(m);
  verdict.fails.unshift(...staticChecks(icon));
  results.push({ id: icon.id, label: icon.label, refKey: icon.refKey, ...m, ...verdict, svg: icon.svg, refUri });
}

const cell = (src, size, bg) =>
  `<div style="background:${bg};width:${size + 10}px;height:${size + 10}px;display:flex;align-items:center;justify-content:center">${src ? `<img src="${src}" width="${size}" height="${size}">` : '<span style="font:10px sans-serif;color:#777">n/a</span>'}</div>`;
const sheets = [];
for (let i = 0; i < results.length; i += ROWS_PER_SHEET) {
  const rows = results.slice(i, i + ROWS_PER_SHEET).map((r) => {
    const ours = `data:image/svg+xml;utf8,${encodeURIComponent(r.svg)}`;
    const status = r.fails.length ? `<b style="color:#c62828">FAIL</b>` : r.warns.length ? `<b style="color:#b26a00">WARN</b>` : `<b style="color:#2e7d32">PASS</b>`;
    const notes = [...r.fails, ...r.warns].map((n) => `<div>${n}</div>`).join('');
    const iou = r.match ? `IoU ${r.match.iou.toFixed(2)} hue ${r.match.hueOverlap === null ? '-' : r.match.hueOverlap.toFixed(2)}` : '';
    return `<div style="display:flex;gap:4px;align-items:center;margin-bottom:4px;font:11px sans-serif">
      <div style="width:170px"><div><b>${r.id}</b></div><div>${status} ${iou}</div></div>
      ${cell(r.refUri, 48, NODE_COLORS.light)}${cell(ours, 48, NODE_COLORS.light)}${cell(ours, 48, NODE_COLORS.dark)}
      ${cell(ours, 21, NODE_COLORS.light)}${cell(ours, 21, NODE_COLORS.dark)}${cell(ours, 21, NODE_COLORS.saturated)}${cell(r.refUri, 21, NODE_COLORS.light)}
      <div style="width:330px;font-size:10px;color:#333">${notes}</div></div>`;
  });
  await page.setContent(`<html><body style="margin:6px;background:#fff;width:880px">${rows.join('')}</body></html>`);
  await page.waitForTimeout(100);
  const file = path.join(OUT, `sheet-${sheets.length}.png`);
  await page.screenshot({ path: file, fullPage: true });
  sheets.push(file);
}
await browser.close();

const lean = results.map((r) => Object.fromEntries(Object.entries(r).filter(([k]) => k !== 'svg' && k !== 'refUri')));
writeFileSync(path.join(OUT, 'report.json'), JSON.stringify(lean, null, 2));
const md = [
  `# Icon pre-screen (${results.length} icons)`,
  '',
  '| Icon | Result | IoU | Hue | 21px contrast light / dark / saturated | Notes |',
  '| --- | --- | --- | --- | --- | --- |',
  ...lean.map((r) => {
    const res = r.fails.length ? 'FAIL' : r.warns.length ? 'WARN' : 'PASS';
    const l = r.legibility;
    const pct = (v) => `${Math.round(v.contrast * 100)}%`;
    return `| ${r.id} | ${res} | ${r.match ? r.match.iou.toFixed(2) : '-'} | ${r.match && r.match.hueOverlap !== null ? r.match.hueOverlap.toFixed(2) : '-'} | ${pct(l.light)} / ${pct(l.dark)} / ${pct(l.saturated)} | ${[...r.fails, ...r.warns].join('; ')} |`;
  }),
].join('\n');
writeFileSync(path.join(OUT, 'report.md'), `${md}\n`);

const failed = lean.filter((r) => r.fails.length);
const warned = lean.filter((r) => !r.fails.length && r.warns.length);
console.log(`${lean.length} icons: ${lean.length - failed.length - warned.length} pass, ${warned.length} warn, ${failed.length} fail`);
for (const r of [...failed, ...warned]) console.log(`  ${r.fails.length ? 'FAIL' : 'WARN'} ${r.id}: ${[...r.fails, ...r.warns].join('; ')}`);
console.log(`Contact sheets: ${sheets.join(', ')}`);
if (STRICT && failed.length) process.exit(1);
