import React, { useEffect, useState } from 'react'
import Button from '../../Components/Button/Button';
import DatabaseService from '../../Appwrite/Database';
import Alert from '../../../Components/Alert/Alert'
import Config from '../../../Config/Config';

const ManageAbout = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const [image, setImage] = useState(null);
    const [collection] = useState(Config.appWritePagesCollID)
    const [documentID] = useState('674ed17d003bf8f62d07')
    const [alert, setAlert] = useState(null);
    const [aboutData, setAboutData] = useState({
        title: '',
        disc: '',
        textHeading: '',
        image: ''
    });

    const fetchDataFromDB = async () => {
        const res = await DatabaseService.getDocument(documentID, collection);
        setAboutData({
            title: res.title || '',
            textHeading: res.textHeading || '',
            disc: res.disc || '',
            image: res.image || ''
        });
    };

    useEffect(() => {
        fetchDataFromDB()
    }, [])

    const handleSubmit = async () => {
        let updatedData = {
            title: aboutData.title,
            textHeading: aboutData.textHeading,
            disc: aboutData.disc,
        }

        try {
            if (image) {
                const fileID = ID.unique();
                const fileRes = await DatabaseService.uploadFile(fileID, image);

                if (fileRes) {
                    if (aboutData.image && aboutData.image) {
                        await DatabaseService.deleteFile(aboutData.image);
                    }
                    updatedData.image = fileRes.$id;
                }
            }

            await DatabaseService.updateDocument(collection, documentID, updatedData);
            setAlert({ type: 'success', message: "Data updated successfully!" });
        } catch (error) {
            console.error("Error updating document:", error);
            setAlert({ type: 'error', message: "Failed to update data." });
        }
    }
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleClose = () => {
        setAlert(null);
    };


    return (
        <div>
            {
                alert && <Alert type={alert.type} message={alert.message} onClose={handleClose} />
            }
            <h1 className="px-2">Mange About Page</h1>
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
                                value={aboutData?.title}
                                onChange={(e) => setAboutData((prev) => ({ ...prev, title: e.target.value }))}
                            />
                        </div>
                        <div className='w-full'>
                            <label htmlFor="catName">Team Text</label> <br />
                            <input
                                id='catName'
                                type="text"
                                className='mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-10 px-2'
                                value={aboutData?.textHeading}
                                onChange={(e) => setAboutData((prev) => ({ ...prev, textHeading: e.target.value }))}
                            />
                        </div>
                    </div>
                    <div className='my-5'>
                        <label htmlFor="description">Description</label>
                        <textarea
                            id='description'
                            value={aboutData?.disc}
                            onChange={(e) => setAboutData((prev) => ({ ...prev, disc: e.target.value }))}
                            className='resize-none mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-32 px-2'
                        ></textarea>
                    </div>
                    <div className='mt-10 flex justify-between items-center'>
                        <div className="flex items-center gap-2">
                            <label htmlFor="uploadImage" className="text-black border border-primary cursor-pointer p-2">
                                Update Logo
                            </label>
                            <input
                                type="file"
                                id="uploadImage"
                                className="hidden"
                                onChange={handleImageChange}
                                accept="image/*"
                            />
                        </div>
                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="object-cover w-24 h-24 rounded border"
                            />
                        )}
                        {aboutData.image && !imagePreview && (
                            <img
                                src={DatabaseService.ViewImage(aboutData?.image)}
                                alt="Current Logo"
                                className="object-cover w-24 h-24 rounded border"
                            />
                        )}
                    </div>
                    <Button title={'Update Data'} style={'mt-5 px-1'} />
                </form>
            </div>
        </div>
    )
}

export default React.memo(ManageAbout)
