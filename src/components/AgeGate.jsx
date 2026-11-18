import React, { useEffect, useRef, useState } from 'react';

export default function AgeGate({ isOpen, onAccept }) {
  const [confirmed, setConfirmed] = useState(false);
  const dialogRef = useRef(null);
  useEffect(() => {
    if (!isOpen) { setConfirmed(false); return undefined; }
    const previousFocus = document.activeElement;
    dialogRef.current?.focus();
    return () => previousFocus?.focus?.();
  }, [isOpen]);
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
      ref={dialogRef}
      tabIndex={-1}
      onKeyDown={(event) => {
        if (event.key !== 'Tab') return;
        const focusable = Array.from(dialogRef.current?.querySelectorAll('input, button:not([disabled]), a[href]') || []);
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) {
          event.preventDefault(); last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault(); first?.focus();
        }
      }}
    >
      <div className="w-full max-w-xl fk-card p-7 md:p-9" style={{ maxHeight: 'calc(100dvh - 3rem)', overflowY: 'auto' }} data-testid="age-gate-card">
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

        <div className="mt-6" data-testid="age-entry-progress">
          <div className="flex justify-between gap-3 text-xs fk-text-secondary"><span>01 · Confirm age</span><span>{confirmed ? '02 · Ready to enter' : '02 · Enter site'}</span></div>
          <div className="fk-age-progress" role="progressbar" aria-label="Entry steps" aria-valuemin={0} aria-valuemax={2} aria-valuenow={confirmed ? 2 : 1} aria-valuetext={confirmed ? 'Age declaration selected. Ready to enter.' : 'Awaiting your age declaration.'}>
            <div style={{ width: confirmed ? '100%' : '50%' }} />
          </div>
          <label className="fk-age-confirmation">
            <input type="checkbox" checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)} />
            <span>I confirm that I am 18 or older and choose to view adult content.</span>
          </label>
        </div>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            className="fk-button fk-button-primary"
            disabled={!confirmed}
            onClick={() => { if (confirmed) onAccept(); }}
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
          Self-declared age confirmation. 18+ only. All models are 18+.
        </p>
      </div>
    </div>
  );
}
