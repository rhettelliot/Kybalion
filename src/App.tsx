import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Shield, Github, Menu, X } from 'lucide-react';
import { LiveClock } from './components/LiveClock';

const navLink = ({ isActive }: { isActive: boolean }) =>
  `transition-colors ${isActive ? 'text-ink' : 'text-ink-2 hover:text-ink'}`;

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
    <div className="min-h-screen bg-canvas text-ink-2 flex flex-col">
      {/* ─── Top Nav (+ mobile menu share one sticky container) ─────────── */}
      <div className="sticky top-0 z-50">
        <nav className="border-b border-border px-6 py-3 flex items-center justify-between bg-canvas ">
          <div className="flex items-center gap-4">
            <div className="w-1.5 h-1.5 bg-signal blink" />
            <NavLink to="/" end className="mono-data text-ink hover:text-signal transition-colors">
              BTOC
            </NavLink>
            <span className="mono-data text-ink-3 hidden sm:inline">{`// BIO-TACTICAL ONTOLOGICAL COUNTERMEASURES // V.${__BUILD_DATE__.slice(0, 7)}`}</span>
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
            className="md:hidden text-ink-2 hover:text-ink transition-colors p-1 -mr-1"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>

        {/* ─── Mobile Menu ─────────────────────────────────────────────── */}
        {menuOpen && (
          <div className="md:hidden bg-canvas  border-b border-border">
            {NAV_ITEMS.map((item, i) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center justify-between px-6 py-4 mono-data transition-colors ${
                    i < NAV_ITEMS.length - 1 ? 'border-b border-border' : ''
                  } ${isActive ? 'text-ink bg-surface' : 'text-ink-2 hover:text-ink hover:bg-surface'}`
                }
              >
                <span>{item.label}</span>
                <span className="text-ink-ghost">{String(i + 1).padStart(2, '0')}</span>
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
      <footer className="border-t border-border px-6 py-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mono-data text-ink-3">
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
              className="flex items-center gap-1.5 text-ink-2 hover:text-ink transition-colors"
            >
              <Github className="w-3.5 h-3.5" /> SOURCE
            </a>
            <span className="text-signal">SYS_OK</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
