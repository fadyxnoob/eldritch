import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Login = () => {

    const [isText, setIsText] = useState(true);

    const changeInput = () => {
        setIsText((prev) => !prev);
    }

    const submitHandler = (e) => {
        e.preventDefault();
    }
    return (
        <div className='loginWrapper h-screen w-full'>
            <div className='border w-80 h-96 bg-[#00000049] rounded p-7 mx-auto'>
                <h1 className='text-center text-3xl font-bold text-white'>Login</h1>
                <form 
                  onSubmit={(e) => submitHandler(e)}
                className='mt-5 flex flex-col gap-5'>
                    <div className='flex bg-white p-2 gap-2 rounded items-center px-1'>
                        <span>@</span>
                        <input
                            className='outline-none'
                            type="text" placeholder='Username' />
                    </div>
                    <div className='flex bg-white p-2 gap-2 rounded  items-center px-1'>
                        <span>🔒</span>
                        <input
                            className='outline-none'
                            type={isText ? 'password' : 'text'} placeholder='password'
                        />
                        <span
                            onClick={changeInput}
                            className='cursor-pointer'
                        >
                            {
                                isText ? <FaEye /> : <FaEyeSlash />
                            }
                        </span>

                    </div>
                    <button
                        className='w-full bg-primary h-10 rounded text-light'
                    >Login</button>
                </form>
                <div className='text-center mt-5 text-light'>
                    <Link
                        className='text-base'
                        to='/forgetPassword'>Forget Password?
                    </Link>
                    <br />
                    <p>or</p>
                    <Link
                        className='text-base'
                        to='/signup'>SignUp
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
