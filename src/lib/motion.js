import { useEffect, useMemo, useState } from 'react';

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(!!mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);

  return reduced;
}

export function useRevealTransition({ delay = 0 } = {}) {
  const reduced = usePrefersReducedMotion();
  return useMemo(() => {
    if (reduced) {
      return {
        initial: { opacity: 1, y: 0 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0 },
      };
    }

    return {
      initial: { opacity: 0, y: 14 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, amount: 0.2 },
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
    };
  }, [delay, reduced]);
}
