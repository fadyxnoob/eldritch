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
            <div className="px-5 flex flex-col sm:flex-row md:px-20 gap-5 mt-20 w-full md:mx-20">
                <div className='w-full h-[500px] sm:w-[40%] md:w-[40%]'>
                    <img src={DatabaseService.ViewImage(pageData.image)} alt={pageData.image} className='size-full rounded object-fill'/>
                </div>
                <div className='w-full sm:w-[40%] md:w-[50%]'>
                    <p>{pageData.disc}</p>
                </div>
            </div>
            <div className='mx-5 my-10'>
                <h2 className='text-center text-4xl font-normal'>{pageData.textHeading}</h2>
                <div className="relative flex flex-wrap justify-center gap-10 mt-5">
                    <MemberCard />
                </div>
            </div>
        </>
    );                                                                                        
} 

export default React.memo(About);
