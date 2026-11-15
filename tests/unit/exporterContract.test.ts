import Ajv2020 from 'ajv/dist/2020';
import { beforeAll, describe, expect, it } from 'vitest';
import schema from '../../schema/nop-network-1.schema.json';
import { normalizeNetworkDocument, SUPPORTED_SCHEMA_MAJOR } from '../../src/schema/normalize';
import type { HoudiniNetworkDocument } from '../../src/schema/types';
import { exportSampleNetwork } from './exporterSample';

describe('NOP-EXP-050: a fresh export is what the viewer expects', () => {
  let exported: HoudiniNetworkDocument;

  beforeAll(() => {
    exported = exportSampleNetwork() as HoudiniNetworkDocument;
  });

  it('NOP-EXP-050: matches the JSON Schema', () => {
    const validate = new Ajv2020({ allErrors: true, strict: false }).compile(schema);
    validate(exported);
    expect(validate.errors ?? []).toEqual([]);
  });

  it('NOP-EXP-050: the viewer reads it without repairing or dropping anything', () => {
    expect(normalizeNetworkDocument(exported)).toEqual(exported);
  });

  it('NOP-EXP-050: the exporter writes a schema major version the viewer supports', () => {
    expect(Number.parseInt(exported.schemaVersion ?? '', 10)).toBe(SUPPORTED_SCHEMA_MAJOR);
  });
});
