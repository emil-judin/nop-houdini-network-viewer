import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import Ajv2020 from 'ajv/dist/2020';
import { describe, expect, it } from 'vitest';
import schema from '../../schema/nop-network-1.schema.json';
import { normalizeNetworkDocument } from '../../src/schema/normalize';

/**
 * Exports made in a real Houdini session by `npm run test:exporter:houdini`, which sets this folder.
 * Without it (a plain `npm test`) these tests are skipped.
 */
const EXPORT_DIR = process.env.NOP_HOUDINI_EXPORT_DIR;
const files = EXPORT_DIR ? readdirSync(EXPORT_DIR).filter((name) => name.endsWith('.json')).sort() : [];

describe.runIf(EXPORT_DIR)('NOP-EXP-050: exports from a real Houdini session are what the viewer expects', () => {
  const validate = new Ajv2020({ allErrors: true, strict: false }).compile(schema);
  const read = (file: string): unknown => JSON.parse(readFileSync(join(EXPORT_DIR ?? '', file), 'utf8'));

  it('NOP-EXP-050: the Houdini session wrote its exports', () => {
    expect(files.length).toBeGreaterThan(0);
  });

  for (const file of files) {
    it(`NOP-EXP-050: ${file} matches the JSON Schema`, () => {
      validate(read(file));
      expect(validate.errors ?? []).toEqual([]);
    });

    it(`NOP-EXP-050: the viewer reads ${file} without repairing or dropping anything`, () => {
      const exported = read(file);
      expect(normalizeNetworkDocument(exported)).toEqual(exported);
    });
  }
});
