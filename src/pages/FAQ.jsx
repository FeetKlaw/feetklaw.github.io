import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRevealTransition } from '@/lib/motion';

/**
 * FAQ page listing common questions about Feet Klaw. Questions
 * são colapsáveis para manter o layout compacto.
 */
const FAQS = [
  {
    q: 'What is Feet Klaw?',
    a: 'Feet Klaw is an adults-only fetish community focused on female tickling and foot play. We offer exclusive videos, daily updates and a private Discord community for members.',
  },
  {
    q: 'How does membership work?',
    a: 'Memberships are handled by Patreon. Choose a tier that suits you to unlock different levels of content and perks. You can upgrade or cancel anytime through your Patreon account.',
  },
  {
    q: 'Is the content safe and legal?',
    a: 'All models featured are 18+. We operate within a consensual fetish community and strictly prohibit any illegal or non-consensual material. Our terms of service and community guidelines reinforce this commitment.',
  },
  {
    q: 'How do I get support?',
    a: 'For billing questions or technical issues, please email feetklaw@gmail.com. For community support and quick answers, join our Discord and open a ticket in the support channel.',
  },
  {
    q: 'Can I buy clips without subscribing?',
    a: 'Yes! If you prefer one-off purchases instead of a monthly subscription, visit our Gumroad store where individual clips and bundles are available.',
  },
];

function FaqItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-solid border-[var(--border)] py-4">
      <button
        type="button"
        className="w-full flex justify-between items-center text-left"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{item.q}</span>
        <span style={{ color: 'var(--text-secondary)' }}>{open ? '–' : '+'}</span>
      </button>
      {open && (
        <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
          {item.a}
        </p>
      )}
    </div>
  );
}

export default function FAQ() {
  const reveal = useRevealTransition();
  return (
    <main className="min-h-screen fk-bg" data-testid="faq-page">
      <a href="#faq-content" className="fk-skip-link" data-testid="skip-to-content-link-faq">
        Skip to content
      </a>
      <section className="pt-14 md:pt-20" data-testid="faq-hero-section">
        <div className="fk-container" id="faq-content">
          <motion.div {...reveal} className="fk-card p-7 md:p-10">
            <div className="fk-kicker">FAQ</div>
            <h1 className="mt-3 text-4xl md:text-5xl font-semibold" data-testid="faq-title">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 max-w-2xl fk-text-secondary" data-testid="faq-subtitle">
              Answers to common questions about our content, community and memberships.
            </p>
            <div className="mt-7" data-testid="faq-list">
              {FAQS.map((item, idx) => (
                <FaqItem key={idx} item={item} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
