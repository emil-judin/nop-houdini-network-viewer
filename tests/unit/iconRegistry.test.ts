import { readdirSync, readFileSync } from 'node:fs';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { beforeAll, describe, expect, it } from 'vitest';
import { DEFAULT_OPERATOR_ICON } from '../../src/components/nodes/icons/defaultIcon';
import {
  areLabsIconsLoaded,
  loadLabsIcons,
  needsLabsIcon,
  OPERATOR_ICONS,
  resolveOperatorIcon,
} from '../../src/components/nodes/icons/iconRegistry';
import { LABS_BUILTIN_ICON_ALIASES } from '../../src/components/nodes/icons/labs';
import { LABS_NODE_CATALOG } from '../../src/components/nodes/icons/labs/labsNodeCatalog';
import { PATH_ICONS } from '../../src/components/nodes/icons/path/pathIcons';

describe('icon registry before the Labs drawings load', () => {
  it('P-03: knows which operators need the Labs drawings', () => {
    expect(needsLabsIcon('labs::thicken::1.0')).toBe(true);
    expect(needsLabsIcon('emjud::x::1.0', 'opdef:/labs::Sop/flowmap::1.0?IconSVG')).toBe(true);
    expect(needsLabsIcon('box', 'SOP_box')).toBe(false);
  });
});

describe('icon registry', () => {
  beforeAll(async () => {
    await loadLabsIcons();
  });

  it('loads the Labs drawings once', async () => {
    expect(areLabsIconsLoaded()).toBe(true);
    const count = OPERATOR_ICONS.length;
    await loadLabsIcons();
    expect(OPERATOR_ICONS.length).toBe(count);
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

  it('NOP-ICON-008: drawings stay inside the art bible rules', () => {
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
