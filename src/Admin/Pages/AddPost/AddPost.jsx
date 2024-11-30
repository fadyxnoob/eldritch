import React, { useCallback, useState, useEffect } from 'react';
import Button from '../../Components/Button/Button';
import DatabaseService from '../../Appwrite/Database';
import Config from '../../../Config/Config';
import { Query, ID } from 'appwrite';
import Alert from '../../../Components/Alert/Alert';
import { useNavigate } from 'react-router-dom';

const AddPost = () => {
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [title, setTitle] = useState('');
    const [allCat, setAllCat] = useState([]);
    const [disc, setDisc] = useState('');
    const [cat, setCat] = useState('');
    const [alert, setAlert] = useState(null);
    const navigate = useNavigate();

    const getAllCats = useCallback(async () => {
        const collection = Config.appWriteCatsCollID;
        const params = [Query.equal('type', 'post')];
        try {
            const res = await DatabaseService.getAllDocuments(collection, params);
            const documents = res.documents || [];
            setAllCat(documents);
            if (documents.length > 0) {
                setCat(documents[0].$id);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }, []);

    useEffect(() => {
        getAllCats();
    }, [getAllCats]);

    const handleImageChange = useCallback((e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    }, []);

    const handleSubmit = useCallback(async () => {
        if (!title) {
            setAlert({ type: 'error', message: 'Document title is missing' });
            return; 
        }
        if (!image) {
            setAlert({ type: 'error', message: 'Document Image is missing' });
            return; 
        }
        if (!disc) {
            setAlert({ type: 'error', message: 'Document description is missing' });
            return; 
        }

        const collection = Config.appWritePostsCollID;
        const status = 'Pending';
        const date = new Date().toLocaleString();
        const author = 'Mukallam Khud';

        try {
            const fileId = ID.unique(); 
            const uploadResponse = await DatabaseService.uploadFile(fileId, image); 
            if (!uploadResponse) {
                throw new Error('Failed to upload image');
            }
            const data = { title, disc, cat, image: uploadResponse.$id, status, date, author };
            const res = await DatabaseService.addDocument(collection, data);
            if (res) {
                setAlert(res); 
                setTimeout(() => {
                    navigate('/admin/managePosts')
                    setAlert(null); 
                }, 1000);
            }
            
        } catch (error) {
            console.error('Error adding document:', error);
            setAlert({ type: 'error', message: 'Failed to add the document. Please try again.' });
        }
    }, [title, disc, cat, image]);

    const closeAlert = () => {
        setAlert(null);
    };

    return (
        <div>
            {alert && <Alert message={alert.message} type={alert.type} onClose={closeAlert} />}
            <h1 className="px-2">Add new Post</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
                className="p-5 boxShadow mt-5"
            >
                <div className="flex gap-5 flex-col md:flex-row">
                    <div className="w-full">
                        <label htmlFor="Title">Title</label> <br />
                        <input
                            id="Title"
                            type="text"
                            className="mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-10 px-2"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                        />
                    </div>
                    <div className="w-full">
                        <label htmlFor="type">Category</label> <br />
                        <select
                            name=""
                            id="type"
                            className="mt-2 w-full outline-none focus:border-b-2 border-primary bg-[#e8f0fe] px-2 h-10"
                            onChange={(e) => setCat(e.target.value)}
                            value={cat} 
                        >
                            {allCat.length > 0 ? (
                                allCat.map((category) => (
                                    <option key={category.$id} value={category.$id} className="h-10 p-2">
                                        {category.cat_name}
                                    </option>
                                ))
                            ) : (
                                <option disabled>No categories available</option>
                            )}
                        </select>
                    </div>
                </div>
                <div className="mt-10 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <label
                            htmlFor="uploadImage"
                            className="text-black border border-primary cursor-pointer p-2"
                        >
                            Upload Image
                        </label>
                        {image && <span className="text-black text-sm">{image.name}</span>}
                        <input
                            type="file"
                            className="hidden"
                            id="uploadImage"
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
                </div>
                <div className="mb-3">
                    <textarea
                        onChange={(e) => setDisc(e.target.value)}
                        value={disc}
                        cols="30"
                        rows="10"
                        className="resize-none mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-32 px-2"
                    ></textarea>
                </div>
                <Button title={'Add Post'} />
            </form>
        </div>
    );
};

export default React.memo(AddPost);
