import type { OperatorIconDef } from '../iconTypes';

/**
 * Built-in SOP icons for polygon modeling, deformation and topology.
 *
 * Original MIT-licensed drawings that follow `docs/ICON_ART_BIBLE.md`.
 */
export const SOP_MODELING_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.bend',
    label: 'Bend',
    family: 'sop',
    description:
      'Tall three-tone grey box bent along its height; the curved side edges are traced in red to show the deformation.',
    types: ['bend'],
    refKey: 'SOP_bend',
    render: () => (
      <>
        <polygon points="5,5 15,3.5 20,5 10,6.8" fill="#eef2f7" stroke="#262626" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M5 5L10 6.8C13.5 11 13.5 15.5 10.5 21L5.5 19.5C8 14.5 7.5 10 5 5Z" fill="#c0c7d1" stroke="#262626" strokeWidth="1.2" strokeLinejoin="round" />
        <path
          d="M10 6.8L20 5C22.5 9.5 22 14.5 19.5 19L10.5 21C13.5 15.5 13.5 11 10 6.8Z"
          fill="#89929e"
          stroke="#262626"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path
          d="M5 5C7.5 10 8 14.5 5.5 19.5M10 6.8C13.5 11 13.5 15.5 10.5 21M20 5C22.5 9.5 22 14.5 19.5 19"
          fill="none"
          stroke="#e03228"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </>
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
        <polygon points="3,8 9,5 15,8 15,16 9,19 3,16" fill="#ffffff" fillOpacity="0.25" stroke="#8a929e" strokeWidth="0.9" strokeLinejoin="round" />
        <path d="M3 8L9 11L15 8M9 11V19" fill="none" stroke="#8a929e" strokeWidth="0.8" />
        <circle cx="15" cy="9" r="6.5" fill="#ffffff" fillOpacity="0.25" stroke="#8a929e" strokeWidth="0.9" />
        {/* Solid intersection */}
        <g clipPath={`url(#${uid}-sphere)`}>
          <polygon points="9,5 15,8 9,11 3,8" fill="#eef2f7" />
          <polygon points="3,8 9,11 9,19 3,16" fill="#c0c7d1" />
          <polygon points="15,8 9,11 9,19 15,16" fill="#89929e" />
          <path d="M3 8L9 5L15 8V16L9 19L3 16ZM3 8L9 11L15 8M9 11V19" fill="none" stroke="#262626" strokeWidth="1.2" strokeLinejoin="round" />
        </g>
        <circle cx="15" cy="9" r="6.5" fill="none" stroke="#262626" strokeWidth="1.2" clipPath={`url(#${uid}-cube)`} />
      </>
    ),
  },
  {
    id: 'sop.convert',
    label: 'Convert',
    family: 'sop',
    description:
      'Curved patch split by a red line: smooth grey on the left, orange wireframe quads on the right.',
    types: ['convert'],
    refKey: 'SOP_convert',
    render: () => (
      <>
        <path d="M4,7 Q8,5 12,7 L12,18 Q8,16 4,18 Z" fill="#b8c0cc" stroke="#222" strokeWidth="1.2" />
        <path d="M12,7 Q16,9 20,6 L20,17 Q16,20 12,18 Z" fill="#ee8624" stroke="#222" strokeWidth="1.2" />
        <line x1="16" y1="7.5" x2="16" y2="18.5" stroke="#222" strokeWidth="0.9" />
        <line x1="12" y1="12.5" x2="20" y2="11.5" stroke="#222" strokeWidth="0.9" />
        <line x1="12" y1="3" x2="12" y2="21" stroke="#e03228" strokeWidth="1.8" />
      </>
    ),
  },
  {
    id: 'sop.convertline',
    label: 'Convert Line',
    family: 'sop',
    description:
      'Wireframe box with cased grey edges, colored bottom edges (red, yellow, green, blue) and grey vertex balls on every corner.',
    types: ['convertline'],
    refKey: 'SOP_convertline',
    render: () => (
      <>
        {/* Dark casing under every edge */}
        <path
          d="M4 6L15 3L20.5 7L9.5 10ZM4 15L15 12L20.5 16L9.5 19ZM4 6V15M15 3V12M20.5 7V16M9.5 10V19"
          fill="none"
          stroke="#262626"
          strokeWidth="2.6"
          strokeLinejoin="round"
        />
        <path d="M4 6L15 3L20.5 7L9.5 10ZM4 6V15M15 3V12M20.5 7V16M9.5 10V19" fill="none" stroke="#b4bcc8" strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M4 15L15 12" stroke="#4892f0" strokeWidth="1.4" />
        <path d="M15 12L20.5 16" stroke="#58c848" strokeWidth="1.4" />
        <path d="M4 15L9.5 19" stroke="#e03228" strokeWidth="1.4" />
        <path d="M9.5 19L20.5 16" stroke="#f0c828" strokeWidth="1.4" />
        {[
          [4, 6],
          [15, 3],
          [20.5, 7],
          [9.5, 10],
          [4, 15],
          [15, 12],
          [20.5, 16],
          [9.5, 19],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.6" fill="#c0c7d1" stroke="#262626" strokeWidth="1" />
        ))}
      </>
    ),
  },
  {
    id: 'sop.divide',
    label: 'Divide',
    family: 'sop',
    description:
      'Translucent grey cube with red triangulation lines crossing its faces.',
    types: ['divide'],
    refKey: 'SOP_divide',
    render: () => (
      <>
        <polygon points="12,3 20,7 20,16.5 12,20.5 4,16.5 4,7" fill="#9aa2ae" fillOpacity="0.65" stroke="#333333" strokeWidth="1.3" />
        <line x1="12" y1="3" x2="12" y2="20.5" stroke="#d9382e" strokeWidth="1.1" />
        <line x1="4" y1="7" x2="20" y2="7" stroke="#d9382e" strokeWidth="1.1" />
        <line x1="4" y1="7" x2="12" y2="20.5" stroke="#d9382e" strokeWidth="1.1" />
        <line x1="20" y1="7" x2="12" y2="20.5" stroke="#d9382e" strokeWidth="1.1" />
        <line x1="12" y1="3" x2="4" y2="16.5" stroke="#d9382e" strokeWidth="1.1" />
        <line x1="12" y1="3" x2="20" y2="16.5" stroke="#d9382e" strokeWidth="1.1" />
      </>
    ),
  },
  {
    id: 'sop.edit',
    label: 'Edit',
    family: 'sop',
    description:
      'Three-tone grey box whose top corner is pulled up into a tall peak, with a red picked point at the tip and a white mouse cursor beside it.',
    types: ['edit'],
    refKey: 'SOP_edit',
    render: () => (
      <>
        <polygon points="3.5,9 15.5,2.5 9.5,12" fill="#eef2f7" stroke="#262626" strokeWidth="1.1" strokeLinejoin="round" />
        <polygon points="3.5,9 9.5,12 9.5,21 3.5,18" fill="#c0c7d1" stroke="#262626" strokeWidth="1.1" strokeLinejoin="round" />
        <polygon points="9.5,12 15.5,2.5 15.5,18 9.5,21" fill="#89929e" stroke="#262626" strokeWidth="1.1" strokeLinejoin="round" />
        <circle cx="15.5" cy="2.8" r="2" fill="#e03228" stroke="#262626" strokeWidth="0.9" />
        <polygon
          points="16.8,5 16.8,12.5 18.75,10.7 20.1,13.55 21.3,12.95 20,10.2 22.4,10.2"
          fill="#ffffff"
          stroke="#262626"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.facet',
    label: 'Facet',
    family: 'sop',
    description:
      'Geodesic sphere made of flat triangular facets: grey shades on the upper half, orange shades on the lower half.',
    types: ['facet'],
    refKey: 'SOP_facet',
    render: (uid) => (
      <>
        <defs>
          <clipPath id={`${uid}-ball`}>
            <circle cx="12" cy="12" r="8.6" />
          </clipPath>
        </defs>
        <g clipPath={`url(#${uid}-ball)`} stroke="#262626" strokeWidth="0.7" strokeLinejoin="round">
          {/* Grey upper facets */}
          <polygon points="12,2 5,7 12,8" fill="#ffffff" />
          <polygon points="12,2 12,8 19,7" fill="#c9d0da" />
          <polygon points="12,2 1,8 5,7" fill="#9aa2ae" />
          <polygon points="12,2 19,7 23,8" fill="#6f7782" />
          <polygon points="1,8 5,7 2,12.5" fill="#7a828e" />
          <polygon points="5,7 2,12.5 8.5,12.5" fill="#b4bcc8" />
          <polygon points="5,7 12,8 8.5,12.5" fill="#eef2f7" />
          <polygon points="12,8 8.5,12.5 15.5,12.5" fill="#8a929e" />
          <polygon points="12,8 19,7 15.5,12.5" fill="#dfe4ea" />
          <polygon points="19,7 15.5,12.5 22,12.5" fill="#6f7782" />
          <polygon points="19,7 23,8 22,12.5" fill="#5a616b" />
          {/* Orange lower facets */}
          <polygon points="2,12.5 8.5,12.5 3,18" fill="#f3a24e" />
          <polygon points="8.5,12.5 3,18 12,17.5" fill="#ee8624" />
          <polygon points="8.5,12.5 15.5,12.5 12,17.5" fill="#f8b562" />
          <polygon points="15.5,12.5 12,17.5 21,18" fill="#d9701a" />
          <polygon points="15.5,12.5 22,12.5 21,18" fill="#c35f12" />
          <polygon points="3,18 12,17.5 12,23" fill="#e07a1e" />
          <polygon points="12,17.5 21,18 12,23" fill="#c96614" />
        </g>
        <circle cx="12" cy="12" r="8.6" fill="none" stroke="#262626" strokeWidth="1.3" />
      </>
    ),
  },
  {
    id: 'sop.fuse',
    label: 'Fuse',
    family: 'sop',
    description:
      'Two red arrows pointing at each other above two dark line ends joined by red welded points.',
    types: ['fuse'],
    refKey: 'SOP_fuse-2.0',
    render: () => (
      <>
        <polygon points="2.5,5 7,5 7,3 11,6.5 7,10 7,8 2.5,8" fill="#e03228" stroke="#262626" strokeWidth="0.9" strokeLinejoin="round" />
        <polygon points="21.5,5 17,5 17,3 13,6.5 17,10 17,8 21.5,8" fill="#e03228" stroke="#262626" strokeWidth="0.9" strokeLinejoin="round" />
        <path d="M2.5 19C3 16.5 5 15.5 8.5 15.5M21.5 19C21 16.5 19 15.5 15.5 15.5" fill="none" stroke="#262626" strokeWidth="2" strokeLinecap="round" />
        <path d="M8.5 15.5H15.5" stroke="#f08a80" strokeWidth="1.6" />
        <rect x="9.4" y="14.2" width="2.4" height="2.6" fill="#e03228" stroke="#262626" strokeWidth="0.8" />
        <rect x="12.2" y="14.2" width="2.4" height="2.6" fill="#e03228" stroke="#262626" strokeWidth="0.8" />
      </>
    ),
  },
  {
    id: 'sop.mirror',
    label: 'Mirror / Symmetrize',
    family: 'sop',
    description:
      'Orange panel and light grey panel facing each other across a dashed white mirror axis.',
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
    id: 'sop.polybevel',
    label: 'PolyBevel',
    family: 'sop',
    description:
      'Yellow cube with chamfered edges: lighter bevel strips along the front edges and a rounded silhouette.',
    types: ['polybevel'],
    refKey: 'SOP_polybevel-3.0',
    render: () => (
      <>
        <polygon points="12,3 19,6.5 12,10 5,6.5" fill="#ffe47a" />
        <polygon points="5,6.5 12,10 12,11.8 4,7.8" fill="#fff3b8" />
        <polygon points="19,6.5 12,10 12,11.8 20,7.8" fill="#f7d35a" />
        <polygon points="4,7.8 12,11.8 12,20.5 4,16.5" fill="#f2c438" />
        <polygon points="20,7.8 12,11.8 12,20.5 20,16.5" fill="#d49a18" />
        <polygon points="10.6,11.1 12,11.8 12,20.5 10.6,19.8" fill="#f9dc6e" />
        {/* Bevel seams */}
        <path d="M5 6.5L12 10L19 6.5M12 10V11.8M4 7.8L12 11.8L20 7.8M10.6 11.1V19.8M12 11.8V20.5" fill="none" stroke="#8a6a10" strokeWidth="0.7" />
        {/* Silhouette */}
        <path d="M12 3L19 6.5L20 7.8V16.5L12 20.5L4 16.5V7.8L5 6.5Z" fill="none" stroke="#262626" strokeWidth="1.3" strokeLinejoin="round" />
      </>
    ),
  },
  {
    id: 'sop.polyextrude',
    label: 'PolyExtrude',
    family: 'sop',
    description:
      'Yellow cube whose right face is pushed outward into a prism, with a red arrow showing the extrusion direction.',
    types: ['polyextrude'],
    refKey: 'SOP_polyextrude-2.0',
    render: () => (
      <>
        <g stroke="#262626" strokeWidth="1.1" strokeLinejoin="round">
          <polygon points="10,3 17,6.5 10,10 3,6.5" fill="#ffe47a" />
          <polygon points="3,6.5 10,10 10,18.5 3,15" fill="#f2c438" />
          <polygon points="17,6.5 20,8 13,11.5 10,10" fill="#fff0a0" />
          <polygon points="10,10 13,11.5 13,20 10,18.5" fill="#e8b52c" />
          <polygon points="20,8 13,11.5 13,20 20,16.5" fill="#d49a18" />
        </g>
        <line x1="16.8" y1="14.4" x2="19.7" y2="18.7" stroke="#262626" strokeWidth="3.4" strokeLinecap="round" />
        <line x1="16.8" y1="14.4" x2="19.7" y2="18.7" stroke="#e03228" strokeWidth="2" strokeLinecap="round" />
        <polygon points="21.8,21.3 21.4,17.3 18,20.1" fill="#e03228" stroke="#262626" strokeWidth="0.9" strokeLinejoin="round" />
      </>
    ),
  },
  {
    id: 'sop.polyframe',
    label: 'PolyFrame',
    family: 'sop',
    description:
      'Orange triangle with short green, red and blue tangent-frame axes at its corners.',
    types: ['polyframe'],
    refKey: 'SOP_polyframe',
    render: () => (
      <>
        <polygon points="12,5 20,17 5,19" fill="#ee8624" stroke="#262626" strokeWidth="1.2" />
        <path d="M12,5V1.5M12,5L15.5,5" stroke="#52d638" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M5,19V15M5,19L2,21" stroke="#e03828" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M20,17L22.5,14.5M20,17V20.5" stroke="#3888f0" strokeWidth="1.8" strokeLinecap="round" />
      </>
    ),
  },
  {
    id: 'sop.polypath',
    label: 'PolyPath',
    family: 'sop',
    description:
      'Red curve and blue curve joined at a yellow point, with small black vertex squares along both.',
    types: ['polypath'],
    refKey: 'SOP_polypath',
    render: () => (
      <>
        <path d="M4.5 17C2.5 11 6 4 10 3.5" fill="none" stroke="#e03228" strokeWidth="2" strokeLinecap="round" />
        <path d="M11.3 9.8C16 7 19.5 5.5 18.5 11C17.5 15 13.5 16 16 21" fill="none" stroke="#2e74c4" strokeWidth="2" strokeLinecap="round" />
        <path d="M10 3.5C11.5 5 11.6 7.5 11.3 9.8" fill="none" stroke="#e03228" strokeWidth="2" strokeLinecap="round" />
        <circle cx="11.3" cy="9.8" r="2" fill="#ffe030" stroke="#262626" strokeWidth="0.9" />
        {[
          [4.5, 17],
          [3.6, 10.5],
          [6.5, 5.2],
          [10, 3.5],
          [18.6, 8.3],
          [17.7, 14],
          [16, 21],
        ].map(([cx, cy]) => (
          <rect key={`${cx}-${cy}`} x={cx - 1.3} y={cy - 1.3} width="2.6" height="2.6" fill="#1e1e1e" stroke="#f2f4f7" strokeWidth="0.7" />
        ))}
      </>
    ),
  },
  {
    id: 'sop.reverse',
    label: 'Reverse',
    family: 'sop',
    description:
      'Orange diamond inside two white circular arrows pointing in opposite directions.',
    types: ['reverse'],
    refKey: 'SOP_reverse',
    render: () => (
      <>
        <polygon points="12,7 17,12 12,17 7,12" fill="#ee8624" stroke="#262626" strokeWidth="1.1" />
        <path d="M5,10 A7.5,7.5 0 0 1 18,7 M19,14 A7.5,7.5 0 0 1 6,17" fill="none" stroke="#f0f2f5" strokeWidth="2.3" strokeLinecap="round" />
        <polygon points="19.5,9 15.5,7.5 18.5,4.5" fill="#f0f2f5" />
        <polygon points="4.5,15 8.5,16.5 5.5,19.5" fill="#f0f2f5" />
      </>
    ),
  },
  {
    id: 'sop.shrinkwrap',
    label: 'Shrinkwrap',
    family: 'sop',
    description:
      'Glassy blue-grey teapot tightly enclosed by a red convex hull outline.',
    types: ['shrinkwrap'],
    refKey: 'SOP_shrinkwrap-2.0',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-pot`} cx="38%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#b8c8dc" />
            <stop offset="100%" stopColor="#6f8199" />
          </radialGradient>
        </defs>
        {/* Handle */}
        <path d="M17.3 11.5C20 11 20.5 15 17 16.5" fill="none" stroke="#262626" strokeWidth="2.8" strokeLinecap="round" />
        <path d="M17.3 11.5C20 11 20.5 15 17 16.5" fill="none" stroke="#b8c8dc" strokeWidth="1.4" strokeLinecap="round" />
        {/* Spout */}
        <path d="M7 13C4.5 12.5 4 10.5 3 9.5L4.2 8.8C5.5 10 6.2 11 7.4 11.4Z" fill={`url(#${uid}-pot)`} stroke="#262626" strokeWidth="1" strokeLinejoin="round" />
        {/* Body and lid */}
        <ellipse cx="12" cy="14" rx="5.5" ry="4.5" fill={`url(#${uid}-pot)`} stroke="#262626" strokeWidth="1.1" />
        <ellipse cx="12" cy="9.6" rx="3" ry="1" fill="#dfe4ea" stroke="#262626" strokeWidth="0.9" />
        <circle cx="12" cy="8.4" r="0.9" fill="#dfe4ea" stroke="#262626" strokeWidth="0.8" />
        {/* Shrinkwrap hull */}
        <polygon
          points="2.2,9 9,7.3 15,7.3 20.5,11 20,16 16,19.2 8,19.2 4.5,16"
          fill="none"
          stroke="#e03228"
          strokeWidth="1.6"
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
  {
    id: 'sop.subdivide',
    label: 'Subdivide',
    family: 'sop',
    description:
      'Smooth grey blob with subdivision mesh lines, inside a red box-shaped control cage.',
    types: ['subdivide'],
    refKey: 'SOP_subdivide',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-blob`} cx="38%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#c0c7d1" />
            <stop offset="100%" stopColor="#6f7782" />
          </radialGradient>
        </defs>
        <path
          d="M5 11.5C5 7.5 19 7.5 19 11.5C19 16 15.5 18.5 12 18.5C8.5 18.5 5 16 5 11.5Z"
          fill={`url(#${uid}-blob)`}
          stroke="#262626"
          strokeWidth="1.1"
        />
        <path
          d="M5.3 12.5C9 14 15 14 18.7 12.5M12 8.5C10.8 11.5 10.8 15 12 18.5M8 9C7 11.8 7.5 15.5 9 17.6M16 9C17 11.8 16.5 15.5 15 17.6"
          fill="none"
          stroke="#5a616b"
          strokeWidth="0.7"
        />
        <path
          d="M3 8L12 3.5L21 8L12 12.5ZM3 8V16L12 20.5L21 16V8M12 12.5V20.5"
          fill="none"
          stroke="#e03228"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    id: 'sop.sweep',
    label: 'Sweep',
    family: 'sop',
    description:
      'Closed kidney-shaped profile (red outline, dark interior) swept downward into a smooth shaded grey wall, with a red seam line on the front.',
    types: ['sweep'],
    refKey: 'SOP_sweep-2.0',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-wall`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f4f6f9" />
            <stop offset="30%" stopColor="#9aa2ae" />
            <stop offset="55%" stopColor="#c8d0da" />
            <stop offset="80%" stopColor="#b8c0cc" />
            <stop offset="100%" stopColor="#7a828e" />
          </linearGradient>
          <linearGradient id={`${uid}-inside`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#4a5568" />
            <stop offset="100%" stopColor="#e4e8ee" />
          </linearGradient>
        </defs>
        {/* Swept wall (front half of the profile pushed down) */}
        <path
          d="M21 4.6C21 7 16.5 6.8 13.5 7.8C10.5 8.8 8.5 11 5.5 11C3.6 11 2.5 9.6 2.5 7.5L2.5 18C2.5 20.1 3.6 21.5 5.5 21.5C8.5 21.5 10.5 19.3 13.5 18.3C16.5 17.3 21 17.5 21 15.1Z"
          fill={`url(#${uid}-wall)`}
          stroke="#262626"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        {/* Profile curve seen from above (open top, dark inside) */}
        <path
          d="M2.5 7.5C2.5 3.8 11 1.8 17 2.2C19.5 2.4 21 3.2 21 4.6C21 7 16.5 6.8 13.5 7.8C10.5 8.8 8.5 11 5.5 11C3.6 11 2.5 9.6 2.5 7.5Z"
          fill={`url(#${uid}-inside)`}
          stroke="#e03228"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        {/* Front seam */}
        <path d="M5.5 11V21.5" stroke="#e03228" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
  },
  {
    id: 'sop.topobuild',
    label: 'TopoBuild',
    family: 'sop',
    description:
      'Clean blue-outlined quad cage (new topology) placed over a pink high-resolution sculpt.',
    types: ['topobuild'],
    refKey: 'SOP_topobuild',
    render: () => (
      <>
        {/* High-res sculpt */}
        <path
          d="M6 9C8 4 13 3.5 16 5C19 3.5 22.5 7 21.5 11C22.5 14.5 19 17.5 15.5 16.5C12 18 7.5 16 6 13Z"
          fill="#f3dede"
          stroke="#c04848"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        <path d="M13 5.5C15 8 15 12 13.5 16.5M17.5 5C19 8 19.5 12 18 16.2M8 7.5C12 9 17 9 21.5 9.5M7 12.5C11 13.5 16 13.5 21.8 13" fill="none" stroke="#e07a7a" strokeWidth="0.6" />
        {/* New quad topology cage */}
        <g stroke="#1d3c5e" strokeWidth="1.1" strokeLinejoin="round">
          <polygon points="2.5,10 8.5,7 13,9.5 7,12.5" fill="#eef2f7" />
          <polygon points="2.5,10 7,12.5 7,19.5 2.5,17" fill="#dfe4ea" />
          <polygon points="7,12.5 13,9.5 13,16.5 7,19.5" fill="#c0c7d1" />
        </g>
        <path
          d="M5.5 8.5L10 11M4.75 11.25L10.75 8.25M4.75 11.25V18.25M2.5 13.5L7 16M10 11V18M7 16L13 13"
          fill="none"
          stroke="#2e5a8c"
          strokeWidth="0.8"
        />
      </>
    ),
  },
];
