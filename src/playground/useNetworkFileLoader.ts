import { useCallback, useEffect, useRef, useState } from 'react';
import { formatMegabytes, MAX_NETWORK_BYTES } from '../embed/fetchNetwork';
import { normalizeNetworkDocument, type HoudiniNetworkDocument } from '../api';

/**
 * A network loaded by the user (opened, dropped or pasted).
 */
export interface LoadedNetwork {
  /** Normalized network document. */
  doc: HoudiniNetworkDocument;
  /** Where it came from: the file name, or `Clipboard`. */
  sourceName: string;
}

/**
 * State and actions returned by {@link useNetworkFileLoader}.
 */
export interface NetworkFileLoader {
  /** Last load error, or `null`. */
  error: string | null;
  /** Clears the error message. */
  clearError: () => void;
  /** `true` while files are dragged over the page (for the drop overlay). */
  isDragging: boolean;
  /** Loads a `.json` file chosen with a file input. */
  openFile: (file: File) => void;
  /** Reads JSON text from the clipboard with the async Clipboard API (asks for permission). */
  pasteFromClipboard: () => Promise<void>;
}

/** Returns `true` when the event target is a text field, where paste must keep working normally. */
function isTextField(target: EventTarget | null): boolean {
  return target instanceof Element && Boolean(target.closest('input, textarea, select, [contenteditable="true"]'));
}

/** Returns `true` when a drag carries files (and not, for example, selected text). */
function isFileDrag(event: DragEvent): boolean {
  return Array.from(event.dataTransfer?.types ?? []).includes('Files');
}

/**
 * Loads exported Houdini networks into the playground from every source a visitor might use:
 * the Open button, drag and drop of a `.json` file anywhere on the page, Ctrl+V / Cmd+V
 * (standard `paste` event, no permission prompt) and the Paste button (async Clipboard API).
 *
 * @param onLoad Called with every successfully parsed network.
 */
export function useNetworkFileLoader(onLoad: (network: LoadedNetwork) => void): NetworkFileLoader {
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragDepthRef = useRef(0);
  const onLoadRef = useRef(onLoad);
  onLoadRef.current = onLoad;

  const loadText = useCallback((text: string, sourceName: string) => {
    if (text.length > MAX_NETWORK_BYTES) {
      setError(`${sourceName} is larger than ${formatMegabytes(MAX_NETWORK_BYTES)}, which is more than the viewer can show.`);
      return;
    }
    try {
      const doc = normalizeNetworkDocument(JSON.parse(text));
      setError(null);
      onLoadRef.current({ doc, sourceName });
    } catch (err) {
      const reason = err instanceof Error ? err.message : String(err);
      setError(`Could not read ${sourceName}: ${reason}`);
    }
  }, []);

  const openFile = useCallback(
    (file: File) => {
      // Checked before reading, so a huge file never has to be loaded into memory
      if (file.size > MAX_NETWORK_BYTES) {
        setError(`${file.name} is larger than ${formatMegabytes(MAX_NETWORK_BYTES)}, which is more than the viewer can show.`);
        return;
      }
      file.text().then(
        (text) => loadText(text, file.name),
        () => setError(`Could not read ${file.name}.`),
      );
    },
    [loadText],
  );

  const pasteFromClipboard = useCallback(async () => {
    if (!navigator.clipboard?.readText) {
      setError('This browser cannot read the clipboard from a button. Press Ctrl+V (Cmd+V on a Mac) instead.');
      return;
    }
    try {
      loadText(await navigator.clipboard.readText(), 'Clipboard');
    } catch {
      setError('Clipboard access was blocked. Press Ctrl+V (Cmd+V on a Mac) instead.');
    }
  }, [loadText]);

  // Ctrl+V / Cmd+V anywhere outside text fields
  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      if (isTextField(event.target) || window.document.querySelector('dialog[open]')) return;
      const text = event.clipboardData?.getData('text/plain') ?? '';
      if (!text.trim().startsWith('{')) return;
      event.preventDefault();
      loadText(text, 'Clipboard');
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [loadText]);

  // Drag and drop a .json file anywhere on the page
  useEffect(() => {
    const handleDragEnter = (event: DragEvent) => {
      if (!isFileDrag(event)) return;
      dragDepthRef.current += 1;
      setIsDragging(true);
    };
    const handleDragOver = (event: DragEvent) => {
      if (!isFileDrag(event)) return;
      event.preventDefault();
      if (event.dataTransfer) event.dataTransfer.dropEffect = 'copy';
    };
    const handleDragLeave = (event: DragEvent) => {
      if (!isFileDrag(event)) return;
      dragDepthRef.current = Math.max(0, dragDepthRef.current - 1);
      if (dragDepthRef.current === 0) setIsDragging(false);
    };
    const handleDrop = (event: DragEvent) => {
      if (!isFileDrag(event)) return;
      event.preventDefault();
      dragDepthRef.current = 0;
      setIsDragging(false);
      const file = event.dataTransfer?.files[0];
      if (file) openFile(file);
    };
    window.addEventListener('dragenter', handleDragEnter);
    window.addEventListener('dragover', handleDragOver);
    window.addEventListener('dragleave', handleDragLeave);
    window.addEventListener('drop', handleDrop);
    return () => {
      window.removeEventListener('dragenter', handleDragEnter);
      window.removeEventListener('dragover', handleDragOver);
      window.removeEventListener('dragleave', handleDragLeave);
      window.removeEventListener('drop', handleDrop);
    };
  }, [openFile]);

  return { error, clearError: () => setError(null), isDragging, openFile, pasteFromClipboard };
}
