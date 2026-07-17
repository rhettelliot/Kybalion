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
      <section className="relative max-w-7xl mx-auto px-6 pt-20 pb-24 border-b border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-10">
            <div className="fade-up">
              <div className="mono-data text-signal-blue mb-6 flex items-center gap-2">
                <Shield className="w-3.5 h-3.5" /> CLASSIFIED // PROTOCOL_2026 // FILE-003
              </div>
              <h1 className="text-[clamp(3rem,8vw,7.5rem)] font-black uppercase display-tight text-signal-white mb-6">
                Bio-Tactical<br />
                Ontological<br />
                Counter&shy;measures
              </h1>
              <p className="text-xl md:text-2xl text-signal-white/80 font-medium mb-10 max-w-2xl">
                The Kybalion, stripped for parts.
                <span className="text-white/40"> Seven distinctions installed as a rendering engine for reality.</span>
              </p>
              <blockquote className="border-l-2 border-safety-orange pl-6 py-1 mb-12 max-w-2xl">
                <p className="text-lg italic text-signal-white/90 leading-relaxed">
                  "It describes not truths to be believed, but distinctions to be installed."
                </p>
              </blockquote>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/distinctions/d00"
                  className="group px-8 py-4 bg-signal-white text-black font-bold uppercase tracking-widest text-sm hover:bg-positive-green transition-colors flex items-center justify-center gap-3"
                >
                  Begin Installation <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/audit"
                  className="px-8 py-4 border border-white/20 text-signal-white font-bold uppercase tracking-widest text-sm hover:bg-white/5 hover:border-white/40 transition-colors flex items-center justify-center gap-3"
                >
                  <Gauge className="w-4 h-4" /> Run Audit
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <CornerFrame className="p-8 bg-black-off/40 scanline">
              <div className="flex items-center justify-between mb-6">
                <div className="mono-data text-white/50">RENDER_ENGINE // FILTER_STACK</div>
                <div className="flex items-center gap-2 mono-data text-positive-green">
                  <div className="w-1.5 h-1.5 bg-positive-green blink" /> LIVE
                </div>
              </div>

              <div className="space-y-0 border border-white/10">
                {FILTERS.map((c, i) => (
                  <div
                    key={c.id}
                    className={`flex items-center justify-between px-4 py-3 ${i < FILTERS.length - 1 ? 'border-b border-white/10' : ''}`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="mono-data text-white/25 shrink-0">{String(c.number).padStart(2, '0')}</span>
                      <span className="mono-data text-signal-white truncate">{c.title.toUpperCase()}</span>
                    </div>
                    <span className="mono-data text-positive-green shrink-0 ml-3">LOADED</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-2.5 pt-6 border-t border-white/10">
                {[
                  ['SUBSTRATE',        'MIND',      'text-signal-blue'],
                  ['RENDER_AUTHORITY', 'OPERATOR',  'text-positive-green'],
                  ['DEFAULT_SETTINGS', 'OVERRIDDEN','text-positive-green'],
                  ['SENTIMENTALITY',   'SUSPENDED', 'text-signal-white'],
                ].map(([label, val, color]) => (
                  <div key={label} className="flex justify-between items-center">
                    <span className="mono-data text-white/50">{label}</span>
                    <span className={`mono-data ${color}`}>{val}</span>
                  </div>
                ))}
              </div>
            </CornerFrame>

            <div className="mt-4 flex justify-between mono-data text-white/30">
              <span>SOURCE: ARCHIVAL_PROTOCOL // KYBALION</span>
              <span>BUF: OPTIMAL</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Reactive vs Sovereign ─────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-b border-white/10">
        <SectionHeader
          num="01"
          icon={<AlertTriangle className="text-safety-orange w-7 h-7" />}
          title="Observed vs. Author"
          sub="The renderer is running either way. The only question is who administers it."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-white/10">
          <div className="p-8 md:border-r border-b md:border-b-0 border-white/10">
            <div className="mono-data text-safety-orange mb-3">SUBJECT_A // REACTIVE HUMAN</div>
            <div className="font-mono text-4xl md:text-5xl text-signal-white mb-2 display-tight">FACTORY SETTINGS</div>
            <p className="mono-data text-white/40 mb-6">CONTENT OF THE SIMULATION</p>
            <p className="text-sm leading-relaxed">
              Perceives reality as a fixed block of granite that happens <em>to</em> them. Renderer dominated by
              historical trauma, social conditioning, and biological imperatives. Defends a perimeter that is
              already breached.
            </p>
          </div>
          <div className="p-8">
            <div className="mono-data text-positive-green mb-3">SUBJECT_B // SOVEREIGN OPERATOR</div>
            <div className="font-mono text-4xl md:text-5xl text-signal-white mb-2 display-tight">ADMINISTRATOR</div>
            <p className="mono-data text-white/40 mb-6">AUTHOR OF THE RENDER</p>
            <p className="text-sm leading-relaxed">
              Treats reality as a participatory render and the seven distinctions as its specification. Changes the
              output by recalibrating the renderer — the projector, not the cinema screen.
            </p>
          </div>
        </div>
        <p className="mt-8 mono-data text-white/40 text-center">
          SOVEREIGNTY = A STABLE RENDER MAINTAINED AGAINST INCOMING SIGNAL NOISE
        </p>
      </section>

      {/* ─── The Seven Distinctions ────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-b border-white/10">
        <SectionHeader
          num="02"
          icon={<Layers className="text-signal-blue w-7 h-7" />}
          title="The Tactical Stack"
          sub="Seven Hermetic principles, reframed as installable specifications."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-white/10">
          {FILTERS.map((c, i) => (
            <Link
              key={c.id}
              to={`/distinctions/${c.id}`}
              className={`p-8 hover:bg-black-off transition-colors group relative
                ${(i + 1) % 3 !== 0 ? 'lg:border-r' : ''}
                ${i % 2 === 0 ? 'md:border-r lg:border-r' : ''}
                ${i < FILTERS.length - 1 ? 'border-b lg:border-b' : ''}
                ${i < 6 ? '' : 'lg:border-b-0'}
                border-white/10`}
            >
              <div className="flex justify-between items-start mb-5">
                <div className="mono-data text-white/30">D-{String(c.number).padStart(2, '0')}</div>
                <div className="mono-data text-signal-blue">{c.principle.toUpperCase()}</div>
              </div>
              <h3 className="text-xl font-bold text-signal-white uppercase display-tight mb-3 group-hover:text-positive-green transition-colors">
                {c.title}
              </h3>
              <p className="mono-data text-safety-orange/70 mb-6">THREAT: {c.threatVector.toUpperCase()}</p>
              <div className="mono-data text-white/40 group-hover:text-signal-white transition-colors flex items-center gap-2">
                INSTALL <ChevronRight className="w-3 h-3" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── Consoles ──────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-b border-white/10">
        <SectionHeader
          num="03"
          icon={<SlidersHorizontal className="text-positive-green w-7 h-7" />}
          title="Field Consoles"
          sub="The distinctions, operationalized. Both consoles persist locally — nothing leaves your device."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-white/10">
          <Link
            to="/audit"
            className="p-8 md:border-r border-b md:border-b-0 border-white/10 hover:bg-black-off transition-colors group"
          >
            <Gauge className="w-6 h-6 text-signal-blue mb-5" />
            <h3 className="text-2xl font-bold text-signal-white uppercase display-tight mb-3 group-hover:text-positive-green transition-colors">
              Installation Audit
            </h3>
            <p className="text-sm text-white/60 leading-relaxed mb-6">
              Rate the integrity of each installed filter. The audit computes render-engine status and routes the
              weakest filter to its distinction for reinstallation.
            </p>
            <div className="mono-data text-white/40 group-hover:text-signal-white transition-colors flex items-center gap-2">
              RUN_AUDIT <ChevronRight className="w-3 h-3" />
            </div>
          </Link>
          <Link to="/spectrum" className="p-8 hover:bg-black-off transition-colors group">
            <SlidersHorizontal className="w-6 h-6 text-positive-green mb-5" />
            <h3 className="text-2xl font-bold text-signal-white uppercase display-tight mb-3 group-hover:text-positive-green transition-colors">
              Spectrum Console
            </h3>
            <p className="text-sm text-white/60 leading-relaxed mb-6">
              Polarity in practice: locate your position on the activation, valence, or pendulum spectrum and receive
              the transmutation directive for that band.
            </p>
            <div className="mono-data text-white/40 group-hover:text-signal-white transition-colors flex items-center gap-2">
              OPEN_CONSOLE <ChevronRight className="w-3 h-3" />
            </div>
          </Link>
        </div>
      </section>

      {/* ─── Final Directive ───────────────────────────────────────────── */}
      <section className="border-b border-white/10 bg-black-off/30">
        <div className="max-w-5xl mx-auto px-6 py-24 text-center">
          <Eye className="w-6 h-6 text-white/40 mx-auto mb-6" />
          <p className="text-3xl md:text-5xl text-signal-white font-medium leading-snug display-tight">
            "To edit the movie,<br />
            go back to the projector."
          </p>
          <p className="mono-data text-white/40 mt-6">FINAL_DIRECTIVE // DISTINCTION_01 // THE_RENDERING_LAYER</p>
        </div>
      </section>

      {/* ─── CTA ───────────────────────────────────────────────────────── */}
      <section className="bg-black-off/40">
        <div className="max-w-7xl mx-auto px-6 py-28 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7">
            <div className="mono-data text-signal-blue mb-4 flex items-center gap-2">
              <Radio className="w-3.5 h-3.5" /> TRANSMISSION_END
            </div>
            <h2 className="text-5xl md:text-7xl font-black uppercase text-signal-white display-tight mb-6">
              Administer<br />the Render.
            </h2>
            <p className="text-lg text-white/60 max-w-xl">
              Installation is complete when you no longer think about the seven filters — when all incoming data
              renders through them automatically.
            </p>
          </div>
          <div className="md:col-span-5 flex flex-col gap-3">
            <Link
              to="/distinctions/d00"
              className="px-6 py-4 bg-signal-white text-black font-bold uppercase tracking-widest text-sm flex items-center justify-between hover:bg-positive-green transition-colors"
            >
              <span>Begin Installation · Protocol 00</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              to="/distinctions"
              className="px-6 py-4 border border-white/20 text-signal-white font-bold uppercase tracking-widest text-sm flex items-center justify-between hover:bg-white/5 hover:border-white/40 transition-colors"
            >
              <span>Browse the Seven Distinctions</span>
              <BookOpen className="w-4 h-4" />
            </Link>
            <Link
              to="/audit"
              className="px-6 py-4 border border-white/20 text-signal-white font-bold uppercase tracking-widest text-sm flex items-center justify-between hover:bg-white/5 hover:border-white/40 transition-colors"
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
