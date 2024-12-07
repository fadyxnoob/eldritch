import React, { useCallback, useEffect, useState } from 'react';
import { MemberCard } from '../../'
import Config from '../../Config/Config';
import DatabaseService from '../../Admin/Appwrite/Database';

const About = () => {
    const [collection] = useState(Config.appWritePagesCollID)
    const [documentID] = useState('674ed17d003bf8f62d07')
    const [pageData, setPageData] = useState({ title: '', disc: '', textHeading: '', image: '' })

    const getPageData = useCallback(async () => {
        const res = await DatabaseService.getDocument(documentID, collection)
        setPageData({ title: res.title, disc: res.disc, textHeading: res.textHeading, image: res.image })
    }, [collection])
    useEffect(() => {
        getPageData()
    }, [])

    return (
        <>
            <div className='forgetBanner banner mb-10'>
                <h1 className='text-5xl text-light font-bold border-b-4 border-primary'>{pageData.title}</h1>
            </div>
            <div className="px-5 md:flex md:px-20 gap-5 mt-20 w-full md:mx-20">
                <div className='md:w-[45%]'>
                    <img src={DatabaseService.ViewImage(pageData.image)} alt={pageData.image} className='h-screen w-full rounded' />
                </div>
                <div className='md:w-[50%]'>
                    <p>{pageData.disc}</p>
                </div>
            </div>
            <div className='mx-5 md:px-20 md:mx-20 mt-10'>
                <h2 className='text-center text-4xl font-normal'>{pageData.textHeading}</h2>
                <div className="relative flex items-center sm:flex-row flex-col justify-between mt-5 gap-10">
                    <MemberCard />
                </div>
            </div>
        </>
    );                                                                                        
} 

export default React.memo(About);
