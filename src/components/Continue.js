import React, { useState } from 'react';
import axios from 'axios';
import DlButton from './DlButton';
import Loading from './Loading';

function Continue(props) {
    const [animeinfo, setAnimeinfo] = useState({});
    const [loading, setLoading] = useState(false);
    const [dlSingleLoading, setDlSingleLoading] = useState([]);

    const { fetchLinks, from, to, id, alert, setProgress } = props;

    const BASE_URL = 'https://gogoapi.cyclic.app';
    const downloadSingleEp = (index) => {
        setProgress(10)
        // Create a new array based on dlSingleLoading
        let newDlSingleLoading = [...dlSingleLoading];

        // Add a new boolean to newDlSingleLoading if it doesn't exist
        if (newDlSingleLoading[index] === undefined) {
            newDlSingleLoading[index] = false;
        }

        // Set the loading state of the clicked button to true
        newDlSingleLoading[index] = true;
        setDlSingleLoading(newDlSingleLoading);
        setProgress(50)

        fetchLinks().then((res) => {
            console.log(res[index]);
            window.open(res[index]);
            setProgress(100)

            // Set the loading state of the clicked button to false
            newDlSingleLoading[index] = false;
            setDlSingleLoading(newDlSingleLoading);
        });
    };

    const fetchAnime = async () => {
        setLoading(true);
        setProgress(10)
        try {
            const response = await axios.get(`${BASE_URL}/getAnime/${id}`);
            setAnimeinfo(response.data);
            if (response.data.name === "") {
                alert('danger', 'Anime not found! Please ensure the provided link is correct', 6);
                setLoading(false);
                return;
            }
            alert('success', 'Anime fetched successfully!');
            setLoading(false);
        } catch (error) {
            alert('danger', 'Anime not found! Please ensure the provided link is correct', 6);
            setLoading(false);
            return;
        }
        setProgress(100)
    };




    return (
        <>
            <a
                href='/'
                style={{ cursor: 'pointer' }}
                className="my-5 group relative inline-flex items-center overflow-hidden rounded bg-indigo-600 px-8 py-3 text-white focus:outline-none focus:ring active:bg-indigo-500"
                onClick={(event) => {
                    event.preventDefault();
                    fetchAnime();
                }}
            >
                <span className="absolute -end-full transition-all group-hover:end-4">
                    {!loading && <svg
                        className="size-5 rtl:rotate-180"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                    </svg>
                    }
                </span>

                <span className="text-sm font-medium transition-all group-hover:me-4"> {!loading ? "Continue" : <> <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" /></svg> Loading </>
                } </span>
            </a>

            {loading && <Loading />}

            {animeinfo.name && <>
                <div className="flex w-100 my-5 justify-between">
                    <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                        <li className="pb-3 ">
                            <div className="flex flex-col space-y-4 items-center rtl:space-x-reverse">
                                <div className="card" style={{ position: "relative", width: "200px", height: "auto" }} >
                                    <img
                                        style={{ width: "inherit", borderRadius: "20px" }}
                                        src={`${animeinfo.img_url}`}
                                        alt="loading"
                                        loading="lazy"
                                    />
                                    <div className="button-grp">
                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                                        <h3 style={{ position: "absolute", bottom: "8%", left: "22%", padding: "10px" }} className="z-10 mt-3 text-lg font-bold text-white">{animeinfo.name}</h3>
                                    </div>
                                </div>
                                <div className="inline-flex my-2 items-center text-base font-semibold text-gray-900 dark:text-white">
                                    <DlButton fetchLinks={fetchLinks} setProgress={setProgress} alert={alert} />
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* Single Anime Downloader  */}
                <ul className="flex flex-col justify-end text-start -space-y-px">
                    {animeinfo.episode_id.filter((_, index) => index >= from - 1 && index < to).map((episode, index) => (
                        <li key={index} className=" w-full flex items-center gap-x-2 p-3 text-sm bg-white border text-gray-800 first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-custom-grey dark:border-neutral-700 dark:text-neutral-200">
                            <div className="flex justify-between truncate">
                                <span className="me-3 mr-10 flex-1 w-full truncate">
                                    {episode}
                                </span>
                                <button onClick={() => downloadSingleEp(index)} type="button" className="ml-10 flex items-center gap-x-2 text-white hover:text-blue-600 whitespace-nowrap  dark:hover:text-blue-500">
                                    {!dlSingleLoading[index] ? <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                        <polyline points="7 10 12 15 17 10"></polyline>
                                        <line x1="12" x2="12" y1="15" y2="3"></line>
                                    </svg> :
                                        <svg aria-hidden="true" className="w-5 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>}
                                    Download
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </>
            }
        </>
    )
}

export default Continue