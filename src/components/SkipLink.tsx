'use client';

/**
 * SkipLink — renders a visually hidden "Skip to main content" link
 * that becomes visible on keyboard focus. Essential for screen reader
 * and keyboard-only navigation (WCAG 2.4.1 — Bypass Blocks).
 *
 * Usage: place as the very first child of <body>.
 * The target page must have an element with id="main-content".
 */
export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only"
      style={{
        position: 'fixed',
        top: '1rem',
        left: '1rem',
        zIndex: 9999,
        padding: '0.75rem 1.25rem',
        borderRadius: '0.75rem',
        fontWeight: 700,
        fontSize: '0.875rem',
        color: '#ffffff',
        background: 'linear-gradient(135deg, #059669, #10b981)',
        boxShadow: '0 0 20px rgba(16,185,129,0.5)',
        textDecoration: 'none',
        outline: 'none',
      }}
    >
      Skip to main content
    </a>
  );
}
