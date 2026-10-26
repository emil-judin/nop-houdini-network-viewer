/**
 * Converts a raw SVG string into a safe `data:image/svg+xml;utf8,...` URI for `<img />` rendering.
 * Returns `null` for anything that is not SVG markup.
 */
export function svgToDataUri(svgString: string | undefined): string | null {
  if (!svgString || !svgString.includes('<svg')) {
    return null;
  }
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
}
