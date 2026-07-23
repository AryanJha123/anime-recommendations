import logo from './logo.svg';
import './App.css';
import './output.css'
import { useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [images, setImages] = useState([]); 
  async function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
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
        setData(await response.json());
        console.log('Success:', data);
      } catch (error) {
        console.error('Error:', error);
      } 
  }
  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit} className="flex gap-10">
        <input className="text-black px-4 rounded-lg"/>
        <button className="bg-black px-4 py-2 rounded-xl" type="submit">Submit</button>
        </form>
        <ul>
        {data.map((show) => (
          <li key={show.id}>
            <a className="h-auto mt-auto mb-auto" href={"https://anilist.co/anime/"+show.id} target="_blank" 
            rel="noopener noreferrer">
            <p>{show.name}</p>
            <img src={show.pic}/>
            </a>
          </li>
        ))}
      </ul>
      </header>
    </div>
  );
}

export default App;
