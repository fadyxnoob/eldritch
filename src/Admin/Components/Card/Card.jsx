import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Card = ({ title, counter, onClickHandler, path }) => {
    const [mouseHover, setMouseHover] = useState(false)
    const enterMouse = () => {
        setMouseHover(true)
    }
    const leaveMouse = () => {
        setMouseHover(false)
    }
    
    return (
        <div onClick={onClickHandler}>
            <Link to={`/admin/${path}`}>
                <div
                    onMouseEnter={enterMouse}
                    onMouseLeave={leaveMouse}
                    className="w-full h-24 rounded-md bg-primary text-light flex flex-col gap-5 relative my-10"
                >
                    <p className="p-2">{title}</p>
                    <p
                        className={`${mouseHover ? 'underline text-blue-600' : ''
                            } border-t-2 px-2 py-1`}
                    >
                        View More
                    </p>
                    <div className="absolute bg-light text-black size-8 text-sm top-1 right-1 flex items-center justify-center rounded-full">
                        {counter}
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Card
