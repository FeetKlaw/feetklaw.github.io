import React from 'react';
import { motion } from 'framer-motion';
import { useRevealTransition } from '@/lib/motion';

export default function About() {
  const reveal = useRevealTransition();

  return (
    <main className="min-h-screen fk-bg" data-testid="about-page">
      <a href="#about-content" className="fk-skip-link" data-testid="skip-to-content-link-about">
        Skip to content
      </a>

      <section className="pt-14 md:pt-20" data-testid="about-hero-section">
        <div className="fk-container" id="about-content">
          <motion.div {...reveal} className="fk-card p-7 md:p-10">
            <div className="fk-kicker" data-testid="about-kicker">
              About
            </div>
            <h1 className="mt-3 text-4xl md:text-5xl font-semibold" data-testid="about-title">
              Built for control, reactions, and real fetish tension.
            </h1>
            <p className="mt-4 max-w-3xl leading-relaxed fk-text-secondary" data-testid="about-paragraph-1">
              Feet Klaw is an adults-only community centered on female tickling and foot-focused play—soles, restraint
              setups, teasing, and the kind of close attention that makes the moment land.
            </p>
            <p className="mt-4 max-w-3xl leading-relaxed fk-text-secondary" data-testid="about-paragraph-2">
              We stay focused, but we’re not boxed in forever. Over time, you may see closely related,
              female-focused themes—legs, belly tickling, teasing, and restraint-based setups—when it fits the vibe.
            </p>
            <p className="mt-4 max-w-3xl leading-relaxed fk-text-secondary" data-testid="about-paragraph-3">
              Access is handled through Patreon. That means payments and membership tools live there, while this site stays
              fast, static, and private by default.
            </p>

            <div className="mt-6 fk-divider" aria-hidden="true" />

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4" data-testid="about-trust-cues">
              {[
                {
                  title: 'Female-focused',
                  desc: 'Tickling + feet, with room to evolve responsibly.',
                },
                {
                  title: 'Patreon access',
                  desc: 'Checkout and memberships are handled there.',
                },
                {
                  title: 'Consent-first',
                  desc: 'Adults only. Consensual content only.',
                },
              ].map((c, idx) => (
                <div key={c.title} className="fk-card p-5" data-testid={`about-cue-${idx}`}>
                  <div className="font-semibold" style={{ color: 'var(--text-primary)' }} data-testid={`about-cue-title-${idx}`}>
                    {c.title}
                  </div>
                  <div className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }} data-testid={`about-cue-desc-${idx}`}>
                    {c.desc}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pt-16 pb-16" data-testid="about-footer-section">
        <div className="fk-container">
          <div className="fk-card p-6 md:p-8">
            <div className="text-sm" style={{ color: 'var(--text-secondary)' }} data-testid="about-legal-note">
              18+ only. All models are 18+.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
