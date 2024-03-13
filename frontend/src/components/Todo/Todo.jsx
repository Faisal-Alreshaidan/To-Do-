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
 * @param {Function} props.fetchData - The function to fetch todos.
 * @param {Function} props.handleUpdate - The function to update a todo.
 * @param {Function} props.handleDelete - The function to delete a todo.
 * @returns {JSX.Element} The rendered Todo component.
 */
export function Todo({ id, fetchData, handleUpdate, handleDelete }) {
  const [todo, setTodo] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [tempTitle, setTempTitle] = useState('');
  const [tempPriority, setTempPriority] = useState('medium'); // State to handle priority

  // Initial fetch
  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const response = await fetch(`http://localhost:3000/todos/${id}`);
        const jsonResponse = await response.json();
        setTodo(jsonResponse);
        setTempTitle(jsonResponse.title);
        setTempPriority(jsonResponse.priority || 'medium'); // Default to 'medium' if priority is not set
      } catch (error) {
        console.error('Error fetching todo:', error);
      }
    };
    fetchDataAsync();
  }, [id]);

  // Update temporary states when todo updates
  useEffect(() => {
    if (todo) {
      setTempTitle(todo.title);
      setTempPriority(todo.priority);
    }
  }, [todo]);

  /**
   * Handles the change event of the input element.
   * @param {Object} e - The event object.
   */
  const handleInputChange = (e) => {
    setTempTitle(e.target.value);
  };

  /**
   * Handles the priority change event.
   * @param {Object} e - The event object.
   */
  const handlePriorityChange = (e) => {
    setTempPriority(e.target.value);
  };

  /**
   * Handles the edit functionality.
   */
  async function handleEditClick() {
    if (isEdit) {
      await handleUpdate(id, { title: tempTitle, priority: tempPriority });
      fetchData(); // Assuming fetchData will re-fetch the updated todos
    }
    setIsEdit(!isEdit);
  }

  return (
    <div className='todo'>
      <div className='todo__items'>
        <TodoCheckbox isCompleted={todo?.isCompleted} handleUpdate={handleUpdate} />
        {isEdit ? (
          <>
            <TodoInput value={tempTitle} onChange={handleInputChange} />
            <select value={tempPriority} onChange={handlePriorityChange}>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </>
        ) : (
          <TodoTitle title={todo?.title} />
        )}
      </div>
      <div className='todo__buttons'>
        <Button 
          className={isEdit ? 'btn-success' : 'btn-info'}
          onClick={handleEditClick}
        >
          {isEdit ? 'Save' : 'Edit'}
        </Button>
        <Button 
          className='btn-danger'
          onClick={() => handleDelete(id)} 
          disabled={isEdit}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
