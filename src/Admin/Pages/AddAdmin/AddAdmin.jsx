import React from 'react'
import Button from '../../Components/Button/Button'
const AddAdmin = () => {
    return (
        <>
            <h1 className='px-2'>Add New Admin</h1>
            <div className='boxShadow my-10 p-5'>
                <div className='flex justify-between items-center gap-5 md:flex-row flex-col'>
                    <div className='w-full'>
                        <label htmlFor="catName"> Name</label> <br />
                        <input
                            id='catName'
                            type="text"
                            className='mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-10 px-2'
                        />
                    </div>
                    <div className='w-full'>
                        <label htmlFor="catName"> Email</label> <br />
                        <input
                            id='catName'
                            type="email"
                            className='mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-10 px-2'
                        />
                    </div>
                    <div className='w-full'>
                        <label htmlFor="catName"> Password</label> <br />
                        <input
                            id='catName'
                            type="password"
                            className='mt-2 w-full bg-[#e8f0fe] focus:border-b-2 outline-none border-primary h-10 px-2'
                        />
                    </div>
                </div>
                <Button title={'Add Admin'} style={'mt-5 px-5'} />
            </div>
        </>
    )
}

export default AddAdmin
