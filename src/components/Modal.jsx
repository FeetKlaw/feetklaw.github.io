import React, { useEffect, useRef } from 'react';

function getFocusable(container) {
  if (!container) return [];
  const selectors = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ];
  return Array.from(container.querySelectorAll(selectors.join(','))).filter(
    (el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden')
  );
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  labelledById,
  dataTestId = 'modal',
}) {
  const overlayRef = useRef(null);
  const dialogRef = useRef(null);
  const lastActiveRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    lastActiveRef.current = document.activeElement;

    // Focus the first focusable element, otherwise focus the dialog.
    const t = setTimeout(() => {
      const focusable = getFocusable(dialogRef.current);
      (focusable[0] || dialogRef.current)?.focus?.();
    }, 0);

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose?.();
        return;
      }
      if (e.key !== 'Tab') return;

      const focusable = getFocusable(dialogRef.current);
      if (!focusable.length) {
        e.preventDefault();
        dialogRef.current?.focus?.();
        return;
      }

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

    // Block scroll while modal is open
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      clearTimeout(t);
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
      lastActiveRef.current?.focus?.();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const onOverlayMouseDown = (e) => {
    if (e.target === overlayRef.current) {
      onClose?.();
    }
  };

  return (
    <div
      ref={overlayRef}
      onMouseDown={onOverlayMouseDown}
      className="fixed inset-0 z-[1000] grid place-items-center p-6"
      style={{
        background: 'rgba(0,0,0,0.72)',
        backdropFilter: 'blur(8px)',
      }}
      data-testid={`${dataTestId}-overlay`}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        aria-labelledby={labelledById}
        tabIndex={-1}
        ref={dialogRef}
        className="w-full max-w-3xl fk-card p-5 md:p-6"
        data-testid={dataTestId}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            {labelledById ? null : (
              <div className="font-semibold" style={{ color: 'var(--text-primary)' }} data-testid={`${dataTestId}-title`}>
                {title}
              </div>
            )}
          </div>
          <button
            type="button"
            className="fk-button"
            onClick={onClose}
            data-testid={`${dataTestId}-close-button`}
            aria-label="Close"
          >
            Close
          </button>
        </div>
        <div className="mt-4" data-testid={`${dataTestId}-content`}>
          {children}
        </div>
      </div>
    </div>
  );
}
