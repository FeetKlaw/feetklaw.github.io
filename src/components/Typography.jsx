import React from 'react';

export function Kicker({ children, testId, className = '' }) {
  return (
    <div className={`fk-kicker ${className}`} data-testid={testId}>
      {children}
    </div>
  );
}

export function SecondaryText({ children, testId, className = '' }) {
  return (
    <div className={`fk-text-secondary ${className}`} data-testid={testId}>
      {children}
    </div>
  );
}

export function MutedText({ children, testId, className = '' }) {
  return (
    <div className={`fk-text-muted ${className}`} data-testid={testId}>
      {children}
    </div>
  );
}
