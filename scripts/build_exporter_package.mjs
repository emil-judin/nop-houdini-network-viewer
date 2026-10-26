/**
 * Builds the downloadable WOP exporter for the playground (`public/downloads/`, gitignored):
 *
 * - `wop-exporter.zip`: the Houdini package. Unzipped into the Houdini `packages` folder, it gives
 *   `packages/wop.json` and `packages/wop/` (shelf, icon, `scripts/python/wop_exporter.py`).
 * - `wop_exporter.py`: the plain script, for the manual shelf tool setup in `exporter/README.md`.
 *
 * Runs before `npm.cmd run dev` and `npm.cmd run build`. Plain Node, no dependencies: the zip is
 * written by hand (deflate from `node:zlib`).
 */
import { mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { deflateRawSync } from 'node:zlib';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const PACKAGE_DIR = join(ROOT, 'exporter', 'package');
const EXPORTER_SCRIPT = join(ROOT, 'exporter', 'wop_exporter.py');
const OUT_DIR = join(ROOT, 'public', 'downloads');
const { version } = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));

/** Lists every file below `dir`, as paths relative to `base` with forward slashes. */
function listFiles(dir, base = dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? listFiles(full, base) : [relative(base, full).split('\\').join('/')];
  });
}

const CRC_TABLE = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) crc = CRC_TABLE[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

/** Writes a zip archive (deflate) from `[path, Buffer]` entries. */
function buildZip(entries) {
  const now = new Date();
  const dosTime = (now.getHours() << 11) | (now.getMinutes() << 5) | Math.floor(now.getSeconds() / 2);
  const dosDate = ((now.getFullYear() - 1980) << 9) | ((now.getMonth() + 1) << 5) | now.getDate();
  const localParts = [];
  const centralParts = [];
  let offset = 0;

  for (const [path, data] of entries) {
    const name = Buffer.from(path, 'utf8');
    const compressed = deflateRawSync(data, { level: 9 });
    const crc = crc32(data);

    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4); // version needed to extract
    local.writeUInt16LE(0x0800, 6); // UTF-8 file names
    local.writeUInt16LE(8, 8); // deflate
    local.writeUInt16LE(dosTime, 10);
    local.writeUInt16LE(dosDate, 12);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(compressed.length, 18);
    local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(name.length, 26);
    localParts.push(local, name, compressed);

    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE(20, 4); // version made by
    central.writeUInt16LE(20, 6);
    central.writeUInt16LE(0x0800, 8);
    central.writeUInt16LE(8, 10);
    central.writeUInt16LE(dosTime, 12);
    central.writeUInt16LE(dosDate, 14);
    central.writeUInt32LE(crc, 16);
    central.writeUInt32LE(compressed.length, 20);
    central.writeUInt32LE(data.length, 24);
    central.writeUInt16LE(name.length, 28);
    central.writeUInt32LE(offset, 42);
    centralParts.push(central, name);

    offset += local.length + name.length + compressed.length;
  }

  const centralSize = centralParts.reduce((sum, part) => sum + part.length, 0);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(entries.length, 8);
  end.writeUInt16LE(entries.length, 10);
  end.writeUInt32LE(centralSize, 12);
  end.writeUInt32LE(offset, 16);
  return Buffer.concat([...localParts, ...centralParts, end]);
}

const exporterScript = readFileSync(EXPORTER_SCRIPT);
const entries = listFiles(PACKAGE_DIR).map((path) => {
  let data = readFileSync(join(PACKAGE_DIR, path));
  if (path.endsWith('README.txt')) data = Buffer.from(data.toString('utf8').replaceAll('{{VERSION}}', version));
  return [path, data];
});
entries.push(['wop/scripts/python/wop_exporter.py', exporterScript]);

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(join(OUT_DIR, 'wop-exporter.zip'), buildZip(entries));
writeFileSync(join(OUT_DIR, 'wop_exporter.py'), exporterScript);
console.log(`WOP exporter ${version}: ${entries.length} files -> public/downloads/wop-exporter.zip`);
