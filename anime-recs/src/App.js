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
      </header>
      <div className="outer-div bg-black">
        {data.map((show) => (
          <div key={show.id} className={`px-4 relative flex lg:flex-row flex-col lg:gap-24 ${data.indexOf(show) % 2 == 0 ? 'bg-green-100' : 'bg-blue-100'}`}>
            <a className="h-auto mt-auto mb-auto" href={"https://anilist.co/anime/"+show.id} target="_blank" rel="noopener noreferrer">
                <div>
                  <img src={show.pic} className='relative w-64 lg:mt-0 mx-auto mt-4'/>
                  <div className='lg:absolute lg:mx-0 mx-auto bg-gray-600 z-10 w-64 h-24 bottom-0 flex py-4 px-4 overflow-hidden bg-opacity-70'>
                    <p className="my-auto mx-auto text-white">{show.name}</p>
                  </div>
                </div>
            </a>
            <div className="relative flex lg:flex-row flex-col lg:gap-24 gap-8 pt-8 pb-8">
            <div className='mx-auto lg:gap-24 flex flex-col text-black w-24'>
              <p className="font-bold underline text-xl"> <br/></p>
              <p className="text-2xl">{data.indexOf(show)+1}</p>
            </div>
            <div className='mx-auto lg:gap-4 gap-4 flex flex-col text-black w-24'>
              <p className="font-bold underline text-xl">Genres</p>
              {show.genres.split(',').map((genre) =>(
                <p className='text-xl leading-none'>{[...genre].filter(char => !["'", ",", "[", "]"].includes(char)).join("")}</p> 
              ))}
            </div>
            <div className='mx-auto lg:gap-4 gap-4 flex flex-col text-black w-24'>
              <p className="font-bold underline text-xl">Tags</p>
              {show.tags.split(',').map((tag) =>(
                <p className='text-xl leading-none'>{[...tag].filter(char => !["'", ",", "[", "]"].includes(char)).join("")}</p> 
              ))}
            </div>
            <div className='mx-auto lg:gap-24 gap-4 flex flex-col text-black w-36'>
              <p className="font-lato font-bold underline text-xl">Most similar to:</p>
              <p className='text-xl'>{show.similar}</p>
            </div>
            </div>
          </div>
        ))}
    </div>
    </div>
  );
}

export default App;
