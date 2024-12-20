import React, { useState, useEffect, useCallback, useRef } from 'react';
import Config from '../../Config/Config';
import DatabaseService from '../../Admin/Appwrite/Database';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { MdLogin, MdAccountBox } from "react-icons/md";
import { TbLogin } from "react-icons/tb";
import { Link } from 'react-router-dom';
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


const Topbar = ({ user }) => {
    const [socialCollection] = useState(Config.appWriteWebsiteSocialCollID)
    const [socialDocument] = useState('674b138f002decfc99d6')
    const [socialData, setSocialData] = useState({ instagram: '', facebook: '', twitter: '', linkedin: '' })

    const socialRef = useRef();
    const linksRef = useRef();

    useEffect(() => {
        const ctx = gsap.context(() => {
            const timeline = gsap.timeline();
            timeline.from(socialRef.current.children[0], {
                opacity: 0,
                x: -30,
                duration: 0.8,
                ease: 'power2.out',
            });

            timeline.from(
                Array.from(socialRef.current.children).slice(1),
                {
                    y: -30,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'power2.out',
                }
            );

            user ? timeline.from(linksRef.current.children[0], {
                opacity: 0,
                y: -50,
                duration: 0.6,
            }) : timeline.from(linksRef.current.children[0], {
                opacity: 0,
                y: -50,
                duration: 0.6,
            })
                .from(linksRef.current.children[1], {
                    opacity: 0,
                    y: 50,
                    duration: 0.4,
                })
                .from(linksRef.current.children[2], {
                    opacity: 0,
                    x: 100,
                    duration: 0.3,
                });
        });
        return () => ctx.revert();

    }, []);


    const getPageData = useCallback(async () => {
        const socialRes = await DatabaseService.getDocument(socialDocument, socialCollection)
        setSocialData({ instagram: socialRes.insta, facebook: socialRes.facebook, twitter: socialRes.twitter, linkedin: socialRes.linkedIn })
    }, [socialCollection])

    useEffect(() => {
        getPageData()
    }, [])

    return (
        <div className='fixed w-full top-0 left-0 flex bg-primary sm:px-20 py-1 justify-center lg:justify-between z-50'>
            <div className='hidden md:flex justify-center items-center gap-5 text-light' ref={socialRef}>
                <span className='font-semibold' >Follow Us :</span>
                <a href={socialData.facebook}> <FaFacebookF />  </a>
                <a href={socialData.twitter}> <FaTwitter />    </a>
                <a href={socialData.linkedin}> <FaLinkedinIn /> </a>
                <a href={socialData.instagram}> <FaInstagram />  </a>
            </div>
            {
                user ?
                    <Link to='/myProfile' ref={linksRef}>
                        <button
                            className='bg-white px-2 rounded-sm'>
                            {user.name}
                        </button>
                    </Link> : null
            }
            {
                !user ? (
                    <div className='flex gap-5 text-light' ref={linksRef}>
                        <Link to="/login" className='flex items-center gap-1 underline '> <MdLogin /> Login</Link>
                        <Link to="/signup" className='flex items-center gap-1 underline '> <MdAccountBox /> Signup</Link>
                        <Link to="/candidate" className='flex items-center gap-1 underline '> <TbLogin /> Join</Link>
                    </div>
                ) : null
            }

        </div>
    );
}

export default React.memo(Topbar);
