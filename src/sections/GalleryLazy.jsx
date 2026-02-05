import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRevealTransition } from '@/lib/motion';
import { GALLERY_ITEMS } from '@/config/gallery';
import Modal from '@/components/Modal';

function PreviewCard({ item, index, onOpen }) {
  const [hover, setHover] = useState(false);

  const shouldAnimateHover =
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(hover: hover) and (pointer: fine)').matches
      : false;

  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="fk-card overflow-hidden text-left relative"
      style={{
        aspectRatio: '4 / 3',
        height: 'auto',
        padding: 0,
        display: 'block',
      }}
      data-testid={`gallery-card-${item.key}`}
      aria-label={`Open preview: ${item.title}`}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${item.imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: shouldAnimateHover && hover ? 'scale(1.02)' : 'scale(1)',
          transition: 'transform var(--motion-med) ease',
          filter: 'saturate(1.02) contrast(1.02)',
        }}
        aria-hidden="true"
        data-testid={`gallery-card-bg-${item.key}`}
      />

      {/* overlay for readability (theme-safe) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.52) 55%, rgba(0,0,0,0.78) 100%)',
          opacity: 'var(--overlay-opacity, 1)',
        }}
        aria-hidden="true"
      />

      {/* subtle border glow */}
      <div
        className="absolute inset-0"
        style={{
          boxShadow: shouldAnimateHover && hover ? '0 0 0 1px var(--metal-soft)' : 'none',
          transition: 'box-shadow 220ms ease',
        }}
        aria-hidden="true"
      />

      <div className="relative h-full p-5 flex flex-col justify-between">
        <div className="flex items-start justify-between gap-3">
          <div
            className="text-[11px] tracking-[0.28em] uppercase"
            style={{
              padding: '6px 10px',
              borderRadius: '999px',
              border: '1px solid var(--border)',
              background: 'color-mix(in srgb, var(--bg) 68%, transparent)',
              color: 'var(--text-secondary)',
              backdropFilter: 'blur(10px)',
            }}
            data-testid={`gallery-preview-badge-${item.key}`}
          >
            Preview
          </div>
          <div className="text-xs" style={{ color: 'var(--text-muted)' }} data-testid={`gallery-card-index-${item.key}`}>
            {String(index + 1).padStart(2, '0')}
          </div>
        </div>

        <div>
          <div className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }} data-testid={`gallery-card-title-${item.key}`}>
            {item.title}
          </div>
          <div className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }} data-testid={`gallery-card-desc-${item.key}`}>
            {item.description}
          </div>

          <div
            className="mt-3 text-xs"
            style={{
              maxHeight: shouldAnimateHover && hover ? 32 : 0,
              overflow: 'hidden',
              transition: 'max-height var(--motion-med) ease',
              color: 'var(--text-muted)',
            }}
            data-testid={`gallery-card-hoverline-${item.key}`}
          >
            Full scenes available via membership.
          </div>
        </div>
      </div>
    </button>
  );
}

export default function GalleryLazy() {
  const reveal = useRevealTransition({ delay: 0.05 });
  const [lightbox, setLightbox] = useState(null);

  return (
    <section className="pt-16" aria-label="Preview gallery" data-testid="gallery-section">
      <div className="fk-container" id="focus">
        <motion.div {...reveal}>
          <div className="fk-kicker" data-testid="gallery-kicker">
            Preview
          </div>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold" data-testid="gallery-title">
            A taste of what we focus on
          </h2>
          <p className="mt-3 max-w-3xl fk-text-secondary" data-testid="gallery-subtitle">
            These preview frames are here to show the vibe—setups, angles, and the kind of control we lean into.
            Full scenes and full access live on Patreon.
          </p>
        </motion.div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-testid="gallery-grid">
          {GALLERY_ITEMS.map((item, idx) => (
            <PreviewCard key={item.key} item={item} index={idx} onOpen={setLightbox} />
          ))}
        </div>

        <div className="mt-10 fk-divider" aria-hidden="true" />
      </div>

      <Modal
        isOpen={!!lightbox}
        onClose={() => setLightbox(null)}
        title={lightbox?.title || 'Preview'}
        dataTestId="gallery-lightbox"
      >
        {lightbox ? (
          <div data-testid="gallery-lightbox-body">
            <div
              className="rounded-[16px] overflow-hidden"
              style={{
                border: '1px solid var(--border)',
                background: 'var(--surface-1)',
              }}
            >
              <img
                src={lightbox.imageUrl}
                alt={`Preview frame: ${lightbox.title}`}
                loading="lazy"
                className="w-full"
                style={{ display: 'block', maxHeight: '70vh', objectFit: 'contain', background: 'var(--bg)' }}
                data-testid="gallery-lightbox-image"
              />
            </div>
            <div className="mt-4 text-sm" style={{ color: 'var(--text-secondary)' }} data-testid="gallery-lightbox-description">
              {lightbox.description}
            </div>
            <div className="mt-3 text-xs" style={{ color: 'var(--text-muted)' }} data-testid="gallery-lightbox-microcopy">
              Preview only. Full scenes available via membership.
            </div>
          </div>
        ) : null}
      </Modal>
    </section>
  );
}
