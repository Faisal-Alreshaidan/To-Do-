import React from 'react';

/**
 * Renders the crossing out effect for a completed todo.
 * @returns {JSX.Element} The rendered component.
 */
export function TodoCrossOff() {
  return (
    <div className="cross-off">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
    </div>
  );
}