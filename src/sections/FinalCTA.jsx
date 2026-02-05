import React from 'react';
import { motion } from 'framer-motion';
import { SITE } from '@/config/site';
import { useRevealTransition } from '@/lib/motion';

export default function FinalCTA() {
  const reveal = useRevealTransition({ delay: 0.1 });

  return (
    <section className="pt-16 pb-16" aria-label="Final call to action" data-testid="final-cta-section">
      <div className="fk-container">
        <motion.div
          {...reveal}
          className="fk-card p-7 md:p-10 relative overflow-hidden"
          data-testid="final-cta-panel"
          style={{ background: 'var(--surface-1)' }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(900px 520px at 20% 20%, rgba(167,31,19,0.20), transparent 60%), radial-gradient(760px 520px at 82% 18%, rgba(200,164,93,0.12), transparent 60%), radial-gradient(900px 520px at 52% 90%, rgba(255,255,255,0.04), transparent 60%)',
              pointerEvents: 'none',
            }}
          />

          <div className="relative">
            <div className="fk-kicker" data-testid="final-cta-kicker">
              Close
            </div>
            <h2 className="mt-3 text-3xl md:text-5xl font-semibold" data-testid="final-cta-title">
              Join the membership.
            </h2>
            <p className="mt-3 max-w-2xl fk-text-secondary" data-testid="final-cta-subtitle">
              If the vibe fits, Patreon is where the full scenes live—plus roles and community access.
            </p>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <a
                className="fk-button fk-button-primary"
                href={SITE.links.patreonJoin}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="final-cta-patreon-link"
              >
                Join on Patreon
                <span className="text-sm" style={{ color: 'var(--text-muted)' }} aria-hidden="true">
                  →
                </span>
              </a>
              <a className="fk-button" href="#/community" data-testid="final-cta-community-link">
                Explore Community
              </a>
            </div>

            <div className="mt-4 text-xs" style={{ color: 'var(--text-muted)' }} data-testid="final-cta-microcopy">
              Secure checkout via Patreon. Adults only.
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
