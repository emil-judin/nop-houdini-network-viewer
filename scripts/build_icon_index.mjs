// Writes src/components/nodes/icons/sop/iconIndex.generated.ts: which SOP icon domain holds which
// operator type, icon id and drawing id. The viewer reads it to load only the domains a network uses.
// Run after adding, removing or retyping a SOP drawing (the nop-icon-pipeline go-live step runs it):
//   npm run icons:index
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { format, resolveConfig } from 'prettier';
import { createServer } from 'vite';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOP_DIR = '/src/components/nodes/icons/sop';
const OUT_FILE = path.join(ROOT, 'src/components/nodes/icons/sop/iconIndex.generated.ts');

const server = await createServer({
  root: ROOT,
  configFile: false,
  logLevel: 'error',
  appType: 'custom',
  server: { middlewareMode: true, hmr: false, ws: false },
});
try {
  const { SOP_ICONS_BY_DOMAIN } = await server.ssrLoadModule(`${SOP_DIR}/index.ts`);
  const { buildSopIconIndex, renderSopIconIndexModule } = await server.ssrLoadModule(`${SOP_DIR}/iconIndexBuilder.ts`);
  const index = buildSopIconIndex(SOP_ICONS_BY_DOMAIN);
  const source = renderSopIconIndexModule(index);
  const options = (await resolveConfig(OUT_FILE)) ?? {};
  await writeFile(OUT_FILE, await format(source, { ...options, filepath: OUT_FILE }));
  const counts = Object.entries(index).map(
    ([domain, keys]) => `${domain} ${keys.types.split(' ').filter(Boolean).length}`,
  );
  console.log(`Wrote ${path.relative(ROOT, OUT_FILE)} (types per domain: ${counts.join(', ')})`);
} finally {
  await server.close();
}
