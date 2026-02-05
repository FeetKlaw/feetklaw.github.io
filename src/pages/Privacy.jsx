import React from 'react';

export default function Privacy() {
  return (
    <main className="min-h-screen fk-bg" data-testid="privacy-page">
      <a href="#privacy-content" className="fk-skip-link" data-testid="skip-to-content-link-privacy">
        Skip to content
      </a>

      <section className="pt-14 md:pt-20 pb-16" data-testid="privacy-section">
        <div className="fk-container" id="privacy-content">
          <div className="fk-card p-7 md:p-10">
            <div className="fk-kicker" data-testid="privacy-kicker">
              Privacy
            </div>
            <h1 className="mt-3 text-4xl md:text-5xl font-semibold" data-testid="privacy-title">
              Privacy (placeholder)
            </h1>
            <p className="mt-4 max-w-3xl leading-relaxed fk-text-secondary" data-testid="privacy-text">
              This site does not include analytics by default and does not collect payment information.
              Patreon handles membership, checkout, and billing.
            </p>
            <p className="mt-4 max-w-3xl leading-relaxed fk-text-secondary" data-testid="privacy-text-2">
              Local storage is used only to remember your theme preference and 18+ confirmation.
              Some browsers or privacy modes may block storage—this site is designed to remain usable.
            </p>
            <div className="mt-6 text-xs" style={{ color: 'var(--text-muted)' }} data-testid="privacy-legal">
              18+ only. All models are 18+.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
