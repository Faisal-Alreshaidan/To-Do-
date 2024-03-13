import React from 'react';
import { DarkModeProvider, useDarkMode } from './Darkmode'; // Import DarkMode component
import Todos from './components/Todos/Todos';

function App() {
  const { darkMode, setDarkMode } = useDarkMode(); // Use the dark mode state and setter

  return (
    <DarkModeProvider> {/* Wrap your components with DarkModeProvider */}
      <div className={`app ${darkMode ? 'dark-mode' : ''}`}> {/* Toggle the class based on the darkMode state */}
        <section className='todos'>
          <header>
            <h1>To-Do List</h1>
            {/* Toggle Button */}
            <button onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            </button>
          </header>
          <Todos />
        </section>
      </div>
    </DarkModeProvider>
  );
}

export default App;
