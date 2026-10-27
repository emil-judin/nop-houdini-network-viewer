/**
 * Prints the Subresource Integrity hash of the built web component, for the README, the CHANGELOG
 * and the Embed dialog at release time:
 *
 *   npm.cmd run build:lib
 *   npm.cmd run sri
 *
 * Embedders then pin the exact bytes they load from the CDN:
 *   <script type="module" src=".../web-component.js" integrity="sha384-..." crossorigin="anonymous"></script>
 *
 * The on-demand chunks (`dist/web-component-chunks/`) and fonts are listed too. Browsers check
 * `integrity` only for the file the tag loads, so the version in the URL must stay pinned.
 */
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = fileURLToPath(new URL('../dist/', import.meta.url));
const ENTRY = join(DIST, 'web-component.js');

if (!existsSync(ENTRY)) {
  console.error('dist/web-component.js is missing. Run `npm.cmd run build:lib` first.');
  process.exit(1);
}

const sri = (file) => `sha384-${createHash('sha384').update(readFileSync(file)).digest('base64')}`;

console.log(`web-component.js  ${sri(ENTRY)}`);
for (const folder of ['web-component-chunks', 'fonts']) {
  const dir = join(DIST, folder);
  if (!existsSync(dir)) continue;
  for (const name of readdirSync(dir).filter((n) => !n.endsWith('.map')).sort()) {
    console.log(`${folder}/${name}  ${sri(join(dir, name))}`);
  }
}
