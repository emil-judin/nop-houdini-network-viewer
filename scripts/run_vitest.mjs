/**
 * Starts Vitest (`npm.cmd test`) from the project folder spelled as the file system spells it.
 *
 * A Windows terminal opened in `c:\...` with a lower-case drive letter (VS Code does that) makes
 * Vitest load its runner twice, once per spelling of the path, and then every suite fails with
 * "Vitest failed to find the current suite" or "Cannot read properties of undefined (reading
 * 'config')". The native real path has the drive letter as Windows spells it, so Vitest sees one
 * spelling only. Other systems are unaffected. Arguments are passed on to Vitest.
 */
import { spawnSync } from 'node:child_process';
import { realpathSync } from 'node:fs';
import { join } from 'node:path';

const cwd = realpathSync.native(process.cwd());
// The CLI file is not in the package's exports, so it is found by its path
const vitestCli = join(cwd, 'node_modules', 'vitest', 'vitest.mjs');
const result = spawnSync(process.execPath, [vitestCli, ...process.argv.slice(2)], { cwd, stdio: 'inherit' });
process.exit(result.status ?? 1);
