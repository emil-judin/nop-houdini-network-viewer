import React from 'react';
import { isoBoxFaces, pts, roundedRectPath } from '../../geoHelpers';
import { ShadedSphere, SPHERE_TONES } from '../../geoKits';
import type { OperatorIconDef } from '../../iconTypes';

/**
 * Shared flat window card for `sop.object_merge`: white frame, colored titlebar with three tiny
 * window buttons, and `#262626` outline.
 */
const WindowFrame: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  titleColor?: string;
}> = ({ x, y, w, h, titleColor = '#8fc2ff' }) => {
  const barH = 2.6;
  return (
    <g>
      <path
        d={roundedRectPath(x, y, w, h, 1.1)}
        fill="#ffffff"
        stroke="#262626"
        strokeWidth="0.95"
        strokeLinejoin="round"
      />
      <path
        d={`M${x + 1.1},${y} L${x + w - 1.1},${y} Q${x + w},${y} ${x + w},${y + 1.1} L${x + w},${y + barH} L${x},${y + barH} L${x},${y + 1.1} Q${x},${y} ${x + 1.1},${y} Z`}
        fill={titleColor}
        stroke="#262626"
        strokeWidth="0.85"
        strokeLinejoin="round"
      />
      <circle cx={x + w - 4.2} cy={y + barH / 2} r="0.45" fill="#ffffff" />
      <circle cx={x + w - 2.8} cy={y + barH / 2} r="0.45" fill="#ffffff" />
      <circle cx={x + w - 1.4} cy={y + barH / 2} r="0.45" fill="#ffffff" />
    </g>
  );
};

/**
 * File, cache, merge, stash and format import and export operators.
 */
export const FILE_IO_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.alembic',
    label: 'Alembic',
    family: 'sop',
    description:
      'White disc with the dark Alembic swirl, upper-right eye cutout, and three lower wave curls (vendor logo, redrawn).',
    types: ['alembic', 'alembicgroup', 'alembicprimitive', 'rop_alembic'],
    icons: ['rop_alembic', 'sop_alembic'],
    refKey: 'SOP_alembic',
    render: () => (
      <>
        <circle cx="12" cy="12" r="9.4" fill="#f2f4f7" stroke="#262626" strokeWidth="0.9" />
        <path
          d="M4.0,7.5 A9.2,9.2 0 1,1 3.25,9.16 C3.0,11.6 3.6,14.4 5.0,16.4 C4.6,14.7 4.9,13.0 6.0,12.5 C5.6,13.8 6.1,15.5 7.2,16.5 C6.9,14.4 8.2,13.1 9.8,13.5 C11.0,13.8 11.4,15.1 10.6,16.0 C9.9,16.7 8.9,16.3 8.8,15.4 C7.9,16.1 8.0,17.8 9.4,18.7 C10.8,19.5 12.6,18.9 13.1,17.5 C11.6,17.0 11.1,15.0 12.3,13.5 C13.5,12.0 15.9,12.3 16.8,14.0 C17.6,15.6 16.7,17.6 14.9,17.9 C13.5,18.1 12.8,17.0 13.2,15.8 C13.9,16.5 14.9,16.0 14.9,15.0 C14.9,13.9 13.6,13.6 12.8,14.3 C12.0,15.0 12.2,16.6 13.5,17.4 C15.0,18.3 17.0,17.6 17.8,15.8 C18.7,13.8 18.1,11.3 16.1,10.4 C14.2,9.5 12.0,10.6 9.8,11.8 C7.4,13.1 4.7,11.6 4.0,7.5 Z"
          fill="#262626"
        />
        <path
          d="M14.2,7.1 C14.2,6.3 15.3,6.2 16.4,7.0 C17.0,7.5 17.3,8.1 17.3,8.3 C16.4,8.4 15.2,8.4 14.5,8.0 C14.2,7.8 14.2,7.4 14.2,7.1 Z"
          fill="#f2f4f7"
        />
      </>
    ),
  },
  {
    id: 'sop.file',
    label: 'File',
    family: 'sop',
    description: 'Open orange file folder with a white sheet inside and a curved orange arrow arcing down-right.',
    types: ['file'],
    icons: ['sop_file'],
    refKey: 'SOP_file',
    render: () => (
      <>
        <path
          d="M3.4,19.2 L3.4,6.4 Q3.4,5.4 4.4,5.4 L8.4,5.4 L9.8,6.8 L16.2,6.0 Q17.2,5.9 17.2,6.9 L17.2,16.8 Z"
          fill="#ee8624"
          stroke="#262626"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        <polygon
          points="4.6,17.5 4.8,8.5 15.4,7.2 15.2,15.6"
          fill="#f2f4f7"
          stroke="#262626"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <polygon
          points="3.4,19.2 6.0,11.0 18.8,9.0 16.6,16.8"
          fill="#ffb066"
          stroke="#262626"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        <path
          d="M9.6,5.8 C13.2,4.6 17.2,6.2 18.8,9.8 L20.6,9.2 L18.6,13.6 L14.4,11.4 L16.2,10.8 C14.8,8.2 12.2,6.8 9.6,5.8 Z"
          fill="#ee8624"
          stroke="#262626"
          strokeWidth="1.0"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.filecache',
    label: 'File Cache',
    family: 'sop',
    description: 'Grey 3/4 hard drive enclosure with a faint top platter ring, dark front slot, and right vent slits.',
    types: ['filecache'],
    icons: ['sop_filecache'],
    refKey: 'SOP_filecache',
    render: () => (
      <>
        <polygon
          points={pts([
            [5.8, 5.2],
            [18.2, 5.2],
            [21.0, 12.8],
            [3.0, 12.8],
          ])}
          fill="#eef2f7"
          stroke="#262626"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        <ellipse cx="12" cy="8.8" rx="4.4" ry="2.2" fill="none" stroke="#89929e" strokeWidth="0.85" />
        <path
          d={roundedRectPath(3.0, 12.6, 18.0, 6.4, 1.3)}
          fill="#c0c7d1"
          stroke="#262626"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        <path d="M3.6,17.4 L20.4,17.4 Q20.4,18.4 19.4,18.4 L4.6,18.4 Q3.6,18.4 3.6,17.4 Z" fill="#89929e" />
        <path d={roundedRectPath(4.8, 14.8, 4.4, 1.8, 0.7)} fill="#3a3f47" stroke="#262626" strokeWidth="0.7" />
        <g stroke="#5a616b" strokeWidth="0.9" strokeLinecap="round">
          <line x1="14.6" y1="14.2" x2="14.6" y2="17.4" />
          <line x1="16.1" y1="14.2" x2="16.1" y2="17.4" />
          <line x1="17.6" y1="14.2" x2="17.6" y2="17.4" />
          <line x1="19.1" y1="14.2" x2="19.1" y2="17.4" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.filemerge',
    label: 'File Merge',
    family: 'sop',
    description:
      'Horizontal filmstrip with red dots at the top and a diagonal red stream of spheres merging down-right.',
    types: ['filemerge'],
    icons: ['sop_filemerge'],
    refKey: 'SOP_filemerge',
    render: (uid) => (
      <>
        <path
          d="M5.2,8.4 L10.0,7.2 L20.4,17.2 L16.4,20.6 Z"
          fill="#a81f18"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        <ShadedSphere id={`${uid}-s1`} cx={14.0} cy={14.8} r={2.2} tones={SPHERE_TONES.red} strokeWidth={0.85} />
        <ShadedSphere id={`${uid}-s2`} cx={18.2} cy={18.4} r={2.8} tones={SPHERE_TONES.red} strokeWidth={0.95} />
        <rect x="2.5" y="3.0" width="19.0" height="6.2" rx="0.6" fill="#5a616b" stroke="#262626" strokeWidth="0.95" />
        <rect x="3.5" y="4.2" width="5.0" height="3.8" fill="#ffffff" stroke="#262626" strokeWidth="0.6" />
        <rect x="9.5" y="4.2" width="5.0" height="3.8" fill="#ffffff" stroke="#262626" strokeWidth="0.6" />
        <rect x="15.5" y="4.2" width="5.0" height="3.8" fill="#ffffff" stroke="#262626" strokeWidth="0.6" />
        <circle cx="6.0" cy="6.1" r="1.2" fill="#e03228" stroke="#262626" strokeWidth="0.6" />
        <circle cx="12.0" cy="6.1" r="1.2" fill="#e03228" stroke="#262626" strokeWidth="0.6" />
        <circle cx="18.0" cy="6.1" r="1.1" fill="#e03228" stroke="#262626" strokeWidth="0.6" />
        <g fill="#f2f4f7">
          <rect x="4.0" y="3.4" width="1.2" height="0.6" />
          <rect x="6.8" y="3.4" width="1.2" height="0.6" />
          <rect x="10.2" y="3.4" width="1.2" height="0.6" />
          <rect x="13.0" y="3.4" width="1.2" height="0.6" />
          <rect x="16.2" y="3.4" width="1.2" height="0.6" />
          <rect x="19.0" y="3.4" width="1.2" height="0.6" />
          <rect x="4.0" y="8.2" width="1.2" height="0.6" />
          <rect x="6.8" y="8.2" width="1.2" height="0.6" />
          <rect x="10.2" y="8.2" width="1.2" height="0.6" />
          <rect x="13.0" y="8.2" width="1.2" height="0.6" />
          <rect x="16.2" y="8.2" width="1.2" height="0.6" />
          <rect x="19.0" y="8.2" width="1.2" height="0.6" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.gltf',
    label: 'GLTF',
    family: 'sop',
    description:
      'Green swoosh wrapping around green glTF lettering with thin matching dark outlines (vendor logo, redrawn).',
    types: ['gltf', 'rop_gltf'],
    icons: ['obj_gltf_hierarchy'],
    refKey: 'OBJ_gltf_hierarchy',
    render: () => (
      <>
        <path
          d="M19.8,8.6 C17.4,6.4 13.0,5.8 8.6,7.0 C4.6,8.2 2.8,10.6 3.2,13.2 C3.6,15.8 6.8,17.6 11.4,17.6 C14.8,17.6 17.8,16.4 19.6,14.6 C17.4,15.8 14.4,16.2 11.4,15.8 C7.8,15.4 5.8,13.8 5.8,11.8 C5.8,9.8 8.0,8.0 11.6,7.6 C14.6,7.3 17.6,7.8 19.8,9.2 Z"
          fill="#58c848"
          stroke="#262626"
          strokeWidth="1.15"
          strokeLinejoin="round"
          paintOrder="stroke"
        />
        <text
          x="13.4"
          y="14.2"
          textAnchor="middle"
          fontSize="7.2"
          fontWeight="800"
          fontFamily="sans-serif"
          fill="#52d638"
          stroke="#262626"
          strokeWidth="1.15"
          paintOrder="stroke"
        >
          glTF
        </text>
      </>
    ),
  },
  {
    id: 'sop.rop_fbx',
    label: 'ROP FBX Output',
    family: 'sop',
    description:
      'White rounded tile with a dark calligraphic X-figure above a dark banner reading FBX (vendor logo, redrawn).',
    types: ['rop_fbx'],
    icons: ['rop_fbx'],
    refKey: 'ROP_fbx',
    render: () => (
      <>
        <path
          d={roundedRectPath(2.4, 2.4, 19.2, 19.2, 2.4)}
          fill="#f2f4f7"
          stroke="#262626"
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        <g fill="none" stroke="#262626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6.6,12.4 Q11.8,8.2 17.4,3.8" />
          <path d="M8.8,4.0 Q12.0,8.6 15.0,13.0" />
        </g>
        <circle cx="12.2" cy="4.2" r="1.0" fill="#262626" />
        <polygon points="3.6,14.2 20.4,14.2 19.2,20.2 3.6,20.2" fill="#262626" strokeLinejoin="round" />
        <text
          x="11.6"
          y="19.1"
          textAnchor="middle"
          fontSize="5.6"
          fontWeight="800"
          fontFamily="sans-serif"
          fill="#ffffff"
          letterSpacing="0.5"
        >
          FBX
        </text>
      </>
    ),
  },
  {
    id: 'sop.rop_geometry',
    label: 'ROP Geometry Output',
    family: 'sop',
    description: 'Cluster of three 3D primitives: blue cylinder, red sphere, and yellow cone.',
    types: ['rop_geometry', 'sopnet'],
    icons: ['obj_geo', 'rop_geometry'],
    refKey: 'ROP_geometry',
    render: (uid) => (
      <>
        <path
          d="M4.2,6.4 L4.2,14.6 A3.4,1.5 0 0,0 11.0,14.6 L11.0,6.4 Z"
          fill="#3672c4"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        <ellipse cx="7.6" cy="6.4" rx="3.4" ry="1.5" fill="#8fc2ff" stroke="#262626" strokeWidth="0.95" />
        <ShadedSphere id={`${uid}-sph`} cx={16.2} cy={11.8} r={4.2} tones={SPHERE_TONES.red} strokeWidth={0.95} />
        <path
          d="M11.0,9.0 L5.8,17.4 A5.2,2.0 0 0,0 16.2,17.4 Z"
          fill="#f2c438"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        <path d="M11.0,9.0 L5.8,17.4 A5.2,2.0 0 0,0 10.6,19.4 Z" fill="#ffe47a" />
        <path d="M11.0,9.0 L11.4,19.4 A5.2,2.0 0 0,0 16.2,17.4 Z" fill="#d49a18" />
        <path
          d="M11.0,9.0 L5.8,17.4 A5.2,2.0 0 0,0 16.2,17.4 Z"
          fill="none"
          stroke="#262626"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.object_merge',
    label: 'Object Merge',
    family: 'sop',
    description:
      'Two overlapping window frames with an isometric grey cube in the front window and a red arrow pointing down into it.',
    types: ['object_merge'],
    icons: ['sop_object_merge'],
    refKey: 'SOP_object_merge',
    render: () => {
      const box = isoBoxFaces(14.2, 11.8, 3.6, 3.8);
      return (
        <>
          <WindowFrame x={2.8} y={3.0} w={11.6} h={9.6} titleColor="#8fc2ff" />
          <WindowFrame x={7.2} y={7.6} w={13.8} h={13.2} titleColor="#5aa2f2" />
          <polygon points={pts(box.top)} fill="#eef2f7" stroke="#262626" strokeWidth="0.85" strokeLinejoin="round" />
          <polygon points={pts(box.left)} fill="#c0c7d1" stroke="#262626" strokeWidth="0.85" strokeLinejoin="round" />
          <polygon points={pts(box.right)} fill="#89929e" stroke="#262626" strokeWidth="0.85" strokeLinejoin="round" />
          <polygon
            points="12.2,6.2 15.0,6.2 15.0,10.0 16.8,10.0 13.6,14.2 10.4,10.0 12.2,10.0"
            fill="#e03228"
            stroke="#262626"
            strokeWidth="0.95"
            strokeLinejoin="round"
          />
        </>
      );
    },
  },
  {
    id: 'sop.stash',
    label: 'Stash',
    family: 'sop',
    description: 'Grey 3/4 metal safe with a recessed door, right hinges, and a central round combination dial.',
    types: ['stash'],
    icons: ['sop_stash'],
    refKey: 'SOP_stash',
    render: () => (
      <>
        <polygon
          points="5.4,4.2 17.6,3.4 20.4,5.4 8.0,6.2"
          fill="#eef2f7"
          stroke="#262626"
          strokeWidth="1.0"
          strokeLinejoin="round"
        />
        <polygon
          points="17.6,3.4 20.4,5.4 20.4,18.8 17.6,20.4"
          fill="#89929e"
          stroke="#262626"
          strokeWidth="1.0"
          strokeLinejoin="round"
        />
        <polygon
          points="5.4,4.2 17.6,3.4 17.6,20.4 5.4,19.4"
          fill="#c0c7d1"
          stroke="#262626"
          strokeWidth="1.0"
          strokeLinejoin="round"
        />
        <polygon
          points="7.0,6.2 16.0,5.6 16.0,18.2 7.0,17.4"
          fill="#c0c7d1"
          stroke="#5a616b"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <rect x="15.4" y="7.4" width="1.2" height="2.2" rx="0.3" fill="#5a616b" stroke="#262626" strokeWidth="0.6" />
        <rect x="15.4" y="13.8" width="1.2" height="2.2" rx="0.3" fill="#5a616b" stroke="#262626" strokeWidth="0.6" />
        <circle cx="11.5" cy="11.8" r="3.2" fill="#3a3f47" stroke="#262626" strokeWidth="0.9" />
        <circle cx="11.5" cy="11.8" r="1.5" fill="#eef2f7" stroke="#262626" strokeWidth="0.75" />
      </>
    ),
  },
  {
    id: 'sop.lidarimport',
    label: 'Lidar Import',
    family: 'sop',
    description:
      'Perspective grid of LiDAR point-cloud dots colored green on the left through orange and red on the right.',
    types: ['lidarimport'],
    icons: ['sop_lidarimport'],
    refKey: 'SOP_lidarimport',
    render: () => (
      <>
        <g fill="#beff7e" stroke="#336504" strokeWidth="0.55">
          <circle cx="3.5" cy="6" r="1.15" />
          <circle cx="6.5" cy="7.5" r="1.15" />
          <circle cx="3.5" cy="9.6" r="1.15" />
          <circle cx="6.5" cy="11.1" r="1.15" />
          <circle cx="3.5" cy="13.2" r="1.15" />
        </g>
        <g fill="#8ae234" stroke="#336504" strokeWidth="0.55">
          <circle cx="9.6" cy="9" r="1.15" />
          <circle cx="9.6" cy="12.6" r="1.15" />
          <circle cx="6.5" cy="14.7" r="1.15" />
          <circle cx="3.5" cy="16.8" r="1.15" />
          <circle cx="6.5" cy="18.3" r="1.15" />
          <circle cx="9.6" cy="16.2" r="1.15" />
          <circle cx="9.6" cy="19.8" r="1.15" />
        </g>
        <g fill="#4e9a06" stroke="#275917" strokeWidth="0.55">
          <circle cx="12.8" cy="10.5" r="1.15" />
          <circle cx="12.8" cy="14.1" r="1.15" />
          <circle cx="12.8" cy="17.7" r="1.15" />
          <circle cx="12.8" cy="21" r="1.15" />
        </g>
        <g fill="#fcaf3e" stroke="#ce5c00" strokeWidth="0.55">
          <circle cx="15.8" cy="6.2" r="1" />
          <circle cx="15.8" cy="9.2" r="1" />
          <circle cx="15.8" cy="12.2" r="1.05" />
        </g>
        <g fill="#ef2929" stroke="#640000" strokeWidth="0.55">
          <circle cx="18.5" cy="7.5" r="1" />
          <circle cx="18.5" cy="10.8" r="1" />
          <circle cx="16.2" cy="15.6" r="1.1" />
          <circle cx="16.2" cy="19" r="1.1" />
          <circle cx="19.2" cy="14.2" r="1" />
          <circle cx="19.2" cy="17.5" r="1" />
          <circle cx="21.2" cy="12.5" r="0.95" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.mdd',
    label: 'MDD',
    family: 'sop',
    description: 'Perspective grey cube with four red point-cache motion arrows radiating from its corners.',
    types: ['mdd'],
    icons: ['sop_mdd'],
    refKey: 'SOP_mdd',
    render: () => (
      <>
        <g stroke="#eeeeec" strokeWidth="1.9" strokeLinecap="round">
          <line x1="6.8" y1="7.8" x2="3.2" y2="3.6" />
          <line x1="14.2" y1="6.2" x2="15.4" y2="2.6" />
          <line x1="17.8" y1="9.6" x2="21.4" y2="7.2" />
          <line x1="11.4" y1="17.8" x2="9.8" y2="21.6" />
        </g>
        <polygon
          points="6.8,7.8 14.2,6.2 17.8,9.6 11.4,11.8"
          fill="#efefef"
          stroke="#555753"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <polygon
          points="6.8,7.8 7.8,15.2 11.4,17.8 11.4,11.8"
          fill="#c7c7c7"
          stroke="#555753"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <polygon
          points="11.4,11.8 17.8,9.6 16.6,16.2 11.4,17.8"
          fill="#979797"
          stroke="#555753"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <g stroke="#cc0000" strokeWidth="1.05" strokeLinecap="round">
          <line x1="6.8" y1="7.8" x2="3.5" y2="4" />
          <line x1="14.2" y1="6.2" x2="15.2" y2="3" />
          <line x1="17.8" y1="9.6" x2="21" y2="7.5" />
          <line x1="11.4" y1="17.8" x2="10" y2="21.2" />
        </g>
        <g fill="#cc0000">
          <polygon points="2.5,2.8 5,3.6 3.2,5.2" />
          <polygon points="15.6,1.8 16.5,4 14.2,3.4" />
          <polygon points="22,6.8 20.8,8.8 19.6,7" />
          <polygon points="9.4,22.2 9,19.8 11.2,20.6" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.exportobjtransforms',
    label: 'Export Object Transforms',
    family: 'sop',
    description:
      'Yellow cone surrounded by green and red gimbal rings with a dark export arrow badge in the top-left corner.',
    types: ['exportobjtransforms'],
    icons: ['sop_exportobjtransforms'],
    refKey: 'SOP_exportobjtransforms',
    render: () => (
      <>
        <circle cx="13" cy="12.5" r="7.8" fill="none" stroke="#52d638" strokeWidth="1.4" />
        <polygon
          points="13,5.5 17.5,16.5 8.5,16.5"
          fill="#ffe47a"
          stroke="#262626"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        <ellipse
          cx="13"
          cy="13.5"
          rx="8.2"
          ry="2.8"
          transform="rotate(-12 13 13.5)"
          fill="none"
          stroke="#e03228"
          strokeWidth="1.4"
        />
        <circle cx="7" cy="7" r="4.5" fill="#262626" stroke="#f2f4f7" strokeWidth="1" />
        <polygon points="4.5,4.5 8.5,4.8 7.2,6.1 9.5,8.4 8.4,9.5 6.1,7.2 4.8,8.5" fill="#f2f4f7" />
      </>
    ),
  },
];
