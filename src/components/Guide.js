import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../guide.css'

function Guide({ showLoading }) {
    document.title = "Anime DL - Guide";

    useEffect(() => {
        window.scrollTo(0, 0);
        showLoading(false);
        // eslint-disable-next-line
    }, []);
    return (
        <div className='maindiv flex flex-col items-center mx-auto my-10 px-4 sm:px-6 lg:px-8 max-w-7xl'>
            {/* Hello */}
            <ol className="text-gray-500 list-decimal list-inside dark:text-gray-400">
                <li>
                    IMPORTANT thing to do before using the site
                    <ul className="ps-5 mt-2 space-y-1 list-disc list-inside">
                        <li>Open Chrome and click on the three dots in the top right corner.</li>
                        <li>
                            Click on "Settings".
                        </li>
                        <li>Scroll down and click on "Privacy and security".</li>
                        <li>Click on "Site Settings".</li>
                        <li>Under "Permissions", click on "Pop-ups and redirects".</li>
                        <li>Add our site and allow.</li>
                        <li>Because site downloads multiple videos at once, it needs that permission to do so</li>
                    </ul>
                </li>
                <li>
                    How to use the site?
                    <ul className="ps-5 mt-2 space-y-1 list-disc list-inside">
                        <li>Find the anime you want to download on gogoanime. You can use either the direct link to the anime or the anime ID. For example, if you're downloading One Piece, the link would be 'https://anitaku.so/category/one-piece' and the anime ID would be 'one-piece'.</li>
                        <li>Enter the anime ID or the direct link into the appropriate field.</li>
                        <li>Specify the range of episodes you want to download. Enter the number of the first episode you want to download in the 'From' field, and the number of the last episode you want to download in the 'To' field.</li>
                        <li>Select the quality of the episodes from the dropdown menu.</li>
                        <li>Click on 'Continue' to fetch the anime Info.</li>
                        <li>Next, click on 'Download all' to start the download process</li>
                    </ul>
                </li>
                <li>
                    Current gogoanime websites
                    <ul className="ps-5 mt-2 space-y-1 list-disc list-inside">
                        <li><Link to="https://www3.gogoanimes.fi/" className="mt-6 cursor-pointer dark:text-white dark:hover:border-white text-base leading-none focus:outline-none hover:border-gray-800 focus:border-gray-800 border-b border-transparent text-center text-gray-800">https://www3.gogoanimes.fi/</Link></li>
                        <li><Link to="https://ww5.gogoanimes.fi/" className="mt-6 cursor-pointer dark:text-white dark:hover:border-white text-base leading-none focus:outline-none hover:border-gray-800 focus:border-gray-800 border-b border-transparent text-center text-gray-800">https://ww5.gogoanimes.fi/</Link></li>
                        <li><Link to="https://gogoanime.run/" className="mt-6 cursor-pointer dark:text-white dark:hover:border-white text-base leading-none focus:outline-none hover:border-gray-800 focus:border-gray-800 border-b border-transparent text-center text-gray-800">https://gogoanime.run/</Link></li>
                        <li><Link to="https://gogoanime.org.za/" className="mt-6 cursor-pointer dark:text-white dark:hover:border-white text-base leading-none focus:outline-none hover:border-gray-800 focus:border-gray-800 border-b border-transparent text-center text-gray-800">https://gogoanime.org.za/</Link></li>
                        <li><Link to="https://anitaku.so/" className="mt-6 cursor-pointer dark:text-white dark:hover:border-white text-base leading-none focus:outline-none hover:border-gray-800 focus:border-gray-800 border-b border-transparent text-center text-gray-800">https://anitaku.so/</Link></li>
                    </ul>
                </li>
            </ol>
        </div>
    )
}

export default Guide