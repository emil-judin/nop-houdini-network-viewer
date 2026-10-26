import React, { useEffect, useState } from 'react';
import { HoudiniNetwork, type HoudiniNetworkProps } from '../components/HoudiniNetwork';
import { NetworkErrorState } from '../components/hud/NetworkErrorState';
import { NetworkLoadingState } from '../components/hud/NetworkLoadingState';
import { fetchNetworkJson } from './fetchNetwork';

/**
 * Props for `<RemoteHoudiniNetwork />`: the viewer props, with the network given either as
 * data or as the URL of an exported `.json` file.
 */
export interface RemoteHoudiniNetworkProps extends Omit<HoudiniNetworkProps, 'data'> {
  /** URL of an exported network `.json` file (absolute or relative to the page). */
  src?: string | null;
  /** Network data. Used instead of `src` when both are given. */
  data?: HoudiniNetworkProps['data'] | null;
}

type LoadState =
  | { status: 'idle' }
  | { status: 'loading'; src: string }
  | { status: 'ready'; src: string; data: Record<string, unknown> }
  | { status: 'error'; src: string; message: string };

/**
 * Houdini network viewer that downloads its network from a URL, with a loading state and a
 * friendly error panel. Used by the `<houdini-network src="...">` web component and by the
 * playground's `?embed=true` iframe page.
 */
export const RemoteHoudiniNetwork: React.FC<RemoteHoudiniNetworkProps> = ({ src, data, ...viewerProps }) => {
  const [state, setState] = useState<LoadState>({ status: 'idle' });

  useEffect(() => {
    if (data || !src) {
      setState({ status: 'idle' });
      return;
    }
    const controller = new AbortController();
    setState({ status: 'loading', src });
    fetchNetworkJson(src, controller.signal)
      .then((json) => setState({ status: 'ready', src, data: json as Record<string, unknown> }))
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        setState({ status: 'error', src, message: err instanceof Error ? err.message : String(err) });
      });
    return () => controller.abort();
  }, [src, data]);

  if (data) {
    return <HoudiniNetwork {...viewerProps} data={data} />;
  }
  if (state.status === 'ready') {
    return <HoudiniNetwork {...viewerProps} data={state.data} />;
  }
  if (state.status === 'error') {
    return <NetworkErrorState message={state.message} hint="The network file could not be loaded." />;
  }
  if (!src) {
    return (
      <NetworkErrorState
        message='Add the exported file, for example src="my-network.json".'
        hint="No Houdini network file was given."
      />
    );
  }
  return <NetworkLoadingState />;
};
