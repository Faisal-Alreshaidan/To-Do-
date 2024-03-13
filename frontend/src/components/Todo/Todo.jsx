import { useEffect, useState } from 'react';

import { TodoInput } from './TodoInput';
import { TodoTitle } from './TodoTitle';
import { TodoCheckbox } from './TodoCheckbox';
import { Button } from '../common/Button';

/**
 * Renders a Todo component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.id - The ID of the todo.
 * @param {Function} props.fetchData - The function to re-fetch todos.
 * @returns {JSX.Element} The rendered Todo component.
 */
export function Todo({ id, fetchData }) {
  const [todo, setTodo] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [tempTitle, setTempTitle] = useState('');

  // Additional state for priority
  const [tempPriority, setTempPriority] = useState('medium'); // Initial state for priority

  // intial fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/${id}`);
        const jsonResponse = await response.json();
        setTodo(jsonResponse);
        setTempTitle(jsonResponse.title);
        // Set priority if available, otherwise set to default 'medium'
        setTempPriority(jsonResponse.priority || 'medium');
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  /**
   * Handles the change event of the input element.
   * @param {Object} e - The event object.
   */
  const handleInputChange = (e) => {
    setTempTitle(e.target.value);
  };

  /**
   * Handles the edit functionality.
   */
  async function handleEditClick() {
    if (isEdit) {
      await handleUpdate({ title: tempTitle, priority: tempPriority }); // Include priority when updating
    }
    setIsEdit(!isEdit);
  }

  /**
   * Handles the delete action for a todo item.
   */
  async function handleDelete() {
    try {
      await fetch(`http://localhost:3000/${id}`, {
        method: 'DELETE',
      });
      await fetchData(); // refetch data as the todo item is deleted
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Updates the todo item with the provided data.
   * @param {object} updatedTodo - The updated todo object.
   * @returns {Promise<void>} - A promise that resolves when the update is complete.
   */
  async function handleUpdate(updatedTodo) {
    try {
      await fetch(`http://localhost:3000/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTodo),
      });
      setTodo({ ...todo, ...updatedTodo });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='todo'>
      <div className='todo__items'>
        <TodoCheckbox isCompleted={todo?.isCompleted} handleUpdate={handleUpdate} />
        {isEdit ? (
          <TodoInput title={tempTitle} handleInputChange={handleInputChange} />
        ) : (
          <TodoTitle title={todo?.title} />
        )}
        {/* Display priority when editing or not */}
        {isEdit || <span className={`priority ${tempPriority}`}>Priority: {tempPriority}</span>}
      </div>
      <div className='todo__buttons'>
        <Button
          className={isEdit ? 'btn-success' : 'btn-info'}
          onClick={handleEditClick}
        >
          {isEdit ? 'Submit' : 'Edit'}
        </Button>
        <Button className='btn-danger' onClick={handleDelete} disabled={isEdit}>
          Delete
        </Button>
      </div>
    </div>
  );
}
