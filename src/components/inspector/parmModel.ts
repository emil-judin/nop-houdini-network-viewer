import type { HoudiniFolderType, HoudiniNodeData, HoudiniParmTupleData } from '../../schema/types';
import { parseOperatorType } from '../../schema/operatorType';

/**
 * Language used to highlight a code parameter.
 * - `vex`: VEX snippets (wrangles, VOP snippets) and C-like OpenCL kernels.
 * - `python`: Python SOP code and Python scripts.
 * - `text`: any other multi-line string, shown verbatim.
 */
export type CodeLanguage = 'vex' | 'python' | 'text';

/**
 * How the inspector draws one parameter tuple.
 */
export type ParmDisplayKind =
  | 'code'
  | 'number'
  | 'toggle'
  | 'menu'
  | 'string'
  | 'ramp'
  | 'label'
  | 'separator'
  | 'button'
  | 'hidden';

/**
 * One parameter tuple prepared for the read-only inspector.
 */
export interface ParmDisplayRow {
  /** Original exported tuple. */
  parm: HoudiniParmTupleData;
  /** Label shown next to the value (falls back to the internal name). */
  label: string;
  /** Widget used to draw the value. */
  kind: ParmDisplayKind;
  /** Highlighting language when `kind` is `code`. */
  language: CodeLanguage;
}

/**
 * Parameter Pane layout tree, built from the flat, ordered parameter list.
 * - `line`: one row of the pane holding one parameter, or several joined ones ("join with next").
 * - `folder`: a section band (`simple`, `collapsible`, `multiparm`) or a frameless `import` block.
 * - `tabs`: a tab bar (`tabs` / `radio` folders that follow each other).
 */
export type ParmLayoutItem =
  | { kind: 'line'; key: string; rows: ParmDisplayRow[] }
  | { kind: 'folder'; key: string; folderType: Exclude<HoudiniFolderType, 'tabs' | 'radio'>; label: string; children: ParmLayoutItem[] }
  | { kind: 'tabs'; key: string; tabs: Array<{ label: string; children: ParmLayoutItem[] }> };

/** Parameter names that hold VEX code (Attribute Wrangle, Snippet VOP, Volume Wrangle, ...). */
const VEX_CODE_PARMS = new Set(['snippet', 'vexsnippet', 'vex_snippet', 'code']);

/** Parameter names that hold OpenCL kernels (C-like, highlighted with the VEX rules). */
const OPENCL_CODE_PARMS = new Set(['kernelcode']);

/** Parameter names that hold Python code (Python SOP, Python Script nodes). */
const PYTHON_CODE_PARMS = new Set(['python', 'pythoncode', 'script']);

/**
 * Template types that are not shown: folder parameters only structure the pane, and buttons only
 * run actions in Houdini (the viewer is view-only; older exports still contain them).
 */
const STRUCTURAL_TYPES = new Set(['Folder', 'FolderSet', 'Data', 'Button']);

/**
 * Returns the node's parameter tuples, converting the legacy `nonDefaultParms` diagnostic
 * format (one value per entry) into the tuple format.
 */
export function getNodeParmTuples(node: HoudiniNodeData): HoudiniParmTupleData[] {
  if (Array.isArray(node.parms)) {
    return node.parms;
  }
  if (Array.isArray(node.nonDefaultParms)) {
    return node.nonDefaultParms.map((p) => ({
      name: p.name,
      label: p.label,
      val: [p.val],
      expr: [p.expr],
    }));
  }
  return [];
}

/**
 * Returns `true` for Houdini toggle values that mean "on" (`"on"`, `1`, `"1"`, `true`).
 */
export function isToggleOn(value: string | number | boolean | undefined): boolean {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'number') return value !== 0;
  return value === 'on' || value === '1' || value === 'true';
}

/**
 * Picks the code language for a parameter from its name and the operator type.
 */
function detectCodeLanguage(parm: HoudiniParmTupleData, operatorType: string): CodeLanguage | null {
  const name = parm.name.toLowerCase();
  const { baseType } = parseOperatorType(operatorType);
  if (PYTHON_CODE_PARMS.has(name) || (name === 'code' && baseType.includes('python'))) return 'python';
  if (VEX_CODE_PARMS.has(name) || OPENCL_CODE_PARMS.has(name)) return 'vex';
  const first = parm.val[0];
  if (typeof first === 'string' && first.includes('\n')) return 'text';
  return null;
}

/**
 * Decides which widget draws a parameter tuple.
 */
export function toDisplayRow(parm: HoudiniParmTupleData, operatorType: string): ParmDisplayRow {
  const label = parm.label?.trim() || parm.name;
  const type = parm.type ?? '';
  const language = detectCodeLanguage(parm, operatorType);
  let kind: ParmDisplayKind;
  if (STRUCTURAL_TYPES.has(type)) {
    kind = 'hidden';
  } else if (type === 'Separator') {
    kind = 'separator';
  } else if (type === 'Button') {
    kind = 'button';
  } else if (type === 'Label') {
    kind = 'label';
  } else if (language && !parm.expr.some(Boolean)) {
    kind = 'code';
  } else if (type === 'Toggle') {
    kind = 'toggle';
  } else if (type === 'Menu') {
    kind = 'menu';
  } else if (type === 'Ramp') {
    kind = 'ramp';
  } else if (type === 'Float' || type === 'Int' || parm.val.every((v) => typeof v === 'number')) {
    kind = 'number';
  } else {
    kind = 'string';
  }
  return { parm, label, kind, language: language ?? 'text' };
}

/** Folder labels of a row (empty for top-level parameters). */
function foldersOf(row: ParmDisplayRow): string[] {
  return Array.isArray(row.parm.folders) ? row.parm.folders : [];
}

/** Folder type at `depth`; exports before schema 1.2.0 have no types and get `simple` sections. */
function folderTypeAt(row: ParmDisplayRow, depth: number): HoudiniFolderType {
  return row.parm.folderTypes?.[depth] ?? 'simple';
}

function isTabType(type: HoudiniFolderType): boolean {
  return type === 'tabs' || type === 'radio';
}

/** Splits consecutive rows of one level into lines, joining parameters marked "join with next". */
function toLines(rows: ParmDisplayRow[], keyPrefix: string): ParmLayoutItem[] {
  const lines: ParmLayoutItem[] = [];
  let i = 0;
  while (i < rows.length) {
    const line = [rows[i]];
    while (i + line.length < rows.length && line[line.length - 1].parm.joinNext === rows[i + line.length].parm.name) {
      line.push(rows[i + line.length]);
    }
    lines.push({ kind: 'line', key: `${keyPrefix}/${rows[i].parm.name}`, rows: line });
    i += line.length;
  }
  return lines;
}

/** Groups rows by a key, in order of first appearance. */
function groupInOrder<T>(rows: T[], keyOf: (row: T) => string): Array<{ key: string; rows: T[] }> {
  const groups = new Map<string, T[]>();
  for (const row of rows) {
    const key = keyOf(row);
    const group = groups.get(key);
    if (group) group.push(row);
    else groups.set(key, [row]);
  }
  return [...groups].map(([key, groupRows]) => ({ key, rows: groupRows }));
}

/**
 * Builds the layout items of one folder level. `rows` all share the folders above `depth`.
 *
 * A folder (or a tab set) is placed where its first parameter appears and collects all of its
 * parameters, even when they are not next to each other: Houdini lists spare parameters (for
 * example a wrangle's generated channel parameters) after all others, but shows them inside their folder.
 */
function buildLevel(rows: ParmDisplayRow[], depth: number, keyPrefix: string): ParmLayoutItem[] {
  type Slot =
    | { kind: 'rows'; rows: ParmDisplayRow[] }
    | { kind: 'group'; key: string; folderType: HoudiniFolderType; label: string; rows: ParmDisplayRow[] };
  const slots: Slot[] = [];
  const groups = new Map<string, Extract<Slot, { kind: 'group' }>>();

  for (const row of rows) {
    const folders = foldersOf(row);
    if (folders.length <= depth) {
      const last = slots[slots.length - 1];
      if (last?.kind === 'rows') last.rows.push(row);
      else slots.push({ kind: 'rows', rows: [row] });
      continue;
    }
    const folderType = folderTypeAt(row, depth);
    // All tab folders of a level form one tab bar; sections are grouped by type and label
    const key = isTabType(folderType) ? 'tabs' : `${folderType}:${folders[depth]}`;
    let group = groups.get(key);
    if (!group) {
      group = { kind: 'group', key, folderType, label: folders[depth], rows: [] };
      groups.set(key, group);
      slots.push(group);
    }
    group.rows.push(row);
  }

  return slots.flatMap((slot, index): ParmLayoutItem[] => {
    if (slot.kind === 'rows') return toLines(slot.rows, keyPrefix);
    const key = `${keyPrefix}/${index}:${slot.key}`;
    if (isTabType(slot.folderType)) {
      const tabs = groupInOrder(slot.rows, (row) => foldersOf(row)[depth]);
      return [
        {
          kind: 'tabs',
          key,
          tabs: tabs.map((tab) => ({ label: tab.key, children: buildLevel(tab.rows, depth + 1, `${key}/${tab.key}`) })),
        },
      ];
    }
    return [
      {
        kind: 'folder',
        key,
        folderType: slot.folderType as Exclude<HoudiniFolderType, 'tabs' | 'radio'>,
        label: slot.label,
        children: buildLevel(slot.rows, depth + 1, key),
      },
    ];
  });
}

/**
 * Prepares a node's parameters for the inspector: drops structural entries (folder parameters)
 * and nests the rest into the Parameter Pane layout (tabs, sections, joined lines), keeping
 * Houdini's order.
 */
export function buildParmLayout(node: HoudiniNodeData): ParmLayoutItem[] {
  const rows = getNodeParmTuples(node)
    .map((parm) => toDisplayRow(parm, node.type))
    .filter((row) => row.kind !== 'hidden');
  return pruneEmpty(buildLevel(rows, 0, ''));
}

/** `true` for a line that only draws a separator. */
function isSeparatorLine(item: ParmLayoutItem): boolean {
  return item.kind === 'line' && item.rows.every((row) => row.kind === 'separator');
}

/**
 * `true` for a label parameter without text of its own, used in Houdini as a heading for the rows
 * below it (for example "Tangent Operations" above the Curve SOP's buttons).
 */
function isHeadingLine(item: ParmLayoutItem): boolean {
  return (
    item.kind === 'line' &&
    item.rows.every((row) => row.kind === 'label' && row.parm.val.every((v) => v === '' || v === null))
  );
}

/**
 * Drops headings with nothing under them (their buttons are not exported), then collapses runs
 * of separators and trims separators at both ends.
 */
function dropOrphanDecoration(items: ParmLayoutItem[]): ParmLayoutItem[] {
  const withoutOrphanHeadings = items.filter((item, i) => {
    if (!isHeadingLine(item)) return true;
    const next = items[i + 1];
    return next !== undefined && !isSeparatorLine(next) && !isHeadingLine(next);
  });
  const result = withoutOrphanHeadings.filter(
    (item, i) => !(isSeparatorLine(item) && i > 0 && isSeparatorLine(withoutOrphanHeadings[i - 1])),
  );
  while (result.length > 0 && isSeparatorLine(result[0])) result.shift();
  while (result.length > 0 && isSeparatorLine(result[result.length - 1])) result.pop();
  return result;
}

/**
 * Removes folders and tabs left without content (for example a folder that only held buttons,
 * which are not exported or shown), headings with nothing under them, and leftover separators,
 * so no empty section bands, tabs or headings are drawn. Folders with only decoration left are
 * removed too, because decoration is pruned before their emptiness is checked.
 */
function pruneEmpty(items: ParmLayoutItem[]): ParmLayoutItem[] {
  const kept = items.flatMap((item): ParmLayoutItem[] => {
    if (item.kind === 'folder') {
      const children = pruneEmpty(item.children);
      return children.length > 0 ? [{ ...item, children }] : [];
    }
    if (item.kind === 'tabs') {
      const tabs = item.tabs
        .map((tab) => ({ ...tab, children: pruneEmpty(tab.children) }))
        .filter((tab) => tab.children.length > 0);
      return tabs.length > 0 ? [{ ...item, tabs }] : [];
    }
    return [item];
  });
  return dropOrphanDecoration(kept);
}
