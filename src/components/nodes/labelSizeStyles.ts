import type { HoudiniLabelSize } from '../../schema/converter';

/**
 * Tailwind text size classes for each node label size preset, shared by every node type
 * that draws Houdini-style floating labels (operator nodes, subnetwork inputs).
 */
export interface LabelSizeClasses {
  /** Descriptive operator type label shown above a renamed node (e.g. `Attribute Wrangle`). */
  typeText: string;
  /** Primary node name label (also used for subnetwork input labels and digits). */
  nameText: string;
  /** Node comment text. */
  commentText: string;
}

/**
 * Label size presets matching Houdini 22 Network Editor proportions at `medium`.
 */
export const LABEL_SIZE_STYLES: Record<HoudiniLabelSize, LabelSizeClasses> = {
  small: {
    typeText: 'text-[11px]',
    nameText: 'text-[14.5px]',
    commentText: 'text-[11.5px]',
  },
  medium: {
    typeText: 'text-[12.5px]',
    nameText: 'text-[17px]',
    commentText: 'text-[13px]',
  },
  large: {
    typeText: 'text-[14px]',
    nameText: 'text-[20px]',
    commentText: 'text-[15px]',
  },
};
