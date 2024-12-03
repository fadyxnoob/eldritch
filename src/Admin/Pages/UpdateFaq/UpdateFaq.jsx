import React, { useState, useEffect, useCallback } from 'react';
import DatabaseService from '../../Appwrite/Database';
import Config from '../../../Config/Config';
import Alert from '../../../Components/Alert/Alert';
import { useParams } from 'react-router-dom';
import Button from '../../Components/Button/Button';
import { Query, ID } from 'appwrite';
import { useNavigate } from 'react-router-dom';

const UpdateFaq = () => {
    const [alert, setAlert] = useState(null);
    const { postID } = useParams();
    const [post, setPost] = useState({});
    const [collection] = useState('674b553b00395db94d8a')
    const navigate = useNavigate();

    const getPost = useCallback(async () => {
        const collection = Config.appWritePostsCollID;
        try {
            const res = await DatabaseService.getDocument(postID, collection);
            setPost(res);

        } catch (error) {
            console.error("Error fetching post:", error);
        }
    }, [postID]);

    useEffect(() => {
        getCategories();
        getPost();
    }, [getCategories, getPost]);

    const handleSubmit = async () => {
        try {
            const collection = Config.appWritePostsCollID;
            let updatedPost = {
                title: post.title,
                disc: post.disc,
                cat: post.cat,
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

            const response = await DatabaseService.updateDocument(collection, postID, updatedPost);
            if (response) {
                setAlert({
                    message: "Post updated successfully!",
                    type: 'success',
                });
            }

            setTimeout(() => {
                navigate('/admin/managePosts')
            }, 1000);
        } catch (error) {
            console.error("Error updating post:", error);
            setAlert({
                message: "Error updating post. Please try again.",
                type: 'error',
            });
        }
    };

    return (
        <div>
            {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
            <h1 className="px-2">Update Post</h1>
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
                    <div className="w-full">
                        <label htmlFor="type">Category</label> <br />
                        <select
                            name="category"
                            id="type"
                            className="mt-2 w-full outline-none focus:border-b-2 border-primary bg-[#e8f0fe] px-2 h-10"
                            onChange={(e) => setPost((prev) => ({ ...prev, cat: e.target.value }))}
                            value={post.cat || 'cat'}
                        >
                            {allCat.length > 0 ? (
                                allCat.map((category) => (
                                    <option key={category.$id} value={category.$id}>
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
                        onChange={(e) => setPost((prev) => ({ ...prev, disc: e.target.value }))}
                        value={post.disc || ''}
                        cols="30"
                        rows="10"
                        className="resize-none mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-full p-5"
                    ></textarea>
                </div>

                <Button title="Update Post" />
            </form>
        </div>
    );
};
export default React.memo(UpdateFaq)
