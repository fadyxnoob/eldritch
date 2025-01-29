import React, { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Alert } from '../../';
import authService from '../../Appwrite/Auth'; 

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPassText, setIsPassText] = useState(true);
    const [isConfirmPassText, setIsConfirmPassText] = useState(true);
    const [alert, setAlert] = useState(null);
    const navigate = useNavigate();
    const secret = new URLSearchParams(window.location.search).get('secret');
    const userId = new URLSearchParams(window.location.search).get('userId');
    document.title = 'Byt3Blitz | Reset Password';

    const changePassInput = () => {
        setIsPassText((prev) => !prev);
    };
    const changeConfirmPassInput = () => {
        setIsConfirmPassText((prev) => !prev);
    };

    useEffect(() => {
        if (!secret || !userId) {
            navigate('/forgetPassword');
        }
    }, [secret, userId, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Clicked',);
        if (password !== confirmPassword) {
            setAlert({ type: 'error', message: 'Password does not match confirm password' });
            return;
        }
        if (!password || !confirmPassword) {
            setAlert({ type: 'error', message: 'Please fill all fields' });
            return;
        }

        try {
            const response = await authService.updatePassword(password, secret, userId);
            setAlert(response);
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            console.error('Error resetting password:', error); 
        }
    };

    return (
        <div>
            {alert && <Alert type={alert.type} message={alert.message} />}
            <div className='banner forgetBanner'>
                <h1 className='text-5xl text-light font-bold border-b-4 border-primary'>Reset Password</h1>
            </div>
            <form onSubmit={handleSubmit} className='boxShadow p-5 w-1/2 mx-auto my-10 border'>
                <h2 className='text-2xl mb-2 font-medium text-center'>Reset Your Password</h2>
                <div className='flex gap-5 items-center flex-col md:flex-row md:justify-between'>
                    <div className='w-full'>
                        <label htmlFor="password" className='text-light text-sm '>Password</label> <br />
                        <div className='relative'>
                            <input
                                value={password}
                                id='password'
                                onChange={(e) => setPassword(e.target.value)}
                                type={isPassText ? 'password' : 'text'}
                                placeholder='Enter password...'
                                className='bg-[#e8f0fe] outline-none text-sm focus:border-b-2 border-primary w-full h-10 text-black px-5'
                            />
                            <span className='absolute right-2 top-2 cursor-pointer' onClick={changePassInput}>
                                {isPassText ? <FaEye /> : <FaEyeSlash />}
                            </span>
                        </div>
                    </div>
                    <div className='w-full'>
                        <label htmlFor="confirmPassword" className='text-light text-sm '>Confirm Password</label> <br />
                        <div className='relative'>
                            <input
                                value={confirmPassword}
                                id='confirmPassword'
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                type={isConfirmPassText ? 'password' : 'text'}
                                placeholder='Confirm password...'
                                className='bg-[#e8f0fe] outline-none text-sm focus:border-b-2 border-primary w-full h-10 text-black px-5'
                            />
                            <span className='absolute right-2 top-2 cursor-pointer' onClick={changeConfirmPassInput}>
                                {isConfirmPassText ? <FaEye /> : <FaEyeSlash />}
                            </span>
                        </div>
                    </div>
                </div>
                <button type="submit" className='mt-4 bg-primary text-white py-2 px-4 rounded'>
                    Reset Password
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;