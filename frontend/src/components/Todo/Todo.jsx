// Todo.js
import React, { useEffect, useState } from 'react';
import { TodoInput } from './TodoInput';
import { TodoTitle } from './TodoTitle';
import { TodoCheckbox } from './TodoCheckbox';
import { Button } from '../common/Button';
import { TodoCrossOff } from './TodoCrossOff';
import { TodoPriority } from './TodoPriority';
import TranslateComponent, { translateText } from './TranslateComponent';

export function Todo({ id, fetchData }) {
  const [todo, setTodo] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [tempTitle, setTempTitle] = useState('');
  const [originalTitle, setOriginalTitle] = useState('');
  const [completed, setCompleted] = useState(false);
  const [tempPriority, setTempPriority] = useState('medium');
  const [clickCount, setClickCount] = useState(0); // State to keep track of click count

  const apiKey = 'AIzaSyDcx1kw-fiozm6FNaBpnlwrQJy8-J9aEio';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/${id}`);
        const jsonResponse = await response.json();
        setTodo(jsonResponse);
        setTempTitle(jsonResponse.title);
        setOriginalTitle(jsonResponse.title);
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
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpdate(updatedTodo) {
    try {
      await fetch(`http://localhost:3000/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      });
      setTodo({ ...todo, ...updatedTodo });
    } catch (error) {
      console.log(error);
    }
  }

  const handleTranslationClick = async () => {
    const targetLanguage = clickCount % 2 === 0 ? 'ar' : 'en'; // Arabic on odd clicks, English on even clicks
    const updatedTitle = originalTitle === tempTitle ? tempTitle : originalTitle;
    const translatedText = await translateText(updatedTitle, targetLanguage, apiKey);
    setTempTitle(translatedText);
    setClickCount(clickCount + 1); // Increment click count
  };

  return (
    <div className={`todo ${completed ? 'completed' : ''}`}>
      <div className='todo__items'>
        <TodoCheckbox
          isCompleted={completed}
          handleUpdate={(value) => {
            setCompleted(value);
            handleUpdate({ ...todo, isCompleted: value });
          }}
        />
        {isEdit ? (
          <TodoInput title={tempTitle} handleInputChange={handleInputChange} />
        ) : (
          <>
            <TodoTitle title={tempTitle} />
            {completed && <TodoCrossOff />}
            <TodoPriority priority={tempPriority} />
            {!isEdit && (
              <TranslateComponent
                setOriginalText={handleTranslationClick}
                apiKey={apiKey}
              />
            )}
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
