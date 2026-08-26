import type { ReactNode } from 'react';

export function SectionHeader({
  num,
  icon,
  title,
  sub,
}: {
  num: string;
  icon: ReactNode;
  title: string;
  sub?: string;
}) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mono-data text-ink-3 mb-4">
        <span className="text-signal">{num}</span>
        <div className="h-px w-12 bg-white/20" />
        {icon}
      </div>
      <h2 className="text-4xl md:text-5xl font-bold uppercase text-ink display-tight mb-3">{title}</h2>
      {sub && <p className="text-ink-3 max-w-2xl">{sub}</p>}
    </div>
  );
}
