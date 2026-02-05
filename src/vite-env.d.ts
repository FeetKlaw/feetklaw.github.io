/// <reference types="vite/client" />

declare global {
  interface Window {
    __FK_HIDE_BOOT__?: () => void;
  }
}

export {};
