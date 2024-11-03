import React, { useEffect, useState }  from 'react';
import Image from '../../assets/images/Candi9.jpg'
import authService from '../../Appwrite/Auth';
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {


    return (
        <>
            <div className='banner myProfileBG'>
                <h1 className='text-5xl text-light font-bold border-b-4 border-primary'>My Profile</h1>
            </div>
            <div className="mx-5 md:mx-20 px-5 my-20 boxShadow flex justify-between flex-wrap">
                <div className="w-full md:w-[50%] p-2">
                    <div className='flex flex-col items-center gap-2'>
                        <img src={Image} alt={Image} className='size-56 rounded md:rounded-full object-cover' />
                        <h2 className='text-2xl font-medium'>Exapmle Name </h2>
                        <p>Username</p>
                    </div>
                    <div className='flex flex-start gap-2 mt-5'>
                        <button
                            type='submit'
                            className='bg-primary px-5 py-1 text-light rounded-sm'
                        >
                            Logout
                        </button>
                        <button
                            type='submit'
                            className='bg-primary px-5 py-1 text-light rounded-sm'
                        >
                            Update
                        </button>
                        <button
                            type='submit'
                            className='bg-primary px-5 py-1 text-light rounded-sm'
                        >
                            Social Media
                        </button>

                    </div>
                </div>
                <div className="w-full md:w-[50%] p-2 md:border-l-2">
                    <div className='flex justify-between items-center gap-2 md:px-5 py-3'>
                        <div>
                            <h3>Email</h3>
                            <p className='text-sm text-[#c1c1c1]'>email@example.com</p>
                        </div>
                        <div>
                            <h3>Account Status :: userStatus</h3>
                            <p className='text-sm text-[red]'>Your Account is Blocked</p>
                        </div>
                    </div>

                    <div className='gap-2 md:px-5 py-3'>
                        <h3 className='text-lg font-medium'>Match Info</h3>
                        <div className='flex justify-between items-center mt-2 '>
                            <div>
                                <h3>Match Status</h3>
                                <p className='text-sm text-[#c1c1c1]'>N/A</p>
                            </div>
                            <div>

                                <p className='text-sm text-[#c1c1c1]'>You are not joined any tournament yet</p>
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-between items-center mt-2 md:px-5 py-3'>
                        <div>
                            <h3>Reports</h3>
                        </div>
                        <div>
                            <p className='text-sm text-[#c1c1c1]'>10</p>
                        </div>
                    </div>
                    <div className='flex justify-between items-center mt-2 md:px-5 py-3'>
                        <div>
                            <h3>Orders</h3>
                        </div>
                        <div>
                            <p className='text-sm text-[#c1c1c1]'>20</p>
                        </div>
                    </div>
                    <div className='flex justify-between items-center mt-2 md:px-5 py-3'>
                        <div>
                            <h3>Tournament Winning</h3>
                        </div>
                        <div>
                            <p className='text-sm text-[#c1c1c1]'>3</p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default MyProfile;
