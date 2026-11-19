import { CasedStroke } from '../../geoKits';
import type { OperatorIconDef } from '../../iconTypes';
import { TagPanel } from '../kits/attribTag';

const OUTLINE = '#262626';

/**
 * Cutting, deleting, splitting and boolean operators.
 */
export const CUT_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.blast',
    label: 'Blast',
    family: 'sop',
    description:
      'Orange perspective tile floor with one dark missing tile; red and white shards burst upward out of the hole.',
    types: ['blast'],
    refKey: 'SOP_blast',
    render: () => (
      <>
        <polygon
          points="5,13 19,13 22.5,20.5 1.5,20.5"
          fill="#ee8624"
          stroke="#262626"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path d="M9.7 13L8.5 20.5M14.3 13L15.5 20.5M3.3 16.6H20.7" stroke="#262626" strokeWidth="0.8" />
        <polygon points="10.2,14.2 13.8,14.2 14.3,17.6 9.7,17.6" fill="#3a2a1c" stroke="#262626" strokeWidth="0.8" />
        <polygon
          points="11,15 5.5,4.5 8.5,3.5"
          fill="#e03228"
          stroke="#262626"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <polygon
          points="12,15 10.8,1.8 13.6,2"
          fill="#f2f4f7"
          stroke="#262626"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <polygon
          points="13,15 15.5,3.5 18.5,4.5"
          fill="#e03228"
          stroke="#262626"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.blastbyattribute',
    label: 'Blast by Attribute',
    family: 'sop',
    description: 'Colorful Rubik cube with one front sub-cube erased by a tilted blue-and-white eraser.',
    types: ['blastbyattribute'],
    icons: ['sop_blastbyattribute'],
    refKey: 'SOP_blastbyattribute',
    render: () => (
      <g stroke="#262626" strokeWidth="1" strokeLinejoin="round">
        <polygon points="10,5 13.8,6.9 10,8.8 6.2,6.9" fill="#ffe47a" />
        <polygon points="6.2,6.9 10,8.8 6.2,10.7 2.5,8.8" fill="#eef2f7" />
        <polygon points="2.5,8.8 6.2,10.7 6.2,14.7 2.5,12.8" fill="#3672c4" />
        <polygon points="2.5,12.8 6.2,14.7 6.2,18.6 2.5,16.7" fill="#58c848" />
        <polygon points="6.2,14.7 10,16.6 10,20.5 6.2,18.6" fill="#e03228" />
        <polygon points="10,16.6 13.8,14.7 13.8,18.6 10,20.5" fill="#ee8624" />
        <polygon points="13.8,14.7 17.5,12.8 17.5,16.7 13.8,18.6" fill="#5aa2f2" />
        <polygon points="13.8,10.7 17.5,8.8 17.5,12.8 13.8,14.7" fill="#f2c438" />
        <polygon points="6.2,10.7 10,8.8 10,12.8 6.2,14.7" fill="#89929e" />
        <polygon points="10,8.8 13.8,10.7 13.8,14.7 10,12.8" fill="#5a616b" />
        <polygon points="6.2,14.7 10,12.8 13.8,14.7 10,16.6" fill="#c0c7d1" />
        <polygon points="12.5,6.8 16.5,2.8 21.5,5.2 17.5,9.2" fill="#3672c4" />
        <polygon points="10.8,8.5 12.5,6.8 17.5,9.2 15.8,10.9" fill="#eef2f7" />
      </g>
    ),
  },
  {
    id: 'sop.delete',
    label: 'Delete',
    family: 'sop',
    description: 'Grey metal trash can with vertical ribs and a domed lid with a handle.',
    types: ['delete'],
    icons: ['sop_delete'],
    refKey: 'SOP_delete',
    render: () => (
      <g stroke="#262626" strokeWidth="1.1" strokeLinejoin="round">
        <polygon points="6,8.5 18,8.5 16.2,20.5 7.8,20.5" fill="#c0c7d1" />
        <ellipse cx="12" cy="7.5" rx="6.8" ry="2.4" fill="#eef2f7" />
        <path d="M9.8,6.5 V4.8 H14.2 V6.5" fill="none" strokeWidth="1.2" />
        <path
          d="M9.5,11 L10.2,18.5 M12,11 V18.8 M14.5,11 L13.8,18.5"
          stroke="#5a616b"
          strokeWidth="0.9"
          strokeLinecap="round"
        />
      </g>
    ),
  },
  {
    id: 'sop.clip',
    label: 'Clip - Old',
    family: 'sop',
    description: 'Orange sphere sliced horizontally by a grey perspective plane, with the clipped bottom cap ghosted.',
    types: ['clip'],
    icons: ['sop_clip', 'sop_clip-2.0'],
    refKey: 'SOP_clip',
    render: () => (
      <g stroke="#262626" strokeWidth="1.1" strokeLinejoin="round">
        <path d="M7.5,14.5 A5.5,5.5 0 0,0 16.5,14.5 Z" fill="#ffb066" fillOpacity="0.4" />
        <polygon points="12,9.5 21.5,13.5 12,17.5 2.5,13.5" fill="#c0c7d1" />
        <path d="M6.8,12.5 A5.4,5.4 0 1,1 17.2,12.5 C15,13.8 9,13.8 6.8,12.5 Z" fill="#ee8624" strokeWidth="1.2" />
      </g>
    ),
  },
  {
    id: 'sop.boolean',
    label: 'Boolean',
    family: 'sop',
    description:
      'Ghosted grey cube and ghosted sphere overlapping; only their intersection is drawn solid with three-tone shading and dark outlines.',
    types: ['boolean'],
    refKey: 'SOP_boolean-2.0',
    render: (uid) => (
      <>
        <defs>
          <clipPath id={`${uid}-sphere`}>
            <circle cx="15" cy="9" r="6.5" />
          </clipPath>
          <clipPath id={`${uid}-cube`}>
            <polygon points="3,8 9,5 15,8 15,16 9,19 3,16" />
          </clipPath>
        </defs>
        {/* Ghosted operands */}
        <polygon
          points="3,8 9,5 15,8 15,16 9,19 3,16"
          fill="#ffffff"
          fillOpacity="0.25"
          stroke="#8a929e"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <path d="M3 8L9 11L15 8M9 11V19" fill="none" stroke="#8a929e" strokeWidth="0.8" />
        <circle cx="15" cy="9" r="6.5" fill="#ffffff" fillOpacity="0.25" stroke="#8a929e" strokeWidth="0.9" />
        {/* Solid intersection */}
        <g clipPath={`url(#${uid}-sphere)`}>
          <polygon points="9,5 15,8 9,11 3,8" fill="#eef2f7" />
          <polygon points="3,8 9,11 9,19 3,16" fill="#c0c7d1" />
          <polygon points="15,8 9,11 9,19 15,16" fill="#89929e" />
          <path
            d="M3 8L9 5L15 8V16L9 19L3 16ZM3 8L9 11L15 8M9 11V19"
            fill="none"
            stroke="#262626"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </g>
        <circle cx="15" cy="9" r="6.5" fill="none" stroke="#262626" strokeWidth="1.2" clipPath={`url(#${uid}-cube)`} />
      </>
    ),
  },
  {
    id: 'sop.splitbypointattrib',
    label: 'Split by Point Attribute',
    family: 'sop',
    description:
      'Split orange pyramid with four yellow apex points and a white rectangular attribute speech bubble at the upper right.',
    types: ['splitbypointattrib'],
    icons: ['sop_splitbypointattrib'],
    refKey: 'SOP_splitbypointattrib',
    render: () => (
      <>
        <polygon
          points="2.0,16.4 10.8,12.0 19.6,16.4 11.0,21.6"
          fill="#c25e12"
          stroke={OUTLINE}
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <polygon
          points="2.0,16.4 8.8,6.0 10.0,12.4"
          fill="#ffb066"
          stroke={OUTLINE}
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <polygon
          points="12.0,6.0 19.6,16.4 11.4,12.4"
          fill="#ee8624"
          stroke={OUTLINE}
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <polygon
          points="2.0,16.4 9.4,9.0 11.0,21.6"
          fill="#ffb066"
          stroke={OUTLINE}
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <polygon
          points="11.8,9.0 19.6,16.4 11.0,21.6"
          fill="#c25e12"
          stroke={OUTLINE}
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <g fill="#ffe47a" stroke={OUTLINE} strokeWidth="0.7">
          <circle cx="8.8" cy="5.6" r="1.15" />
          <circle cx="12.0" cy="5.6" r="1.15" />
          <circle cx="9.4" cy="8.6" r="1.15" />
          <circle cx="11.8" cy="8.6" r="1.15" />
        </g>
        <TagPanel x={13.8} y={2.0} w={8.2} h={4.8} tail={[14.8, 16.6]} tip={[12.8, 8.8]} strokeWidth={1.0} />
      </>
    ),
  },
  {
    id: 'sop.separatepieces',
    label: 'Separate Pieces',
    family: 'sop',
    description:
      'Two jagged white and grey broken shards pulling apart horizontally with blue separation arcs between them.',
    types: ['separatepieces'],
    icons: ['sop_separatepieces'],
    refKey: 'SOP_separatepieces',
    render: () => (
      <>
        <CasedStroke
          d="M10.4,9.6 Q9.2,12 10.4,14.4 M13.6,9.6 Q14.8,12 13.6,14.4"
          color="#5aa2f2"
          width={0.95}
          casing={2.0}
        />
        <polygon
          points="2.0,11.6 4.6,7.0 8.6,8.8 7.6,12.6 9.0,16.4 4.2,17.0"
          fill="#c0c7d1"
          stroke={OUTLINE}
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        <polygon
          points="2.0,11.6 4.6,7.0 8.6,8.8 5.4,12.2"
          fill="#f2f4f7"
          stroke={OUTLINE}
          strokeWidth="0.65"
          strokeLinejoin="round"
        />
        <polygon
          points="22.0,11.8 19.4,7.0 15.4,9.0 16.4,12.4 15.0,16.4 19.6,17.0"
          fill="#c0c7d1"
          stroke={OUTLINE}
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        <polygon
          points="22.0,11.8 19.4,7.0 15.4,9.0 18.6,12.2"
          fill="#f2f4f7"
          stroke={OUTLINE}
          strokeWidth="0.65"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.intersectionstitch',
    label: 'Intersection Stitch',
    family: 'sop',
    description: 'Intersecting yellow and blue triangles joined along a white-and-red dashed stitch seam.',
    types: ['intersectionstitch'],
    icons: ['sop_intersectionstitch'],
    refKey: 'SOP_intersectionstitch',
    render: () => (
      <>
        <polygon
          points="2.2,15 15,8.2 14.8,21.8"
          fill="#fce94f"
          stroke="#c4a000"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <polygon
          points="2.2,15 7.8,4.8 22,11.8"
          fill="#729fcf"
          stroke="#204a87"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <polygon
          points="2.2,15 15,2.2 15,8.2"
          fill="#fce94f"
          stroke="#c4a000"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <line x1="2.2" y1="15" x2="15" y2="8.2" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
        <line
          x1="2.2"
          y1="15"
          x2="15"
          y2="8.2"
          stroke="#ef2929"
          strokeWidth="1.15"
          strokeDasharray="1.8 1.2"
          strokeLinecap="round"
        />
      </>
    ),
  },
];
