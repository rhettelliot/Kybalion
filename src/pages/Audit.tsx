import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Gauge, ChevronRight, RotateCcw } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { CornerFrame } from '../components/CornerFrame';
import { CHAPTERS } from '../lib/chapters';

const KEY = 'btoc:audit';

// The seven installable distinctions (preamble excluded).
const FILTERS = CHAPTERS.filter((c) => c.number > 0);

type Scores = Record<string, number>;

const DEFAULTS: Scores = Object.fromEntries(FILTERS.map((c) => [c.id, 50]));

function readScores(): Scores {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULTS;
    const parsed = JSON.parse(raw);
    return { ...DEFAULTS, ...parsed };
  } catch {
    return DEFAULTS;
  }
}

function colorFor(v: number): string {
  if (v < 40) return '#FF4D00';
  if (v < 70) return '#007AFF';
  return '#00D455';
}

function bandFor(v: number): string {
  if (v < 40) return 'REACTIVE';
  if (v < 70) return 'PARTIAL';
  return 'INSTALLED';
}

export default function Audit() {
  const [scores, setScores] = useState<Scores>(readScores);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(scores));
  }, [scores]);

  const mean = Math.round(FILTERS.reduce((a, c) => a + scores[c.id], 0) / FILTERS.length);
  const weakest = FILTERS.reduce((min, c) => (scores[c.id] < scores[min.id] ? c : min), FILTERS[0]);
  const status = bandFor(mean);
  const statusColor = colorFor(mean);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <SectionHeader
        num="AUD"
        icon={<Gauge className="text-signal-blue w-7 h-7" />}
        title="Installation Audit"
        sub="Rate the integrity of each installed filter: does incoming data automatically render through it, or do you still have to think about it? Scores persist locally — nothing leaves your device."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sliders */}
        <div className="lg:col-span-7 border border-white/10 divide-y divide-white/10">
          {FILTERS.map((c) => {
            const val = scores[c.id];
            const color = colorFor(val);
            return (
              <div key={c.id} className="p-6">
                <div className="flex justify-between items-baseline mb-1">
                  <div>
                    <span className="mono-data text-white/30 mr-3">{String(c.number).padStart(2, '0')}</span>
                    <span className="text-signal-white font-bold uppercase text-sm display-tight">{c.title}</span>
                  </div>
                  <span className="font-mono text-lg" style={{ color }}>{val}</span>
                </div>
                <div className="mono-data text-white/30 mb-4">THREAT: {c.threatVector.toUpperCase()}</div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={val}
                  onChange={(e) => setScores({ ...scores, [c.id]: Number(e.target.value) })}
                  aria-label={`${c.title} installation integrity`}
                  className="slider-tactical w-full h-1 appearance-none cursor-pointer bg-white/10"
                  style={{
                    '--thumb': color,
                    background: `linear-gradient(to right, ${color} 0%, ${color} ${val}%, rgba(255,255,255,0.1) ${val}%, rgba(255,255,255,0.1) 100%)`,
                  } as React.CSSProperties}
                />
                <div className="flex justify-between mono-data text-white/30 mt-1">
                  <span>REACTIVE</span>
                  <span>INSTALLED</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Verdict */}
        <div className="lg:col-span-5">
          <CornerFrame className="p-8 bg-black-off/40 sticky top-20">
            <div className="mono-data text-white/50 mb-6">RENDER_ENGINE // STATUS</div>

            <div className="flex items-baseline gap-4 mb-2">
              <span className="font-mono text-7xl text-signal-white display-tight">{mean}</span>
              <span className="mono-data" style={{ color: statusColor }}>{status}</span>
            </div>
            <p className="text-sm text-white/50 mb-8 leading-relaxed">
              {status === 'INSTALLED' && 'Data renders through the seven filters automatically. Maintain via periodic re-audit.'}
              {status === 'PARTIAL' && 'Filters respond under deliberate attention but drop out under load. Installation incomplete.'}
              {status === 'REACTIVE' && 'Factory-settings renderer dominant. You are the content of the simulation, not its administrator.'}
            </p>

            {/* Bars */}
            <div className="space-y-3 pt-6 border-t border-white/10 mb-8">
              {FILTERS.map((c) => (
                <div key={c.id} className="flex items-center gap-3">
                  <span className="mono-data text-white/40 w-8 shrink-0">{String(c.number).padStart(2, '0')}</span>
                  <div className="flex-1 h-1 bg-white/10">
                    <div className="h-full" style={{ width: `${scores[c.id]}%`, background: colorFor(scores[c.id]) }} />
                  </div>
                  <span className="mono-data text-white/40 w-8 text-right shrink-0">{scores[c.id]}</span>
                </div>
              ))}
            </div>

            <div className="mono-data text-white/50 mb-3">WEAKEST_FILTER</div>
            <Link
              to={`/distinctions/${weakest.id}`}
              className="group p-4 border border-safety-orange/40 hover:bg-safety-orange/10 transition-colors flex items-center justify-between mb-4"
            >
              <div>
                <div className="mono-data text-safety-orange mb-1">DISTINCTION {String(weakest.number).padStart(2, '0')}</div>
                <div className="text-signal-white font-bold uppercase text-sm">{weakest.title}</div>
              </div>
              <ChevronRight className="w-4 h-4 text-safety-orange group-hover:translate-x-1 transition-transform" />
            </Link>

            <button
              onClick={() => setScores(DEFAULTS)}
              className="w-full px-4 py-3 border border-white/15 mono-data text-white/50 hover:text-signal-white hover:border-white/40 transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-3 h-3" /> RESET_AUDIT
            </button>
          </CornerFrame>
        </div>
      </div>
    </div>
  );
}
