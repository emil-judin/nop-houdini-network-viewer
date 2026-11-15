/**
 * Exporter tests in a real Houdini session (`npm run test:exporter:houdini`).
 *
 * 1. Finds hython: `HYTHON` if set, else the newest Houdini installed in the usual place.
 * 2. Runs `exporter/tests/houdini_session.py` in it, which builds networks with real Houdini nodes,
 *    exports them and checks the result, and writes every export to a temporary folder.
 * 3. Checks those exports against the JSON Schema and the viewer's normalizer
 *    (`tests/unit/houdiniExportContract.test.ts`).
 *
 * Needs a Houdini license; it takes a few minutes. Run it before committing a change to the exporter.
 */
import { spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

/** Install folders to search, each with the path of hython inside a Houdini folder. */
const INSTALLS = {
  win32: { root: 'C:/Program Files/Side Effects Software', folder: /^Houdini (\d+)\.(\d+)\.(\d+)$/, hython: 'bin/hython.exe' },
  darwin: {
    root: '/Applications/Houdini',
    folder: /^Houdini(\d+)\.(\d+)\.(\d+)$/,
    hython: 'Frameworks/Houdini.framework/Versions/Current/Resources/bin/hython',
  },
  linux: { root: '/opt', folder: /^hfs(\d+)\.(\d+)\.(\d+)$/, hython: 'bin/hython' },
};

/** hython of the newest installed Houdini, or `undefined`. */
function findHython() {
  if (process.env.HYTHON) return process.env.HYTHON;
  const install = INSTALLS[process.platform];
  if (!install || !existsSync(install.root)) return undefined;
  const versions = readdirSync(install.root)
    .map((name) => ({ name, match: install.folder.exec(name) }))
    .filter(({ name, match }) => match && existsSync(join(install.root, name, install.hython)))
    .map(({ name, match }) => ({ name, version: match.slice(1).map(Number) }))
    .sort((a, b) => b.version[0] - a.version[0] || b.version[1] - a.version[1] || b.version[2] - a.version[2]);
  return versions.length ? join(install.root, versions[0].name, install.hython) : undefined;
}

const hython = findHython();
if (!hython || !existsSync(hython)) {
  console.error(
    hython
      ? `HYTHON points to ${hython}, which does not exist.`
      : 'No Houdini found. Install Houdini, or set HYTHON to the path of its hython executable.',
  );
  process.exit(1);
}

const exportDir = mkdtempSync(join(tmpdir(), 'nop-houdini-exports-'));
const env = { ...process.env, NOP_HOUDINI_EXPORT_DIR: exportDir };
let status = 1;
try {
  console.log(`Exporter tests in ${hython}`);
  const session = spawnSync(hython, ['exporter/tests/houdini_session.py'], { stdio: 'inherit', env });
  if (session.error) throw session.error;
  status = session.status ?? 1;
  if (status === 0) {
    console.log('\nChecking the exports against the JSON Schema and the viewer');
    const contract = spawnSync(process.execPath, ['scripts/run_vitest.mjs', 'run', 'tests/unit/houdiniExportContract.test.ts'], {
      stdio: 'inherit',
      env,
    });
    status = contract.status ?? 1;
  }
} finally {
  rmSync(exportDir, { recursive: true, force: true });
}
process.exit(status);
