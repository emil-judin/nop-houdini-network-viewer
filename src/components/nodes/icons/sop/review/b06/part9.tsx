import type { OperatorIconDef } from '../../../iconTypes';

export const BATCH_06_PART_9: OperatorIconDef[] = [
  {
    id: 'sop.hairclump',

    label: 'Hair Clump',

    family: 'sop',

    description: 'Curved grey skin patch.',
    refKey: 'SOP_hairclump',
    types: ['hairclump'],
    icons: ['sop_hairclump'],
    render: (uid) => (
      <g>
        <defs>
          <linearGradient id={`${uid}-skin`} x1="2" y1="15" x2="22" y2="22" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#d3d7cf" />
            <stop offset="1" stopColor="#888a85" />
          </linearGradient>
          <linearGradient id={`${uid}-clump`} x1="4" y1="18" x2="18" y2="3" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#c17d11" />
            <stop offset="0.6" stopColor="#e5ac52" />
            <stop offset="1" stopColor="#f3bf6c" />
          </linearGradient>
        </defs>
        {/* Curved grey skin patch */}
        <path
          d="M 2 20 Q 12 17 22 20 L 18.5 13.5 Q 12 12 5.5 13.5 Z"
          fill={`url(#${uid}-skin)`}
          stroke="#555753"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Left hair clump converging to tip */}
        <path
          d="M 4.5 17.5 C 5 12.5 6 8 7.2 4 C 8 8 9.2 12.5 10.2 17 Z"
          fill={`url(#${uid}-clump)`}
          stroke="#8f5902"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
        {/* Center hair clump converging to tip */}
        <path
          d="M 9.2 18.2 C 10.2 12.5 11.2 7.5 12.2 2.8 C 13.2 7.5 14.2 12.5 15.2 18.2 Z"
          fill={`url(#${uid}-clump)`}
          stroke="#8f5902"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        {/* Right hair clump converging to tip */}
        <path
          d="M 14.2 17.2 C 15.2 12.5 16.5 8.2 17.5 4.2 C 18.2 8.2 19 12.5 19.8 17.5 Z"
          fill={`url(#${uid}-clump)`}
          stroke="#8f5902"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.hairgen',

    label: 'Hair Generate',

    family: 'sop',

    description: 'Curved grey skin patch.',
    refKey: 'SOP_hairgen',
    types: ['hairgen'],
    icons: ['sop_hairgen'],
    render: (uid) => (
      <g>
        <defs>
          <linearGradient id={`${uid}-skin`} x1="2" y1="15" x2="22" y2="22" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#d3d7cf" />
            <stop offset="1" stopColor="#888a85" />
          </linearGradient>
        </defs>
        {/* Curved grey skin patch */}
        <path
          d="M 2 20 Q 12 17 22 20 L 18.5 13.5 Q 12 12 5.5 13.5 Z"
          fill={`url(#${uid}-skin)`}
          stroke="#555753"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Generated dense tan/brown hair strands */}
        <g fill="none" stroke="#4c2f04" strokeWidth="1.35" strokeLinecap="round">
          <path d="M 5.2 16.8 C 4.5 12 4.8 7.8 6 4" />
          <path d="M 7.5 16.2 C 7 11.5 7.5 7.2 8.8 3.2" />
          <path d="M 10 16.8 C 9.8 11.8 10.2 7.5 11.2 3.2" />
          <path d="M 14 16.8 C 14.2 11.8 14.5 7.5 15.5 3.5" />
          <path d="M 16.5 16.2 C 17 11.5 17.5 7.5 18.8 3.8" />
          <path d="M 18.8 16.8 C 19.5 12.2 20 8.2 21 4.8" />
        </g>
        <g fill="none" stroke="#d8b08d" strokeWidth="0.75" strokeLinecap="round">
          <path d="M 5.2 16.8 C 4.5 12 4.8 7.8 6 4" />
          <path d="M 7.5 16.2 C 7 11.5 7.5 7.2 8.8 3.2" />
          <path d="M 10 16.8 C 9.8 11.8 10.2 7.5 11.2 3.2" />
          <path d="M 14 16.8 C 14.2 11.8 14.5 7.5 15.5 3.5" />
          <path d="M 16.5 16.2 C 17 11.5 17.5 7.5 18.8 3.8" />
          <path d="M 18.8 16.8 C 19.5 12.2 20 8.2 21 4.8" />
        </g>
        {/* Guide highlight strands (blue and coral) */}
        <path d="M 12 17 C 12 11.8 12.5 7.2 13.5 2.8" fill="none" stroke="#729fcf" strokeWidth="1.15" strokeLinecap="round" />
        <path d="M 8.8 17.5 C 8.5 12.5 9 8 10 3.8" fill="none" stroke="#cf7272" strokeWidth="1" strokeLinecap="round" />
      </g>
    ),
  },
  {
    id: 'sop.hairgrowthfield',

    label: 'Hair Growth Field',

    family: 'sop',

    description: 'Metallic base sphere.',
    refKey: 'SOP_hairgrowthfield',
    types: ['hairgrowthfield'],
    icons: ['sop_hairgrowthfield'],
    render: (uid) => (
      <g>
        <defs>
          <radialGradient id={`${uid}-ball`} cx="10" cy="10" r="9.5" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.55" stopColor="#c9ccd0" />
            <stop offset="1" stopColor="#90969f" />
          </radialGradient>
        </defs>
        {/* Metallic base sphere */}
        <circle cx="11.5" cy="12.5" r="8.5" fill={`url(#${uid}-ball)`} stroke="#41464c" strokeWidth="0.85" />
        {/* Colorful growth field vectors / streamlines */}
        <g fill="none" strokeWidth="1.15" strokeLinecap="round">
          <path d="M 6 15.5 C 8.5 12.5 13 9 18.5 4.5" stroke="#ef2929" />
          <path d="M 5 11.5 C 8 9 12.5 6.5 17.5 3" stroke="#74ef29" />
          <path d="M 8.5 18 C 11.5 15 15.5 11.5 20.5 7" stroke="#29b4ef" />
          <path d="M 11.5 19.5 C 14.5 17 18 14 21.5 10" stroke="#ef29bf" />
        </g>
        {/* Golden hair tuft swept along growth field */}
        <path
          d="M 6.5 16.5 C 10 13 15.5 8 19.5 2.5 C 16.5 9.5 10.5 15 8 17.8 C 7.2 18.2 6.2 17.2 6.5 16.5 Z"
          fill="#e8b96d"
          stroke="#59370a"
          strokeWidth="0.7"
          strokeLinejoin="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.bonecapturebiharmonic',

    label: 'Bone Capture Biharmonic',

    family: 'sop',

    description: 'Soft biharmonic weight-painted arm & hand silhouette.',
    refKey: 'SOP_bonecapturebiharmonic',
    types: ['bonecapturebiharmonic'],
    icons: ['sop_bonecapturebiharmonic'],
    render: (uid) => (
      <g>
        <defs>
          <linearGradient id={`${uid}-weights`} x1="3" y1="20" x2="21" y2="4" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#faaf3e" />
            <stop offset="0.5" stopColor="#fef3dc" />
            <stop offset="1" stopColor="#6ccc86" />
          </linearGradient>
        </defs>
        {/* Soft biharmonic weight-painted arm & hand silhouette */}
        <path
          d="M 18 2.5 C 15.5 6.5 12.5 10 9.5 12.5 C 7 13 4 13.5 2.5 14.5 C 4.5 15 2 17.5 3.5 18.5 C 5.5 17.5 4 20.5 5.5 21 C 7.5 19 7.5 21.8 9 21 C 10.5 19 11.5 17.5 13 16 C 16.5 13.5 19.5 10.5 21.5 7 Z"
          fill={`url(#${uid}-weights)`}
          fillOpacity="0.82"
          stroke="#4e9a06"
          strokeWidth="0.7"
          strokeLinejoin="round"
        />
        {/* Internal blue tetrahedral bone chain */}
        <polygon
          points="15.5,11.5 19.8,4 21.5,3.5 21.2,5.8"
          fill="#709ec3"
          stroke="#224b87"
          strokeWidth="0.7"
          strokeLinejoin="round"
        />
        <polygon
          points="8.5,17 13.5,12 15.5,11.5 14.5,13.5"
          fill="#a0c6de"
          stroke="#224b87"
          strokeWidth="0.7"
          strokeLinejoin="round"
        />
        <circle cx="15.5" cy="11.5" r="1.1" fill="#ffffff" stroke="#224b87" strokeWidth="0.55" />
      </g>
    ),
  },
  {
    id: 'sop.bonecapturelines',

    label: 'Bone Capture Lines',

    family: 'sop',

    description: 'Pink/coral capture region envelope circles & lines.',
    refKey: 'SOP_bonecapturelines',
    types: ['bonecapturelines'],
    icons: ['sop_bonecapturelines'],
    render: (uid) => (
      <g>
        <defs>
          <linearGradient id={`${uid}-bone`} x1="4" y1="20" x2="20" y2="4" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#cfd9de" />
            <stop offset="0.5" stopColor="#ffffff" />
            <stop offset="1" stopColor="#8196a6" />
          </linearGradient>
        </defs>
        {/* Pink/coral capture region envelope circles & lines */}
        <g fill="none" stroke="#f89c9c" strokeWidth="0.85">
          <circle cx="17.5" cy="6.5" r="4.2" />
          <circle cx="6.5" cy="17.5" r="4.2" />
          <line x1="14.5" y1="3.5" x2="3.5" y2="14.5" strokeDasharray="1.5 1" />
          <line x1="20.5" y1="9.5" x2="9.5" y2="20.5" strokeDasharray="1.5 1" />
        </g>
        {/* Diagonal anatomical bone inside capture capsule */}
        <path
          d="M 6.5 14.8 C 9.5 12 12 9.5 14.8 6.5 C 15.5 4.8 16.5 3.2 18 3.5 C 19.2 3.8 19.5 5 18.8 5.8 C 19.8 5.5 20.8 6.2 20.5 7.5 C 20.2 8.8 18.5 9.2 16.8 8.5 C 14 11.5 11.5 14 8.5 16.8 C 9.2 18.5 8.8 20.2 7.5 20.5 C 6.2 20.8 5.5 19.8 5.8 18.8 C 5 19.5 3.8 19.2 3.5 18 C 3.2 16.5 4.8 15.5 6.5 14.8 Z"
          fill={`url(#${uid}-bone)`}
          stroke="#282f33"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.bonedeform',

    label: 'Bone Deform',

    family: 'sop',

    description: 'Bent green cylinder / limb mesh.',
    refKey: 'SOP_bonedeform',
    types: ['bonedeform', 'jointdeform'],
    icons: ['sop_bonedeform', 'sop_kinefx-jointdeform'],
    render: (uid) => (
      <g>
        <defs>
          <linearGradient id={`${uid}-limb`} x1="4" y1="4" x2="20" y2="21" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#b8f18f" />
            <stop offset="1" stopColor="#6ab800" />
          </linearGradient>
        </defs>
        {/* Bent green cylinder / limb mesh */}
        <path
          d="M 10.5 2.5 C 16 7 19.5 13.5 19.8 20.5 C 19.8 21.8 17.2 22.5 14.5 22.2 C 11.8 22 9.5 21 9.5 19.5 C 9.5 16 8.5 12.5 2.5 7.8 Z"
          fill={`url(#${uid}-limb)`}
          stroke="#1d3f00"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Top open cross-section ellipse */}
        <ellipse
          cx="6.5"
          cy="5.2"
          rx="4.8"
          ry="2"
          transform="rotate(-34 6.5 5.2)"
          fill="#b9ec95"
          stroke="#1d3f00"
          strokeWidth="0.8"
        />
        {/* Highlight & internal deform crease lines */}
        <path
          d="M 11.2 5.2 C 15.2 9 18 15 18.2 20.5"
          fill="none"
          stroke="#ffffff"
          strokeWidth="0.7"
          strokeLinecap="round"
          opacity="0.75"
        />
        <path
          d="M 7.5 11.5 Q 11.5 12.5 14.5 10.5"
          fill="none"
          stroke="#1d3f00"
          strokeWidth="0.65"
          strokeLinecap="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.bonelink',

    label: 'Bone Link',

    family: 'sop',

    description: 'Ground shadow.',
    refKey: 'SOP_bonelink',
    types: ['bonelink'],
    icons: ['sop_bonelink'],
    render: (uid) => (
      <g>
        <defs>
          <linearGradient id={`${uid}-bone`} x1="3" y1="21" x2="21" y2="3" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#8196a6" />
            <stop offset="0.45" stopColor="#fcfdfd" />
            <stop offset="0.8" stopColor="#cfd9de" />
            <stop offset="1" stopColor="#647380" />
          </linearGradient>
        </defs>
        {/* Ground shadow */}
        <ellipse
          cx="13.5"
          cy="19.5"
          rx="8.5"
          ry="1.8"
          transform="rotate(-14 13.5 19.5)"
          fill="#262626"
          fillOpacity="0.28"
        />
        {/* 3D anatomical femur/rig bone */}
        <path
          d="M 5.8 15.2 C 9.2 12.2 12.2 9.2 15.2 5.8 C 16 4 17.2 2.2 19 2.5 C 20.4 2.8 20.8 4.2 19.8 5.2 C 21 4.8 22 5.8 21.6 7.2 C 21.2 8.8 19.2 9.2 17.5 8.2 C 14.2 11.5 11.5 14.2 8.2 17.5 C 9.2 19.2 8.8 21.2 7.2 21.6 C 5.8 22 4.8 21 5.2 19.8 C 4.2 20.8 2.8 20.4 2.5 19 C 2.2 17.2 4 16 5.8 15.2 Z"
          fill={`url(#${uid}-bone)`}
          stroke="#282f33"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Specular ridge along bone shaft */}
        <path
          d="M 7.2 15.8 L 16.2 6.8"
          fill="none"
          stroke="#ffffff"
          strokeWidth="0.75"
          strokeLinecap="round"
          opacity="0.8"
        />
      </g>
    ),
  },
  {
    id: 'sop.tetrasurface',

    label: 'Convert Tets',

    family: 'sop',

    description: 'Faceted tetrahedral mesh surface.',
    refKey: 'SOP_tetrasurface',
    types: ['tetrasurface'],
    icons: ['sop_tetrasurface'],
    render: () => (
      <g>
        {/* Faceted tetrahedral mesh surface */}
        <g stroke="#5c7281" strokeWidth="0.65" strokeLinejoin="bevel">
          <polygon points="12.5,2.2 17.5,8.5 10.2,11" fill="#eeeeec" />
          <polygon points="9.8,6 10.2,11 12.5,2.2" fill="#888a85" />
          <polygon points="17.5,8.5 21.8,14 15,16.8" fill="#eeeeec" />
          <polygon points="10.2,11 17.5,8.5 18.5,13.8" fill="#d3d7cf" />
          <polygon points="10.2,11 15,16.8 18.5,13.8" fill="#babdb6" />
          <polygon points="5.5,13.5 10.2,11 11.5,18.2" fill="#d3d7cf" />
          <polygon points="10.2,11 15,16.8 11.5,18.2" fill="#eeeeec" />
          <polygon points="5.5,13.5 11.5,18.2 4.2,19.8" fill="#888a85" />
          <polygon points="11.5,18.2 15,16.8 16.5,21.2" fill="#babdb6" />
          <polygon points="15,16.8 21.8,14 19.5,20.2" fill="#888a85" />
        </g>
        {/* Red internal tetrahedral cut edges */}
        <g fill="none" stroke="#ef2929" strokeWidth="0.75" strokeLinecap="round">
          <line x1="10.2" y1="11" x2="16.5" y2="12.5" />
          <line x1="12.5" y1="7.5" x2="15" y2="16.8" />
          <line x1="7.8" y1="15.2" x2="15" y2="16.8" />
        </g>
        {/* Outer silhouette reinforcement */}
        <polygon
          points="12.5,2.2 17.5,8.5 21.8,14 19.5,20.2 16.5,21.2 11.5,18.2 4.2,19.8 5.5,13.5 9.8,6"
          fill="none"
          stroke="#2e3436"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.femdeform',

    label: 'FEM Deform',

    family: 'sop',

    description: 'Flexed pink/red FEM muscle arm.',
    refKey: 'SOP_femdeform',
    types: ['femdeform'],
    icons: ['sop_femdeform'],
    render: (uid) => (
      <g>
        <defs>
          <linearGradient id={`${uid}-muscle`} x1="2" y1="6" x2="21" y2="19" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#fa9db5" />
            <stop offset="0.5" stopColor="#f07793" />
            <stop offset="1" stopColor="#d83252" />
          </linearGradient>
        </defs>
        {/* Flexed pink/red FEM muscle arm */}
        <path
          d="M 3.5 8.5 C 7.5 8.5 11.5 7.5 16.5 7 C 18.2 7 20 9.5 21.2 12.5 C 22 14.8 21.5 17.5 19.8 18.2 C 18 18.8 15.8 16.8 13.5 16 C 10.5 16.8 7.5 16.2 5.5 14.5 C 3.5 14.2 2.2 13 2.2 11 C 2.2 9.5 2.8 8.5 3.5 8.5 Z"
          fill={`url(#${uid}-muscle)`}
          stroke="#a40000"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Blue tetrahedral FEM mesh overlay on forearm/bicep */}
        <g fill="#729fcf" fillOpacity="0.45" stroke="#204a87" strokeWidth="0.65" strokeLinejoin="round">
          <polygon points="7.5,8.5 12.5,7.8 10.2,12.5" />
          <polygon points="12.5,7.8 16.8,7.2 14.5,12.2" />
          <polygon points="10.2,12.5 12.5,7.8 14.5,12.2" />
          <polygon points="7.5,8.5 10.2,12.5 6.8,14.5" />
          <polygon points="10.2,12.5 14.5,12.2 12,16.2" />
          <polygon points="6.8,14.5 10.2,12.5 12,16.2" />
        </g>
      </g>
    ),
  },
  {
    id: 'sop.femvalidate',

    label: 'FEM Validate',

    family: 'sop',

    description: 'Faceted green tetrahedral sphere.',
    refKey: 'SOP_femvalidate',
    types: ['femvalidate'],
    icons: ['sop_femvalidate'],
    render: () => (
      <g>
        {/* Faceted green tetrahedral sphere */}
        <g stroke="#366b04" strokeWidth="0.65" strokeLinejoin="bevel">
          <polygon points="9.5,2.2 15,4.2 16,2.3" fill="#7fc639" />
          <polygon points="9.5,2.2 7.5,6.2 15,4.2" fill="#bddc9e" />
          <polygon points="7.5,6.2 3.8,5.4 9.5,2.2" fill="#bddc9e" />
          <polygon points="16,2.3 20.5,6 15,4.2" fill="#7fc639" />
          <polygon points="15,4.2 19.2,10.2 20.5,6" fill="#7fc639" />
          <polygon points="20.5,6 22,11.8 19.2,10.2" fill="#619e2a" />
          <polygon points="19.2,10.2 20.5,17.2 22,11.8" fill="#619e2a" />
          <polygon points="3.8,5.4 2,11.5 7.5,6.2" fill="#bddc9e" />
          <polygon points="2,11.5 4.2,17.5 8.2,13.5" fill="#7fc639" />
          <polygon points="7.5,6.2 2,11.5 8.2,13.5" fill="#bddc9e" />
          <polygon points="8.2,13.5 4.2,17.5 11.5,20.8" fill="#619e2a" />
          <polygon points="8.2,13.5 11.5,20.8 15.8,14.8" fill="#7fc639" />
          <polygon points="15.8,14.8 11.5,20.8 18.2,19.8" fill="#619e2a" />
          <polygon points="15.8,14.8 18.2,19.8 20.5,17.2" fill="#619e2a" />
          <polygon points="15,4.2 15.8,14.8 19.2,10.2" fill="#7fc639" />
        </g>
        {/* Highlighted red invalid / inverted tet in center */}
        <g stroke="#a40000" strokeWidth="0.75" strokeLinejoin="round">
          <polygon points="7.5,6.2 15,4.2 12.2,10.5" fill="#ffdcdc" />
          <polygon points="7.5,6.2 12.2,10.5 8.2,13.5" fill="#f35a5a" />
          <polygon points="15,4.2 15.8,14.8 12.2,10.5" fill="#f35a5a" />
          <polygon points="8.2,13.5 12.2,10.5 15.8,14.8" fill="#cc0000" />
        </g>
      </g>
    ),
  },
];
