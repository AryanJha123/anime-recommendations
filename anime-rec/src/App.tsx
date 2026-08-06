import heroImg from '/AniList_logo.svg'
import './App.css'

function App() {
  var username = '';
  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
        </div>
        <div>
          <h1>Need Anime Recommendations?</h1>
          <p>
            Enter your <a className="text-blue-200" target="_blank" href="https://anilist.co">AniList</a> username, and see what the algorithm recommends.
          </p>
        </div>
      </section>
      <section className="flex flex-col gap-2">
          <div className="flex mx-auto">
            <input className="text-white px-4 rounded-lg outline-white outline-solid outline-1" placeholder="Username"/>
            <a href={'/results/'+username}>
            <button className="bg-black px-4 py-2 rounded-xl">Submit</button>
            </a>
          </div>
        <p>Don't have an account? Try this <a className="text-blue-200" href='/results/aryantestlist'>sample.</a></p>
      </section>
      <section className="mt-20" id="spacer"></section>
    </>
  )
}

export default App
