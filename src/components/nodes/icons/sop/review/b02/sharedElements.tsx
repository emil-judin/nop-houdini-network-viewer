import React from 'react';
import { gearPath, pts, type Pt } from '../../../geoHelpers';

/**
 * Shared dark-core to glowing-violet radial gradient for the Implicit Surface icon family.
 */
export const ImplicitCoreDefs: React.FC<{ id: string }> = ({ id }) => (
  <defs>
    <radialGradient id={id} cx="38%" cy="48%" r="62%">
      <stop offset="0%" stopColor="#14141c" />
      <stop offset="52%" stopColor="#281c3c" />
      <stop offset="84%" stopColor="#7a4ec8" />
      <stop offset="100%" stopColor="#c8a2ff" />
    </radialGradient>
  </defs>
);

/**
 * Implicit Surface cutaway sphere: dark violet implicit core with a blue-grey outer shell on the
 * left and a white zero-contour along the cut. Same geometry and colors as the approved Batch 1
 * `sop.implicitsurface` sphere, scaled to radius `r` around `(cx, cy)`.
 */
export const ImplicitCutawaySphere: React.FC<{ uid: string; cx: number; cy: number; r: number }> = ({
  uid,
  cx,
  cy,
  r,
}) => {
  const s = r / 8.2;
  return (
    <>
      <ImplicitCoreDefs id={`${uid}-isk-core`} />
      <defs>
        <radialGradient id={`${uid}-isk-shell`} cx="32%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#5a82b8" />
          <stop offset="100%" stopColor="#263248" />
        </radialGradient>
      </defs>
      <g transform={`translate(${cx} ${cy}) scale(${s}) translate(-12 -12)`} strokeLinejoin="round">
        <circle cx="12" cy="12" r="8.2" fill={`url(#${uid}-isk-core)`} stroke="#262626" strokeWidth={1.15 / s} />
        <path
          d="M12,3.8 A8.2,8.2 0 0,0 12,20.2 C9.2,17.5 9.2,6.5 12,3.8 Z"
          fill={`url(#${uid}-isk-shell)`}
          stroke="#262626"
          strokeWidth={1.1 / s}
        />
        <path
          d="M12,4.2 C9.5,6.8 9.5,17.2 12,19.8"
          fill="none"
          stroke="#eef2f7"
          strokeWidth={1.1 / s}
          strokeLinecap="round"
        />
      </g>
    </>
  );
};

/**
 * Shared golden-tan flexed muscular arm used across the Pose-Space Deform and Edit icons.
 * Matches the silhouette and shading of the approved Pose-Space Deform Combine drawing.
 */
export const PoseSpaceArmBase: React.FC<{ uid: string; shiftX?: number }> = ({
  uid,
  shiftX = 0,
}) => (
  <>
    <defs>
      <radialGradient id={`${uid}-ps-arm`} cx="45%" cy="45%" r="55%">
        <stop offset="0%" stopColor="#ffddaa" />
        <stop offset="60%" stopColor="#e9b96e" />
        <stop offset="100%" stopColor="#955d03" />
      </radialGradient>
    </defs>
    <path
      transform={shiftX ? `translate(${shiftX}, 0)` : undefined}
      d="M9.8,2.2 C12.4,1.8 15,3 15.2,5.2 C15.2,7.2 13.4,8.5 11.2,8.2 C9.8,8 8.8,7.2 8.4,6.2 C7.6,7.2 7.6,10.2 8.4,13.2 C9.8,11.8 12.4,11.6 15,12.5 C18,13.6 19.2,16.4 17.8,19.4 C13.8,21.8 9.1,21.8 6.1,19.8 C3.2,19.4 1.6,18.2 1.6,15.8 C1.6,12.5 3.4,8.2 6,3.8 C7,2.6 8.4,2.4 9.8,2.2 Z"
      fill={`url(#${uid}-ps-arm)`}
      stroke="#6c4402"
      strokeWidth="0.95"
      strokeLinejoin="round"
    />
  </>
);

/**
 * Shared lower-right dark circular action badge used by Pose-Space Deform Combine, Edit, and
 * Edit Configure.
 */
export const PoseSpaceBadgeFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <g>
    <circle cx="16.5" cy="14.8" r="4.8" fill="#1a1a1a" stroke="#eeeeec" strokeWidth="1" />
    {children}
  </g>
);

/** Pack Folder family: purple folder back, white front sheet and orange block arrow (points into the folder). */
export const FOLDER_BACK_PATH = 'M3,6.8 L8.4,5.6 L9.8,6.8 L16.8,5.2 L18,18.2 L4.2,21.6 Z';
export const FOLDER_SHEET_POINTS = '4.2,21.6 5.6,11.6 19.2,8 18,18.2';
export const FOLDER_ARROW_POINTS = '7,3.4 10.6,7 13.4,4.4 13.4,12.6 5.6,12.6 8.6,9.8 5,6.2';

/**
 * Floor of the open suitcase opening (front-left, back-left, back-right, front-right corners).
 * Use with `quadPt(SUITCASE_FLOOR, depth, along)` to stand contents inside the case: `depth` runs
 * from the front wall (0) to the hinge (1), `along` from the left end (0) to the right end (1).
 */
export const SUITCASE_FLOOR: readonly [Pt, Pt, Pt, Pt] = [
  [2, 13.2],
  [5.4, 10.6],
  [20.8, 10.6],
  [17.4, 13.2],
];

/**
 * Open hinged suitcase seen from the front and slightly above, shared by Pack, Pack Points,
 * Packed Properties and Repack: a tan lid hinged on the back edge and leaning back (dark brown
 * lining facing the viewer), a grey opening, a tan front wall with a silver carry handle hanging
 * below it and a darker narrow side wall on the right. `children` are drawn inside the opening,
 * in front of the lid and behind the walls, so contents look packed into the case.
 */
export const OpenSuitcase: React.FC<{
  uid: string;
  children?: React.ReactNode;
  transform?: string;
  /** Multiplies every stroke width; pass `1 / scale` when `transform` shrinks the case. */
  lineScale?: number;
}> = ({ uid, children, transform, lineScale = 1 }) => {
  const k = lineScale;
  const [fl, bl, br, fr] = SUITCASE_FLOOR;
  const h = 5.4;
  const lidTop: Pt[] = [
    [bl[0] + 0.6, 2.2],
    [br[0] + 0.6, 2.2],
  ];
  const front = `M${pts([fl])} L${pts([fr])} L${fr[0]},${fr[1] + h - 1.6} Q${fr[0]},${fr[1] + h} ${fr[0] - 1.6},${fr[1] + h} L${fl[0] + 1.6},${fl[1] + h} Q${fl[0]},${fl[1] + h} ${fl[0]},${fl[1] + h - 1.6} Z`;
  const side = `M${pts([fr])} L${pts([br])} L${br[0]},${br[1] + h - 1.8} Q${br[0]},${br[1] + h - 0.8} ${br[0] - 0.9},${br[1] + h - 0.1} L${fr[0]},${fr[1] + h - 0.1} Z`;
  const lid = `M${pts([bl])} L${lidTop[0][0]},${lidTop[0][1] + 1.4} Q${pts([lidTop[0]])} ${lidTop[0][0] + 1.4},${lidTop[0][1]} L${lidTop[1][0] - 1.4},${lidTop[1][1]} Q${pts([lidTop[1]])} ${lidTop[1][0]},${lidTop[1][1] + 1.4} L${pts([br])} Z`;
  const yb = fl[1] + h;
  const handle = `M8,${yb - 0.6} L8,${yb + 1.2} Q8,${yb + 2.2} 9,${yb + 2.2} L11.4,${yb + 2.2} Q12.4,${yb + 2.2} 12.4,${yb + 1.2} L12.4,${yb - 0.6}`;
  return (
    <g transform={transform} strokeLinejoin="round">
      <defs>
        <linearGradient id={`${uid}-case-lining`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4e3410" />
          <stop offset="100%" stopColor="#a8783c" />
        </linearGradient>
        <linearGradient id={`${uid}-case-cavity`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5a616b" />
          <stop offset="100%" stopColor="#eef2f7" />
        </linearGradient>
        <linearGradient id={`${uid}-case-front`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e8c48a" />
          <stop offset="100%" stopColor="#a8783c" />
        </linearGradient>
      </defs>
      {/* Lid leaning back on the hinge, lining facing the viewer */}
      <path d={lid} fill="#c89a5a" stroke="#262626" strokeWidth={1.1 * k} />
      <polygon
        points={pts([
          [bl[0] + 1.1, bl[1] - 0.2],
          [lidTop[0][0] + 1.2, lidTop[0][1] + 1.3],
          [lidTop[1][0] - 1.2, lidTop[1][1] + 1.3],
          [br[0] - 1.1, br[1] - 0.2],
        ])}
        fill={`url(#${uid}-case-lining)`}
        stroke="#262626"
        strokeWidth={0.6 * k}
      />
      {/* Opening */}
      <polygon points={pts([fl, bl, br, fr])} fill={`url(#${uid}-case-cavity)`} stroke="#262626" strokeWidth={0.8 * k} />
      {children}
      {/* Narrow side wall and the front wall with a seam line */}
      <path d={side} fill="#a8783c" stroke="#262626" strokeWidth={1.1 * k} />
      <path d={front} fill={`url(#${uid}-case-front)`} stroke="#262626" strokeWidth={1.1 * k} />
      <path d={`M${fl[0] + 0.6},${fl[1] + 1.4} L${fr[0] - 0.6},${fr[1] + 1.4}`} stroke="#7e5828" strokeWidth={0.6 * k} />
      {/* Carry handle: cased silver loop */}
      <path d={handle} fill="none" stroke="#262626" strokeWidth={2.4 * k} strokeLinecap="round" />
      <path d={handle} fill="none" stroke="#eef2f7" strokeWidth={1.05 * k} strokeLinecap="round" />
    </g>
  );
};

/**
 * Metallic settings gear (twelve teeth, light upper-left sheen, dark axle hole) shared by Packed
 * Properties and Packed Disk Properties.
 */
export const MetallicGear: React.FC<{ uid: string; cx: number; cy: number; r?: number }> = ({
  uid,
  cx,
  cy,
  r = 6,
}) => (
  <g strokeLinejoin="round">
    <defs>
      <radialGradient id={`${uid}-gear`} cx="35%" cy="30%" r="75%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="55%" stopColor="#c0c7d1" />
        <stop offset="100%" stopColor="#5a616b" />
      </radialGradient>
    </defs>
    <path d={gearPath(cx, cy, 12, r, r * 0.76)} fill={`url(#${uid}-gear)`} stroke="#262626" strokeWidth="1" />
    <circle cx={cx} cy={cy} r={r * 0.5} fill="none" stroke="#89929e" strokeWidth="0.7" />
    <circle cx={cx} cy={cy} r={r * 0.3} fill="#3a3f47" stroke="#262626" strokeWidth="0.8" />
  </g>
);

/**
 * Red-handled silver scissors shared by PolyCut and PolySplit. Drawn open with the pivot at the
 * origin, blades pointing up and the red finger loops below; place it with `transform`.
 */
export const Scissors: React.FC<{ transform: string }> = ({ transform }) => (
  <g transform={transform} strokeLinejoin="round" strokeLinecap="round">
    {/* Red shanks and finger loops (cased) */}
    <g fill="none">
      <path d="M1,1.4 L2.6,4.4 M-1,1.4 L-2.6,4.4" stroke="#262626" strokeWidth="2.8" />
      <ellipse cx="3.6" cy="6.6" rx="2.5" ry="2" transform="rotate(62 3.6 6.6)" stroke="#262626" strokeWidth="2.8" />
      <ellipse cx="-3.6" cy="6.6" rx="2.5" ry="2" transform="rotate(-62 -3.6 6.6)" stroke="#262626" strokeWidth="2.8" />
      <path d="M1,1.4 L2.6,4.4 M-1,1.4 L-2.6,4.4" stroke="#e03228" strokeWidth="1.5" />
      <ellipse cx="3.6" cy="6.6" rx="2.5" ry="2" transform="rotate(62 3.6 6.6)" stroke="#e03228" strokeWidth="1.5" />
      <ellipse cx="-3.6" cy="6.6" rx="2.5" ry="2" transform="rotate(-62 -3.6 6.6)" stroke="#e03228" strokeWidth="1.5" />
    </g>
    {/* Silver blades crossing at the pivot */}
    <polygon points="-2.2,1.7 1.1,-6.7 3.2,-10.2 2.5,-6.1 -0.6,2.3" fill="#c0c7d1" stroke="#262626" strokeWidth="0.9" />
    <polygon points="2.2,1.7 -1.1,-6.7 -3.2,-10.2 -2.5,-6.1 0.6,2.3" fill="#eef2f7" stroke="#262626" strokeWidth="0.9" />
    <circle cx="0" cy="0" r="0.75" fill="#5a616b" stroke="#262626" strokeWidth="0.5" />
  </g>
);

/** Fill colors of an isometric cube: lit top, mid left, shadowed right. */
export interface IsoCubeColors {
  top: string;
  left: string;
  right: string;
}

/**
 * Isometric cube (2:1 projection) with its top vertex at `(x, y)`, half width `w` and wall height
 * `h`. Optional per-face decorations are clipped to their face, so patterns wrap cleanly.
 */
export const IsoCube: React.FC<{
  uid: string;
  name: string;
  x: number;
  y: number;
  w: number;
  h: number;
  colors: IsoCubeColors;
  decor?: { top?: React.ReactNode; left?: React.ReactNode; right?: React.ReactNode };
  strokeWidth?: number;
}> = ({ uid, name, x, y, w, h, colors, decor, strokeWidth = 1 }) => {
  const top: Pt[] = [
    [x, y],
    [x + w, y + w / 2],
    [x, y + w],
    [x - w, y + w / 2],
  ];
  const left: Pt[] = [
    [x - w, y + w / 2],
    [x, y + w],
    [x, y + w + h],
    [x - w, y + w / 2 + h],
  ];
  const right: Pt[] = [
    [x, y + w],
    [x + w, y + w / 2],
    [x + w, y + w / 2 + h],
    [x, y + w + h],
  ];
  const faces = [
    { key: 't', p: top, fill: colors.top, d: decor?.top },
    { key: 'l', p: left, fill: colors.left, d: decor?.left },
    { key: 'r', p: right, fill: colors.right, d: decor?.right },
  ];
  return (
    <g strokeLinejoin="round">
      <defs>
        {faces
          .filter((f) => f.d)
          .map((f) => (
            <clipPath key={f.key} id={`${uid}-${name}-${f.key}`}>
              <polygon points={pts(f.p)} />
            </clipPath>
          ))}
      </defs>
      {faces.map((f) => (
        <React.Fragment key={f.key}>
          <polygon points={pts(f.p)} fill={f.fill} />
          {f.d ? <g clipPath={`url(#${uid}-${name}-${f.key})`}>{f.d}</g> : null}
          <polygon points={pts(f.p)} fill="none" stroke="#262626" strokeWidth={strokeWidth} />
        </React.Fragment>
      ))}
    </g>
  );
};

/**
 * Wavy tiger stripes in a unit square: S-curved bands with pointed ends that either cross the
 * whole face, hang from the top edge or rise from the bottom edge. Map the square onto a cube
 * face with a `matrix(...)` transform.
 */
const tigerFlames = (count: number, phase: number): string => {
  const p = (n: number) => Math.round(n * 1000) / 1000;
  const parts: string[] = [];
  for (let i = 0; i < count; i += 1) {
    // 0: full height, 1: hanging from the top edge, 2: rising from the bottom edge
    const kind = (i + phase) % 3;
    const y0 = kind === 2 ? 0.28 : -0.14;
    const y1 = kind === 1 ? 0.74 : 1.14;
    const len = y1 - y0;
    const sc = (i + 0.5) / count;
    const bw = 0.52 / count;
    const wob = (i % 2 === 0 ? 1 : -1) * 0.08;
    const a = y0 + len / 3;
    const b = y0 + (2 * len) / 3;
    parts.push(
      `M${p(sc)},${p(y0)} C${p(sc - bw + wob)},${p(a)} ${p(sc - bw - wob)},${p(b)} ${p(sc + wob * 0.5)},${p(y1)} C${p(sc + bw - wob)},${p(b)} ${p(sc + bw + wob)},${p(a)} ${p(sc)},${p(y0)} Z`,
    );
  }
  return parts.join(' ');
};

/**
 * Amber-orange isometric cube with bold black tapered tiger stripes wrapping all three faces,
 * shared by Material and Material Network. Same parameters as `IsoCube`.
 */
export const TigerCube: React.FC<{ uid: string; name: string; x: number; y: number; w: number; h: number }> = ({
  uid,
  name,
  x,
  y,
  w,
  h,
}) => {
  const stripes = (matrix: string, count: number, phase: number) => (
    <path transform={`matrix(${matrix})`} d={tigerFlames(count, phase)} fill="#262626" />
  );
  return (
    <IsoCube
      uid={uid}
      name={name}
      x={x}
      y={y}
      w={w}
      h={h}
      colors={{ top: '#ffb066', left: '#ee8624', right: '#c25e12' }}
      decor={{
        top: stripes(`${w} ${-w / 2} ${w} ${w / 2} ${x - w} ${y + w / 2}`, 4, 0),
        left: stripes(`${w} ${w / 2} 0 ${h} ${x - w} ${y + w / 2}`, 5, 0),
        right: stripes(`${w} ${-w / 2} 0 ${h} ${x} ${y + w}`, 5, 1),
      }}
    />
  );
};

/**
 * Grey packed-primitive tray (an open isometric case with a dark recessed top and vented front
 * walls) shared by Merge Packed, Pack Inject and Packed Disk Properties. Centered on `(cx, cy)`
 * at half width `w`.
 */
export const PackedTray: React.FC<{ uid: string; name: string; cx: number; cy: number; w: number; children?: React.ReactNode }> = ({
  uid,
  name,
  cx,
  cy,
  w,
  children,
}) => {
  const hw = w / 2;
  const d = w * 0.42;
  const top: Pt[] = [
    [cx - w, cy],
    [cx, cy - hw],
    [cx + w, cy],
    [cx, cy + hw],
  ];
  const k = 0.76;
  const inner: Pt[] = top.map(([px, py]) => [cx + (px - cx) * k, cy + (py - cy) * k + 0.25]);
  const left: Pt[] = [
    [cx - w, cy],
    [cx, cy + hw],
    [cx, cy + hw + d],
    [cx - w, cy + d],
  ];
  const right: Pt[] = [
    [cx, cy + hw],
    [cx + w, cy],
    [cx + w, cy + d],
    [cx, cy + hw + d],
  ];
  // Vent slots on the front walls follow the 2:1 slope.
  const slot = (x0: number, x1: number, slope: number, yAt: number) =>
    `M${x0},${yAt + (x0 - cx) * slope} L${x1},${yAt + (x1 - cx) * slope}`;
  const midY = cy + hw + d * 0.5;
  return (
    <g strokeLinejoin="round">
      <defs>
        <linearGradient id={`${uid}-${name}-well`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#89929e" />
          <stop offset="100%" stopColor="#eef2f7" />
        </linearGradient>
      </defs>
      <polygon points={pts(left)} fill="#c0c7d1" stroke="#262626" strokeWidth="0.85" />
      <polygon points={pts(right)} fill="#89929e" stroke="#262626" strokeWidth="0.85" />
      <polygon points={pts(top)} fill="#eef2f7" stroke="#262626" strokeWidth="0.85" />
      <polygon points={pts(inner)} fill={`url(#${uid}-${name}-well)`} stroke="#262626" strokeWidth="0.6" />
      <path
        d={`${slot(cx - w * 0.85, cx - w * 0.45, 0.5, midY)} ${slot(cx + w * 0.3, cx + w * 0.8, -0.5, midY)}`}
        stroke="#3a3f47"
        strokeWidth="0.7"
        strokeLinecap="round"
      />
      {children}
    </g>
  );
};
