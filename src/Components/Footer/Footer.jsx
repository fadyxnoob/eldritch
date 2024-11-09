import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
const Footer = () => {
    return (
        <div>
            <div className='px-10 my-5 flex md:justify-between flex-col md:flex-row items-center border-b-2 border-primary py-5'>
                <div>
                    <Link to={'/'}>
                        <h5 className='text-4xl font-bold'>ELDRITCH</h5>
                    </Link>
                </div>
                <div className="mt-5">
                    <ul className='flex gap-10'>
                        <li className='size-10 rounded-full flex items-center justify-center text-light text-lg bg-facebook hover:bg-light hover:border border-facebook hover:text-facebook cursor-pointer'>
                            <a href="#">
                                <FaFacebookF />
                            </a>
                        </li>
                        <li className='size-10 rounded-full flex items-center justify-center text-light text-lg bg-black hover:bg-light hover:border border-black hover:text-black cursor-pointer'>
                            <a href="#">
                                <FaTwitter />
                            </a>
                        </li>
                        <li className='size-10 rounded-full flex items-center justify-center text-light text-lg bg-instagram hover:bg-black hover:border border-black hover:text-instagram cursor-pointer'>
                            <a href="#">
                                <FaInstagram />
                            </a>
                        </li>
                        <li className='size-10 rounded-full flex items-center justify-center text-light text-lg bg-linkedin hover:bg-light hover:border border-linkedin hover:text-linkedin cursor-pointer'>
                            <a href="#">
                                <FaLinkedinIn />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="block sm:flex flex-wrap justify-between gap-1 px-20 mb-10">
                <div className='w-1/2 inline-block sm:w-auto mb-2'>
                    <h5 className='text-2xl font-normal text-primary titlesSections'>Company</h5>
                    <ul className='mt-5 flex flex-col gap-2'>
                        <li><Link to="/" className='underline hover:text-blue-700 font-normal'>Home</Link></li>
                        <li><Link to="/aboutus" className='underline hover:text-blue-700 font-normal'>About Us</Link></li>
                        <li><a href="#" className='underline hover:text-blue-700 font-normal'>Our Blog</a></li>
                        <li><a href="#" className='underline hover:text-blue-700 font-normal'>Our Shop</a></li>
                        <li><a href="#" className='underline hover:text-blue-700 font-normal'>Contact Us</a></li>
                    </ul>
                </div>
                <div className='w-1/2 inline-block sm:w-auto '>
                    <h5 className='text-2xl font-normal text-primary titlesSections'>Pages</h5>
                    <ul className='mt-5 flex flex-col gap-2'>
                        <li><Link to="/candidate" className='underline hover:text-blue-700 font-normal'>Entery</Link></li>
                        <li><a href="#" className='underline hover:text-blue-700 font-normal'>FAQ's</a></li>
                        <li><a href="#" className='underline hover:text-blue-700 font-normal'>User Guide</a></li>
                        <li><a href="#" className='underline hover:text-blue-700 font-normal'>Privacy Policy</a></li>
                        <li><a href="#" className='underline hover:text-blue-700 font-normal'>Terms & Conditions</a></li>
                    </ul>
                </div>
                <div className='w-1/2 inline-block sm:w-auto '>
                    <h5 className='text-2xl font-normal text-primary titlesSections'>Account</h5>
                    <ul className='mt-5 flex flex-col gap-2'>
                        <li><Link to="/signup" className='underline hover:text-blue-700 font-normal'>Signup</Link></li>
                        <li><Link to="/login" className='underline hover:text-blue-700 font-normal'>Login</Link></li>
                        <li><Link to="/myProfile" className='underline hover:text-blue-700 font-normal'>Profile</Link></li>
                    </ul>
                </div>
                <div className='w-1/2 inline-block sm:w-auto '>
                    <h5 className='text-2xl font-normal text-primary titlesSections'>Matches</h5>
                    <ul className='mt-5 flex flex-col gap-2'>
                        <li><a href="#" className='underline hover:text-blue-700 font-normal'>Shedules</a></li>
                    </ul>
                </div>
            </div>
            <div className="px-20 py-5 flex flex-wrap sm:justify-between bg-primary text-light">
                <div>
                    <p>
                        Copyright @ 2024 Eldritch. All right reserved
                    </p>
                </div>
                <div className='flex gap-10 mt-5 justify-between w-full sm:mt-0 sm:w-auto'>
                    <p>
                        <a href="#">
                            Privacy Policy
                        </a>
                    </p>
                    <p>
                        <a href="#">
                            Terms & Conditions
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Footer;
