/**
 * Houdini 22 Parameter Pane colors as Tailwind classes, sampled from a Houdini 22 screenshot
 * (Fuse and Transform SOPs).
 */
export const PANE = {
  /** Pane background. */
  background: 'bg-[#2d2d2d]',
  /** Background of the contents of a section folder. */
  sectionBackground: 'bg-[#2f2f2f]',
  /** Parameter label (blue-tinted white). */
  label: 'text-[#d2dcfb]',
  /** Label of a disabled parameter. */
  labelDisabled: 'text-[#6a6a6a]',
  /** Text next to a toggle and inside fields. */
  text: 'text-[#dddddd]',
  textDisabled: 'text-[#7a7a7a]',
  /** Value field. */
  field: 'bg-[#434343] text-[#dddddd]',
  fieldDisabled: 'bg-[#363636] text-[#7a7a7a]',
  fieldExpression: 'bg-[#425757] text-[#dddddd]',
  /** Animated parameters between keyframes use the same teal as expressions (confirmed in Houdini 22). */
  fieldKeyframed: 'bg-[#425757] text-[#dddddd]',
  /** Blue-grey buttons: menu arrows, string menu buttons, unchecked toggles. */
  button: 'bg-[#474e62] text-[#ecedef]',
  buttonDisabled: 'bg-[#36383f] text-[#6a6a6a]',
} as const;

/** Height of value fields in pixels (Houdini: 26px at 100% UI scale, slightly denser here). */
export const FIELD_HEIGHT = 'h-6';
