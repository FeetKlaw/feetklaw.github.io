import React from 'react';
import { motion } from 'framer-motion';
import { SITE } from '@/config/site';
import { useRevealTransition } from '@/lib/motion';

const ITEMS = [
  {
    name: 'Discord',
    href: SITE.links.discord,
    desc: 'Roles by tier, updates, and community chat.',
  },
  {
    name: 'Instagram',
    href: SITE.links.instagram,
    desc: 'Teasers, posts, and release notes.',
  },
  {
    name: 'YouTube',
    href: SITE.links.youtube,
    desc: 'Public previews when available.',
  },
  {
    name: 'X',
    href: SITE.links.x,
    desc: 'Announcements and quick updates.',
  },
  {
    name: 'Telegram',
    href: SITE.links.telegram,
    desc: 'Fast posts and link drops.',
  },
  {
    name: 'Links',
    href: SITE.links.allLinks,
    desc: 'All official links in one place.',
  },
];

export default function Community() {
  const reveal = useRevealTransition();

  return (
    <main className="min-h-screen fk-bg" data-testid="community-page">
      <a href="#community-content" className="fk-skip-link" data-testid="skip-to-content-link-community">
        Skip to content
      </a>

      <section className="pt-14 md:pt-20" data-testid="community-hero-section">
        <div className="fk-container" id="community-content">
          <motion.div {...reveal} className="fk-card p-7 md:p-10">
            <div className="fk-kicker" data-testid="community-kicker">
              Community
            </div>
            <h1 className="mt-3 text-4xl md:text-5xl font-semibold" data-testid="community-title">
              The only official Feet Klaw channels
            </h1>
            <p className="mt-4 max-w-2xl fk-text-secondary" data-testid="community-subtitle">
              Follow and join the conversation. These are the only official Feet Klaw social links.
            </p>

            <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-testid="community-links-grid">
              {ITEMS.map((it) => (
                <a
                  key={it.name}
                  href={it.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fk-card p-6 no-underline"
                  data-testid={`community-link-card-${it.name.toLowerCase()}`}
                >
                  <div className="font-semibold" style={{ color: 'var(--text-primary)' }} data-testid={`community-link-title-${it.name.toLowerCase()}`}>
                    {it.name}
                  </div>
                  <div className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }} data-testid={`community-link-desc-${it.name.toLowerCase()}`}>
                    {it.desc}
                  </div>
                  <div className="mt-4 text-xs tracking-[0.28em] uppercase" style={{ color: 'var(--metal)' }}>
                    Open
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pt-16 pb-16" data-testid="community-legal-section">
        <div className="fk-container">
          <div className="fk-card p-6 md:p-8">
            <div className="text-sm" style={{ color: 'var(--text-secondary)' }} data-testid="community-legal-note">
              18+ only. All models are 18+.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
