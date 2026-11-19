import type { OperatorIconDef } from '../../iconTypes';
import { PRIMITIVE_ICONS } from './primitives';
import { TEST_GEOMETRY_ICONS } from './testGeometry';
import { POLY_ICONS } from './poly';
import { EDGE_CURVE_ICONS } from './edgeCurve';
import { CURVE_ICONS } from './curves';
import { NURBS_ICONS } from './nurbs';
import { CUT_ICONS } from './cut';
import { COPY_ICONS } from './copy';
import { TRANSFORM_ICONS } from './transform';
import { DEFORM_ICONS } from './deform';
import { POINT_ICONS } from './points';
import { TOPO_ICONS } from './topo';
import { IMPLICIT_REMESH_ICONS } from './implicitRemesh';

/**
 * Modeling operators: primitives, polygons, curves, NURBS, points, deformers and transforms.
 */
export const SOP_MODELING_ICONS: OperatorIconDef[] = [
  ...PRIMITIVE_ICONS,
  ...TEST_GEOMETRY_ICONS,
  ...POLY_ICONS,
  ...EDGE_CURVE_ICONS,
  ...CURVE_ICONS,
  ...NURBS_ICONS,
  ...CUT_ICONS,
  ...COPY_ICONS,
  ...TRANSFORM_ICONS,
  ...DEFORM_ICONS,
  ...POINT_ICONS,
  ...TOPO_ICONS,
  ...IMPLICIT_REMESH_ICONS,
];
