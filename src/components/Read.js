import React, { useRef, useState } from 'react'
import Img1 from '../media/img1.png';
import Img2 from '../media/img2.png';
import { Link, useLocation } from 'react-router-dom'


function Read() {
    const [isMenuHidden, setMenuHidden] = useState(false);
    const menuRef = useRef(null); 

    let location = useLocation();

    const toggleMenu = () => {
        setMenuHidden(!isMenuHidden);
        menuRef.current.style.display = isMenuHidden ? 'block' : 'none';
    };

    // Random image png
    const images = [Img1, Img2];
    const RandomImage = images[Math.floor(Math.random() * images.length)];

    return (
        <>
            {location.pathname === "/" && <div className="relative flex justify-center items-center">
                <div id="menu" ref={menuRef} className="w-full h-full bg-gray-900 bg-opacity-50 top-0 fixed sticky-0">
                    <div className=" 2xl:container 2xl:mx-auto py-48 px-4 md:px-28 flex justify-center items-center">
                        <div style={{ top: "-120px", paddingTop: "1rem", paddingBottom: "2rem", borderRadius: "20px" }} className="md:w-auto dark:bg-gray-800 relative flex flex-col justify-center items-center bg-white py-16 px-4 md:px-24 xl:py-24 xl:px-36">
                            <div style={{position: "relative", bottom: "-21px"}} role="banner">
                                <img src={RandomImage} alt="Random" style={{width: "8rem"}} />
                            </div>
                            <div className="mt-12">
                                <h1 role="main" className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-center text-gray-800">Need a quick tour guide?</h1>
                            </div>
                            <div className="mt">
                                <p className="mt-6 sm:w-80 text-base dark:text-white leading-7 text-center text-gray-800">Check out our guide page to get the most out of our website!</p>
                            </div>
                            <Link to="/guide" className="w-full rounded-full dark:text-gray-800 dark:hover:bg-gray-100 dark:bg-white sm:w-auto mt-14 text-base leading-4 text-center text-white py-6 px-16 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 bg-gray-800 hover:bg-black">Sure!</Link>
                            <a onClick={toggleMenu} className="mt-6 cursor-pointer dark:text-white dark:hover:border-white text-base leading-none focus:outline-none hover:border-gray-800 focus:border-gray-800 border-b border-transparent text-center text-gray-800">No need</a>
                            <button onClick={toggleMenu} className="text-gray-800 dark:text-gray-400 absolute top-8 right-8 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800" aria-label="close">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 6L6 18" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M6 6L18 18" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default Read