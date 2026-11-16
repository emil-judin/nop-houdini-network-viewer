import type { OperatorIconDef } from '../../../iconTypes';

export const BATCH_06_PART_7: OperatorIconDef[] = [
  {
    id: 'sop.guideadvect',

    label: 'Guide Advect',

    family: 'sop',

    description: 'Curved skin patch at bottom.',
    refKey: 'SOP_guideadvect',
    types: ['guideadvect'],
    icons: ['sop_guideadvect'],
    render: (uid) => (
      <g>
        <defs>
          <linearGradient id={`${uid}-skin`} x1="2" y1="16" x2="22" y2="22" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#d3d7cf" />
            <stop offset="1" stopColor="#888a85" />
          </linearGradient>
          <linearGradient id={`${uid}-hair`} x1="4" y1="18" x2="18" y2="4" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#c17d11" />
            <stop offset="1" stopColor="#f3bf6c" />
          </linearGradient>
        </defs>
        {/* Curved skin patch at bottom */}
        <path
          d="M 2.5 18.5 Q 10 15.5 21.5 19 L 19 22 Q 10 19 4 21.5 Z"
          fill={`url(#${uid}-skin)`}
          stroke="#555753"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Advected golden-brown hair guide strands */}
        <g fill="none" stroke="#8f5902" strokeWidth="1.8" strokeLinecap="round">
          <path d="M 5.5 18.5 C 5.5 13 9 9.5 16 8" />
          <path d="M 9 18 C 9.5 12.5 13 9 19.5 7.5" />
          <path d="M 12.5 18 C 13 13.5 16 10.5 21 9.5" />
          <path d="M 16 18.5 C 16.5 15 18.5 12.5 22 11.8" />
        </g>
        <g fill="none" stroke={`url(#${uid}-hair)`} strokeWidth="1.05" strokeLinecap="round">
          <path d="M 5.5 18.5 C 5.5 13 9 9.5 16 8" />
          <path d="M 9 18 C 9.5 12.5 13 9 19.5 7.5" />
          <path d="M 12.5 18 C 13 13.5 16 10.5 21 9.5" />
          <path d="M 16 18.5 C 16.5 15 18.5 12.5 22 11.8" />
        </g>
        {/* Blue velocity/wind streamlines */}
        <g fill="none" stroke="#204a87" strokeWidth="1.6" strokeLinecap="round">
          <path d="M 2.5 9.5 Q 8 5.5 15.5 5.5" />
          <path d="M 3.5 13.5 Q 9.5 9.5 17.5 9.5" />
        </g>
        <g fill="none" stroke="#729fcf" strokeWidth="0.95" strokeLinecap="round">
          <path d="M 2.5 9.5 Q 8 5.5 15.5 5.5" />
          <path d="M 3.5 13.5 Q 9.5 9.5 17.5 9.5" />
        </g>
        {/* Streamline arrowheads */}
        <polygon points="18,5.5 14.5,3.7 14.5,7.3" fill="#729fcf" stroke="#204a87" strokeWidth="0.65" strokeLinejoin="round" />
        <polygon points="20,9.5 16.5,7.7 16.5,11.3" fill="#729fcf" stroke="#204a87" strokeWidth="0.65" strokeLinejoin="round" />
      </g>
    ),
  },
  {
    id: 'sop.guideclumpcenter',

    label: 'Guide Clump Center',

    family: 'sop',

    description: 'Isometric grey skin slab.',
    refKey: 'SOP_guideclumpcenter',
    types: ['guideclumpcenter'],
    icons: ['sop_guideclumpcenter'],
    render: (uid) => (
      <g>
        <defs>
          <linearGradient id={`${uid}-slab`} x1="2" y1="15" x2="22" y2="22" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#d3d7cf" />
            <stop offset="1" stopColor="#888a85" />
          </linearGradient>
        </defs>
        {/* Isometric grey skin slab */}
        <polygon
          points="12,14.5 22,18 12,21.5 2,18"
          fill={`url(#${uid}-slab)`}
          stroke="#555753"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Left clump: blue guide hairs */}
        <g fill="none" stroke="#3465a4" strokeWidth="0.9" strokeLinecap="round">
          <path d="M 5.5 18 C 6 13.5 7 9.5 7.5 4.5" />
          <path d="M 7.5 18.8 C 7.8 14 7.8 9.5 7.5 4.5" />
          <path d="M 9.5 17.6 C 8.8 13.5 8.2 9.5 7.5 4.5" />
        </g>
        {/* Right clump: blue guide hairs */}
        <g fill="none" stroke="#729fcf" strokeWidth="0.9" strokeLinecap="round">
          <path d="M 14 17.5 C 14.8 13 15.8 9 16.5 4" />
          <path d="M 16 18.8 C 16.2 13.8 16.4 9 16.5 4" />
          <path d="M 18.5 18 C 17.8 13.5 17 9 16.5 4" />
        </g>
        {/* Bright red clump center guide curves */}
        <g fill="none" stroke="#a40000" strokeWidth="2" strokeLinecap="round">
          <path d="M 7.5 18.2 C 7.5 13.5 7.5 9 7.5 3.5" />
          <path d="M 16.2 18.2 C 16.3 13.5 16.4 9 16.5 3.2" />
        </g>
        <g fill="none" stroke="#ef2929" strokeWidth="1.2" strokeLinecap="round">
          <path d="M 7.5 18.2 C 7.5 13.5 7.5 9 7.5 3.5" />
          <path d="M 16.2 18.2 C 16.3 13.5 16.4 9 16.5 3.2" />
        </g>
        {/* Root dots */}
        <circle cx="7.5" cy="18.2" r="1.2" fill="#ef2929" stroke="#a40000" strokeWidth="0.55" />
        <circle cx="16.2" cy="18.2" r="1.2" fill="#ef2929" stroke="#a40000" strokeWidth="0.55" />
      </g>
    ),
  },
  {
    id: 'sop.guidedeform',

    label: 'Guide Deform',

    family: 'sop',

    description: 'Ghosted skin patch 1 (rest).',
    refKey: 'SOP_guidedeform',
    types: ['guidedeform'],
    icons: ['sop_guidedeform'],
    render: () => (
      <g>
        {/* Ghosted skin patch 1 (rest) */}
        <g opacity="0.32">
          <path
            d="M 2 16 Q 6 14 11 16 L 9.5 18.5 Q 5.5 17 3 18.5 Z"
            fill="#d3d7cf"
            stroke="#555753"
            strokeWidth="0.7"
          />
          <path d="M 4.5 16 C 4.5 11 5.5 7 7 3.5" fill="none" stroke="#729fcf" strokeWidth="1.1" strokeLinecap="round" />
          <path d="M 7.5 16 C 7.5 11 8.5 7 10 3.5" fill="none" stroke="#cf7272" strokeWidth="1.1" strokeLinecap="round" />
        </g>
        {/* Ghosted skin patch 2 (intermediate) */}
        <g opacity="0.6">
          <path
            d="M 6.5 17.5 Q 11 15 16.5 17.5 L 15 20 Q 10.5 18 7.5 20 Z"
            fill="#d3d7cf"
            stroke="#555753"
            strokeWidth="0.75"
          />
          <path d="M 9.5 17.5 C 9.8 12.5 11.5 8.5 14 5" fill="none" stroke="#729fcf" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M 12.5 17.5 C 13 12.5 14.8 8.5 17 5.5" fill="none" stroke="#cf7272" strokeWidth="1.2" strokeLinecap="round" />
        </g>
        {/* Solid deformed skin patch 3 */}
        <path
          d="M 11 19 Q 16.5 16 22 19.5 L 20.5 22 Q 16 19.5 12 21.5 Z"
          fill="#d3d7cf"
          stroke="#555753"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Deformed hair guides */}
        <g fill="none" strokeLinecap="round">
          <path d="M 13.5 19 C 14.5 13.5 17 9.5 20.5 6.5" stroke="#204a87" strokeWidth="1.8" />
          <path d="M 13.5 19 C 14.5 13.5 17 9.5 20.5 6.5" stroke="#729fcf" strokeWidth="1.1" />
          <path d="M 16.2 19 C 17.2 14 19.2 10.2 22 7.8" stroke="#8f5902" strokeWidth="1.7" />
          <path d="M 16.2 19 C 17.2 14 19.2 10.2 22 7.8" stroke="#d8b08d" strokeWidth="1.05" />
          <path d="M 18.8 19.5 C 19.5 15 20.8 11.8 22.5 9.8" stroke="#a40000" strokeWidth="1.7" />
          <path d="M 18.8 19.5 C 19.5 15 20.8 11.8 22.5 9.8" stroke="#cf7272" strokeWidth="1.05" />
        </g>
      </g>
    ),
  },
  {
    id: 'sop.guidedraw',

    label: 'Guide Draw',

    family: 'sop',

    description: 'Golden-brown fur base patch.',
    refKey: 'SOP_guidedraw',
    types: ['guidedraw'],
    icons: ['sop_guidedraw'],
    render: (uid) => (
      <g>
        <defs>
          <linearGradient id={`${uid}-fur`} x1="2" y1="21" x2="16" y2="11" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#8f5811" />
            <stop offset="0.5" stopColor="#cc8e27" />
            <stop offset="1" stopColor="#e8b96d" />
          </linearGradient>
        </defs>
        {/* Golden-brown fur base patch */}
        <path
          d="M 2.5 19.5 C 4 15 8.5 13.5 15.5 15.5 L 18 20.5 C 12 22 6 22 2.5 19.5 Z"
          fill={`url(#${uid}-fur)`}
          stroke="#633812"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Drawn blue guide curves */}
        <g fill="none" stroke="#204a87" strokeWidth="1.9" strokeLinecap="round">
          <path d="M 5.5 18 C 5 13 6.5 9 9.5 6.5" />
          <path d="M 9 18.5 C 9 13.5 10.5 9.5 13.5 7.5" />
          <path d="M 12.5 19 C 12.8 14.5 14 11 16.5 9" />
        </g>
        <g fill="none" stroke="#729fcf" strokeWidth="1.1" strokeLinecap="round">
          <path d="M 5.5 18 C 5 13 6.5 9 9.5 6.5" />
          <path d="M 9 18.5 C 9 13.5 10.5 9.5 13.5 7.5" />
          <path d="M 12.5 19 C 12.8 14.5 14 11 16.5 9" />
        </g>
        {/* Stylus / pencil drawing the top guide */}
        <g transform="translate(13.5, 7.5) rotate(-40)">
          <polygon points="0,0 2.6,-1.1 2.6,1.1" fill="#d3d7cf" stroke="#2e3436" strokeWidth="0.65" strokeLinejoin="round" />
          <polygon points="0,0 1.1,-0.45 1.1,0.45" fill="#3465a4" />
          <rect x="2.6" y="-1.1" width="7.2" height="2.2" rx="0.4" fill="#729fcf" stroke="#204a87" strokeWidth="0.75" />
          <rect x="8.3" y="-1.1" width="1.6" height="2.2" rx="0.3" fill="#eeeeec" stroke="#555753" strokeWidth="0.65" />
        </g>
      </g>
    ),
  },
  {
    id: 'sop.guidefill',

    label: 'Guide Fill',

    family: 'sop',

    description: 'Isometric grey skin slab.',
    refKey: 'SOP_guidefill',
    types: ['guidefill'],
    icons: ['sop_guidefill'],
    render: (uid) => (
      <g>
        <defs>
          <linearGradient id={`${uid}-slab`} x1="2" y1="15" x2="22" y2="22" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#d3d7cf" />
            <stop offset="1" stopColor="#888a85" />
          </linearGradient>
        </defs>
        {/* Isometric grey skin slab */}
        <polygon
          points="12,14.5 22,18 12,21.5 2,18"
          fill={`url(#${uid}-slab)`}
          stroke="#555753"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Dense filled blue hair guides */}
        <g fill="none" stroke="#3465a4" strokeWidth="1" strokeLinecap="round">
          <path d="M 5.5 18 C 5.5 13 6.5 8.5 8 4.5" />
          <path d="M 7.8 18.8 C 7.8 13.8 8.8 9 10.5 4.8" />
          <path d="M 10 17.5 C 10 12.5 11.2 8 12.8 4" />
          <path d="M 14.2 18.2 C 14.4 13.2 15.5 8.8 17.2 4.5" />
          <path d="M 16.5 19 C 16.8 14 17.8 9.5 19.5 5.2" />
          <path d="M 18.5 17.8 C 18.8 13.2 19.8 9 21 5.5" />
        </g>
        <g fill="none" stroke="#b6dafc" strokeWidth="0.65" strokeLinecap="round">
          <path d="M 6.6 18.4 C 6.6 13.5 7.6 8.8 9.2 4.6" />
          <path d="M 11.2 19.5 C 11.4 14.2 12.5 9.5 14.2 5" />
          <path d="M 15.4 18.6 C 15.6 13.6 16.6 9 18.4 4.8" />
        </g>
        {/* Primary red source guide curve */}
        <path d="M 12.2 19 C 12.4 13.5 13.5 8.5 15.2 3.5" fill="none" stroke="#a40000" strokeWidth="2.1" strokeLinecap="round" />
        <path d="M 12.2 19 C 12.4 13.5 13.5 8.5 15.2 3.5" fill="none" stroke="#ef2929" strokeWidth="1.25" strokeLinecap="round" />
      </g>
    ),
  },
  {
    id: 'sop.guidefindstrays',

    label: 'Guide Find Strays',

    family: 'sop',

    description: 'Isometric grey skin slab.',
    refKey: 'SOP_guidefindstrays',
    types: ['guidefindstrays'],
    icons: ['sop_guidefindstrays'],
    render: (uid) => (
      <g>
        <defs>
          <linearGradient id={`${uid}-slab`} x1="2" y1="15" x2="22" y2="22" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#d3d7cf" />
            <stop offset="1" stopColor="#888a85" />
          </linearGradient>
        </defs>
        {/* Isometric grey skin slab */}
        <polygon
          points="12,14.5 22,18 12,21.5 2,18"
          fill={`url(#${uid}-slab)`}
          stroke="#555753"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Neat blue hair clump */}
        <g fill="none" stroke="#204a87" strokeWidth="1.6" strokeLinecap="round">
          <path d="M 7.5 18.2 C 7.2 13 7.8 8.5 9 3.8" />
          <path d="M 10 19 C 9.8 13.5 10.2 8.8 11 4" />
          <path d="M 12.2 18.2 C 12 13 12 8.5 12.5 4.2" />
        </g>
        <g fill="none" stroke="#729fcf" strokeWidth="0.95" strokeLinecap="round">
          <path d="M 7.5 18.2 C 7.2 13 7.8 8.5 9 3.8" />
          <path d="M 10 19 C 9.8 13.5 10.2 8.8 11 4" />
          <path d="M 12.2 18.2 C 12 13 12 8.5 12.5 4.2" />
        </g>
        {/* Wild red stray hair strand sticking out to the right */}
        <path
          d="M 14.5 18.5 C 15.5 13 18.5 10.5 21.8 12.5"
          fill="none"
          stroke="#a40000"
          strokeWidth="2.1"
          strokeLinecap="round"
        />
        <path
          d="M 14.5 18.5 C 15.5 13 18.5 10.5 21.8 12.5"
          fill="none"
          stroke="#ef2929"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        <circle cx="14.5" cy="18.5" r="1.2" fill="#ef2929" stroke="#a40000" strokeWidth="0.55" />
      </g>
    ),
  },
  {
    id: 'sop.guidegroom',

    label: 'Guide Groom',

    family: 'sop',

    description: 'Vertical hair strands on left.',
    refKey: 'SOP_guidegroom',
    types: ['guidegroom'],
    icons: ['sop_guidegroom'],
    render: (uid) => (
      <g>
        <defs>
          <linearGradient id={`${uid}-blade`} x1="6" y1="6" x2="21" y2="18" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#eeeeec" />
            <stop offset="1" stopColor="#888a85" />
          </linearGradient>
        </defs>
        {/* Vertical hair strands on left */}
        <g fill="none" stroke="#555753" strokeWidth="1.7" strokeLinecap="round">
          <path d="M 4.5 21.5 C 4 15 4.5 9 5.5 3" />
          <path d="M 7.5 21.5 C 7 15 7.5 9 8.5 3" />
          <path d="M 10.5 21.5 C 10.2 16 10.5 12 11 8.5" />
        </g>
        <g fill="none" stroke="#d3d7cf" strokeWidth="1" strokeLinecap="round">
          <path d="M 4.5 21.5 C 4 15 4.5 9 5.5 3" />
          <path d="M 7.5 21.5 C 7 15 7.5 9 8.5 3" />
          <path d="M 10.5 21.5 C 10.2 16 10.5 12 11 8.5" />
        </g>
        {/* Snipped hair tip floating above */}
        <path d="M 11.5 5.8 L 12.5 2.5" fill="none" stroke="#555753" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M 11.5 5.8 L 12.5 2.5" fill="none" stroke="#d3d7cf" strokeWidth="0.95" strokeLinecap="round" />
        {/* Barber scissors blades */}
        <polygon
          points="7.5,7.2 16.5,11.5 15.2,12.8"
          fill={`url(#${uid}-blade)`}
          stroke="#2e3436"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        <polygon
          points="7.5,13.5 16.5,9.5 15.2,8.2"
          fill={`url(#${uid}-blade)`}
          stroke="#2e3436"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        {/* Scissors pivot screw */}
        <circle cx="13.8" cy="10.5" r="0.9" fill="#2e3436" />
        {/* Scissors finger rings */}
        <circle cx="19.2" cy="13.8" r="2.3" fill="none" stroke="#2e3436" strokeWidth="1.4" />
        <circle cx="19.2" cy="13.8" r="2.3" fill="none" stroke="#babdb6" strokeWidth="0.65" />
        <circle cx="19.2" cy="7.5" r="2.3" fill="none" stroke="#2e3436" strokeWidth="1.4" />
        <circle cx="19.2" cy="7.5" r="2.3" fill="none" stroke="#babdb6" strokeWidth="0.65" />
      </g>
    ),
  },
  {
    id: 'sop.guidegroup',

    label: 'Guide Group',

    family: 'sop',

    description: 'Grey head sphere.',
    refKey: 'SOP_guidegroup',
    types: ['guidegroup'],
    icons: ['sop_guidegroup'],
    render: (uid) => (
      <g>
        <defs>
          <radialGradient id={`${uid}-head`} cx="11" cy="14" r="7" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#eeeeec" />
            <stop offset="0.7" stopColor="#dbdbd7" />
            <stop offset="1" stopColor="#868679" />
          </radialGradient>
        </defs>
        {/* Grey head sphere */}
        <circle cx="12" cy="15" r="6" fill={`url(#${uid}-head)`} stroke="#555753" strokeWidth="0.9" />
        {/* Unselected blue guide group on left */}
        <g fill="none" stroke="#004c8c" strokeWidth="1.8" strokeLinecap="round">
          <path d="M 7.5 12.5 C 5.5 9.5 4.5 6.5 5.5 3.5" />
          <path d="M 9.5 10.5 C 8 7.5 7.5 5 8.5 2.5" />
          <path d="M 11.5 9.8 C 10.8 7 10.8 4.5 11.5 2.2" />
        </g>
        <g fill="none" stroke="#4da6ff" strokeWidth="1.05" strokeLinecap="round">
          <path d="M 7.5 12.5 C 5.5 9.5 4.5 6.5 5.5 3.5" />
          <path d="M 9.5 10.5 C 8 7.5 7.5 5 8.5 2.5" />
          <path d="M 11.5 9.8 C 10.8 7 10.8 4.5 11.5 2.2" />
        </g>
        {/* Selected red and yellow highlighted guide group on right */}
        <g fill="none" stroke="#fce94f" strokeWidth="2.5" strokeLinecap="round">
          <path d="M 13.8 10 C 14.8 7 16 4.5 15.2 2.5" />
          <path d="M 15.8 11.2 C 17.5 8.5 19 6 18.5 3.5" />
          <path d="M 17.2 13 C 19.5 11 21 8.5 21 6" />
        </g>
        <g fill="none" stroke="#c10000" strokeWidth="1.2" strokeLinecap="round">
          <path d="M 13.8 10 C 14.8 7 16 4.5 15.2 2.5" />
          <path d="M 15.8 11.2 C 17.5 8.5 19 6 18.5 3.5" />
          <path d="M 17.2 13 C 19.5 11 21 8.5 21 6" />
        </g>
      </g>
    ),
  },
  {
    id: 'sop.guideinit',

    label: 'Guide Initialize',

    family: 'sop',

    description: 'Curved grey skin patch.',
    refKey: 'SOP_guideinit',
    types: ['guideinit'],
    icons: ['sop_guideinit'],
    render: (uid) => (
      <g>
        <defs>
          <linearGradient id={`${uid}-skin`} x1="2" y1="16" x2="22" y2="22" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#d3d7cf" />
            <stop offset="1" stopColor="#888a85" />
          </linearGradient>
        </defs>
        {/* Curved grey skin patch */}
        <path
          d="M 2.5 18.5 Q 10 15.5 21.5 19 L 19 22 Q 10 19 4 21.5 Z"
          fill={`url(#${uid}-skin)`}
          stroke="#555753"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Initialized brown hair guides */}
        <g fill="none" stroke="#633812" strokeWidth="1.8" strokeLinecap="round">
          <path d="M 5 18.5 C 5.5 14.5 8.5 12 13 11.5" />
          <path d="M 8.5 18 C 9 14 12 11.8 16.5 11.2" />
          <path d="M 12 18 C 12.5 14.2 15.5 12 19.5 11.5" />
          <path d="M 15.5 18.5 C 16 15 18.5 13 21.8 12.5" />
        </g>
        <g fill="none" stroke="#d8b08d" strokeWidth="1.05" strokeLinecap="round">
          <path d="M 5 18.5 C 5.5 14.5 8.5 12 13 11.5" />
          <path d="M 8.5 18 C 9 14 12 11.8 16.5 11.2" />
          <path d="M 12 18 C 12.5 14.2 15.5 12 19.5 11.5" />
          <path d="M 15.5 18.5 C 16 15 18.5 13 21.8 12.5" />
        </g>
        {/* Large wavy directional flow arrow across top */}
        <path
          d="M 3 8.5 C 7 4.5 12 8.5 17 5.5"
          fill="none"
          stroke="#262626"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <path
          d="M 3 8.5 C 7 4.5 12 8.5 17 5.5"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <polygon
          points="20.5,4.2 15.8,3 17.2,8"
          fill="#ffffff"
          stroke="#262626"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.guideinterpolationmesh',

    label: 'Guide Interpolation Mesh',

    family: 'sop',

    description: 'Dark curved skin patch with bright green wireframe grid.',
    refKey: 'SOP_guideinterpolationmesh',
    types: ['guideinterpolationmesh'],
    icons: ['sop_guideinterpolationmesh'],
    render: () => (
      <g>
        {/* Dark curved skin patch with bright green wireframe grid */}
        <path
          d="M 2 18 Q 12 13.5 22 18 L 19 22 Q 12 18 5 22 Z"
          fill="#2e3436"
          stroke="#8ae234"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <g fill="none" stroke="#8ae234" strokeWidth="0.65">
          <path d="M 3.5 20 Q 12 15.8 20.5 20" />
          <path d="M 7.5 16.2 L 9 20.4" />
          <path d="M 12 15.5 L 12 19.8" />
          <path d="M 16.5 16.2 L 15 20.4" />
        </g>
        {/* Primary blue guide curves */}
        <g fill="none" stroke="#204a87" strokeWidth="1.9" strokeLinecap="round">
          <path d="M 5.5 17.5 C 5 12.5 6.5 8 9 3.5" />
          <path d="M 18.5 17.5 C 19 12.5 17.5 8 15 3.5" />
        </g>
        <g fill="none" stroke="#729fcf" strokeWidth="1.15" strokeLinecap="round">
          <path d="M 5.5 17.5 C 5 12.5 6.5 8 9 3.5" />
          <path d="M 18.5 17.5 C 19 12.5 17.5 8 15 3.5" />
        </g>
        {/* Interpolated tan/brown hair guides in between */}
        <g fill="none" stroke="#8f5902" strokeWidth="1.5" strokeLinecap="round">
          <path d="M 9.5 16.5 C 9.2 12 10 7.8 11 4" />
          <path d="M 12 16.2 C 12 11.8 12 7.5 12 3.8" />
          <path d="M 14.5 16.5 C 14.8 12 14 7.8 13 4" />
        </g>
        <g fill="none" stroke="#d8b08d" strokeWidth="0.9" strokeLinecap="round">
          <path d="M 9.5 16.5 C 9.2 12 10 7.8 11 4" />
          <path d="M 12 16.2 C 12 11.8 12 7.5 12 3.8" />
          <path d="M 14.5 16.5 C 14.8 12 14 7.8 13 4" />
        </g>
      </g>
    ),
  },
];
