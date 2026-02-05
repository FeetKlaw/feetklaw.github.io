import React, { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      const p = total > 0 ? doc.scrollTop / total : 0;
      setProgress(Math.max(0, Math.min(1, p)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className="fixed left-0 top-0 z-[900] h-[2px] w-full"
      style={{ background: 'color-mix(in srgb, var(--border) 70%, transparent)' }}
      aria-hidden="true"
      data-testid="scroll-progress-track"
    >
      <div
        className="h-full"
        style={{
          width: `${Math.round(progress * 100)}%`,
          background: `linear-gradient(90deg, var(--accent-primary), color-mix(in srgb, var(--metal) 80%, transparent))`,
          boxShadow: 'none',
          transition: 'width 120ms linear',
        }}
        data-testid="scroll-progress-bar"
      />
    </div>
  );
}
