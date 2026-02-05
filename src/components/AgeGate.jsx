import React, { useEffect } from 'react';

export default function AgeGate({ isOpen, onAccept }) {
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[1100] grid place-items-center p-6"
      style={{
        background:
          'radial-gradient(900px 600px at 20% 10%, rgba(167,31,19,0.32), transparent 60%), radial-gradient(900px 600px at 80% 20%, rgba(200,164,93,0.18), transparent 60%), rgba(0,0,0,0.86)',
        backdropFilter: 'blur(10px)',
      }}
      role="dialog"
      aria-modal="true"
      aria-label="18+ age confirmation"
      data-testid="age-gate-overlay"
    >
      <div className="w-full max-w-xl fk-card p-7 md:p-9" data-testid="age-gate-card">
        <div className="fk-kicker" data-testid="age-gate-kicker">
          Adults only (18+)
        </div>
        <h1 className="mt-3 text-3xl md:text-4xl font-semibold" data-testid="age-gate-title">
          Mature content ahead.
        </h1>
        <p className="mt-3 leading-relaxed fk-text-secondary" data-testid="age-gate-description">
          By entering, you confirm you are at least 18 years old and consent to viewing adult-themed
          content. This site exists to present the brand and redirect to Patreon for full access.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            className="fk-button fk-button-primary"
            onClick={onAccept}
            data-testid="age-gate-enter-button"
          >
            Enter Feet Klaw
          </button>
          <button
            type="button"
            className="fk-button"
            onClick={() => window.location.replace('https://www.google.com')}
            data-testid="age-gate-leave-button"
          >
            Leave
          </button>
        </div>

        <p className="mt-5 text-xs" style={{ color: 'var(--text-muted)' }} data-testid="age-gate-disclaimer">
          Legal note: 18+ only. All models are 18+.
        </p>
      </div>
    </div>
  );
}
