import React, { useCallback, useEffect, useState } from 'react';
import DatabaseService from '../../Admin/Appwrite/Database';
import Config from '../../Config/Config';

const TermsAndConditions = () => {
    const [collection] = useState(Config.appWritePagesCollID);
    const [document] = useState('67514633001c4e5a1119')
    const [pageData, setPageData] = useState({ title: '', disc: '' })

    const getDataFromDB = useCallback(async () => {
        const res = await DatabaseService.getDocument(document, collection)
        setPageData({ title: res.title, disc: res.disc })
    }, [collection])
         
    useEffect(() => {
        getDataFromDB()
    }, [getDataFromDB])

    return (
        <div>
            <div className='banner forgetBanner'>
                <h1 className='text-5xl text-light font-bold border-b-4 border-primary'>{pageData.title}</h1>
            </div>
            <div className="my-10 boxShadow p-5 w-[70%] mx-auto">
                <p>
                    {pageData.disc}
                </p>
            </div>
        </div>
    )
}

export default React.memo(TermsAndConditions)
