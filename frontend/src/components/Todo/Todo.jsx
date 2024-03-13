import React, { useEffect, useState } from 'react';
import { TodoInput } from './TodoInput';
import { TodoTitle } from './TodoTitle';
import { TodoCheckbox } from './TodoCheckbox';
import { Button } from '../common/Button';
import { TodoCrossOff } from './TodoCrossOff';
import { TodoPriority } from './TodoPriority'; // Import TodoPriority component

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
  const [completed, setCompleted] = useState(false);
  const [tempPriority, setTempPriority] = useState('medium');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/${id}`);
        const jsonResponse = await response.json();
        setTodo(jsonResponse);
        setTempTitle(jsonResponse.title);
        setTempPriority(jsonResponse.priority || 'medium');
        setCompleted(jsonResponse.isCompleted || false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    setTempTitle(e.target.value);
  };

  async function handleEditClick() {
    if (isEdit) {
      await handleUpdate({ title: tempTitle, priority: tempPriority, isCompleted: completed });
    }
    setIsEdit(!isEdit);
  }

  async function handleDelete() {
    try {
      await fetch(`http://localhost:3000/${id}`, {
        method: 'DELETE',
      });
      await fetchData();
    } catch (error) {
      console.log(error);
    }
  }

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
    <div className={`todo ${completed ? 'completed' : ''}`}>
      <div className='todo__items'>
        <TodoCheckbox
          isCompleted={todo?.isCompleted}
          handleUpdate={(value) => {
            setCompleted(value);
            handleUpdate({ ...todo, isCompleted: value });
          }}
        />
        {isEdit ? (
          <TodoInput title={tempTitle} handleInputChange={handleInputChange} />
        ) : (
          <>
            <TodoTitle title={todo?.title} />
            {completed && <TodoCrossOff />}
            <TodoPriority priority={tempPriority} /> {/* Render TodoPriority */}
          </>
        )}
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
