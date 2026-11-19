import React from 'react';
import { arrowHead, isoBoxFaces, type Pt, pts } from '../../geoHelpers';
import { CasedStroke, StraightArrow } from '../../geoKits';
import type { OperatorIconDef } from '../../iconTypes';

const OUTLINE = '#262626';

/** Shared curved NURBS patch outline (3/4 isometric). */
const NURBS_PATCH_PATH = 'M3,12.5 Q7.5,8.2 12.5,7 Q17,8 21,11.5 Q16.5,13.5 11.5,17.5 Q7.2,13.8 3,12.5 Z';

/** Trimmed NURBS patch with a concave circular cutout on the lower-right edge. */
const NURBS_PATCH_TRIMMED_PATH =
  'M3,12.5 Q7.5,8.2 12.5,7 Q17,8 21,11.5 L18.4,13.1 A3.1,2.4 0 0,0 13.3,16.1 L11.5,17.5 Q7.2,13.8 3,12.5 Z';

/**
 * Shared light-grey curved NURBS surface patch with upper-left lighting.
 */
const NurbsPatch: React.FC<{
  id: string;
  trimmed?: boolean;
  dx?: number;
  dy?: number;
}> = ({ id, trimmed = false, dx = 0, dy = 0 }) => (
  <>
    <defs>
      <linearGradient id={id} x1="15%" y1="15%" x2="85%" y2="85%">
        <stop offset="0%" stopColor="#eef2f7" />
        <stop offset="55%" stopColor="#c0c7d1" />
        <stop offset="100%" stopColor="#89929e" />
      </linearGradient>
    </defs>
    <path
      d={trimmed ? NURBS_PATCH_TRIMMED_PATH : NURBS_PATCH_PATH}
      transform={dx !== 0 || dy !== 0 ? `translate(${dx} ${dy})` : undefined}
      fill={`url(#${id})`}
      stroke={OUTLINE}
      strokeWidth="1.15"
      strokeLinejoin="round"
    />
  </>
);

/**
 * Shared rounded 2:1 isometric tan clay cushion block used by Clay and Curve Clay.
 */
const ClayPillow: React.FC = () => (
  <g stroke={OUTLINE} strokeWidth="1.1" strokeLinejoin="round">
    <path d="M4.2,12.4 L4.2,16.3 Q4.2,17.1 5.0,17.5 L11.1,20.6 Q12,21.0 12,20.1 L12,16.2 Z" fill="#c89a5a" />
    <path d="M12,16.2 L12,20.1 Q12,21.0 12.9,20.6 L19.0,17.5 Q19.8,17.1 19.8,16.3 L19.8,12.4 Z" fill="#a8783c" />
    <path
      d="M12,8.4 Q12.8,8.4 13.5,8.8 L19.1,11.6 Q20.1,12.1 19.1,12.7 L13.1,15.8 Q12,16.3 10.9,15.8 L4.9,12.7 Q3.9,12.1 4.9,11.6 L10.5,8.8 Q11.2,8.4 12,8.4 Z"
      fill="#e8c48a"
    />
  </g>
);

/**
 * NURBS surface operators.
 */
export const NURBS_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.align',
    label: 'Spline Align',
    family: 'sop',
    description:
      'Two three-tone grey isometric cubes (smaller front-left, larger back-right) aligned along a cased red baseline at the bottom-right.',
    types: ['align'],
    icons: ['sop_align'],
    refKey: 'SOP_align',
    render: () => {
      const back = isoBoxFaces(14.5, 2.8, 4.7, 5.2);
      const front = isoBoxFaces(7.6, 8.8, 3.6, 4.1);
      return (
        <>
          <g stroke={OUTLINE} strokeWidth="1.05" strokeLinejoin="round">
            <polygon points={pts(back.left)} fill="#c0c7d1" />
            <polygon points={pts(back.right)} fill="#89929e" />
            <polygon points={pts(back.top)} fill="#eef2f7" />
            <polygon points={pts(front.left)} fill="#c0c7d1" />
            <polygon points={pts(front.right)} fill="#89929e" />
            <polygon points={pts(front.top)} fill="#eef2f7" />
          </g>
          <CasedStroke d="M7.6,18.7 L20.0,12.5" color="#e03228" width={1.45} casing={2.3} />
        </>
      );
    },
  },
  {
    id: 'sop.cap',
    label: 'Spline Cap',
    family: 'sop',
    description: 'Upright grey shaded cylinder closed at the top by a blue circular cap with a dark outline.',
    types: ['cap'],
    icons: ['sop_cap'],
    refKey: 'SOP_cap',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-cyl`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#c0c7d1" />
            <stop offset="30%" stopColor="#eef2f7" />
            <stop offset="70%" stopColor="#c0c7d1" />
            <stop offset="100%" stopColor="#89929e" />
          </linearGradient>
        </defs>
        <path
          d="M5.8,6.3 V17.4 A6.2,2.6 0 0,0 18.2,17.4 V6.3 Z"
          fill={`url(#${uid}-cyl)`}
          stroke={OUTLINE}
          strokeWidth="1.15"
          strokeLinejoin="round"
        />
        <ellipse cx="12" cy="6.3" rx="6.2" ry="2.6" fill="#3672c4" stroke={OUTLINE} strokeWidth="1.15" />
        <path
          d="M7.2,5.8 A4.8,1.7 0 0,1 14.8,4.9"
          fill="none"
          stroke="#5aa2f2"
          strokeWidth="0.9"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    id: 'sop.clay',
    label: 'Spline Clay',
    family: 'sop',
    description:
      'Rounded tan isometric clay pillow block with a red upward arrow emerging from the center of its top face.',
    types: ['clay'],
    icons: ['sop_clay'],
    refKey: 'SOP_clay',
    render: () => (
      <>
        <ClayPillow />
        <circle cx="12" cy="12.2" r="1.1" fill="#e03228" stroke={OUTLINE} strokeWidth="0.8" />
        <StraightArrow from={[12, 12.0]} tip={[12, 3.0]} color="#e03228" width={1.6} head={3.2} />
      </>
    ),
  },
  {
    id: 'sop.curveclay',
    label: 'Spline Curve Clay',
    family: 'sop',
    description:
      'Rounded tan isometric clay pillow block with a single red spline curve low at both ends and arched high in the middle, pulled up by a red arrow.',
    types: ['curveclay'],
    icons: ['sop_curveclay'],
    refKey: 'SOP_curveclay',
    render: () => (
      <>
        <ClayPillow />
        <CasedStroke
          d="M6.2,13.3 C8.8,13.3 10.1,9.7 12.0,9.7 C13.9,9.7 15.2,12.3 17.8,12.3"
          color="#e03228"
          width={1.2}
          casing={1.9}
        />
        <StraightArrow from={[12, 9.7]} tip={[12, 2.7]} color="#e03228" width={1.6} head={3.2} />
      </>
    ),
  },
  {
    id: 'sop.profile',
    label: 'Spline Profile',
    family: 'sop',
    description: 'Curved light-grey NURBS surface patch with a red dashed oval profile curve resting on top.',
    types: ['profile'],
    icons: ['sop_profile'],
    refKey: 'SOP_profile',
    render: (uid) => (
      <>
        <NurbsPatch id={`${uid}-patch`} />
        <ellipse
          cx="12"
          cy="11.7"
          rx="4.4"
          ry="2.5"
          transform="rotate(-10 12 11.7)"
          fill="none"
          stroke="#e03228"
          strokeWidth="1.25"
          strokeDasharray="2.2 1.3"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    id: 'sop.project',
    label: 'Spline Project',
    family: 'sop',
    description:
      'Curved light-grey NURBS surface patch with a translucent open-top cylinder hovering above it, projecting a red dashed oval onto the surface.',
    types: ['project'],
    icons: ['sop_project'],
    refKey: 'SOP_project',
    render: (uid) => (
      <>
        <NurbsPatch id={`${uid}-patch`} dy={2.4} />
        <ellipse
          cx="12"
          cy="14.1"
          rx="4.8"
          ry="2.3"
          transform="rotate(-8 12 14.1)"
          fill="none"
          stroke="#e03228"
          strokeWidth="1.15"
          strokeDasharray="2.0 1.3"
          strokeLinecap="round"
        />
        <path
          d="M7.1,5.2 V11.4 A4.9,2.1 0 0,0 16.9,11.4 V5.2 A4.9,2.1 0 0,1 7.1,5.2"
          fill="#eef2f7"
          fillOpacity="0.45"
          stroke="none"
        />
        <path
          d="M7.1,5.2 V11.4 A4.9,2.1 0 0,0 16.9,11.4 V5.2"
          fill="none"
          stroke={OUTLINE}
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        <ellipse
          cx="12"
          cy="5.2"
          rx="4.9"
          ry="2.1"
          fill="#eef2f7"
          fillOpacity="0.35"
          stroke={OUTLINE}
          strokeWidth="1.0"
        />
      </>
    ),
  },
  {
    id: 'sop.surfsect',
    label: 'Spline Surfsect',
    family: 'sop',
    description: 'Curved grey NURBS surface patch intersecting an upright grey cylinder at the upper-left.',
    types: ['surfsect'],
    icons: ['sop_surfsect'],
    refKey: 'SOP_surfsect',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-cyl`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#c0c7d1" />
            <stop offset="32%" stopColor="#eef2f7" />
            <stop offset="100%" stopColor="#89929e" />
          </linearGradient>
        </defs>
        <NurbsPatch id={`${uid}-patch`} dx={1.0} dy={2.4} />
        <path
          d="M5.4,5.2 V13.4 Q9.6,15.0 13.8,13.0 V5.2 Z"
          fill={`url(#${uid}-cyl)`}
          stroke={OUTLINE}
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        <ellipse cx="9.6" cy="5.2" rx="4.2" ry="1.8" fill="#eef2f7" stroke={OUTLINE} strokeWidth="1.1" />
      </>
    ),
  },
  {
    id: 'sop.trim',
    label: 'Spline Trim',
    family: 'sop',
    description: 'Curved light-grey NURBS surface patch with a semicircular notch trimmed out of its lower-right edge.',
    types: ['trim'],
    icons: ['sop_trim'],
    refKey: 'SOP_trim',
    render: (uid) => <NurbsPatch id={`${uid}-patch`} trimmed />,
  },
  {
    id: 'sop.revolve',
    label: 'Revolve',
    family: 'sop',
    description:
      'Grey lathe-turned vase with a right-side cutaway showing its red profile curve, and a curved red-orange revolution arrow around its base.',
    types: ['revolve'],
    icons: ['sop_revolve'],
    refKey: 'SOP_revolve',
    render: (uid) => {
      const tip: Pt = [4.6, 17.9];
      const from: Pt = [7.6, 19.3];
      const tri = arrowHead(tip, from, 3.0, 1.9);
      return (
        <>
          <defs>
            <linearGradient id={`${uid}-vase`} x1="0%" y1="20%" x2="100%" y2="80%">
              <stop offset="0%" stopColor="#eef2f7" />
              <stop offset="55%" stopColor="#c0c7d1" />
              <stop offset="100%" stopColor="#89929e" />
            </linearGradient>
          </defs>
          <path
            d="M7.8,3.6 L15.2,3.6 C15.2,4.8 14.0,5.8 14.2,7.4 C14.5,9.3 17.0,10.8 17.0,13.6 C17.0,15.8 15.6,17.2 14.4,17.8 L8.4,17.8 C7.3,17.0 6.4,15.4 6.4,13.4 C6.4,10.8 8.8,9.3 9.0,7.4 C9.2,5.8 7.8,4.8 7.8,3.6 Z"
            fill="#5a616b"
            stroke={OUTLINE}
            strokeWidth="1.1"
            strokeLinejoin="round"
          />
          <path
            d="M7.8,3.6 L12.0,3.6 C12.0,5.0 11.4,6.0 11.6,7.6 C11.8,9.6 13.6,11.0 13.6,13.6 C13.6,15.8 12.6,17.0 11.8,17.8 L8.4,17.8 C7.3,17.0 6.4,15.4 6.4,13.4 C6.4,10.8 8.8,9.3 9.0,7.4 C9.2,5.8 7.8,4.8 7.8,3.6 Z"
            fill={`url(#${uid}-vase)`}
            stroke={OUTLINE}
            strokeWidth="1.1"
            strokeLinejoin="round"
          />
          <path
            d="M15.2,3.6 C15.2,4.8 14.0,5.8 14.2,7.4 C14.5,9.3 17.0,10.8 17.0,13.6 C17.0,15.8 15.6,17.2 14.4,17.8"
            fill="none"
            stroke="#e03228"
            strokeWidth="1.25"
            strokeLinecap="round"
          />
          <CasedStroke d="M18.6,17.6 C17.0,20.2 10.6,20.8 6.4,18.7" color="#ee8624" width={1.5} />
          <polygon points={pts(tri)} fill="#e03228" stroke={OUTLINE} strokeWidth="0.9" strokeLinejoin="round" />
        </>
      );
    },
  },
  {
    id: 'sop.rails',
    label: 'Rails',
    family: 'sop',
    description: 'Curved grey arched surface ribbon with cased red outer rail edges.',
    types: ['rails'],
    icons: ['sop_rails'],
    refKey: 'SOP_rails',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-rail`} x1="15%" y1="15%" x2="85%" y2="85%">
            <stop offset="0%" stopColor="#eef2f7" />
            <stop offset="55%" stopColor="#c0c7d1" />
            <stop offset="100%" stopColor="#89929e" />
          </linearGradient>
        </defs>
        <path
          d="M3.6,14.8 C4.2,7.2 9.4,4.2 14.2,4.6 C17.8,4.9 19.6,8.8 20.4,13.8 C18.2,16.5 14.8,17.6 12.8,15.6 C11.4,14.2 11.4,11.6 9.8,11.4 C7.8,11.2 6.8,14.2 7.2,17.2 C5.2,17.2 3.8,16.2 3.6,14.8 Z"
          fill={`url(#${uid}-rail)`}
          stroke="none"
        />
        <CasedStroke
          d="M3.6,14.8 C4.2,7.2 9.4,4.2 14.2,4.6 C17.8,4.9 19.6,8.8 20.4,13.8 C18.2,16.5 14.8,17.6 12.8,15.6 C11.4,14.2 11.4,11.6 9.8,11.4 C7.8,11.2 6.8,14.2 7.2,17.2 C5.2,17.2 3.8,16.2 3.6,14.8 Z"
          color="#e03228"
          width={1.05}
          casing={1.85}
        />
      </>
    ),
  },
  {
    id: 'sop.skin',
    label: 'Skin',
    family: 'sop',
    description:
      'Curved light-grey NURBS surface patch spanned between two diagonal red rails and three intersecting red cross-section curves that extend past the edges.',
    types: ['skin'],
    icons: ['sop_skin'],
    refKey: 'SOP_skin',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-skin`} x1="15%" y1="15%" x2="85%" y2="85%">
            <stop offset="0%" stopColor="#eef2f7" />
            <stop offset="55%" stopColor="#c0c7d1" />
            <stop offset="100%" stopColor="#89929e" />
          </linearGradient>
        </defs>
        <path
          d="M4.2,10.0 Q8.2,7.2 12.0,4.8 Q15.8,8.4 19.6,12.0 Q15.6,14.8 11.6,17.8 Q7.8,14.0 4.2,10.0 Z"
          fill={`url(#${uid}-skin)`}
          stroke={OUTLINE}
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        <CasedStroke
          d="M2.2,11.4 Q7.4,8.0 13.0,4.2 M9.8,19.0 Q15.4,15.2 21.0,11.0 M2.6,8.4 Q8.0,13.6 13.2,19.6 M7.4,5.4 Q12.8,10.4 18.0,16.0 M11.4,3.4 Q16.8,8.2 21.8,13.4"
          color="#e03228"
          width={0.95}
          casing={1.65}
        />
      </>
    ),
  },
  {
    id: 'sop.tribez',
    label: 'TriBezier',
    family: 'sop',
    description:
      'Light-grey radial-lit curved triangular Bezier sail with crisp dark strokes forming three inner curved wedges evenly inset inside the sail and meeting at a shared crossing hub.',
    types: ['tribez'],
    icons: ['sop_tribez'],
    refKey: 'SOP_tribez',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-tri`} cx="45%" cy="48%" r="58%">
            <stop offset="0%" stopColor="#eef2f7" />
            <stop offset="35%" stopColor="#c0c7d1" />
            <stop offset="78%" stopColor="#c0c7d1" />
            <stop offset="100%" stopColor="#89929e" />
          </radialGradient>
        </defs>
        <path
          d="M19.8,2.6 Q7.2,4.4 2.4,15.0 Q9.0,20.2 17.0,21.2 Q14.8,11.6 19.8,2.6 Z"
          fill={`url(#${uid}-tri)`}
          stroke={OUTLINE}
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <g fill="none" stroke={OUTLINE} strokeWidth="0.9" strokeLinejoin="round">
          <path d="M9.4,14.2 Q8.8,11.0 9.2,7.8 Q12.6,9.2 15.8,9.8 Q12.6,12.0 9.4,14.2 Z" />
          <path d="M9.4,14.2 Q7.2,12.8 5.3,11.3 Q5.4,14.3 6.6,16.9 Q8.0,15.6 9.4,14.2 Z" />
          <path d="M9.4,14.2 Q9.9,16.4 10.7,18.6 Q13.1,17.2 15.1,15.3 Q12.2,14.8 9.4,14.2 Z" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.crosssectionsurface',
    label: 'Cross Section Surface',
    family: 'sop',
    description:
      'Open S-curved green ribbon wall with a red closed profile curve around the top rim and a red vertical seam.',
    types: ['crosssectionsurface'],
    icons: ['sop_crosssectionsurface'],
    refKey: 'SOP_crosssectionsurface',
    render: () => (
      <>
        <path
          d="M4.2,9.2 C4.2,6 10.5,6.5 13.5,4.2 C16,2.5 19.8,2.8 19.8,5.2 V14.2 C19.8,11.8 16,11.5 13.5,13.2 C10.5,15.5 4.2,15 4.2,18.2 Z"
          fill="#68b84c"
          stroke="#262626"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        <path
          d="M4.2,9.2 C4.2,11.8 9.2,11.8 12.8,9.2 C16.2,6.8 19.8,7.2 19.8,5.2 V14.2 C19.8,16.2 16.2,15.8 12.8,18.2 C9.2,20.8 4.2,20.8 4.2,18.2 Z"
          fill="#b8f090"
          stroke="#262626"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        <path
          d="M4.2,9.2 C4.2,6 10.5,6.5 13.5,4.2 C16,2.5 19.8,2.8 19.8,5.2 C19.8,7.2 16.2,6.8 12.8,9.2 C9.2,11.8 4.2,11.8 4.2,9.2 Z"
          fill="none"
          stroke="#e03228"
          strokeWidth="1.4"
        />
        <line x1="7.8" y1="11.2" x2="7.8" y2="20.2" stroke="#e03228" strokeWidth="1.3" />
      </>
    ),
  },
  {
    id: 'sop.curvesect',
    label: 'Curve Intersect',
    family: 'sop',
    description: 'Dark diagonal curve crossing a grey U-loop curve with two red intersection dots.',
    types: ['curvesect'],
    icons: ['sop_curvesect'],
    refKey: 'SOP_curvesect',
    render: () => (
      <>
        <path
          d="M19.5,6.5 C6,9.5 4.5,19 14.5,15 C17.5,13.8 19.5,11.5 20.5,9.5"
          fill="none"
          stroke="#262626"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M19.5,6.5 C6,9.5 4.5,19 14.5,15 C17.5,13.8 19.5,11.5 20.5,9.5"
          fill="none"
          stroke="#89929e"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M4.5,4.5 C10.5,7.5 15,13 18.5,19.5"
          fill="none"
          stroke="#262626"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <circle cx="11.2" cy="9.2" r="1.8" fill="#e03228" stroke="#262626" strokeWidth="0.9" />
        <circle cx="15.8" cy="14.5" r="1.8" fill="#e03228" stroke="#262626" strokeWidth="0.9" />
      </>
    ),
  },
  {
    id: 'sop.sblend',
    label: 'Sequence Blend',
    family: 'sop',
    description:
      'Three grey 3D forms morphing diagonally from a faceted cube into a smooth sphere alongside a bold red diagonal arrow.',
    types: ['sblend'],
    icons: ['sop_sblend', 'sop_sblend-2.0'],
    refKey: 'SOP_sblend',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-sb-sph`} cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#c0c7d1" />
            <stop offset="100%" stopColor="#5a616b" />
          </radialGradient>
        </defs>
        {/* Top-left isometric crisp white cube */}
        <g stroke="#262626" strokeWidth="0.85" strokeLinejoin="round">
          <polygon points="8.4,2.2 12,4.2 8.4,6.2 4.8,4.2" fill="#ffffff" />
          <polygon points="4.8,4.2 8.4,6.2 8.4,10.2 4.8,8.2" fill="#eef2f7" />
          <polygon points="8.4,6.2 12,4.2 12,8.2 8.4,10.2" fill="#c0c7d1" />
        </g>
        {/* Middle beveled morph form */}
        <polygon
          points="10.2,6.8 14.6,6.8 16.2,9.8 14.6,12.8 10.2,12.8 8.6,9.8"
          fill="#c0c7d1"
          stroke="#262626"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <polygon points="10.4,7.8 14.2,8 14.6,11.6 10.4,11.6" fill="#eef2f7" fillOpacity="0.7" />
        {/* Bottom-right smooth shaded sphere */}
        <circle cx="16.8" cy="14.4" r="4" fill={`url(#${uid}-sb-sph)`} stroke="#262626" strokeWidth="0.95" />
        {/* Sleek bold crimson diagonal arrow bottom-left */}
        <polygon
          points="3.6,10.4 7.6,15.4 9,14.2 9.6,20.4 3.6,18.8 5,17.6 1.6,12.4"
          fill="#e03228"
          stroke="#262626"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
      </>
    ),
  },
];
