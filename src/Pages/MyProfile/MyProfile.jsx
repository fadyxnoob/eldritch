import React, { useEffect, useState } from 'react';
import service from '../../Appwrite/Conf';
import { useSelector, useDispatch } from 'react-redux';
import authService from '../../Appwrite/Auth';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../Store/authSlice'
import { Link } from 'react-router-dom';
import { SocialMedia } from '../../'
import { setLocalStorage } from '../../LocalStorage/LocalStorage';


const MyProfile = () => {
    const [error, setError] = useState('');
    const [image, setImage] = useState(null);
    const userdata = useSelector((state) => state.auth.userdata);
    const [userDets, setUserDets] = useState(null);
    const [getUser, setGetUser] = useState(null)
    const [userSocials, setUserSocials] = useState(null)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [openModel, setOpenModel] = useState(false)

    const closeModel = () => {
        setOpenModel(false)
    }

    const getCollection = async () => {
        try {
            const collection = await service.getUserDets(userdata.$id);
            if (collection && collection.documents.length > 0) {
                const userData = collection.documents[0];
                setUserDets(userData);

                // Fetch image URL if the image ID exists
                const imageId = userData.image;
                if (imageId) {
                    const imageResponse = service.ViewImage(imageId);
                    setImage(imageResponse);
                }

                const user = await authService.getCurrentUser();
                if (user) {
                    setGetUser(user);
                } else {
                    setError('no User Found')
                }

                const userSocials = await service.getUserSocials(userdata.$id);
                if (userSocials) {
                    setUserSocials(userSocials)
                } else {
                    console.log('User Socials not Found');
                }

            } else {
                setError('No collection data returned');
            }
        } catch (error) {
            console.error('Error fetching collection:', error);
            setError(error.message || 'Failed to fetch collection');
        }
    };

    const handleLogout = async () => {
        authService.logout().then(() => {
            setLocalStorage('authStatus', '');
            dispatch(logout())
            navigate('/')
        }).catch((error) => {
            console.log('logOut btn ERROR ::', error);
        })
    }
    useEffect(() => {
        if (userdata?.$id) {
            getCollection();
        } else {
            navigate('/')
        }
    }, [userdata, getCollection]);

    return (
        <>
            {
                openModel && <SocialMedia closeModel={closeModel} userID={userdata.$id} />
            }

            <div className='banner myProfileBG'>
                <h1 className='text-5xl text-light font-bold border-b-4 border-primary'>My Profile</h1>
            </div>
            <div className="mx-5 md:mx-20 px-5 my-20 boxShadow flex justify-between flex-wrap">
                <div className="w-full md:w-[50%] p-2">
                    <div className='flex flex-col items-center gap-2'>
                        <img src={image} alt={image} className='size-56 rounded md:rounded-full object-cover' />
                        <h2 className='text-2xl font-medium'>{userdata?.name}</h2>
                        <p>{userDets?.userName}</p>
                    </div>
                    <div className='flex flex-start justify-center md:justify-start gap-2 mt-5'>
                        <button
                            onClick={handleLogout}
                            type='submit'
                            className='bg-primary px-2 md:px-5 py-1 text-light rounded-sm'
                        >
                            Logout
                        </button>
                        <Link
                            to={`/update_user`}
                            type='submit'
                            className='bg-primary px-2 md:px-5 py-1 text-light rounded-sm'
                        >
                            Update
                        </Link>
                        <button
                            onClick={() => setOpenModel(true)}
                            type='submit'
                            className='bg-primary px-2 md:px-5 py-1 text-light rounded-sm'
                        >
                            Social Media
                        </button>

                    </div>
                </div>
                <div className="w-full md:w-[50%] p-2 md:border-l-2">
                    <div className='flex justify-between items-center gap-2 md:px-5 py-3'>
                        <div>
                            <h3>Email</h3>
                            <p className='text-sm text-[#c1c1c1]'>{getUser?.email}</p>
                        </div>
                        <div>
                            <h3>Account Status {userDets?.status} </h3>
                            {
                                userDets?.status === 'Pending' ?
                                    (<p className='text-sm text-[#E4A11B] text-center'>Your Account is under review</p>)
                                    : (<p className='text-sm text-[green]'>Your Account is Active</p>)
                            }
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
                            <p className='text-sm text-[#c1c1c1]'>{userDets?.reports}</p>
                        </div>
                    </div>
                    <div className='flex justify-between items-center mt-2 md:px-5 py-3'>
                        <div>
                            <h3>Orders</h3>
                        </div>
                        <div>
                            <p className='text-sm text-[#c1c1c1]'>{userDets?.orders}</p>
                        </div>
                    </div>
                    <div className='flex justify-between items-center mt-2 md:px-5 py-3'>
                        <div>
                            <h3>Tournament Winning</h3>
                        </div>
                        <div>
                            <p className='text-sm text-[#c1c1c1]'>{userDets?.tournamentsWon}</p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default React.memo(MyProfile);
