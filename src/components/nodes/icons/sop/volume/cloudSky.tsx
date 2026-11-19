import React from 'react';
import { isoBoxFaces, type Pt, pts, roundedRectPath } from '../../geoHelpers';
import type { OperatorIconDef } from '../../iconTypes';

/**
 * Clouds and sky (`cloud-sky`).
 * Two sub-families: a lit cumulus storm cloud (`StormCloud`) for the 7 Cloud operators, and blue
 * sky panels with white cumulus puffs (`SkyCloudPuff`) for the 3 Sky operators.
 */

const OUTLINE = '#262626';

const WHITE = '#ffffff';

const GREY_TOP = '#eef2f7';

const GREY_LEFT = '#c0c7d1';

const GREY_RIGHT = '#89929e';

const DARK_GREY = '#3a3f47';

const BLUE = '#3672c4';

const LIGHT_BLUE = '#5aa2f2';

const SKY_LIGHT = '#8fc2ff';

const RED = '#e03228';

const YELLOW_LIGHT = '#ffe47a';

const YELLOW = '#f2c438';

const WOOD_LIGHT = '#c89a5a';

const WOOD_DARK = '#a8783c';

/** Canonical cumulus cloud silhouette centered around (0, 0), ~18 units wide by ~11 units tall. */
const CLOUD_PATH =
  'M-6.2,4.8 C-9.2,4.8 -9.6,0.4 -6.6,-0.6 C-6.8,-3.8 -3.2,-5.6 -0.4,-4.2 C1.2,-6.8 6.4,-5.8 6.6,-1.4 C9.6,-0.6 9.4,4.8 6.0,4.8 C3.0,5.5 -3.0,5.5 -6.2,4.8 Z';

/** Upper half of the cumulus cloud sliced horizontally at y = 0.8 for Cloud Clip. */
const CLOUD_TOP_PATH =
  'M-8.4,0.8 C-8.4,-0.2 -7.6,-0.5 -6.6,-0.6 C-6.8,-3.8 -3.2,-5.6 -0.4,-4.2 C1.2,-6.8 6.4,-5.8 6.6,-1.4 C8.2,-0.9 8.6,0.0 8.5,0.8 Z';

/** Clipped lower belly arc of the cumulus cloud below y = 0.8. */
const CLOUD_CLIPPED_BOTTOM = 'M-8.0,2.1 C-8.2,3.6 -7.4,4.8 -6.2,4.8 C-3.0,5.5 3.0,5.5 6.0,4.8 C7.5,4.8 8.3,3.5 8.1,2.0';

/** Compact white cumulus puff used inside blue sky panels. */
const SKY_PUFF_PATH =
  'M-4.2,2.0 C-5.8,2.0 -6.0,-0.2 -4.1,-0.6 C-3.9,-2.5 -1.5,-3.2 0.2,-2.1 C1.3,-3.4 3.9,-2.6 3.9,-0.4 C5.8,0.0 5.6,2.0 3.9,2.0 Z';

/** Shared lit-from-upper-left cumulus cloud gradient and silhouette. */
const StormCloud: React.FC<{
  id: string;
  cx: number;
  cy: number;
  scale?: number;
  strokeWidth?: number;
}> = ({ id, cx, cy, scale = 1, strokeWidth = 1.2 }) => (
  <>
    <defs>
      <linearGradient id={id} x1="20%" y1="5%" x2="80%" y2="95%">
        <stop offset="0%" stopColor={WHITE} />
        <stop offset="42%" stopColor={GREY_TOP} />
        <stop offset="76%" stopColor={GREY_LEFT} />
        <stop offset="100%" stopColor={GREY_RIGHT} />
      </linearGradient>
    </defs>
    <g transform={`translate(${cx} ${cy}) scale(${scale})`}>
      <path
        d={CLOUD_PATH}
        fill={`url(#${id})`}
        stroke={OUTLINE}
        strokeWidth={strokeWidth / scale}
        strokeLinejoin="round"
      />
      <path
        d="M-3.4,-0.3 C-1.8,-2.0 1.4,-2.0 2.8,-0.4"
        fill="none"
        stroke={GREY_RIGHT}
        strokeWidth={0.75 / scale}
        strokeLinecap="round"
      />
    </g>
  </>
);

const SkyCloudPuff: React.FC<{ cx: number; cy: number; scale?: number; strokeWidth?: number }> = ({
  cx,
  cy,
  scale = 1,
  strokeWidth = 0.65,
}) => (
  <path
    d={SKY_PUFF_PATH}
    transform={`translate(${cx} ${cy}) scale(${scale})`}
    fill={WHITE}
    stroke={OUTLINE}
    strokeWidth={strokeWidth / scale}
    strokeLinejoin="round"
  />
);

/** Chunky turbulent arrow for Cloud Billowy Noise, centered at (0, 0) pointing right (+X). */
const NoiseArrow: React.FC<{ at: Pt; deg: number }> = ({ at, deg }) => (
  <polygon
    points="-2.2,-0.95 0.1,-0.95 0.1,-2.15 2.6,0 0.1,2.15 0.1,0.95 -2.2,0.95"
    transform={`translate(${at[0]} ${at[1]}) rotate(${deg})`}
    fill={LIGHT_BLUE}
    stroke={OUTLINE}
    strokeWidth="0.8"
    strokeLinejoin="round"
  />
);

/** Isometric box for Sky Box (2:1 projection). */
const SKY_BOX = isoBoxFaces(12, 2.5, 8.5, 9.5);

/**
 * Cloud and sky operators.
 */
export const CLOUD_SKY_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.cloud',
    label: 'Cloud',
    family: 'sop',
    description:
      'Fluffy cumulus cloud lit from the upper left with white top lobes, cool grey-blue base shading and a dark outline.',
    types: ['cloud', 'cloudadjustdensityprofile', 'cloudshapefromintersection', 'cloudshapegenerate'],
    icons: ['sop_cloud', 'sop_cloudadjustdensityprofile', 'sop_cloudshapefromintersection', 'sop_cloudshapegenerate'],
    refKey: 'SOP_cloud',
    render: (uid) => <StormCloud id={`${uid}-cloud`} cx={12} cy={12.4} scale={1} strokeWidth={1.25} />,
  },
  {
    id: 'sop.cloudbillowynoise',
    label: 'Cloud Billowy Noise',
    family: 'sop',
    description: 'Cumulus cloud at the center surrounded by a ring of six swirling light-blue arrows.',
    types: ['cloudbillowynoise', 'cloudnoise', 'cloudwispynoise', 'skyfieldnoise'],
    icons: ['sop_cloudbillowynoise', 'sop_cloudnoise', 'sop_cloudwispynoise', 'sop_skyfieldnoise'],
    refKey: 'SOP_cloudbillowynoise',
    render: (uid) => (
      <>
        <NoiseArrow at={[12, 4.1]} deg={145} />
        <NoiseArrow at={[18.8, 7.6]} deg={-145} />
        <NoiseArrow at={[19.2, 15.6]} deg={115} />
        <NoiseArrow at={[12.4, 19.8]} deg={-15} />
        <NoiseArrow at={[5.0, 16.0]} deg={-110} />
        <NoiseArrow at={[5.0, 7.6]} deg={35} />
        <StormCloud id={`${uid}-cloud`} cx={12} cy={12.1} scale={0.62} strokeWidth={1.1} />
      </>
    ),
  },
  {
    id: 'sop.cloudclip',
    label: 'Cloud Clip',
    family: 'sop',
    description:
      'Upper half of a cumulus cloud sliced flat across the middle, with a dashed red outline below showing the clipped lower belly.',
    types: ['cloudclip'],
    icons: ['sop_cloudclip'],
    refKey: 'SOP_cloudclip',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-clip`} x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor={WHITE} />
            <stop offset="55%" stopColor={GREY_TOP} />
            <stop offset="100%" stopColor={SKY_LIGHT} />
          </linearGradient>
        </defs>
        <g transform="translate(12 12.2) scale(1.06)">
          <path
            d={CLOUD_CLIPPED_BOTTOM}
            fill="none"
            stroke={RED}
            strokeWidth="1.25"
            strokeDasharray="2.1 1.5"
            strokeLinecap="round"
          />
          <path
            d={CLOUD_TOP_PATH}
            fill={`url(#${uid}-clip)`}
            stroke={OUTLINE}
            strokeWidth="1.15"
            strokeLinejoin="round"
          />
        </g>
      </>
    ),
  },
  {
    id: 'sop.cloudlight',
    label: 'Cloud Light',
    family: 'sop',
    description:
      'Cumulus cloud at the upper left with three golden-yellow light beams streaming down and to the right.',
    types: ['cloudlight'],
    icons: ['sop_cloudlight'],
    refKey: 'SOP_cloudlight',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-beam`} x1="0%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor={YELLOW_LIGHT} />
            <stop offset="100%" stopColor={YELLOW} />
          </linearGradient>
        </defs>
        <g fill={`url(#${uid}-beam)`} stroke={OUTLINE} strokeWidth="0.9" strokeLinejoin="round">
          <polygon points="7.5,11.5 9.8,11.0 11.4,20.5 8.2,20.5" />
          <polygon points="11.2,11.2 13.6,10.4 16.8,20.5 13.4,20.5" />
          <polygon points="14.4,10.2 16.5,9.0 21.4,17.8 18.6,18.8" />
        </g>
        <StormCloud id={`${uid}-cloud`} cx={10.8} cy={8.6} scale={0.78} strokeWidth={1.15} />
      </>
    ),
  },
  {
    id: 'sop.cloudshapefromline',
    label: 'Cloud Shape from Line',
    family: 'sop',
    description:
      'Cumulus cloud at the lower left with a diagonal silver pencil at the upper right drawing its top contour.',
    types: ['cloudshapefromline'],
    icons: ['sop_cloudshapefromline'],
    refKey: 'SOP_cloudshapefromline',
    render: (uid) => (
      <>
        <StormCloud id={`${uid}-cloud`} cx={10.5} cy={14.2} scale={0.84} strokeWidth={1.15} />
        <g stroke={OUTLINE} strokeWidth="0.95" strokeLinejoin="round">
          <polygon points="14.2,9.8 15.8,8.8 20.8,3.8 19.6,2.6 14.6,7.6" fill={GREY_TOP} />
          <polygon points="13.4,10.2 14.2,9.8 14.6,7.6 13.8,8.4" fill={DARK_GREY} />
        </g>
      </>
    ),
  },
  {
    id: 'sop.cloudshapefrompolygon',
    label: 'Cloud Shape from Polygon',
    family: 'sop',
    description:
      'Polygon cloud formed from white and cool grey flat-shaded facets with dark outlines, lit from the upper left.',
    types: ['cloudshapefrompolygon'],
    icons: ['sop_cloudshapefrompolygon'],
    refKey: 'SOP_cloudshapefrompolygon',
    render: () => (
      <g stroke={OUTLINE} strokeLinejoin="round">
        <g strokeWidth="0.75">
          <polygon points="10.8,5.2 14.8,5.6 12.8,9.4" fill={WHITE} />
          <polygon points="10.8,5.2 12.8,9.4 7.8,9.2" fill={GREY_TOP} />
          <polygon points="14.8,5.6 17.6,9.2 12.8,9.4" fill={GREY_TOP} />
          <polygon points="7.8,9.2 4.4,10.8 7.6,13.6" fill={WHITE} />
          <polygon points="7.8,9.2 7.6,13.6 12.8,9.4" fill={GREY_TOP} />
          <polygon points="12.8,9.4 7.6,13.6 14.6,13.8" fill={WHITE} />
          <polygon points="12.8,9.4 14.6,13.8 17.6,9.2" fill={GREY_LEFT} />
          <polygon points="17.6,9.2 14.6,13.8 20.6,13.0" fill={GREY_LEFT} />
          <polygon points="4.4,10.8 2.8,14.8 4.4,17.8 7.6,13.6" fill={GREY_LEFT} />
          <polygon points="4.4,17.8 10.6,18.0 7.6,13.6" fill={GREY_RIGHT} />
          <polygon points="7.6,13.6 10.6,18.0 14.6,13.8" fill={GREY_LEFT} />
          <polygon points="10.6,18.0 17.2,17.8 14.6,13.8" fill={GREY_RIGHT} />
          <polygon points="14.6,13.8 17.2,17.8 20.6,16.4 20.6,13.0" fill={GREY_RIGHT} />
        </g>
        <polygon
          points="10.8,5.2 14.8,5.6 17.6,9.2 20.6,13.0 20.6,16.4 17.2,17.8 10.6,18.0 4.4,17.8 2.8,14.8 4.4,10.8 7.8,9.2"
          fill="none"
          strokeWidth="1.15"
        />
      </g>
    ),
  },
  {
    id: 'sop.cloudshapereplicate',
    label: 'Cloud Shape Replicate',
    family: 'sop',
    description:
      'Two overlapping cumulus clouds: a smaller one behind at the upper left and a larger one in front at the lower right.',
    types: ['cloudshapereplicate'],
    icons: ['sop_cloudshapereplicate'],
    refKey: 'SOP_cloudshapereplicate',
    render: (uid) => (
      <>
        <StormCloud id={`${uid}-back`} cx={8.2} cy={7.6} scale={0.56} strokeWidth={1.1} />
        <StormCloud id={`${uid}-front`} cx={13.8} cy={14.6} scale={0.78} strokeWidth={1.2} />
      </>
    ),
  },
  {
    id: 'sop.skybox',
    label: 'Sky Box',
    family: 'sop',
    description: 'Isometric cube whose three visible faces show a blue sky with white cumulus clouds.',
    types: ['skybox'],
    icons: ['sop_skybox'],
    refKey: 'SOP_skybox',
    render: (uid) => (
      <>
        <defs>
          <clipPath id={`${uid}-top`}>
            <polygon points={pts(SKY_BOX.top)} />
          </clipPath>
          <clipPath id={`${uid}-left`}>
            <polygon points={pts(SKY_BOX.left)} />
          </clipPath>
          <clipPath id={`${uid}-right`}>
            <polygon points={pts(SKY_BOX.right)} />
          </clipPath>
        </defs>
        <polygon points={pts(SKY_BOX.top)} fill={SKY_LIGHT} />
        <g clipPath={`url(#${uid}-top)`}>
          <SkyCloudPuff cx={12.0} cy={6.8} scale={0.72} strokeWidth={0.6} />
          <SkyCloudPuff cx={7.5} cy={7.6} scale={0.48} strokeWidth={0.6} />
        </g>
        <polygon points={pts(SKY_BOX.left)} fill={LIGHT_BLUE} />
        <g clipPath={`url(#${uid}-left)`}>
          <SkyCloudPuff cx={7.6} cy={12.2} scale={0.62} strokeWidth={0.6} />
          <SkyCloudPuff cx={10.4} cy={16.5} scale={0.55} strokeWidth={0.6} />
        </g>
        <polygon points={pts(SKY_BOX.right)} fill={BLUE} />
        <g clipPath={`url(#${uid}-right)`}>
          <SkyCloudPuff cx={16.5} cy={12.0} scale={0.62} strokeWidth={0.6} />
          <SkyCloudPuff cx={14.4} cy={16.8} scale={0.55} strokeWidth={0.6} />
        </g>
        <g fill="none" stroke={OUTLINE} strokeLinejoin="round">
          <polygon
            points={pts([
              SKY_BOX.top[0],
              SKY_BOX.top[1],
              SKY_BOX.right[2],
              SKY_BOX.right[3],
              SKY_BOX.left[3],
              SKY_BOX.left[0],
            ])}
            strokeWidth="1.15"
          />
          <polyline points={pts([SKY_BOX.left[0], SKY_BOX.top[2], SKY_BOX.top[1]])} strokeWidth="0.85" />
          <line
            x1={SKY_BOX.top[2][0]}
            y1={SKY_BOX.top[2][1]}
            x2={SKY_BOX.right[3][0]}
            y2={SKY_BOX.right[3][1]}
            strokeWidth="0.85"
          />
        </g>
      </>
    ),
  },
  {
    id: 'sop.skyfield',
    label: 'Sky Field',
    family: 'sop',
    description: 'Landscape wooden picture frame containing a blue sky with white cumulus clouds.',
    types: ['skyfield', 'skyfieldfrommap'],
    icons: ['sop_skyfield', 'sop_skyfieldfrommap'],
    refKey: 'SOP_skyfield',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-sky`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={LIGHT_BLUE} />
            <stop offset="100%" stopColor={SKY_LIGHT} />
          </linearGradient>
          <clipPath id={`${uid}-inner`}>
            <rect x="4.3" y="6.8" width="15.4" height="10.4" rx="0.4" />
          </clipPath>
        </defs>
        <path
          d={roundedRectPath(2.2, 4.7, 19.6, 14.6, 1.0)}
          fill={WOOD_LIGHT}
          stroke={OUTLINE}
          strokeWidth="1.15"
          strokeLinejoin="round"
        />
        <path d="M2.6,18.9 L4.3,17.2 H19.7 L21.4,18.9 Z" fill={WOOD_DARK} />
        <rect
          x="4.3"
          y="6.8"
          width="15.4"
          height="10.4"
          rx="0.4"
          fill={`url(#${uid}-sky)`}
          stroke={OUTLINE}
          strokeWidth="0.9"
        />
        <g clipPath={`url(#${uid}-inner)`}>
          <SkyCloudPuff cx={12.0} cy={11.8} scale={0.82} strokeWidth={0.65} />
          <SkyCloudPuff cx={6.4} cy={14.6} scale={0.58} strokeWidth={0.65} />
          <SkyCloudPuff cx={17.6} cy={14.4} scale={0.58} strokeWidth={0.65} />
        </g>
      </>
    ),
  },
  {
    id: 'sop.skyfieldpattern',
    label: 'Sky Field Pattern',
    family: 'sop',
    description:
      'Square blue sky tile with a repeating pattern of white cumulus clouds and a curled bottom-right corner.',
    types: ['skyfieldpattern'],
    icons: ['sop_skyfieldpattern'],
    refKey: 'SOP_skyfieldpattern',
    render: (uid) => {
      const tilePath = 'M2.5,2.5 H21.5 V16.2 L16.2,21.5 H2.5 Z';
      return (
        <>
          <defs>
            <linearGradient id={`${uid}-sky`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={LIGHT_BLUE} />
              <stop offset="100%" stopColor={SKY_LIGHT} />
            </linearGradient>
            <clipPath id={`${uid}-tile`}>
              <path d={tilePath} />
            </clipPath>
          </defs>
          <path d={tilePath} fill={`url(#${uid}-sky)`} />
          <g clipPath={`url(#${uid}-tile)`}>
            <SkyCloudPuff cx={12.0} cy={11.8} scale={0.86} strokeWidth={0.65} />
            <SkyCloudPuff cx={4.2} cy={5.8} scale={0.72} strokeWidth={0.65} />
            <SkyCloudPuff cx={19.8} cy={5.8} scale={0.72} strokeWidth={0.65} />
            <SkyCloudPuff cx={4.2} cy={18.2} scale={0.72} strokeWidth={0.65} />
            <SkyCloudPuff cx={12.0} cy={19.6} scale={0.65} strokeWidth={0.65} />
          </g>
          <path d={tilePath} fill="none" stroke={OUTLINE} strokeWidth="1.1" strokeLinejoin="round" />
          <polygon
            points="16.2,21.5 16.2,16.2 21.5,16.2"
            fill={GREY_TOP}
            stroke={OUTLINE}
            strokeWidth="1.0"
            strokeLinejoin="round"
          />
        </>
      );
    },
  },
];
