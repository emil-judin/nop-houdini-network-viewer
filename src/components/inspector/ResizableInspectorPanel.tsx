import React, { useEffect, useRef, useState } from 'react';

/** Viewer width from which the inspector is a side panel instead of a bottom sheet. */
export const SIDE_PANEL_MIN_VIEWER_WIDTH = 672;

/** How long the bottom sheet takes to slide in and out, in milliseconds. */
export const SHEET_SLIDE_MS = 200;

const MIN_WIDTH = 260;
const MIN_HEIGHT = 120;
/** Space always left for the network canvas next to / above the panel. */
const MIN_CANVAS_WIDTH = 200;
const MIN_CANVAS_HEIGHT = 100;
const KEYBOARD_STEP = 16;
const STORAGE_KEYS = { width: 'nop-inspector-width', height: 'nop-inspector-height' } as const;

/** Reads a remembered panel size. Storage can be unavailable (private mode, blocked site data). */
function readStoredSize(key: string): number | null {
  try {
    const value = Number(window.localStorage.getItem(key));
    return Number.isFinite(value) && value > 0 ? value : null;
  } catch {
    return null;
  }
}

function storeSize(key: string, value: number | null): void {
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, String(Math.round(value)));
  } catch {
    // Remembering the size is only a convenience
  }
}

/**
 * Props for `<ResizableInspectorPanel />`.
 */
export interface ResizableInspectorPanelProps {
  /** `true` for a side panel (resized sideways), `false` for a bottom sheet (resized up and down). */
  isSidePanel: boolean;
  /** Current viewer size in pixels, used to keep room for the canvas. */
  viewerWidth: number;
  viewerHeight: number;
  /**
   * Bottom sheet only: `false` slides the sheet down out of its space (it is closing; the caller
   * unmounts it after {@link SHEET_SLIDE_MS}). Defaults to `true`.
   */
  open?: boolean;
  /** Bottom sheet only: slide up when it first appears and down when it closes. Defaults to `false`. */
  slide?: boolean;
  children: React.ReactNode;
}

/**
 * Container of the Parameter Inspector with a drag handle: on the left edge of the side panel
 * (drag sideways) or on top of the bottom sheet (drag up and down, with a grip for fingers).
 * Works with mouse, touch and pen (pointer events with capture), and with the arrow keys when the
 * handle has focus. Double-click (or double-tap) the handle to restore the default size. The size
 * is remembered in this browser. With `slide`, the bottom sheet slides up into its space when it
 * opens and down when it closes; the space itself is taken at once, so the canvas above has its
 * final size from the start.
 */
export const ResizableInspectorPanel: React.FC<ResizableInspectorPanelProps> = ({
  isSidePanel,
  viewerWidth,
  viewerHeight,
  open = true,
  slide = false,
  children,
}) => {
  // Starts below its space and slides up one frame after the first paint
  const [entered, setEntered] = useState(!slide);
  useEffect(() => {
    if (entered) return;
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => setEntered(true));
    });
    return () => cancelAnimationFrame(frame);
  }, [entered]);

  const [width, setWidth] = useState<number | null>(() => readStoredSize(STORAGE_KEYS.width));
  const [height, setHeight] = useState<number | null>(() => readStoredSize(STORAGE_KEYS.height));
  const [isDragging, setIsDragging] = useState(false);
  // `latest` is the newest drag result: the pointer-up handler can come from an older render
  const dragRef = useRef<{ start: number; size: number; latest: number } | null>(null);

  const min = isSidePanel ? MIN_WIDTH : MIN_HEIGHT;
  const max = Math.max(min, isSidePanel ? viewerWidth - MIN_CANVAS_WIDTH : viewerHeight - MIN_CANVAS_HEIGHT);
  const defaultSize = isSidePanel
    ? Math.min(400, Math.max(320, viewerWidth * 0.3))
    : Math.round(viewerHeight * 0.48);
  const clamp = (value: number) => Math.round(Math.min(max, Math.max(min, value)));
  const size = clamp((isSidePanel ? width : height) ?? defaultSize);

  const setSize = (value: number | null) => {
    const next = value === null ? null : clamp(value);
    if (isSidePanel) setWidth(next);
    else setHeight(next);
    return next;
  };
  const storageKey = isSidePanel ? STORAGE_KEYS.width : STORAGE_KEYS.height;

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = { start: isSidePanel ? event.clientX : event.clientY, size, latest: size };
    setIsDragging(true);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag) return;
    // The handle sits on the canvas side: dragging towards the canvas makes the panel bigger
    const delta = (isSidePanel ? event.clientX : event.clientY) - drag.start;
    drag.latest = setSize(drag.size - delta) ?? drag.latest;
  };

  const endDrag = () => {
    const drag = dragRef.current;
    if (!drag) return;
    dragRef.current = null;
    setIsDragging(false);
    storeSize(storageKey, drag.latest);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const grow = isSidePanel ? 'ArrowLeft' : 'ArrowUp';
    const shrink = isSidePanel ? 'ArrowRight' : 'ArrowDown';
    let next: number | null;
    if (event.key === grow) next = setSize(size + KEYBOARD_STEP);
    else if (event.key === shrink) next = setSize(size - KEYBOARD_STEP);
    else if (event.key === 'Home') next = setSize(min);
    else if (event.key === 'End') next = setSize(max);
    else return;
    event.preventDefault();
    storeSize(storageKey, next);
  };

  const handleReset = () => {
    setSize(null);
    storeSize(storageKey, null);
  };

  const handle = (
    // WAI-ARIA window splitter: a focusable separator with a value, moved with the arrow keys
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <div
      role="separator"
      tabIndex={0}
      aria-orientation={isSidePanel ? 'vertical' : 'horizontal'}
      aria-label="Resize the parameter panel"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={size}
      title="Drag to resize, double-click to reset"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onLostPointerCapture={endDrag}
      onDoubleClick={handleReset}
      onKeyDown={handleKeyDown}
      className={`group touch-none select-none outline-none ${
        isSidePanel
          ? 'absolute inset-y-0 left-0 z-10 w-2 -translate-x-1/2 [@media(pointer:coarse)]:w-6 cursor-col-resize'
          : 'relative shrink-0 h-3 [@media(pointer:coarse)]:h-6 cursor-row-resize bg-[#262626] flex items-center justify-center'
      }`}
    >
      {isSidePanel ? (
        <span
          className={`absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 transition-colors ${
            isDragging ? 'bg-[#7082b9]' : 'bg-transparent group-hover:bg-[#7082b9]/60 group-focus-visible:bg-[#7082b9]'
          }`}
        />
      ) : (
        <span
          className={`w-9 h-1 rounded-full transition-colors ${
            isDragging ? 'bg-[#7082b9]' : 'bg-[#5a5a5a] group-hover:bg-[#8a8a8a] group-focus-visible:bg-[#7082b9]'
          }`}
        />
      )}
    </div>
  );

  if (isSidePanel) {
    return (
      <div className="relative shrink-0 flex h-full border-l border-[#1c1c1c]" style={{ width: size }}>
        {handle}
        <div className="flex-1 min-w-0 min-h-0">{children}</div>
      </div>
    );
  }

  const shown = entered && open;
  return (
    // The space of the sheet, with the sheet sliding inside it
    <div className="relative shrink-0 w-full overflow-hidden" style={{ height: size }}>
      <div
        className={`flex flex-col h-full border-t border-[#1c1c1c] ${
          slide ? 'transition-transform ease-out motion-reduce:transition-none' : ''
        } ${shown ? 'translate-y-0' : 'translate-y-full'} ${open ? '' : 'pointer-events-none'}`}
        style={slide ? { transitionDuration: `${SHEET_SLIDE_MS}ms` } : undefined}
      >
        {handle}
        <div className="flex-1 min-w-0 min-h-0">{children}</div>
      </div>
    </div>
  );
};
