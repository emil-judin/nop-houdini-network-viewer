import React from 'react';
import { isoBoxFaces, type Pt, pts } from '../../geoHelpers';
import { CasedStroke } from '../../geoKits';
import type { OperatorIconDef } from '../../iconTypes';
import { BlueWireBox, LopWoodenCrate, RoundGlyphBadge, RoundImportArrow } from '../kits/dopLop';

/**
 * Isometric three-tone grey cube helper for `sop.dopnet`.
 */
const GreyIsoCube: React.FC<{ x: number; y: number; w: number; h: number }> = ({ x, y, w, h }) => {
  const f = isoBoxFaces(x, y, w, h);
  return (
    <g stroke="#262626" strokeWidth="0.95" strokeLinejoin="round">
      <polygon points={pts(f.left)} fill="#c0c7d1" />
      <polygon points={pts(f.right)} fill="#89929e" />
      <polygon points={pts(f.top)} fill="#eef2f7" />
    </g>
  );
};

/**
 * Tilted 3/4 wooden chair traced from `SOP_dopimport` inside `BlueWireBox` for `sop.dopimport`.
 */
const TumblingChair: React.FC = () => (
  <g stroke="#262626" strokeWidth="0.65" strokeLinejoin="round">
    {/* Backrest side posts + top rail (leaves open window above seat) */}
    <polygon points="7.7,5.8 8.6,5.2 12.2,10.6 11.3,11.2" fill="#ee8624" />
    <polygon points="10.7,3.8 11.6,3.3 15.5,9.7 14.5,10.2" fill="#ee8624" />
    <polygon points="7.7,5.8 11.6,3.3 13.6,6.9 9.9,9.0" fill="#ffb066" />
    {/* Back-inner leg */}
    <polygon points="14.2,13.0 15.2,12.6 17.1,14.8 16.1,15.3" fill="#c25e12" />
    {/* Legs extending down-right from seat */}
    <polygon points="15.2,10.2 16.1,9.8 21.1,14.2 20.2,14.8" fill="#ee8624" />
    <polygon points="12.5,15.2 13.5,14.7 18.6,20.1 17.7,20.6" fill="#ee8624" />
    <polygon points="8.1,16.2 9.2,15.8 14.4,20.6 13.4,21.0" fill="#ee8624" />
    {/* Seat top and front/side rims */}
    <polygon points="11.7,11.0 15.5,9.7 13.2,14.5 8.1,15.8" fill="#ffb066" />
    <polygon points="8.1,15.8 13.2,14.5 13.2,15.6 8.1,16.9" fill="#c25e12" />
    <polygon points="13.2,14.5 15.5,9.7 15.5,10.8 13.2,15.6" fill="#ee8624" />
  </g>
);

/**
 * Simplified 1x1x1 isometric voxel cube with cased struts and bold vertex dots for
 * `sop.dopimportfield`.
 */
const VoxelLattice: React.FC = () => {
  const cx = 10.4;
  const top: Pt = [cx, 2.8];
  const rightTop: Pt = [cx + 6.4, 6.0];
  const leftTop: Pt = [cx - 6.4, 6.0];
  const frontTop: Pt = [cx, 9.2];
  const rightBot: Pt = [cx + 6.4, 13.4];
  const leftBot: Pt = [cx - 6.4, 13.4];
  const frontBot: Pt = [cx, 16.6];

  const struts = [
    `M${pts([top, rightTop, rightBot, frontBot, leftBot, leftTop])} Z`,
    `M${pts([leftTop, frontTop, rightTop])}`,
    `M${pts([frontTop, frontBot])}`,
  ].join(' ');

  const vertices: Pt[] = [top, rightTop, leftTop, frontTop, rightBot, leftBot, frontBot];

  return (
    <g>
      <CasedStroke d={struts} color="#eef2f7" width={1.0} casing={1.85} />
      {vertices.map(([dx, dy], idx) => (
        <circle key={idx} cx={dx} cy={dy} r="1.15" fill="#2e3338" stroke="#f2f4f7" strokeWidth="0.65" />
      ))}
    </g>
  );
};

/**
 * DOP and LOP network and import operators.
 */
export const DOP_LOP_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.dopnet',
    label: 'DOP Network',
    family: 'sop',
    description: 'Three stacked grey isometric cubes with the top cube tilting off to the right.',
    types: ['dopnet'],
    icons: ['networks_dop'],
    refKey: 'NETWORKS_dop',
    render: () => (
      <>
        <GreyIsoCube x={10.6} y={13.0} w={3.9} h={4.3} />
        <GreyIsoCube x={11.1} y={7.9} w={3.8} h={4.1} />
        <g transform="rotate(28 14.3 5.2)">
          <GreyIsoCube x={14.3} y={2.0} w={3.5} h={3.7} />
        </g>
      </>
    ),
  },
  {
    id: 'sop.dopimport',
    label: 'DOP Import',
    family: 'sop',
    description: 'Tall tilted blue wireframe bounding box enclosing a 3/4 orange-brown wooden chair.',
    types: ['dopimport'],
    icons: ['sop_dopimport', 'sop_dopimport-2.0'],
    refKey: 'SOP_dopimport',
    render: () => (
      <>
        <BlueWireBox layer="back" />
        <TumblingChair />
        <BlueWireBox layer="front" />
      </>
    ),
  },
  {
    id: 'sop.dopimportfield',
    label: 'Dop Import Fields',
    family: 'sop',
    description:
      'Isometric wireframe voxel cube with dark vertex dots and a dark round import arrow badge at bottom-right.',
    types: ['dopimportfield'],
    icons: ['sop_dopimportfield'],
    refKey: 'SOP_dopimportfield',
    render: () => (
      <>
        <VoxelLattice />
        <RoundGlyphBadge>
          <RoundImportArrow />
        </RoundGlyphBadge>
      </>
    ),
  },
  {
    id: 'sop.dopimportrecords',
    label: 'DOP Import Records',
    family: 'sop',
    description: 'Empty tall tilted blue wireframe bounding box.',
    types: ['dopimportrecords'],
    icons: ['sop_dopimportrecords'],
    refKey: 'SOP_dopimportrecords',
    render: () => <BlueWireBox layer="all" />,
  },
  {
    id: 'sop.lopnet',
    label: 'LOP Network',
    family: 'sop',
    description: 'Red, white, and blue striped sphere resting on a wooden planked stage crate.',
    types: ['lopnet'],
    icons: ['networks_lop'],
    refKey: 'NETWORKS_lop',
    render: (uid) => (
      <>
        <defs>
          <clipPath id={`${uid}-ball-clip`}>
            <circle cx="12" cy="7.2" r="4.3" />
          </clipPath>
        </defs>
        <LopWoodenCrate yOffset={0.6} />
        <g clipPath={`url(#${uid}-ball-clip)`}>
          <circle cx="12" cy="7.2" r="4.3" fill="#f2f4f7" />
          <polygon points="5,2 14.5,2 6.5,11.2 5,11.2" fill="#e03228" />
          <polygon points="17.5,3.2 19,3.2 19,13.5 9.5,13.5" fill="#3672c4" />
          <ellipse
            cx="10.4"
            cy="5.4"
            rx="1.35"
            ry="0.85"
            transform="rotate(-30 10.4 5.4)"
            fill="#ffffff"
            fillOpacity="0.45"
          />
        </g>
        <circle cx="12" cy="7.2" r="4.3" fill="none" stroke="#262626" strokeWidth="1.0" />
      </>
    ),
  },
  {
    id: 'sop.lopimport',
    label: 'LOP Import',
    family: 'sop',
    description: 'Wooden planked stage crate with a dark round import arrow badge at bottom-right.',
    types: ['lopimport'],
    icons: ['sop_lopimport'],
    refKey: 'SOP_lopimport',
    render: () => (
      <>
        <LopWoodenCrate yOffset={-2.2} />
        <RoundGlyphBadge>
          <RoundImportArrow />
        </RoundGlyphBadge>
      </>
    ),
  },
];
