import React, { useState } from 'react';
import authService from '../../Appwrite/Auth';
import { Alert } from '../../';


const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [alert, setAlert] = useState(null);
    document.title = 'Byt3Blitz | Forgetpassword';

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('onclick is working');
        try {
            const res = await authService.createPasswordRecovery(email);
            setAlert({ type: 'success', message: 'Recovery email sent successfully.' });
            console.log({ res });
        } catch (error) {
            setAlert({ type: 'error', message: error.message });
            console.log('Forget Password ERROR ::', error);
        }
    };

    return (
        <div>
            {alert && <Alert type={alert.type} message={alert.message} />}
            <div className='banner forgetBanner'>
                <h1 className='md:text-5xl text-4xl text-light font-bold border-b-4 border-primary'>Forget Password</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='p-5 md:w-1/2 mx-auto my-10 border'>
                    <h2 className='text-2xl mb-2 font-medium'>Enter Email Address</h2>
                    <input
                        type="email"
                        className='bg-[#e8f0fe] outline-none text-sm focus:border-b-2 border-primary w-full h-10 text-black px-5'
                        placeholder='Enter email here...'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button type="submit" className='mt-4 bg-primary text-white py-2 px-4 rounded'>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ForgetPassword;