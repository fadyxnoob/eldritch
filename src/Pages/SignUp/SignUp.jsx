import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [isPassText, setIsPassText] = useState(true);
    const [isConfirmPassText, setIsConfirmPassText] = useState(true);
        document.title = 'Byt3Blitz | Sign Up'

    const changePassInput = () => {
        setIsPassText((prev) => !prev);
    }
    const changeConfirmPassInput = () => {
        setIsConfirmPassText((prev) => !prev);
    }
    return (
        <div className='loginWrapper h-screen w-full'>
            <div className='w-full border border-primary md:w-[40%] h-96 bg-[#00000049] rounded px-7 py-10 mx-auto'>
                <h1 className='text-center text-3xl font-bold text-white'>Sign Up</h1>
                <form
                    className='mt-5'
                >
                    <div>
                        <label htmlFor="name" className='text-base text-light'>Name</label> <br />
                        <input
                            className='outline-none px-2 text-sm w-full h-8 text-black'
                            type="text" placeholder='Enter Name...'
                            id='name'
                        />
                    </div>
                    <div className='w-full block md:flex md:gap-2 justify-between mt-2'>
                        <div>
                            <label htmlFor="name" className='text-light text-sm '>Username</label> <br />
                            <input type="text" placeholder='Enter username...' className='w-full text-sm border-none outline-none px-2 h-8 text-black' />
                        </div>
                        <div>
                            <label htmlFor="name" className='text-light text-sm '>Email</label> <br />
                            <input type="email" placeholder='Enter email...' className='w-full text-sm border-none outline-none px-2 h-8 text-black' />
                        </div>
                    </div>
                    <div className='block md:flex md:gap-2 justify-between mt-2'>
                        <div>
                            <label htmlFor="name" className='text-light text-sm '>Password</label> <br />
                            <div className='relative'>
                                <input type={isPassText ? 'password' : 'text'} placeholder='Enter password...' className='w-full text-sm border-none outline-none px-2 h-8 text-black' />
                                <span className='absolute right-2 top-2 cursor-pointer' onClick={changePassInput}>
                                    {
                                     isPassText ? <FaEye /> : <FaEyeSlash />
                                    }
                                </span>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="name" className='text-light text-sm '>Confirm Password</label> <br />
                            <div className='relative'>
                                <input type={isConfirmPassText ? 'password' : 'text'} placeholder='Confirm password...' className='w-full text-sm border-none outline-none px-2 h-8 text-black' />
                                <span className='absolute right-2 top-2 cursor-pointer' onClick={changeConfirmPassInput}>
                                    {
                                     isConfirmPassText ? <FaEye /> : <FaEyeSlash />
                                    }
                                </span>
                            </div>
                        </div>
                    </div>


                    <div className="mt-5 flex justify-between items-center">
                        <div>
                              <label htmlFor="uploadImage" className='text-light border border-primary cursor-pointer p-2'>Upload Image</label>
                              <input type="file" className='hidden' id='uploadImage'/>
                        </div>
                        <button
                            className='h-8 w-20 bg-primary rounded-sm text-light'
                        >Signup</button>
                    </div>

                    <p className='mt-5 text-light'>Already Have an Account <Link to="/login" className='text-blue-500 font-bold underline'>Login</Link></p>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
