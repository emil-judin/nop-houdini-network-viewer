import React, { useEffect, useMemo, useState } from 'react';
import { parseEmbedOptions } from '../embed/embedAttributes';
import { NetworkLoadingState } from '../components/hud/NetworkLoadingState';
import { RemoteHoudiniNetwork } from '../embed/RemoteHoudiniNetwork';

/**
 * Bundled demo networks available to `?embed=true&demo=<key>` (loaded on demand).
 */
const DEMO_LOADERS: Record<string, () => Promise<{ default: unknown }>> = {
  circuit: () => import('../../fixtures/circuit_gen-network.json'),
  board: () => import('../../fixtures/circuit_board-network.json'),
};

/**
 * Full-page viewer for `<iframe>` embeds (`?embed=true`).
 *
 * URL parameters:
 * - `src`: URL of an exported network `.json` file (must allow cross-origin requests when on another site).
 * - `demo`: `circuit` or `board` to show a bundled demo network instead.
 * - Viewer options shared with the web component: `label-size`, `wire-style`, `minimap`,
 *   `toolbar`, `inspector`, `debug-actions`, `fit-view` (see `parseEmbedOptions`).
 */
export const EmbedView: React.FC = () => {
  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const options = useMemo(() => parseEmbedOptions((name) => params.get(name)), [params]);
  const demoKey = params.get('demo');
  const [demoData, setDemoData] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    const load = demoKey ? DEMO_LOADERS[demoKey] : undefined;
    if (!load) return;
    let cancelled = false;
    load().then((module) => {
      if (!cancelled) setDemoData(module.default as Record<string, unknown>);
    });
    return () => {
      cancelled = true;
    };
  }, [demoKey]);

  const isDemo = Boolean(demoKey && DEMO_LOADERS[demoKey]);

  return (
    <div className="w-full h-dvh bg-[#242424]">
      {isDemo && !demoData ? (
        <NetworkLoadingState />
      ) : (
        <RemoteHoudiniNetwork
          src={isDemo ? undefined : params.get('src')}
          data={demoData}
          showDebugActions={false}
          {...options}
          className="h-full"
        />
      )}
    </div>
  );
};
