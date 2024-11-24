import React, {useState} from 'react'
import Button from '../../Components/Button/Button'


const ManageWebsite = () => {
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
            <h1 className="px-2">Manage Website</h1>
            <div className="my-10 boxShadow pt-5 px-5">
                <form>
                    <div
                        className='flex justify-between flex-col md:flex-row gap-5'
                    >
                        <div className='w-full'>
                            <label htmlFor="title">Title</label>
                            <input
                                id='title'
                                type="text"
                                className='mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-10 px-2'
                                value={'Site Title'}
                                onChange={() => (e.target.value)}
                            />
                        </div>
                        <div className='w-full'>
                            <label htmlFor="Button">Button</label>
                            <input
                                id='Button'
                                type="text"
                                className='mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-10 px-2'
                                value={'Site name'}
                                onChange={() => BiSolidObjectsVerticalCenter(e.target.value)}
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
                                type="text"
                                className='mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-10 px-2'
                                value={'Site Title'}
                                onChange={() => BiSolidObjectsVerticalCenter(e.target.value)}
                            />
                        </div>
                        <div className='w-full'>
                            <label htmlFor="Address">Address</label>
                            <input
                                id='Address'
                                type="text"
                                className='mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-10 px-2'
                                value={'Site name'}
                                onChange={() => BiSolidObjectsVerticalCenter(e.target.value)}
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
                                type="text"
                                className='mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-10 px-2'
                                value={'Site Title'}
                                onChange={() => BiSolidObjectsVerticalCenter(e.target.value)}
                            />
                        </div>
                        <div className='w-full'>
                            <label htmlFor="Currency">Currency</label>
                            <input
                                id='Currency'
                                type="text"
                                className='mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-10 px-2'
                                value={'Site name'}
                                onChange={() => BiSolidObjectsVerticalCenter(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <textarea cols="30" rows="10"
                            className='resize-none mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-32 px-2'
                        ></textarea>
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
                    <Button title={'Update'} style={'my-5'} />
                </form>
            </div>
        </div>
    )
}

export default ManageWebsite
