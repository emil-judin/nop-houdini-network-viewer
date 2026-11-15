import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join } from 'node:path';
import { describe, expect, it } from 'vitest';

/** Every file below `dir`. */
function listFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? listFiles(path) : [path];
  });
}

const TEXT_FILES = new Set(['.js', '.mjs', '.cjs', '.css', '.html', '.json', '.svg', '.map', '.txt', '.md', '.ts']);

/** SideFX reference icons live in the gitignored `local-refs/` folder and are only served by the dev server. */
const REFERENCE_MARKERS = ['local-refs/', '__local_houdini_ref_icons'];

// Checks the builds when they exist (CI runs the builds after the unit tests, so locally only)
describe.each(['dist', 'dist-playground'].filter((dir) => existsSync(dir)))('NOP-EMB-045: the %s build', (dir) => {
  it('NOP-EMB-045: contains no SideFX reference icon data', () => {
    const found = listFiles(dir)
      .filter((file) => TEXT_FILES.has(extname(file)))
      .filter((file) => REFERENCE_MARKERS.some((marker) => readFileSync(file, 'utf8').includes(marker)));
    expect(found).toEqual([]);
  });
});
