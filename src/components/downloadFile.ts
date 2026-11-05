/**
 * Saves a blob as a file download (`<a download>`).
 *
 * The link is attached to the page and the object URL revoked only after the browser has started
 * the download: revoking right after `click()` can cancel it in Safari and Firefox. The link is
 * never visible and is removed at once, so nothing stays in the host page.
 */
export function downloadBlob(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob);
  const link = window.document.createElement('a');
  link.href = url;
  link.download = fileName;
  window.document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
