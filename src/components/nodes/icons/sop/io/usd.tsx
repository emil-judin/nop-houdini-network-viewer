import React from 'react';
import { gearPath, isoBoxFaces, type Pt, pts, roundedRectPath } from '../../geoHelpers';
import { CasedStroke, ShadedSphere, SPHERE_TONES } from '../../geoKits';
import type { OperatorIconDef } from '../../iconTypes';
import { UsdComponentCup, UsdLayerStack, UsdRoundBadge } from '../kits/usd';

const BadgeDownRightArrow: React.FC = () => (
  <polygon points="-2.2,-1.1 -0.6,-2.5 0.9,-1.0 1.9,-2.0 2.2,2.2 -2.0,1.9 -1.0,0.9" fill="#ffffff" />
);

const PointPin: React.FC<{ cx: number; cy: number }> = ({ cx, cy }) => (
  <g transform={`translate(${cx} ${cy})`}>
    <path
      d="M0,3.6 C-1.75,1.4 -2.45,0.05 -2.45,-1.05 A2.45,2.45 0 1,1 2.45,-1.05 C2.45,0.05 1.75,1.4 0,3.6 Z"
      fill="#ffffff"
      stroke="#262626"
      strokeWidth="0.95"
      strokeLinejoin="round"
    />
    <circle cx="0" cy="-1.05" r="0.9" fill="#5a616b" stroke="#262626" strokeWidth="0.6" />
  </g>
);

const STAGE_TOP: Pt[] = [
  [5.6, 14.4],
  [18.4, 14.4],
  [20.4, 19.8],
  [3.6, 19.8],
];

const STAGE_FRONT: Pt[] = [
  [3.6, 19.8],
  [20.4, 19.8],
  [20.4, 21.6],
  [3.6, 21.6],
];

const proxyBox = isoBoxFaces(12, 3.2, 7.8, 9.6);

const proxyTop = proxyBox.top;

const proxyBottom: Pt[] = [
  [proxyTop[0][0], proxyTop[0][1] + 9.6],
  [proxyTop[1][0], proxyTop[1][1] + 9.6],
  [proxyTop[2][0], proxyTop[2][1] + 9.6],
  [proxyTop[3][0], proxyTop[3][1] + 9.6],
];

const edgeD = (a: Pt, b: Pt): string => `M${pts([a])} L${pts([b])}`;

const PROXY_BACK_EDGES = [
  edgeD(proxyTop[0], proxyBottom[0]),
  edgeD(proxyBottom[0], proxyBottom[1]),
  edgeD(proxyBottom[0], proxyBottom[3]),
].join(' ');

const PROXY_FRONT_EDGES = [
  `M${pts(proxyTop).replace(/ /g, ' L')} Z`,
  edgeD(proxyTop[1], proxyBottom[1]),
  edgeD(proxyTop[2], proxyBottom[2]),
  edgeD(proxyTop[3], proxyBottom[3]),
  edgeD(proxyBottom[1], proxyBottom[2]),
  edgeD(proxyBottom[2], proxyBottom[3]),
].join(' ');

const PROXY_VERTS: readonly Pt[] = [...proxyTop, ...proxyBottom];

/**
 * USD operators: the USD layer frame.
 */
export const USD_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.usdapexsceneimport',
    label: 'USD APEX Scene Import (Beta)',
    family: 'sop',
    types: ['usdapexsceneimport'],
    icons: ['sop_usdapexsceneimport'],
    refKey: 'SOP_usdapexsceneimport',
    description:
      'Stylized blue generic figure with one arm reaching down-left and one out-right, centered on a stepped orange stage.',
    render: () => (
      <>
        <g stroke="#262626" strokeWidth="0.95" strokeLinejoin="round">
          <polygon points={pts(STAGE_TOP)} fill="#ffb066" />
          <polygon points={pts(STAGE_FRONT)} fill="#ee8624" />
        </g>
        <g stroke="#262626" strokeWidth="0.9" strokeLinejoin="round">
          <path
            d="M11.6,5.8 L13.8,6.0 L18.6,6.4 L18.5,7.6 L13.8,7.6 L13.4,10.8 L14.8,17.6 L13.2,17.8 L12.0,12.2 L9.2,17.6 L7.6,17.0 L10.7,10.8 L10.9,7.6 L7.4,11.2 L6.5,10.3 L11.0,5.8 Z"
            fill="#8fc2ff"
          />
          <circle cx="12.6" cy="3.8" r="1.55" fill="#eef2f7" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.usdconfigure',
    label: 'USD Configure Import',
    family: 'sop',
    types: ['usdconfigure'],
    icons: ['sop_usdconfigure'],
    refKey: 'SOP_usdconfigure',
    description: 'Three stacked blue hollow square USD layer frames with a dark round gear badge at the bottom right.',
    render: () => (
      <>
        <UsdLayerStack x={10.6} y={10.8} scale={0.88} />
        <UsdRoundBadge cx={16.8} cy={16.8} r={4.6}>
          <path d={gearPath(0, 0, 8, 3.0, 2.05)} fill="#ffffff" />
          <circle cx="0" cy="0" r="1.0" fill="#2e3338" />
        </UsdRoundBadge>
      </>
    ),
  },
  {
    id: 'sop.usdconfigureprimsfrompoints',
    label: 'USD Configure Prims from Points',
    family: 'sop',
    types: ['usdconfigureprimsfrompoints'],
    icons: ['sop_usdconfigureprimsfrompoints'],
    refKey: 'SOP_usdconfigureprimsfrompoints',
    description:
      'Overlapping blue rounded rectangle, red circle, and orange triangle each with a green center dot, plus a small USD layer stack at the bottom right.',
    render: () => (
      <>
        <g stroke="#262626" strokeWidth="0.9" strokeLinejoin="round">
          <path d={roundedRectPath(3.0, 2.8, 7.6, 8.6, 1.8)} fill="#8fc2ff" />
          <path d={roundedRectPath(4.5, 4.3, 4.6, 5.6, 0.9)} fill="#5aa2f2" strokeWidth="0.7" />
          <circle cx="6.8" cy="7.1" r="1.25" fill="#58c848" strokeWidth="0.7" />

          <circle cx="14.8" cy="8.0" r="4.4" fill="#ff7066" />
          <circle cx="14.8" cy="8.0" r="2.4" fill="#5a616b" strokeWidth="0.7" />
          <circle cx="14.8" cy="8.0" r="1.25" fill="#58c848" strokeWidth="0.7" />

          <polygon points="9.2,9.4 15.0,19.4 3.4,19.4" fill="#ffe47a" />
          <polygon points="9.2,12.2 12.6,17.8 5.8,17.8" fill="#5a616b" strokeWidth="0.7" />
          <circle cx="9.2" cy="15.8" r="1.25" fill="#58c848" strokeWidth="0.7" />
        </g>
        <UsdLayerStack x={16.0} y={16.0} scale={0.6} />
      </>
    ),
  },
  {
    id: 'sop.usdcreatecomponent',
    label: 'USD Create Component',
    family: 'sop',
    types: ['usdcreatecomponent'],
    icons: ['sop_usdcreatecomponent'],
    refKey: 'SOP_usdcreatecomponent',
    description:
      'White ceramic mug with a right handle, dark rim interior, and a light-blue five-pointed star on the front.',
    render: (uid) => <UsdComponentCup uid={uid} x={11.5} y={12.4} scale={1.18} />,
  },
  {
    id: 'sop.usdcreateproxygeometry',
    label: 'USD Create Proxy Geometry',
    family: 'sop',
    types: ['usdcreateproxygeometry'],
    icons: ['sop_usdcreateproxygeometry'],
    refKey: 'SOP_usdcreateproxygeometry',
    description: 'White component mug with a blue star enclosed inside a red wireframe bounding box.',
    render: (uid) => (
      <>
        <CasedStroke d={PROXY_BACK_EDGES} color="#ff7066" width={0.95} casing={1.45} />
        <UsdComponentCup uid={uid} x={11.8} y={12.4} scale={0.86} />
        <CasedStroke d={PROXY_FRONT_EDGES} color="#ff7066" width={0.95} casing={1.45} />
        {PROXY_VERTS.map(([vx, vy], i) => (
          <circle key={i} cx={vx} cy={vy} r="0.85" fill="#ff7066" stroke="#262626" strokeWidth="0.6" />
        ))}
      </>
    ),
  },
  {
    id: 'sop.usdexport',
    label: 'USD File Export',
    family: 'sop',
    types: ['usdexport'],
    icons: ['sop_usdexport'],
    refKey: 'SOP_usdexport',
    description:
      'Dark round badge with a white down-right arrow at the top left over three stacked blue USD layer frames.',
    render: () => (
      <>
        <UsdLayerStack x={13.4} y={13.2} scale={0.88} />
        <UsdRoundBadge cx={7.2} cy={7.2} r={4.6}>
          <BadgeDownRightArrow />
        </UsdRoundBadge>
      </>
    ),
  },
  {
    id: 'sop.usdimport',
    label: 'USD File Import',
    family: 'sop',
    types: ['usdimport'],
    icons: ['sop_usdimport'],
    refKey: 'SOP_usdimport',
    description:
      'Three stacked blue USD layer frames with a dark round badge and white down-right arrow at the bottom right.',
    render: () => (
      <>
        <UsdLayerStack x={10.6} y={10.8} scale={0.88} />
        <UsdRoundBadge cx={16.8} cy={16.8} r={4.6}>
          <BadgeDownRightArrow />
        </UsdRoundBadge>
      </>
    ),
  },
  {
    id: 'sop.usdparentgeometry',
    label: 'USD Parent Geometry',
    family: 'sop',
    types: ['usdparentgeometry'],
    icons: ['sop_usdparentgeometry'],
    refKey: 'SOP_usdparentgeometry',
    description:
      'Two shaded grey spheres linked by a bar at the top left, with a second bar extending behind a white component mug with a blue star.',
    render: (uid) => (
      <>
        <CasedStroke d="M5.2,8.8 L11.4,5.4" color="#c0c7d1" width={1.5} casing={2.9} />
        <CasedStroke d="M11.4,5.4 L14.8,13.4" color="#c0c7d1" width={1.5} casing={2.9} />
        <ShadedSphere id={`${uid}-p1`} cx={5.2} cy={8.8} r={2.5} tones={SPHERE_TONES.grey} />
        <ShadedSphere id={`${uid}-p2`} cx={11.4} cy={5.4} r={2.5} tones={SPHERE_TONES.grey} />
        <UsdComponentCup uid={uid} x={14.8} y={15.6} scale={0.84} />
      </>
    ),
  },
  {
    id: 'sop.usdpointinstancerimport',
    label: 'USD PointInstancer Import',
    family: 'sop',
    types: ['usdpointinstancerimport'],
    icons: ['sop_usdpointinstancerimport'],
    refKey: 'SOP_usdpointinstancerimport',
    description:
      'Five grey teardrop point-instance pin markers arranged in a wide pentagon with clear vertical separation between rows.',
    render: () => (
      <>
        <PointPin cx={7.6} cy={5.6} />
        <PointPin cx={16.4} cy={5.6} />
        <PointPin cx={5.0} cy={14.5} />
        <PointPin cx={19.0} cy={14.5} />
        <PointPin cx={12.0} cy={18.3} />
      </>
    ),
  },
];
