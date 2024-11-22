import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../Appwrite/Auth';
import { authLogin } from '../../Store/authSlice'
import { useDispatch } from 'react-redux';
import { Alert } from '../../'



const Login = () => {

    const [isText, setIsText] = useState(true);
    const [email, setEmail] = useState('yasir@gmail.com');
    const [password, setPassword] = useState('12345678');
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const handleLogin = async (email, password) => {
        try {
            const session = await authService.login({ email, password }, setError);

            if (session) {
                localStorage.setItem('authStatus', 'true');
                const userData = await authService.getCurrentUser();
                if (userData && userData.$id) {
                    dispatch(authLogin({ userdata: userData }));
                    localStorage.setItem('authStatus', 'true')
                    navigate('/myProfile');
                }
            } else {
                setError('No session created.');
                console.error('No session created.');
                return;
            }
        } catch (error) {
            console.error('Login ERROR:', error);
        }
    };


    const changeInput = () => {
        setIsText((prev) => !prev);
    }


    document.title = 'Byt3Blitz | Login'

    return (
        <div className='loginWrapper h-screen w-full flex-col'>
            
            {
                error ? <div className='mb-5 w-80 bg-[#00000049] rounded mx-auto'>
                    <Alert message={error} />
                </div> : null
            }

            <div className='border w-80 h-96 bg-[#00000049] rounded p-7 mx-auto'>
                <h1 className='text-center text-3xl font-bold text-white'>Login</h1>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleLogin(email, password);
                    }}
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
                            onClick={changeInput}
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

export default React.memo(Login);
