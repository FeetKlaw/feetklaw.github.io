import React from 'react';
import { Link } from 'react-router-dom';

function ErrorFallback({ error }) {
  return (
    <main data-testid="error-boundary-fallback" className="min-h-screen fk-bg">
      <div className="fk-container py-20">
        <div className="fk-card p-8 md:p-10">
          <div className="fk-kicker" data-testid="error-boundary-kicker">
            Feet Klaw
          </div>
          <h1 className="mt-3 text-3xl md:text-4xl font-semibold" data-testid="error-boundary-title">
            Something went off-script.
          </h1>
          <p className="mt-3 max-w-2xl fk-text-secondary" data-testid="error-boundary-message">
            This page hit an unexpected issue. Your browser and privacy settings can sometimes block
            storage features—either way, you can safely reload or return home.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              className="fk-button fk-button-primary"
              onClick={() => window.location.reload()}
              data-testid="error-boundary-reload-button"
            >
              Reload
            </button>
            <Link
              to="/"
              className="fk-button"
              data-testid="error-boundary-home-link"
            >
              Back to Home
            </Link>
          </div>

          {error?.message ? (
            <details className="mt-6 text-xs" style={{ color: 'var(--text-muted)' }} data-testid="error-boundary-details">
              <summary className="cursor-pointer">Technical details</summary>
              <pre className="mt-3 whitespace-pre-wrap break-words">{String(error.message)}</pre>
            </details>
          ) : null}
        </div>
      </div>
    </main>
  );
}

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error) {
    // Intentionally no analytics.
    // Keep this quiet and safe for a static site.
    this.setState({ error });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}
