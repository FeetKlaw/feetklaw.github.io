import React, { useEffect, useId, useRef, useState } from 'react';

export default function Dropdown({
  label,
  children,
  align = 'right',
  buttonTestId,
  menuTestId,
  microText,
}) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const menuRef = useRef(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        btnRef.current?.focus?.();
      }
    };

    const onMouseDown = (e) => {
      if (menuRef.current?.contains(e.target)) return;
      if (btnRef.current?.contains(e.target)) return;
      setOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onMouseDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onMouseDown);
    };
  }, [open]);

  const menuAlign = align === 'left' ? 'left-0' : 'right-0';

  return (
    <div className="relative" data-testid={menuTestId ? `${menuTestId}-wrapper` : undefined}>
      <button
        type="button"
        ref={btnRef}
        className="fk-nav-button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={`dropdown-${id}`}
        onClick={() => setOpen((v) => !v)}
        data-testid={buttonTestId}
      >
        <span>{label}</span>
        <span aria-hidden="true" style={{ color: 'var(--text-muted)' }}>
          ▾
        </span>
      </button>

      {open ? (
        <div
          ref={menuRef}
          id={`dropdown-${id}`}
          role="menu"
          className={`absolute ${menuAlign} mt-2 w-[280px] fk-menu-panel`}
          data-testid={menuTestId}
        >
          <div className="px-3 py-2 text-[11px] tracking-[0.24em] uppercase" style={{ color: 'var(--text-muted)' }}>
            {label}
          </div>
          {microText ? (
            <div className="px-3 pb-2 text-xs" style={{ color: 'var(--text-muted)' }} data-testid={`${menuTestId}-microtext`}>
              {microText}
            </div>
          ) : null}
          <div className="fk-divider opacity-60" aria-hidden="true" />
          <div className="p-2">{children}</div>
        </div>
      ) : null}
    </div>
  );
}

export function DropdownItem({
  children,
  onClick,
  href,
  external,
  testId,
  disabled,
}) {
  const cls = `fk-menu-item ${disabled ? 'opacity-50 pointer-events-none' : ''}`;

  if (href) {
    return (
      <a
        className={cls}
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        role="menuitem"
        onClick={onClick}
        data-testid={testId}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={cls}
      role="menuitem"
      onClick={onClick}
      data-testid={testId}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
