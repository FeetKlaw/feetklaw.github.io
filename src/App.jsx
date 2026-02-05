import React, { useEffect, useMemo, useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Community from '@/pages/Community';
import FAQ from '@/pages/FAQ';
import Support from '@/pages/Support';
import Terms from '@/pages/Terms';
import Privacy from '@/pages/Privacy';
import NotFound from '@/components/NotFound';
import Header from '@/components/Header';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { safeLocalStorageGet, safeLocalStorageSet } from '@/lib/storage';

function getInitialTheme() {
  // Dark by default (do not depend on system).
  const saved = safeLocalStorageGet('fk_theme');
  if (saved === 'light' || saved === 'dim' || saved === 'dark') return saved;
  return 'dark';
}

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    // Apply to root so CSS can react if extended later.
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.toggle('fk-theme-light', theme === 'light');
    document.documentElement.classList.toggle('fk-theme-dim', theme === 'dim');
    document.documentElement.classList.toggle('fk-theme-dark', theme === 'dark');

    // Persist default in storage when available (privacy-mode safe).
    if (safeLocalStorageGet('fk_theme') == null) {
      safeLocalStorageSet('fk_theme', theme);
    }
  }, [theme]);

  const setThemeAndPersist = (next) => {
    setTheme(next);
    safeLocalStorageSet('fk_theme', next);
  };

  const pageBgStyle = useMemo(() => {
    // Theme handled via CSS tokens; keep runtime styles empty to avoid washout.
    return undefined;
  }, [theme]);

  return (
    <HashRouter>
      <ErrorBoundary>
        <div style={pageBgStyle} data-testid="app-shell">
          <Header theme={theme} onSetTheme={setThemeAndPersist} />
          <Routes>
            <Route path="/" element={<Home theme={theme} />} />
            <Route path="/about" element={<About />} />
            <Route path="/community" element={<Community />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/support" element={<Support />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </ErrorBoundary>
    </HashRouter>
  );
}
