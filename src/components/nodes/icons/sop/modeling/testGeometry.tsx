import React from 'react';
import type { OperatorIconDef } from '../../iconTypes';

/**
 * Test geometry.
 * Stylized test models and the test simulation ragdoll. Humanoid figures
 * (`otto`, `templatebody`, `tommy`) and `templatehead` are generic simplified
 * silhouettes/busts, never real people.
 */

const OUTLINE = '#262626';

/** Shared generic standing humanoid silhouette in A-pose (head, torso, arms, legs). */
const HumanoidBase: React.FC<{
  bodyFill: string;
  headFill?: string;
  children?: React.ReactNode;
}> = ({ bodyFill, headFill = bodyFill, children }) => (
  <>
    <path
      d="M9.7,7.5 L14.3,7.5 C15.6,7.5 16.5,8.3 17,9.8 L18.3,14.2 L16.6,14.6 L15.2,10.9 L14.8,14.4 L15.5,20.8 L13.4,20.8 L12.3,15.4 L11.7,15.4 L10.6,20.8 L8.5,20.8 L9.2,14.4 L8.8,10.9 L7.4,14.6 L5.7,14.2 L7,9.8 C7.5,8.3 8.4,7.5 9.7,7.5 Z"
      fill={bodyFill}
      stroke={OUTLINE}
      strokeWidth="1.1"
      strokeLinejoin="round"
    />
    {children}
    <circle cx="12" cy="4.8" r="2.1" fill={headFill} stroke={OUTLINE} strokeWidth="1.05" />
  </>
);

/**
 * Test geometry operators: the SideFX test models.
 */
export const TEST_GEOMETRY_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.testgeometry_capybara',
    label: 'Test Geometry: Capybara',
    family: 'sop',
    description:
      'Upright standing brown capybara facing front-left with a boxy snout, small rounded ears, folded front paws, and short hind feet.',
    types: ['testgeometry_capybara'],
    icons: ['sop_testgeometry_capybara'],
    refKey: 'SOP_testgeometry_capybara',
    render: () => (
      <>
        {/* Hind legs and feet */}
        <path
          d="M8.7,18.2 L8.3,21.2 L10.4,21.2 L10.7,18.8 Z M13.3,18.8 L13.6,21.2 L15.7,21.2 L15.3,18.2 Z"
          fill="#a8783c"
          stroke={OUTLINE}
          strokeWidth="1.0"
          strokeLinejoin="round"
        />
        {/* Upright plump torso */}
        <path
          d="M9.1,8.6 C7.5,10.2 7.2,14.8 8.2,17.8 C8.8,19.1 10.4,19.5 12.2,19.5 C14.3,19.5 15.8,18.6 16.2,16.8 C16.7,14.2 16.1,10.2 14.3,8.5 Z"
          fill="#a8783c"
          stroke={OUTLINE}
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        {/* Upper-left fur highlight */}
        <path
          d="M9.1,9.0 C7.8,10.8 7.7,14.4 8.6,17.4 C10.0,18.4 11.8,18.2 12.6,16.8 C12.4,13.6 12.6,10.8 13.8,9.2 Z"
          fill="#c89a5a"
        />
        {/* Folded front paws */}
        <path
          d="M8.8,11.2 C7.8,11.8 7.9,13.4 9.5,13.8 L11.4,14.1 L11.6,12.5 L9.9,12.1 Z"
          fill="#7e5828"
          stroke={OUTLINE}
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <path
          d="M14.7,11.0 C15.6,11.8 15.4,13.4 13.7,13.8 L11.9,14.0 L11.8,12.4 L13.5,12.0 Z"
          fill="#7e5828"
          stroke={OUTLINE}
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Ears */}
        <circle cx="10.2" cy="3.6" r="1.1" fill="#7e5828" stroke={OUTLINE} strokeWidth="0.9" />
        <circle cx="13.9" cy="3.8" r="1.1" fill="#7e5828" stroke={OUTLINE} strokeWidth="0.9" />
        {/* Boxy capybara head and snout */}
        <path
          d="M7.6,5.2 C7.4,4.2 8.8,3.4 11.4,3.4 C13.8,3.4 15.0,4.5 14.9,6.2 C14.8,7.8 13.6,8.8 11.5,8.8 C9.4,8.8 7.9,7.6 7.6,5.2 Z"
          fill="#c89a5a"
          stroke={OUTLINE}
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        {/* Eye and nose */}
        <circle cx="10.3" cy="5.0" r="0.65" fill={OUTLINE} />
        <path d="M7.8,5.8 L8.9,6.1" stroke={OUTLINE} strokeWidth="0.85" strokeLinecap="round" />
      </>
    ),
  },
  {
    id: 'sop.testgeometry_crag',
    label: 'Test Geometry: Crag',
    family: 'sop',
    description:
      'Hulking dark-grey rock creature with broad faceted shoulders, two short horns, heavy arms, and wide-stance legs.',
    types: ['testgeometry_crag'],
    icons: ['sop_testgeometry_crag'],
    refKey: 'SOP_testgeometry_crag',
    render: () => (
      <>
        {/* Wide-stance legs */}
        <path
          d="M8.6,13.4 L7.2,20.8 L9.8,20.8 L11.2,15.5 L12.8,15.5 L14.2,20.8 L16.8,20.8 L15.4,13.4 Z"
          fill="#5a616b"
          stroke={OUTLINE}
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        <polygon points="8.6,14.0 10.4,14.0 9.4,19.8 7.9,19.8" fill="#89929e" />
        {/* Heavy hanging rock arms */}
        <path
          d="M6.4,6.4 L4.2,10.6 L4.6,15.6 L6.8,15.6 L7.3,11.2 L8.2,8.4 Z"
          fill="#89929e"
          stroke={OUTLINE}
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        <path
          d="M17.6,6.4 L19.8,10.6 L19.4,15.6 L17.2,15.6 L16.7,11.2 L15.8,8.4 Z"
          fill="#5a616b"
          stroke={OUTLINE}
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        {/* Broad faceted torso */}
        <polygon
          points="6.5,6.2 17.5,6.2 15.6,13.8 8.4,13.8"
          fill="#89929e"
          stroke={OUTLINE}
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        {/* Upper-left rock facet highlight */}
        <polygon points="7.2,6.8 12.6,6.8 11.2,11.6 8.4,11.2" fill="#c0c7d1" />
        {/* Horned head */}
        <path
          d="M9.6,5.2 L8.8,3.1 L10.5,4.2 L13.5,4.2 L15.2,3.1 L14.4,5.2 L14.1,7.5 L9.9,7.5 Z"
          fill="#89929e"
          stroke={OUTLINE}
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        {/* Subtle eye slits */}
        <path d="M10.7,5.7 L11.5,5.8 M12.5,5.8 L13.3,5.7" stroke="#eef2f7" strokeWidth="0.75" strokeLinecap="round" />
      </>
    ),
  },
  {
    id: 'sop.testgeometry_otto',
    label: 'Test Geometry: Otto',
    family: 'sop',
    description: 'Generic standing shirtless humanoid silhouette in warm tan wearing pink shorts.',
    types: ['testgeometry_otto'],
    icons: ['sop_testgeometry_otto'],
    refKey: 'SOP_testgeometry_otto',
    render: () => (
      <HumanoidBase bodyFill="#ffb066">
        {/* Pink shorts */}
        <path
          d="M9.2,12.8 L14.8,12.8 L15.1,16.4 L12.6,16.4 L12.0,14.8 L11.4,16.4 L8.9,16.4 Z"
          fill="#e86ca8"
          stroke={OUTLINE}
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
      </HumanoidBase>
    ),
  },
  {
    id: 'sop.testgeometry_pighead',
    label: 'Test Geometry: Pig Head',
    family: 'sop',
    description:
      'Sculpted terracotta-brown pig head in left-facing side profile with pointed ears, a protruding flat-tipped snout, and a thick neck base.',
    types: ['testgeometry_pighead'],
    icons: ['sop_testgeometry_pighead'],
    refKey: 'SOP_testgeometry_pighead',
    render: () => (
      <>
        {/* Far ear */}
        <path
          d="M14.2,6.4 L16.2,3.4 L16.6,7.6 Z"
          fill="#7e5828"
          stroke={OUTLINE}
          strokeWidth="1.0"
          strokeLinejoin="round"
        />
        {/* Side-profile head, protruding snout, and thick neck base */}
        <path
          d="M11.8,5.2 C10.0,5.2 8.8,5.8 7.8,7.0 C7.0,8.0 6.4,8.8 4.4,9.4 L4.0,12.2 L6.8,13.0 L5.8,13.8 C6.4,14.8 7.6,15.2 8.8,16.4 C9.8,17.8 10.6,19.6 12.2,19.8 L16.8,19.6 C18.0,17.2 18.4,13.4 17.6,9.4 C16.8,6.6 14.4,5.2 11.8,5.2 Z"
          fill="#a8783c"
          stroke={OUTLINE}
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        {/* Upper-left brow and cheek highlight */}
        <path
          d="M8.4,7.0 C10.0,5.8 12.2,5.8 13.6,7.2 C12.0,8.6 9.8,9.4 7.4,9.8 C7.6,8.6 7.8,7.6 8.4,7.0 Z"
          fill="#c89a5a"
        />
        {/* Near ear */}
        <path
          d="M11.4,7.4 L13.2,2.8 L15.4,6.8 Z"
          fill="#c89a5a"
          stroke={OUTLINE}
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        {/* Flat snout tip */}
        <ellipse
          cx="4.3"
          cy="10.8"
          rx="1.05"
          ry="1.65"
          transform="rotate(-8 4.3 10.8)"
          fill="#c89a5a"
          stroke={OUTLINE}
          strokeWidth="0.9"
        />
        {/* Nostril, eye, and mouth crease */}
        <circle cx="4.0" cy="10.4" r="0.4" fill={OUTLINE} />
        <circle cx="8.9" cy="8.6" r="0.6" fill={OUTLINE} />
        <path d="M5.8,13.4 Q7.8,13.9 9.6,13.0" fill="none" stroke={OUTLINE} strokeWidth="0.8" strokeLinecap="round" />
      </>
    ),
  },
  {
    id: 'sop.testgeometry_rubbertoy',
    label: 'Test Geometry: Rubber Toy',
    family: 'sop',
    description:
      'Glossy blue cartoon Loch Ness rubber toy in left-facing side profile with two white eyes, an S-curved neck, a humped back, an upturned tail, and paddle flippers.',
    types: ['testgeometry_rubbertoy'],
    icons: ['sop_testgeometry_rubbertoy'],
    refKey: 'SOP_testgeometry_rubbertoy',
    render: () => (
      <>
        {/* Rear paddle flipper */}
        <path
          d="M14.2,16.0 C14.8,17.8 16.6,18.8 18.4,18.2 C19.0,17.2 17.6,15.6 15.6,15.2 Z"
          fill="#3672c4"
          stroke={OUTLINE}
          strokeWidth="1.0"
          strokeLinejoin="round"
        />
        {/* Side-profile Nessie head, S-neck, humped back, and upturned tail */}
        <path
          d="M4.2,8.0 C4.2,6.8 5.6,6.2 7.2,6.2 C7.8,4.8 9.2,4.4 10.4,5.2 C11.2,6.2 10.2,8.6 10.6,10.6 C11.0,11.4 12.6,10.2 14.4,10.4 C16.2,10.6 17.2,12.4 18.2,12.6 C19.2,12.8 19.6,11.6 20.4,11.8 C21.2,12.2 20.8,14.0 19.2,15.6 C17.4,17.2 14.2,17.8 10.6,17.6 C8.4,17.5 6.8,16.4 6.8,14.2 C6.8,12.4 7.6,11.0 7.4,9.8 C6.2,9.8 4.2,9.2 4.2,8.0 Z"
          fill="#5aa2f2"
          stroke={OUTLINE}
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        {/* Upper-left highlight along neck and back hump */}
        <path
          d="M7.8,7.4 C8.2,5.8 9.4,5.6 9.8,6.6 C9.6,8.4 9.6,10.4 10.2,11.8 C11.8,11.2 13.8,10.8 15.6,11.6 C14.0,12.4 11.4,13.0 9.0,12.6 C8.2,11.0 7.6,9.0 7.8,7.4 Z"
          fill="#8fc2ff"
        />
        {/* Front paddle flipper */}
        <path
          d="M8.0,15.4 C6.2,16.2 5.2,17.6 6.2,18.8 C7.8,19.4 10.0,18.2 10.6,16.6 Z"
          fill="#8fc2ff"
          stroke={OUTLINE}
          strokeWidth="1.0"
          strokeLinejoin="round"
        />
        {/* Two eyes on top of head */}
        <circle cx="8.0" cy="5.0" r="1.15" fill="#ffffff" stroke={OUTLINE} strokeWidth="0.8" />
        <circle cx="9.8" cy="5.2" r="1.15" fill="#ffffff" stroke={OUTLINE} strokeWidth="0.8" />
        <circle cx="7.8" cy="5.0" r="0.45" fill={OUTLINE} />
        <circle cx="9.6" cy="5.2" r="0.45" fill={OUTLINE} />
        {/* Snout smile */}
        <path d="M4.8,8.6 Q5.9,9.1 6.8,8.6" fill="none" stroke={OUTLINE} strokeWidth="0.75" strokeLinecap="round" />
      </>
    ),
  },
  {
    id: 'sop.testgeometry_shaderball',
    label: 'Test Geometry: Shader Ball',
    family: 'sop',
    description:
      'Glossy blue shader ball with a recessed grey-white circular core window, resting on a grey pedestal with two curved blue arms tucked behind the ball.',
    types: ['testgeometry_shaderball'],
    icons: ['sop_testgeometry_shaderball'],
    refKey: 'SOP_testgeometry_shaderball',
    render: (uid) => (
      <>
        <defs>
          <radialGradient id={`${uid}-ball`} cx="35%" cy="32%" r="68%">
            <stop offset="0%" stopColor="#8fc2ff" />
            <stop offset="55%" stopColor="#5aa2f2" />
            <stop offset="100%" stopColor="#3672c4" />
          </radialGradient>
        </defs>
        {/* Grey pedestal base */}
        <path
          d="M7.2,17.2 L16.8,17.2 L17.4,19.4 C17.4,20.6 15.0,21.4 12.0,21.4 C9.0,21.4 6.6,20.6 6.6,19.4 Z"
          fill="#5a616b"
          stroke={OUTLINE}
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        <ellipse cx="12" cy="17.2" rx="4.8" ry="1.4" fill="#89929e" stroke={OUTLINE} strokeWidth="0.9" />
        {/* Curved wrap arms rendered behind the ball */}
        <path
          d="M5.2,13.6 C4.4,15.4 5.4,17.8 8.4,18.2 C9.6,18.4 10.2,17.4 9.2,16.4 C7.6,15.8 6.8,14.6 6.6,13.2 Z"
          fill="#5aa2f2"
          stroke={OUTLINE}
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        <path
          d="M18.8,13.6 C19.6,15.4 18.6,17.8 15.6,18.2 C14.4,18.4 13.8,17.4 14.8,16.4 C16.4,15.8 17.2,14.6 17.4,13.2 Z"
          fill="#3672c4"
          stroke={OUTLINE}
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        {/* Main glossy shader ball */}
        <circle cx="12" cy="10.4" r="7.2" fill={`url(#${uid}-ball)`} stroke={OUTLINE} strokeWidth="1.15" />
        {/* Recessed circular window and inner sphere */}
        <circle cx="10.4" cy="10.4" r="3.4" fill="#5a616b" stroke={OUTLINE} strokeWidth="0.9" />
        <circle cx="10.1" cy="10.1" r="2.7" fill="#eef2f7" stroke={OUTLINE} strokeWidth="0.7" />
      </>
    ),
  },
  {
    id: 'sop.testgeometry_squab',
    label: 'Test Geometry: Squab',
    family: 'sop',
    description:
      'Diagonal grey alien squid creature with connected pointy tentacles fanning toward the bottom-left, a bulbous eyed head, and a curved tail.',
    types: ['testgeometry_squab'],
    icons: ['sop_testgeometry_squab'],
    refKey: 'SOP_testgeometry_squab',
    render: () => (
      <>
        {/* Connected pointy tentacles at bottom-left */}
        <path
          d="M8.6,11.8 L3.2,15.8 L8.4,13.4 L4.6,19.2 L9.8,14.4 L7.8,20.8 L11.4,14.6 L12.0,12.2 Z"
          fill="#89929e"
          stroke={OUTLINE}
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        {/* Short underside legs */}
        <path
          d="M13.2,12.0 L14.8,15.6 L16.2,14.8 L14.6,11.4 Z M15.4,10.4 L17.2,13.4 L18.4,12.4 L16.6,9.6 Z"
          fill="#89929e"
          stroke={OUTLINE}
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Elongated curved body and tail */}
        <path
          d="M8.4,11.8 C7.6,10.0 9.0,7.8 11.4,7.4 C13.6,7.0 15.4,5.2 17.8,4.0 C19.4,3.2 20.6,3.8 20.4,5.2 C20.1,7.2 17.6,9.8 14.4,11.6 C12.4,12.8 9.6,13.6 8.4,11.8 Z"
          fill="#c0c7d1"
          stroke={OUTLINE}
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        {/* Upper-left highlight ridge */}
        <path
          d="M9.0,10.2 C9.6,8.6 11.8,8.0 13.8,7.0 C15.8,6.0 17.6,4.5 19.6,4.2 C18.2,6.0 15.8,7.6 13.4,8.8 C11.4,9.8 10.0,10.4 9.0,10.2 Z"
          fill="#eef2f7"
        />
        {/* Eye */}
        <circle cx="10.4" cy="9.8" r="0.95" fill="#eef2f7" stroke={OUTLINE} strokeWidth="0.7" />
        <circle cx="10.3" cy="9.8" r="0.4" fill={OUTLINE} />
      </>
    ),
  },
  {
    id: 'sop.testgeometry_templatebody',
    label: 'Test Geometry: Template Body',
    family: 'sop',
    description: 'Neutral grey generic standing humanoid figure in an A-pose.',
    types: ['testgeometry_templatebody'],
    icons: ['sop_testgeometry_templatebody'],
    refKey: 'SOP_testgeometry_templatebody',
    render: () => <HumanoidBase bodyFill="#c0c7d1" headFill="#eef2f7" />,
  },
  {
    id: 'sop.testgeometry_templatehead',
    label: 'Test Geometry: Template Head',
    family: 'sop',
    description: 'Neutral grey generic sculpted human head facing left in three-quarter view without a neck.',
    types: ['testgeometry_templatehead'],
    icons: ['sop_testgeometry_templatehead'],
    refKey: 'SOP_testgeometry_templatehead',
    render: () => (
      <>
        {/* Head cranium and profile (centered without neck) */}
        <path
          d="M7.6,10.6 C7.8,7.0 10.6,5.2 13.8,5.6 C16.8,6.0 18.2,8.6 17.8,12.0 C17.5,14.6 15.8,17.2 13.6,18.2 C11.4,19.2 9.2,18.8 8.2,17.2 L7.4,15.6 L6.4,14.2 L7.4,12.4 Z"
          fill="#c0c7d1"
          stroke={OUTLINE}
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        {/* Upper-left forehead highlight */}
        <path d="M8.6,10.0 C9.0,7.4 11.2,6.2 13.4,6.6 C12.0,8.2 10.8,10.0 9.6,11.0 Z" fill="#eef2f7" />
        {/* Subtle brow and ear contour */}
        <path
          d="M7.8,11.6 Q9.4,11.0 11.2,11.6 M14.2,12.0 C14.8,12.0 15.2,13.0 14.6,14.2 C14.2,14.8 13.6,14.6 13.6,13.8"
          fill="none"
          stroke={OUTLINE}
          strokeWidth="0.75"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    id: 'sop.testgeometry_tommy',
    label: 'Test Geometry: Tommy',
    family: 'sop',
    description: 'Generic standing humanoid silhouette in warm tan wearing a white tank top and brown shorts.',
    types: ['testgeometry_tommy'],
    icons: ['sop_testgeometry_tommy'],
    refKey: 'SOP_testgeometry_tommy',
    render: () => (
      <HumanoidBase bodyFill="#ffb066">
        {/* White tank top */}
        <path
          d="M9.4,7.5 L14.6,7.5 L15.0,13.2 L9.0,13.2 Z"
          fill="#ffffff"
          stroke={OUTLINE}
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        {/* Brown shorts */}
        <path
          d="M9.2,13.0 L14.8,13.0 L15.2,17.0 L12.6,17.0 L12.0,15.0 L11.4,17.0 L8.8,17.0 Z"
          fill="#7e5828"
          stroke={OUTLINE}
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
      </HumanoidBase>
    ),
  },
  {
    id: 'sop.testsim_ragdoll',
    label: 'Test Simulation: Ragdoll',
    family: 'sop',
    description:
      'Tilted stitched ragdoll with an orange-tan head, dark hair on top with pigtails, and blue overalls with a narrow white chest bib and red heart.',
    types: ['testsim_ragdoll'],
    icons: ['sop_testsim_ragdoll'],
    refKey: 'SOP_testsim_ragdoll',
    render: () => (
      <>
        {/* Arms */}
        <path
          d="M8.6,10.2 L5.1,11.4 L5.7,13.3 L9.4,12.4 Z"
          fill="#ee8624"
          stroke={OUTLINE}
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        <path
          d="M14.0,9.4 L18.2,10.4 L17.6,12.4 L13.4,11.6 Z"
          fill="#ee8624"
          stroke={OUTLINE}
          strokeWidth="0.95"
          strokeLinejoin="round"
        />
        {/* Feet */}
        <ellipse cx="10.4" cy="19.6" rx="1.6" ry="1.1" fill="#ffffff" stroke={OUTLINE} strokeWidth="0.9" />
        <ellipse cx="16.4" cy="19.4" rx="1.6" ry="1.1" fill="#ffffff" stroke={OUTLINE} strokeWidth="0.9" />
        {/* Blue overalls */}
        <path
          d="M9.2,10.6 L14.4,9.8 L15.6,14.8 L17.2,18.4 L14.6,19.0 L13.2,15.6 L11.8,19.0 L9.2,18.4 L10.2,14.8 Z"
          fill="#5aa2f2"
          stroke={OUTLINE}
          strokeWidth="1.05"
          strokeLinejoin="round"
        />
        {/* Narrower white bib shifted slightly right, with red heart */}
        <polygon points="11.1,11.2 13.7,10.8 13.9,13.4 11.3,13.8" fill="#ffffff" stroke={OUTLINE} strokeWidth="0.7" />
        <path
          d="M12.5,12.8 L11.7,12.0 C11.4,11.6 11.8,11.1 12.3,11.4 L12.5,11.6 L12.7,11.4 C13.2,11.1 13.6,11.6 13.3,12.0 Z"
          fill="#e03228"
        />
        {/* Dark pigtails with red ties (shifted right with head) */}
        <path
          d="M7.9,5.8 L4.7,5.2 L5.5,7.4 L7.9,7.0 Z M14.5,4.8 L17.7,4.0 L16.9,6.4 L14.5,6.2 Z"
          fill="#3a3f47"
          stroke={OUTLINE}
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        <circle cx="7.8" cy="6.2" r="0.7" fill="#e03228" />
        <circle cx="14.6" cy="5.4" r="0.7" fill="#e03228" />
        {/* Round orange-tan head */}
        <circle cx="11.3" cy="7.2" r="3.4" fill="#ffb066" stroke={OUTLINE} strokeWidth="1.1" />
        {/* Dark hair on top of the head */}
        <path
          d="M8.1,6.2 C8.5,4.2 10.0,3.6 11.4,3.7 C12.9,3.8 14.2,4.5 14.5,6.0 C13.2,5.3 12.1,5.3 11.3,5.8 C10.4,5.3 9.2,5.4 8.1,6.2 Z"
          fill="#3a3f47"
          stroke={OUTLINE}
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        {/* Eyes and smile */}
        <circle cx="10.2" cy="7.1" r="0.55" fill={OUTLINE} />
        <circle cx="12.2" cy="6.8" r="0.55" fill={OUTLINE} />
        <path d="M10.1,8.5 Q11.5,9.3 12.7,8.2" fill="none" stroke={OUTLINE} strokeWidth="0.75" strokeLinecap="round" />
      </>
    ),
  },
];
