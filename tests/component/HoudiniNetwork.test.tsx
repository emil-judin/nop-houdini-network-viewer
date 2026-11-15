// @vitest-environment jsdom
import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { HoudiniNetwork } from '../../src/components/HoudiniNetwork';
import type { HoudiniNetworkDocument } from '../../src/schema/types';
import { graph, node, wire } from '../unit/networkFixtures';

function documentWith(overrides: Partial<HoudiniNetworkDocument> = {}): HoudiniNetworkDocument {
  return {
    schemaVersion: '1.4.0',
    houdiniVersion: '22.0.466',
    exportMode: 'compact',
    icons: {},
    customShapes: {},
    root: graph({
      nodes: [
        node({
          name: 'box1',
          flags: { bypass: true, display: true, render: false, template: false, lock: false },
          comment: 'main output',
          parms: [{ name: 'size', label: 'Size', type: 'Float', val: [2.5], expr: ['ch("../size")'], changed: [true] }],
        }),
        node({
          name: 'subnet1',
          type: 'subnet',
          pos: [0, -1],
          isSubnetwork: true,
          children: graph({ path: '/obj/geo1/subnet1', nodes: [node({ name: 'inner1' })] }),
        }),
      ],
      wires: [wire('box1', 'subnet1')],
    }),
    ...overrides,
  };
}

const nodeElement = (name: string) => document.querySelector<HTMLElement>(`.react-flow__node[data-id="${name}"]`);

async function renderViewer(props: Partial<React.ComponentProps<typeof HoudiniNetwork>> = {}) {
  const view = render(
    <div style={{ width: 1000, height: 600 }}>
      <HoudiniNetwork data={documentWith()} {...props} />
    </div>,
  );
  await waitFor(() => expect(nodeElement('box1')).not.toBeNull());
  return view;
}

describe('HoudiniNetwork', () => {
  it('NOP-INSP-001, 005 and 007: selecting a node opens the inspector with its header', async () => {
    await renderViewer();
    fireEvent.click(nodeElement('box1') as HTMLElement);
    const panel = await screen.findByRole('complementary', { name: 'Parameters of box1' });
    expect(panel.textContent).toContain('box1');
    // No flag badges in the header (owner decision 2026-11-05)
    expect(panel.textContent).not.toContain('Bypass');
    expect(panel.textContent).toContain('main output');
    expect(panel.textContent).toContain('Showing parameters changed from their defaults.');
  });

  it('NOP-INSP-002 and 004: closing clears the selection and onNodeSelect reports it', async () => {
    const onNodeSelect = vi.fn();
    await renderViewer({ onNodeSelect });
    fireEvent.click(nodeElement('box1') as HTMLElement);
    fireEvent.click(await screen.findByRole('button', { name: 'Close parameters' }));
    await waitFor(() => expect(screen.queryByRole('complementary')).toBeNull());
    expect(onNodeSelect.mock.calls.map(([n]) => n?.name ?? null)).toEqual(['box1', null]);
  });

  it('NOP-INSP-003: showInspector false never opens the panel', async () => {
    await renderViewer({ showInspector: false });
    fireEvent.click(nodeElement('box1') as HTMLElement);
    await waitFor(() => expect(nodeElement('box1')?.classList.contains('selected')).toBe(true));
    expect(screen.queryByRole('complementary')).toBeNull();
  });

  it('NOP-A11Y-024 and A-05: parameter rows are named groups', async () => {
    await renderViewer();
    fireEvent.click(nodeElement('box1') as HTMLElement);
    const row = await screen.findByRole('group', { name: 'Size' });
    expect(row.textContent).toContain('ch("../size")');
    expect(row.textContent).toContain('= 2.5');
  });

  it('A-01: nodes are focusable and Enter opens the inspector with focus on its heading', async () => {
    await renderViewer();
    const box = nodeElement('box1') as HTMLElement;
    expect(box.getAttribute('tabindex')).toBe('0');
    expect(box.getAttribute('aria-label')).toBe('Box node box1');
    box.focus();
    fireEvent.keyDown(box, { key: 'Enter' });
    const heading = await screen.findByRole('heading', { level: 2 });
    await waitFor(() => expect(document.activeElement).toBe(heading));
    // Escape closes the panel and returns focus to the node
    fireEvent.keyDown(heading, { key: 'Escape' });
    await waitFor(() => expect(screen.queryByRole('complementary')).toBeNull());
    await waitFor(() => expect(document.activeElement).toBe(nodeElement('box1')));
  });

  it('NOP-NAV-025 and 024: dives into a subnetwork from the inspector and the path bar goes back', async () => {
    await renderViewer();
    fireEvent.click(nodeElement('subnet1') as HTMLElement);
    fireEvent.click(await screen.findByRole('button', { name: /Open subnetwork/ }));
    await waitFor(() => expect(nodeElement('inner1')).not.toBeNull());
    fireEvent.click(screen.getByRole('button', { name: 'Go back to the previous network' }));
    await waitFor(() => expect(nodeElement('box1')).not.toBeNull());
    // Going up selects the subnetwork you came from
    await screen.findByRole('complementary', { name: 'Parameters of subnet1' });
  });

  it('NOP-HUD-014: the network overview starts closed unless showMiniMap is set', async () => {
    const { container } = await renderViewer();
    expect(container.querySelector('.react-flow__minimap')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Network overview' }));
    await waitFor(() => expect(container.querySelector('.react-flow__minimap')).not.toBeNull());
  });

  it('A-02: single-key hotkeys ignore a hovering pointer unless hotkeys is "hover"', async () => {
    const { container } = await renderViewer({ showMiniMap: true });
    const root = container.querySelector('.nop-root .\\@container') as HTMLElement;
    fireEvent.pointerEnter(root);
    fireEvent.keyDown(window, { key: 'o', code: 'KeyO' });
    // The overview stays visible: focus is not inside the viewer
    expect(container.querySelector('.react-flow__minimap')).not.toBeNull();
    root.focus();
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'o', code: 'KeyO' }));
    });
    await waitFor(() => expect(container.querySelector('.react-flow__minimap')).toBeNull());
  });

  it('NOP-HUD-032 and U-05: debug JSON buttons are hidden by default', async () => {
    await renderViewer();
    expect(screen.queryByRole('button', { name: 'Copy network JSON to clipboard' })).toBeNull();
  });

  it('NOP-RO-001 and 002: nothing can be dragged or connected', async () => {
    const { container } = await renderViewer();
    expect(container.querySelector('.react-flow__node.draggable')).toBeNull();
    expect(container.querySelector('.react-flow__handle.connectable')).toBeNull();
  });

  it('shows a readable error for a broken file instead of throwing', async () => {
    render(<HoudiniNetwork data={{ foo: 1 }} />);
    expect((await screen.findByRole('alert')).textContent).toContain('Unrecognized Houdini network JSON format');
  });

  it('S-01: draws a damaged file without crashing', async () => {
    const damaged = { root: { nodes: [null, { name: 'ok', parms: [{ name: 'p', val: 3 }] }, { type: 'nameless' }] } };
    render(
      <div style={{ width: 1000, height: 600 }}>
        <HoudiniNetwork data={damaged} />
      </div>,
    );
    await waitFor(() => expect(nodeElement('ok')).not.toBeNull());
    fireEvent.click(nodeElement('ok') as HTMLElement);
    await screen.findByRole('complementary', { name: 'Parameters of ok' });
  });
});
