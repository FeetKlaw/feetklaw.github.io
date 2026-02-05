import React from 'react';
import { motion } from 'framer-motion';
import { SITE } from '@/config/site';
import { usePrefersReducedMotion, useRevealTransition } from '@/lib/motion';

const TIERS = [
  {
    key: 'standard',
    name: 'Standard',
    price: '$10',
    cadence: '/ month',
    badge: '',
    description: 'Daily access to the Feet Klaw feed.',
    perks: [
      'Access to posted content',
      'Daily feed updates',
      'Community updates & polls',
      'Standard Supporter role on Discord',
    ],
    micro: 'Handled by Patreon · Adults only',
  },
  {
    key: 'deluxe',
    name: 'Deluxe',
    price: '$15.99',
    cadence: '/ month',
    badge: 'Most Popular',
    description: 'For members who want more presence and recognition.',
    perks: [
      'Everything in Standard',
      'Exclusive content feed access',
      'New formats as they roll out',
      'Deluxe Supporter role on Discord',
      'Optional supporter recognition (opt-in)',
    ],
    micro: 'Handled by Patreon · Adults only',
  },
  {
    key: 'legacy',
    name: 'Legacy Supporter',
    price: '$24.99',
    cadence: '/ month',
    badge: 'Limited',
    description: 'For serious supporters who want long-term impact.',
    perks: [
      'Everything in Deluxe',
      'Highest recognition tier',
      'Priority feedback channel',
      'Legacy Supporter role on Discord',
    ],
    micro: 'Limited availability to keep this tier meaningful.',
  },
];

function Perk({ children }) {
  return (
    <li className="flex gap-2" data-testid="tier-perk-item">
      <span aria-hidden="true" style={{ color: 'var(--metal)' }}>
        ✓
      </span>
      <span>{children}</span>
    </li>
  );
}

export default function Tiers() {
  const reveal = useRevealTransition({ delay: 0.06 });
  const reduced = usePrefersReducedMotion();

  return (
    <section className="pt-16" aria-label="Membership tiers" data-testid="tiers-section">
      <div className="fk-container" id="membership">
        <motion.div {...reveal}>
          <div className="fk-kicker" data-testid="tiers-kicker">
            Membership
          </div>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold" data-testid="tiers-title">
            Choose how deep you want to go
          </h2>
          <p className="mt-3 max-w-2xl fk-text-secondary" data-testid="tiers-subtitle">
            Payments and access are handled by Patreon. Upgrade or cancel anytime.
          </p>
        </motion.div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center" data-testid="tiers-grid">
          {TIERS.map((tier) => {
            const isFeatured = tier.key === 'deluxe';

            return (
              <div
                key={tier.key}
                className="fk-card p-6 md:p-7 relative flex flex-col w-full"
                style={{
                  maxWidth: 420,
                  borderColor: isFeatured ? 'var(--metal-soft)' : 'var(--border)',
                }}
                data-testid={`tier-card-${tier.key}`}
              >
                <div className="flex items-start justify-between gap-4" data-testid={`tier-top-${tier.key}`}>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap" data-testid={`tier-namewrap-${tier.key}`}>
                      <div className="font-semibold" style={{ color: 'var(--text-primary)' }} data-testid={`tier-name-${tier.key}`}>
                        {tier.name}
                      </div>
                      {tier.badge ? (
                        <span
                          className="text-[11px] tracking-[0.22em] uppercase"
                          style={{
                            color: 'var(--text-primary)',
                            background: 'color-mix(in srgb, var(--bg) 70%, transparent)',
                            padding: '6px 10px',
                            borderRadius: 'var(--radius-pill)',
                            border: '1px solid var(--metal-soft)',
                            lineHeight: 1,
                          }}
                          data-testid={`tier-badge-${tier.key}`}
                        >
                          {tier.badge}
                        </span>
                      ) : null}
                    </div>
                    <div className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }} data-testid={`tier-description-${tier.key}`}>
                      {tier.description}
                    </div>
                  </div>
                  <div className="text-right shrink-0" style={{ minWidth: 120 }} data-testid={`tier-price-wrap-${tier.key}`}>
                    <div className="fk-price" data-testid={`tier-price-${tier.key}`}>
                      {tier.price}
                    </div>
                    <div className="text-sm" style={{ color: 'var(--text-muted)' }} data-testid={`tier-cadence-${tier.key}`}>
                      {tier.cadence}
                    </div>
                  </div>
                </div>

                <ul className="mt-5 space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }} data-testid={`tier-perks-${tier.key}`}>
                  {tier.perks.map((p) => (
                    <Perk key={p}>{p}</Perk>
                  ))}
                </ul>

                <div className="mt-6" />

                <a
                  className={`fk-button ${isFeatured ? 'fk-button-primary fk-deluxe-pulse' : ''} mt-auto w-full`}
                  href={SITE.links.patreonJoin}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`tier-cta-${tier.key}`}
                >
                  Join on Patreon
                </a>

                <div className="mt-3 text-xs" style={{ color: 'var(--text-muted)' }} data-testid={`tier-microcopy-${tier.key}`}>
                  {tier.micro}
                </div>

                {!reduced && isFeatured ? (
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      boxShadow: 'inset 0 0 0 1px var(--metal-soft)',
                      borderRadius: 16,
                      opacity: 0.9,
                    }}
                  />
                ) : null}
              </div>
            );
          })}

          {/* spacer removed for equal 3-col layout */}
        </div>

        <div className="mt-10 fk-divider" aria-hidden="true" />
      </div>
    </section>
  );
}
