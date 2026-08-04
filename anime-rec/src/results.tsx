import './App.css'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { motion } from "motion/react";

function results() {
  const { user }  = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    async function handleSubmit(username) {
        try {
            const response = await fetch('https://anime-recommendations-lrvg.onrender.com/rec', {
                method: 'POST', 
                headers: {
                'Content-Type': 'application/json' 
            },
                body: username
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
    handleSubmit(user);
  }, [])
  
  
  return (
    <>
    {user && data.length < 1 && <div className='my-auto'>
        <p>Loading...</p>
        </div>}
    {data.length > 0 &&
      <div className="outer-div lg: pb-8">
        <h1 className="text-2xl mx-auto">Your Recommendations:</h1>
        <p>Profile: <a className='text-blue-200' href={"https://anilist.co/user/"+user}>{user}</a></p>
        <div className="mt-8">
        {data.map((show, index) => (
          <motion.div initial={{ x: -2000 }} animate={{ x: 0 }} transition={{ ease: "easeOut", duration: 0.3, delay:index*0.3 }} key={index} className={`px-8 relative flex lg:flex-row flex-col ${data.indexOf(show) % 2 == 0 ? 'bg-gray-800' : 'bg-gray-700'}`}>
            <div className='lg:ml-4 lg:mr-16 mx-auto lg:gap-24 flex flex-col text-white w-8'>
              <p className="font-bold underline text-xl"> <br/></p>
              <p className="text-2xl w-8">{data.indexOf(show)+1}</p>
            </div>
            <a className="h-auto mt-auto mb-auto mx-auto lg:mr-auto" href={"https://anilist.co/anime/"+show.id} target="_blank" rel="noopener noreferrer">
                <div className="w-48">
                  <img src={show.pic} className='relative w-full lg:mt-0 mx-auto mt-4'/>
                  <div className='lg:mx-0 flex flex-col bg-gray-600 z-10 h-24 w-full bottom-0 py-3 px-4 bg-opacity-70'>
                    <p className="my-auto mx-auto text-blue-200 underline    line-clamp-3 h-full">{show.name}</p>
                  </div>
                </div>
            </a>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeIn", duration: 0.4, delay:0.4 }} className="relative flex lg:flex-row flex-col lg:gap-24 mx-auto lg:mr-16 gap-8 pt-8 pb-8">
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
            </motion.div>
          </motion.div>
        ))}
        </div>
    </div>
    }
    </>
  )
}

export default results
