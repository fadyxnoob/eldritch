import React, { useCallback, useEffect, useState } from 'react'
import Button from '../../Components/Button/Button';
import DatabaseService from '../../Appwrite/Database';
import Alert from '../../../Components/Alert/Alert'

const UserGuide = () => {
    const [collection] = useState(String('674ed0f0001f885c9935'))
    const [documentID] = useState(String('674ed89c0007102895ae'))
    const [alert, setAlert] = useState(null);
    const [pageData, setPageData] = useState({ title: '', disc: '' });

    const fetchDataFromDB = useCallback(async () => {
        const res = await DatabaseService.getDocument(documentID, collection)
        if (res) {
            setPageData({
                title: res.title,
                disc: res.disc,
                textHeading: res.textHeading
            })
        }
    }, [])

    useEffect(() => {
        fetchDataFromDB()
    }, []);

    const handleSubmit = useCallback(async () => {
        if (!pageData.title || !pageData.disc) {
            setAlert({ type: 'error', message: 'All fields are required!' });
            return;
        }
        const updateThisData = {
            title: pageData.title,
            disc: pageData.disc,
            textHeading: pageData.textHeading
        };

        try {
            const res = await DatabaseService.updateDocument(collection, documentID, updateThisData);
            setAlert({ type: 'success', message: 'Data updated successfully!' });
        } catch (error) {
            console.error('Error updating document:', error);
            setAlert({ type: 'error', message: 'Failed to update data.' });
        }
    }, [pageData, collection, documentID]);


    return (
        <div>
            {
                alert && <Alert type={alert.type} message={alert.message} onClose={() => { setAlert(null) }} />
            }
            <h1 className="px-2">Mange User's Guide</h1>

            <div className='boxShadow my-10 p-5'>
                <form
                    onSubmit={(e) => {
                        e.preventDefault(),
                            handleSubmit()
                    }}
                >
                    <div className='flex justify-between items-center gap-5'>
                        <div className='w-full'>
                            <label htmlFor="catName">Page Title</label> <br />
                            <input
                                id='catName'
                                type="text"
                                className='mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-10 px-2'
                                value={pageData.title}
                                onChange={(e) => setPageData((prev) => ({ ...prev, title: e.target.value }))}
                            />
                        </div>
                    </div>
                    <div className='my-5'>
                        <label htmlFor="description">Description</label>
                        <textarea
                            value={pageData.disc}
                            onChange={(e) => setPageData((prev) => ({ ...prev, disc: e.target.value }))}
                            id='description' cols="30" rows="10"
                            className='resize-none mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-32 px-2'
                        ></textarea>
                    </div>
                    <Button title={'Update Data'} style={'mt-5 px-1'} />
                </form>
            </div>
        </div>
    )
}

export default React.memo(UserGuide)
