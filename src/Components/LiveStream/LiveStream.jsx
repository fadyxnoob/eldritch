import React from 'react';
import { FaPlay } from "react-icons/fa";
const LiveStream = () => {
  return (
    <div className='overflow-hidden'>
      <h3 className='text-5xl font-medium text-center'>Live Stream</h3>
      <p className='text-center mt-10'>Stream Closed...</p>
      <div className='md:h-screen liveStream mt-2 relative h-96'>
        <img src="src/assets/images/stream.jpg" alt="Stream" className='size-full object-cover' />
        <div className="flex justify-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="playButton flex items-center justify-center size-20 rounded-full cursor-pointer">
            <FaPlay className='size-6 button-animate text-light'/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveStream;
