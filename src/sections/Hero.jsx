import React from 'react';
import { motion } from 'framer-motion';
import { SITE } from '@/config/site';
import { useRevealTransition } from '@/lib/motion';
import { Sparkles, ShieldCheck, Gem, Users } from 'lucide-react';  // new import

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
          {/* ... (mantém background e textos) */}
          <div className="relative grid grid-cols-12 gap-6 items-start" data-testid="hero-grid">
            {/* Left: copy permanece igual */}
            <div className="col-span-12 lg:col-span-5" data-testid="hero-feature-panel">
              <div className="fk-card p-5 md:p-6" style={{ background: 'var(--surface-1)' }}>
                <div className="fk-kicker" data-testid="hero-feature-kicker">
                  Inside
                </div>
                <div className="mt-3 space-y-3" data-testid="hero-feature-list">
                  {[
                    {
                      key: 'female',
                      icon: <Sparkles size={20} className="text-accent" aria-hidden="true" />,
                      title: 'Female‑focused',
                      desc: 'Tickling + feet, with room to evolve.',
                    },
                    {
                      key: 'age',
                      icon: <ShieldCheck size={20} className="text-accent" aria-hidden="true" />,
                      title: '18+',
                      desc: 'Adults only. Consent‑first content.',
                    },
                    {
                      key: 'patreon',
                      icon: <Gem size={20} className="text-accent" aria-hidden="true" />,
                      title: 'Patreon access',
                      desc: 'Membership and checkout handled there.',
                    },
                    {
                      key: 'discord',
                      icon: <Users size={20} className="text-accent" aria-hidden="true" />,
                      title: 'Discord roles',
                      desc: 'Roles by tier for supporters.',
                    },
                  ].map((feat) => (
                    <div key={feat.key} className="flex gap-3 items-start" data-testid={`hero-feature-${feat.key}`}>
                      <span className="mt-1" aria-hidden="true">{feat.icon}</span>
                      <div>
                        <div
                          className="font-semibold"
                          style={{ color: 'var(--text-primary)' }}
                          data-testid={`hero-feature-${feat.key}-title`}
                        >
                          {feat.title}
                        </div>
                        <div
                          className="text-sm"
                          style={{ color: 'var(--text-secondary)' }}
                          data-testid={`hero-feature-${feat.key}-desc`}
                        >
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
