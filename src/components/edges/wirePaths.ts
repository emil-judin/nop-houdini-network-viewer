import type { HoudiniWireStyle } from '../../schema/types';

/**
 * Length in pixels of the vertical stub where a `default`-style wire leaves an output or enters an input.
 */
const DEFAULT_STUB_PX = 12;

/**
 * Corner radius in pixels of the bends in a `default`-style wire (measured from Houdini 22).
 */
const DEFAULT_BEND_RADIUS_PX = 11;

/**
 * Houdini's `default` wire style: straight lines with rounded bends.
 *
 * The wire leaves a node output through a short vertical stub, bends, runs as a straight line, then
 * bends again into a short vertical stub above the input. Routing dots have no stub: the straight
 * line starts or ends at the dot center.
 */
export function getHoudiniDefaultWirePath(
  sourceX: number,
  sourceY: number,
  targetX: number,
  targetY: number,
  sourceIsDot = false,
  targetIsDot = false,
): string {
  const dy = targetY - sourceY;
  // Shorten the stubs when the two connectors are close together vertically
  const stub = dy > 0 ? Math.min(DEFAULT_STUB_PX, dy / 3) : DEFAULT_STUB_PX;
  const ax = sourceX;
  const ay = sourceIsDot ? sourceY : sourceY + stub;
  const bx = targetX;
  const by = targetIsDot ? targetY : targetY - stub;

  const length = Math.hypot(bx - ax, by - ay);
  if (length < 0.01) {
    return `M${sourceX},${sourceY} L${targetX},${targetY}`;
  }
  const ux = (bx - ax) / length;
  const uy = (by - ay) / length;
  const radius = Math.min(DEFAULT_BEND_RADIUS_PX, length / 2, stub);

  let d = `M${sourceX},${sourceY}`;
  if (!sourceIsDot) {
    d += ` L${ax},${ay - radius} Q${ax},${ay} ${ax + ux * radius},${ay + uy * radius}`;
  }
  if (!targetIsDot) {
    d += ` L${bx - ux * radius},${by - uy * radius} Q${bx},${by} ${bx},${by + radius}`;
  }
  return `${d} L${targetX},${targetY}`;
}

/**
 * Distance in pixels below the output at which a `rounded`-style wire runs horizontally
 * (measured from Houdini 22 at 1:1 scale; all wires from one output share this run).
 */
const ROUNDED_DROP_PX = 14;

/**
 * Extra drop for wires leaving a routing dot, so the bend clears the dot disc.
 */
const ROUNDED_DOT_EXTRA_DROP_PX = 6;

/**
 * Radius in pixels of the small corner right below the output in a `rounded`-style wire.
 */
const ROUNDED_SOURCE_RADIUS_PX = 13;

/**
 * Radius in pixels of the large corner above the input in a `rounded`-style wire.
 */
const ROUNDED_TARGET_RADIUS_PX = 28;

/**
 * Houdini's `rounded` wire style: orthogonal routing with circular corners.
 *
 * The wire drops a short distance below the output, turns through a small corner into a horizontal
 * run, then turns through a larger corner and drops vertically into the input (or a routing dot).
 * Wires whose target is above or level with the horizontal run fall back to the `default` shape.
 */
export function getHoudiniRoundedWirePath(
  sourceX: number,
  sourceY: number,
  targetX: number,
  targetY: number,
  sourceIsDot = false,
  targetIsDot = false,
): string {
  let runY = sourceY + ROUNDED_DROP_PX + (sourceIsDot ? ROUNDED_DOT_EXTRA_DROP_PX : 0);
  const dx = targetX - sourceX;
  // A routing dot sitting near the run's height is entered horizontally, straight into its center
  const entersDotSideways = targetIsDot && targetY > sourceY + 1 && targetY - runY < 4;
  if (entersDotSideways) {
    runY = targetY;
  } else if (targetY - runY < 4) {
    return getHoudiniDefaultWirePath(sourceX, sourceY, targetX, targetY, sourceIsDot, targetIsDot);
  }
  if (Math.abs(dx) < 0.5) {
    return `M${sourceX},${sourceY} L${targetX},${targetY}`;
  }

  const dir = Math.sign(dx);
  const sourceRadius = Math.min(ROUNDED_SOURCE_RADIUS_PX, runY - sourceY, Math.abs(dx) / 2);
  const targetRadius = Math.max(0, Math.min(ROUNDED_TARGET_RADIUS_PX, targetY - runY, Math.abs(dx) - sourceRadius));
  // Heading down then turning east is a counter-clockwise turn on screen (sweep 0); west is clockwise
  const firstSweep = dir > 0 ? 0 : 1;
  const secondSweep = dir > 0 ? 1 : 0;

  return [
    `M${sourceX},${sourceY}`,
    `L${sourceX},${runY - sourceRadius}`,
    `A${sourceRadius},${sourceRadius} 0 0 ${firstSweep} ${sourceX + dir * sourceRadius},${runY}`,
    `L${targetX - dir * targetRadius},${runY}`,
    `A${targetRadius},${targetRadius} 0 0 ${secondSweep} ${targetX},${runY + targetRadius}`,
    `L${targetX},${targetY}`,
  ].join(' ');
}

/**
 * Builds the SVG path for a wire in the given Houdini wire style.
 */
export function getHoudiniWirePath(
  style: HoudiniWireStyle,
  sourceX: number,
  sourceY: number,
  targetX: number,
  targetY: number,
  sourceIsDot = false,
  targetIsDot = false,
): string {
  return style === 'rounded'
    ? getHoudiniRoundedWirePath(sourceX, sourceY, targetX, targetY, sourceIsDot, targetIsDot)
    : getHoudiniDefaultWirePath(sourceX, sourceY, targetX, targetY, sourceIsDot, targetIsDot);
}
