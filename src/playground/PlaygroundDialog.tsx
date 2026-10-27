import React, { useEffect, useId, useRef } from 'react';
import { X } from 'lucide-react';
import { TOUCH_TARGET } from '../components/hud/touchTarget';

/**
 * Props for the playground's modal dialog frame (`PlaygroundDialog`).
 */
export interface PlaygroundDialogProps {
  /** Whether the dialog is open. */
  open: boolean;
  /** Called when the dialog closes (close button, Escape, or backdrop click). */
  onClose: () => void;
  /** Dialog heading. */
  title: string;
  /** Maximum dialog width in px (the dialog keeps a 12px margin on small screens). */
  maxWidthPx?: number;
  children: React.ReactNode;
}

/**
 * Native `<dialog>` in the Houdini pane style with a title bar and close button, shared by the
 * playground's Embed, exporter download and feedback dialogs.
 */
export const PlaygroundDialog: React.FC<PlaygroundDialogProps> = ({ open, onClose, title, maxWidthPx = 720, children }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    // Closing on a backdrop click is a pointer shortcut; Escape and the close button work natively
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(event) => {
        // A click on the backdrop targets the dialog element itself
        if (event.target === dialogRef.current) onClose();
      }}
      aria-labelledby={titleId}
      style={{ width: `min(${maxWidthPx}px, calc(100% - 24px))` }}
      className="m-auto max-h-[calc(100dvh-24px)] p-0 rounded-[3px] border border-[#1f1f1f] bg-[#2d2d2d] text-[#dddddd] shadow-2xl backdrop:bg-black/60"
    >
      <div className="flex flex-col max-h-[calc(100dvh-24px)]">
        <header className="flex items-center justify-between gap-2 px-4 py-2.5 border-b-2 border-[#1f1f1f]">
          <h2 id={titleId} className="text-[14px] font-bold text-[#dddddd]">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className={`flex items-center justify-center w-7 h-7 rounded text-[#bdbdbd] hover:bg-[#434343] hover:text-white cursor-pointer ${TOUCH_TARGET}`}
          >
            <X className="w-4 h-4" />
          </button>
        </header>
        {children}
      </div>
    </dialog>
  );
};
