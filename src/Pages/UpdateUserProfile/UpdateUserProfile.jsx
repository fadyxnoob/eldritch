import React, { useState, useEffect } from 'react'
import authService from '../../Appwrite/Auth';
import { useSelector, useDispatch } from 'react-redux';
import service from '../../Appwrite/Conf';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateUserProfile = () => {

    const [error, setError] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [name, setName] = useState('');
    const [oldEmail, setOldEmail] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userdata)

    useEffect(() => {
        if (userData) {
            setOldEmail(userData.email);
        }
    }, [userData]);

    const getCollection = async () => {
        try {
            setName(userData?.name);
            setEmail(userData?.email);
            const collection = await service.getUserDets({ userID: userData.$id });
            if (collection && collection.documents.length > 0) {
                const userData = collection.documents[0];
                const imageId = userData.image;
                if (imageId) {
                    const imageResponse = service.ViewImage(imageId);
                    setImagePreview(imageResponse);
                }
            } else {
                setError('No collection data returned');
            }
        } catch (error) {
            setError(error.message || 'Failed to fetch collection');
        }
    };

    const updateCurrentUser = async (name, email, password, image) => {
        await authService.updateUser(name, email, password.trim(), image, userData?.$id, navigate);
        setPassword('')
    };
    useEffect(() => {
        if (userData?.$id) {
            getCollection();
        } else {
            navigate('/');
        }
    }, [userData]);


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };


    return (
        <div className='mx-5 px-5 md:mx-20 md:px-20 my-20 py-10 rounded'>
            <h1 className='text-center mb-10 text-3xl'>Update your Profile</h1>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    updateCurrentUser(name, email, password, image,);
                }}
                className='boxShadow p-5'>
                <div className='md:flex md:gap-5'>
                    <div className='w-full'>
                        <label htmlFor="name">Name</label> <br />
                        <input
                            id='name'
                            className='bg-[#e8f0fe] outline-none text-sm focus:border-b-2 border-primary w-full h-10 text-black px-5'
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className='w-full mt-5 md:mt-0'>
                        <label htmlFor="email">Email</label> <br />
                        <input
                            id='email'
                            className='bg-[#e8f0fe] outline-none text-sm focus:border-b-2 border-primary w-full h-10 text-black px-5'
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    {
                        email !== oldEmail ? (
                            <div className='w-full mt-5 md:mt-0'>
                                <label htmlFor="email">Password</label> <br />
                                <input
                                    id='email'
                                    className='bg-[#e8f0fe] outline-none text-sm focus:border-b-2 border-primary w-full h-10 text-black px-5'
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        ) : null
                    }

                </div>
                <div className='mt-10 flex justify-between items-center'>
                    <div className='flex items-center gap-2'>

                        <label htmlFor="uploadImage" className='text-black border border-primary cursor-pointer p-2'>Upload Image</label>

                        {image && <span className="text-light text-sm">{image.name}</span>}

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
                <div className='text-end md:text-start mt-10 md:mt-0'>
                    <button
                        type='submit'
                        className='bg-primary px-5 text-light py-2 rounded'
                    >
                        Update
                    </button>
                </div>
            </form>

        </div>
    )
}

export default UpdateUserProfile
