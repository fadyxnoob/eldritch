import React from 'react';
const ForgetPassword = () => {

        document.title = 'Byt3Blitz | Forgetpassword'
    return (
        <div>
            <div className='banner forgetBanner'>
                <h1 className='text-5xl text-light font-bold border-b-4 border-primary'>Forget Password</h1>
            </div>
            <div className='p-5 w-1/2 mx-auto my-10 border'>
                <h2 className='text-2xl mb-2 font-medium'>Enter Email Address</h2>
                <input type="email" className='bg-[#e8f0fe] outline-none text-sm focus:border-b-2 border-primary w-full h-10 text-black px-5' placeholder='Enter email here...' />
                <button className='mt-5 bg-primary px-3 py-1 text-light'>Forget Password</button>
            </div>
        </div>
    );
}

export default React.memo(ForgetPassword);
