import { downloadBlob } from './downloadFile';
import { CANVAS_COLOR } from './theme';

/** Overlays that are not part of the network and stay out of the picture (the overview). */
const LEFT_OUT_CLASSES = ['react-flow__minimap', 'react-flow__panel'];

/**
 * Saves what the network canvas shows as a PNG file: the current pan and zoom, without the pane
 * header, the parameter pane and the overview. Drawn at least at 2x so text and wires stay sharp.
 *
 * `html-to-image` is loaded only on the first screenshot (its own chunk), so viewers that never
 * take one do not download it. Everything happens in the browser: the network is never sent.
 *
 * @param canvas The React Flow element (`.react-flow`) of the viewer.
 * @param fileName Name of the downloaded file, for example `for_each.png`.
 */
export async function saveNetworkScreenshot(canvas: HTMLElement, fileName: string): Promise<void> {
  const { toBlob } = await import('html-to-image');
  const blob = await toBlob(canvas, {
    pixelRatio: Math.min(3, Math.max(2, window.devicePixelRatio || 1)),
    backgroundColor: CANVAS_COLOR,
    filter: (node) => !(node instanceof Element && LEFT_OUT_CLASSES.some((name) => node.classList.contains(name))),
  });
  if (!blob) throw new Error('The browser could not draw the screenshot.');
  downloadBlob(blob, fileName);
}

/** File name of a screenshot of the network level at `networkPath` (`/obj/for_each` gives `for_each.png`). */
export function screenshotFileName(networkPath: string): string {
  const level = networkPath.split('/').filter(Boolean).pop() || 'houdini-network';
  return `${level}.png`;
}
