import React from 'react'

function Alert(props) {

    let alertClass;
    switch (props.type) {
        case 'info':
            alertClass = 'fixed top-0 w-1/2 flex items-center p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400';
            break;
        case 'danger':
            alertClass = 'fixed top-0 w-1/2 flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400';
            break;
        case 'success':
            alertClass = 'fixed top-0 w-1/2 flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400';
            break;
        case 'warning':
            alertClass = 'fixed top-0 w-1/2 flex items-center p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300';
            break;
        case 'dark':
            alertClass = 'fixed top-0 w-1/2 flex items-center p-4 text-sm text-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300';
            break;
        default:
            break;
    }

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <>
            <div className="flex justify-center">
                <div style={{ left: '46%' }} className={`${alertClass} absolute top-16 sm:left-1/2 transform -translate-x-1/2 w-full sm:w-auto m-4`} role="alert">
                    <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                        <span className="font-medium">{capitalizeFirstLetter(props.type)}!</span> {props.message}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Alert