import { CasedStroke } from '../../geoKits';
import type { OperatorIconDef } from '../../iconTypes';
import { CaptureArmBase, DiagonalBone } from '../kits/bone';

/**
 * Bone and capture.
 * Shared kits: `CaptureArmBase` (reusing the approved `sop.capture` arm and bone diamond)
 * and `DiagonalBone` (shared by `sop.bonelink` and `sop.bonecapturelines`).
 */

const OUTLINE = '#262626';

const GREY_TOP = '#eef2f7';

const GREY_LEFT = '#c0c7d1';

const GREY_RIGHT = '#89929e';

const WHITE = '#ffffff';

const PAPER = '#f2f4f7';

const ORANGE_LIT = '#ffb066';

const ORANGE_MID = '#ee8624';

const ORANGE_DARK = '#c25e12';

const GREEN_LIT = '#8ee878';

const GREEN_MID = '#58c848';

const GREEN_DARK = '#3da834';

const RED_LIT = '#ff7066';

const RED_MID = '#e03228';

const YELLOW_LIT = '#ffe47a';

const YELLOW_MID = '#f2c438';

const BLUE_LIT = '#5aa2f2';

const BLUE_DARK = '#3672c4';

/** Five-fingered forearm-and-hand silhouette path matching the reference arm proportions. */
const CAPTURE_ARM_PATH =
  'M18.4,2.1 L21.7,5.4 L16.5,11.1 L11.7,15.7 L10.7,19.8 L9.4,20.1 L9.5,16.7 L7.5,21.2 L6.0,20.5 L7.6,16.8 L4.7,19.9 L3.6,18.9 L6.6,15.8 L3.2,17.2 L2.6,15.8 L6.6,14.1 L3.8,13.5 L4.2,12.1 L8.6,12.7 L13.1,7.5 Z';

/**
 * Bone, capture and skinning operators.
 */
export const BONE_CAPTURE_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.bonecapturebiharmonic',
    label: 'Bone Capture Biharmonic',
    family: 'sop',
    description: 'Green wireframe-meshed arm and five-fingered hand containing two white-and-blue bone diamonds.',
    types: ['bonecapturebiharmonic'],
    icons: ['sop_bonecapturebiharmonic'],
    refKey: 'SOP_bonecapturebiharmonic',
    render: () => (
      <CaptureArmBase armFill={GREEN_LIT} outlineWidth={0.95} boneLight={WHITE} boneStrokeWidth={0.65}>
        <path
          d="M18.4,2.1 L17.0,6.5 L21.7,5.4 M17.0,6.5 L13.1,7.5 L16.5,11.1 M13.1,7.5 L11.4,11.4 L16.5,11.1 M11.4,11.4 L8.6,12.7 L11.7,15.7"
          fill="none"
          stroke={GREEN_MID}
          strokeWidth="0.7"
        />
        <path d={CAPTURE_ARM_PATH} fill="none" stroke={OUTLINE} strokeWidth="0.95" />
      </CaptureArmBase>
    ),
  },
  {
    id: 'sop.bonecapturelines',
    label: 'Bone Capture Lines',
    family: 'sop',
    description:
      'Diagonal three-tone bone with symmetric knuckle ends inside a cased red capsule wireframe, red axis line, and two joint dots.',
    types: ['bonecapturelines'],
    icons: ['sop_bonecapturelines'],
    refKey: 'SOP_bonecapturelines',
    render: () => (
      <>
        <CasedStroke d="M14.5,3.1 L3.8,13.8 M20.9,9.5 L10.2,20.2" color={RED_LIT} width={0.95} casing={1.35} />
        <g fill="none">
          <circle cx="17.7" cy="6.3" r="4.2" stroke={OUTLINE} strokeWidth="1.35" />
          <circle cx="17.7" cy="6.3" r="4.2" stroke={RED_LIT} strokeWidth="0.95" />
          <circle cx="6.3" cy="17.7" r="4.2" stroke={OUTLINE} strokeWidth="1.35" />
          <circle cx="6.3" cy="17.7" r="4.2" stroke={RED_LIT} strokeWidth="0.95" />
        </g>
        <DiagonalBone scale={0.96} />
        <line x1="6.3" y1="17.7" x2="17.7" y2="6.3" stroke={RED_MID} strokeWidth="0.95" strokeLinecap="round" />
        <circle cx="17.7" cy="6.3" r="1.3" fill={RED_MID} stroke={OUTLINE} strokeWidth="0.7" />
        <circle cx="6.3" cy="17.7" r="1.3" fill={RED_MID} stroke={OUTLINE} strokeWidth="0.7" />
      </>
    ),
  },
  {
    id: 'sop.bonedeform',
    label: 'Bone Deform',
    family: 'sop',
    description:
      'Regularly bent green cylinder swept along a smooth circular arc with a pale-grey elliptical top opening.',
    types: ['bonedeform', 'jointdeform'],
    icons: ['sop_bonedeform', 'sop_kinefx-jointdeform'],
    refKey: 'SOP_bonedeform',
    render: () => (
      <g strokeLinejoin="round">
        <path
          d="M6.65,9.29 A15.5,15.5 0 0,1 10.5,19.5 Q14.5,21.4 18.5,19.5 A23.5,23.5 0 0,0 12.67,4.01 Z"
          fill={GREEN_MID}
          stroke={OUTLINE}
          strokeWidth="1.15"
        />
        <path
          d="M7.3,8.6 A16.5,16.5 0 0,1 11.4,19.6 L13.8,20.2 A19.0,19.0 0 0,0 9.4,7.0 Z"
          fill={GREEN_LIT}
          stroke="none"
        />
        <path
          d="M11.6,4.8 A22.0,22.0 0 0,1 17.2,19.8 L18.5,19.5 A23.5,23.5 0 0,0 12.67,4.01 Z"
          fill={GREEN_DARK}
          stroke="none"
        />
        <path
          d="M6.65,9.29 A15.5,15.5 0 0,1 10.5,19.5 Q14.5,21.4 18.5,19.5 A23.5,23.5 0 0,0 12.67,4.01 Z"
          fill="none"
          stroke={OUTLINE}
          strokeWidth="1.15"
        />
        <ellipse
          cx="9.66"
          cy="6.65"
          rx="4.2"
          ry="2.2"
          transform="rotate(-41 9.66 6.65)"
          fill={GREY_TOP}
          stroke={OUTLINE}
          strokeWidth="1.15"
        />
        <ellipse cx="9.8" cy="6.8" rx="2.8" ry="1.35" transform="rotate(-41 9.8 6.8)" fill={GREY_LEFT} stroke="none" />
      </g>
    ),
  },
  {
    id: 'sop.bonelink',
    label: 'Bone Link',
    family: 'sop',
    description: 'Single diagonal three-tone grey and white anatomical bone with symmetric two-lobed knuckle ends.',
    types: ['bonelink'],
    icons: ['sop_bonelink'],
    refKey: 'SOP_bonelink',
    render: () => <DiagonalBone />,
  },
  {
    id: 'sop.pointcapture',
    label: 'Point Capture',
    family: 'sop',
    description:
      'Curved orange limb dotted with yellow capture points and a blue three-joint skeleton chain down the front.',
    types: ['pointcapture'],
    icons: ['sop_pointcapture'],
    refKey: 'SOP_pointcapture',
    render: () => (
      <g strokeLinejoin="round">
        <path
          d="M6.4,5.4 C6.6,9.2 7.8,11.8 8.3,14.8 C8.8,17.5 9.8,19.8 12.6,20.2 C15.2,20.5 16.4,18.0 15.8,15.4 C15.2,12.8 16.6,9.8 17.8,5.4 Z"
          fill={ORANGE_MID}
          stroke={OUTLINE}
          strokeWidth="1.15"
        />
        <path
          d="M15.4,6.4 C14.5,10.0 13.5,12.8 14.1,15.6 C14.5,17.5 13.8,19.4 12.2,19.6 L14.4,19.4 C15.6,18.6 15.8,16.8 15.3,15.0 C14.8,12.6 16.0,9.8 17.1,6.2 Z"
          fill={ORANGE_DARK}
          stroke="none"
        />
        <path
          d="M6.4,5.4 C6.6,9.2 7.8,11.8 8.3,14.8 C8.8,17.5 9.8,19.8 12.6,20.2 C15.2,20.5 16.4,18.0 15.8,15.4 C15.2,12.8 16.6,9.8 17.8,5.4 Z"
          fill="none"
          stroke={OUTLINE}
          strokeWidth="1.15"
        />
        <ellipse cx="12.1" cy="5.4" rx="5.7" ry="2.2" fill={ORANGE_LIT} stroke={OUTLINE} strokeWidth="1.15" />
        <g fill={YELLOW_LIT} stroke="none">
          <circle cx="9.2" cy="9.2" r="0.85" />
          <circle cx="9.7" cy="11.8" r="0.85" />
          <circle cx="10.2" cy="14.4" r="0.85" />
          <circle cx="10.8" cy="17.0" r="0.85" />
          <circle cx="14.5" cy="9.0" r="0.85" />
          <circle cx="14.0" cy="11.6" r="0.85" />
          <circle cx="13.7" cy="14.3" r="0.85" />
          <circle cx="14.0" cy="17.0" r="0.85" />
        </g>
        <CasedStroke d="M12.0,6.0 L13.8,13.6 L11.4,20.8" color={BLUE_LIT} width={1.1} casing={2.1} />
        <g fill={BLUE_DARK} stroke={OUTLINE} strokeWidth="0.7">
          <circle cx="12.0" cy="6.0" r="1.25" />
          <circle cx="13.8" cy="13.6" r="1.25" />
          <circle cx="11.4" cy="20.8" r="1.25" />
        </g>
      </g>
    ),
  },
  {
    id: 'sop.weightarraybiharmonic',
    label: 'Weight Array Biharmonic',
    family: 'sop',
    description: 'Arched white perspective sheet marked with a grid of multicolored weight dots.',
    types: ['weightarraybiharmonic', 'weightarrayinterpolate'],
    icons: ['sop_weightarraybiharmonic', 'sop_weightarrayinterpolate'],
    refKey: 'SOP_weightarraybiharmonic',
    render: () => (
      <g strokeLinejoin="round">
        <path
          d="M2.6,17.2 Q12.0,13.8 21.4,17.2 L21.4,18.7 Q12.0,15.3 2.6,18.7 Z"
          fill={GREY_RIGHT}
          stroke={OUTLINE}
          strokeWidth="1.05"
        />
        <path
          d="M5.6,6.0 L18.4,6.0 L21.4,17.2 Q12.0,13.8 2.6,17.2 Z"
          fill={PAPER}
          stroke={OUTLINE}
          strokeWidth="1.15"
        />
        <path
          d="M4.6,9.7 Q12.0,8.2 19.4,9.7 M3.6,13.4 Q12.0,11.0 20.4,13.4 M8.8,6.0 L7.4,15.8 M12.0,6.0 L12.0,15.4 M15.2,6.0 L16.6,15.8"
          fill="none"
          stroke={GREY_RIGHT}
          strokeWidth="0.6"
        />
        <circle cx="7.4" cy="8.0" r="0.9" fill={YELLOW_MID} />
        <circle cx="10.4" cy="7.8" r="1.1" fill={ORANGE_MID} />
        <circle cx="13.6" cy="7.8" r="0.95" fill={GREEN_MID} />
        <circle cx="16.6" cy="8.0" r="0.9" fill={BLUE_LIT} />

        <circle cx="6.5" cy="11.2" r="1.0" fill={RED_MID} />
        <circle cx="9.8" cy="10.8" r="1.35" fill={YELLOW_MID} />
        <circle cx="13.7" cy="10.8" r="1.15" fill={BLUE_LIT} />
        <circle cx="17.3" cy="11.2" r="0.95" fill={GREEN_MID} />

        <circle cx="5.4" cy="14.5" r="0.95" fill={GREEN_MID} />
        <circle cx="9.2" cy="13.8" r="1.2" fill={RED_MID} />
        <circle cx="13.4" cy="13.8" r="1.1" fill={ORANGE_MID} />
        <circle cx="17.8" cy="14.4" r="1.05" fill={BLUE_DARK} />
      </g>
    ),
  },
  {
    id: 'sop.capture',
    label: 'Bone Capture',
    family: 'sop',
    description: 'Light orange forearm and five-fingered hand containing two white-and-blue bone diamonds.',
    types: ['capture'],
    icons: ['sop_capture'],
    refKey: 'SOP_capture',
    render: () => <CaptureArmBase armFill="#ffb066" outlineWidth={0.95} boneLight="#f2f4f7" boneStrokeWidth={0.65} />,
  },
  {
    id: 'sop.captureproximity',
    label: 'Bone Capture Proximity',
    family: 'sop',
    description: 'Nested grey capsule rings around a central bone, measured across by red dimension lines.',
    types: ['captureproximity', 'jointcaptureproximity'],
    icons: ['sop_captureproximity', 'sop_kinefx-jointcaptureproximity'],
    refKey: 'SOP_captureproximity',
    render: () => (
      <>
        <g transform="rotate(8 12 12)" fill="none" stroke="#262626" strokeLinecap="round">
          <rect x="2.5" y="6.5" width="19" height="11" rx="5.5" strokeWidth="2.6" />
          <rect x="2.5" y="6.5" width="19" height="11" rx="5.5" stroke="#89929e" strokeWidth="1.4" />
          <rect x="5" y="8.8" width="14" height="6.4" rx="3.2" strokeWidth="2.2" />
          <rect x="5" y="8.8" width="14" height="6.4" rx="3.2" stroke="#c0c7d1" strokeWidth="1.1" />
        </g>
        <path
          d="M7.5,5 L15.5,6.2 M6.5,18 L14.5,19.2 M11.5,5.6 L10.5,18.6 M8,12 L15,12.8"
          stroke="#e03228"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    id: 'sop.captureattribpack',
    label: 'Capture Attribute Pack',
    family: 'sop',
    description:
      'Three white attribute tiles at the top with orange downward arrows packing into a V-shaped blue-and-green bone chain.',
    types: ['captureattribpack'],
    icons: ['sop_captureattribpack'],
    refKey: 'SOP_captureattribpack',
    render: () => (
      <g stroke="#262626" strokeWidth="1" strokeLinejoin="round">
        <polygon points="3.5,4 8.5,4 7.5,7.5 2.5,7.5" fill="#eef2f7" />
        <polygon points="9.5,4 14.5,4 13.5,7.5 8.5,7.5" fill="#eef2f7" />
        <polygon points="15.5,4 20.5,4 19.5,7.5 14.5,7.5" fill="#eef2f7" />
        <polygon points="6,6.5 6,9.5 4.5,9.5 6.8,12 9,9.5 7.5,9.5 7.5,6.5" fill="#ee8624" />
        <polygon points="11.2,6.5 11.2,9.5 9.8,9.5 12,12 14.2,9.5 12.8,9.5 12.8,6.5" fill="#ee8624" />
        <polygon points="16.5,6.5 16.5,9.5 15,9.5 17.2,12 19.5,9.5 18,9.5 18,6.5" fill="#ee8624" />
        <path d="M5,13.5 L12,19.5 L19,13.5" fill="none" stroke="#3672c4" strokeWidth="3.6" strokeLinecap="round" />
        <circle cx="5" cy="13.5" r="1.6" fill="#52d638" />
        <circle cx="12" cy="19.5" r="1.6" fill="#52d638" />
        <circle cx="19" cy="13.5" r="1.6" fill="#52d638" />
      </g>
    ),
  },
  {
    id: 'sop.captureattribunpack',
    label: 'Capture Attribute Unpack',
    family: 'sop',
    description:
      'V-shaped blue-and-green bone chain with three orange upward arrows unpacking into three white attribute tiles.',
    types: ['captureattribunpack'],
    icons: ['sop_captureattribunpack'],
    refKey: 'SOP_captureattribunpack',
    render: () => (
      <g stroke="#262626" strokeWidth="1" strokeLinejoin="round">
        <polygon points="3.5,4 8.5,4 7.5,7.5 2.5,7.5" fill="#eef2f7" />
        <polygon points="9.5,4 14.5,4 13.5,7.5 8.5,7.5" fill="#eef2f7" />
        <polygon points="15.5,4 20.5,4 19.5,7.5 14.5,7.5" fill="#eef2f7" />
        <polygon points="6,11.5 6,8.5 4.5,8.5 6.8,6 9,8.5 7.5,8.5 7.5,11.5" fill="#ee8624" />
        <polygon points="11.2,11.5 11.2,8.5 9.8,8.5 12,6 14.2,8.5 12.8,8.5 12.8,11.5" fill="#ee8624" />
        <polygon points="16.5,11.5 16.5,8.5 15,8.5 17.2,6 19.5,8.5 18,8.5 18,11.5" fill="#ee8624" />
        <path d="M5,13.5 L12,19.5 L19,13.5" fill="none" stroke="#3672c4" strokeWidth="3.6" strokeLinecap="round" />
        <circle cx="5" cy="13.5" r="1.6" fill="#52d638" />
        <circle cx="12" cy="19.5" r="1.6" fill="#52d638" />
        <circle cx="19" cy="13.5" r="1.6" fill="#52d638" />
      </g>
    ),
  },
  {
    id: 'sop.capturecorrect',
    label: 'Capture Correct',
    family: 'sop',
    description:
      'Light orange forearm and five-fingered hand with two white-and-blue bone diamonds and a toothed grey gear in the bottom-right corner.',
    types: ['capturecorrect'],
    icons: ['sop_capturecorrect'],
    refKey: 'SOP_capturecorrect',
    render: () => (
      <>
        <CaptureArmBase armFill="#ffb066" outlineWidth={0.95} boneLight="#f2f4f7" boneStrokeWidth={0.65} />
        <g transform="translate(-0.4, -0.7)" stroke="#262626" strokeWidth="1" strokeLinejoin="round">
          <polygon
            points="15.4,11.2 17.2,11.2 17.5,12.6 18.7,13.1 19.8,12.2 21,13.4 20.1,14.5 20.6,15.7 22,16 22,17.8 20.6,18.1 20.1,19.3 21,20.4 19.8,21.6 18.7,20.7 17.5,21.2 17.2,22.5 15.4,22.5 15.1,21.2 13.9,20.7 12.8,21.6 11.6,20.4 12.5,19.3 12,18.1 10.6,17.8 10.6,16 12,15.7 12.5,14.5 11.6,13.4 12.8,12.2 13.9,13.1 15.1,12.6"
            fill="#eef2f7"
          />
          <circle cx="16.3" cy="16.9" r="1.8" fill="#3a3f47" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.capturelayerpaint',
    label: 'Capture Layer Paint',
    family: 'sop',
    description:
      'Forearm and five-fingered hand shaded with a blue-to-yellow weight gradient from shoulder to hand, two white-and-blue bone diamonds, and a diagonal paintbrush.',
    types: ['capturelayerpaint', 'jointcapturepaint'],
    icons: ['sop_capturelayerpaint', 'sop_kinefx-jointcapturepaint'],
    refKey: 'SOP_capturelayerpaint',
    render: (uid) => (
      <>
        <defs>
          <linearGradient id={`${uid}-clp`} x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5aa2f2" />
            <stop offset="45%" stopColor="#8fc2ff" />
            <stop offset="68%" stopColor="#ffe47a" />
            <stop offset="100%" stopColor="#ffb066" />
          </linearGradient>
        </defs>
        <CaptureArmBase armFill={`url(#${uid}-clp)`} outlineWidth={0.95} boneLight="#f2f4f7" boneStrokeWidth={0.65} />
        <g stroke="#262626" strokeWidth="1" strokeLinejoin="round">
          <path d="M11,10.2 C12.5,9.5 14.2,10.2 14.8,11.5 L13.2,13.2 C11.8,12.5 11,11.5 11,10.2 Z" fill="#5aa2f2" />
          <polygon points="14.8,11.5 16.4,13.2 14.6,14.8 13.2,13.2" fill="#eef2f7" />
          <polygon points="16.4,13.2 21.5,19.8 19.5,21.5 14.6,14.8" fill="#c25e12" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.capturemirror',
    label: 'Capture Mirror',
    family: 'sop',
    description:
      'Orange wooden mannequin torso split down the middle by a vertical mirror line against a shaded right panel.',
    types: ['capturemirror'],
    icons: ['sop_capturemirror'],
    refKey: 'SOP_capturemirror',
    render: () => (
      <>
        <rect x="12" y="2.5" width="9.5" height="19" fill="#c0c7d1" stroke="#262626" strokeWidth="1" />
        <g stroke="#262626" strokeWidth="1.1" strokeLinejoin="round">
          <circle cx="12" cy="5.2" r="2.2" fill="#ffb066" />
          <polygon points="9,8.2 15,8.2 14.2,15.5 9.8,15.5" fill="#ee8624" />
          <polygon points="8.8,8.5 3.5,14.5 5,15.8 9.5,10.5" fill="#ffb066" />
          <polygon points="15.2,8.5 20.5,14.5 19,15.8 14.5,10.5" fill="#c25e12" />
          <polygon points="9.5,15.5 11.8,15.5 11.5,21 9.2,21" fill="#ee8624" />
          <polygon points="12.2,15.5 14.5,15.5 14.8,21 12.5,21" fill="#c25e12" />
        </g>
        <line x1="12" y1="2" x2="12" y2="22" stroke="#f2f4f7" strokeWidth="1.6" />
      </>
    ),
  },
  {
    id: 'sop.captureoverride',
    label: 'Capture Override',
    family: 'sop',
    description:
      'Light orange forearm and five-fingered hand with two white-and-blue bone diamonds, blue weight dots along the forearm, and a blue callout tag at the top-left.',
    types: ['captureoverride'],
    icons: ['sop_captureoverride'],
    refKey: 'SOP_captureoverride',
    render: () => (
      <>
        <CaptureArmBase armFill="#ffb066" outlineWidth={0.95} boneLight="#f2f4f7" boneStrokeWidth={0.65} />
        <g stroke="#262626" strokeWidth="1" strokeLinejoin="round">
          <path d="M3,3 H12 V8.5 H9.5 L11,11 L7.5,8.5 H3 Z" fill="#3672c4" />
          <circle cx="13.5" cy="10.2" r="1.35" fill="#5aa2f2" />
          <circle cx="16.0" cy="11.8" r="1.35" fill="#5aa2f2" />
          <circle cx="12.0" cy="13.5" r="1.35" fill="#5aa2f2" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.cregion',
    label: 'Capture Region',
    family: 'sop',
    description: 'Tilted blue wireframe capsule with elliptical cross-section ribs.',
    types: ['cregion'],
    icons: ['sop_cregion'],
    refKey: 'SOP_cregion',
    render: () => (
      <g transform="rotate(8 12 12)" fill="none" strokeLinecap="round">
        <rect x="2.5" y="7" width="19" height="10" rx="5" stroke="#262626" strokeWidth="2.8" />
        <ellipse cx="8" cy="12" rx="2.2" ry="5" stroke="#262626" strokeWidth="2.4" />
        <ellipse cx="16" cy="12" rx="2.2" ry="5" stroke="#262626" strokeWidth="2.4" />
        <rect x="2.5" y="7" width="19" height="10" rx="5" stroke="#5aa2f2" strokeWidth="1.5" />
        <ellipse cx="8" cy="12" rx="2.2" ry="5" stroke="#3672c4" strokeWidth="1.2" />
        <ellipse cx="16" cy="12" rx="2.2" ry="5" stroke="#3672c4" strokeWidth="1.2" />
      </g>
    ),
  },
  {
    id: 'sop.armaturecapture',
    label: 'Armature Capture',
    family: 'sop',
    description: 'Grey articulated robot figure holding a yellow rod, surrounded by three blue weight labels.',
    types: ['armaturecapture'],
    icons: ['sop_armaturecapture'],
    refKey: 'SOP_armaturecapture',
    render: () => (
      <>
        <g stroke="#262626" strokeWidth="1" strokeLinejoin="round">
          <rect x="3" y="5" width="5.5" height="4" rx="0.8" fill="#5aa2f2" />
          <rect x="14.5" y="3" width="5.5" height="4" rx="0.8" fill="#5aa2f2" />
          <rect x="14.5" y="16.5" width="5.5" height="4" rx="0.8" fill="#5aa2f2" />
          <circle cx="12" cy="5.5" r="2" fill="#eef2f7" />
          <polygon points="9,8.5 15,8.5 14,14.5 10,14.5" fill="#c0c7d1" />
          <polygon points="8.5,9 5.5,14.5 7.2,15.5 10,10.5" fill="#eef2f7" />
          <polygon points="15.5,9 18,14 16.2,15 14,10.5" fill="#89929e" />
          <polygon points="9.5,14.5 11.8,14.5 11.2,20.5 8.8,20.5" fill="#c0c7d1" />
          <polygon points="12.2,14.5 14.5,14.5 15.2,20.5 12.8,20.5" fill="#89929e" />
          <line x1="4" y1="16.5" x2="8.5" y2="12.5" stroke="#f2c438" strokeWidth="2.2" strokeLinecap="round" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.armaturedeform',
    label: 'Armature Deform',
    family: 'sop',
    description: 'Grey articulated robot figure swinging a yellow rod upward with a curved green motion arrow.',
    types: ['armaturedeform'],
    icons: ['sop_armaturedeform'],
    refKey: 'SOP_armaturedeform',
    render: () => (
      <>
        <path
          d="M8.5,18.5 C4.5,17.5 3.5,13 5.5,9.5"
          fill="none"
          stroke="#262626"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M8.5,18.5 C4.5,17.5 3.5,13 5.5,9.5"
          fill="none"
          stroke="#58c848"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <polygon
          points="6.5,7.2 3.2,9.5 7.2,11"
          fill="#58c848"
          stroke="#262626"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <g stroke="#262626" strokeWidth="1" strokeLinejoin="round">
          <circle cx="13.5" cy="5.5" r="2" fill="#eef2f7" />
          <polygon points="10.5,8.5 16.5,8.5 15.5,14.5 11.5,14.5" fill="#c0c7d1" />
          <polygon points="10.5,9 7,12 8.2,13.5 11.5,10.5" fill="#eef2f7" />
          <polygon points="16.5,9 19.5,14 17.8,15 15.5,10.5" fill="#89929e" />
          <polygon points="11,14.5 13.2,14.5 12.5,20.5 10.2,20.5" fill="#c0c7d1" />
          <polygon points="13.8,14.5 16,14.5 16.8,20.5 14.5,20.5" fill="#89929e" />
          <polygon points="3.5,8.5 8.5,11.5 7.5,13 2.5,10" fill="#ffe47a" />
        </g>
      </>
    ),
  },
  {
    id: 'sop.dembones_skinningconverter',
    label: 'Dem Bones Skinning Converter',
    family: 'sop',
    description: 'Dark circular disc with a stylized white skull inside (vendor logo, redrawn).',
    types: ['dembones_skinningconverter'],
    icons: ['sop_dembones_skinningconverter', 'sop_kinefx-dembones_skinningconverter'],
    refKey: 'SOP_dembones_skinningconverter',
    render: () => (
      <>
        <circle cx="12" cy="12" r="9.5" fill="#262626" />
        <path
          d="M6.5,10.5 C6.5,6.2 17.5,6.2 17.5,10.5 C17.5,13.2 15.8,14.8 14.5,15.8 C14.2,17.5 9.8,17.5 9.5,15.8 C8.2,14.8 6.5,13.2 6.5,10.5 Z"
          fill="#eef2f7"
        />
        <ellipse cx="9.8" cy="11" rx="1.6" ry="2.2" transform="rotate(-12 9.8 11)" fill="#262626" />
        <ellipse cx="14.2" cy="11" rx="1.6" ry="2.2" transform="rotate(12 14.2 11)" fill="#262626" />
      </>
    ),
  },
];
