import React, { Suspense, useMemo, useState } from 'react';
import AgeGate from '@/components/AgeGate';
import ScrollProgress from '@/components/ScrollProgress';
import StickyJoinButton from '@/components/StickyJoinButton';
import Hero from '@/sections/Hero';
import Tiers from '@/sections/Tiers';
import TrustStrip from '@/sections/TrustStrip';
import FinalCTA from '@/sections/FinalCTA';
import Footer from '@/components/Footer';
import { SITE } from '@/config/site';
import { safeLocalStorageGet, safeLocalStorageSet } from '@/lib/storage';
import { usePrefersReducedMotion } from '@/lib/motion';

const GalleryLazy = React.lazy(() => import('@/sections/GalleryLazy'));
const PreviewModalLazy = React.lazy(() => import('@/sections/PreviewModalLazy'));

export default function Home({ theme }) {
  const reducedMotion = usePrefersReducedMotion();

  const [isVerified, setIsVerified] = useState(() => safeLocalStorageGet('fk_verified') === 'true');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const openPreview = () => setIsPreviewOpen(true);
  const closePreview = () => setIsPreviewOpen(false);

  const acceptAgeGate = () => {
    safeLocalStorageSet('fk_verified', 'true');
    setIsVerified(true);
  };

  const backgroundClass = useMemo(() => {
    // Light theme supported, but dark is default.
    return theme === 'light' ? '' : 'fk-bg';
  }, [theme]);

  return (
    <main className={backgroundClass} id="main-content" data-testid="home-page">
      <a href="#main-content" className="fk-skip-link" data-testid="skip-to-content-link-home">
        Skip to content
      </a>

      <ScrollProgress />

      <AgeGate isOpen={!isVerified} onAccept={acceptAgeGate} />

      <div className={isVerified ? '' : 'pointer-events-none select-none blur-[2px] opacity-60'}>
        <Hero onOpenPreview={openPreview} />

        <Suspense
          fallback={
            <div className="fk-container pt-16" data-testid="gallery-loading-fallback">
              <div className="fk-card p-6">
                <div className="fk-text-secondary">Loading preview grid…</div>
              </div>
            </div>
          }
        >
          <GalleryLazy />
        </Suspense>

        <Tiers />
        <TrustStrip />
        <FinalCTA />

        <section className="pb-8" data-testid="home-external-links-section">
          <div className="fk-container">
            <div className="fk-card p-6 md:p-8">
              <div className="fk-kicker" data-testid="home-links-kicker">
                Quick links
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  className="fk-button fk-button-primary"
                  href={SITE.links.patreonJoin}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="home-links-join"
                >
                  Join on Patreon
                </a>
                <a
                  className="fk-button"
                  href={SITE.links.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="home-links-discord"
                >
                  Discord
                </a>
                <a
                  className="fk-button"
                  href={SITE.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="home-links-instagram"
                >
                  Instagram
                </a>
                <a
                  className="fk-button"
                  href={SITE.links.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="home-links-youtube"
                >
                  YouTube
                </a>
              </div>

              <div className="mt-4 text-xs" style={{ color: 'var(--text-muted)' }} data-testid="home-links-microcopy">
                This site does not collect payment data. Access is handled by Patreon.
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>

      <Suspense fallback={null}>
        <PreviewModalLazy isOpen={isPreviewOpen} onClose={closePreview} />
      </Suspense>

      <StickyJoinButton />

      {!reducedMotion ? (
        <div
          aria-hidden="true"
          className="fixed inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(700px 420px at 12% 12%, rgba(167,31,19,0.10), transparent 60%), radial-gradient(720px 460px at 86% 18%, rgba(200,164,93,0.07), transparent 60%)',
            mixBlendMode: 'screen',
            opacity: 0.5,
            transition: 'opacity 400ms ease',
          }}
          data-testid="home-ambient-layer"
        />
      ) : null}
    </main>
  );
}
