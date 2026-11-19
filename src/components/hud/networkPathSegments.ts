import type { SubnetLevel } from '../../schema/subnetPath';
import type { HoudiniNetworkGraph, HoudiniPathNode } from '../../schema/types';
import { DEFAULT_OPERATOR_ICON } from '../nodes/icons/defaultIcon';
import { resolveOperatorIcon } from '../nodes/icons/iconRegistry';
import type { OperatorIconDef } from '../nodes/icons/iconTypes';
import { PATH_ASSET_ICON, PATH_ICONS } from '../nodes/icons/path/pathIcons';
import { svgToDataUri } from '../nodes/icons/svgDataUri';

/** Icon of one path segment: a registered drawing or a custom asset icon exported from Houdini. */
export type PathSegmentIcon = { def: OperatorIconDef } | { src: string };

/**
 * One segment of the network path bar (`assets`, `scene`, `pebble_scatter1`).
 */
export interface NetworkPathSegment {
  /** Node name shown in the bar. */
  name: string;
  /** Full Houdini path of the segment (`/obj/assets/scene`). */
  path: string;
  /** Exported level (`0` is the exported root). */
  depth: number;
  /** `true` for the network on screen. */
  current: boolean;
  /** `true` for levels below the network on screen that were visited before (Houdini dims them). */
  dimmed: boolean;
  /** Segment icon, or `null` when the node type is unknown. */
  icon: PathSegmentIcon | null;
}

/** Type and icon of a path node, as far as they are known. */
export type PathNodeInfo = Pick<HoudiniPathNode, 'type' | 'icon'>;

/**
 * Type and icon the path bar shows for the exported root network: its own path node (the last one,
 * schema 1.3.0), or else just the network type.
 */
export function rootPathNodeInfo(root: HoudiniNetworkGraph): PathNodeInfo {
  const rootSegments = root.path.split('/').filter(Boolean);
  const rootName = rootSegments[rootSegments.length - 1];
  const rootNode = root.pathNodes?.[root.pathNodes.length - 1];
  return rootNode?.name === rootName ? rootNode : { type: root.type };
}

/**
 * The path bar's own icon for a node, a custom asset icon from the export or a path bar drawing
 * (context, object), or `null` when the bar uses the operator drawing.
 */
export function ownPathIcon(info: PathNodeInfo, documentIcons: Record<string, string>): PathSegmentIcon | null {
  const src = info.icon && Object.hasOwn(documentIcons, info.icon) ? svgToDataUri(documentIcons[info.icon]) : null;
  if (src) return { src };
  const icon = (info.icon ?? '').toLowerCase();
  const pathDef = PATH_ICONS.find((def) => def.types.includes(info.type) || (icon && def.icons?.includes(icon)));
  return pathDef ? { def: pathDef } : null;
}

/**
 * Icon of a path node: a custom asset icon from the export, a path bar drawing (context, object,
 * digital asset), or the operator drawing used on the canvas.
 */
function resolveSegmentIcon(info: PathNodeInfo | null, documentIcons: Record<string, string>): PathSegmentIcon | null {
  if (!info) return null;
  const own = ownPathIcon(info, documentIcons);
  if (own) return own;
  const def = resolveOperatorIcon(info.type, info.icon, true);
  // Houdini shows a cardboard box for digital assets (`ns::name::1.0`) without an icon of their own
  const isGeneric = def.id === 'sop.subnet' || def === DEFAULT_OPERATOR_ICON;
  if (isGeneric && !info.icon && info.type.includes('::')) return { def: PATH_ASSET_ICON };
  return { def };
}

/**
 * Builds the path bar segments: every exported level of the trail, starting at the exported root.
 * Nodes above the export (`obj`) are left out because they cannot be opened. Levels up to
 * `activeDepth` are the path on screen; deeper trail levels are dimmed.
 *
 * @param trail Levels from the exported root down to the deepest visited subnetwork.
 * @param activeDepth Depth of the network on screen within `trail`.
 */
export function buildNetworkPathSegments(
  trail: SubnetLevel[],
  activeDepth: number,
  documentIcons: Record<string, string> = {},
): NetworkPathSegment[] {
  const root = trail[0].graph;
  const rootSegments = root.path.split('/').filter(Boolean);
  const rootName = rootSegments[rootSegments.length - 1];
  // The last path node is the exported network itself (schema 1.3.0), with its real icon
  const rootInfo = rootPathNodeInfo(root);

  return trail.map((level, depth) => {
    const info: PathNodeInfo = level.node ? { type: level.node.type, icon: level.node.icon } : rootInfo;
    return {
      name: level.node?.name ?? rootName ?? root.path,
      path: level.graph.path,
      depth,
      current: depth === activeDepth,
      dimmed: depth > activeDepth,
      icon: resolveSegmentIcon(info, documentIcons),
    };
  });
}
