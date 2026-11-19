import React from 'react';

export default function SkipLink({ targetId, testId }) {
  const handleClick = (event) => {
    event.preventDefault();
    const target = document.getElementById(targetId);
    if (!target) return;
    const hadTabIndex = target.hasAttribute('tabindex');
    if (!hadTabIndex) {
      target.setAttribute('tabindex', '-1');
      target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
    }
    target.focus({ preventScroll: true });
    target.scrollIntoView({ block: 'start', behavior: 'auto' });
  };

  return <a href={`#${targetId}`} className="fk-skip-link" data-testid={testId} onClick={handleClick}>Skip to content</a>;
}
