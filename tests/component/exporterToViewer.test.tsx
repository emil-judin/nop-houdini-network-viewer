// @vitest-environment jsdom
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeAll, describe, expect, it } from 'vitest';
import { HoudiniNetwork } from '../../src/components/HoudiniNetwork';
import { type HoudiniNodeShapeDef, pointsToSvgPath } from '../../src/components/nodes/shapes/nodeShapes';
import type { HoudiniNetworkDocument } from '../../src/schema/types';
import { exportSampleNetwork } from '../unit/exporterSample';

const nodeElement = (name: string) => document.querySelector<HTMLElement>(`.react-flow__node[data-id="${name}"]`);

describe('NOP-EXP-051: the viewer draws a fresh export', () => {
  let exported: HoudiniNetworkDocument;

  beforeAll(() => {
    exported = exportSampleNetwork() as HoudiniNetworkDocument;
  });

  async function renderExport() {
    render(
      <div style={{ width: 1000, height: 600 }}>
        <HoudiniNetwork data={exported} />
      </div>,
    );
    await waitFor(() => expect(nodeElement('box1')).not.toBeNull());
  }

  it('NOP-EXP-051: draws every exported node, with the embedded icon of the user asset', async () => {
    await renderExport();
    for (const node of exported.root.nodes) expect(nodeElement(node.name), node.name).not.toBeNull();
    const icon = nodeElement('circuit_gen1')?.querySelector('img');
    expect(icon?.getAttribute('src')).toMatch(/^data:image\/svg\+xml/);
    expect(nodeElement('thicken1')?.querySelector('img')).toBeNull();
  });

  it('NOP-EXP-051: draws the node with the exported custom shape', async () => {
    await renderExport();
    const shape = exported.customShapes?.nop_test_hexagon as HoudiniNodeShapeDef;
    const outline = [...(nodeElement('file1')?.querySelectorAll(':scope > div > svg > path') ?? [])].at(-1);
    expect(outline?.getAttribute('d')).toBe(pointsToSvgPath(shape.outline, true));
  });

  it('NOP-EXP-051: opens the user asset but not the closed locked asset', async () => {
    await renderExport();
    fireEvent.click(nodeElement('scatter_pro1') as HTMLElement);
    await screen.findByRole('complementary', { name: 'Parameters of scatter_pro1' });
    expect(screen.queryByRole('button', { name: /Open subnetwork/ })).toBeNull();

    fireEvent.click(nodeElement('circuit_gen1') as HTMLElement);
    fireEvent.click(await screen.findByRole('button', { name: /Open subnetwork/ }));
    await waitFor(() => expect(nodeElement('inner_box')).not.toBeNull());
  });
});
