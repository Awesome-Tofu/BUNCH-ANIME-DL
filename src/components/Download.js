// DOWNLOAD.js
import axios from 'axios';
import { useState, useEffect } from 'react';
import Continue from './Continue';

function Download({ alert, showLoading, setProgress, handlePersistentAlert }) {
  document.title = "Anime DL - Home";

  const [id, setId] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [quality, setQuality] = useState('');
  const [dropdownquality, setDropdownquality] = useState(false);

  const linkToId = (link) => {
    if (link.startsWith('https://')) {      
      if (link.endsWith('/')) {
        link = link.slice(0, -1);
      }
  
      const url = new URL(link);
      const pathParts = url.pathname.split('/');
      const animeId = pathParts[pathParts.length - 1];
      return animeId;
    }else{
      return link;
    }
  }

  const fetchLinks = async () => {
    const mp4Links = [];
    setProgress(0)
    for (let episode = from; episode <= to; episode++) {
      const response = await axios.get(`https://gogobyshuya-e398e7347b33.herokuapp.com/anime/${linkToId(id)}-episode-${episode}`);
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


  const allInputsSelected = id && from && to && quality;

  return (
    <div style={{ marginTop: "7rem" }} className='flex flex-col items-center mx-auto my-10 px-4 sm:px-6 lg:px-8 max-w-7xl'>
      <label htmlFor="text-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter the anime link or anime id</label>
      <input type="text" id="text-input" onChange={e => setId(e.target.value)} aria-describedby="helper-text-explanation" className="w-full sm:w-2/5 mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Anime link or id"></input>

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




      {allInputsSelected && from < to && <Continue handlePersistentAlert={handlePersistentAlert} id={linkToId(id)} setProgress={setProgress} from={from} alert={alert} to={to} fetchLinks={fetchLinks} />}
    </div>
  );
}

export default Download;