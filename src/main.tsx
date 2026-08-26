import React, { Suspense, lazy, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import App from './App';
import Landing from './pages/Landing';
import './index.css';

// Landing stays eager for instant first paint; every other page is code-split.
const Distinctions = lazy(() => import('./pages/Distinctions'));
const Chapter = lazy(() => import('./pages/Chapter'));
const Audit = lazy(() => import('./pages/Audit'));
const Spectrum = lazy(() => import('./pages/Spectrum'));
const NotFound = lazy(() => import('./pages/NotFound'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
}

function PageLoading() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-32 flex items-center gap-3 mono-data text-ink-3">
      <div className="w-1.5 h-1.5 bg-signal blink" /> LOADING_MODULE…
    </div>
  );
}

// Catches chunk-load failures (offline, stale deploy) and render errors so a
// broken lazy route degrades to a retry screen instead of a blank app.
class RouteErrorBoundary extends React.Component<{ children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div className="max-w-3xl mx-auto px-6 py-32 text-center">
        <div className="mono-data text-signal mb-3">MODULE_FAULT // LOAD_FAILED</div>
        <p className="text-ink-3 max-w-md mx-auto mb-10">
          A module failed to load. Check your connection — or a new build may have shipped underneath you.
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-4 bg-ink text-canvas font-bold uppercase tracking-widest text-sm hover:bg-signal transition-colors"
          >
            Reload
          </button>
          <Link
            to="/"
            onClick={() => this.setState({ failed: false })}
            className="px-8 py-4 border border-border-hi text-ink font-bold uppercase tracking-widest text-sm hover:bg-surface-hi transition-colors"
          >
            Return to Base
          </Link>
        </div>
      </div>
    );
  }
}

const page = (node: React.ReactNode) => (
  <RouteErrorBoundary>
    <Suspense fallback={<PageLoading />}>{node}</Suspense>
  </RouteErrorBoundary>
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<App />}>
          <Route index element={<Landing />} />
          <Route path="audit" element={page(<Audit />)} />
          <Route path="spectrum" element={page(<Spectrum />)} />
          <Route path="distinctions" element={page(<Distinctions />)} />
          <Route path="distinctions/:chapterId" element={page(<Chapter />)} />
          <Route path="*" element={page(<NotFound />)} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
