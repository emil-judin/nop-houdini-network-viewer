import { describe, expect, it } from 'vitest';
import { highlightCode } from '../../src/components/inspector/codeHighlight';

const kinds = (code: string, language: 'vex' | 'python') =>
  highlightCode(code, language)
    .filter((t) => t.text.trim())
    .map((t) => [t.text.trim(), t.kind]);

describe('highlightCode', () => {
  it('NOP-INSP-040: keeps the code text exactly', () => {
    const code = 'int n = npoints(0); // count\nf@x = 1.5 * n;\n';
    expect(highlightCode(code, 'vex').map((t) => t.text).join('')).toBe(code);
  });

  it('NOP-INSP-041: marks comments, strings and numbers in VEX', () => {
    const tokens = kinds('// note\ns@name = "a"; f@x = 2.5;', 'vex');
    expect(tokens).toContainEqual(['// note', 'comment']);
    expect(tokens).toContainEqual(['"a"', 'string']);
    expect(tokens.find(([text]) => text === '2.5')?.[1]).toBe('number');
  });

  it('NOP-INSP-042: marks Python comments and strings', () => {
    const tokens = kinds("# setup\nnode = hou.pwd()\nname = 'box'", 'python');
    expect(tokens).toContainEqual(['# setup', 'comment']);
    expect(tokens).toContainEqual(["'box'", 'string']);
  });

  it.each([
    ['v@P.y += 1;', 'v@P', 'attribute'],
    ['i[]@ids = array();', 'i[]@ids', 'attribute'],
    ['float x = fit01(rand(1));', 'float', 'type'],
    ['float x = fit01(rand(1));', 'fit01', 'function'],
    ['if (x) return;', 'if', 'keyword'],
    ['// done', '// done', 'comment'],
    ['#include "math.h"', '#include', 'preprocessor'],
    ['x = 1.5e3f;', '1.5e3f', 'number'],
  ])('NOP-INSP-041: in the VEX code %j, %j is a %s token', (code, token, kind) => {
    expect(kinds(code, 'vex')).toContainEqual([token, kind]);
  });

  it.each([
    ['def f(self): pass', 'def', 'keyword'],
    ['x = None', 'None', 'constant'],
    ['@property', '@property', 'preprocessor'],
    ['s = """doc"""', '"""doc"""', 'string'],
  ])('NOP-INSP-042: in the Python code %j, %j is a %s token', (code, token, kind) => {
    expect(kinds(code, 'python')).toContainEqual([token, kind]);
  });

  it('NOP-INSP-043 and P-01: highlights a 200 KB snippet in linear time', () => {
    const line = 'float value_with_long_name = some_function(other_value, 1.25) + another_identifier;\n';
    const code = line.repeat(Math.ceil(200_000 / line.length));
    const started = performance.now();
    const tokens = highlightCode(code, 'vex');
    expect(tokens.length).toBeGreaterThan(1000);
    // The old quadratic version took many seconds here
    expect(performance.now() - started).toBeLessThan(2000);
  });
});
