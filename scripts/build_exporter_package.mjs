/**
 * Builds the downloadable NOP exporter for the playground (`public/downloads/`, gitignored):
 *
 * - `nop-exporter.zip`: the Houdini package. Unzipped into the Houdini `packages` folder, it gives
 *   `packages/nop.json` and `packages/nop/` (shelf, icon, `scripts/python/nop_exporter.py`).
 * - `nop_exporter.py`: the plain script, for the manual shelf tool setup in `exporter/README.md`.
 *
 * Runs before `npm.cmd run dev` and `npm.cmd run build`. Plain Node, no dependencies: the zip is
 * written by hand (deflate from `node:zlib`).
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { deflateRawSync } from 'node:zlib';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const PACKAGE_DIR = join(ROOT, 'exporter', 'package');
const EXPORTER_SCRIPT = join(ROOT, 'exporter', 'nop_exporter.py');
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

/**
 * Time stamp for every zip entry, so the same sources always give the same zip (reproducible builds):
 * `SOURCE_DATE_EPOCH` if set, else the time of the last git commit, else a fixed date.
 */
function buildTime() {
  const fromEnv = Number(process.env.SOURCE_DATE_EPOCH);
  if (Number.isFinite(fromEnv) && fromEnv > 0) return new Date(fromEnv * 1000);
  try {
    const seconds = Number(execFileSync('git', ['log', '-1', '--format=%ct'], { cwd: ROOT, encoding: 'utf8' }).trim());
    if (Number.isFinite(seconds) && seconds > 0) return new Date(seconds * 1000);
  } catch {
    // Not a git checkout (for example a source download): use the fixed date below
  }
  return new Date(Date.UTC(2026, 0, 1));
}

/** Writes a zip archive (deflate) from `[path, Buffer]` entries. */
function buildZip(entries, time) {
  const dosTime = (time.getUTCHours() << 11) | (time.getUTCMinutes() << 5) | Math.floor(time.getUTCSeconds() / 2);
  const dosDate = ((time.getUTCFullYear() - 1980) << 9) | ((time.getUTCMonth() + 1) << 5) | time.getUTCDate();
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
// Sorted, so the entry order does not depend on the file system
const entries = listFiles(PACKAGE_DIR).sort().map((path) => {
  let data = readFileSync(join(PACKAGE_DIR, path));
  if (path.endsWith('README.txt')) data = Buffer.from(data.toString('utf8').replaceAll('{{VERSION}}', version));
  return [path, data];
});
entries.push(['nop/scripts/python/nop_exporter.py', exporterScript]);

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(join(OUT_DIR, 'nop-exporter.zip'), buildZip(entries, buildTime()));
writeFileSync(join(OUT_DIR, 'nop_exporter.py'), exporterScript);
console.log(`NOP exporter ${version}: ${entries.length} files -> public/downloads/nop-exporter.zip`);
