import { describe, expect, it } from 'vitest';
import type { Edge } from '@xyflow/react';
import { buildWireIndex, getConnectedWireIds } from '../../src/schema/connectedWires';
import { getHoudiniWirePath } from '../../src/components/edges/wirePaths';

/** Every `x,y` point of an SVG path string. */
function points(d: string): Array<[number, number]> {
  return [...d.matchAll(/(-?[\d.]+),(-?[\d.]+)/g)].map((m) => [Number(m[1]), Number(m[2])]);
}

describe('wire paths', () => {
  it('NOP-WIRE-001: default style leaves and enters straight down with rounded bends', () => {
    const d = getHoudiniWirePath('default', 0, 0, 200, 300);
    expect(d.startsWith('M0,0 L0,')).toBe(true);
    expect(d).toContain('Q');
    expect(d.endsWith('L200,300')).toBe(true);
  });

  it('NOP-WIRE-002: rounded style shares one horizontal run below an output', () => {
    const left = getHoudiniWirePath('rounded', 0, 0, -200, 300);
    const right = getHoudiniWirePath('rounded', 0, 0, 200, 300);
    const runY = (d: string) => points(d)[2][1];
    expect(runY(left)).toBe(runY(right));
    expect(left).toContain('A');
    expect(right).toContain('A');
  });

  it('NOP-WIRE-003: wires into a dot head straight to its center', () => {
    const d = getHoudiniWirePath('default', 0, 0, 200, 300, false, true);
    expect(d.endsWith('L200,300')).toBe(true);
    expect(d.match(/Q/g)).toHaveLength(1);
  });

  it.each(['default', 'rounded'] as const)('NOP-WIRE-004: a vertical %s wire is a straight line', (style) => {
    const d = getHoudiniWirePath(style, 100, 0, 100, 300);
    expect(points(d).every(([x]) => x === 100)).toBe(true);
  });
});

describe('getConnectedWireIds', () => {
  const edge = (id: string, source: string, target: string): Edge => ({ id, source, target });
  const edges = [
    edge('a-d1', 'a', 'dot:1'),
    edge('d1-d2', 'dot:1', 'dot:2'),
    edge('d2-b', 'dot:2', 'b'),
    edge('b-c', 'b', 'c'),
    edge('x-a', 'x', 'a'),
  ];
  const dots = new Set(['dot:1', 'dot:2']);

  it('NOP-WIRE-011: follows wires through routing dots and stops at operator nodes', () => {
    expect([...getConnectedWireIds('a', edges, dots)].sort()).toEqual(['a-d1', 'd1-d2', 'd2-b', 'x-a']);
  });

  it('gives the same result with a prebuilt index', () => {
    const index = buildWireIndex(edges);
    expect(getConnectedWireIds('b', index, dots)).toEqual(getConnectedWireIds('b', edges, dots));
  });

  it('P-06: stays fast on a long chain of dots', () => {
    const chain: Edge[] = [];
    const chainDots = new Set<string>();
    for (let i = 0; i < 20000; i++) {
      chainDots.add(`dot:${i}`);
      chain.push(edge(`e${i}`, i === 0 ? 'start' : `dot:${i - 1}`, `dot:${i}`));
    }
    const started = performance.now();
    const ids = getConnectedWireIds('start', buildWireIndex(chain), chainDots);
    expect(ids.size).toBe(20000);
    expect(performance.now() - started).toBeLessThan(500);
  });
});
