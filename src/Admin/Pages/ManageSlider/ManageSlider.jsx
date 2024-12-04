import React, { useState, useEffect, useCallback } from 'react'
import Button from '../../Components/Button/Button'
import DatabaseService from '../../Appwrite/Database';
import Alert from '../../../Components/Alert/Alert'
import { ID } from 'appwrite';
import Config from '../../../Config/Config';


const ManageSlider = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const [image, setImage] = useState(null);
    const [collection] = useState(Config.appWriteSliderCollID)
    const [slider, setSlider] = useState({ title: '', button: '', image: '' })
    const [documentId, setDocumentID] = useState('')
    const [alert, setAlert] = useState(null);


    const fetchDataFromDB = async () => {
        const res = await DatabaseService.getAllDocuments(collection)
        const document = res?.documents['0']
        if (document) {
            setSlider({
                title: document.title,
                button: document.button,
                image: document.image
            })
            setDocumentID(document.$id)
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };



    const handleSubmit = useCallback(async () => {
        let updateData = {
            title: slider.title,
            button: slider.button
        }
        try {
            if (image) {
                const fileID = ID.unique()
                const fileRes = await DatabaseService.uploadFile(fileID, image)

                if (fileRes) {
                    if (slider.image) {
                        await DatabaseService.deleteFile(slider.image)
                    }
                    updateData.image = fileRes.$id;
                }
            }

            await DatabaseService.updateDocument(collection, documentId, updateData);
            setAlert({ type: 'success', message: "Data updated successfully!" });
        } catch (error) {
            console.log(error);
            setAlert({ type: 'error', message: "Data updated Failed successfully!" });
        }

    }, [collection, documentId, image, slider])

    useEffect(() => {
        fetchDataFromDB()
    }, []);


    const handleClose = () => {
        setAlert(null);
    };


    return (
        <div>
            {
                alert && <Alert type={alert.type} message={alert.message} onClose={handleClose} />
            }
            <h1 className="px-2">Update Slider</h1>
            <div className="my-10 boxShadow p-5">
                <form
                    onSubmit={(e) => {
                        e.preventDefault(),
                            handleSubmit()
                    }}
                >
                    <div
                        className='flex justify-between flex-col md:flex-row gap-5'
                    >
                        <div className='w-full'>
                            <label htmlFor="title">Title</label>
                            <input
                                id='title'
                                type="text"
                                className='mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-10 px-2'
                                value={slider.title}
                                onChange={(e) => setSlider((prev) => ({ ...prev, title: e.target.value }))}
                            />
                        </div>
                        <div className='w-full'>
                            <label htmlFor="button">Button</label>
                            <input
                                id='button'
                                type="text"
                                className='mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-10 px-2'
                                value={slider.button}
                                onChange={(e) => setSlider((prev) => ({ ...prev, button: e.target.value }))}
                            />
                        </div>
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
                        {slider.image && !imagePreview && (
                            <img
                                src={DatabaseService.ViewImage(slider.image)}
                                alt="Slider Image"
                                className="object-cover w-24 h-24 rounded border"
                            />
                        )}
                    </div>
                    <Button title={'Update'} style={'my-5'} />
                </form>
            </div>
        </div>
    )
}

export default React.memo(ManageSlider)
