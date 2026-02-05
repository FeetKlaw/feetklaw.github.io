import React from 'react';
import { motion } from 'framer-motion';
import { SITE } from '@/config/site';
import { useRevealTransition } from '@/lib/motion';
import { Feather, ShieldCheck, Gem, UserCheck } from 'lucide-react'; // Import icons

export default function Hero({ onOpenPreview }) {
  const reveal = useRevealTransition();

  return (
    <section className="pt-10 md:pt-16" aria-label="Hero" data-testid="home-hero-section">
      <div className="fk-container">
        <motion.div
          {...reveal}
          className="fk-card p-7 md:p-10 relative overflow-hidden"
          data-testid="hero-panel"
        >
          {/* Background wash (restrained) */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(900px 520px at 18% 26%, rgba(167,31,19,0.18), transparent 60%), radial-gradient(760px 520px at 78% 28%, rgba(200,164,93,0.10), transparent 55%), radial-gradient(980px 620px at 55% 70%, rgba(255,255,255,0.03), transparent 60%)',
              pointerEvents: 'none',
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(900px 600px at 50% 45%, transparent 55%, rgba(0,0,0,0.42) 100%)',
              pointerEvents: 'none',
            }}
          />

          <div className="relative grid grid-cols-12 gap-6 items-start" data-testid="hero-grid">
            {/* Left: copy */}
            <div className="col-span-12 lg:col-span-7" data-testid="hero-copy">
              <div className="fk-kicker" data-testid="hero-kicker">
                {SITE.heroEyebrow}
              </div>
              <h1
                className="mt-3 font-semibold"
                style={{ fontSize: 'var(--h1)' }}
                data-testid="hero-headline"
              >
                {SITE.heroHeadlineTop}
                <span className="block" style={{ color: 'var(--metal)' }}>
                  {SITE.heroHeadlineBottom}
                </span>
              </h1>
              <p
                className="mt-4 max-w-2xl leading-relaxed fk-text-secondary"
                data-testid="hero-subheadline"
              >
                {SITE.heroSubtext}
              </p>
              <div
                className="mt-7 flex flex-col sm:flex-row gap-3"
                data-testid="hero-ctas"
              >
                <a
                  className="fk-button fk-button-primary"
                  href={SITE.links.patreonJoin}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="hero-primary-cta"
                >
                  {SITE.patreonCta}
                  <span
                    className="text-sm"
                    style={{ color: 'var(--text-muted)' }}
                    aria-hidden="true"
                  >
                    →
                  </span>
                </a>
                <button
                  type="button"
                  className="fk-button"
                  onClick={onOpenPreview}
                  data-testid="hero-secondary-cta"
                >
                  {SITE.previewCta}
                </button>
              </div>
              <div className="mt-4 fk-micro" data-testid="hero-microcopy">
                Secure checkout via Patreon. Adults only.
              </div>
            </div>

            {/* Right: feature panel */}
            <div className="col-span-12 lg:col-span-5" data-testid="hero-feature-panel">
              <div
                className="fk-card p-5 md:p-6"
                style={{ background: 'var(--surface-1)' }}
              >
                <div className="fk-kicker" data-testid="hero-feature-kicker">
                  Inside
                </div>
                <div
                  className="mt-3 space-y-3"
                  data-testid="hero-feature-list"
                >
                  {[
                    {
                      key: 'female',
                      icon: <Feather size={22} className="text-accent" aria-hidden="true" />,
                      title: 'Female‑focused',
                      desc: 'Tickling + feet, with room to evolve.',
                    },
                    {
                      key: 'age',
                      icon: <ShieldCheck size={22} className="text-accent" aria-hidden="true" />,
                      title: '18+',
                      desc: 'Adults only. Consent‑first content.',
                    },
                    {
                      key: 'patreon',
                      icon: <Gem size={22} className="text-accent" aria-hidden="true" />,
                      title: 'Patreon access',
                      desc: 'Membership and checkout handled there.',
                    },
                    {
                      key: 'discord',
                      icon: <UserCheck size={22} className="text-accent" aria-hidden="true" />,
                      title: 'Discord roles',
                      desc: 'Roles by tier for supporters.',
                    },
                  ].map((feat) => (
                    <div key={feat.key} className="flex gap-3 items-start">
                      <span className="mt-1" aria-hidden="true">{feat.icon}</span>
                      <div>
                        <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                          {feat.title}
                        </div>
                        <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                          {feat.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        <div className="mt-8 fk-divider" aria-hidden="true" />
      </div>
    </section>
  );
}
