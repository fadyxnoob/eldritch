import React, { useCallback, useEffect, useState } from 'react';
import DatabaseService from '../../Appwrite/Database';
import Alert from '../../../Components/Alert/Alert';
import Button from '../../Components/Button/Button';
import { ID } from 'appwrite';
import Config from '../../../Config/Config';

const ManageLiveStream = () => {
    const [data, setData] = useState({ link: '', image: '', status: '' });
    const [collection] = useState(Config.appWriteLiveStreamCollID);
    const [document] = useState('6750736500068e960862');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [alert, setAlert] = useState(null);
   
    // Fetch Data from Database
    const getDataFromDB = async () => {
        try {
            const res = await DatabaseService.getDocument(document, collection);
            setData({ link: res.Link, image: res.image, status: res.status });
        } catch (error) {
            console.error('Error fetching data:', error);
            setAlert({ type: 'error', message: 'Failed to fetch data.' });
        }
    };

    useEffect(() => {
        getDataFromDB();
    }, []);

    // Handle Image Change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    // Submit Handler for Updating Link and Image
    const submitHandler = useCallback(
        async (e) => {
            e.preventDefault();

            const updatedData = {
                Link: data.link,
                ...(image && { image: image.name }),
            };

            try {
                if (image) {
                    const fileID = ID.unique();
                    const fileRes = await DatabaseService.uploadFile(fileID, image);

                    if (fileRes) {
                        if (data.image) {
                            await DatabaseService.deleteFile(data.image);
                        }
                        updatedData.image = fileRes.$id;
                    }
                }
                const res = await DatabaseService.updateDocument(collection, document, updatedData);
                if (res.type === 'success') {
                    setAlert({ type: 'success', message: 'Data updated successfully!' });
                    getDataFromDB();
                }
            } catch (error) {
                console.error('Error updating document:', error);
                setAlert({ type: 'error', message: 'Failed to update data.' });
            }
        },
        [data, collection, document, image]
    );

    // Status Handler for Updating Status
    const statusHandler = useCallback(
        async (currentStatus) => {
            const newStatus = currentStatus === 'Pending' ? 'Active' : 'Pending';

            try {
                const res = await DatabaseService.updateDocument(collection, document, { status: newStatus });
                if (res.type === 'success') {
                    setData((prev) => ({ ...prev, status: newStatus }));
                    setAlert({
                        type: newStatus === 'Active' ? 'warning' : 'success',
                        message: newStatus === 'Active' ? 'Live stream is stopped.' : 'You are live now!',
                    });
                }
            } catch (error) {
                console.error('Error updating status:', error);
                setAlert({ type: 'error', message: 'Failed to update status.' });
            }
        },
        [collection, document]
    );

    return (
        <div>
            {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
            <h1 className="px-2">Manage Live Stream</h1>
            <div className="boxShadow my-10 p-5">
                <form onSubmit={submitHandler}>
                    <div className="flex justify-between items-center gap-5 md:flex-row flex-col">
                        <div className="w-full">
                            <label htmlFor="link">Link</label>
                            <input
                                id="link"
                                type="text"
                                className="mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-10 px-2"
                                value={data.link}
                                onChange={(e) => setData((prev) => ({ ...prev, link: e.target.value }))}
                            />
                        </div>
                    </div>
                    <div className="mt-10 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <label htmlFor="uploadImage" className="text-black border border-primary cursor-pointer p-2">
                                Update Thumbnail
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
                                className="object-cover w-40 h-24 rounded border"
                            />
                        )}
                        {data.image && !imagePreview && (
                            <img
                                src={DatabaseService.ViewImage(data?.image)}
                                alt="Current Logo"
                                className="object-cover w-40 h-24 rounded border"
                            />
                        )}
                    </div>
                    <div className="flex justify-between items-center mt-3">
                        <Button title="Update" type="submit" />
                        {data.status === 'Pending' ? (
                            <button
                                className="bg-red-600 px-5 py-2 text-light rounded"
                                type="button"
                                onClick={() => statusHandler('Pending')}
                            >
                                Stop Live
                            </button>
                        ) : (
                            <button
                                className="bg-green-500 px-5 py-2 text-light rounded"
                                type="button"
                                onClick={() => statusHandler('Active')}
                            >
                                Go Live
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default React.memo(ManageLiveStream);
