import { useEffect, useState } from 'react';

export function LiveClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const utc = now.toISOString().replace('T', ' ').slice(0, 19);
  return (
    <span className="mono-data text-ink-3">
      <span className="text-signal">●</span> {utc} UTC
    </span>
  );
}
