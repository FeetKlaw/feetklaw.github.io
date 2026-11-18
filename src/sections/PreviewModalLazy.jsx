import React from 'react';
import { SITE } from '@/config/site';
import Modal from '@/components/Modal';
import VideoPlayer from '@/components/VideoPlayer';

export default function PreviewModalLazy({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Preview" dataTestId="preview-modal">
      {isOpen && <VideoPlayer src={SITE.previewVideoUrl} poster="/og-image.png" title="Feet Klaw introduction" />}
      <p className="mt-4 text-xs" style={{ color: 'var(--text-muted)' }}>
        Adults only. Full access is via Patreon membership.
      </p>
    </Modal>
  );
}
