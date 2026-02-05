import React from 'react';
import { SITE } from '@/config/site';
import Modal from '@/components/Modal';
import ReactPlayer from 'react-player';

export default function PreviewModalLazy({ isOpen, onClose }) {
  const embedUrl = SITE.previewEmbedUrl;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Preview" dataTestId="preview-modal">
      <div data-testid="preview-modal-body">
        {embedUrl ? (
          <div
            className="rounded-[14px] overflow-hidden"
            data-testid="preview-modal-embed"
            style={{ maxHeight: '500px' }}  // Limite opcional de altura
          >
            <ReactPlayer
              url={embedUrl}
              controls
              width="100%"
              height="100%"
              style={{ borderRadius: '14px', backgroundColor: 'black' }}
              playing={false}
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
            <div className="fk-kicker">Preview</div>
            <div
              className="mt-2 font-semibold"
              style={{ color: 'var(--text-primary)' }}
            >
              This is a placeholder.
            </div>
            <p
              className="mt-2 text-sm"
              style={{ color: 'var(--text-secondary)' }}
            >
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
            />
          </div>
        )}
        <div
          className="mt-4 text-xs"
          style={{ color: 'var(--text-muted)' }}
        >
          Adults only. Full access is via Patreon membership.
        </div>
      </div>
    </Modal>
  );
}
