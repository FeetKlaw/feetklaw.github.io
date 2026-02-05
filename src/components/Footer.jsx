import React from 'react';
import { Link } from 'react-router-dom';
import { SITE } from '@/config/site';

export default function Footer() {
  return (
    <footer className="mt-16" data-testid="site-footer">
      <div className="fk-container">
        <div className="fk-divider" />

        <div className="py-12 grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4" data-testid="footer-col-brand">
            <div className="text-sm tracking-[0.18em] uppercase" style={{ color: 'var(--text-primary)' }} data-testid="footer-brand">
              {SITE.brand}
            </div>
            <div className="mt-2 text-xs" style={{ color: 'var(--text-muted)' }} data-testid="footer-brand-line">
              {SITE.brandLine}
            </div>
          </div>

          <div className="md:col-span-2" data-testid="footer-col-links">
            <div className="text-xs tracking-[0.28em] uppercase" style={{ color: 'var(--text-muted)' }}>Links</div>
            <div className="mt-3 flex flex-col gap-2">
              <a
                href={SITE.links.patreonJoin}
                target="_blank"
                rel="noopener noreferrer"
                className="fk-button px-4 py-2 text-sm justify-between"
                data-testid="footer-join-link"
              >
                <span>Join on Patreon</span>
                <span aria-hidden="true" style={{ color: 'var(--text-muted)' }}>
                  →
                </span>
              </a>
              <Link to="/about" className="fk-button px-4 py-2 text-sm" data-testid="footer-about-link">
                About
              </Link>
              <Link to="/community" className="fk-button px-4 py-2 text-sm" data-testid="footer-community-link">
                Community
              </Link>
            </div>
          </div>

          <div className="md:col-span-3" data-testid="footer-col-community">
            <div className="text-xs tracking-[0.28em] uppercase" style={{ color: 'var(--text-muted)' }}>Community</div>
            <div className="mt-3 flex flex-col gap-2">
              <a
                href={SITE.links.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="fk-button px-4 py-2 text-sm justify-between"
                data-testid="footer-discord-link"
              >
                <span>Discord</span>
                <span aria-hidden="true" style={{ color: 'var(--text-muted)' }}>
                  →
                </span>
              </a>
              <a
                href={SITE.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="fk-button px-4 py-2 text-sm justify-between"
                data-testid="footer-instagram-link"
              >
                <span>Instagram</span>
                <span aria-hidden="true" style={{ color: 'var(--text-muted)' }}>
                  →
                </span>
              </a>
              <a
                href={SITE.links.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="fk-button px-4 py-2 text-sm justify-between"
                data-testid="footer-youtube-link"
              >
                <span>YouTube</span>
                <span aria-hidden="true" style={{ color: 'var(--text-muted)' }}>
                  →
                </span>
              </a>
            </div>
          </div>

          <div className="md:col-span-3" data-testid="footer-col-legal">
            <div className="text-xs tracking-[0.28em] uppercase" style={{ color: 'var(--text-muted)' }}>Legal</div>
            <div className="mt-3 flex flex-col gap-2">
              <Link to="/terms" className="fk-button px-4 py-2 text-sm" data-testid="footer-terms-link">
                Terms
              </Link>
              <Link to="/privacy" className="fk-button px-4 py-2 text-sm" data-testid="footer-privacy-link">
                Privacy
              </Link>
            </div>
            <div className="mt-4 text-xs" style={{ color: 'var(--text-muted)' }} data-testid="footer-legal">
              This site does not collect payment data. Access is handled by Patreon.
              <br />
              18+ only. All models are adults. Consensual content only.
            </div>
          </div>
        </div>

        <div className="pb-10 text-xs" style={{ color: 'var(--text-muted)' }} data-testid="footer-bottom-line">
          © {new Date().getFullYear()} Feet Klaw
        </div>
      </div>
    </footer>
  );
}
