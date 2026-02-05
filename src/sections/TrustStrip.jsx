import React from 'react';
import { motion } from 'framer-motion';
import { useRevealTransition } from '@/lib/motion';

export default function TrustStrip() {
  const reveal = useRevealTransition({ delay: 0.08 });

  const items = [
    { k: 'payments', t: 'Payments handled by Patreon', s: 'This site does not process payments.' },
    { k: 'tracking', t: 'No tracking by default', s: 'No analytics scripts included.' },
    { k: 'adults', t: '18+ only', s: 'All models are adults. Consensual content only.' },
    { k: 'roles', t: 'Discord roles by tier', s: 'Supporter roles match your membership.' },
  ];

  return (
    <section className="pt-16" aria-label="Trust strip" data-testid="trust-strip-section">
      <div className="fk-container" id="trust">
        <motion.div {...reveal} className="fk-card p-6 md:p-8">
          <div className="fk-kicker" data-testid="trust-strip-kicker">
            Basics
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" data-testid="trust-strip-grid">
            {items.map((it) => (
              <div key={it.k} className="fk-card p-5" data-testid={`trust-strip-item-${it.k}`}>
                <div className="font-semibold" style={{ color: 'var(--text-primary)' }} data-testid={`trust-strip-item-title-${it.k}`}>
                  {it.t}
                </div>
                <div className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }} data-testid={`trust-strip-item-sub-${it.k}`}>
                  {it.s}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-xs" style={{ color: 'var(--text-muted)' }} data-testid="trust-strip-note">
            Secure checkout via Patreon. Adults only.
          </div>
        </motion.div>

        <div className="mt-10 fk-divider" aria-hidden="true" />
      </div>
    </section>
  );
}
