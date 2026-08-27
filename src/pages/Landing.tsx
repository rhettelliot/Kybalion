import { Link } from 'react-router-dom';
import {
  ChevronRight,
  Shield,
  AlertTriangle,
  BookOpen,
  Gauge,
  SlidersHorizontal,
  Eye,
  Layers,
  Radio,
} from 'lucide-react';
import { CornerFrame } from '../components/CornerFrame';
import { SectionHeader } from '../components/SectionHeader';
import { CHAPTERS } from '../lib/chapters';

const FILTERS = CHAPTERS.filter((c) => c.number > 0);

export default function Landing() {
  return (
    <>
      {/* ─── Hero ───────────────────────────────────────────────────────── */}
      <section className="relative max-w-7xl mx-auto px-6 pt-20 pb-24 border-b border-border">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-10">
            <div className="fade-up">
              <div className="mono-data text-signal mb-6 flex items-center gap-2">
                <Shield className="w-3.5 h-3.5" /> CLASSIFIED // PROTOCOL_2026 // FILE-003
              </div>
              <h1 className="text-[clamp(3rem,8vw,7.5rem)] font-black uppercase display-tight text-ink mb-6">
                Bio-Tactical<br />
                Ontological<br />
                Counter&shy;measures
              </h1>
              <p className="text-xl md:text-2xl text-ink-2 font-medium mb-10 max-w-2xl">
                Seven principles, stripped for parts.
                <span className="text-ink-3"> Seven distinctions installed as a rendering engine for reality.</span>
              </p>
              <blockquote className="border-l-2 border-signal pl-6 py-1 mb-12 max-w-2xl">
                <p className="text-lg italic text-ink leading-relaxed">
                  "It describes not truths to be believed, but distinctions to be installed."
                </p>
              </blockquote>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/distinctions/d00"
                  className="group px-8 py-4 bg-ink text-canvas font-bold uppercase tracking-widest text-sm hover:bg-signal transition-colors flex items-center justify-center gap-3"
                >
                  Begin Installation <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/audit"
                  className="px-8 py-4 border border-border-hi text-ink font-bold uppercase tracking-widest text-sm hover:bg-surface-hi hover:border-border-hi transition-colors flex items-center justify-center gap-3"
                >
                  <Gauge className="w-4 h-4" /> Run Audit
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <CornerFrame className="p-8 bg-surface scanline">
              <div className="flex items-center justify-between mb-6">
                <div className="mono-data text-ink-3">RENDER_ENGINE // FILTER_STACK</div>
                <div className="flex items-center gap-2 mono-data text-signal">
                  <div className="w-1.5 h-1.5 bg-signal blink" /> LIVE
                </div>
              </div>

              <div className="space-y-0 border border-border">
                {FILTERS.map((c, i) => (
                  <div
                    key={c.id}
                    className={`flex items-center justify-between px-4 py-3 ${i < FILTERS.length - 1 ? 'border-b border-border' : ''}`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="mono-data text-ink-ghost shrink-0">{String(c.number).padStart(2, '0')}</span>
                      <span className="mono-data text-ink truncate">{c.title.toUpperCase()}</span>
                    </div>
                    <span className="mono-data text-signal shrink-0 ml-3">LOADED</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-2.5 pt-6 border-t border-border">
                {[
                  ['SUBSTRATE',        'MIND',      'text-signal'],
                  ['RENDER_AUTHORITY', 'OPERATOR',  'text-signal'],
                  ['DEFAULT_SETTINGS', 'OVERRIDDEN','text-signal'],
                  ['SENTIMENTALITY',   'SUSPENDED', 'text-ink'],
                ].map(([label, val, color]) => (
                  <div key={label} className="flex justify-between items-center">
                    <span className="mono-data text-ink-3">{label}</span>
                    <span className={`mono-data ${color}`}>{val}</span>
                  </div>
                ))}
              </div>
            </CornerFrame>

            <div className="mt-4 flex justify-between mono-data text-ink-3">
              <span>SOURCE: ARCHIVAL_PROTOCOL // KYBALION</span>
              <span>BUF: OPTIMAL</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Reactive vs Sovereign ─────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-b border-border">
        <SectionHeader
          num="01"
          icon={<AlertTriangle className="text-signal w-7 h-7" />}
          title="Observed vs. Author"
          sub="The renderer is running either way. The only question is who administers it."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-border">
          <div className="p-8 md:border-r border-b md:border-b-0 border-border">
            <div className="mono-data text-signal mb-3">SUBJECT_A // REACTIVE HUMAN</div>
            <div className="font-mono text-4xl md:text-5xl text-ink mb-2 display-tight">FACTORY SETTINGS</div>
            <p className="mono-data text-ink-3 mb-6">CONTENT OF THE SIMULATION</p>
            <p className="text-sm leading-relaxed">
              Perceives reality as a fixed block of granite that happens <em>to</em> them. Renderer dominated by
              historical trauma, social conditioning, and biological imperatives. Defends a perimeter that is
              already breached.
            </p>
          </div>
          <div className="p-8">
            <div className="mono-data text-signal mb-3">SUBJECT_B // SOVEREIGN OPERATOR</div>
            <div className="font-mono text-4xl md:text-5xl text-ink mb-2 display-tight">ADMINISTRATOR</div>
            <p className="mono-data text-ink-3 mb-6">AUTHOR OF THE RENDER</p>
            <p className="text-sm leading-relaxed">
              Treats reality as a participatory render and the seven distinctions as its specification. Changes the
              output by recalibrating the renderer — the projector, not the cinema screen.
            </p>
          </div>
        </div>
        <p className="mt-8 mono-data text-ink-3 text-center">
          SOVEREIGNTY = A STABLE RENDER MAINTAINED AGAINST INCOMING SIGNAL NOISE
        </p>
      </section>

      {/* ─── The Seven Distinctions ────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-b border-border">
        <SectionHeader
          num="02"
          icon={<Layers className="text-signal w-7 h-7" />}
          title="The Tactical Stack"
          sub="Seven operational principles, reframed as installable specifications."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-border">
          {FILTERS.map((c, i) => (
            <Link
              key={c.id}
              to={`/distinctions/${c.id}`}
              className={`p-8 hover:bg-surface transition-colors group relative
                ${(i + 1) % 3 !== 0 ? 'lg:border-r' : ''}
                ${i % 2 === 0 ? 'md:border-r lg:border-r' : ''}
                ${i < FILTERS.length - 1 ? 'border-b lg:border-b' : ''}
                ${i < 6 ? '' : 'lg:border-b-0'}
                border-border`}
            >
              <div className="flex justify-between items-start mb-5">
                <div className="mono-data text-ink-3">D-{String(c.number).padStart(2, '0')}</div>
                <div className="mono-data text-signal">{c.principle.toUpperCase()}</div>
              </div>
              <h3 className="text-xl font-bold text-ink uppercase display-tight mb-3 group-hover:text-signal transition-colors">
                {c.title}
              </h3>
              <p className="mono-data text-signal/70 mb-6">THREAT: {c.threatVector.toUpperCase()}</p>
              <div className="mono-data text-ink-3 group-hover:text-ink transition-colors flex items-center gap-2">
                INSTALL <ChevronRight className="w-3 h-3" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── Consoles ──────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-b border-border">
        <SectionHeader
          num="03"
          icon={<SlidersHorizontal className="text-signal w-7 h-7" />}
          title="Field Consoles"
          sub="The distinctions, operationalized. Both consoles persist locally — nothing leaves your device."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-border">
          <Link
            to="/audit"
            className="p-8 md:border-r border-b md:border-b-0 border-border hover:bg-surface transition-colors group"
          >
            <Gauge className="w-6 h-6 text-signal mb-5" />
            <h3 className="text-2xl font-bold text-ink uppercase display-tight mb-3 group-hover:text-signal transition-colors">
              Installation Audit
            </h3>
            <p className="text-sm text-ink-2 leading-relaxed mb-6">
              Rate the integrity of each installed filter. The audit computes render-engine status and routes the
              weakest filter to its distinction for reinstallation.
            </p>
            <div className="mono-data text-ink-3 group-hover:text-ink transition-colors flex items-center gap-2">
              RUN_AUDIT <ChevronRight className="w-3 h-3" />
            </div>
          </Link>
          <Link to="/spectrum" className="p-8 hover:bg-surface transition-colors group">
            <SlidersHorizontal className="w-6 h-6 text-signal mb-5" />
            <h3 className="text-2xl font-bold text-ink uppercase display-tight mb-3 group-hover:text-signal transition-colors">
              Spectrum Console
            </h3>
            <p className="text-sm text-ink-2 leading-relaxed mb-6">
              Polarity in practice: locate your position on the activation, valence, or pendulum spectrum and receive
              the transmutation directive for that band.
            </p>
            <div className="mono-data text-ink-3 group-hover:text-ink transition-colors flex items-center gap-2">
              OPEN_CONSOLE <ChevronRight className="w-3 h-3" />
            </div>
          </Link>
        </div>
      </section>

      {/* ─── Final Directive ───────────────────────────────────────────── */}
      <section className="border-b border-border bg-surface">
        <div className="max-w-5xl mx-auto px-6 py-24 text-center">
          <Eye className="w-6 h-6 text-ink-3 mx-auto mb-6" />
          <p className="text-3xl md:text-5xl text-ink font-medium leading-snug display-tight">
            "To edit the movie,<br />
            go back to the projector."
          </p>
          <p className="mono-data text-ink-3 mt-6">FINAL_DIRECTIVE // DISTINCTION_01 // THE_RENDERING_LAYER</p>
        </div>
      </section>

      {/* ─── CTA ───────────────────────────────────────────────────────── */}
      <section className="bg-surface">
        <div className="max-w-7xl mx-auto px-6 py-28 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7">
            <div className="mono-data text-signal mb-4 flex items-center gap-2">
              <Radio className="w-3.5 h-3.5" /> TRANSMISSION_END
            </div>
            <h2 className="text-5xl md:text-7xl font-black uppercase text-ink display-tight mb-6">
              Administer<br />the Render.
            </h2>
            <p className="text-lg text-ink-2 max-w-xl">
              Installation is complete when you no longer think about the seven filters — when all incoming data
              renders through them automatically.
            </p>
          </div>
          <div className="md:col-span-5 flex flex-col gap-3">
            <Link
              to="/distinctions/d00"
              className="px-6 py-4 bg-ink text-canvas font-bold uppercase tracking-widest text-sm flex items-center justify-between hover:bg-signal transition-colors"
            >
              <span>Begin Installation · Protocol 00</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              to="/distinctions"
              className="px-6 py-4 border border-border-hi text-ink font-bold uppercase tracking-widest text-sm flex items-center justify-between hover:bg-surface-hi hover:border-border-hi transition-colors"
            >
              <span>Browse the Seven Distinctions</span>
              <BookOpen className="w-4 h-4" />
            </Link>
            <Link
              to="/audit"
              className="px-6 py-4 border border-border-hi text-ink font-bold uppercase tracking-widest text-sm flex items-center justify-between hover:bg-surface-hi hover:border-border-hi transition-colors"
            >
              <span>Check Installation Status</span>
              <Gauge className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
