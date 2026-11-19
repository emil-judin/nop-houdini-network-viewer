import { readdirSync, readFileSync } from 'node:fs';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { DEFAULT_OPERATOR_ICON } from '../../src/components/nodes/icons/defaultIcon';
import {
  areLabsIconsLoaded,
  loadAllOperatorIcons,
  needsLabsIcon,
  OPERATOR_ICONS,
  resolveOperatorIcon,
} from '../../src/components/nodes/icons/iconRegistry';
import { LABS_BUILTIN_ICON_ALIASES } from '../../src/components/nodes/icons/labs';
import { LABS_NODE_CATALOG } from '../../src/components/nodes/icons/labs/labsNodeCatalog';
import { PATH_ICONS } from '../../src/components/nodes/icons/path/pathIcons';
import { SOP_ICONS, SOP_ICONS_BY_DOMAIN } from '../../src/components/nodes/icons/sop';
import { SOP_ICON_INDEX } from '../../src/components/nodes/icons/sop/iconIndex.generated';
import { buildSopIconIndex } from '../../src/components/nodes/icons/sop/iconIndexBuilder';
import type { SopIconDomain } from '../../src/components/nodes/icons/sop/domains';

describe('icon registry before the Labs drawings load', () => {
  it('P-03: knows which operators need the Labs drawings', () => {
    expect(needsLabsIcon('labs::thicken::1.0')).toBe(true);
    expect(needsLabsIcon('emjud::x::1.0', 'opdef:/labs::Sop/flowmap::1.0?IconSVG')).toBe(true);
    expect(needsLabsIcon('box', 'SOP_box')).toBe(false);
  });
});

describe('icon registry', () => {
  beforeAll(async () => {
    await loadAllOperatorIcons();
  });

  it('loads the Labs drawings and the SOP domains once', async () => {
    expect(areLabsIconsLoaded()).toBe(true);
    const count = OPERATOR_ICONS.length;
    expect(count).toBe(SOP_ICONS.length + OPERATOR_ICONS.filter((def) => def.family === 'labs').length);
    await loadAllOperatorIcons();
    expect(OPERATOR_ICONS.length).toBe(count);
  });

  it('NOP-ICON-010: the icon index matches the drawings (after changing them, run npm run icons:index)', () => {
    expect(SOP_ICON_INDEX).toEqual(buildSopIconIndex(SOP_ICONS_BY_DOMAIN));
  });

  it.each([
    ['box', 'SOP_box', false, 'sop.box'],
    ['copytopoints::2.0', 'SOP_copytopoints-2.0', false, 'sop.copytopoints'],
    ['labs::flowmap::1.0', 'opdef:/labs::Sop/flowmap::1.0?IconSVG', false, 'labs.flowmap'],
    ['subdivide', 'SOP_subdivide', false, 'sop.subdivide'],
    ['divide', 'SOP_divide', false, 'sop.divide'],
    ['emjud::pebble_scatter::1.0', 'MISC_digital_asset', true, 'sop.subnet'],
    ['totally_unknown', 'SOP_totally_unknown', false, 'default'],
  ])('NOP-ICON-001: %s / %s resolves to %s', (type, icon, subnet, id) => {
    expect(resolveOperatorIcon(type, icon, subnet).id).toBe(id);
  });

  it('NOP-ICON-002: lookups are exact, never substrings', () => {
    expect(resolveOperatorIcon('subdivide').id).not.toBe('sop.divide');
  });

  it('NOP-ICON-003: lookups ignore letter case', () => {
    expect(resolveOperatorIcon('labs::straight_skeleton_2D::1.0').id).toBe('labs.straight_skeleton_2D');
  });

  it('NOP-ICON-004: every SideFX Labs SOP has a drawing', () => {
    const missing = LABS_NODE_CATALOG.filter((entry) => resolveOperatorIcon(entry.type) === DEFAULT_OPERATOR_ICON);
    expect(missing.map((entry) => entry.type)).toEqual([]);
  });

  it('NOP-ICON-005: Labs aliases reuse built-in drawings', () => {
    for (const [labsType, sopId] of Object.entries(LABS_BUILTIN_ICON_ALIASES)) {
      expect(resolveOperatorIcon(`labs::${labsType}`).id).toBe(sopId);
    }
  });

  const allDrawings = () => [...OPERATOR_ICONS, ...PATH_ICONS, DEFAULT_OPERATOR_ICON];

  it('NOP-ICON-006: registry entries are complete and unique', () => {
    const ids = allDrawings().map((def) => def.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const def of allDrawings()) {
      expect(def.id === 'default' || /^(sop|labs|path)\./.test(def.id)).toBe(true);
      expect(def.label).toBeTruthy();
      expect(def.family).toBeTruthy();
      expect(def.description).toBeTruthy();
      expect(def.description).not.toMatch(/[\u2013\u2014]/);
      if (def.family !== 'path' && def !== DEFAULT_OPERATOR_ICON) {
        expect(def.types.length + (def.icons?.length ?? 0) + (def.matches ? 1 : 0)).toBeGreaterThan(0);
      }
    }
  });

  it('NOP-ICON-008: drawings stay inside the drawing rules', () => {
    for (const def of allDrawings()) {
      const markup = renderToStaticMarkup(React.createElement('svg', null, def.render('t')));
      expect(markup, def.id).not.toMatch(/<(image|style|filter|foreignObject)\b/i);
      expect(markup, def.id).not.toMatch(/href="(?!#)/i);
    }
  });

  // Built-in SOP drawings are a hand-picked set (unlike Labs, there is no full list to check
  // against), so this keeps at least every node of the playground examples covered: before, the
  // Compile Block nodes of the For-Each example fell back to the default emblem unnoticed.
  it('NOP-ICON-009: every node of the example networks has a drawing or its own icon', () => {
    interface ExampleNode {
      name: string;
      type: string;
      icon?: string;
      isSubnetwork?: boolean;
      children?: { nodes: ExampleNode[] };
    }
    const missing: string[] = [];
    for (const file of readdirSync('fixtures/examples').filter((name) => name.endsWith('-network.json'))) {
      const doc = JSON.parse(readFileSync(`fixtures/examples/${file}`, 'utf8')) as {
        icons?: Record<string, unknown>;
        root: { nodes: ExampleNode[] };
      };
      const visit = (nodes: ExampleNode[]) => {
        for (const node of nodes) {
          const ownIcon = node.icon !== undefined && Object.hasOwn(doc.icons ?? {}, node.icon);
          const def = resolveOperatorIcon(node.type, node.icon ?? '', node.isSubnetwork ?? false);
          if (def === DEFAULT_OPERATOR_ICON && !ownIcon) missing.push(`${file}: ${node.name} (${node.type})`);
          if (node.children) visit(node.children.nodes);
        }
      };
      visit(doc.root.nodes);
    }
    expect(missing).toEqual([]);
  });
});

describe('SOP icon domains on demand', () => {
  /** A registry with no SOP domain loaded yet (module state is per import after `vi.resetModules`). */
  async function freshRegistry(): Promise<typeof import('../../src/components/nodes/icons/iconRegistry')> {
    vi.resetModules();
    return import('../../src/components/nodes/icons/iconRegistry');
  }

  it(
    'NOP-ICON-011: the domains an operator needs draw it exactly like the full set',
    { timeout: 120_000 },
    async () => {
      // Every key the drawings use, plus Labs tools, aliases, matcher patterns and unknown operators
      const queries: [type: string, icon: string][] = [];
      for (const def of SOP_ICONS) {
        for (const t of def.types) queries.push([t, ''], [t, `SOP_${t}`], ['nop_unknown', `SOP_${t}-2.0`]);
        for (const icon of def.icons ?? []) queries.push(['nop_unknown', icon]);
      }
      for (const entry of LABS_NODE_CATALOG) queries.push([entry.type, '']);
      for (const labsType of Object.keys(LABS_BUILTIN_ICON_ALIASES)) {
        queries.push([`labs::${labsType}::1.0`, ''], ['emjud::x::1.0', `opdef:/labs::Sop/${labsType}::1.0?IconSVG`]);
      }
      queries.push(
        ['volume_wrangle_custom', ''],
        ['group_by_anything', ''],
        ['emjud::pebble_scatter::1.0', 'MISC_digital_asset'],
        ['totally_unknown', 'SOP_totally_unknown'],
        ['Straight_Skeleton_2D', ''],
      );

      const full = await freshRegistry();
      await full.loadAllOperatorIcons();
      const expected = queries.map(([t, icon]) => [
        full.resolveOperatorIcon(t, icon).id,
        full.resolveOperatorIcon(t, icon, true).id,
      ]);

      // Group the queries by the domains they need, then check each group on a registry with only those
      const probe = await freshRegistry();
      await probe.loadLabsIcons();
      const groups = new Map<string, number[]>();
      queries.forEach(([t, icon], n) => {
        const key = probe.sopIconDomainsFor(t, icon).sort().join(',');
        groups.set(key, [...(groups.get(key) ?? []), n]);
      });
      for (const [key, members] of groups) {
        const registry = await freshRegistry();
        await registry.loadLabsIcons();
        await registry.loadSopIconDomains((key ? key.split(',') : []) as SopIconDomain[]);
        for (const n of members) {
          const [t, icon] = queries[n];
          const actual = [registry.resolveOperatorIcon(t, icon).id, registry.resolveOperatorIcon(t, icon, true).id];
          expect(actual, `${t} / ${icon} with ${key || 'no domain'}`).toEqual(expected[n]);
        }
      }
      // One domain per known operator: a network loads only what it uses
      expect(probe.sopIconDomainsFor('box', 'SOP_box')).toHaveLength(1);
    },
  );
});
