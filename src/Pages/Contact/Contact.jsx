import React, { useState, useEffect, useCallback } from 'react';
import { FaFacebookSquare, FaTwitterSquare, FaLinkedin, FaInstagramSquare } from "react-icons/fa";
import service from '../../Appwrite/Conf';
import { Alert } from '../../'
import Config from '../../Config/Config';
import DatabaseService from '../../Admin/Appwrite/Database';


const Contact = () => {
    const [collection] = useState(Config.appWritePagesCollID)
    const [documentID] = useState('674ed1b2003e7951148b')
    const [socialCollection] = useState(Config.appWriteWebsiteSocialCollID)
    const [socialDocument] = useState('674b138f002decfc99d6')
    const [pageData, setPageData] = useState({ title: '', disc: '', textHeading: '' })
    const [error, setError] = useState(null)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [socialData, setSocialData] = useState({ instagram: '', facebook: '', twitter: '', linkedin: '' })

    const storeMessage = async () => {
        setError(null);

        // Validation for empty fields
        if (!name || !email || !message) {
            setError({ type: 'warning', message: 'All fields are required.' });
            return;
        }
        try {
            const data = await service.storeUserMessage({ name, email, message }, setError);
            if (data === null || data === undefined) {
                setError({type:'error', message:'Failed to Send Message..'});
            } else {
                setError({type:'success', message:'Your Message has been sent...'});
                setName('')
                setEmail('')
                setMessage('')
            }
        } catch (error) {
            console.error('Failed to store data:', error)
            setError({type:'error', message:'Something went wrong.'})
        }
    };

    const handleAlertClose = () => {
        setError(null);
    };


    const getPageData = useCallback(async () => {
        const res = await DatabaseService.getDocument(documentID, collection)
        setPageData({ title: res.title, disc: res.disc, textHeading: res.textHeading })
        const socialRes = await DatabaseService.getDocument(socialDocument, socialCollection)
        setSocialData({ instagram: socialRes.insta, facebook: socialRes.facebook, twitter: socialRes.twitter, linkedin: socialRes.linkedIn })
        console.log({ socialRes });

    }, [collection, socialCollection])
    useEffect(() => {
        getPageData()
    }, [])


    return (
        <>
            {error &&
                <Alert message={error.message} type={error.type} onClose={handleAlertClose} />
            }
            <div className='banner aboutBG'>
                <h1
                    className='text-5xl text-light font-bold border-b-4 border-primary'
                >
                    {pageData.title}
                </h1>
            </div>
            <div
                className='gap-5 my-20 mx-5 md:mx-20 flex justify-between md:flex-row flex-col'
            >
                <div className='w-full'>
                    <h1
                        className='text-3xl font-bold px-2'
                    >{pageData.textHeading}</h1>
                    <p
                        className='mt-7 px-2'
                    >
                        {pageData.disc}</p>
                    <div className='mt-5 flex items-center gap-5 px-2'>
                        <p>Follow us on :</p>
                        <div className='flex gap-5'>
                            <a href={socialData.facebook}>
                                <FaFacebookSquare className='size-6 text-primary cursor-pointer' />
                            </a>
                            <a href={socialData.twitter}>
                                <FaTwitterSquare className='size-6 text-primary cursor-pointer' />
                            </a>
                            <a href={socialData.linkedin}>
                                <FaLinkedin className='size-6 text-primary cursor-pointer' />
                            </a>
                            <a href={socialData.instagram}>
                                <FaInstagramSquare className='size-6 text-primary cursor-pointer' />
                            </a>
                        </div>
                    </div>
                </div>
                <div className='w-full'>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault(),
                                storeMessage()
                        }}
                    >
                        <input type="text" className='bg-[#e8f0fe] outline-none text-sm focus:border-b-2 border-primary w-full h-12 text-black px-5' placeholder='Enter Your Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <input type="email" className='bg-[#e8f0fe] outline-none text-sm focus:border-b-2 border-primary w-full h-12 text-black px-5 mt-5' placeholder='Enter Your Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <textarea
                            className='bg-[#e8f0fe] outline-none text-sm focus:border-b-2 border-primary w-full text-black px-5 mt-5 p-2 resize-none'
                            placeholder='Enter Your Message'
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                            cols="30" rows="7"></textarea>
                        <button
                            className='w-full bg-primary h-12 mt-5 text-light'
                        >Send Message</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default React.memo(Contact)
