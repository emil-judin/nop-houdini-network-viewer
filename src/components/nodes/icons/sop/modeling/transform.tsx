import { arrowHead, isoBoxFaces, pts } from '../../geoHelpers';
import { CasedStroke, ShadedSphere, SPHERE_TONES, StraightArrow } from '../../geoKits';
import type { OperatorIconDef } from '../../iconTypes';

const OUTLINE = '#262626';

const GREY_TOP = '#eef2f7';

const GREY_LEFT = '#c0c7d1';

const GREY_RIGHT = '#89929e';

const PAPER = '#f2f4f7';

const RED = '#e03228';

const BLUE = '#3672c4';

const GREEN = '#58c848';

const XFORM_BOX = isoBoxFaces(12, 7.8, 5.1, 5.3);

/**
 * Transform operators: moving, matching, mirroring and orienting geometry.
 */
export const TRANSFORM_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.xform',
    label: 'Transform',
    family: 'sop',
    description:
      'Three-tone grey cube standing on four chunky blue arrows that lie flat on the ground and point out along the isometric diagonals.',
    types: ['xform'],
    refKey: 'SOP_xform',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-arrow`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2f60b0" />
            <stop offset="100%" stopColor="#7aa8e8" />
          </linearGradient>
        </defs>
        {[45, 135, 225, 315].map((angle) => (
          <polygon
            key={angle}
            points="1,-1.6 6.6,-1.6 6.6,-3.4 10.8,0 6.6,3.4 6.6,1.6 1,1.6"
            transform={`translate(12 15) scale(1 0.5) rotate(${angle})`}
            fill={`url(#${uid}-arrow)`}
            stroke="#1a3a70"
            strokeWidth="1"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        <polygon
          points="12,3 17.5,5.75 12,8.5 6.5,5.75"
          fill="#eef2f7"
          stroke="#262626"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        <polygon
          points="6.5,5.75 12,8.5 12,15 6.5,12.25"
          fill="#c0c7d1"
          stroke="#262626"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        <polygon
          points="17.5,5.75 12,8.5 12,15 17.5,12.25"
          fill="#89929e"
          stroke="#262626"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.matchaxis',
    label: 'Match Axis',
    family: 'sop',
    description:
      'Black axis arrow and red arrow pivoting around a white center point, joined by a dashed grey rotation arc.',
    types: ['matchaxis'],
    refKey: 'SOP_matchaxis',
    render: () => (
      <>
        <path
          d="M16.8 8.7A6.5 6.5 0 1 1 7.5 17.4"
          fill="none"
          stroke="#4a4a4a"
          strokeWidth="1.6"
          strokeDasharray="2 1.4"
        />
        <line x1="13" y1="14" x2="18.4" y2="6.6" stroke="#1e1e1e" strokeWidth="2.2" />
        <polygon points="20.6,3.6 16.4,5.6 20,8.2" fill="#1e1e1e" strokeLinejoin="round" />
        <line x1="13" y1="14" x2="6.3" y2="18.1" stroke="#e03228" strokeWidth="2.2" />
        <polygon
          points="3.6,19.8 5.3,16.4 7.4,19.8"
          fill="#e03228"
          stroke="#262626"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        <circle cx="13" cy="14" r="1.9" fill="#ffffff" stroke="#1e1e1e" strokeWidth="1.4" />
      </>
    ),
  },
  {
    id: 'sop.matchsize',
    label: 'Match Size',
    family: 'sop',
    description: 'Grey rectangle and triangle fitted inside a green bounding box.',
    types: ['matchsize'],
    refKey: 'SOP_matchsize',
    render: () => (
      <>
        <rect x="4" y="6" width="16" height="12" fill="#8892a0" fillOpacity="0.25" stroke="#62d648" strokeWidth="1.5" />
        <rect x="6" y="8" width="5" height="8" fill="#d0d6e0" stroke="#222" strokeWidth="1" />
        <polygon points="15.5,8 18.5,16 12.5,16" fill="#b8c0cc" stroke="#222" strokeWidth="1" />
      </>
    ),
  },
  {
    id: 'sop.mirror',
    label: 'Mirror / Symmetrize',
    family: 'sop',
    description: 'Orange panel and light grey panel facing each other across a dashed white mirror axis.',
    types: ['mirror', 'symmetrize'],
    refKey: 'SOP_mirror',
    render: () => (
      <>
        <polygon points="4,5 10.5,4 10.5,20 4,19" fill="#ee8624" stroke="#262626" strokeWidth="1.1" />
        <polygon points="20,5 13.5,4 13.5,20 20,19" fill="#d0d6e0" stroke="#262626" strokeWidth="1.1" />
        <line x1="12" y1="2.5" x2="12" y2="21.5" stroke="#ffffff" strokeWidth="1.4" strokeDasharray="2 1.5" />
      </>
    ),
  },
  {
    id: 'sop.xformaxis',
    label: 'Transform Axis',
    family: 'sop',
    description:
      'Three-tone isometric grey cube with a top red arrow, two longer tilted red arrows rising from behind the cube, and two curved red rotation arrows starting from the bottom of the cube.',
    types: ['xformaxis'],
    icons: ['sop_xformaxis'],
    refKey: 'SOP_xformaxis',
    render: () => (
      <>
        <StraightArrow from={[9.5, 11.2]} tip={[3.8, 5.5]} color={RED} width={1.6} head={3.0} />
        <StraightArrow from={[14.5, 11.2]} tip={[20.2, 5.5]} color={RED} width={1.6} head={3.0} />
        <CasedStroke d="M11.6,18.0 Q6.0,19.4 3.6,15.0" color={RED} width={1.65} casing={2.3} />
        <polygon
          points={pts(arrowHead([3.2, 13.6], [4.2, 16.4], 2.9, 1.55))}
          fill={RED}
          stroke={OUTLINE}
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        <CasedStroke d="M12.4,18.0 Q18.0,19.4 20.4,15.0" color={RED} width={1.65} casing={2.3} />
        <polygon
          points={pts(arrowHead([20.8, 13.6], [19.8, 16.4], 2.9, 1.55))}
          fill={RED}
          stroke={OUTLINE}
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        <polygon
          points={pts(XFORM_BOX.top)}
          fill={GREY_TOP}
          stroke={OUTLINE}
          strokeWidth="1.0"
          strokeLinejoin="round"
        />
        <polygon
          points={pts(XFORM_BOX.left)}
          fill={GREY_LEFT}
          stroke={OUTLINE}
          strokeWidth="1.0"
          strokeLinejoin="round"
        />
        <polygon
          points={pts(XFORM_BOX.right)}
          fill={GREY_RIGHT}
          stroke={OUTLINE}
          strokeWidth="1.0"
          strokeLinejoin="round"
        />
        <StraightArrow from={[12, 8.2]} tip={[12, 2.2]} color={RED} width={1.7} head={3.2} />
      </>
    ),
  },
  {
    id: 'sop.xformbyattrib',
    label: 'Transform by Attribute',
    family: 'sop',
    description:
      'Shaded grey sphere centered over a blue vertical line and red horizontal line inside continuous green and red gimbal rings with a white attribute speech-bubble tag at top-right.',
    types: ['xformbyattrib'],
    icons: ['sop_xformbyattrib'],
    refKey: 'SOP_xformbyattrib',
    render: (uid) => (
      <>
        <circle cx="10.0" cy="13.2" r="7.4" fill="none" stroke={OUTLINE} strokeWidth="1.55" />
        <circle cx="10.0" cy="13.2" r="7.4" fill="none" stroke={GREEN} strokeWidth="0.9" />
        <ellipse cx="10.0" cy="13.2" rx="2.9" ry="7.4" fill="none" stroke={OUTLINE} strokeWidth="1.55" />
        <ellipse cx="10.0" cy="13.2" rx="2.9" ry="7.4" fill="none" stroke={RED} strokeWidth="0.9" />
        <CasedStroke d="M10.0,4.6 L10.0,21.6" color={BLUE} width={1.0} casing={1.65} />
        <CasedStroke d="M2.2,13.2 L17.8,13.2" color={RED} width={1.0} casing={1.65} />
        <ShadedSphere id={`${uid}-ball`} cx={10.0} cy={13.2} r={2.5} tones={SPHERE_TONES.grey} strokeWidth={0.9} />
        <path
          d="M11.6,2.6 H21.6 V9.6 H15.4 L11.4,12.2 L13.4,9.6 H11.6 Z"
          fill={PAPER}
          stroke={OUTLINE}
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.extracttransform',
    label: 'Extract Transform',
    family: 'sop',
    description: 'Two blue globes with green continents on stands linked by a curved red arrow at the top.',
    types: ['extracttransform'],
    icons: ['sop_extracttransform'],
    refKey: 'SOP_extracttransform',
    render: () => (
      <>
        <path
          d="M3.7,8.0 C4.7,3.8 9.1,3.4 11.1,5.4"
          fill="none"
          stroke="#262626"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M3.7,8.0 C4.7,3.8 9.1,3.4 11.1,5.4"
          fill="none"
          stroke="#e03228"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <polygon
          points="12.7,7.0 9.1,6.4 11.7,3.7"
          fill="#e03228"
          stroke="#262626"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        <g stroke="#262626" strokeWidth="1" strokeLinejoin="round">
          <circle cx="7" cy="14.5" r="4" fill="#5aa2f2" />
          <path
            d="M5.2,13.4 C6.0,12.4 7.6,12.6 8.2,13.7 C8.6,14.5 7.9,15.8 6.8,16.2 C5.8,15.9 5.0,14.6 5.2,13.4 Z"
            fill="#58c848"
            stroke="none"
          />
          <path d="M7,18.5 V20.8 M4.8,20.8 H9.2" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="17" cy="10.5" r="3.8" fill="#5aa2f2" />
          <path
            d="M15.4,9.5 C16.2,8.5 17.6,8.7 18.2,9.7 C18.5,10.5 17.8,11.7 16.8,12.0 C15.9,11.7 15.2,10.6 15.4,9.5 Z"
            fill="#58c848"
            stroke="none"
          />
          <path d="M17,14.3 L18.2,16.5 M16.2,17.2 L19.8,15.5" strokeWidth="1.2" strokeLinecap="round" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.primitive',
    label: 'Primitive Properties',
    family: 'sop',
    description: 'Single flat 2:1 isometric orange diamond polygon with a subtle upper-left highlight.',
    types: ['primitive'],
    icons: ['sop_primitive'],
    refKey: 'SOP_primitive',
    render: () => (
      <>
        <polygon
          points="12,5.8 21.8,11.8 12,17.8 2.2,11.8"
          fill="#ee8624"
          stroke={OUTLINE}
          strokeWidth="1.25"
          strokeLinejoin="round"
        />
        <polyline
          points="4.2,11.8 12,7.0 19.8,11.8"
          fill="none"
          stroke="#ffb066"
          strokeWidth="0.85"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.softxform',
    label: 'Soft Transform',
    family: 'sop',
    description:
      'Grey grid plane pulled up into a peak, with five red arrows radiating out from a red point at the tip.',
    types: ['softxform'],
    refKey: 'SOP_softxform',
    render: () => (
      <>
        <g stroke="#262626" strokeWidth="1.1" strokeLinejoin="round">
          <polygon points="2,16.5 12,12 22,16.5 12,10" fill="#eef2f7" />
          <polygon points="2,16.5 12,10 12,21" fill="#dfe4ea" />
          <polygon points="22,16.5 12,10 12,21" fill="#9aa2ae" />
        </g>
        <path d="M7 18.75L12 10M17 18.75L12 10M4.5 15L12 18.7L19.5 15" fill="none" stroke="#5a616b" strokeWidth="0.6" />
        <g stroke="#e03228" strokeWidth="1.5">
          <path d="M12 10V4.6M12 10L7.5 6.2M12 10L16.5 6.2M12 10H5.6M12 10H18.4" />
        </g>
        <g fill="#e03228" stroke="#262626" strokeWidth="0.6" strokeLinejoin="round">
          <polygon points="12,2.2 10.6,4.8 13.4,4.8" />
          <polygon points="5.5,4.5 8.4,5.1 6.6,7.3" />
          <polygon points="18.5,4.5 15.6,5.1 17.4,7.3" />
          <polygon points="3,10 5.6,8.6 5.6,11.4" />
          <polygon points="21,10 18.4,8.6 18.4,11.4" />
        </g>
        <circle cx="12" cy="10" r="1.6" fill="#e03228" stroke="#262626" strokeWidth="0.8" />
      </>
    ),
  },
];
