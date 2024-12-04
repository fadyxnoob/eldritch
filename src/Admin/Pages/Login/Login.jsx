import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import adminService from '../../Appwrite/Auth';
import { loginAdmin } from '../../../Store/AdminSlice'

const AdminLogin = () => {
    const [isText, setIsText] = useState(true);
    const [email, setEmail] = useState('new123@gmail.com');
    const [password, setPassword] = useState('12345678');
    const [alert, setAlert] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handlePasswordToggle = () => {
        setIsText((prev) => !prev);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const session = await adminService.adminLogin({ email, password });
            if (session.type === 'success') {
                setAlert({ message: 'Login successful!', type: 'success' });
                localStorage.setItem('adminLogin', 'true');

                const adminData = await adminService.getCurrentAdmin();

                if (adminData && adminData?.data) {
                    localStorage.setItem('adminData', JSON.stringify(adminData.data));
                    localStorage.setItem('adminLogin', 'true');
                    dispatch(loginAdmin({ adminData: adminData?.data }));
                    navigate('/admin');
                } else {
                    setAlert({ message: 'Failed to fetch admin data.', type: 'error' });
                }
            } else {
                setAlert({ message: session.message, type: 'error' });
            }
        } catch (error) {
            console.error('Login error:', error);
            setAlert({ message: 'An unexpected error occurred.', type: 'error' });
        }
    };


    return (
        <>
            <div className="loginWrapper h-screen w-full flex-col flex items-center justify-center">
                <div className="border w-80 h-auto bg-[#00000049] rounded p-7 mx-auto">
                    <h1 className="text-center text-3xl font-bold text-white">Admin Login</h1>
                    <form
                        className="mt-5 flex flex-col gap-5"
                        onSubmit={handleSubmit}
                    >
                        <div className="flex bg-white p-2 gap-2 rounded items-center px-1">
                            <span>@</span>
                            <input
                                className="outline-none flex-grow"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                aria-label="Email"
                            />
                        </div>
                        <div className="flex bg-white p-2 gap-2 rounded items-center px-1">
                            <span>🔒</span>
                            <input
                                className="outline-none flex-grow"
                                type={isText ? 'password' : 'text'}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                aria-label="Password"
                            />
                            <span
                                onClick={handlePasswordToggle}
                                className="cursor-pointer"
                                aria-label="Toggle password visibility"
                            >
                                {isText ? <FaEye /> : <FaEyeSlash />}
                            </span>
                        </div>
                        {alert && (
                            <div className="text-light text-sm text-center py-1 px-2 bg-red-500">
                                {alert.message}
                            </div>
                        )}
                        <button
                            type="submit"
                            className="w-full bg-primary h-10 rounded text-light"
                        >
                            Login
                        </button>
                    </form>
                    <div className="text-center mt-5 text-light">
                        <Link
                            className="text-base"
                            to="/forgetPassword"
                        >
                            Forgot Password?
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default React.memo(AdminLogin);
