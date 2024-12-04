import React, { useState, useEffect } from 'react';
import authService from '../../Appwrite/Auth';
import service from '../../Appwrite/Conf';
import { useSelector } from 'react-redux';


const Candidate = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [inGameName, setInGameName] = useState('');
    const [inGameID, setInGameID] = useState('');
    const [isCandidate, setIsCandidate] = useState(false)
    const userData = useSelector((state) => state.auth.userdata)

    const user = () => {
        setEmail(userData?.email || '');
        service.getUserDets(userData?.$id).then((msg) => {
            setUserName(msg?.documents[0].userName || '');
        }).catch((error) => {
            console.log(error);
        });
    };

    const registerCandi = () => {
        const id = userData?.$id;
        authService.registerCandidate({ id, userName, inGameName, inGameID }).then((msg) => {
            console.log('User Become Candidate ::', msg);
        }).catch((error) => {
            console.log('Failed to Become Candidate ::', error);
        })
    }

    const Candidate = () => {
        authService.getCandidate(userData?.$id)
            .then((msg) => {
                if (msg && msg.total > 0) {
                    setIsCandidate(true);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        user();
        Candidate();
    }, []);

    document.title = 'Byt3Blitz | Candidate';

    if (!isCandidate) {
        return (
            <div>
                <div className='candidateBanner banner'>
                    <h1 className='text-5xl text-light font-bold border-b-4 border-primary'>Register</h1>
                </div>
                <h2 className='text-lg md:text-4xl mb-2 font-semibold text-center mt-10'>Register for the Tournament</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        registerCandi();
                    }}
                >
                    <div className='w-full p-5 md:w-1/2 mx-auto my-10 boxShadow'>
                        <div className='flex justify-between gap-5'>
                            <div className='w-full md:w-1/2'>
                                <label htmlFor="username" className='text-sm'>Username</label> <br />
                                <input
                                    value={userName}
                                    id='username'
                                    type="text"
                                    disabled
                                    className='mt-2 text-sm bg-[#e8f0fe] w-full h-8 text-black px-5 focus:border-b-2 border-primary outline-none'
                                />
                            </div>
                            <div className='w-full md:w-1/2'>
                                <label htmlFor="email" className='text-sm'>Email</label> <br />
                                <input
                                    value={email}
                                    disabled
                                    id='email'
                                    type="email"
                                    className='mt-2 text-sm bg-[#e8f0fe] w-full h-8 text-black px-5 focus:border-b-2 border-primary outline-none'
                                />
                            </div>
                        </div>
                        <div className='flex justify-between gap-5 mt-5'>
                            <div className='w-full md:w-1/2'>
                                <label htmlFor="ign" className='text-sm'>In-Game Name</label> <br />
                                <input
                                    value={inGameName}
                                    onChange={(e) => setInGameName(e.target.value)}
                                    id='ign'
                                    type="text"
                                    className='mt-2 text-sm bg-[#e8f0fe] w-full h-8 text-black px-5 focus:border-b-2 border-primary outline-none'
                                    placeholder='Enter username here...'
                                />
                            </div>
                            <div className='w-full md:w-1/2'>
                                <label htmlFor="igID" className='text-sm'>In-Game ID</label> <br />
                                <input
                                    value={inGameID}
                                    onChange={(e) => setInGameID(e.target.value)}
                                    id='igID'
                                    type="number"
                                    min='0'
                                    className='mt-2 text-sm bg-[#e8f0fe] w-full h-8 text-black px-5 focus:border-b-2 border-primary outline-none'
                                    placeholder='Enter ID here...'
                                />
                            </div>
                        </div>
                        <p className='mt-5 text-sm'>
                            You cannot add a new email and username while registering.
                        </p>
                        <div className="text-end">
                            <button className='mt-5 bg-primary px-3 py-1 text-light w-32 h-10'>Register</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    } else {
        return (
            <div className="text-center mt-10">
                <h2 className="text-2xl font-semibold">You are already registered for the tournament.</h2>
            </div>
        );
    }

}

export default React.memo(Candidate);
