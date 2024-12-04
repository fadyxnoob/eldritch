import React, { useState, useEffect, useCallback } from 'react';
import DatabaseService from '../../Appwrite/Database';
import Config from '../../../Config/Config';
import Alert from '../../../Components/Alert/Alert';
import { useParams } from 'react-router-dom';
import Button from '../../Components/Button/Button';
import { ID } from 'appwrite';
import { useNavigate } from 'react-router-dom';

const UpdateMember = () => {
    const [alert, setAlert] = useState(null);
    const { memberID } = useParams();
    const [post, setPost] = useState({});
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const navigate = useNavigate();
    const [collection] = useState(Config.appWriteTeamMembersCollID)


    const getPost = useCallback(async () => {
       
        try {
            const res = await DatabaseService.getDocument(memberID, collection);
            setPost(res);

            if (res.image) {
                setImagePreview(DatabaseService.ViewImage(res.image));
            }
        } catch (error) {
            console.error("Error fetching member:", error);
        }
    }, [memberID]);

    // Handle image change (file upload)
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    useEffect(() => {
        getPost();
    }, [getPost]);

    const handleSubmit = async () => {
        console.log({post});
        try {
            let updatedPost = {
                title: post.title,
                about: post.about,
                type: post.type,
            };

            if (image) {
                if (post.image) {
                    await DatabaseService.deleteFile(post.image);
                }
                const fileID = ID.unique();
                console.log({ fileID });
                const fileResponse = await DatabaseService.uploadFile(fileID, image);
                updatedPost = { ...updatedPost, image: fileID };
            } else {
                updatedPost = { ...updatedPost, image: post.image };
            }

            const response = await DatabaseService.updateDocument(collection, memberID, updatedPost);
            if (response) {
                setAlert({
                    message: "Member updated successfully!",
                    type: 'success',
                });
            }

            setTimeout(() => {
                navigate('/admin/manageTeam')
            }, 1000);
        } catch (error) {
            console.error("Error updating member:", error);
            setAlert({
                message: "Error updating member. Please try again.",
                type: 'error',
            });
        }
    };
    return (
        <div>
            {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
            <h1 className="px-2">Update Member</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
                className="p-5 boxShadow mt-5"
            >
                <div className="">
                    <div className="w-full mb-3">
                        <label htmlFor="Title">Title</label> <br />
                        <input
                            id="Title"
                            type="text"
                            className="mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-10 px-2"
                            onChange={(e) => setPost((prev) => ({ ...prev, title: e.target.value }))}
                            value={post.title || ''}
                        />
                    </div>
                    <div className="w-full mb-3">
                        <label htmlFor="about">About</label> <br />
                        <input
                            id="about"
                            type="text"
                            className="mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-10 px-2"
                            onChange={(e) => setPost((prev) => ({ ...prev, about: e.target.value }))}
                            value={post.about || ''}
                        />
                    </div>
                    <div className="w-full">
                        <label htmlFor="type">Type</label> <br />
                        <select
                            onChange={(e) => setPost((prev) => ({ ...prev, type: e.target.value }))}
                            id="type"
                            className='mt-2 w-full outline-none focus:border-b-2 border-primary bg-[#e8f0fe] px-2 h-10'
                            value={post.type}
                        >
                            <option value="content-creator" className='h-10 p-2'>Content Creator</option>
                            <option value="commentator" className='h-10 p-2'>Commentator</option>
                            <option value="manager" className='h-10 p-2'>Manager</option>
                        </select>
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
                    {post.image && !imagePreview && (
                        <img
                            src={DatabaseService.ViewImage(post?.image)}
                            alt="Current Logo"
                            className="object-cover w-40 h-24 rounded border"
                        />
                    )}
                </div>

                <Button title="Update" />
            </form>
        </div>
    );
};

export default React.memo(UpdateMember)
