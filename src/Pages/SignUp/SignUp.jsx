import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../Appwrite/Auth'
import { useDispatch } from 'react-redux';
import { authLogin } from '../../Store/authSlice'
import { Alert } from '../../'


const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [image, setImage] = useState();
    const [isPassText, setIsPassText] = useState(true);
    const [isConfirmPassText, setIsConfirmPassText] = useState(true);
    const [error, setError] = useState(null)

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!name) {
            setError("Missing name");
            return;
        }

        if (!userName) {
            setError("Missing username");
            return;
        }

        if (!email) {
            setError("Missing email");
            return;
        }
        // Validation checks
        if (!password) {
            setError('Please define password');
            return;
        }

        if (password !== confirmPassword) {
            setError('Password does not match confirm password');
            return;
        }

        if (!image) {
            setError("Missing image");
            return;
        }

        // Attempt to create account after passing validations
        try {
            const userData = await authService.createAccount({
                email,
                password,
                name,
                userName,
                image,
            }, navigate, setError);

            if (userData) {
                const currentUser = await authService.getCurrentUser();
                if (currentUser) {
                    dispatch(authLogin(currentUser));
                    navigate('/login');
                }

                // Clear inputs after successful submission
                setName('');
                setUserName('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setImage(null);
            }
        } catch (error) {
            console.error('Account Creation ERROR :: ', error);
        }
    };


    document.title = 'Byt3Blitz | Sign Up'

    const changePassInput = () => {
        setIsPassText((prev) => !prev);
    }
    const changeConfirmPassInput = () => {
        setIsConfirmPassText((prev) => !prev);
    }


    return (
        <div className='loginWrapper h-screen w-full flex-col'>
            {
                error ? <div className='w-full mb-5 border-primary md:w-[40%] bg-[#00000049] rounded mx-auto'>
                    <Alert message={error} />
                </div> : null
            }
            <div className='w-full border border-primary md:w-[40%] md:h-96 bg-[#00000049] rounded px-7 py-10 mx-auto overflow-hidden'>
                <h1 className='text-center text-3xl font-bold text-white'>Sign Up</h1>
                <form
                    onSubmit={handleSignup}
                    className='mt-5'
                >
                    <div>
                        <label htmlFor="name" className='text-base text-light'>Name</label> <br />
                        <input
                            value={name}
                            className='outline-none px-2 text-sm w-full h-8 text-black'
                            type="text" placeholder='Enter Name...'
                            id='name'
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className='w-full block md:flex md:gap-2 justify-between mt-2'>
                        <div>
                            <label htmlFor="uname" className='text-light text-sm '>Username</label> <br />
                            <input
                                id='uname'
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                type="text" placeholder='Enter username...' className='w-full text-sm border-none outline-none px-2 h-8 text-black' />
                        </div>
                        <div>
                            <label htmlFor="email" className='text-light text-sm '>Email</label> <br />
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                id='email' type="email" placeholder='Enter email...' className='w-full text-sm border-none outline-none px-2 h-8 text-black' />
                        </div>
                    </div>
                    <div className='block md:flex md:gap-2 justify-between mt-2'>
                        <div>
                            <label htmlFor="password" className='text-light text-sm '>Password</label> <br />
                            <div className='relative'>
                                <input
                                    value={password}
                                    id='password'
                                    onChange={(e) => setPassword(e.target.value)}
                                    type={isPassText ? 'password' : 'text'} placeholder='Enter password...' className='w-full text-sm border-none outline-none px-2 h-8 text-black' />
                                <span className='absolute right-2 top-2 cursor-pointer' onClick={changePassInput}>
                                    {
                                        isPassText ? <FaEye /> : <FaEyeSlash />
                                    }
                                </span>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className='text-light text-sm '>Confirm Password</label> <br />
                            <div className='relative'>
                                <input
                                    value={confirmPassword}
                                    id='confirmPassword'
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    type={isConfirmPassText ? 'password' : 'text'} placeholder='Confirm password...' className='w-full text-sm border-none outline-none px-2 h-8 text-black' />
                                <span className='absolute right-2 top-2 cursor-pointer' onClick={changeConfirmPassInput}>
                                    {
                                        isConfirmPassText ? <FaEye /> : <FaEyeSlash />
                                    }
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 flex justify-between items-center">
                        <div className='flex items-center gap-2'>
                            <label htmlFor="uploadImage" className='text-light border border-primary cursor-pointer p-2'>Upload Image</label>
                            {image && <span className='text-light text-sm'>{image.name}</span>}
                            <input type="file" className='hidden' id='uploadImage'
                                onChange={(e) => setImage(e.target.files[0])}
                                accept="image/*" />
                        </div>
                        <button
                            type='submit'
                            className='h-8 w-20 bg-primary rounded-sm text-light'
                        >Signup</button>
                    </div>

                    <p className='mt-2 text-light'>Already Have an Account <Link to="/login" className='text-blue-500 font-bold underline '>Login</Link></p>
                </form>
            </div>
        </div>
    );
}

export default React.memo(SignUp);
