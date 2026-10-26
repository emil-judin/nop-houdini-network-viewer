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
  let response: Response;
  try {
    response = await fetch(src, { signal, credentials: 'same-origin' });
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') throw err;
    throw new Error(
      `Could not download "${src}". If the file is on another website, that server must allow cross-origin requests (CORS).`,
    );
  }
  if (!response.ok) {
    throw new Error(`Could not download "${src}" (HTTP ${response.status}). Check that the file path is correct.`);
  }
  const text = await response.text();
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
