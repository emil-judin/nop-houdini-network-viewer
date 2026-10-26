import type { OperatorIconDef } from './iconTypes';

/**
 * Fallback emblem for operators without a dedicated drawing.
 */
export const DEFAULT_OPERATOR_ICON: OperatorIconDef = {
  id: 'default',
  label: 'Default Operator',
  family: 'sop',
  description:
    'Fallback for operators without a dedicated drawing: a pale blue-grey hexagon with a dark outline and a dark center dot.',
  types: [],
  sizePx: 19,
  render: () => (
    <>
      <polygon
        points="12,3.5 19.5,8 19.5,16 12,20.5 4.5,16 4.5,8"
        fill="#bcc6d4"
        stroke="#262626"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="2.6" fill="#364252" />
    </>
  ),
};
