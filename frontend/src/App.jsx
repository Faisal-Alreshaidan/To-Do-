import React from 'react';
import Todos from './components/Todos/Todos';
import Weather from './components/Weather/Weather';
import './App.css'; // Make sure you have the CSS file with the necessary styles

/**
 * The main component of the application.
 *
 * @returns {JSX.Element} The rendered component.
 */
function App() {
  const city = "Ashland"; // Define the city variable

  return ( // Added the missing return statement
    <div className='app-container'>
      <div className='todos-container'>
        <header>
          <h1>To-Do List</h1>
        </header>
        <Todos />
      </div>
      <div className='weather-container'>
        <Weather city={city} />
      </div>
    </div>
  );
}

export default App;
