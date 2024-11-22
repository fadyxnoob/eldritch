import React from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div className='bg-hero p-5 flex items-center justify-end flex-col relative'>
            <div className='absolute bottom-40'>
                <div className='text-center text-light font-bold text-5xl'>
                    Join Our New Tournament
                </div>
                <div className='flex items-center justify-center mt-5'>
                    <Link to="/candidate">
                        <button className='bg-primary rounded text-light text-xl h-12 w-44 flex items-center justify-center'>
                            Join Now
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default React.memo(Banner);
