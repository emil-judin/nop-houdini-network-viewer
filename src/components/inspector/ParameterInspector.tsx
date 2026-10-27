import React, { useEffect, useMemo, useRef } from 'react';
import { LogIn, X } from 'lucide-react';
import type { HoudiniNodeData } from '../../schema/types';
import { canDiveInto } from '../../schema/subnetPath';
import { OperatorSvgIcon } from '../nodes/icons/OperatorSvgIcon';
import { TOUCH_TARGET } from '../hud/touchTarget';
import { ParmLayoutView } from './ParmLayoutView';
import { buildParmLayout } from './parmModel';
import { PANE } from './paneStyles';

/**
 * Node flags listed in the inspector header, with the flag colors used on the node itself.
 */
const FLAG_BADGES: Array<{ key: keyof HoudiniNodeData['flags']; label: string; color: string }> = [
  { key: 'display', label: 'Display', color: '#3098e5' },
  { key: 'render', label: 'Render', color: '#8a6be0' },
  { key: 'bypass', label: 'Bypass', color: '#ead02a' },
  { key: 'template', label: 'Template', color: '#d45ca8' },
  { key: 'selectableTemplate', label: 'Selectable Template', color: '#d45ca8' },
  { key: 'lock', label: 'Locked', color: '#d94040' },
  { key: 'softLock', label: 'Soft Locked', color: '#d98c40' },
];

/**
 * Props for the read-only Parameter Inspector (`ParameterInspector`).
 */
export interface ParameterInspectorProps {
  /** Selected operator node. */
  node: HoudiniNodeData;
  /** Export mode of the document: `compact` exports only changed parameters. */
  exportMode?: 'compact' | 'full';
  /** Closes the inspector (clears the selection). */
  onClose: () => void;
  /** Opens the node's child network. Only called for nodes with exported children. */
  onDiveInto: () => void;
  /**
   * Moves keyboard focus to the inspector heading when it opens or shows another node. Set when the
   * node was selected with the keyboard, so screen reader and keyboard users land in the panel.
   */
  focusOnOpen?: boolean;
}

/**
 * Read-only Houdini 22 Parameter Pane for the selected node: the pane header (operator icon,
 * type in bold, node name field), active flags and comment, then the exported parameters with
 * Houdini's layout (tabs, section folders, joined rows, toggles, menus, sliders). Values cannot be edited.
 */
export const ParameterInspector: React.FC<ParameterInspectorProps> = ({
  node,
  exportMode,
  onClose,
  onDiveInto,
  focusOnOpen = false,
}) => {
  const layout = useMemo(() => buildParmLayout(node), [node]);
  const activeFlags = FLAG_BADGES.filter(({ key }) => Boolean(node.flags?.[key]));
  const isNavigable = canDiveInto(node);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (focusOnOpen) headingRef.current?.focus();
  }, [focusOnOpen, node]);

  return (
    // Escape closes the panel from anywhere inside it (keys bubble up from its controls)
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <aside
      aria-label={`Parameters of ${node.name}`}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.stopPropagation();
          onClose();
        }
      }}
      className={`flex flex-col min-h-0 h-full w-full ${PANE.background} ${PANE.text} font-sans select-none`}
    >
      {/* Pane header: icon, operator type in bold and the node name field, like Houdini */}
      <header className="shrink-0 border-b border-[#1f1f1f] px-2 pt-1.5 pb-1">
        <div className="flex items-center gap-1.5">
          <span className="shrink-0 w-6 h-6 flex items-center justify-center rounded-[3px] bg-[#cccccc]" aria-hidden="true">
            <OperatorSvgIcon type={node.type} icon={node.icon} isSubnetwork={node.isSubnetwork} />
          </span>
          <h2
            ref={headingRef}
            tabIndex={-1}
            className="shrink-0 max-w-[40%] truncate text-[14px] font-bold text-[#dddddd] outline-none"
            title={node.type}
          >
            {node.label || node.type}
            <span className="sr-only"> node {node.name}</span>
          </h2>
          <div className={`min-w-0 flex-1 h-6 px-1.5 flex items-center rounded-[3px] text-[13px] select-text ${PANE.field}`}>
            <span className="truncate">{node.name}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            title="Close parameters"
            aria-label="Close parameters"
            className={`shrink-0 flex items-center justify-center w-6 h-6 rounded-[3px] text-[#bdbdbd] hover:bg-[#434343] hover:text-white transition-colors cursor-pointer ${TOUCH_TARGET}`}
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-1 flex flex-wrap items-center gap-1 text-[11px]">
          <span className="font-mono text-[#a0a0a0] truncate max-w-full">{node.type}</span>
          {activeFlags.map(({ key, label, color }) => (
            <span key={key} className="inline-flex items-center gap-1 px-1.5 rounded-[3px] bg-[#383838] text-[#cfcfcf]">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} aria-hidden="true" />
              {label}
            </span>
          ))}
        </div>

        {node.comment && (
          <p className="mt-1 text-[12px] leading-snug text-[#7ec4cf] whitespace-pre-wrap break-words select-text">
            {node.comment}
          </p>
        )}

        {isNavigable && (
          <button
            type="button"
            onClick={onDiveInto}
            title="Dive into this subnetwork (double-click the node, or press I)"
            className={`mt-1.5 w-full flex items-center justify-center gap-1.5 px-2 h-6 rounded-[3px] bg-[#474e62] hover:bg-[#535b72] text-[13px] text-[#ecedef] transition-colors cursor-pointer ${TOUCH_TARGET}`}
          >
            <LogIn className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Open subnetwork ({node.children?.nodes.length ?? 0} nodes)</span>
          </button>
        )}
      </header>

      {/* Parameters */}
      <div
        key={node.name}
        className="flex-1 min-h-0 overflow-y-auto overscroll-contain pt-1 pb-2 [scrollbar-color:#474e62_#2d2d2d] [scrollbar-width:thin]"
      >
        {layout.length === 0 ? (
          <p className="px-3 py-4 text-[12px] text-[#9a9a9a] text-center">
            {exportMode === 'full'
              ? 'This node has no visible parameters.'
              : 'All parameters are at their default values.'}
          </p>
        ) : (
          <ParmLayoutView items={layout} />
        )}
        {exportMode !== 'full' && layout.length > 0 && (
          <p className="px-3 pt-2 text-[11px] text-[#a0a0a0] text-center">Showing parameters changed from their defaults.</p>
        )}
      </div>
    </aside>
  );
};
