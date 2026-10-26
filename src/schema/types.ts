/**
 * Canonical TypeScript schema definitions for WOP.
 *
 * These interfaces define the JSON contract produced by `exporter/wop_exporter.py`
 * and consumed by the React Flow converter and visual components.
 */

/**
 * Normalized RGB color tuple with channel values in the range [0.0, 1.0],
 * matching `hou.Color.rgb()` in SideFX Houdini.
 */
export type HoudiniRgbColor = [number, number, number];

/**
 * 2D vector tuple `[x, y]` in Houdini network editor units.
 * Note: In Houdini network space, +X is right and +Y is UP.
 */
export type HoudiniVec2 = [number, number];

/**
 * Built-in Houdini node shape identifiers supported natively by the renderer.
 */
export type HoudiniBuiltinNodeShape =
  | 'rect'
  | 'wave'
  | 'cigar'
  | 'diamond'
  | 'null'
  | 'chevron_down'
  | 'chevron_up'
  | 'tilted'
  | 'circle';

/**
 * Read-only visual status flags for a Houdini SOP node.
 */
export interface HoudiniNodeFlags {
  /** Yellow bypass flag on the left side of the node. */
  bypass: boolean;
  /** Blue display flag on the right side of the node. */
  display: boolean;
  /** Purple/blue render flag on the right side of the node. */
  render: boolean;
  /** Pink template flag on the right side of the node. */
  template: boolean;
  /** Selectable template flag on the right side of the node. */
  selectableTemplate?: boolean;
  /** Red hard-lock flag on the left side of the node. */
  lock: boolean;
  /** Soft-lock flag on the left side of the node. */
  softLock?: boolean;
}

/**
 * Serialized parameter tuple (`hou.ParmTuple`) for the read-only Parameter Inspector.
 */
export interface HoudiniParmTupleData {
  /** Internal parameter tuple name (e.g. `t`, `divrate`, `snippet`). */
  name: string;
  /** Human-readable parameter label shown in the Houdini Parameter Pane (e.g. `Translate`). */
  label: string;
  /** Parameter template type name (e.g. `Float`, `Int`, `String`, `Menu`, `Toggle`, `Folder`). */
  type?: string;
  /** Evaluated parameter component values. */
  val: Array<string | number | boolean>;
  /** Channel expressions per component (e.g. `ch("../scale")`), or `null` if constant. */
  expr: Array<string | null>;
  /**
   * Folder (tab) labels that contain this parameter, outermost first (`hou.Parm.containingFolders()`),
   * e.g. `["Attributes", "Target"]`. Empty or missing for top-level parameters and older exports.
   */
  folders?: string[];
  /**
   * How Houdini draws each entry of `folders` (same length). Missing in exports before schema 1.2.0,
   * where folders are drawn as `simple` sections.
   */
  folderTypes?: HoudiniFolderType[];
  /** Label of the selected menu item for `Menu` parameters (e.g. `Primitives` for token `primitive`). */
  menuLabel?: string;
  /** Per component: `true` when the component is animated with keyframes (Houdini colors these fields green). */
  keyframed?: boolean[];
  /** Per component: `true` when the value differs from the parameter default (Houdini shows it in bold). */
  changed?: boolean[];
  /** `true` when a disable-when rule greys the parameter out in Houdini (schema 1.2.0). */
  disabled?: boolean;
  /**
   * Name of the parameter drawn on the same row to the right ("join with next"), e.g. `Snap To [menu] Using [menu]`.
   * Only joined when that parameter directly follows in `parms` (schema 1.2.0).
   */
  joinNext?: string;
  /** `true` when Houdini hides the label (a toggle in front of the next parameter, for example). */
  labelHidden?: boolean;
  /** Slider range `[min, max]` of single-component `Float` / `Int` parameters. */
  range?: [number, number];
  /** `true` for string parameters with a menu button on the right (groups, attribute names). */
  hasMenu?: boolean;
  /** Points of a `Ramp` parameter (`hou.Ramp`), for the curve / gradient display (schema 1.2.0). */
  ramp?: HoudiniRampData;
}

/**
 * Ramp parameter points (`hou.Parm.evalAsRamp()`). `keys[i]` is the position in `[0, 1]`, `values[i]`
 * a number (float ramp) or `[r, g, b]` (color ramp), and `basis[i]` the interpolation from point `i`
 * to the next (`Constant`, `Linear`, `CatmullRom`, `MonotoneCubic`, `Bezier`, `BSpline`, `Hermite`).
 */
export interface HoudiniRampData {
  /** `true` for a color ramp, `false` for a float (curve) ramp. */
  color: boolean;
  keys: number[];
  values: Array<number | [number, number, number]>;
  basis: string[];
}

/**
 * How the Houdini Parameter Pane draws a folder (`hou.folderType`):
 * `tabs` / `radio` as a tab bar, `simple` as a titled section band, `collapsible` as a section band with
 * an expand arrow, `multiparm` as a section for multiparm instances, `import` without any frame.
 */
export type HoudiniFolderType = 'tabs' | 'radio' | 'simple' | 'collapsible' | 'multiparm' | 'import';

/**
 * Serialized representation of an individual Houdini operator node (`hou.Node`).
 */
export interface HoudiniNodeData {
  /** Unique node name within its parent network (e.g. `attribwrangle1`). */
  name: string;
  /** Operator type name (e.g. `attribwrangle`, `box`, `merge`). */
  type: string;
  /** Human-readable operator type description (e.g. `Attribute Wrangle`). */
  label: string;
  /** Houdini icon identifier (e.g. `SOP_attribwrangle` or `opdef:/...?IconSVG`). */
  icon: string;
  /** Bottom-left position `[x, y]` in Houdini network units (`+Y` is up). */
  pos: HoudiniVec2;
  /** Width and height `[w, h]` in Houdini network units (standard SOP is `[1.1296, 0.2824]`). */
  size: HoudiniVec2;
  /** Node RGB color in `[0.0, 1.0]` range. */
  color: HoudiniRgbColor;
  /** Node shape name (`rect`, `wave`, `cigar`, `diamond`, etc.). Empty string normalizes to `rect`. */
  shape: string;
  /** Visual status flags on the node. */
  flags: HoudiniNodeFlags;
  /** Maximum number of input connectors (`> 4` indicates a multi-input bar such as `merge` or `switch`). */
  maxInputs: number;
  /** Hover descriptions for each input connector. */
  inputLabels: string[];
  /** Maximum number of output connectors. */
  maxOutputs?: number;
  /** Hover descriptions for each output connector. */
  outputLabels?: string[];
  /** Optional user comment attached to the node. */
  comment: string;
  /** Whether the node comment is displayed directly in the network view. */
  showComment?: boolean;
  /** Whether this node is a user-navigable subnetwork containing child nodes. */
  isSubnetwork: boolean;
  /**
   * Digital asset state: `locked` (grey padlock under the name), `unlocked` (red open padlock, editable),
   * or `null` for nodes that are not assets. Missing in exports before schema 1.2.0.
   */
  hdaState?: 'locked' | 'unlocked' | null;
  /** Exported parameter tuples for inspection. */
  parms?: HoudiniParmTupleData[];
  /** Legacy fallback field name for non-default parameters from diagnostic dumps. */
  nonDefaultParms?: Array<{
    name: string;
    label: string;
    val: string | number | boolean;
    expr: string | null;
  }>;
  /** Nested child network when `isSubnetwork` is true. */
  children?: HoudiniNetworkGraph;
}

/**
 * Serialized representation of a wire routing dot (`hou.NetworkDot`).
 */
export interface HoudiniDotData {
  /** Unique dot identifier within the network (e.g. `__dot1`). */
  name: string;
  /** Center position `[x, y]` in Houdini network units (`+Y` is up). */
  pos: HoudiniVec2;
  /** Whether the dot is pinned in the network editor. */
  pinned?: boolean;
}

/**
 * Serialized representation of a background Network Box (`hou.NetworkBox`).
 */
export interface HoudiniNetworkBoxData {
  /** Unique network box identifier (e.g. `__netbox1`). */
  name: string;
  /** Title / header comment displayed at the top of the network box. */
  comment: string;
  /** Bottom-left position `[x, y]` in Houdini network units. */
  pos: HoudiniVec2;
  /** Width and height `[w, h]` in Houdini network units (`h` is `0.0` when minimized). */
  size: HoudiniVec2;
  /** Box RGB color in `[0.0, 1.0]` range. */
  color: HoudiniRgbColor;
  /** Whether the network box is collapsed to its header bar. */
  minimized?: boolean;
  /** Names of child nodes and dots contained inside this network box. */
  items?: string[];
}

/**
 * Serialized representation of a Sticky Note (`hou.StickyNote`).
 */
export interface HoudiniStickyNoteData {
  /** Unique sticky note identifier (e.g. `__sticky1`). */
  name: string;
  /** Text content of the sticky note. */
  text: string;
  /** Bottom-left position `[x, y]` in Houdini network units. */
  pos: HoudiniVec2;
  /** Width and height `[w, h]` in Houdini network units. */
  size: HoudiniVec2;
  /** Sticky note background RGB color in `[0.0, 1.0]` range. */
  color: HoudiniRgbColor;
  /** Whether the sticky note is collapsed. */
  minimized?: boolean;
  /** Text RGB color in `[0.0, 1.0]` range (`hou.StickyNote.textColor()`). Defaults to near-black. */
  textColor?: HoudiniRgbColor;
  /** Whether the note draws its colored background (`hou.StickyNote.drawBackground()`). Defaults to `true`. */
  drawBackground?: boolean;
}

/**
 * Serialized representation of a Subnetwork Indirect Input (`hou.SubnetIndirectInput`).
 */
export interface HoudiniSubnetInputData {
  /** Input identifier (typically `"1"`, `"2"`, `"3"`, `"4"`). */
  name: string;
  /** Zero-based input index (`0..3`). */
  num: number;
  /** Position `[x, y]` in Houdini network units. */
  pos: HoudiniVec2;
  /**
   * Name of the node wired into the matching input of the parent subnetwork (e.g. `transform1`).
   * Houdini displays it as a second label line. Empty or missing when the input is unconnected.
   */
  inputName?: string;
}

/**
 * Serialized wire connection between two items in a Houdini network (`hou.NodeConnection`).
 */
export interface HoudiniWireData {
  /** Source item name (node name, dot name, or subnet input name `"1"`). */
  from: string;
  /** Zero-based output connector index on the source item. */
  fromOutput: number;
  /** Target item name (node name or dot name). */
  to: string;
  /** Zero-based input connector index on the target item. */
  toInput: number;
}

/**
 * Houdini Network Editor wire style (`hou.NodeTypeCategory.defaultWireStyle()`).
 * - `default`: straight lines with short vertical stubs at connectors and rounded bends.
 * - `rounded`: orthogonal routing (short drop, horizontal run, vertical drop) with rounded corners.
 */
export type HoudiniWireStyle = 'default' | 'rounded';

/**
 * Serialized graph data for a single Houdini network level.
 */
export interface HoudiniNetworkGraph {
  /** Full Houdini node path (e.g. `/obj/circuit_board/circuit_gen`). */
  path: string;
  /** Operator type of the container network (e.g. `geo`, `subnet`). */
  type: string;
  /** Operator context category (e.g. `Sop`). */
  context?: string;
  /** Operator nodes in this network. */
  nodes: HoudiniNodeData[];
  /** Wire routing dots in this network. */
  dots: HoudiniDotData[];
  /** Background network boxes in this network. */
  boxes: HoudiniNetworkBoxData[];
  /** Background sticky notes in this network. */
  stickies: HoudiniStickyNoteData[];
  /** Directed wire connections between nodes, dots, and subnet inputs. */
  wires: HoudiniWireData[];
  /** Indirect parent input connectors at the top of a subnetwork. */
  subnetInputs?: HoudiniSubnetInputData[];
  /** Wire style of this network in Houdini (missing in older exports, which means `default`). */
  wireStyle?: HoudiniWireStyle;
  /**
   * Every node on the path to this network, from the top (`obj`) down to the network itself
   * (exported root only, schema 1.3.0). Gives the path bar the right icons.
   */
  pathNodes?: HoudiniPathNode[];
}

/**
 * One node on the path to the exported network (for example `/obj` or `/obj/circuit_board`).
 */
export interface HoudiniPathNode {
  /** Node name (`obj`, `circuit_board`). */
  name: string;
  /** Operator type (`obj`, `geo`, `emjud::circuit_gen::1.0`). */
  type: string;
  /** Houdini icon id (`OBJ_geo`, `MISC_digital_asset`); custom asset icons are in the document's `icons`. */
  icon?: string;
}

/**
 * Top-level JSON document produced by the WOP exporter.
 */
export interface HoudiniNetworkDocument {
  /** Schema semantic version (e.g. `"1.0.0"`). */
  schemaVersion?: string;
  /** SideFX Houdini version string (e.g. `"22.0.466"`). */
  houdiniVersion: string;
  /** ISO-8601 timestamp when the network was exported. */
  exportedAt?: string;
  /** Parameter export depth mode (`"compact"` or `"full"`). */
  exportMode?: 'compact' | 'full';
  /** Deduplicated dictionary mapping icon names to raw SVG markup. */
  icons?: Record<string, string>;
  /** Deduplicated dictionary mapping custom shape names to raw Houdini NodeShape JSON objects. */
  customShapes?: Record<string, unknown>;
  /** Root network graph. */
  root: HoudiniNetworkGraph;
}

