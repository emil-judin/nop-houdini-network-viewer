// @vitest-environment jsdom
import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { documentOf, nodeElement, renderViewer } from './inspectorHelpers';
import { node } from '../unit/networkFixtures';

// The inspector code is downloaded when it is first needed; here that download fails, as on a broken connection
const download = vi.hoisted(() => {
  let fail: () => void = () => undefined;
  const failed = new Promise<void>((resolve) => {
    fail = resolve;
  });
  return { fail: () => fail(), failed };
});

vi.mock('../../src/components/inspector/ParameterInspector', async () => {
  await download.failed;
  return {
    get ParameterInspector(): never {
      throw new Error('Failed to fetch dynamically imported module');
    },
  };
});

describe('NOP-INSP-009: the inspector loads on demand', () => {
  it('NOP-INSP-009: a failed download stays in the panel and the network stays usable', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    await renderViewer(documentOf([node({ name: 'box1' }), node({ name: 'box2', pos: [3, 0] })]));

    fireEvent.click(nodeElement('box1') as HTMLElement);
    expect(await screen.findByText('Loading parameters...')).toBeTruthy();

    download.fail();
    const alert = await screen.findByRole('alert');
    expect(alert.textContent).toContain('The parameters of this node could not be shown.');
    expect(alert.textContent).toContain('Check your connection and reload the page to try again.');
    expect(alert.textContent).not.toContain('could not be displayed');
    expect(alert.textContent).not.toContain('damaged');
    // The error replaces the panel contents only: the separator of the panel is still beside it
    expect(within(alert.parentElement?.parentElement as HTMLElement).queryByRole('separator', { name: 'Resize the parameter panel' })).not.toBeNull();

    fireEvent.click(nodeElement('box2') as HTMLElement);
    await waitFor(() => expect(nodeElement('box2')?.classList.contains('selected')).toBe(true));
    expect(nodeElement('box1')).not.toBeNull();
    expect(screen.getAllByRole('alert')).toHaveLength(1);
  });
});
