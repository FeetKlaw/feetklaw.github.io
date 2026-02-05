import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function NotFound() {
  const location = useLocation();

  return (
    <main className="min-h-screen fk-bg">
      <div className="fk-container py-20">
        <div className="fk-card p-8 md:p-10" data-testid="not-found-card">
          <div className="fk-kicker">Feet Klaw</div>
          <h1 className="mt-3 text-3xl md:text-4xl font-semibold" data-testid="not-found-title">
            Page not found
          </h1>
          <p className="mt-3 fk-text-secondary" data-testid="not-found-message">
            Nothing is published at <span style={{ color: 'var(--text-primary)' }}>{location.pathname}</span>.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/" className="fk-button fk-button-primary" data-testid="not-found-home-link">
              Back to Home
            </Link>
            <a
              href="#/about"
              className="fk-button"
              data-testid="not-found-about-link"
            >
              About
            </a>
            <a
              href="#/community"
              className="fk-button"
              data-testid="not-found-community-link"
            >
              Community
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
