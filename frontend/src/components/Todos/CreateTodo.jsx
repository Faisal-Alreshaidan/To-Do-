import { useState } from 'react';
import { Button } from '../common/Button';
import './CreateTodo.css';

/**
 * Component for creating a new todo.
 *
 * @component
 * @returns {JSX.Element} The CreateTodo component.
 */
export function CreateTodo({ handleCreate }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium'); // Add priority state with default value

  /**
   * Handles the input change event for the title.
   *
   * @param {Object} e - The event object.
   */
  const handleInputChange = (e) => {
    setTitle(e.target.value);
  };

  /**
   * Handles the priority change event.
   *
   * @param {Object} e - The event object.
   */
  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  /**
   * Handles the form submit event.
   *
   * @param {Object} e - The event object.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return;
    // Include priority in the newTodo object
    const newTodo = { title, isCompleted: false, priority };
    await handleCreate(newTodo);
    setTitle(''); // Reset the title
    setPriority('medium'); // Reset the priority
  };

  return (
    <form onSubmit={handleSubmit} className="create-todo-form">
      <input
        type="text"
        className="todo-input"
        value={title}
        onChange={handleInputChange}
        placeholder="Enter a new todo"
      />
      {/* Priority dropdown */}
      <div className="priority-select-container">
        <select
          className="priority-select"
          value={priority}
          onChange={handlePriorityChange}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
      <Button type="submit" className="add-todo-button">Add Todo</Button>
    </form>
  );
}