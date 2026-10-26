import React from 'react';
import { NetworkErrorState } from './hud/NetworkErrorState';

/**
 * Props for `NetworkErrorBoundary`.
 */
export interface NetworkErrorBoundaryProps {
  /** Any value identifying the current network data; a new value clears a previous error. */
  resetKey: unknown;
  /** The viewer content to protect. */
  children: React.ReactNode;
}

interface NetworkErrorBoundaryState {
  error: Error | null;
}

/**
 * Catches rendering errors caused by unexpected network data and shows `NetworkErrorState`
 * instead of letting the error unmount the host application.
 */
export class NetworkErrorBoundary extends React.Component<NetworkErrorBoundaryProps, NetworkErrorBoundaryState> {
  state: NetworkErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): NetworkErrorBoundaryState {
    return { error };
  }

  componentDidUpdate(prevProps: NetworkErrorBoundaryProps): void {
    if (this.state.error && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ error: null });
    }
  }

  render(): React.ReactNode {
    if (this.state.error) {
      return <NetworkErrorState message={this.state.error.message} />;
    }
    return this.props.children;
  }
}
