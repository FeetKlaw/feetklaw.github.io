import React from 'react';
import { motion } from 'framer-motion';
import { useRevealTransition } from '@/lib/motion';

/**
 * Support page: explica como obter ajuda (email e Discord) e oferece link para FAQ.
 */
export default function Support() {
  const reveal = useRevealTransition();
  return (
    <main className="min-h-screen fk-bg" data-testid="support-page">
      <a href="#support-content" className="fk-skip-link" data-testid="skip-to-content-link-support">
        Skip to content
      </a>
      <section className="pt-14 md:pt-20" data-testid="support-section">
        <div className="fk-container" id="support-content">
          <motion.div {...reveal} className="fk-card p-7 md:p-10">
            <div className="fk-kicker">Support</div>
            <h1 className="mt-3 text-4xl md:text-5xl font-semibold" data-testid="support-title">
              Need help?
            </h1>
            <p className="mt-4 max-w-2xl fk-text-secondary" data-testid="support-subtitle">
              We’re here to answer your questions and resolve any issues. Choose one of the support options below.
            </p>
            <div className="mt-7 space-y-6" data-testid="support-options">
              <div className="fk-card p-6" data-testid="support-email-card">
                <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Email Support
                </h2>
                <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  For billing questions, technical issues or feedback, send us an email at 
                  <a href="mailto:feetklaw@gmail.com" style={{ color: 'var(--accent-primary)' }}>
                    feetklaw@gmail.com
                  </a>. We aim to respond within 24–48 hours.
                </p>
              </div>
              <div className="fk-card p-6" data-testid="support-discord-card">
                <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Discord Community
                </h2>
                <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Join our Discord server and open a ticket in the <strong>#support</strong> channel
                  to chat with our team and other members. It’s the fastest way to get help and connect with the community.
                </p>
                <a
                  href="https://dsc.gg/feetklaw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fk-button fk-button-primary mt-4"
                  data-testid="support-discord-button"
                >
                  Join Discord
                </a>
              </div>
              <div className="fk-card p-6" data-testid="support-faq-card">
                <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                  FAQ
                </h2>
                <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Have a quick question? Our
                  <a href="/faq" style={{ color: 'var(--accent-primary)' }}> FAQ</a>
                  answers the most common queries about Feet Klaw, memberships, content and more.
                </p>
                <a
                  href="/faq"
                  className="fk-button mt-4"
                  data-testid="support-faq-button"
                >
                  Read FAQ
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
