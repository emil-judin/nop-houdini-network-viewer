import { existsSync, readFileSync } from 'node:fs';
import postcss from 'postcss';
import { beforeAll, describe, expect, it } from 'vitest';
import { scopeSelector } from '../../vite.lib.config';

describe('scopeSelector (npm stylesheet scoping)', () => {
  it.each([
    [':root', '.nop-root'],
    [':host', '.nop-root'],
    ['.nop-root', '.nop-root.nop-root'],
    ['.nop-root .x', '.nop-root.nop-root .x'],
    ['svg path', '.nop-root svg path'],
    ['*', ':is(.nop-root, .nop-root *)'],
    ['button', '.nop-root button'],
    ['.flex', ':is(.nop-root, .nop-root *).flex'],
    ['.react-flow__node:focus-visible', ':is(.nop-root, .nop-root *).react-flow__node:focus-visible'],
  ])('NOP-EMB-042: %s becomes %s', (selector, scoped) => {
    expect(scopeSelector(selector)).toBe(scoped);
  });
});

// Checks the built file when it exists (CI runs `npm run build:lib` before the tests). The file is read in
// `beforeAll`: the body of a skipped `describe` still runs while Vitest collects the tests
describe.runIf(existsSync('dist/style.css'))('built dist/style.css', () => {
  let root: postcss.Root;
  beforeAll(() => {
    root = postcss.parse(readFileSync('dist/style.css', 'utf8'));
  });

  it('NOP-EMB-044: every rule outside keyframes and nested "&" rules is scoped to .nop-root', () => {
    const unscoped: string[] = [];
    root.walkRules((rule) => {
      const parent = rule.parent;
      if (parent?.type === 'atrule' && /keyframes$/i.test((parent as postcss.AtRule).name)) return;
      if (rule.selector.includes('&')) return;
      for (const selector of rule.selectors) {
        if (!selector.includes('.nop-root')) unscoped.push(selector);
      }
    });
    expect(unscoped).toEqual([]);
  });

  it('P-05: fonts are separate files, not inlined', () => {
    const css = readFileSync('dist/style.css', 'utf8');
    expect(css).not.toContain('data:font/woff2');
    expect(css).toMatch(/url\(\.\/fonts\/nop-[0-9a-f]+\.woff2\)/);
  });
});
