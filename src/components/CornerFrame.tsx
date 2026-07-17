import type { ReactNode } from 'react';

export function CornerFrame({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`corner-frame ${className}`}>
      <span className="cf-tr" />
      <span className="cf-br" />
      {children}
    </div>
  );
}
