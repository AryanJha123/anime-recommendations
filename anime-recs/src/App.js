import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [name, setName] = useState(''); 
  async function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    // You can pass formData as a fetch body directly:
    try {
        const response = await fetch('https://anime-recommendations-lrvg.onrender.com/rec', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json' 
          },
          body: formData
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json(); // Parses the JSON response from the server
        console.log('Success:', data);
      } catch (error) {
        console.error('Error:', error);
      }
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <form onSubmit={handleSubmit}>
        <input/>
        <button type="submit">Submit</button>
        </form>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
