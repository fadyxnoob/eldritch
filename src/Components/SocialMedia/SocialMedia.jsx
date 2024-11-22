import React, { useEffect, useState } from 'react'
import { TbXboxX } from "react-icons/tb";
import authService from '../../Appwrite/Auth';


const SocialMedia = ({ closeModel, userID }) => {

    const [facebook, setFacebook] = useState('')
    const [instagram, setInstagram] = useState('')
    const [youtube, setYoutube] = useState('')
    const [twitter, setTwitter] = useState('')
    const [error, setError] = useState(null)

    const getSocials = () => {
        authService.getUserSocial(userID)
            .then((user) => {
                const document = user?.documents?.[0] || {};
                setFacebook(document.facebook || '');
                setInstagram(document.instagram || '');
                setYoutube(document.youtube || '');
                setTwitter(document.twitter || '');
                console.log(document);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const updateSocialMedia = () => {
        authService.updateSocials(userID, facebook, instagram, youtube, twitter)
            .then((msg) => {
                console.log('Updated done', msg)
                closeModel()

            })
            .catch((error) => { console.log(error); })
    }
    
    useEffect(() => {
        document.body.style.overflowY = 'hidden';
        getSocials()
        return () => {
            document.body.style.overflowY = 'auto';
        };
    }, []);
    return (
        <div
            className="w-full h-full fixed top-0 left-0 bottom-0 right-0 bg-[#0f1010d2] z-10 pt-10">
            <div className='z-20 mx-5 bg-[#1c1c1c] rounded-sm h-[85%] md:w-[30%] md:mx-auto my-5 p-5 flex justify-center pt-10 relative'>
                <TbXboxX
                    onClick={closeModel}
                    className='absolute top-2 right-2 text-red-600 size-7 cursor-pointer hover:text-light'
                />
                <form className='w-full'
                    onSubmit={(e) => {
                        e.preventDefault(),
                            updateSocialMedia()
                    }}
                >
                    <div className='w-full'>
                        <label htmlFor="insta" className='text-light text-lg'>Instagram</label> <br />
                        <input
                            value={instagram}
                            onChange={(e) => setInstagram(e.target.value)}
                            type="text" className='bg-[#e8f0fe] outline-none text-sm focus:border-b-2 border-primary h-10 text-black px-5 mt-2 w-full' />
                    </div>
                    <div className='w-full mt-2'>
                        <label htmlFor="insta" className='text-light text-lg'>Facebook</label> <br />
                        <input
                            value={facebook}
                            onChange={(e) => setFacebook(e.target.value)}
                            type="text" className='bg-[#e8f0fe] outline-none text-sm focus:border-b-2 border-primary h-10 text-black px-5 mt-2 w-full' />
                    </div>
                    <div className='w-full mt-2'>
                        <label htmlFor="insta" className='text-light text-lg'>Twitter</label> <br />
                        <input
                            value={twitter}
                            onChange={(e) => setTwitter(e.target.value)}
                            type="text" className='bg-[#e8f0fe] outline-none text-sm focus:border-b-2 border-primary h-10 text-black px-5 mt-2 w-full' />
                    </div>
                    <div className='w-full mt-2'>
                        <label htmlFor="insta" className='text-light text-lg'>Youtube</label> <br />
                        <input
                            value={youtube}
                            onChange={(e) => setYoutube(e.target.value)}
                            type="text" className='bg-[#e8f0fe] outline-none text-sm focus:border-b-2 border-primary h-10 text-black px-5 mt-2 w-full' />
                    </div>
                    <button className='mt-5 bg-primary px-3 py-1 text-light'>Update</button>
                </form>
            </div>
        </div>
    )
}

export default React.memo(SocialMedia)
