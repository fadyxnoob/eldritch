import React, { useCallback, useState, useEffect } from 'react'
import Button from '../../Components/Button/Button'
import Alert from '../../../Components/Alert/Alert'
import DatabaseService from '../../Appwrite/Database'
import Config from '../../../Config/Config'

const ManageSocialMedia = () => {
    const [socialData, setSocialData] = useState({
        facebook: '',
        insta: '',
        linkedIn: '',
        twitter: ''
    })

    const [alert, setAlert] = useState(null)
    const [collection] = useState(Config.appWriteWebsiteSocialCollID)
    const [documentID, setDocumentID] = useState('')

    const getDataFromDB = useCallback(async () => {
        const res = await DatabaseService.getAllDocuments(collection)
        if (res) {
            const doc = res.documents['0']
            setSocialData({
                facebook: doc.facebook,
                insta: doc.insta,
                linkedIn: doc.linkedIn,
                twitter: doc.twitter
            })
            setDocumentID(doc.$id)
        }
    }, [])

    useEffect(() => {
        getDataFromDB()
    }, []);

    const handleSubmit = useCallback(async () => {
        const updateData = {
            facebook: socialData.facebook,
            insta: socialData.insta,
            linkedIn: socialData.linkedIn,
            twitter: socialData.twitter,
        };
        
        try {
            const res = await DatabaseService.updateDocument(collection, documentID, updateData);
            if (res) {
                setAlert({ type: 'success', message: 'Data updated successfully.' });
            }
        } catch (error) {
            setAlert({ type: 'error', message: `Data updation failed: ${error.message}` });
            console.error('Error updating document:', error);
        }
    }, [socialData]);

    const closeHandle = useCallback(async () => {
        setAlert(null)
    }, [])

    return (
        <div>
            {
                alert && <Alert message={alert.message} type={alert.type} onClose={closeHandle} />
            }
            <h1 className="px-2">Manage Social Media</h1>
            <div className="my-10">
                <form
                    onSubmit={(e) => {
                        e.preventDefault(),
                            handleSubmit()
                    }}
                    className='p-5 boxShadow'
                >
                    <div
                        className='flex justify-between flex-col md:flex-row gap-5 '
                    >
                        <div className='w-full'>
                            <label htmlFor="Facebook">Facebook</label>
                            <input
                                id='Facebook'
                                type="text"
                                className='mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-10 px-2'
                                value={socialData.facebook}
                                onChange={(e) => setSocialData((prev) => ({ ...prev, facebook: e.target.value }))}
                            />
                        </div>
                        <div className='w-full'>
                            <label htmlFor="Instagram">Instagram</label>
                            <input
                                id='Instagram'
                                type="text"
                                className='mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-10 px-2'
                                value={socialData.insta}
                                onChange={(e) => setSocialData((prev) => ({ ...prev, insta: e.target.value }))}
                            />
                        </div>
                    </div>
                    <div
                        className='flex justify-between flex-col md:flex-row gap-5 mt-5'
                    >
                        <div className='w-full'>
                            <label htmlFor="Linkedin">Linkedin</label>
                            <input
                                id='Linkedin'
                                type="text"
                                className='mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-10 px-2'
                                value={socialData.linkedIn}
                                onChange={(e) => setSocialData((prev) => ({ ...prev, linkedIn: e.target.value }))}
                            />
                        </div>
                        <div className='w-full'>
                            <label htmlFor="Twitter">Twitter</label>
                            <input
                                id='Twitter'
                                type="text"
                                className='mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-10 px-2'
                                value={socialData.twitter}
                                onChange={(e) => setSocialData((prev) => ({ ...prev, twitter: e.target.value }))}
                            />
                        </div>
                    </div>

                    <Button title={'Update'} style={'my-5'} />
                </form>
            </div>
        </div>
    )
}

export default React.memo(ManageSocialMedia)
