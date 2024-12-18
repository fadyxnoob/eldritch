import React, { useState } from 'react'
import Button from '../../Components/Button/Button';

const UpdateAdmin = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    return (
        <div>
            <h1 className="px-2">Update Admin</h1>

            <div className='boxShadow my-10 p-5'>
                <div className='flex justify-between items-center gap-5'>
                    <div className='w-full'>
                        <label htmlFor="catName">Name</label> <br />
                        <input
                            id='catName'
                            type="text"
                            className='mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-10 px-2'
                            value={'admin name'}
                        />
                    </div>
                    <div className='w-full'>
                        <label htmlFor="catName">Email</label> <br />
                        <input
                            id='catName'
                            type="text"
                            className='mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-10 px-2'
                            value={'admin@admin.com'}
                        />
                    </div>
                </div>

                <div className='mt-10 flex justify-between items-center'>
                    <div className='flex items-center gap-2'>
                        <label htmlFor="uploadImage" className='text-black border border-primary cursor-pointer p-2'>Upload Image</label>

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
            </div>
            <Button title={'Update Admin'} style={'mt-5 px-1'} />
        </div>
    )
}

export default React.memo(UpdateAdmin);
