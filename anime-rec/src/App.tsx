import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState([]);
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
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <form onSubmit={handleSubmit} className="flex mx-auto gap-10 ">
        <input className="text-white px-4 rounded-lg"/>
        <button className="bg-black px-4 py-2 rounded-xl" type="submit">Submit</button>
      </form>

      <div className="ticks"></div>
      <div className="outer-div bg-black">
        {data.map((show) => (
          <div key={show.id} className={`px-8 relative flex lg:flex-row flex-col ${data.indexOf(show) % 2 == 0 ? 'bg-gray-800' : 'bg-gray-700'}`}>
            <div className='lg:ml-4 lg:mr-16 mx-auto lg:gap-24 flex flex-col text-white w-8'>
              <p className="font-bold underline text-xl"> <br/></p>
              <p className="text-2xl w-8">{data.indexOf(show)+1}</p>
            </div>
            <a className="h-auto mt-auto mb-auto mx-auto lg:mr-24" href={"https://anilist.co/anime/"+show.id} target="_blank" rel="noopener noreferrer">
                <div className="w-48">
                  <img src={show.pic} className='relative w-full lg:mt-0 mx-auto mt-4'/>
                  <div className='lg:mx-0 flex flex-col bg-gray-600 z-10 h-24 w-full bottom-0 py-3 px-4 bg-opacity-70'>
                    <p className="my-auto mx-auto text-white line-clamp-3 h-full">{show.name}</p>
                  </div>
                </div>
            </a>
            <div className="relative flex lg:flex-row flex-col lg:gap-24 gap-8 pt-8 pb-8">
            <div className='mx-auto gap-4 flex flex-col text-white lg:w-24 w-48'>
              <p className="font-bold underline text-xl">Genres</p>
              {show.genres.split(',').map((genre) =>(
                <p className='text-xl leading-none'>{[...genre].filter(char => !["'", ",", "[", "]"].includes(char)).join("")}</p> 
              ))}
            </div>
            <div className='mx-auto gap-4 flex flex-col text-white lg:w-24 w-48'>
              <p className="font-bold underline text-xl">Tags</p>
              {show.tags.split(',').map((tag) =>(
                <p className='text-xl leading-none'>{[...tag].filter(char => !["'", ",", "[", "]"].includes(char)).join("")}</p> 
              ))}
            </div>
            <div className='mx-auto gap-4 flex flex-col text-white lg:w-24 w-48'>
              <p className="font-bold underline text-xl">Most similar to:</p>
              <p className='text-xl'>{show.similar}</p>
            </div>
            </div>
          </div>
        ))}
    </div>
      <section id="spacer"></section>
    </>
  )
}

export default App
