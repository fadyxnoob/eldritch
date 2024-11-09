import React, { useState, useEffect } from 'react'

const Alert = ({ message, type = 'error' }) => {

    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 30000); 

        return () => clearTimeout(timer); 
    }, []);

    if (!visible) return null; 

    const alertStyles = {
        success: 'bg-green-500 text-white',
        error: 'bg-red-500 text-white',
        info: 'bg-blue-500 text-white',
        warning: 'bg-yellow-500 text-black',
    };


    return (
        <div className={`px-4 py-1 rounded-md shadow-md ${alertStyles[type]} bg-black`}>
            <div className="flex items-center justify-between">
                <span>{message}</span>
                <button
                    onClick={() => setVisible(false)} 
                    className="ml-4 text-lg focus:outline-none  text-light rounded-full"
                >
                    &times;
                </button>
            </div>
        </div>
    )
}

export default Alert
