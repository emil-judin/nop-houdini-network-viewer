import type { OperatorIconDef } from '../../../iconTypes';
import { FbxEmblem, GltfBadge, KINEFX_OUTLINE, KinefxClipStrip, KinefxDoorFrame } from '../../kits/kinefx';
import { UsdLayerStack } from '../../kits/usd';

/**
 * KineFX FBX, glTF and USD import and export operators.
 */
export const KINEFX_FILE_IO_ICONS: OperatorIconDef[] = [
  {
    id: 'sop.kinefx.fbxanimimport',
    label: 'FBX Animation Import',
    family: 'sop',
    description:
      'Row of ghosted blue running figures on the right with a redrawn FBX calligraphic X-figure emblem on the upper left and a dark disc with an arrow pointing down-right on the lower left.',
    types: ['fbxanimimport'],
    icons: ['sop_kinefx-fbxanimimport'],
    refKey: 'SOP_kinefx-fbxanimimport',
    render: () => (
      <g strokeLinejoin="round">
        <KinefxClipStrip x={15.2} y={9.8} scale={0.78} count={3} />
        <FbxEmblem cx={7.2} cy={7.2} scale={0.56} />
        {/* Dark disc with arrow pointing from top-left to lower-right */}
        <circle cx="7.4" cy="16.4" r="4.2" fill="#2e3338" stroke={KINEFX_OUTLINE} strokeWidth="0.95" />
        <g transform="rotate(-45 7.4 16.4)">
          <polygon points="7.4,19.0 4.8,15.8 6.4,15.8 6.4,13.6 8.4,13.6 8.4,15.8 10.0,15.8" fill="#ffffff" />
        </g>
      </g>
    ),
  },
  {
    id: 'sop.kinefx.fbxcharacterimport',
    label: 'FBX Character Import',
    family: 'sop',
    description:
      'Blue KineFX figure stepping through a yellow door frame on the left with a redrawn FBX figure emblem on the right.',
    types: ['fbxcharacterimport'],
    icons: ['sop_kinefx-fbxcharacterimport'],
    refKey: 'SOP_kinefx-fbxcharacterimport',
    render: () => (
      <KinefxDoorFrame direction="in">
        <FbxEmblem cx={16.8} cy={11.0} />
      </KinefxDoorFrame>
    ),
  },
  {
    id: 'sop.kinefx.fbxskinimport',
    label: 'FBX Skin Import',
    family: 'sop',
    description:
      'Green-outlined blue KineFX figure stepping out of a yellow door frame on the left with a redrawn FBX emblem on the right.',
    types: ['fbxskinimport'],
    icons: ['sop_kinefx-fbxskinimport'],
    refKey: 'SOP_kinefx-fbxskinimport',
    render: () => (
      <KinefxDoorFrame direction="in" skinGlow showKnob={false}>
        <FbxEmblem cx={16.8} cy={11.0} />
      </KinefxDoorFrame>
    ),
  },
  {
    id: 'sop.kinefx.gltfanimimport',
    label: 'GLTF Animation Import',
    family: 'sop',
    description:
      'Three spaced blue running figures stepping out of a yellow door frame on the left in front of a green glTF oval badge on the upper right (vendor logo, redrawn).',
    types: ['gltfanimimport'],
    icons: ['sop_kinefx-gltfanimimport'],
    refKey: 'SOP_kinefx-gltfanimimport',
    render: () => <KinefxDoorFrame direction="in" showClip backdrop={<GltfBadge cx={17.4} cy={7.0} />} />,
  },
  {
    id: 'sop.kinefx.gltfcharacterimport',
    label: 'GLTF Character Import',
    family: 'sop',
    description:
      'Blue KineFX figure stepping out of a yellow door frame on the left in front of a green glTF oval badge on the upper right (vendor logo, redrawn).',
    types: ['gltfcharacterimport'],
    icons: ['sop_kinefx-gltfcharacterimport'],
    refKey: 'SOP_kinefx-gltfcharacterimport',
    render: () => <KinefxDoorFrame direction="in" backdrop={<GltfBadge cx={17.4} cy={7.0} />} />,
  },
  {
    id: 'sop.kinefx.gltfskinimport',
    label: 'GLTF Skin Import',
    family: 'sop',
    description:
      'Green-outlined blue KineFX figure stepping out of a yellow door frame on the left in front of a green glTF oval badge on the right (vendor logo, redrawn).',
    types: ['gltfskinimport'],
    icons: ['sop_kinefx-gltfskinimport'],
    refKey: 'SOP_kinefx-gltfskinimport',
    render: () => (
      <KinefxDoorFrame direction="in" skinGlow showKnob={false} backdrop={<GltfBadge cx={17.4} cy={11.4} />} />
    ),
  },
  {
    id: 'sop.kinefx.usdanimimport',
    label: 'UsdSkel Animation Import',
    family: 'sop',
    description:
      'Three spaced blue running figures stepping out of a yellow door frame on the left in front of three stacked blue USD layer frames on the right.',
    types: ['usdanimimport'],
    icons: ['sop_kinefx-usdanimimport'],
    refKey: 'SOP_kinefx-usdanimimport',
    render: () => (
      <KinefxDoorFrame direction="in" showClip backdrop={<UsdLayerStack x={17.4} y={11.8} scale={0.62} />} />
    ),
  },
  {
    id: 'sop.kinefx.usdcharacterimport',
    label: 'UsdSkel Character Import',
    family: 'sop',
    description:
      'Blue KineFX figure stepping out of a yellow door frame on the left with three stacked blue USD layer frames on the right.',
    types: ['usdcharacterimport'],
    icons: ['sop_kinefx-usdcharacterimport'],
    refKey: 'SOP_kinefx-usdcharacterimport',
    render: () => (
      <KinefxDoorFrame direction="in">
        <UsdLayerStack x={17.4} y={11.8} scale={0.62} />
      </KinefxDoorFrame>
    ),
  },
  {
    id: 'sop.kinefx.usdskinimport',
    label: 'UsdSkel Skin Import',
    family: 'sop',
    description:
      'Green-outlined blue KineFX figure stepping out of a yellow door frame on the left with three stacked blue USD layer frames on the right.',
    types: ['usdskinimport'],
    icons: ['sop_kinefx-usdskinimport'],
    refKey: 'SOP_kinefx-usdskinimport',
    render: () => (
      <KinefxDoorFrame direction="in" skinGlow showKnob={false}>
        <UsdLayerStack x={17.4} y={11.8} scale={0.62} />
      </KinefxDoorFrame>
    ),
  },
  {
    id: 'sop.kinefx.rop_fbxanimoutput',
    label: 'ROP FBX Animation Output',
    family: 'sop',
    description:
      'Redrawn FBX calligraphic X-figure emblem on the left and three spaced blue running figures stepping into a yellow door frame on the right.',
    types: ['rop_fbxanimoutput'],
    icons: ['sop_kinefx-rop_fbxanimoutput'],
    refKey: 'SOP_kinefx-rop_fbxanimoutput',
    render: () => (
      <KinefxDoorFrame direction="out" showClip>
        <FbxEmblem cx={6.0} cy={11.0} />
      </KinefxDoorFrame>
    ),
  },
  {
    id: 'sop.kinefx.rop_fbxcharacteroutput',
    label: 'ROP FBX Character Output',
    family: 'sop',
    description:
      'Redrawn FBX figure emblem on the left and a blue KineFX figure stepping through a yellow door frame on the right.',
    types: ['rop_fbxcharacteroutput'],
    icons: ['sop_kinefx-rop_fbxcharacteroutput'],
    refKey: 'SOP_kinefx-rop_fbxcharacteroutput',
    render: () => (
      <KinefxDoorFrame direction="out">
        <FbxEmblem cx={7.2} cy={11.0} />
      </KinefxDoorFrame>
    ),
  },
  {
    id: 'sop.kinefx.rop_gltfcharacteroutput',
    label: 'ROP GLTF Character Output',
    family: 'sop',
    description:
      'Green glTF badge on the upper left and a blue KineFX figure stepping through a yellow door frame on the right (vendor logo, redrawn).',
    types: ['rop_gltfcharacteroutput'],
    icons: ['sop_kinefx-rop_gltfcharacteroutput'],
    refKey: 'SOP_kinefx-rop_gltfcharacteroutput',
    render: () => (
      <KinefxDoorFrame direction="out">
        <GltfBadge cx={7.6} cy={7.0} />
      </KinefxDoorFrame>
    ),
  },
];
