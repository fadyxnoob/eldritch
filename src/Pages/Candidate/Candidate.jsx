import React from 'react';

const Candidate = () => {
    document.title = 'Byt3Blitz | Candidate'

    return (
        <div>
            <div className='candidateBanner banner'>
                <h1 className='text-5xl text-light font-bold border-b-4 border-primary'>Register</h1>
            </div>
            <h2 className='text-lg md:text-4xl mb-2 font-semibold text-center mt-10'>Register for the Tournament</h2>
            <div className='w-full p-5 md:w-1/2 mx-auto my-10 boxShadow '>
                <div className='flex justify-between gap-5 '>
                    <div className='w-full md:w-1/2'>
                        <label htmlFor="username" className='text-sm'>Username</label> <br />
                        <input id='username' type="email" className='mt-2 text-sm bg-[#e8f0fe] w-full h-8 text-black px-5 focus:border-b-2 border-primary outline-none' placeholder='Enter username here...' />
                    </div>
                    <div className='w-full md:w-1/2'>
                        <label htmlFor="email" className='text-sm'>Email</label> <br />
                        <input id='email' type="email" className='mt-2 text-sm bg-[#e8f0fe] w-full h-8 text-black px-5 focus:border-b-2 border-primary outline-none' placeholder='Enter email here...' />
                    </div>
                </div>
                <div className='flex justify-between gap-5 mt-5'>
                    <div className='w-full md:w-1/2'>
                        <label htmlFor="ign" className='text-sm'>In-Game Name</label> <br />
                        <input id='ign' type="email" className='mt-2 text-sm bg-[#e8f0fe] w-full h-8 text-black px-5 focus:border-b-2 border-primary outline-none' placeholder='Enter username here...' />
                    </div>
                    <div className='w-full md:w-1/2'>
                        <label htmlFor="igID" className='text-sm'>In-Game ID</label> <br />
                        <input id='igID' type="email" className='mt-2 text-sm bg-[#e8f0fe] w-full h-8 text-black px-5 focus:border-b-2 border-primary outline-none' placeholder='Enter email here...' />
                    </div>
                </div>
                <div className="text-end">
                    <button className='mt-5 bg-primary px-3 py-1 text-light w-32 h-10'>Register</button>
                </div>
            </div>
        </div>
    );
}

export default Candidate;
