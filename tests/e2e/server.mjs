/**
 * Static server for the Playwright browser tests (started by `playwright.config.ts`):
 *
 * - `http://localhost:4173/`          the built playground (`dist-playground/`)
 * - `http://localhost:4173/lib/`      the library build (`dist/`: web component, chunks, fonts)
 * - `http://localhost:4173/fixtures/` network files (`fixtures/`)
 * - `http://localhost:4173/host/`     test host pages (`tests/e2e/host/`)
 *
 * The same files are also served on port 4174, a second origin, for cross-site cases (CORS is
 * allowed there, like on a GitHub Gist raw link). Build first: `npm run build && npm run build:lib`.
 */
import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('../../', import.meta.url));
const MOUNTS = [
  ['/lib/', join(ROOT, 'dist')],
  ['/fixtures/', join(ROOT, 'fixtures')],
  ['/host/', join(ROOT, 'tests', 'e2e', 'host')],
  ['/', join(ROOT, 'dist-playground')],
];
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.webmanifest': 'application/manifest+json',
  '.map': 'application/json',
  '.zip': 'application/zip',
  '.py': 'text/plain; charset=utf-8',
};

/** Resolves a URL path to a file inside one of the mounted folders, or `null`. */
function resolveFile(urlPath) {
  for (const [prefix, folder] of MOUNTS) {
    if (!urlPath.startsWith(prefix)) continue;
    const relative = decodeURIComponent(urlPath.slice(prefix.length)) || 'index.html';
    const file = normalize(join(folder, relative));
    if (!file.startsWith(folder + sep) && file !== folder) return null;
    if (existsSync(file) && statSync(file).isFile()) return file;
    return null;
  }
  return null;
}

function serve(port, { cors }) {
  createServer((request, response) => {
    const url = new URL(request.url ?? '/', `http://localhost:${port}`);
    // A response that never ends, for the download time limit
    if (url.pathname === '/slow.json') return;
    const file = resolveFile(url.pathname);
    if (cors) response.setHeader('Access-Control-Allow-Origin', '*');
    if (!file) {
      response.writeHead(404, { 'Content-Type': 'text/plain' });
      response.end('Not found');
      return;
    }
    response.writeHead(200, { 'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream' });
    createReadStream(file).pipe(response);
  }).listen(port, () => console.log(`NOP test server on http://localhost:${port}/`));
}

serve(4173, { cors: false });
serve(4174, { cors: true });
