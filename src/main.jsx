import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App.jsx';
import '@/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Tell index.html boot loader to fade out once the app is mounted.
try {
  window.__FK_HIDE_BOOT__?.();
} catch {
  // non-fatal
}
