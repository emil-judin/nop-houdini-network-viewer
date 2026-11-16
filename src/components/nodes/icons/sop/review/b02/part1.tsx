import type { OperatorIconDef } from '../../../iconTypes';
import { VolumeCloudBase } from '../../familyKits';
import { TigerCube } from './sharedElements';

/**
 * Batch 2, Part 1 (icons 10 to 19): built-in Houdini SOP icons under review.
 */
export const BATCH_02_PART_1: OperatorIconDef[] = [
  {
    id: 'sop.join',
    label: 'Join',
    family: 'sop',
    description:
      'Two separate curve ends linked by a red dashed bridge above a single continuous joined S-curve.',
    types: ['join'],
    icons: ['sop_join'],
    refKey: 'SOP_join',
    render: () => (
      <>
        <path
          d="M2.5,11.5 C4,8.2 5.8,6.5 8,6.3 M21.5,2.2 C20,5 18.2,6.1 16,6.3 M2.5,21.2 C7,9.8 16.5,21.8 21.5,12.5"
          fill="none"
          stroke="#262626"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <path
          d="M2.5,11.5 C4,8.2 5.8,6.5 8,6.3 M21.5,2.2 C20,5 18.2,6.1 16,6.3 M2.5,21.2 C7,9.8 16.5,21.8 21.5,12.5"
          fill="none"
          stroke="#eef2f7"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <line
          x1="8.2"
          y1="6.3"
          x2="15.8"
          y2="6.3"
          stroke="#262626"
          strokeWidth="2.4"
          strokeDasharray="1.3 1.3"
        />
        <line
          x1="8.2"
          y1="6.3"
          x2="15.8"
          y2="6.3"
          stroke="#e03228"
          strokeWidth="1.3"
          strokeDasharray="1.3 1.3"
        />
        <circle cx="8" cy="6.3" r="1.4" fill="#e03228" stroke="#262626" strokeWidth="0.7" />
        <circle cx="16" cy="6.3" r="1.4" fill="#e03228" stroke="#262626" strokeWidth="0.7" />
      </>
    ),
  },
  {
    id: 'sop.lsystem',
    label: 'L-System',
    family: 'sop',
    description: 'Recursive blue branching L-system tree with a small ground shadow.',
    types: ['lsystem'],
    icons: ['sop_lsystem'],
    refKey: 'SOP_lsystem',
    render: () => (
      <>
        <path
          d="M10.5,21.6 L14.5,20.2 L19.8,19.6 L14.2,21.2 Z"
          fill="#666666"
          fillOpacity="0.45"
        />
        <g
          fill="none"
          stroke="#183969"
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10.5,21.5 L12,15 L12,9.5 L8.8,5.2 L7.2,2.2" />
          <path d="M8.8,5.2 L4.5,4.2" />
          <path d="M12,12.2 L6.8,9.8 L3,8" />
          <path d="M6.8,9.8 L6,6.5" />
          <path d="M11.6,14.5 L5.2,13.5 L2.5,15.5" />
          <path d="M5.2,13.5 L2.5,12" />
          <path d="M12,9.5 L16.2,5.5 L15.5,2.4" />
          <path d="M16.2,5.5 L20.2,3.8" />
          <path d="M12,12.5 L17.8,10.2 L21.2,7.5" />
          <path d="M17.8,10.2 L21.2,11.5" />
          <path d="M12,15.2 L16.8,15.8 L20.8,18.2" />
        </g>
        <g
          fill="none"
          stroke="#729fcf"
          strokeWidth="1.15"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10.5,21.5 L12,15 L12,9.5 L8.8,5.2 L7.2,2.2" />
          <path d="M8.8,5.2 L4.5,4.2" />
          <path d="M12,12.2 L6.8,9.8 L3,8" />
          <path d="M6.8,9.8 L6,6.5" />
          <path d="M11.6,14.5 L5.2,13.5 L2.5,15.5" />
          <path d="M5.2,13.5 L2.5,12" />
          <path d="M12,9.5 L16.2,5.5 L15.5,2.4" />
          <path d="M16.2,5.5 L20.2,3.8" />
          <path d="M12,12.5 L17.8,10.2 L21.2,7.5" />
          <path d="M17.8,10.2 L21.2,11.5" />
          <path d="M12,15.2 L16.8,15.8 L20.8,18.2" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.laplacian',
    label: 'Laplacian',
    family: 'sop',
    description: 'Large blue-and-silver Greek Delta triangle representing the Laplace operator.',
    types: ['laplacian'],
    icons: ['sop_laplacian'],
    refKey: 'SOP_laplacian',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-lap-g`} x1="0" y1="0" x2="0.8" y2="1">
            <stop offset="0%" stopColor="#cadbed" />
            <stop offset="100%" stopColor="#4782c0" />
          </linearGradient>
        </defs>
        <polygon
          points="12,2.6 21,20.6 3,20.6"
          fill="none"
          stroke="#2e3436"
          strokeWidth="3.2"
          strokeLinejoin="round"
        />
        <polygon
          points="12,2.6 21,20.6 3,20.6"
          fill="none"
          stroke={`url(#${uid}-lap-g)`}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.lattice',
    label: 'Lattice Deform',
    family: 'sop',
    description:
      'Deformed orange column inside a light-blue 3D lattice bounding cage with orange vertex control points.',
    types: ['lattice'],
    icons: ['sop_lattice'],
    refKey: 'SOP_lattice',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-lat-body`} x1="0" y1="0" x2="1" y2="0.5">
            <stop offset="0%" stopColor="#ffb066" />
            <stop offset="55%" stopColor="#ee8624" />
            <stop offset="100%" stopColor="#c25e12" />
          </linearGradient>
        </defs>
        <path
          d="M7.6,4.4 C7.8,3.2 16.2,3.2 16.4,4.6 C16.6,6.2 14.4,9.6 14.1,11.6 C13.8,13.6 15.2,17.0 14.8,18.6 C14.4,20.2 8.4,20.2 8.0,18.4 C7.6,16.6 9.1,13.4 9.2,11.4 C9.3,9.4 7.4,5.6 7.6,4.4 Z"
          fill={`url(#${uid}-lat-body)`}
          stroke="#262626"
          strokeWidth="1.05"
        />
        <ellipse cx="12.0" cy="4.4" rx="4.2" ry="1.3" fill="#ffb066" stroke="#262626" strokeWidth="0.85" />
        <g fill="none" stroke="#262626" strokeWidth="1.9" strokeLinejoin="round">
          <polygon points="5.8,3.6 13.2,2.0 18.6,4.0 11.2,5.8" />
          <polygon points="6.2,19.0 12.6,17.4 17.6,19.6 11.0,21.2" />
          <line x1="5.8" y1="3.6" x2="6.2" y2="19.0" />
          <line x1="11.2" y1="5.8" x2="11.0" y2="21.2" />
          <line x1="18.6" y1="4.0" x2="17.6" y2="19.6" />
        </g>
        <g fill="none" stroke="#5aa2f2" strokeWidth="1.0" strokeLinejoin="round">
          <polygon points="5.8,3.6 13.2,2.0 18.6,4.0 11.2,5.8" />
          <polygon points="7.4,11.4 13.0,10.0 16.8,11.8 11.1,13.2" />
          <polygon points="6.2,19.0 12.6,17.4 17.6,19.6 11.0,21.2" />
          <line x1="5.8" y1="3.6" x2="7.4" y2="11.4" />
          <line x1="7.4" y1="11.4" x2="6.2" y2="19.0" />
          <line x1="11.2" y1="5.8" x2="11.1" y2="13.2" />
          <line x1="11.1" y1="13.2" x2="11.0" y2="21.2" />
          <line x1="18.6" y1="4.0" x2="16.8" y2="11.8" />
          <line x1="16.8" y1="11.8" x2="17.6" y2="19.6" />
        </g>
        <g fill="#ee8624" stroke="#262626" strokeWidth="0.6">
          <circle cx="5.8" cy="3.6" r="0.9" />
          <circle cx="18.6" cy="4.0" r="0.9" />
          <circle cx="11.2" cy="5.8" r="0.9" />
          <circle cx="7.4" cy="11.4" r="0.9" />
          <circle cx="11.1" cy="13.2" r="0.9" />
          <circle cx="16.8" cy="11.8" r="0.9" />
          <circle cx="6.2" cy="19.0" r="0.9" />
          <circle cx="11.0" cy="21.2" r="0.9" />
          <circle cx="17.6" cy="19.6" r="0.9" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.latticefromvolume',
    label: 'Lattice from Volume',
    family: 'sop',
    description:
      'White volume cloud with a dark cutaway window showing a bright green 3D lattice of posts and rails inside.',
    types: ['latticefromvolume'],
    icons: ['sop_latticefromvolume'],
    refKey: 'SOP_latticefromvolume',
    render: () => (
      <>
        <VolumeCloudBase cx={12} cy={11} scale={1.08} />
        {/* Cutaway window into the volume */}
        <polygon points="5.4,12.8 18.8,9.8 18.8,15.4 5.4,18.4" fill="#5a616b" stroke="#262626" strokeWidth="0.85" strokeLinejoin="round" />
        <g stroke="#58c848" strokeWidth="0.95" strokeLinecap="round" fill="none">
          <path d="M5.8,15.6 L18.4,12.8 M5.8,13.2 L18.4,10.4" />
          <path d="M8.2,12.3 L8.2,17.5 M11.4,11.6 L11.4,16.8 M14.6,10.9 L14.6,16.1 M17.6,10.2 L17.6,15.4" />
          <path d="M8.2,12.3 L10,11 M11.4,11.6 L13.2,10.3 M14.6,10.9 L16.4,9.6" strokeWidth="0.75" />
        </g>
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
    id: 'sop.linearsolver',
    label: 'Linear Solver',
    family: 'sop',
    description:
      'Tilted chalkboard with an orange wooden frame and a green board showing white Y and X axes and an S-shaped solution curve.',
    types: ['linearsolver'],
    icons: ['sop_linearsolver'],
    refKey: 'SOP_linearsolver',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-ls-board`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#58c848" />
            <stop offset="100%" stopColor="#3a9a2a" />
          </linearGradient>
        </defs>
        <g strokeLinejoin="round">
          <polygon points="3.6,2.4 5.2,1.7 18.6,7.1 17,7.8" fill="#ffb066" stroke="#262626" strokeWidth="0.9" />
          <polygon points="17,7.8 18.6,7.1 18.6,20.5 17,21.2" fill="#c25e12" stroke="#262626" strokeWidth="0.9" />
          <g transform="matrix(1 0.4 0 1 3.6 2.4)">
            <rect x="0" y="0" width="13.4" height="13.4" fill="#ee8624" stroke="#262626" strokeWidth="1.05" />
            <rect x="1.4" y="1.4" width="10.6" height="10.6" fill={`url(#${uid}-ls-board)`} stroke="#262626" strokeWidth="0.7" />
            <g stroke="#ffffff" strokeWidth="0.9" strokeLinecap="round" fill="none">
              <path d="M5,10.6 L5,2.8 M4,3.9 L5,2.8 L6,3.9" />
              <path d="M2.6,8.6 L10.8,8.6 M9.7,7.6 L10.8,8.6 L9.7,9.6" />
              <path d="M2.8,10.6 C6.4,10.6 6.2,3.4 10.6,3.4" />
            </g>
          </g>
        </g>
      </>
    ),
  },
  {
    id: 'sop.magnet',
    label: 'Magnet',
    family: 'sop',
    description:
      'Grey wireframe sphere pulled upward into a pointed peak underneath a glowing orange magnet saucer.',
    types: ['magnet'],
    icons: ['sop_magnet'],
    refKey: 'SOP_magnet',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-mag-cap`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fef3dd" />
            <stop offset="45%" stopColor="#faaf3e" />
            <stop offset="100%" stopColor="#f17912" />
          </linearGradient>
        </defs>
        <path
          d="M12,9.2 C9.5,11.8 6.8,12.8 6.8,15.6 C6.8,18.5 9.1,20.8 12,20.8 C14.9,20.8 17.2,18.5 17.2,15.6 C17.2,12.8 14.5,11.8 12,9.2 Z"
          fill="#d6e1e6"
          stroke="#555753"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <g fill="none" stroke="#77818c" strokeWidth="0.6">
          <ellipse cx="12" cy="15.8" rx="5.1" ry="1.8" />
          <ellipse cx="12" cy="13.4" rx="3.6" ry="1.2" />
          <path d="M12,9.2 C10,12.5 9.8,18.5 12,20.8" />
          <path d="M12,9.2 C14,12.5 14.2,18.5 12,20.8" />
        </g>
        <path
          d="M2.5,9.2 C5,5.2 8.2,4.2 12,4.2 C15.8,4.2 19,5.2 21.5,9.2 C18.5,10.6 15.2,11.2 12,11.2 C8.8,11.2 5.5,10.6 2.5,9.2 Z"
          fill={`url(#${uid}-mag-cap)`}
          stroke="#99440f"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <ellipse cx="12" cy="9.2" rx="9" ry="1.6" fill="none" stroke="#f88017" strokeWidth="0.6" />
      </>
    ),
  },
  {
    id: 'sop.maskbyfeature',
    label: 'Mask by Feature',
    family: 'sop',
    description:
      'Cube and sphere over a shadowed ground plane with their upper feature faces highlighted in bright yellow.',
    types: ['maskbyfeature'],
    icons: ['sop_maskbyfeature'],
    refKey: 'SOP_maskbyfeature',
    render: () => (
      <>
        <ellipse cx="12" cy="17.2" rx="10" ry="4.8" fill="#555753" fillOpacity="0.35" />
        <polygon points="3.5,15.2 7.5,13.2 11.5,15.6 7.2,17.8" fill="#262626" fillOpacity="0.45" />
        <ellipse cx="16.4" cy="19.2" rx="3.6" ry="1.6" fill="#262626" fillOpacity="0.45" />
        <g stroke="#192333" strokeWidth="0.85" strokeLinejoin="round">
          <polygon points="4.2,6.5 8.5,4.8 12.2,7.2 7.8,9" fill="#edd400" />
          <polygon points="4.2,6.5 4.2,11.5 7.8,14 7.8,9" fill="#98a4b2" />
          <polygon points="12.2,7.2 12.2,12.2 7.8,14 7.8,9" fill="#dee0e1" />
        </g>
        <circle cx="16.5" cy="13.8" r="4.2" fill="#98a4b2" stroke="#192333" strokeWidth="0.85" />
        <path
          d="M13.2,11.4 A4.2,4.2 0 0,1 20.4,12.4 C19.5,14.2 17.2,14.8 15.2,14 C13.8,13.4 13,12.3 13.2,11.4 Z"
          fill="#edd400"
        />
        <circle cx="16.5" cy="13.8" r="4.2" fill="none" stroke="#192333" strokeWidth="0.85" />
      </>
    ),
  },
  {
    id: 'sop.material',
    label: 'Material',
    family: 'sop',
    description: 'Isometric amber-orange cube wrapped in bold black tiger stripes on all three faces.',
    types: ['material'],
    icons: ['sop_material'],
    refKey: 'SOP_material',
    render: (uid) => <TigerCube uid={uid} name="mat" x={12} y={2} w={9.4} h={10.6} />,
  },
];
