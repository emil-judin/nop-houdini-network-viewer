import type { OperatorIconDef } from '../../../iconTypes';

/**
 * Batch 4 - Part 7 (icons 70-79): USD scene/component/proxy/export/import/parent/instancer and Cloud base/noise SOPs.
 */
export const BATCH_04_PART_7: OperatorIconDef[] = [
  {
    id: 'sop.usdconfigure',

    label: 'USD Configure Import',

    family: 'sop',

    description: 'Stacked isometric USD stage cards (top-left).',
    refKey: 'SOP_usdconfigure',
    types: ['usdconfigure'],
    icons: ['sop_usdconfigure'],
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-u1`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8fc2ff" />
            <stop offset="100%" stopColor="#3672c4" />
          </linearGradient>
        </defs>
        {/* Stacked isometric USD stage cards (top-left) */}
        <polygon points="9.5,2.5 16.5,5.2 9.5,7.9 2.5,5.2" fill={`url(#${uid}-u1)`} stroke="#eef2f7" strokeWidth="0.65" strokeLinejoin="round" />
        <polygon points="9.5,5.8 16.5,8.5 9.5,11.2 2.5,8.5" fill="#5aa2f2" stroke="#eef2f7" strokeWidth="0.65" strokeLinejoin="round" />
        <polygon points="9.5,9.1 16.5,11.8 9.5,14.5 2.5,11.8" fill="#3672c4" stroke="#eef2f7" strokeWidth="0.65" strokeLinejoin="round" />
        {/* Dark circle badge with white gear at bottom-right */}
        <circle cx="16.2" cy="16.2" r="5.6" fill="#262626" stroke="#89929e" strokeWidth="0.6" />
        {/* Gear teeth */}
        <g stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round">
          <line x1="16.2" y1="12.2" x2="16.2" y2="20.2" />
          <line x1="12.2" y1="16.2" x2="20.2" y2="16.2" />
          <line x1="13.4" y1="13.4" x2="19.0" y2="19.0" />
          <line x1="19.0" y1="13.4" x2="13.4" y2="19.0" />
        </g>
        <circle cx="16.2" cy="16.2" r="2.8" fill="#ffffff" />
        <circle cx="16.2" cy="16.2" r="1.4" fill="#262626" />
      </>
    ),
  },
  {
    id: 'sop.usdconfigureprimsfrompoints',

    label: 'USD Configure Prims from Points',

    family: 'sop',

    description: 'Top-right dark red sphere with glowing rim.',
    refKey: 'SOP_usdconfigureprimsfrompoints',
    types: ['usdconfigureprimsfrompoints'],
    icons: ['sop_usdconfigureprimsfrompoints'],
    render: () => (
      <g>
        {/* Top-right dark red sphere with glowing rim */}
        <circle cx="14.2" cy="5.8" r="3.4" fill="#3a2020" stroke="#e03228" strokeWidth="0.9" />
        <ellipse cx="13.2" cy="4.6" rx="1.2" ry="0.7" fill="#f07870" opacity="0.55" />
        {/* Left dark blue cylinder with cyan rim */}
        <path d="M2.8,7.2 L2.8,14.2 A3.2,1.3 0 0,0 9.2,14.2 L9.2,7.2 Z" fill="#1e3148" stroke="#5aa2f2" strokeWidth="0.85" strokeLinejoin="round" />
        <ellipse cx="6.0" cy="7.2" rx="3.2" ry="1.3" fill="#2c4b70" stroke="#8fc2ff" strokeWidth="0.8" />
        {/* Center dark green/yellow cone */}
        <polygon points="11.2,7.8 14.8,15.2 7.6,15.2" fill="#2e3b24" stroke="#89c436" strokeWidth="0.85" strokeLinejoin="round" />
        {/* Bottom-right stacked USD cyan stage cards */}
        <polygon points="16.5,12.5 21.8,14.6 16.5,16.7 11.2,14.6" fill="#8fc2ff" stroke="#262626" strokeWidth="0.6" strokeLinejoin="round" />
        <polygon points="16.5,15.0 21.8,17.1 16.5,19.2 11.2,17.1" fill="#5aa2f2" stroke="#262626" strokeWidth="0.6" strokeLinejoin="round" />
        <polygon points="16.5,17.5 21.8,19.6 16.5,21.7 11.2,19.6" fill="#3672c4" stroke="#262626" strokeWidth="0.6" strokeLinejoin="round" />
      </g>
    ),
  },
  {
    id: 'sop.usdcreatecomponent',

    label: 'USD Create Component',

    family: 'sop',

    description: 'Mug handle on the right.',
    refKey: 'SOP_usdcreatecomponent',
    types: ['usdcreatecomponent'],
    icons: ['sop_usdcreatecomponent'],
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-mug`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="65%" stopColor="#eef2f7" />
            <stop offset="100%" stopColor="#89929e" />
          </linearGradient>
        </defs>
        {/* Mug handle on the right */}
        <path
          d="M15.8,8.5 C20.2,8.5 20.2,16.5 15.8,16.5"
          fill="none"
          stroke="#c0c7d1"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M15.8,8.5 C20.2,8.5 20.2,16.5 15.8,16.5"
          fill="none"
          stroke="#262626"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
        {/* Mug cylindrical body */}
        <path
          d="M4.2,6.2 L4.2,17.5 A6.0,2.5 0 0,0 16.2,17.5 L16.2,6.2 Z"
          fill={`url(#${uid}-mug)`}
          stroke="#262626"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        {/* Mug top opening */}
        <ellipse cx="10.2" cy="6.2" rx="6.0" ry="2.2" fill="#eef2f7" stroke="#262626" strokeWidth="0.85" />
        <ellipse cx="10.2" cy="6.2" rx="4.8" ry="1.5" fill="#55606e" stroke="#3a3f47" strokeWidth="0.5" />
        {/* Cyan USD star emblem on mug front */}
        <polygon
          points="10.2,10.0 11.1,12.1 13.4,12.3 11.6,13.8 12.2,16.0 10.2,14.8 8.2,16.0 8.8,13.8 7.0,12.3 9.3,12.1"
          fill="#5aa2f2"
          stroke="#3672c4"
          strokeWidth="0.55"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.usdcreateproxygeometry',

    label: 'USD Create Proxy Geometry',

    family: 'sop',

    description: 'Back wireframe edges of magenta proxy cube.',
    refKey: 'SOP_usdcreateproxygeometry',
    types: ['usdcreateproxygeometry'],
    icons: ['sop_usdcreateproxygeometry'],
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-pmug`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="65%" stopColor="#eef2f7" />
            <stop offset="100%" stopColor="#89929e" />
          </linearGradient>
        </defs>
        {/* Back wireframe edges of magenta proxy cube */}
        <g stroke="#c666bc" strokeWidth="0.65" opacity="0.65">
          <line x1="12.0" y1="2.2" x2="12.0" y2="11.5" />
          <line x1="3.2" y1="15.8" x2="12.0" y2="11.5" />
          <line x1="20.8" y1="15.8" x2="12.0" y2="11.5" />
        </g>
        {/* Inner mug with handle and cyan star */}
        <path d="M14.6,9.5 C17.6,9.5 17.6,15.2 14.6,15.2" fill="none" stroke="#89929e" strokeWidth="1.6" strokeLinecap="round" />
        <path
          d="M6.2,7.8 L6.2,15.8 A4.3,1.8 0 0,0 14.8,15.8 L14.8,7.8 Z"
          fill={`url(#${uid}-pmug)`}
          stroke="#262626"
          strokeWidth="0.75"
        />
        <ellipse cx="10.5" cy="7.8" rx="4.3" ry="1.6" fill="#55606e" stroke="#262626" strokeWidth="0.7" />
        <polygon
          points="10.5,10.5 11.2,12.0 12.8,12.2 11.6,13.2 12.0,14.8 10.5,13.9 9.0,14.8 9.4,13.2 8.2,12.2 9.8,12.0"
          fill="#5aa2f2"
          stroke="#3672c4"
          strokeWidth="0.45"
        />
        {/* Front 3D magenta wireframe bounding box */}
        <polygon
          points="12.0,2.2 20.8,6.4 20.8,15.8 12.0,20.8 3.2,15.8 3.2,6.4"
          fill="#d2168d"
          fillOpacity="0.08"
          stroke="#d2168d"
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        <polyline points="3.2,6.4 12.0,11.0 20.8,6.4" fill="none" stroke="#e397dd" strokeWidth="0.85" strokeLinejoin="round" />
        <line x1="12.0" y1="11.0" x2="12.0" y2="20.8" stroke="#e397dd" strokeWidth="0.85" />
        {/* Top control vertex dot */}
        <circle cx="12.0" cy="2.2" r="1.3" fill="#e397dd" stroke="#7a1c6b" strokeWidth="0.6" />
      </>
    ),
  },
  {
    id: 'sop.usdexport',

    label: 'USD File Export',

    family: 'sop',

    description: 'Stacked isometric USD stage cards (bottom-right).',
    refKey: 'SOP_usdexport',
    types: ['usdexport'],
    icons: ['sop_usdexport'],
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-ue`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8fc2ff" />
            <stop offset="100%" stopColor="#3672c4" />
          </linearGradient>
        </defs>
        {/* Stacked isometric USD stage cards (bottom-right) */}
        <polygon points="14.2,9.2 21.5,11.9 14.2,14.6 6.9,11.9" fill={`url(#${uid}-ue)`} stroke="#eef2f7" strokeWidth="0.65" strokeLinejoin="round" />
        <polygon points="14.2,12.5 21.5,15.2 14.2,17.9 6.9,15.2" fill="#5aa2f2" stroke="#eef2f7" strokeWidth="0.65" strokeLinejoin="round" />
        <polygon points="14.2,15.8 21.5,18.5 14.2,21.2 6.9,18.5" fill="#3672c4" stroke="#eef2f7" strokeWidth="0.65" strokeLinejoin="round" />
        {/* Dark circle badge at top-left with white arrow pointing down-right into USD */}
        <circle cx="7.8" cy="7.8" r="5.4" fill="#262626" stroke="#89929e" strokeWidth="0.6" />
        <path
          d="M5.2,5.2 L9.2,9.2 M9.8,6.2 L10.4,10.4 L6.2,9.8"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.usdimport',

    label: 'USD File Import',

    family: 'sop',

    description: 'Stacked isometric USD stage cards (top-left).',
    refKey: 'SOP_usdimport',
    types: ['usdimport'],
    icons: ['sop_usdimport'],
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-ui`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8fc2ff" />
            <stop offset="100%" stopColor="#3672c4" />
          </linearGradient>
        </defs>
        {/* Stacked isometric USD stage cards (top-left) */}
        <polygon points="9.5,2.5 16.5,5.2 9.5,7.9 2.5,5.2" fill={`url(#${uid}-ui)`} stroke="#eef2f7" strokeWidth="0.65" strokeLinejoin="round" />
        <polygon points="9.5,5.8 16.5,8.5 9.5,11.2 2.5,8.5" fill="#5aa2f2" stroke="#eef2f7" strokeWidth="0.65" strokeLinejoin="round" />
        <polygon points="9.5,9.1 16.5,11.8 9.5,14.5 2.5,11.8" fill="#3672c4" stroke="#eef2f7" strokeWidth="0.65" strokeLinejoin="round" />
        {/* Dark circle badge at bottom-right with white arrow pointing down-right out of USD */}
        <circle cx="16.2" cy="16.2" r="5.4" fill="#262626" stroke="#89929e" strokeWidth="0.6" />
        <path
          d="M13.6,13.6 L17.6,17.6 M18.2,14.6 L18.8,18.8 L14.6,18.2"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.usdparentgeometry',

    label: 'USD Parent Geometry',

    family: 'sop',

    description: 'Hierarchy connecting lines from top parent down to left & right children.',
    refKey: 'SOP_usdparentgeometry',
    types: ['usdparentgeometry'],
    icons: ['sop_usdparentgeometry'],
    render: () => (
      <g>
        {/* Hierarchy connecting lines from top parent down to left & right children */}
        <line x1="10.2" y1="7.5" x2="6.2" y2="12.8" stroke="#262626" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="10.2" y1="7.5" x2="6.2" y2="12.8" stroke="#ffffff" strokeWidth="1.1" strokeLinecap="round" />
        <line x1="13.2" y1="7.5" x2="16.2" y2="11.8" stroke="#262626" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="13.2" y1="7.5" x2="16.2" y2="11.8" stroke="#ffffff" strokeWidth="1.1" strokeLinecap="round" />
        {/* Top parent gold cylinder */}
        <path d="M9.0,3.2 L9.0,6.8 A2.6,1.0 0 0,0 14.2,6.8 L14.2,3.2 Z" fill="#d99416" stroke="#262626" strokeWidth="0.75" />
        <ellipse cx="11.6" cy="3.2" rx="2.6" ry="1.0" fill="#ffd42a" stroke="#262626" strokeWidth="0.7" />
        {/* Bottom-left child grey cylinder */}
        <path d="M2.6,14.2 L2.6,18.5 A2.8,1.1 0 0,0 8.2,18.5 L8.2,14.2 Z" fill="#89929e" stroke="#262626" strokeWidth="0.75" />
        <ellipse cx="5.4" cy="14.2" rx="2.8" ry="1.1" fill="#eef2f7" stroke="#262626" strokeWidth="0.7" />
        {/* Bottom-right child USD component mug with cyan star */}
        <path d="M19.4,14.5 C21.6,14.5 21.6,18.8 19.4,18.8" fill="none" stroke="#c0c7d1" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12.2,13.0 L12.2,19.5 A3.7,1.5 0 0,0 19.6,19.5 L19.6,13.0 Z" fill="#eef2f7" stroke="#262626" strokeWidth="0.8" />
        <ellipse cx="15.9" cy="13.0" rx="3.7" ry="1.3" fill="#55606e" stroke="#262626" strokeWidth="0.7" />
        <polygon
          points="15.9,15.0 16.5,16.3 17.9,16.5 16.8,17.4 17.1,18.8 15.9,18.0 14.7,18.8 15.0,17.4 13.9,16.5 15.3,16.3"
          fill="#5aa2f2"
          stroke="#3672c4"
          strokeWidth="0.4"
        />
      </g>
    ),
  },
  {
    id: 'sop.usdpointinstancerimport',

    label: 'USD PointInstancer Import',

    family: 'sop',

    description: 'Pin base shadow.',
    refKey: 'SOP_usdpointinstancerimport',
    types: ['usdpointinstancerimport'],
    icons: ['sop_usdpointinstancerimport'],
    render: () => {
      const pins: [number, number][] = [
        [8.2, 5.2],
        [15.8, 5.2],
        [4.8, 12.2],
        [19.2, 12.2],
        [12.0, 16.8],
      ];
      return (
        <g>
          {pins.map(([cx, cy], idx) => (
            <g key={idx}>
              {/* Pin base shadow */}
              <ellipse cx={cx} cy={cy + 3.6} rx="2.0" ry="0.7" fill="#262626" opacity="0.35" />
              {/* Teardrop / bulb instancer pin */}
              <path
                d={`M${cx},${cy + 3.5} C${cx - 1.5},${cy + 1.6} ${cx - 2.4},${cy + 0.4} ${cx - 2.4},${cy - 0.8} A2.4,2.4 0 1,1 ${cx + 2.4},${cy - 0.8} C${cx + 2.4},${cy + 0.4} ${cx + 1.5},${cy + 1.6} ${cx},${cy + 3.5} Z`}
                fill="#c0c7d1"
                stroke="#3672c4"
                strokeWidth="0.8"
                strokeLinejoin="round"
              />
              <circle cx={cx - 0.6} cy={cy - 1.1} r="0.8" fill="#ffffff" />
            </g>
          ))}
        </g>
      );
    },
  },
  {
    id: 'sop.cloud',

    label: 'Cloud',

    family: 'sop',

    description: 'Soft blue sky halo.',
    refKey: 'SOP_cloud',
    types: ['cloud', 'cloudadjustdensityprofile', 'cloudshapefromintersection', 'cloudshapegenerate'],
    icons: ['sop_cloud', 'sop_cloudadjustdensityprofile', 'sop_cloudshapefromintersection', 'sop_cloudshapegenerate'],
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-sky`} cx="50%" cy="45%" r="50%">
            <stop offset="0%" stopColor="#8fc2ff" />
            <stop offset="70%" stopColor="#5aa2f2" />
            <stop offset="100%" stopColor="#3672c4" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Soft blue sky halo */}
        <circle cx="12.0" cy="12.0" r="10.2" fill={`url(#${uid}-sky)`} opacity="0.75" />
        {/* Fluffy 3D cumulus cloud */}
        <path
          d="M5.5,16.8 C3.4,16.8 2.2,15.3 2.5,13.4 C2.7,11.8 4.0,10.7 5.5,10.6 C6.0,8.0 8.3,6.4 10.9,6.6 C12.8,6.7 14.4,7.8 15.1,9.4 C15.7,9.1 16.5,9.0 17.2,9.2 C19.1,9.6 20.2,11.3 19.9,13.1 C21.0,13.6 21.6,14.7 21.3,15.8 C21.0,16.9 19.9,17.4 18.6,17.4 L5.5,16.8 Z"
          fill="#eef2f7"
          stroke="#55606e"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Underside lavender-grey volume shading */}
        <path
          d="M4.2,15.2 C6.2,16.2 9.5,16.0 12.2,15.0 C14.8,16.2 18.2,16.4 20.2,15.2 C20.4,16.4 19.4,17.2 18.0,17.2 L5.8,16.7 C4.4,16.6 3.8,15.9 4.2,15.2 Z"
          fill="#c0c7d1"
        />
        {/* Internal bright puff highlights */}
        <circle cx="9.8" cy="10.4" r="2.8" fill="#ffffff" />
        <circle cx="13.8" cy="11.6" r="2.3" fill="#ffffff" />
        <circle cx="6.6" cy="13.0" r="2.0" fill="#ffffff" />
        <path
          d="M8.5,12.5 A2.6,2.2 0 0,0 13.2,12.8"
          fill="none"
          stroke="#89929e"
          strokeWidth="0.6"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    id: 'sop.cloudbillowynoise',

    label: 'Cloud Billowy Noise',

    family: 'sop',

    description: 'Center fluffy cloud.',
    refKey: 'SOP_cloudbillowynoise',
    types: ['cloudbillowynoise', 'cloudnoise', 'cloudwispynoise', 'skyfieldnoise'],
    icons: ['sop_cloudbillowynoise', 'sop_cloudnoise', 'sop_cloudwispynoise', 'sop_skyfieldnoise'],
    render: () => (
      <g>
        {/* Center fluffy cloud */}
        <path
          d="M6.4,16.2 C4.6,16.2 3.6,14.9 3.9,13.3 C4.1,12.0 5.1,11.0 6.4,10.9 C6.8,8.7 8.8,7.3 11.0,7.5 C12.6,7.6 14.0,8.6 14.6,9.9 C15.2,9.6 15.8,9.5 16.5,9.7 C18.0,10.0 19.0,11.5 18.7,13.0 C19.6,13.5 20.1,14.4 19.9,15.4 C19.6,16.3 18.7,16.7 17.6,16.7 L6.4,16.2 Z"
          fill="#eef2f7"
          stroke="#55606e"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        <path
          d="M5.2,14.8 C7.5,15.8 11.2,15.6 13.5,14.8 C15.5,15.8 17.8,15.8 19.0,15.0 C19.0,16.0 18.2,16.5 17.0,16.5 L6.6,16.1 C5.5,16.0 5.0,15.4 5.2,14.8 Z"
          fill="#c0c7d1"
        />
        <circle cx="10.2" cy="10.8" r="2.2" fill="#ffffff" />
        <circle cx="13.8" cy="11.8" r="1.9" fill="#ffffff" />
        {/* Surrounding ring of teal-blue perturbation arrows */}
        <g stroke="#2c5d7c" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round" fill="none">
          {/* Top-left arrow */}
          <path d="M4.8,6.8 L2.6,4.6 M2.6,6.8 L2.6,4.6 L4.8,4.6" />
          {/* Top arrow */}
          <path d="M11.2,5.2 L11.2,2.4 M9.6,3.8 L11.2,2.4 L12.8,3.8" />
          {/* Top-right arrow */}
          <path d="M17.5,7.0 L19.8,4.8 M17.6,4.8 L19.8,4.8 L19.8,7.0" />
          {/* Bottom-left arrow */}
          <path d="M4.2,17.5 L2.2,19.5 M2.2,17.3 L2.2,19.5 L4.4,19.5" />
          {/* Bottom arrow */}
          <path d="M11.8,18.2 L11.8,21.2 M10.2,19.8 L11.8,21.2 L13.4,19.8" />
          {/* Bottom-right arrow */}
          <path d="M18.2,17.8 L20.4,20.0 M18.2,20.0 L20.4,20.0 L20.4,17.8" />
        </g>
      </g>
    ),
  },
];
