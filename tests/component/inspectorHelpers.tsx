import { readFileSync } from 'node:fs';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { expect, vi } from 'vitest';
import { HoudiniNetwork } from '../../src/components/HoudiniNetwork';
import type { HoudiniNetworkDocument, HoudiniNodeData, HoudiniParmTupleData } from '../../src/schema/types';
import { graph } from '../unit/networkFixtures';

/** One of the guided examples in `fixtures/examples/` (real Houdini 22 exports). */
export function loadExample(name: 'parameters' | 'vex_wrangles' | 'start_here' | 'assets' | 'for_each'): HoudiniNetworkDocument {
  return JSON.parse(readFileSync(`fixtures/examples/${name}-network.json`, 'utf8')) as HoudiniNetworkDocument;
}

/** A document whose root network holds `nodes`. */
export function documentOf(nodes: HoudiniNodeData[], exportMode: 'compact' | 'full' = 'full'): HoudiniNetworkDocument {
  return { schemaVersion: '1.4.0', houdiniVersion: '22.0.466', exportMode, icons: {}, customShapes: {}, root: graph({ nodes }) };
}

/** A parameter tuple for tests; `overrides` replace any field. */
export function parm(overrides: Partial<HoudiniParmTupleData> & { name: string }): HoudiniParmTupleData {
  return { label: overrides.name, type: 'Float', val: [1], expr: [null], ...overrides };
}

/**
 * Gives every observed element (the viewer included) this size, like a real layout pass would.
 * jsdom has no layout; `tests/setup.ts` reports 1000 x 600 unless a test calls this.
 */
export function setViewerSize(width: number, height = 600): void {
  class SizedResizeObserver {
    private readonly callback: ResizeObserverCallback;
    constructor(callback: ResizeObserverCallback) {
      this.callback = callback;
    }
    observe(target: Element) {
      this.callback([{ target, contentRect: { width, height } } as unknown as ResizeObserverEntry], this as unknown as ResizeObserver);
    }
    unobserve() {}
    disconnect() {}
  }
  vi.stubGlobal('ResizeObserver', SizedResizeObserver);
}

export const nodeElement = (name: string) => document.querySelector<HTMLElement>(`.react-flow__node[data-id="${name}"]`);

/** Renders the viewer and waits until the node `firstNode` is drawn. */
export async function renderViewer(data: HoudiniNetworkDocument, firstNode = data.root.nodes[0].name) {
  const view = render(
    <div style={{ width: 1000, height: 600 }}>
      <HoudiniNetwork data={data} />
    </div>,
  );
  await waitFor(() => expect(nodeElement(firstNode)).not.toBeNull());
  return view;
}

/** Selects node `name` like a visitor and returns its open Parameter Inspector. */
export async function inspect(name: string): Promise<HTMLElement> {
  fireEvent.click(nodeElement(name) as HTMLElement);
  return screen.findByRole('complementary', { name: `Parameters of ${name}` });
}
