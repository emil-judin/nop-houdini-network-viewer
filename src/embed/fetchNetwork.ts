/**
 * Largest network file the viewer reads (100 MB). Real exports are a few MB; anything much larger
 * would freeze the visitor's tab while it is parsed.
 */
export const MAX_NETWORK_BYTES = 100 * 1024 * 1024;

/** Time after which a network download is given up (30 seconds). */
export const NETWORK_TIMEOUT_MS = 30_000;

/** Readable size such as `120 MB`. */
export function formatMegabytes(bytes: number): string {
  return `${Math.round(bytes / (1024 * 1024))} MB`;
}

/**
 * Abort signal that fires on `signal` or after the timeout. `AbortSignal.timeout` and
 * `AbortSignal.any` are feature-detected; without them the download has no time limit.
 */
function withTimeout(signal: AbortSignal | undefined): { signal: AbortSignal | undefined; timedOut: () => boolean } {
  if (typeof AbortSignal.timeout !== 'function') return { signal, timedOut: () => false };
  const timeout = AbortSignal.timeout(NETWORK_TIMEOUT_MS);
  const timedOut = () => timeout.aborted && !signal?.aborted;
  if (!signal) return { signal: timeout, timedOut };
  if (typeof AbortSignal.any === 'function') return { signal: AbortSignal.any([signal, timeout]), timedOut };
  // Older browsers: the caller's signal alone (the download then has no time limit)
  return { signal, timedOut };
}

/**
 * Downloads an exported network JSON file for the web component and the iframe embed page.
 *
 * Errors are rewritten into plain sentences the site owner can act on (wrong path, file not
 * reachable from this site, not a JSON file), because they are shown inside the viewer.
 *
 * @param src URL of the `.json` file, absolute or relative to the page.
 * @param signal Optional abort signal (used when the `src` changes before the download ends).
 */
export async function fetchNetworkJson(src: string, signal?: AbortSignal): Promise<unknown> {
  const limit = withTimeout(signal);
  const tooLarge = () =>
    new Error(`"${src}" is larger than ${formatMegabytes(MAX_NETWORK_BYTES)}, which is more than the viewer can show.`);
  const timeoutError = () =>
    new Error(`Downloading "${src}" took longer than ${NETWORK_TIMEOUT_MS / 1000} seconds. Try again later.`);
  let response: Response;
  try {
    response = await fetch(src, { signal: limit.signal, credentials: 'same-origin' });
  } catch (err) {
    if (limit.timedOut()) throw timeoutError();
    if (err instanceof DOMException && err.name === 'AbortError') throw err;
    throw new Error(
      `Could not download "${src}". If the file is on another website, that server must allow cross-origin requests (CORS).`,
    );
  }
  if (!response.ok) {
    throw new Error(`Could not download "${src}" (HTTP ${response.status}). Check that the file path is correct.`);
  }
  const declaredLength = Number(response.headers.get('content-length'));
  if (declaredLength > MAX_NETWORK_BYTES) throw tooLarge();
  let text: string;
  try {
    text = await response.text();
  } catch (err) {
    if (limit.timedOut()) throw timeoutError();
    throw err;
  }
  // Compressed or chunked responses may not declare their length
  if (text.length > MAX_NETWORK_BYTES) throw tooLarge();
  // Many hosts answer a wrong path with their HTML home page (status 200) instead of a 404
  if (/^\s*</.test(text)) {
    throw new Error(`"${src}" returned a web page instead of the JSON file. Check that the file path is correct.`);
  }
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`"${src}" is not a valid JSON file. Export the network again with the Houdini shelf tool.`);
  }
}
