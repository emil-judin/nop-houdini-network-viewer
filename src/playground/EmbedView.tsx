import React, { useEffect, useMemo, useState } from 'react';
import { parseEmbedOptions, RemoteHoudiniNetwork } from '../api';
import { findExample, loadExample } from './examples';
import { NetworkErrorState } from '../components/hud/NetworkErrorState';
import { NetworkLoadingState } from '../components/hud/NetworkLoadingState';


/**
 * Host name of `src` when the file comes from another site than this page, else `null`.
 * Shown under the viewer, so a link to this page cannot pass off someone else's network (and its
 * sticky note text) as content of the NOP site.
 */
function foreignHost(src: string | null): string | null {
  if (!src) return null;
  try {
    const url = new URL(src, window.location.href);
    return url.origin === window.location.origin ? null : url.host;
  } catch {
    return null;
  }
}

/**
 * Full-page viewer for `<iframe>` embeds (`?embed=true`).
 *
 * URL parameters:
 * - `src`: URL of an exported network `.json` file (must allow cross-origin requests when on another site).
 * - `demo`: the key of a playground example (`board`, `circuit`, see `examples.ts`) to show it instead.
 * - Viewer options shared with the web component: `label-size`, `wire-style`, `focus-node`, `minimap`,
 *   `touch-pan`, `toolbar`, `fullscreen`, `inspector`, `debug-actions`, `fit-view`, `hotkeys` (see `parseEmbedOptions`).
 */
export const EmbedView: React.FC = () => {
  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const options = useMemo(() => parseEmbedOptions((name) => params.get(name)), [params]);
  const demoKey = params.get('demo');
  const [demoData, setDemoData] = useState<Record<string, unknown> | null>(null);
  const [demoError, setDemoError] = useState<string | null>(null);

  const demo = findExample(demoKey);

  useEffect(() => {
    if (!demo) return;
    let cancelled = false;
    loadExample(demo).then(
      (data) => {
        if (!cancelled) setDemoData(data as Record<string, unknown>);
      },
      (err: unknown) => {
        if (!cancelled) setDemoError(err instanceof Error ? err.message : String(err));
      },
    );
    return () => {
      cancelled = true;
    };
  }, [demo]);

  const isDemo = Boolean(demo);
  const src = isDemo ? null : params.get('src');
  const sourceHost = foreignHost(src);

  let content: React.ReactNode;
  if (isDemo && demoError) {
    content = <NetworkErrorState message={demoError} hint="The demo network could not be loaded. Reload the page to try again." />;
  } else if (isDemo && !demoData) {
    content = <NetworkLoadingState />;
  } else {
    content = <RemoteHoudiniNetwork src={src} data={demoData} {...options} className="h-full" />;
  }

  return (
    <div className="w-full h-dvh flex flex-col bg-[#242424]">
      <div className="flex-1 min-h-0">{content}</div>
      {sourceHost && (
        <p className="nop-root shrink-0 px-2 py-0.5 bg-[#1b1b1b] text-[11px] text-[#b0b0b0] truncate">
          Network from {sourceHost}, shown with the NOP viewer
        </p>
      )}
    </div>
  );
};
