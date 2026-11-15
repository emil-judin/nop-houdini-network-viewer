import { spawnSync } from 'node:child_process';

/**
 * Runs the real exporter on the sample network of `exporter/tests/sample_network.py` (fake `hou`) and
 * returns its JSON document. Needs Python 3.9+ as `python`, or the interpreter named in `PYTHON`.
 */
export function exportSampleNetwork(): unknown {
  const python = process.env.PYTHON ?? 'python';
  const result = spawnSync(python, ['exporter/tests/sample_network.py'], { encoding: 'utf8', timeout: 30_000 });
  if (result.error) throw new Error(`Could not start ${python}: ${result.error.message}`);
  if (result.status !== 0) throw new Error(`The sample export failed:\n${result.stderr}`);
  return JSON.parse(result.stdout) as unknown;
}
