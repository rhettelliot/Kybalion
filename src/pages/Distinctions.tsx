import { Link } from 'react-router-dom';
import { Layers, ChevronRight } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { CHAPTERS } from '../lib/chapters';

export default function Distinctions() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <SectionHeader
        num="IDX"
        icon={<Layers className="text-signal-white w-7 h-7" />}
        title="The Seven Distinctions"
        sub="Not truths to be believed — specifications to be installed. Read in sequence for first installation."
      />

      <div className="border border-white/10">
        {CHAPTERS.map((c, i) => (
          <Link
            key={c.id}
            to={`/distinctions/${c.id}`}
            className={`p-6 flex items-start gap-6 hover:bg-black-off transition-colors group ${
              i < CHAPTERS.length - 1 ? 'border-b border-white/10' : ''
            }`}
          >
            <div className="mono-data text-3xl text-white/20 group-hover:text-signal-blue transition-colors leading-none pt-1 shrink-0 w-12">
              {String(c.number).padStart(2, '0')}
            </div>
            <div className="flex-1 min-w-0">
              <div className="mono-data text-signal-blue mb-1">{c.principle.toUpperCase()}</div>
              <h3 className="text-xl md:text-2xl font-bold text-signal-white uppercase display-tight mb-2 group-hover:text-positive-green transition-colors">
                {c.title}
              </h3>
              <div className="flex flex-wrap gap-x-6 gap-y-1 mono-data text-white/40">
                <span>CLASS: {c.operationalClass.toUpperCase()}</span>
                <span className="text-safety-orange/70">THREAT: {c.threatVector.toUpperCase()}</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-signal-white transition-colors mt-2 shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
}
