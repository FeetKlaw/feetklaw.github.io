import React from 'react';
import { SITE } from '@/config/site';
import Modal from '@/components/Modal';

export default function PreviewModalLazy({ isOpen, onClose }) {
  const embedUrl = SITE.previewEmbedUrl;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Preview"
      dataTestId="preview-modal"
    >
      <div data-testid="preview-modal-body">
        {embedUrl ? (
          <div className="rounded-[14px] overflow-hidden" data-testid="preview-modal-embed">
            <iframe
              title="Preview video"
              src={embedUrl}
              className="w-full aspect-video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div
            className="rounded-[14px] p-6"
            style={{
              border: '1px solid var(--border)',
              background:
                'radial-gradient(420px 260px at 20% 30%, rgba(167,31,19,0.16), transparent 60%), radial-gradient(420px 260px at 80% 28%, rgba(200,164,93,0.10), transparent 60%), var(--surface-1)',
            }}
            data-testid="preview-modal-placeholder"
          >
            <div className="fk-kicker" data-testid="preview-modal-placeholder-kicker">
Preview
            </div>
            <div className="mt-2 font-semibold" style={{ color: 'var(--text-primary)' }} data-testid="preview-modal-placeholder-title">
This is a placeholder.
            </div>
            <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }} data-testid="preview-modal-placeholder-text">
              No full scene is embedded here. If you want to add a real preview later, drop one URL into
              <span style={{ color: 'var(--text-primary)' }}> src/config/site.js</span>.
            </p>
            <div
              className="mt-5 rounded-[14px] h-40"
              style={{
                background:
                  'linear-gradient(135deg, rgba(167,31,19,0.20), rgba(200,164,93,0.08)), var(--surface-2)',
                border: '1px solid var(--metal-soft)',
              }}
              aria-hidden="true"
              data-testid="preview-modal-placeholder-art"
            />
          </div>
        )}

        <div className="mt-4 text-xs" style={{ color: 'var(--text-muted)' }} data-testid="preview-modal-microcopy">
          Adults only. Full access is via Patreon membership.
        </div>
      </div>
    </Modal>
  );
}
