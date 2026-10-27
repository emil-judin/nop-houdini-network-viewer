import type {
  HoudiniDotData,
  HoudiniFolderType,
  HoudiniNetworkBoxData,
  HoudiniNetworkDocument,
  HoudiniNetworkGraph,
  HoudiniNodeData,
  HoudiniNodeFlags,
  HoudiniParmTupleData,
  HoudiniPathNode,
  HoudiniRampData,
  HoudiniRgbColor,
  HoudiniStickyNoteData,
  HoudiniSubnetInputData,
  HoudiniVec2,
  HoudiniWireData,
} from './types';

/**
 * Major schema version this viewer reads. Minor versions only add optional fields, so every `1.x`
 * export works; see the versioning policy in `docs/SCHEMA.md`.
 */
export const SUPPORTED_SCHEMA_MAJOR = 1;

/** Deepest subnetwork nesting the viewer reads; deeper levels are dropped. */
export const MAX_SUBNETWORK_DEPTH = 64;

// Network files are untrusted input: hand-edited, truncated, made by another tool or made to break
// the viewer. Everything below checks each field once on load, repairs what has an obvious default
// and drops items that cannot be drawn, so the components can rely on the types in `types.ts`.

type JsonRecord = Record<string, unknown>;

const FOLDER_TYPES: readonly HoudiniFolderType[] = ['tabs', 'radio', 'simple', 'collapsible', 'multiparm', 'import'];

const isRecord = (value: unknown): value is JsonRecord =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isFiniteNumber = (value: unknown): value is number => typeof value === 'number' && Number.isFinite(value);

const asString = (value: unknown, fallback = ''): string => (typeof value === 'string' ? value : fallback);

const asBoolean = (value: unknown): boolean => value === true;

const asNumber = (value: unknown, fallback: number): number => (isFiniteNumber(value) ? value : fallback);

/** An item name: a string, or a number written without quotes (`"name": 1` for a subnet input). */
const asName = (value: unknown): string | null =>
  typeof value === 'string' && value !== '' ? value : isFiniteNumber(value) ? String(value) : null;

const asVec2 = (value: unknown, fallback: HoudiniVec2): HoudiniVec2 =>
  Array.isArray(value) && value.length >= 2 && isFiniteNumber(value[0]) && isFiniteNumber(value[1])
    ? [value[0], value[1]]
    : fallback;

const isRgb = (value: unknown): value is HoudiniRgbColor =>
  Array.isArray(value) && value.length >= 3 && value.slice(0, 3).every(isFiniteNumber);

const asRgb = (value: unknown, fallback: HoudiniRgbColor): HoudiniRgbColor =>
  isRgb(value) ? [value[0], value[1], value[2]] : fallback;

const asStringList = (value: unknown): string[] =>
  Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];

const asBooleanList = (value: unknown): boolean[] | undefined =>
  Array.isArray(value) ? value.map((item) => item === true) : undefined;

/** Maps the records of a list through `normalize`, dropping anything that is not a record or that it rejects. */
function mapRecords<T>(value: unknown, normalize: (record: JsonRecord) => T | null): T[] {
  if (!Array.isArray(value)) return [];
  const result: T[] = [];
  for (const item of value) {
    if (!isRecord(item)) continue;
    const normalized = normalize(item);
    if (normalized !== null) result.push(normalized);
  }
  return result;
}

/** Copies the own string entries of a JSON object (icon SVGs), or the own object entries (custom shapes). */
function ownEntries<T>(value: unknown, keep: (entry: unknown) => entry is T): Record<string, T> {
  const result: Record<string, T> = {};
  if (!isRecord(value)) return result;
  for (const [key, entry] of Object.entries(value)) {
    if (keep(entry)) result[key] = entry;
  }
  return result;
}

function normalizeRamp(value: unknown): HoudiniRampData | undefined {
  if (!isRecord(value) || !Array.isArray(value.keys) || !Array.isArray(value.values)) return undefined;
  const color = asBoolean(value.color);
  const basis = asStringList(value.basis);
  const keys: number[] = [];
  const values: HoudiniRampData['values'] = [];
  const count = Math.min(value.keys.length, value.values.length);
  for (let i = 0; i < count; i++) {
    const key = value.keys[i];
    const point = value.values[i];
    const valid = color ? isRgb(point) : isFiniteNumber(point);
    if (!isFiniteNumber(key) || !valid) continue;
    keys.push(key);
    values.push(color ? [(point as number[])[0], (point as number[])[1], (point as number[])[2]] : (point as number));
  }
  if (keys.length === 0) return undefined;
  return { color, keys, values, basis: keys.map((_, i) => basis[i] ?? 'Linear') };
}

function normalizeParm(raw: JsonRecord): HoudiniParmTupleData | null {
  const name = asName(raw.name);
  if (name === null) return null;
  const rawValues = Array.isArray(raw.val) ? raw.val : raw.val === undefined || raw.val === null ? [] : [raw.val];
  const val = rawValues.map((item) =>
    typeof item === 'string' || typeof item === 'boolean' || isFiniteNumber(item) ? item : item == null ? '' : String(item),
  );
  const rawExpr = Array.isArray(raw.expr) ? raw.expr : [];
  const expr = val.map((_, i) => (typeof rawExpr[i] === 'string' ? (rawExpr[i] as string) : null));
  const parm: HoudiniParmTupleData = { ...raw, name, label: asString(raw.label, name), val, expr };
  if (raw.type !== undefined) parm.type = asString(raw.type);
  const folders = asStringList(raw.folders);
  if (folders.length > 0) parm.folders = folders;
  else delete parm.folders;
  if (Array.isArray(raw.folderTypes)) {
    parm.folderTypes = raw.folderTypes.map((t) => (FOLDER_TYPES.includes(t as HoudiniFolderType) ? (t as HoudiniFolderType) : 'simple'));
  }
  if (raw.menuLabel !== undefined) parm.menuLabel = asString(raw.menuLabel);
  const keyframed = asBooleanList(raw.keyframed);
  if (keyframed) parm.keyframed = keyframed;
  else delete parm.keyframed;
  const changed = asBooleanList(raw.changed);
  if (changed) parm.changed = changed;
  else delete parm.changed;
  if (raw.disabled !== undefined) parm.disabled = asBoolean(raw.disabled);
  if (raw.joinNext !== undefined) {
    if (typeof raw.joinNext === 'string') parm.joinNext = raw.joinNext;
    else delete parm.joinNext;
  }
  if (raw.labelHidden !== undefined) parm.labelHidden = asBoolean(raw.labelHidden);
  if (raw.range !== undefined) {
    const range = asVec2(raw.range, [NaN, NaN]);
    if (Number.isFinite(range[0])) parm.range = range;
    else delete parm.range;
  }
  if (raw.hasMenu !== undefined) parm.hasMenu = asBoolean(raw.hasMenu);
  const ramp = normalizeRamp(raw.ramp);
  if (ramp) parm.ramp = ramp;
  else delete parm.ramp;
  return parm;
}

function normalizeFlags(value: unknown): HoudiniNodeFlags {
  const flags = isRecord(value) ? value : {};
  return {
    bypass: asBoolean(flags.bypass),
    display: asBoolean(flags.display),
    render: asBoolean(flags.render),
    template: asBoolean(flags.template),
    selectableTemplate: asBoolean(flags.selectableTemplate),
    lock: asBoolean(flags.lock),
    softLock: asBoolean(flags.softLock),
  };
}

function normalizeNode(raw: JsonRecord, depth: number): HoudiniNodeData | null {
  const name = asName(raw.name);
  if (name === null) return null;
  const type = asString(raw.type, 'unknown');
  const children = isRecord(raw.children) && depth < MAX_SUBNETWORK_DEPTH ? normalizeGraph(raw.children, depth + 1) : undefined;
  const node: HoudiniNodeData = {
    ...raw,
    name,
    type,
    label: asString(raw.label, type),
    icon: asString(raw.icon),
    pos: asVec2(raw.pos, [0, 0]),
    size: asVec2(raw.size, [1, 0.3]),
    color: asRgb(raw.color, [0.8, 0.8, 0.8]),
    shape: asString(raw.shape, 'rect'),
    flags: normalizeFlags(raw.flags),
    maxInputs: Math.max(0, Math.floor(asNumber(raw.maxInputs, 1))),
    inputLabels: asStringList(raw.inputLabels),
    maxOutputs: Math.max(0, Math.floor(asNumber(raw.maxOutputs, 1))),
    outputLabels: asStringList(raw.outputLabels),
    comment: asString(raw.comment),
    showComment: asBoolean(raw.showComment),
    isSubnetwork: asBoolean(raw.isSubnetwork),
    hdaState: raw.hdaState === 'locked' || raw.hdaState === 'unlocked' ? raw.hdaState : null,
    parms: mapRecords(raw.parms, normalizeParm),
    children,
  };
  if (raw.nonDefaultParms !== undefined) {
    node.nonDefaultParms = mapRecords(raw.nonDefaultParms, (p) => {
      const parmName = asName(p.name);
      if (parmName === null) return null;
      const value = p.val;
      return {
        name: parmName,
        label: asString(p.label, parmName),
        val: typeof value === 'string' || typeof value === 'boolean' || isFiniteNumber(value) ? value : String(value ?? ''),
        expr: typeof p.expr === 'string' ? p.expr : null,
      };
    });
  }
  if (children === undefined) delete node.children;
  return node;
}

function normalizeDot(raw: JsonRecord): HoudiniDotData | null {
  const name = asName(raw.name);
  if (name === null) return null;
  return { ...raw, name, pos: asVec2(raw.pos, [0, 0]), pinned: asBoolean(raw.pinned) };
}

function normalizeBox(raw: JsonRecord): HoudiniNetworkBoxData | null {
  const name = asName(raw.name);
  if (name === null) return null;
  return {
    ...raw,
    name,
    comment: asString(raw.comment),
    pos: asVec2(raw.pos, [0, 0]),
    size: asVec2(raw.size, [2.5, 1.5]),
    color: asRgb(raw.color, [0.52, 0.52, 0.52]),
    minimized: asBoolean(raw.minimized),
    items: asStringList(raw.items),
  };
}

function normalizeSticky(raw: JsonRecord): HoudiniStickyNoteData | null {
  const name = asName(raw.name);
  if (name === null) return null;
  const sticky: HoudiniStickyNoteData = {
    ...raw,
    name,
    text: asString(raw.text),
    pos: asVec2(raw.pos, [0, 0]),
    size: asVec2(raw.size, [2, 1]),
    color: asRgb(raw.color, [1, 0.97, 0.6]),
    minimized: asBoolean(raw.minimized),
  };
  if (isRgb(raw.textColor)) sticky.textColor = asRgb(raw.textColor, [0, 0, 0]);
  else delete sticky.textColor;
  if (raw.drawBackground !== undefined) sticky.drawBackground = raw.drawBackground !== false;
  return sticky;
}

function normalizeSubnetInput(raw: JsonRecord): HoudiniSubnetInputData | null {
  const name = asName(raw.name);
  if (name === null) return null;
  return {
    ...raw,
    name,
    num: Math.max(0, Math.floor(asNumber(raw.num, 0))),
    pos: asVec2(raw.pos, [0, 0]),
    inputName: asString(raw.inputName),
  };
}

function normalizeWire(raw: JsonRecord): HoudiniWireData | null {
  const from = asName(raw.from);
  const to = asName(raw.to);
  if (from === null || to === null) return null;
  return {
    ...raw,
    from,
    to,
    fromOutput: Math.max(0, Math.floor(asNumber(raw.fromOutput, 0))),
    toInput: Math.max(0, Math.floor(asNumber(raw.toInput, 0))),
  };
}

function normalizePathNode(raw: JsonRecord): HoudiniPathNode | null {
  const name = asName(raw.name);
  if (name === null) return null;
  const pathNode: HoudiniPathNode = { name, type: asString(raw.type) };
  if (typeof raw.icon === 'string') pathNode.icon = raw.icon;
  return pathNode;
}

/**
 * Checks one network level and everything below it. Items without a name are dropped, missing or
 * wrong values get their documented default, and unknown extra fields are kept.
 */
export function normalizeGraph(raw: unknown, depth = 0): HoudiniNetworkGraph {
  const graph = isRecord(raw) ? raw : {};
  const normalized: HoudiniNetworkGraph = {
    ...graph,
    path: asString(graph.path, '/obj'),
    type: asString(graph.type, 'geo'),
    nodes: mapRecords(graph.nodes, (node) => normalizeNode(node, depth)),
    dots: mapRecords(graph.dots, normalizeDot),
    boxes: mapRecords(graph.boxes, normalizeBox),
    stickies: mapRecords(graph.stickies, normalizeSticky),
    wires: mapRecords(graph.wires, normalizeWire),
    subnetInputs: mapRecords(graph.subnetInputs, normalizeSubnetInput),
  };
  if (graph.context !== undefined) normalized.context = asString(graph.context, 'Sop');
  if (graph.wireStyle !== undefined) normalized.wireStyle = graph.wireStyle === 'rounded' ? 'rounded' : 'default';
  if (graph.pathNodes !== undefined) normalized.pathNodes = mapRecords(graph.pathNodes, normalizePathNode);
  return normalized;
}

/**
 * Normalizes any raw JSON input (a full `HoudiniNetworkDocument` or a legacy diagnostic dump with
 * `nodes` at the top level) into a valid `HoudiniNetworkDocument`.
 *
 * Throws a readable error when the input is not a network at all, or comes from a newer major
 * schema version. Everything else is repaired or dropped item by item (see `normalizeGraph`).
 */
export function normalizeNetworkDocument(raw: unknown): HoudiniNetworkDocument {
  if (!isRecord(raw)) {
    throw new Error('Invalid Houdini network JSON: expected an object.');
  }

  // Versioning policy (docs/SCHEMA.md): every 1.x export is readable; a newer major is not
  const schemaMajor = typeof raw.schemaVersion === 'string' ? Number.parseInt(raw.schemaVersion, 10) : NaN;
  if (schemaMajor > SUPPORTED_SCHEMA_MAJOR) {
    throw new Error(
      `This file uses schema ${raw.schemaVersion as string}, made by a newer WOP exporter. ` +
        `Update the WOP viewer to show it (this viewer reads schema ${SUPPORTED_SCHEMA_MAJOR}.x).`,
    );
  }

  if (isRecord(raw.root)) {
    if (!Array.isArray(raw.root.nodes)) {
      throw new Error('Invalid Houdini network JSON: "root.nodes" must be a list of nodes.');
    }
    const document: HoudiniNetworkDocument = {
      ...raw,
      houdiniVersion: asString(raw.houdiniVersion, '22.0'),
      icons: ownEntries(raw.icons, (entry): entry is string => typeof entry === 'string'),
      customShapes: ownEntries(raw.customShapes, isRecord),
      root: normalizeGraph(raw.root),
    };
    if (raw.schemaVersion !== undefined) document.schemaVersion = asString(raw.schemaVersion);
    if (raw.exportedAt !== undefined) document.exportedAt = asString(raw.exportedAt);
    if (raw.exportMode !== undefined) document.exportMode = raw.exportMode === 'full' ? 'full' : 'compact';
    if (raw.exportWarnings !== undefined) document.exportWarnings = Math.max(0, Math.floor(asNumber(raw.exportWarnings, 0)));
    return document;
  }

  // Flat diagnostic JSON dumps, where `nodes` is at the top level
  if (Array.isArray(raw.nodes)) {
    const graph = normalizeGraph({
      ...raw,
      path: asString(raw.path, '/obj/geo1'),
      type: asString(raw.context, 'geo'),
      context: 'Sop',
    });
    return {
      schemaVersion: '1.0.0',
      houdiniVersion: asString(raw.houdiniVersion, '22.0'),
      icons: {},
      customShapes: {},
      root: graph,
    };
  }

  throw new Error('Unrecognized Houdini network JSON format.');
}
