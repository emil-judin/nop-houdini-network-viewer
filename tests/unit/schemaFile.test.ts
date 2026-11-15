import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import Ajv2020 from 'ajv/dist/2020';
import { describe, expect, it } from 'vitest';
import schema from '../../schema/nop-network-1.schema.json';
import { normalizeNetworkDocument } from '../../src/schema/normalize';

const ajv = new Ajv2020({ allErrors: true, strict: false });
const validate = ajv.compile(schema);

const readJson = (path: string) => JSON.parse(readFileSync(path, 'utf8')) as unknown;

describe('D-21: JSON Schema for exports', () => {
  // Every real Houdini export: the six guided examples
  const exports = readdirSync('fixtures/examples')
    .filter((name) => name.endsWith('-network.json'))
    .map((name) => join('fixtures/examples', name));

  it('finds the six example exports', () => {
    expect(exports).toHaveLength(6);
  });

  it.each(exports)('%s matches the schema', (file) => {
    const valid = validate(readJson(file));
    expect(validate.errors ?? []).toEqual([]);
    expect(valid).toBe(true);
  });

  it('rejects the malformed fixture', () => {
    expect(validate(readJson('fixtures/edge-cases/malformed.json'))).toBe(false);
  });

  it('every normalized edge-case fixture matches the schema', () => {
    const dir = 'fixtures/edge-cases';
    for (const name of readdirSync(dir)) {
      if (name === 'schema-2.json') continue;
      const doc = normalizeNetworkDocument(readJson(join(dir, name)));
      expect(validate(JSON.parse(JSON.stringify(doc))), `${name}: ${ajv.errorsText(validate.errors)}`).toBe(true);
    }
  });
});
