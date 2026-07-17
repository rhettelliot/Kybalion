import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Shield, Github, Menu, X } from 'lucide-react';
import { LiveClock } from './components/LiveClock';

const navLink = ({ isActive }: { isActive: boolean }) =>
  `transition-colors ${isActive ? 'text-signal-white' : 'text-white/60 hover:text-signal-white'}`;

const NAV_ITEMS = [
  { to: '/audit', label: 'Audit' },
  { to: '/spectrum', label: 'Spectrum' },
  { to: '/distinctions', label: 'Distinctions' },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  // Close the mobile menu on navigation.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-black-main text-gray-700 flex flex-col">
      {/* ─── Top Nav (+ mobile menu share one sticky container) ─────────── */}
      <div className="sticky top-0 z-50">
        <nav className="border-b border-white/10 px-6 py-3 flex items-center justify-between bg-black/80 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="w-1.5 h-1.5 bg-positive-green blink" />
            <NavLink to="/" end className="mono-data text-signal-white hover:text-positive-green transition-colors">
              BTOC
            </NavLink>
            <span className="mono-data text-white/30 hidden sm:inline">{`// BIO-TACTICAL ONTOLOGICAL COUNTERMEASURES // V.${__BUILD_DATE__.slice(0, 7)}`}</span>
          </div>
          <div className="hidden md:flex gap-7 mono-data">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.to} to={item.to} className={navLink}>{item.label}</NavLink>
            ))}
          </div>
          <div className="hidden lg:block">
            <LiveClock />
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            className="md:hidden text-white/60 hover:text-signal-white transition-colors p-1 -mr-1"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>

        {/* ─── Mobile Menu ─────────────────────────────────────────────── */}
        {menuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-sm border-b border-white/10">
            {NAV_ITEMS.map((item, i) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center justify-between px-6 py-4 mono-data transition-colors ${
                    i < NAV_ITEMS.length - 1 ? 'border-b border-white/10' : ''
                  } ${isActive ? 'text-signal-white bg-black-off' : 'text-white/60 hover:text-signal-white hover:bg-black-off'}`
                }
              >
                <span>{item.label}</span>
                <span className="text-white/25">{String(i + 1).padStart(2, '0')}</span>
              </NavLink>
            ))}
          </div>
        )}
      </div>

      {/* ─── Page ────────────────────────────────────────────────────────── */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* ─── Footer ──────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/10 px-6 py-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mono-data text-white/40">
          <div className="flex items-center gap-3">
            <Shield className="w-3.5 h-3.5" />
            <span>© 2026 · BIO-TACTICAL ONTOLOGICAL COUNTERMEASURES</span>
          </div>
          <div className="flex gap-6 items-center">
            <span>BUILD: {__BUILD_DATE__}</span>
            <span>SISTER: BTNC · BTRC</span>
            <a
              href="https://github.com/rhettelliot/Kybalion"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-white/60 hover:text-signal-white transition-colors"
            >
              <Github className="w-3.5 h-3.5" /> SOURCE
            </a>
            <span className="text-positive-green">SYS_OK</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
