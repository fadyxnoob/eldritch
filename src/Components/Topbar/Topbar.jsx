import React, { useState, useEffect, useCallback } from 'react';
import Config from '../../Config/Config';
import DatabaseService from '../../Admin/Appwrite/Database';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { MdLogin, MdAccountBox } from "react-icons/md";
import { TbLogin } from "react-icons/tb";
import { Link } from 'react-router-dom';


const Topbar = ({ user }) => {
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
        <div className='flex bg-primary px-20 py-1 justify-center lg:justify-between'>
            <div className='hidden md:flex justify-center items-center gap-5 text-light'>
                <span className='font-semibold'>Follow Us :</span>
                <a href={socialData.facebook}> <FaFacebookF />  </a>
                <a href={socialData.twitter}> <FaTwitter />    </a>
                <a href={socialData.linkedin}> <FaLinkedinIn /> </a>
                <a href={socialData.instagram}> <FaInstagram />  </a>
            </div>
            {
                user ?
                    <Link to='/myProfile'>
                        <button
                            className='bg-white px-2 rounded-sm py-1'>
                            {user.name}
                        </button>
                    </Link> : null
            }

            <div className='flex gap-5 text-light'>
                <Link to="/login" className='flex items-center gap-1 underline '> <MdLogin /> Login</Link>
                <Link to="/signup" className='flex items-center gap-1 underline '> <MdAccountBox /> Signup</Link>
                <Link to="/candidate" className='flex items-center gap-1 underline '> <TbLogin /> Join</Link>
            </div>
        </div>
    );
}

export default React.memo(Topbar);
