import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { MdLogin, MdAccountBox } from "react-icons/md";
import { TbLogin } from "react-icons/tb";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Store/authSlice';
import authService from '../../Appwrite/Auth';


const Topbar = () => {
    const dispatch = useDispatch();
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate();
    // console.log('your authStatus is ::',authStatus );

    const logoutHandler = () => {
        authService.logout().then(() => {
            localStorage.clear()
            localStorage.removeItem('authStatus'); 
            dispatch(logout())
        }).catch((error) => {
            console.log('logOut btn ERROR ::', error);
        })
    }

    
    return (
        <div className='flex bg-primary px-20 py-1 justify-center lg:justify-between'>
            <div className='hidden md:flex justify-center items-center gap-5 text-light'>
                <span className='font-semibold'>Follow Us :</span>
                <a href="#"> <FaFacebookF />  </a>
                <a href="#"> <FaTwitter />    </a>
                <a href="#"> <FaLinkedinIn /> </a>
                <a href="#"> <FaInstagram />  </a>
            </div>
            {
                authStatus ?
                    <button
                        onClick={logoutHandler}
                        className='bg-white px-2 rounded-sm py-1'>
                        Logout
                    </button> : 'Login kro'
            }

            <div className='flex gap-5 text-light'>
                <Link to="/login" className='flex items-center gap-1 underline '> <MdLogin /> Login</Link>
                <Link to="/signup" className='flex items-center gap-1 underline '> <MdAccountBox /> Signup</Link>
                <Link to="/candidate" className='flex items-center gap-1 underline '> <TbLogin /> Join</Link>
            </div>
        </div>
    );
}

export default Topbar;
