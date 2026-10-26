import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// `?embed=true` shows only the viewer, for <iframe> embeds. Each mode is loaded on demand so an
// embed never downloads the playground (demo networks, icon gallery) and the other way round.
const isEmbed = new URLSearchParams(window.location.search).get('embed') === 'true';
const Root = isEmbed
  ? lazy(() => import('./EmbedView').then((m) => ({ default: m.EmbedView })))
  : lazy(() => import('./App').then((m) => ({ default: m.App })));

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Suspense fallback={<div className="h-dvh bg-[#242424]" />}>
        <Root />
      </Suspense>
    </React.StrictMode>,
  );
}
