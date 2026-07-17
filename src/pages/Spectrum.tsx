import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SlidersHorizontal, ChevronRight } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { CornerFrame } from '../components/CornerFrame';

const KEY = 'btoc:spectrum';

// Every state is a position on a spectrum, not a thing to eliminate (Distinction 04).
// Bands run pole-to-pole, left → right.
interface Band {
  label: string;
  directive: string;
}

interface Spec {
  id: string;
  name: string;
  axis: string;
  bands: Band[];
}

const SPECTRA: Spec[] = [
  {
    id: 'activation',
    name: 'Sovereign Activation',
    axis: 'ACTIVATION ENERGY',
    bands: [
      { label: 'PHOBIA',    directive: 'Energy disorganized and overwhelming. Renderer dominated by threat. Do not act — regulate. Slow the breath; widen the sensory field.' },
      { label: 'FEAR',      directive: 'Threat-render active but survivable. Name the signal, log the facts, begin cadence breathing to organize the charge.' },
      { label: 'ALERTNESS', directive: 'Energy now usable for data collection. Scan, observe, inventory the terrain. Collect before you commit.' },
      { label: 'READINESS', directive: 'Energy allocated to tactical preparation. Stage resources, rehearse the first move, set the trigger condition.' },
      { label: 'COURAGE',   directive: 'Energy available for decisive action. Execute the staged move now — hesitation re-anchors the fear pole.' },
      { label: 'FLOW',      directive: 'Energy synchronized with the objective. Do not interrupt with self-observation. Ride the render.' },
    ],
  },
  {
    id: 'valence',
    name: 'Attachment Valence',
    axis: 'RELATIONAL CHARGE',
    bands: [
      { label: 'HATE',       directive: 'Maximum negative charge — still full attachment. The intensity is the tell: this bond owns bandwidth. Transmute by degree, not denial.' },
      { label: 'CONTEMPT',   directive: 'Charge curdling into hierarchy. Audit what standard was violated; the standard is yours to keep or retire.' },
      { label: 'FRICTION',   directive: 'Workable heat. Convert to signal: name the specific behavior, not the person, and route it into a boundary or request.' },
      { label: 'NEUTRALITY', directive: 'Zero-charge midpoint. Ideal for assessment and severance decisions — act here, not at the poles.' },
      { label: 'REGARD',     directive: 'Positive charge, low distortion. Safe operating range for negotiation and repair work.' },
      { label: 'DEVOTION',   directive: 'Maximum positive charge. High output, high distortion risk — verify the render against logged facts before committing resources.' },
    ],
  },
  {
    id: 'tempo',
    name: 'Pendulum Position',
    axis: 'PERIODIC VECTOR',
    bands: [
      { label: 'TROUGH',     directive: 'Contraction phase. Do not renegotiate your identity here — maintain protocol, reduce load, log data for the upswing.' },
      { label: 'DESCENT',    directive: 'The return swing. Expected, not exceptional. Shorten horizons, tighten execution, drop discretionary commitments.' },
      { label: 'CENTER',     directive: 'The still point of the arc. Maximum leverage: decisions made here are not distorted by the swing. Decide now.' },
      { label: 'ASCENT',     directive: 'Expansion phase. Build reserves instead of expanding exposure — the operator banks the upswing.' },
      { label: 'PEAK',       directive: 'Maximum amplitude. Euphoria is entrainment. Pre-commit the contraction plan while capacity is high.' },
    ],
  },
];

interface Saved {
  specId: string;
  pos: number; // 0–100
}

function readSaved(): Saved {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { specId: 'activation', pos: 50 };
    const parsed = JSON.parse(raw);
    if (SPECTRA.some((s) => s.id === parsed.specId) && typeof parsed.pos === 'number') return parsed;
  } catch { /* fall through */ }
  return { specId: 'activation', pos: 50 };
}

export default function Spectrum() {
  const [saved, setSaved] = useState<Saved>(readSaved);
  const spec = SPECTRA.find((s) => s.id === saved.specId) ?? SPECTRA[0];

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(saved));
  }, [saved]);

  const bandIdx = Math.min(spec.bands.length - 1, Math.floor((saved.pos / 100) * spec.bands.length));
  const band = spec.bands[bandIdx];
  // Position 0–100 mapped to orange→blue→green feel: left third orange, middle blue, right third green.
  const color = saved.pos < 34 ? '#FF4D00' : saved.pos < 67 ? '#007AFF' : '#00D455';

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <SectionHeader
        num="SPC"
        icon={<SlidersHorizontal className="text-positive-green w-7 h-7" />}
        title="Spectrum Console"
        sub="There are no opposites — only poles. Locate your current position on the spectrum, then transmute by degree. You cannot destroy a pole; you can only move the needle."
      />

      {/* Spectrum selector */}
      <div className="flex flex-wrap gap-0 border border-white/10 mb-10 w-fit">
        {SPECTRA.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setSaved({ specId: s.id, pos: 50 })}
            aria-pressed={s.id === spec.id}
            className={`px-6 py-3 mono-data transition-colors ${i < SPECTRA.length - 1 ? 'border-r border-white/10' : ''} ${
              s.id === spec.id ? 'bg-signal-white text-black' : 'text-white/50 hover:text-signal-white hover:bg-black-off'
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Dial */}
        <div className="lg:col-span-7">
          <CornerFrame className="p-8 bg-black-off/40">
            <div className="flex justify-between items-center mb-10">
              <div className="mono-data text-white/50">{spec.axis} // POSITION</div>
              <div className="font-mono text-lg" style={{ color }}>{saved.pos}</div>
            </div>

            {/* Band markers */}
            <div className="flex justify-between mb-2">
              {spec.bands.map((b, i) => (
                <span
                  key={b.label}
                  className={`mono-data transition-colors ${i === bandIdx ? '' : 'text-white/25'}`}
                  style={i === bandIdx ? { color } : undefined}
                >
                  {b.label}
                </span>
              ))}
            </div>

            <input
              type="range"
              min={0}
              max={100}
              value={saved.pos}
              onChange={(e) => setSaved({ ...saved, pos: Number(e.target.value) })}
              aria-label={`Position on the ${spec.name} spectrum`}
              className="slider-tactical w-full h-1 appearance-none cursor-pointer bg-white/10"
              style={{
                '--thumb': color,
                background: `linear-gradient(to right, #FF4D00 0%, #007AFF 50%, #00D455 100%)`,
              } as React.CSSProperties}
            />
            <div className="flex justify-between mono-data text-white/30 mt-2">
              <span>POLE_A</span>
              <span>CENTER</span>
              <span>POLE_B</span>
            </div>

            <div className="mt-10 pt-8 border-t border-white/10">
              <div className="mono-data mb-3" style={{ color }}>
                BAND {String(bandIdx + 1).padStart(2, '0')} / {String(spec.bands.length).padStart(2, '0')} — {band.label}
              </div>
              <p className="text-lg text-signal-white/90 leading-relaxed">{band.directive}</p>
            </div>
          </CornerFrame>
        </div>

        {/* Doctrine */}
        <div className="lg:col-span-5 space-y-6">
          <div className="border border-white/10 p-6">
            <div className="mono-data text-signal-blue mb-3">DOCTRINE // TRANSMUTATION</div>
            <p className="text-sm text-white/60 leading-relaxed mb-4">
              The Reactive Human eliminates; the Sovereign Operator transmutes. Attempting to destroy a pole anchors
              you to its spectrum. Slide by degree: alter the frequency of the charge, and the state follows.
            </p>
            <Link
              to="/distinctions/d04"
              className="mono-data text-white/50 hover:text-signal-white transition-colors flex items-center gap-2"
            >
              READ DISTINCTION 04 <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="border border-white/10 p-6">
            <div className="mono-data text-safety-orange mb-3">THREAT // POLARITY ENTRAPMENT</div>
            <p className="text-sm text-white/60 leading-relaxed">
              The harder you push against a pole, the more you anchor yourself to it. If you find yourself fighting a
              state instead of relocating along its spectrum, stop pushing. Return to the console. Move the needle.
            </p>
          </div>
          <div className="border border-white/10 p-6">
            <div className="mono-data text-positive-green mb-3">LINKED_SYSTEM // BTNC</div>
            <p className="text-sm text-white/60 leading-relaxed">
              Frequency shifts are executed through the respiratory clock. For the breath cadences referenced in the
              directives, run the sister protocol: Bio-Tactical Neural Countermeasures.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
