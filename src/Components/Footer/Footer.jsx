import React, { useState, useEffect, useCallback } from 'react';
import Config from '../../Config/Config';
import DatabaseService from '../../Admin/Appwrite/Database';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
    const [socialCollection] = useState(Config.appWriteWebsiteSocialCollID)
    const [socialDocument] = useState('674b138f002decfc99d6')
    const [socialData, setSocialData] = useState({ instagram: '', facebook: '', twitter: '', linkedin: '' })

    const getPageData = useCallback(async () => {
        const socialRes = await DatabaseService.getDocument(socialDocument, socialCollection)
        setSocialData({ instagram: socialRes.insta, facebook: socialRes.facebook, twitter: socialRes.twitter, linkedin: socialRes.linkedIn })
    }, [socialCollection])
    
    useEffect(() => {
        getPageData()
    }, [])

    return (
        <>
            <div className='px-10 my-5 flex md:justify-between flex-col md:flex-row items-center border-b-2 border-primary py-5'>
                <div>
                    <Link to={'/'}>
                        <h5 className='text-4xl font-bold'>ELDRITCH</h5>
                    </Link>
                </div>
                <div className="mt-5">
                    <ul className='flex gap-10'>
                        <li className='size-10 rounded-full flex items-center justify-center text-light text-lg bg-facebook hover:bg-light hover:border border-facebook hover:text-facebook cursor-pointer'>
                            <a href={socialData.facebook}>
                                <FaFacebookF />
                            </a>
                        </li>
                        <li className='size-10 rounded-full flex items-center justify-center text-light text-lg bg-black hover:bg-light hover:border border-black hover:text-black cursor-pointer'>
                            <a href={socialData.twitter}>
                                <FaTwitter />
                            </a>
                        </li>
                        <li className='size-10 rounded-full flex items-center justify-center text-light text-lg bg-instagram hover:bg-black hover:border border-black hover:text-instagram cursor-pointer'>
                            <a href={socialData.instagram}>
                                <FaInstagram />
                            </a>
                        </li>
                        <li className='size-10 rounded-full flex items-center justify-center text-light text-lg bg-linkedin hover:bg-light hover:border border-linkedin hover:text-linkedin cursor-pointer'>
                            <a href={socialData.linkedin}>
                                <FaLinkedinIn />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="flex flex-wrap justify-between gap-1 px-5 mb-10">
                {/* Website Section */}
                <div className="w-1/3 md:w-1/5 mb-2">
                    <h5 className="text-2xl font-normal text-primary titlesSections">Company</h5>
                    <ul className="mt-5 flex flex-col gap-2">
                        <li><Link to="/" className="underline hover:text-blue-700 font-normal">Home</Link></li>
                        <li><Link to="/aboutus" className="underline hover:text-blue-700 font-normal">About Us</Link></li>
                        <li><Link to="/blog" className="underline hover:text-blue-700 font-normal">Our Blog</Link></li>
                        <li><Link to="/shop" className="underline hover:text-blue-700 font-normal">Our Shop</Link></li>
                        <li><Link to="/contact" className="underline hover:text-blue-700 font-normal">Contact Us</Link></li>
                    </ul>
                </div>

                {/* Pages Section */}
                <div className="w-1/3 md:w-1/5 mb-2">
                    <h5 className="text-2xl font-normal text-primary titlesSections">Pages</h5>
                    <ul className="mt-5 flex flex-col gap-2">
                        <li><Link to="/candidate" className="underline hover:text-blue-700 font-normal">Entery</Link></li>
                        <li><Link to="/faqsPage" className="underline hover:text-blue-700 font-normal">FAQ's</Link></li>
                        <li><Link to="/usersGuide" className="underline hover:text-blue-700 font-normal">User Guide</Link></li>
                        <li><Link to="/privacyPolicy" className="underline hover:text-blue-700 font-normal">Privacy Policy</Link></li>
                        <li><Link to="/termsAndConditions" className="underline hover:text-blue-700 font-normal">Terms & Conditions</Link></li>
                    </ul>
                </div>

                {/* Users Section  */}
                <div className="w-1/3 md:w-1/5 mb-2">
                    <h5 className="text-2xl font-normal text-primary titlesSections">Account</h5>
                    <ul className="mt-5 flex flex-col gap-2">
                        <li><Link to="/signup" className="underline hover:text-blue-700 font-normal">Signup</Link></li>
                        <li><Link to="/login" className="underline hover:text-blue-700 font-normal">Login</Link></li>
                        <li><Link to="/myProfile" className="underline hover:text-blue-700 font-normal">Profile</Link></li>
                    </ul>
                </div>

                {/* Matches Section */}
                <div className="w-1/3 md:w-1/5 mb-2">
                    <h5 className="text-2xl font-normal text-primary titlesSections">Matches</h5>
                    <ul className="mt-5 flex flex-col gap-2">
                        <li><Link to="/schedules" className="underline hover:text-blue-700 font-normal">Schedules</Link></li>
                    </ul>
                </div>
            </div>

            <div className="px-2 py-5 flex flex-wrap sm:justify-between bg-primary text-light sm:px-20">
                <div>
                    <p>
                        Copyright @ 2024 Eldritch. All right reserved
                    </p>
                </div>
                <div className='flex gap-10 mt-5 justify-between w-full sm:mt-0 sm:w-auto'>
                    <p>
                        <Link to="/privacyPolicy">
                            Privacy Policy
                        </Link>
                    </p>
                    <p>
                        <Link to="/termsAndConditions">
                            Terms & Conditions
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}

export default React.memo(Footer);
