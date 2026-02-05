import React, { useMemo, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { SITE } from '@/config/site';
import Dropdown, { DropdownItem } from '@/components/Dropdown';
import MobileMenu from '@/components/MobileMenu';

function BrandMark() {
  return (
    <img
      src="/logo-64.png"
      alt="Feet Klaw"
      width={40}
      height={40}
      loading="lazy"
      className="h-10 w-10 rounded-[16px]"
      style={{
        border: '1px solid var(--metal-soft)',
        background: 'var(--surface-2)',
      }}
      data-testid="header-logo-image"
    />
  );
}

function DesktopNavLink({ to, children, testId }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `fk-nav-link ${isActive ? 'active' : ''}`}
      data-testid={testId}
    >
      {children}
    </NavLink>
  );
}

export default function Header({ theme, onSetTheme }) {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const appearanceLabel = useMemo(() => {
    if (theme === 'dim') return 'Dim';
    if (theme === 'light') return 'Light';
    return 'Dark';
  }, [theme]);

  const goToHomeAndScroll = (id) => {
    navigate('/');
    setTimeout(() => {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  };

  const accessItems = [
    { key: 'focus', label: 'About the content', onClick: () => goToHomeAndScroll('focus') },
    { key: 'membership', label: 'Access & membership', onClick: () => goToHomeAndScroll('membership') },
    { key: 'trust', label: 'Trust & basics', onClick: () => goToHomeAndScroll('trust') },
  ];

  return (
    <header className="sticky top-0 z-[950] fk-header" data-testid="site-header">
      <div className="fk-container">
        <div className="fk-header-inner">
          {/* Left: Brand */}
          <Link to="/" className="flex items-center gap-3 no-underline" data-testid="header-brand-link">
            <BrandMark />
            <div>
              <div
                className="text-sm font-semibold tracking-[0.18em] uppercase"
                style={{ color: 'var(--text-primary)' }}
                data-testid="header-brand-text"
              >
                {SITE.brand}
              </div>
              <div
                className="text-xs"
                style={{ color: 'var(--text-muted)' }}
                data-testid="header-brand-line"
              >
                {SITE.brandLine}
              </div>
            </div>
          </Link>

          {/* Center: Desktop nav */}
          <nav className="hidden md:flex items-center justify-center gap-2" aria-label="Primary" data-testid="header-nav">
            <DesktopNavLink to="/" testId="header-nav-home">Home</DesktopNavLink>
            <DesktopNavLink to="/about" testId="header-nav-about">About</DesktopNavLink>
            <DesktopNavLink to="/community" testId="header-nav-community">Community</DesktopNavLink>

            <Dropdown
              label="Access"
              buttonTestId="access-dropdown-button"
              menuTestId="access-dropdown-menu"
              align="left"
            >
              {accessItems.map((it) => (
                <DropdownItem
                  key={it.key}
                  onClick={() => {
                    it.onClick();
                  }}
                  testId={`access-dropdown-item-${it.key}`}
                >
                  <span>{it.label}</span>
                  <span aria-hidden="true" style={{ color: 'var(--text-muted)' }}>
                    →
                  </span>
                </DropdownItem>
              ))}
            </Dropdown>
          </nav>

          {/* Right: actions */}
          <div className="flex items-center justify-end gap-2" data-testid="header-actions">
            <div className="hidden md:block">
              <Dropdown
                label={`Appearance: ${appearanceLabel}`}
                buttonTestId="appearance-dropdown-button"
                menuTestId="appearance-dropdown-menu"
                microText="Preference is saved on this device."
              >
                {[
                  { key: 'dark', label: 'Dark' },
                  { key: 'dim', label: 'Dim' },
                  { key: 'light', label: 'Light' },
                ].map((opt) => (
                  <DropdownItem
                    key={opt.key}
                    onClick={() => onSetTheme(opt.key)}
                    testId={`appearance-dropdown-item-${opt.key}`}
                  >
                    <span>{opt.label}</span>
                    <span aria-hidden="true" style={{ color: 'var(--text-muted)' }}>
                      {theme === opt.key ? '✓' : ''}
                    </span>
                  </DropdownItem>
                ))}
              </Dropdown>
            </div>

            <a
              href={SITE.links.patreonJoin}
              target="_blank"
              rel="noopener noreferrer"
              className="fk-button fk-button-primary hidden sm:inline-flex"
              data-testid="header-join-button"
            >
              Join
              <span aria-hidden="true" className="text-sm" style={{ color: 'var(--text-muted)' }}>
                →
              </span>
            </a>

            <button
              type="button"
              className="fk-button px-4 py-2 text-sm md:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              data-testid="mobile-menu-open-button"
            >
              Menu
            </button>
          </div>
        </div>
      </div>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} title="Menu" testId="mobile-menu">
        <Link to="/" className="fk-button w-full" onClick={() => setMobileOpen(false)} data-testid="mobile-menu-home">
          Home
        </Link>
        <Link to="/about" className="fk-button w-full" onClick={() => setMobileOpen(false)} data-testid="mobile-menu-about">
          About
        </Link>
        <Link
          to="/community"
          className="fk-button w-full"
          onClick={() => setMobileOpen(false)}
          data-testid="mobile-menu-community"
        >
          Community
        </Link>

        <div className="fk-divider opacity-70" aria-hidden="true" />

        <div className="text-xs tracking-[0.28em] uppercase" style={{ color: 'var(--text-muted)' }}>
          Access
        </div>
        {accessItems.map((it) => (
          <button
            key={it.key}
            type="button"
            className="fk-button w-full justify-between"
            onClick={() => {
              setMobileOpen(false);
              it.onClick();
            }}
            data-testid={`mobile-menu-access-${it.key}`}
          >
            <span>{it.label}</span>
            <span aria-hidden="true" style={{ color: 'var(--text-muted)' }}>
              →
            </span>
          </button>
        ))}

        <div className="fk-divider opacity-70" aria-hidden="true" />

        <div className="text-xs tracking-[0.28em] uppercase" style={{ color: 'var(--text-muted)' }}>
          Appearance
        </div>
        <div className="text-xs" style={{ color: 'var(--text-muted)' }} data-testid="mobile-menu-appearance-microtext">
          Preference is saved on this device.
        </div>
        {[
          { key: 'dark', label: 'Dark' },
          { key: 'dim', label: 'Dim' },
          { key: 'light', label: 'Light' },
        ].map((opt) => (
          <button
            key={opt.key}
            type="button"
            className="fk-button w-full justify-between"
            onClick={() => onSetTheme(opt.key)}
            data-testid={`mobile-menu-appearance-${opt.key}`}
          >
            <span>{opt.label}</span>
            <span aria-hidden="true" style={{ color: 'var(--text-muted)' }}>
              {theme === opt.key ? '✓' : ''}
            </span>
          </button>
        ))}

        <div className="fk-divider opacity-70" aria-hidden="true" />

        <a
          href={SITE.links.patreonJoin}
          target="_blank"
          rel="noopener noreferrer"
          className="fk-button fk-button-primary w-full"
          data-testid="mobile-menu-join"
          onClick={() => setMobileOpen(false)}
        >
          Join on Patreon →
        </a>
      </MobileMenu>
    </header>
  );
}
