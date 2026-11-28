import { describe, expect, it } from 'vitest';
import { buildParmLayout, getNodeParmTuples, isToggleOn, toDisplayRow, type ParmLayoutItem } from '../../src/components/inspector/parmModel';
import { evaluateRamp, sortedRampPoints } from '../../src/components/inspector/rampModel';
import type { HoudiniParmTupleData } from '../../src/schema/types';
import { node } from './networkFixtures';

const parm = (overrides: Partial<HoudiniParmTupleData> & { name: string }): HoudiniParmTupleData => ({
  label: overrides.name,
  type: 'Float',
  val: [1],
  expr: [null],
  ...overrides,
});

/** Names of the parameters in a layout tree, in order, with folders and tabs as `[label]`. */
function outline(items: ParmLayoutItem[]): unknown[] {
  return items.map((item) => {
    if (item.kind === 'line') return item.rows.map((row) => row.parm.name).join('+');
    if (item.kind === 'tabs') return { tabs: item.tabs.map((tab) => [tab.label, outline(tab.children)]) };
    if (item.kind === 'multiparm') {
      return {
        multiparm: item.label,
        count: item.count?.parm.name ?? null,
        blocks: item.blocks.map((block) => [block.index, outline(block.children)]),
      };
    }
    return { [item.label]: outline(item.children) };
  });
}

/** Attribute Create style entries: `name<i>` and `value<i>` in the "Number of Attributes" multiparm. */
const entry = (i: number, extra: Partial<HoudiniParmTupleData> = {}) =>
  ['name', 'value'].map((base) =>
    parm({
      name: `${base}${i}`,
      folders: ['Main', 'Number of Attributes'],
      folderTypes: ['tabs', 'multiparm'],
      multiparmIndex: [i],
      ...extra,
    }),
  );

const count = (val: number) =>
  parm({ name: 'numattr', label: 'Number of Attributes', type: 'Folder', val: [val], folders: ['Main'], folderTypes: ['tabs'] });

describe('parameter layout', () => {
  it('NOP-INSP-010: folder sets, data parameters and buttons are not shown', () => {
    const layout = buildParmLayout(
      node({
        name: 'n',
        parms: ['FolderSet', 'Data', 'Button']
          .map((type) => parm({ name: type.toLowerCase(), type }))
          // A Folder without a number is not a multiparm count
          .concat(parm({ name: 'folder0', type: 'Folder', val: ['Main'] }), parm({ name: 'size' })),
      }),
    );
    expect(outline(layout)).toEqual(['size']);
  });

  it('NOP-INSP-063: a multiparm shows its count, then one numbered block per entry', () => {
    const layout = buildParmLayout(
      node({ name: 'n', parms: [count(3), ...entry(1), ...entry(2), ...entry(3), parm({ name: 'after', folders: ['Main'], folderTypes: ['tabs'] })] }),
    );
    expect(outline(layout)).toEqual([
      {
        tabs: [
          [
            'Main',
            [
              {
                multiparm: 'Number of Attributes',
                count: 'numattr',
                blocks: [
                  [1, ['name1', 'value1']],
                  [2, ['name2', 'value2']],
                  [3, ['name3', 'value3']],
                ],
              },
              'after',
            ],
          ],
        ],
      },
    ]);
    expect(toDisplayRow(count(3), 'attribcreate::2.0').kind).toBe('number');
  });

  it('NOP-INSP-064: multiparm entries listed apart, counts without entries and older exports', () => {
    // Entries are placed by number, also when one is listed after the others (spare parameters)
    const apart = buildParmLayout(node({ name: 'n', parms: [count(2), ...entry(2), ...entry(1).slice(0, 1), ...entry(1).slice(1)] }));
    expect(apart[0].kind === 'tabs' && outline(apart[0].tabs[0].children)).toEqual([
      { multiparm: 'Number of Attributes', count: 'numattr', blocks: [[1, ['name1', 'value1']], [2, ['name2', 'value2']]] },
    ]);
    // A count of 0 (Attribute Wrangle's "Number of Bindings") is shown alone
    const empty = buildParmLayout(node({ name: 'n', parms: [parm({ name: 'bindings', label: 'Number of Bindings', type: 'Folder', val: [0] })] }));
    expect(outline(empty)).toEqual([{ multiparm: 'Number of Bindings', count: 'bindings', blocks: [] }]);
    // Exports before schema 1.6.0 have no entry numbers: one block without a number
    const old = buildParmLayout(
      node({ name: 'n', parms: [count(2), ...entry(1, { multiparmIndex: undefined }), ...entry(2, { multiparmIndex: undefined })] }),
    );
    expect(old[0].kind === 'tabs' && outline(old[0].tabs[0].children)).toEqual([
      { multiparm: 'Number of Attributes', count: 'numattr', blocks: [[null, ['name1', 'value1', 'name2', 'value2']]] },
    ]);
  });

  it('NOP-INSP-065: nested multiparms number their blocks per level', () => {
    const point = (group: number, pt: number) =>
      parm({
        name: `pt${group}_${pt}`,
        folders: ['Groups', `Points ${group}`],
        folderTypes: ['multiparm', 'multiparm'],
        multiparmIndex: [group, pt],
      });
    const layout = buildParmLayout(
      node({
        name: 'n',
        parms: [
          parm({ name: 'groups', label: 'Groups', type: 'Folder', val: [2] }),
          parm({ name: 'pts1', label: 'Points 1', type: 'Folder', val: [2], folders: ['Groups'], folderTypes: ['multiparm'], multiparmIndex: [1] }),
          point(1, 1),
          point(1, 2),
          parm({ name: 'pts2', label: 'Points 2', type: 'Folder', val: [1], folders: ['Groups'], folderTypes: ['multiparm'], multiparmIndex: [2] }),
          point(2, 1),
        ],
      }),
    );
    expect(outline(layout)).toEqual([
      {
        multiparm: 'Groups',
        count: 'groups',
        blocks: [
          [1, [{ multiparm: 'Points 1', count: 'pts1', blocks: [[1, ['pt1_1']], [2, ['pt1_2']]] }]],
          [2, [{ multiparm: 'Points 2', count: 'pts2', blocks: [[1, ['pt2_1']]] }]],
        ],
      },
    ]);
  });

  it('NOP-INSP-011: tabs collect their parameters wherever they appear', () => {
    const layout = buildParmLayout(
      node({
        name: 'n',
        parms: [
          parm({ name: 'a', folders: ['Main'], folderTypes: ['tabs'] }),
          parm({ name: 'b', folders: ['Advanced'], folderTypes: ['tabs'] }),
          parm({ name: 'c', folders: ['Main'], folderTypes: ['tabs'] }),
        ],
      }),
    );
    expect(outline(layout)).toEqual([{ tabs: [['Main', ['a', 'c']], ['Advanced', ['b']]] }]);
  });

  it('NOP-INSP-012: exports before schema 1.2.0 draw folders as simple sections', () => {
    const layout = buildParmLayout(node({ name: 'n', parms: [parm({ name: 'a', folders: ['Section'] })] }));
    expect(layout[0].kind).toBe('folder');
    expect(layout[0].kind === 'folder' && layout[0].folderType).toBe('simple');
  });

  it('NOP-INSP-013: joined parameters share a line only when they follow each other', () => {
    const layout = buildParmLayout(
      node({
        name: 'n',
        parms: [
          parm({ name: 'snapto', joinNext: 'snapusing' }),
          parm({ name: 'snapusing' }),
          parm({ name: 'x', joinNext: 'y' }),
          parm({ name: 'z' }),
        ],
      }),
    );
    expect(outline(layout)).toEqual(['snapto+snapusing', 'x', 'z']);
  });

  it.each([
    ['snippet', 'String', ['@P.y += 1;'], 'attribwrangle', 'code'],
    ['python', 'String', ['print(1)'], 'python', 'code'],
    ['kernelcode', 'String', ['kernel void'], 'opencl', 'code'],
    ['notes', 'String', ['line1\nline2'], 'null', 'code'],
    ['t', 'Float', [1, 2, 3], 'xform', 'number'],
    ['doit', 'Toggle', [1], 'box', 'toggle'],
    ['type', 'Menu', ['poly'], 'box', 'menu'],
    ['ramp', 'Ramp', [3], 'attribremap', 'ramp'],
    ['sep1', 'Separator', [''], 'box', 'separator'],
    ['label1', 'Label', ['Hello'], 'box', 'label'],
    ['group', 'String', ['*'], 'blast', 'string'],
  ])('NOP-INSP-015: %s (%s) on %s is a %s widget', (name, type, val, operator, kind) => {
    const row = toDisplayRow(parm({ name, type, val, expr: val.map(() => null) }), operator);
    expect(row.kind).toBe(kind);
  });

  it('NOP-INSP-014: empty folders, orphan headings and extra separators are pruned', () => {
    const layout = buildParmLayout(
      node({
        name: 'n',
        parms: [
          parm({ name: 'sep0', type: 'Separator', val: [''] }),
          parm({ name: 'a' }),
          parm({ name: 'heading', type: 'Label', val: [''] }),
          parm({ name: 'sep1', type: 'Separator', val: [''] }),
          parm({ name: 'sep2', type: 'Separator', val: [''] }),
          parm({ name: 'sep3', type: 'Separator', val: [''] }),
          parm({ name: 'b' }),
          parm({ name: 'reload', type: 'Button', val: [0], folders: ['Actions'], folderTypes: ['simple'] }),
          parm({ name: 'sep4', type: 'Separator', val: [''] }),
        ],
      }),
    );
    expect(outline(layout)).toEqual(['a', 'sep1', 'b']);
  });

  it('NOP-INSP-016: a code parameter driven by an expression is shown as a field', () => {
    const row = toDisplayRow(parm({ name: 'snippet', type: 'String', val: ['x'], expr: ['chs("../code")'] }), 'attribwrangle');
    expect(row.kind).toBe('string');
  });

  it.each([
    [true, true],
    [1, true],
    ['on', true],
    ['1', true],
    [0, false],
    ['off', false],
    ['', false],
  ])('NOP-INSP-017: toggle value %j is %s', (value, on) => {
    expect(isToggleOn(value)).toBe(on);
  });

  it('NOP-INSP-018: legacy nonDefaultParms become tuples', () => {
    const tuples = getNodeParmTuples(
      node({ name: 'n', parms: undefined, nonDefaultParms: [{ name: 'scale', label: 'Scale', val: 2, expr: null }] }),
    );
    expect(tuples).toHaveLength(1);
    expect(tuples[0]).toMatchObject({ name: 'scale', val: [2], expr: [null] });
  });

  it('NOP-INSP-019: ramp point parameters of older exports are not shown', () => {
    const folders = { folders: ['Spine Control', 'Twist'], folderTypes: ['tabs', 'simple'] as HoudiniParmTupleData['folderTypes'] };
    const layout = buildParmLayout(
      node({
        name: 'n',
        parms: [
          parm({ name: 'twistramp', type: 'Ramp', val: ['2'], ...folders }),
          parm({ name: 'twistscale', ...folders }),
          // Older exports: no folder types, flagged as changed
          parm({ name: 'twistramp1pos', folders: ['Spine Control', 'Twist'] }),
          parm({ name: 'twistramp1value', changed: [true], folders: ['Spine Control', 'Twist'] }),
          parm({ name: 'twistramp1interp', type: 'Menu', val: ['catmull-rom'], folders: ['Spine Control', 'Twist'] }),
          parm({ name: 'twistramp2c', val: [1, 1, 1], expr: [null, null, null], folders: ['Spine Control', 'Twist'] }),
        ],
      }),
    );
    expect(outline(layout)).toEqual([{ tabs: [['Spine Control', [{ Twist: ['twistramp', 'twistscale'] }]]] }]);

    const withoutRamp = buildParmLayout(node({ name: 'n', parms: [parm({ name: 'ramp1value' })] }));
    expect(outline(withoutRamp)).toEqual(['ramp1value']);
  });
});

describe('ramps', () => {
  const ramp = { color: false, keys: [1, 0, 0.5], values: [1, 0, 0.25], basis: ['Linear', 'Linear', 'Constant'] };

  it('NOP-INSP-031: sorts points by position', () => {
    expect(sortedRampPoints(ramp).map((p) => p.key)).toEqual([0, 0.5, 1]);
  });

  it('NOP-INSP-030: evaluates linear and constant segments', () => {
    const points = sortedRampPoints(ramp);
    expect(evaluateRamp(points, 0.25)).toEqual([0.125]);
    expect(evaluateRamp(points, 0.75)).toEqual([0.25]);
    expect(evaluateRamp(points, -1)).toEqual([0]);
    expect(evaluateRamp(points, 2)).toEqual([1]);
    expect(evaluateRamp([], 0.5)).toEqual([0]);
  });

  it('NOP-INSP-031: points listed out of order are sorted and the ends are clamped', () => {
    const points = sortedRampPoints({ color: false, keys: [0.8, 0.2], values: [1, 0], basis: ['Linear', 'Linear'] });
    expect([0, 0.1, 0.9, 1].map((t) => evaluateRamp(points, t)[0])).toEqual([0, 0, 1, 1]);
  });

  it('NOP-INSP-032: a monotone cubic ramp never overshoots', () => {
    const basis = ['MonotoneCubic', 'MonotoneCubic', 'MonotoneCubic'];
    const points = sortedRampPoints({ color: false, keys: [0, 0.5, 1], values: [0, 1, 1], basis });
    for (let i = 0; i <= 96; i++) {
      const [value] = evaluateRamp(points, 0.5 + (i / 96) * 0.5);
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(1);
    }
  });
});
