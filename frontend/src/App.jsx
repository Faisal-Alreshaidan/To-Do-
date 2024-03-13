import React from 'react';
import Todos from './components/Todos/Todos';


/**
 * The main component of the application.
 * Renders the Todos component inside a div with the class name 'app'.
 *
 * @returns {JSX.Element} The rendered component.
 */
function App() {
  return (
    <div className='app'>
      <section className='todos'>
        <header>
          <h1>To-Do List</h1>
        </header>
        <Todos />
      </section>
    </div>
  );
}

export default App;

