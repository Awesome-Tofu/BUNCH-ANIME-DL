// DOWNLOAD.js
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import Continue from './Continue';
import Img1 from '../media/search-not-found-one.webp';
import Img2 from '../media/search-not-found-two.webp';
import Img3 from '../media/search-not-found-three.webp';
import Img4 from '../media/search-not-found-four.webp';

function Download({ alert, showLoading, setProgress, handlePersistentAlert }) {
  document.title = "Anime DL - Home";

  const [id, setId] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [quality, setQuality] = useState('');
  const [dropdownquality, setDropdownquality] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const inputRef = useRef(null);

  const linkToId = (link) => {
    if (link.startsWith('https://')) {
      if (link.endsWith('/')) {
        link = link.slice(0, -1);
      }

      const url = new URL(link);
      const pathParts = url.pathname.split('/');
      const animeId = pathParts[pathParts.length - 1];
      return animeId;
    } else {
      return link;
    }
  }

  const fetchLinks = async () => {
    const mp4Links = [];
    setProgress(0)
    for (let episode = from; episode <= to; episode++) {
      const response = await axios.get(`https://nandha-api.onrender.com/gogosource/${linkToId(id)}-episode-${episode}`);
      mp4Links.push(response.data[quality]);
      setProgress(10 + (episode - from) * 90 / (to - from));
    }
    setProgress(100);
    return mp4Links;
  };

  const setQualityfunc = (quality) => {
    setQuality(quality);
    setDropdownquality(false);
  }

  useEffect(() => {
    showLoading(false);
    if (from > to && typeof to !== 'string' && alert) {
      alert('warning', '"From" must be less than "To"', 3);
    }
    // eslint-disable-next-line
  }, [from, to]);

  const images = [Img1, Img2, Img3, Img4];
  const RandomImage = images[Math.floor(Math.random() * images.length)];

  const placeholders = ['one-piece', 'naruto', 'naruto-shippuden', 'one-punch-man', 'https://anitaku.to/category/one-piece', 'https://www.animerealms.org/anime/death-note', 'https://ww5.gogoanimes.fi/category/blue-lock'];
  const randomInputPlaceHolder = placeholders[Math.floor(Math.random() * placeholders.length)];

  const handleSearch = async (e) => {
    const searchTerm = e.target.value;
    if (searchTerm) {
      const response = await axios.get(`https://apis-awesome-tofu.koyeb.app/api/gogo/search/${searchTerm}`);
      setSearchResults(response.data);
      if (response.data.length === 0) {
        setSearchResults([{ name: 'No results found', anime_id: '', img_url: RandomImage }]);
      }
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  };

  const selectAnime = (animeId) => {
    console.log(animeId);
    if (inputRef.current) {
      inputRef.current.value = animeId;
    }
    setId(animeId);
    setShowSearchResults(false);
  };


  const allInputsSelected = id && from && to && quality;

  return (
    <div style={{ marginTop: "7rem" }} className='flex flex-col items-center mx-auto my-10 px-4 sm:px-6 lg:px-8 max-w-7xl'>

      <div className="relative w-full flex flex-col items-center mx-auto my-10 px-4 sm:px-6 lg:px-8 max-w-7xl">
        <label htmlFor="text-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter the anime link or search anime id</label>
        <input ref={inputRef} autocomplete="off" type="text" id="text-input" onChange={handleSearch} aria-describedby="helper-text-explanation" className="w-full sm:w-2/5 mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={randomInputPlaceHolder}></input>

        {showSearchResults && (
          <div
            className="absolute w-full sm:w-2/5 mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            style={{ maxHeight: '200px', overflowY: 'auto', marginTop: '5.06rem' }}
          >
            {searchResults.map((result) => (
              <div style={{ padding: "0.4rem" }} key={result.anime_id} onClick={() => selectAnime(result.anime_id)} className="flex items-center border-b border-gray-400 cursor-pointer hover:bg-gray-600"> {/* Changed border color here */}
                <img loading='lazy' src={result.img_url} alt={result.name} className="h-12 mr-4 rounded-lg" />
                <span className="flex-grow">{result.name}</span>
              </div>
            ))}
          </div>
        )}

      </div>

      <div className="flex justify-around items-center ">
        <div className="flex flex-col items-center w-1/2">
          <label htmlFor="from-input" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">From:</label>
          <input placeholder='from' type="number" id="from-input" onChange={e => setFrom(Number(e.target.value))} className="text-center w-2/5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>

        <div className="flex flex-col items-center w-1/2">
          <label htmlFor="to-input" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">To:</label>
          <input placeholder='to' type="number" id="to-input" onChange={e => setTo(Number(e.target.value))} className="text-center w-2/5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
      </div>


      <button onClick={() => setDropdownquality(!dropdownquality)} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="my-7 text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
        type="button">{quality ? quality : 'Select Quality'}
        <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
        </svg>
      </button>

      {/* <!-- Dropdown menu --> */}
      <div id="dropdown" className={`z-10 ${dropdownquality ? 'block' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
          <li onClick={() => setQualityfunc('1920x1080')}>
            <button className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">1920x1080</button>
          </li>
          <li onClick={() => setQualityfunc('1280x720')}>
            <button className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">1280x720</button>
          </li>
          <li onClick={() => setQualityfunc('854x480')}>
            <button className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">854x480</button>
          </li>
          <li onClick={() => setQualityfunc('640x360')}>
            <button className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">640x360</button>
          </li>
        </ul>
      </div>




      {allInputsSelected && from < to && <Continue quality={quality} handlePersistentAlert={handlePersistentAlert} id={linkToId(id)} setProgress={setProgress} from={from} alert={alert} to={to} fetchLinks={fetchLinks} />}
    </div>
  );
}

export default Download;
