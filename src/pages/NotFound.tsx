import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-32 text-center">
      <AlertTriangle className="w-10 h-10 text-safety-orange mx-auto mb-6" />
      <div className="mono-data text-safety-orange mb-3">RENDER_FAULT // ROUTE_404</div>
      <h1 className="text-5xl md:text-7xl font-black uppercase text-signal-white display-tight mb-6">
        Unrendered.
      </h1>
      <p className="text-white/50 max-w-md mx-auto mb-10">
        The coordinates you supplied resolve to no distinction. This region of the simulation has not been rendered.
      </p>
      <Link
        to="/"
        className="inline-block px-8 py-4 bg-signal-white text-black font-bold uppercase tracking-widest text-sm hover:bg-positive-green transition-colors"
      >
        Return to Base
      </Link>
    </div>
  );
}
