import { beforeAll, describe, expect, it } from 'vitest';
import { buildNetworkPathSegments, type PathSegmentIcon } from '../../src/components/hud/networkPathSegments';
import { documentIconDomains } from '../../src/components/hooks/useOperatorIcons';
import { loadSopIconDomains, sopIconDomainsFor } from '../../src/components/nodes/icons/iconRegistry';
import { SOP_ICON_DOMAINS } from '../../src/components/nodes/icons/sop/domains';
import type { HoudiniNetworkDocument, HoudiniNetworkGraph } from '../../src/schema/types';
import { graph, node } from './networkFixtures';

const SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"><path d="M0 0h1v1z"/></svg>';

/** Icon of the first path bar segment for an exported root network. */
function rootIcon(root: HoudiniNetworkGraph, icons: Record<string, string> = {}): PathSegmentIcon | null {
  return buildNetworkPathSegments([{ graph: root, node: null }], 0, icons)[0].icon;
}

describe('NOP-NAV-031: path bar icons', () => {
  // The viewer loads the drawings a network needs before it draws it
  beforeAll(() => loadSopIconDomains(SOP_ICON_DOMAINS));

  it('NOP-NAV-031: a last path node with a custom icon in the document shows that icon as an image', () => {
    const icon = 'opdef:/emjud::Sop/pebble_scatter::1.0?IconSVG';
    const root = graph({
      path: '/obj/assets/pebble_scatter1',
      type: 'emjud::pebble_scatter::1.0',
      pathNodes: [
        { name: 'obj', type: 'obj', icon: 'NETWORKS_scene' },
        { name: 'pebble_scatter1', type: 'emjud::pebble_scatter::1.0', icon },
      ],
    });
    const segmentIcon = rootIcon(root, { [icon]: SVG });
    expect(segmentIcon && 'src' in segmentIcon ? segmentIcon.src : null).toMatch(/^data:image\/svg\+xml/);
  });

  it('NOP-NAV-031: an asset type without path nodes shows the cardboard box', () => {
    const segmentIcon = rootIcon(graph({ path: '/obj/geo1/pebble_scatter1', type: 'emjud::pebble_scatter::1.0' }));
    expect(segmentIcon && 'def' in segmentIcon ? segmentIcon.def.id : null).toBe('path.asset');
  });

  it('NOP-NAV-031: a Geometry object without path nodes shows the Geometry icon', () => {
    const segmentIcon = rootIcon(graph({ path: '/obj/geo1', type: 'geo' }));
    expect(segmentIcon && 'def' in segmentIcon ? segmentIcon.def.id : null).toBe('path.geo');
  });
});

describe('NOP-ICON-012: icon domains of a document', () => {
  it('NOP-ICON-012: nodes need their domains, path nodes above the export and path bar drawings need none', () => {
    const root = graph({
      path: '/obj/geo1',
      type: 'geo',
      pathNodes: [
        { name: 'obj', type: 'obj', icon: 'NETWORKS_scene' },
        { name: 'geo1', type: 'geo', icon: 'OBJ_geo' },
      ],
      nodes: [node({ name: 'box1' })],
    });
    const doc = { root } as HoudiniNetworkDocument;
    expect([...documentIconDomains(doc)]).toEqual(sopIconDomainsFor('box', 'SOP_box'));
  });
});
