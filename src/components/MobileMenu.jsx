import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function getFocusable(container) {
  if (!container) return [];
  const selectors = [
    'a[href]',
    'button:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ];
  return Array.from(container.querySelectorAll(selectors.join(','))).filter(
    (el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden')
  );
}

export default function MobileMenu({
  isOpen,
  onClose,
  children,
  title = 'Menu',
  testId = 'mobile-menu',
}) {
  const panelRef = useRef(null);
  const lastActiveRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    lastActiveRef.current = document.activeElement;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose?.();
        return;
      }

      if (e.key !== 'Tab') return;
      const focusable = getFocusable(panelRef.current);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const t = setTimeout(() => {
      const focusable = getFocusable(panelRef.current);
      (focusable[0] || panelRef.current)?.focus?.();
    }, 0);

    return () => {
      clearTimeout(t);
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
      lastActiveRef.current?.focus?.();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[1200]"
      data-testid={`${testId}-overlay`}
      style={{
        background: 'rgba(0,0,0,0.74)',
        backdropFilter: 'blur(10px)',
      }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className="fk-mobile-panel"
        data-testid={testId}
      >
        <div className="fk-mobile-panel-top">
          <div className="text-xs tracking-[0.28em] uppercase" style={{ color: 'var(--text-muted)' }}>{title}</div>
          <button
            type="button"
            className="fk-button px-4 py-2 text-sm"
            onClick={onClose}
            data-testid={`${testId}-close`}
            aria-label="Close menu"
          >
            Close
          </button>
        </div>

        <div className="mt-3 fk-divider opacity-70" aria-hidden="true" />

        <div className="mt-4 space-y-2" data-testid={`${testId}-content`}>
          {children}
        </div>

        <div className="mt-5 text-xs" style={{ color: 'var(--text-muted)' }}>
          <Link
            to="/privacy"
            className="underline"
            style={{ color: 'var(--text-secondary)' }}
            onClick={onClose}
            data-testid={`${testId}-privacy-link`}
          >
            Privacy
          </Link>
          <span style={{ color: 'var(--text-muted)' }}> · </span>
          <Link
            to="/terms"
            className="underline"
            style={{ color: 'var(--text-secondary)' }}
            onClick={onClose}
            data-testid={`${testId}-terms-link`}
          >
            Terms
          </Link>
        </div>
      </div>
    </div>
  );
}
