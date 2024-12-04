import React, { useCallback, useState } from 'react';
import Button from '../../Components/Button/Button';
import DatabaseService from '../../Appwrite/Database';
import { ID } from 'appwrite';
import Alert from '../../../Components/Alert/Alert';
import { useNavigate } from 'react-router-dom';
import Config from '../../../Config/Config';

const AddTeamMember = () => {
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [memberData, setMemberData] = useState({ title: '', about: '', type: '', image: '' });
    const [alert, setAlert] = useState(null);
    const navigate = useNavigate();
    const [collection] = useState(Config.appWriteTeamMembersCollID)

    const handleImageChange = useCallback((e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    }, []);

    const handleSubmit = useCallback(async () => {

        if (!memberData.title && !memberData.about && !memberData.type && !memberData.image) {
            setAlert({ type: 'error', message: 'Please fill all the fields' });
            return;
        }

        try {
            const fileId = ID.unique();
            const uploadResponse = await DatabaseService.uploadFile(fileId, image);
            if (!uploadResponse) {
                throw new Error('Failed to upload image');
            }
            const data = { title: memberData.title, about: memberData.about, type: memberData.type, image: uploadResponse.$id };
            const res = await DatabaseService.addDocument(collection, data);
            if (res) {
                setAlert(res);
                setTimeout(() => {
                    navigate('/admin/manageTeam')
                    setAlert(null);
                }, 1000);
            }

        } catch (error) {
            console.error('Error adding document:', error);
            setAlert({ type: 'error', message: 'Failed to add the document. Please try again.' });
        }
    }, [memberData, image]);

    return (
        <div>
            {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
            <h1 className="px-2">Add new member</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
                className="p-5 boxShadow mt-5"
            >
                <div className="flex gap-5 flex-col md:flex-row">
                    <div className="w-full">
                        <label htmlFor="Title">Name</label> <br />
                        <input
                            id="Title"
                            type="text"
                            className="mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-10 px-2"
                            onChange={(e) => setMemberData((prev) => ({ ...prev, title: e.target.value }))}
                            value={memberData.title}
                        />
                    </div>
                    <div className="w-full">
                        <label htmlFor="Title">About</label> <br />
                        <input
                            id="Title"
                            type="text"
                            className="mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-10 px-2"
                            onChange={(e) => setMemberData((prev) => ({ ...prev, about: e.target.value }))}
                            value={memberData.about}
                        />
                    </div>
                    <div className="w-full">
                        <label htmlFor="type">Type</label> <br />
                        <select
                            onChange={(e) => setMemberData((prev) => ({ ...prev, type: e.target.value }))}
                            id="type"
                            className='mt-2 w-full outline-none focus:border-b-2 border-primary bg-[#e8f0fe] px-2 h-10'
                        >
                            <option value="content-creator" className='h-10 p-2'>Content Creator</option>
                            <option value="commentator" className='h-10 p-2'>Commentator</option>
                            <option value="manager" className='h-10 p-2'>Manager</option>
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
                <Button title={'Add'} style={'my-5'} />
            </form>
        </div>
    );
}

export default React.memo(AddTeamMember)
