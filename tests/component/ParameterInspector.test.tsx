// @vitest-environment jsdom
import { act, fireEvent, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { HoudiniParmTupleData } from '../../src/schema/types';
import { node } from '../unit/networkFixtures';
import { documentOf, inspect, loadExample, parm, renderViewer } from './inspectorHelpers';

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  Reflect.deleteProperty(navigator, 'clipboard');
  Reflect.deleteProperty(window, 'isSecureContext');
});

const DISABLED = 'bg-[#363636]';
const PLAIN = 'bg-[#434343]';
const TEAL = 'bg-[#425757]';

/** Field of one tuple component, found by its tooltip (the internal name, plus `= value` with an expression). */
const field = (scope: HTMLElement, title: string) => scope.querySelector<HTMLElement>(`div[title="${title}"]`) as HTMLElement;

const row = (scope: HTMLElement, label: string) => within(scope).getByRole('group', { name: label });

/** Renders a one-node document and opens its inspector. */
async function inspectParms(parms: HoudiniParmTupleData[], type = 'box', exportMode: 'compact' | 'full' = 'full') {
  await renderViewer(documentOf([node({ name: 'node1', type, parms })], exportMode));
  return inspect('node1');
}

describe('Parameter Inspector with real exports', () => {
  it('NOP-INSP-008: another node starts on its first tab', async () => {
    await renderViewer(loadExample('parameters'));
    const controls = await inspect('CONTROLS');
    fireEvent.click(within(controls).getByRole('tab', { name: 'Look' }));
    expect(within(controls).getByRole('tab', { name: 'Look' }).getAttribute('aria-selected')).toBe('true');
    const extrude = await inspect('polyextrude1');
    expect(within(extrude).getByRole('tab', { name: 'Extrusion' }).getAttribute('aria-selected')).toBe('true');
  });

  it('NOP-INSP-020: an expression-driven field shows the expression and its value', async () => {
    await renderViewer(loadExample('parameters'));
    const grid = await inspect('grid1');
    const rows = row(grid, 'Rows');
    expect(field(rows, 'rows = 20').textContent).toBe('ch("../CONTROLS/rows")');
    expect(field(rows, 'rows = 20').className).toContain(TEAL);
    expect(rows.textContent).toContain('f(x)');
    expect(rows.textContent).toContain('= 20');

    const spin = await inspect('spin');
    const translate = row(spin, 'Translate');
    for (const value of ['x = 0', 'y = 0.0326', 'z = 0.5']) expect(translate.textContent).toContain(value);
  });

  it('NOP-INSP-021: keyframed components use the keyframe color, changed ones are bold', async () => {
    await renderViewer(loadExample('parameters'));
    const rotate = row(await inspect('spin'), 'Rotate');
    expect(field(rotate, 'ry').className).toContain(TEAL);
    expect(field(rotate, 'ry').className).toContain('font-bold');
    expect(field(rotate, 'rx').className).toContain(PLAIN);
    expect(field(rotate, 'rx').className).not.toContain('font-bold');
  });

  it('NOP-INSP-022: vector components get red, green and blue axis markers', async () => {
    await renderViewer(loadExample('parameters'));
    const scale = row(await inspect('spin'), 'Scale');
    const markers = [...scale.querySelectorAll<HTMLElement>('span[style]')].map((span) => span.style.backgroundColor);
    expect(markers).toEqual(['rgb(219, 108, 90)', 'rgb(88, 190, 101)', 'rgb(105, 148, 193)']);
  });

  it('NOP-INSP-024: a menu shows its label and keeps the token in the tooltip', async () => {
    await renderViewer(loadExample('parameters'));
    const mode = row(await inspect('CONTROLS'), 'Mode');
    const menu = field(mode, 'Token: rings');
    expect(menu.textContent).toBe('Rings');
    expect(within(menu).getByText('Rings').className).toContain('font-bold');
  });

  it('NOP-INSP-025: a label-less toggle joined to the next parameter sits in the gutter', async () => {
    await renderViewer(loadExample('parameters'));
    const jitter = row(await inspect('CONTROLS'), 'Jitter');
    const gutter = jitter.firstElementChild as HTMLElement;
    expect(within(gutter).getByRole('img', { name: 'Use Jitter: off' })).toBeTruthy();
    expect(jitter.getAttribute('aria-disabled')).toBe('true');
  });

  it('NOP-INSP-026: collapsible folders start closed and open on a click', async () => {
    await renderViewer(loadExample('parameters'));
    const spin = await inspect('spin');
    const folder = within(spin).getByRole('button', { name: 'Pivot Transform' });
    expect(folder.getAttribute('aria-expanded')).toBe('false');
    expect(within(spin).queryByRole('group', { name: 'Pivot Translate' })).toBeNull();
    fireEvent.click(folder);
    expect(folder.getAttribute('aria-expanded')).toBe('true');
    expect(row(spin, 'Pivot Translate')).toBeTruthy();
    expect(row(spin, 'Pivot Rotate')).toBeTruthy();
  });

  it('NOP-INSP-027: switching tabs only changes the view, also with the keyboard', async () => {
    const data = loadExample('parameters');
    const before = structuredClone(data);
    await renderViewer(data);
    const extrude = await inspect('polyextrude1');
    const tab = (name: string) => within(extrude).getByRole('tab', { name });
    const selectedTabs = () =>
      within(extrude)
        .getAllByRole('tab')
        .filter((t) => t.getAttribute('aria-selected') === 'true')
        .map((t) => t.textContent);

    fireEvent.click(tab('Spine Control'));
    expect(selectedTabs()).toEqual(['Spine Control']);
    expect(data).toEqual(before);

    const keys: Array<[string, string]> = [
      ['ArrowRight', 'Local Control'],
      ['ArrowRight', 'Extrusion'],
      ['ArrowLeft', 'Local Control'],
      ['Home', 'Extrusion'],
      ['End', 'Local Control'],
    ];
    for (const [key, expected] of keys) {
      fireEvent.keyDown(document.activeElement === document.body ? tab('Spine Control') : (document.activeElement as HTMLElement), { key });
      expect(selectedTabs()).toEqual([expected]);
      expect(document.activeElement).toBe(tab(expected));
    }
    expect(within(extrude).getAllByRole('tab').map((t) => t.tabIndex)).toEqual([-1, -1, 0]);
  });

  it('NOP-INSP-028: string fields with a menu show the menu button', async () => {
    await renderViewer(loadExample('parameters'));
    expect(row(await inspect('color1'), 'Group').querySelector('span.w-6 svg')).not.toBeNull();
    expect(row(await inspect('spin'), 'Attributes').querySelector('span.w-6 svg')).toBeNull();
  });

  it('NOP-INSP-033: float and color ramps are drawn', async () => {
    await renderViewer(loadExample('parameters'));
    const controls = await inspect('CONTROLS');
    fireEvent.click(within(controls).getByRole('tab', { name: 'Look' }));
    expect(within(controls).getByRole('img', { name: 'Color ramp with 3 points' })).toBeTruthy();
    expect(within(controls).getByRole('img', { name: 'Float ramp with 3 points' })).toBeTruthy();
  });

  it('NOP-INSP-048: code is named by its language', async () => {
    await renderViewer(loadExample('vex_wrangles'));
    expect(within(await inspect('wrangle_rings')).getByRole('region', { name: 'VEX code' })).toBeTruthy();
    expect(within(await inspect('python_info')).getByRole('region', { name: 'Python code' })).toBeTruthy();
  });

  it('NOP-INSP-048: multi-line notes are text, and code on a Python node is Python', async () => {
    await renderViewer(loadExample('parameters'));
    const controls = await inspect('CONTROLS');
    fireEvent.click(within(controls).getByRole('tab', { name: 'Look' }));
    expect(within(controls).getByRole('region', { name: 'Text code' })).toBeTruthy();
  });
});

describe('Parameter Inspector widgets', () => {
  it.each([
    ['compact', 'All parameters are at their default values.'],
    ['full', 'This node has no visible parameters.'],
  ] as const)('NOP-INSP-006: %s export of a node without parameters says "%s"', async (mode, message) => {
    const panel = await inspectParms([], 'box', mode);
    expect(panel.textContent).toContain(message);
    expect(panel.textContent).not.toContain('Showing parameters changed from their defaults.');
  });

  it('NOP-INSP-029: disabled colors win over keyframe and expression colors', async () => {
    const panel = await inspectParms([
      parm({
        name: 't',
        label: 'Translate',
        val: [1, 2, 3],
        expr: [null, 'ch("x")', null],
        keyframed: [true, false, false],
        changed: [false, true, false],
        disabled: true,
      }),
    ]);
    const translate = row(panel, 'Translate');
    for (const title of ['tx', 'ty = 2', 'tz']) expect(field(translate, title).className).toContain(DISABLED);
    expect(translate.getAttribute('aria-disabled')).toBe('true');
  });

  it('NOP-INSP-023: the slider shows the value inside the range', async () => {
    const panel = await inspectParms([
      parm({ name: 'mid', label: 'Mid', type: 'Int', val: [5], range: [0, 10] }),
      parm({ name: 'high', label: 'High', type: 'Int', val: [15], range: [0, 10] }),
      parm({ name: 'low', label: 'Low', type: 'Int', val: [-3], range: [0, 10] }),
    ]);
    // Share of the track left of the knob, from `calc(6px + <share> * (100% - 12px))`
    const knobShare = (label: string) => {
      const left = (row(panel, label).querySelector<HTMLElement>('.rounded-full.w-3') as HTMLElement).style.left;
      const match = /([\d.]+) \* \(100% - 12px\)|\(100% - 12px\) \* ([\d.]+)/.exec(left);
      return Number(match?.[1] ?? match?.[2]);
    };
    expect([knobShare('Mid'), knobShare('High'), knobShare('Low')]).toEqual([0.5, 1, 0]);
  });

  it('NOP-INSP-024: a menu driven by an expression shows the expression', async () => {
    const panel = await inspectParms([
      parm({ name: 'm', label: 'Method', type: 'Menu', val: ['a'], expr: ['chs("../m")'], menuLabel: 'Alpha' }),
    ]);
    const method = row(panel, 'Method');
    expect(method.textContent).toContain('chs("../m")');
    expect(method.textContent).not.toContain('Alpha');
  });

  it('NOP-INSP-033: a ramp parameter without ramp data names its point count', async () => {
    const panel = await inspectParms([parm({ name: 'ramp', label: 'Ramp', type: 'Ramp', val: [3] })]);
    expect(row(panel, 'Ramp').textContent).toContain('Ramp with 3 points');
    expect(within(panel).queryByRole('img', { name: /ramp with/ })).toBeNull();
  });

  it('NOP-INSP-044: Copy code puts the exact snippet on the clipboard', async () => {
    const writeText = vi.fn(async () => undefined);
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
    Object.defineProperty(window, 'isSecureContext', { value: true, configurable: true });
    const data = loadExample('vex_wrangles');
    const snippet = data.root.nodes.find((n) => n.name === 'wrangle_rings')?.parms?.find((p) => p.name === 'snippet')?.val[0];
    await renderViewer(data);
    const panel = await inspect('wrangle_rings');

    vi.useFakeTimers();
    await act(async () => {
      fireEvent.click(within(panel).getByRole('button', { name: 'Copy code' }));
    });
    expect(writeText).toHaveBeenCalledWith(snippet);
    expect(within(panel).getByRole('button', { name: 'Code copied' }).textContent).toBe('Copied');
    act(() => vi.advanceTimersByTime(1599));
    expect(within(panel).getByRole('button', { name: 'Code copied' })).toBeTruthy();
    act(() => vi.advanceTimersByTime(1));
    expect(within(panel).getByRole('button', { name: 'Copy code' })).toBeTruthy();
  });

  it('NOP-INSP-045: no copy button without a secure context', async () => {
    Object.defineProperty(navigator, 'clipboard', { value: { writeText: vi.fn() }, configurable: true });
    Object.defineProperty(window, 'isSecureContext', { value: false, configurable: true });
    const panel = await inspectParms([parm({ name: 'snippet', type: 'String', val: ['@P.y += 1;'] })], 'attribwrangle');
    expect(within(panel).queryByRole('button', { name: 'Copy code' })).toBeNull();
    expect(within(panel).getByRole('region', { name: 'VEX code' }).textContent).toContain('@P.y += 1;');
  });

  it('NOP-INSP-046: code shows line numbers and long lines scroll sideways', async () => {
    const code = `int a = 1;\n${'x'.repeat(500)};\nint b = 2;`;
    const panel = await inspectParms([parm({ name: 'snippet', type: 'String', val: [code] })], 'attribwrangle');
    const region = within(panel).getByRole('region', { name: 'VEX code' });
    const [gutter, source] = region.querySelectorAll('pre');
    expect(gutter.textContent).toBe('1\n2\n3\n');
    expect(source.textContent).toBe(code);
    expect(source.className).toContain('whitespace-pre');
    expect(source.className).not.toContain('whitespace-pre-wrap');
  });

  it('NOP-INSP-048: a "code" parameter on a Python node is Python', async () => {
    const panel = await inspectParms([parm({ name: 'code', type: 'String', val: ['print(1)'] })], 'python');
    expect(within(panel).getByRole('region', { name: 'Python code' })).toBeTruthy();
  });

  it('NOP-INSP-055: a tap shows a long value and a second tap hides it, but not after selecting text', async () => {
    const value = 'a long value '.repeat(20);
    const panel = await inspectParms([parm({ name: 'path', label: 'Path', type: 'String', val: [value] })]);
    const text = () => field(row(panel, 'Path'), 'path').firstElementChild as HTMLElement;
    fireEvent.click(field(row(panel, 'Path'), 'path'));
    expect(text().className).toContain('whitespace-pre-wrap');
    fireEvent.click(field(row(panel, 'Path'), 'path'));
    expect(text().className).toContain('truncate');

    vi.spyOn(window, 'getSelection').mockReturnValue({ toString: () => 'long' } as Selection);
    fireEvent.click(field(row(panel, 'Path'), 'path'));
    expect(text().className).toContain('truncate');
  });

  it('NOP-INSP-060: toggles show expressions, the disabled state and their label', async () => {
    const panel = await inspectParms([
      parm({ name: 'driven', label: 'Driven', type: 'Toggle', val: [1], expr: ['ch("x")'] }),
      parm({ name: 'off', label: 'Switched Off', type: 'Toggle', val: [0], disabled: true }),
      parm({ name: 'bare', label: 'Bare Toggle', type: 'Toggle', val: [1], labelHidden: true }),
    ]);
    expect(within(panel).getByRole('img', { name: 'Driven: on' }).className).toContain(TEAL);
    expect(within(panel).getByRole('img', { name: 'Switched Off: off' }).className).toContain('opacity-50');
    expect(row(panel, 'Switched Off').textContent).toContain('Switched Off');
    expect(row(panel, 'Bare Toggle').textContent).not.toContain('Bare Toggle');
  });

  it('NOP-INSP-061: a joined parameter without a real label gets none in the row', async () => {
    const panel = await inspectParms([
      parm({ name: 'maxedges', label: 'Maximum Edges', type: 'Int', val: [4], joinNext: 'numsides' }),
      parm({ name: 'numsides', label: 'numsides', type: 'Int', val: [6] }),
      parm({ name: 'snapto', label: 'Snap To', type: 'Menu', val: ['grid'], joinNext: 'snapusing' }),
      parm({ name: 'snapusing', label: 'Using', type: 'Menu', val: ['points'] }),
    ]);
    expect(row(panel, 'Maximum Edges').textContent).not.toContain('numsides');
    expect(row(panel, 'Snap To').textContent).toContain('Using');
  });

  it('NOP-INSP-062: import folders have no band, and a section collects parameters listed apart', async () => {
    const panel = await inspectParms([
      parm({ name: 'a', label: 'A', folders: ['Main'], folderTypes: ['simple'] }),
      parm({ name: 'b', label: 'B' }),
      parm({ name: 'c', label: 'C', folders: ['Main'], folderTypes: ['simple'] }),
      parm({ name: 'd', label: 'D', folders: ['Imported'], folderTypes: ['import'] }),
    ]);
    const sections = [...panel.querySelectorAll('section')];
    expect(sections.map((s) => s.firstElementChild?.textContent)).toEqual(['Main']);
    expect(within(sections[0]).getAllByRole('group').map((g) => g.getAttribute('aria-label'))).toEqual(['A', 'C']);
    expect(panel.textContent).not.toContain('Imported');
    expect(row(panel, 'D')).toBeTruthy();
  });

  it('NOP-INSP-066: multiparm blocks show their entry number, and the count cannot be changed', async () => {
    const entry = (i: number, type: string) => [
      parm({ name: `name${i}`, label: 'Name', type: 'String', val: [`attr${i}`], folders: ['Number of Attributes'], folderTypes: ['multiparm'], multiparmIndex: [i] }),
      parm({ name: `type${i}`, label: 'Type', type: 'Menu', val: [type], folders: ['Number of Attributes'], folderTypes: ['multiparm'], multiparmIndex: [i] }),
    ];
    const parms = [
      parm({ name: 'numattr', label: 'Number of Attributes', type: 'Folder', val: [2], changed: [true] }),
      ...entry(1, 'float'),
      ...entry(2, 'index'),
    ];
    const snapshot = JSON.stringify(parms);
    const panel = await inspectParms(parms, 'attribcreate::2.0');
    const countRow = row(panel, 'Number of Attributes');
    expect(countRow.textContent).toContain('2');
    const blocks = [1, 2].map((i) => row(panel, `Number of Attributes ${i}`));
    blocks.forEach((block, i) => {
      expect(block.getAttribute('data-multiparm-entry')).toBe(String(i + 1));
      expect(block.firstElementChild?.textContent).toBe(String(i + 1));
      expect(within(block).getByRole('group', { name: 'Name' }).textContent).toContain(`attr${i + 1}`);
    });
    expect(within(blocks[0]).queryByText('attr2')).toBeNull();
    // View-only: no buttons to add, remove or clear entries, and no editable count field
    const multiparm = countRow.parentElement as HTMLElement;
    expect(within(multiparm).queryAllByRole('button')).toEqual([]);
    expect(multiparm.querySelectorAll('input, textarea, select, [contenteditable="true"]')).toHaveLength(0);
    expect(JSON.stringify(parms)).toBe(snapshot);
  });
});
