import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Alert } from '../../../'

const Login = () => {
    const [isText, setIsText] = useState(true);
    const [email, setEmail] = useState('admin@gmail.com');
    const [password, setPassword] = useState('12345678');
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch();

    return (
        <div className='loginWrapper h-screen w-full flex-col'>
            <div className='border w-80 h-96 bg-[#00000049] rounded p-7 mx-auto'>
                <h1 className='text-center text-3xl font-bold text-white'>Login</h1>
                <form
                    className='mt-5 flex flex-col gap-5'>
                    <div className='flex bg-white p-2 gap-2 rounded items-center px-1'>
                        <span>@</span>
                        <input
                            className='outline-none'
                            type="email" placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='flex bg-white p-2 gap-2 rounded  items-center px-1'>
                        <span>🔒</span>
                        <input
                            className='outline-none'
                            type={isText ? 'password' : 'text'} placeholder='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span
                            onClick={''}
                            className='cursor-pointer'
                        >
                            {
                                isText ? <FaEye /> : <FaEyeSlash />
                            }
                        </span>
                    </div>
                    <button
                        type="submit"
                        className='w-full bg-primary h-10 rounded text-light'
                    >Login</button>
                </form>
                <div className='text-center mt-5 text-light'>
                    <Link
                        className='text-base'
                        to='/forgetPassword'>Forget Password?
                    </Link>
                </div>
            </div>
        </div>
    )
}
export { Login as AdminLogin };