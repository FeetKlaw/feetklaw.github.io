// Global type augmentation for the boot loader hook defined in index.html.
// This keeps VS Code/TypeScript happy without affecting runtime.

export {};

declare global {
  interface Window {
    __FK_HIDE_BOOT__?: () => void;
  }
}
