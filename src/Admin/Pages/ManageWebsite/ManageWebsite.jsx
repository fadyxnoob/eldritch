import React, { useCallback, useEffect, useState } from 'react'
import Button from '../../Components/Button/Button'
import DatabaseService from '../../Appwrite/Database';
import Alert from '../../../Components/Alert/Alert'
import { ID } from 'appwrite';

const ManageWebsite = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const [image, setImage] = useState(null);
    const [website, setWebsite] = useState({
        title: "",
        name: "",
        email: "",
        address: "",
        disc: "",
        phone: "",
        currency: "",
        logo: "",
    });
    const [collection] = useState('674ae58c00187d6cecad');
    const [documentId, setDocumentId] = useState(null);
    const [alert, setAlert] = useState(null);

    const fetchWebsiteData = useCallback(async () => {
        try {
            const res = await DatabaseService.getAllDocuments(collection);

            if (res?.documents?.length > 0) {
                const doc = res.documents[0];
                setWebsite({
                    title: doc.title || "",
                    name: doc.name || "",
                    email: doc.email || "",
                    address: doc.address || "",
                    disc: doc.disc || "",
                    phone: doc.phone || "",
                    currency: doc.currency || "",
                    logo: doc.logo || "", // only store the logo ID or URL
                });
                setDocumentId(doc.$id);
            } else {
                console.error("No documents found in the collection.");
            }
        } catch (error) {
            console.error("Error fetching website data:", error);
        }
    }, [collection]);

    useEffect(() => {
        fetchWebsiteData();
    }, [fetchWebsiteData]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = useCallback(async () => {
        if (!documentId) {
            console.error("No document ID found.");
            return;
        }
    
        let updatedData = {
            title: website.title,
            name: website.name,
            email: website.email,
            address: website.address,
            disc: website.disc,
            phone: website.phone,
            currency: website.currency,
        };
    
        try {
            if (image) {
                const fileID = ID.unique();
                const fileRes = await DatabaseService.uploadFile(fileID, image);
    
                if (fileRes) {
                    if (website.logo && website.logo) {
                        await DatabaseService.deleteFile(website.logo);
                    }
                    updatedData.logo = fileRes.$id; 
                }
            }
    
            await DatabaseService.updateDocument(collection, documentId, updatedData);
            setAlert({ type: 'success', message: "Data updated successfully!" });
        } catch (error) {
            console.error("Error updating document:", error);
            setAlert({ type: 'error', message: "Failed to update data." });
        }
    }, [collection, documentId, image, website]);
    


    const handleClose = () => {
        setAlert(null);
    };
    return (
        <div>
            {
                alert && <Alert type={alert.type} message={alert.message} onClose={handleClose} />
            }
            <h1 className="px-2">Manage Website</h1>
            <div className="my-10 boxShadow pt-5 px-5">
                <form
                    onSubmit={(e) => {
                        e.preventDefault(),
                            handleSubmit()
                    }}
                >
                    <div
                        className='flex justify-between flex-col md:flex-row gap-5'
                    >
                        <div className="w-full">
                            <label htmlFor="title">Title</label>
                            <input
                                id="title"
                                type="text"
                                className="mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-10 px-2"
                                onChange={(e) => setWebsite((prev) => ({ ...prev, title: e.target.value }))}
                                value={website.title}
                            />
                        </div>
                        <div className='w-full'>
                            <label htmlFor="Button">Name</label>
                            <input
                                id='Button'
                                type="text"
                                className='mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-10 px-2'
                                value={website.name}
                                onChange={(e) => setWebsite((prev) => ({ ...prev, name: e.target.value }))}
                            />
                        </div>
                    </div>

                    <div
                        className='flex justify-between flex-col md:flex-row gap-5 my-5'
                    >
                        <div className='w-full'>
                            <label htmlFor="Email">Email</label>
                            <input
                                id='Email'
                                type="email"
                                className='mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-10 px-2'
                                value={website.email}
                                onChange={(e) => setWebsite((prev) => ({ ...prev, email: e.target.value }))}
                            />
                        </div>
                        <div className='w-full'>
                            <label htmlFor="Address">Address</label>
                            <input
                                id='Address'
                                type="text"
                                className='mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-10 px-2'
                                value={website.address}
                                onChange={(e) => setWebsite((prev) => ({ ...prev, address: e.target.value }))}
                            />
                        </div>
                    </div>

                    <div
                        className='flex justify-between flex-col md:flex-row gap-5 my-5'
                    >
                        <div className='w-full'>
                            <label htmlFor="Phone">Phone</label>
                            <input
                                id='Phone'
                                type="number"
                                className='mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-10 px-2'
                                value={website.phone}
                                onChange={(e) => setWebsite((prev) => ({ ...prev, phone: e.target.value }))}
                            />
                        </div>
                        <div className='w-full'>
                            <label htmlFor="Currency">Currency</label>
                            <input
                                id='Currency'
                                type="text"
                                className='mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-10 px-2'
                                value={website.currency}
                                onChange={(e) => setWebsite((prev) => ({ ...prev, currency: e.target.value }))}
                            />
                        </div>
                    </div>
                    <div>
                        <textarea
                            onChange={(e) => setWebsite((prev) => ({ ...prev, disc: e.target.value }))}
                            value={website.disc || ""}
                            cols="30"
                            rows="10"
                            className="resize-none mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-32 px-2"
                        />
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
                        {website.logo && !imagePreview && (
                            <img
                                src={DatabaseService.ViewImage(website.logo)}
                                alt="Current Logo"
                                className="object-cover w-24 h-24 rounded border"
                            />
                        )}
                    </div>
                    <Button title={'Update Data'} style={'my-5'} />
                </form>
            </div>
        </div>
    )
}

export default React.memo(ManageWebsite)
