import React from 'react';

export default function Terms() {
  return (
    <main className="min-h-screen fk-bg" data-testid="terms-page">
      <a href="#terms-content" className="fk-skip-link" data-testid="skip-to-content-link-terms">
        Skip to content
      </a>

      <section className="pt-14 md:pt-20 pb-16" data-testid="terms-section">
        <div className="fk-container" id="terms-content">
          <div className="fk-card p-7 md:p-10">
            <div className="fk-kicker" data-testid="terms-kicker">
              Terms
            </div>
            <h1 className="mt-3 text-4xl md:text-5xl font-semibold" data-testid="terms-title">
              Terms (placeholder)
            </h1>
            <p className="mt-4 max-w-3xl leading-relaxed fk-text-secondary" data-testid="terms-text">
              This is a static placeholder. Add your Terms of Service here when ready.
            </p>
            <div className="mt-6 text-xs" style={{ color: 'var(--text-muted)' }} data-testid="terms-legal">
              18+ only. All models are 18+.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
