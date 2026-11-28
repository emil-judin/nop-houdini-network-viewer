/**
 * The public API of `nop-houdini-network-viewer`, without the stylesheet import of `index.ts`.
 *
 * `src/index.ts` (the npm entry) re-exports this file. The playground imports from here, so it uses
 * the package the way a React user does (enforced by `no-restricted-imports` in `eslint.config.js`).
 */

export * from './schema/types';
export * from './schema/converter';
export { HoudiniNetwork, type HoudiniNetworkProps } from './components/HoudiniNetwork';
export { RemoteHoudiniNetwork, type RemoteHoudiniNetworkProps } from './embed/RemoteHoudiniNetwork';
export { parseEmbedOptions, type EmbedViewerOptions } from './embed/embedAttributes';
/**
 * Largest network file the viewer reads, in bytes (100 MB). Check it before reading a file a
 * visitor opens, so a huge file is never loaded into memory.
 */
export { MAX_NETWORK_BYTES } from './embed/fetchNetwork';
/**
 * The viewer's loading placeholder and error panel, for an app that loads the network itself and
 * shows these until `<HoudiniNetwork />` can draw it (the same look as `<RemoteHoudiniNetwork />`).
 */
export {
  NetworkLoadingState,
  type NetworkLoadingStateProps,
} from './components/hud/NetworkLoadingState';
export { NetworkErrorState, type NetworkErrorStateProps } from './components/hud/NetworkErrorState';
