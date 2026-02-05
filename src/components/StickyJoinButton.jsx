import React, { useEffect, useState } from 'react';
import { SITE } from '@/config/site';
import { safeLocalStorageGet } from '@/lib/storage';

export default function StickyJoinButton() {
  const [show, setShow] = useState(false);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    // Respect age gate: show sticky join only after acceptance.
    const ok = safeLocalStorageGet('fk_verified') === 'true';
    setAllowed(ok);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 520);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!allowed || !show) return null;

  return (
    <a
      href={SITE.links.patreonJoin}
      target="_blank"
      rel="noopener noreferrer"
      className="fk-sticky-join"
      data-testid="sticky-join-button"
    >
      Join on Patreon →
    </a>
  );
}
