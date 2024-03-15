import React from 'react';

/**
 * Renders the priority of a todo.
 * @param {string} priority - The priority of the todo.
 * @returns {JSX.Element} The rendered component.
 */
export function TodoPriority({ priority }) {
  return (
    <div className={`priority ${priority}`}>
      Priority: {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </div>
  );
}