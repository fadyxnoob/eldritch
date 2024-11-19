import React, { useState } from 'react';
import { FaFacebookSquare, FaTwitterSquare, FaLinkedin, FaInstagramSquare } from "react-icons/fa";
import service from '../../Appwrite/Conf';
import { Alert } from '../../'

const Contact = () => {
    
    const [error, setError] = useState(null)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const storeMessage = async () => {
        setError(null); 

        // Validation for empty fields
        if (!name || !email || !message) {
            setError('All fields are required.');
            return;
        }
        try {
            const data = await service.storeUserMessage({ name, email, message }, setError);
            if (data === null || data === undefined) {
                setError('Failed to Send Message..');
            } else {
                setError('Your Message has been sent...');
                setName('')
                setEmail('')
                setMessage('')
            }
        } catch (error) {
            console.error('Failed to store data:', error);
            setError('An unexpected error occurred');
        }
    };

    const handleAlertClose = () => {
        setError(null); 
    };

    return (
        <>
            <div
                className='banner aboutBG'
            >
                <h1
                    className='text-5xl text-light font-bold border-b-4 border-primary'
                >
                    Contact Us
                </h1>
            </div>
            <div
                className='gap-5 my-20 mx-5 md:mx-20 flex justify-between md:flex-row flex-col'
            >
                <div className='w-full'>
                    <h1
                        className='text-3xl font-bold px-2'
                    >HAVE A QUESTION ? SHOOT AWAY</h1>
                    <p
                        className='mt-7 px-2'
                    >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. At, vitae. Quasi cumque autem minima veniam architecto, sapiente nemo nulla. Consequatur exercitationem tenetur cupiditate porro qui laudantium iure veritatis fugiat quia dignissimos. Iste cupiditate eos consequatur unde vitae doloremque aperiam voluptatum! Reprehenderit magnam dolores fugit rem nulla perspiciatis quos voluptatibus. Saepe?</p>
                    <div className='mt-5 flex items-center gap-5 px-2'>
                        <p>Follow us on :</p>
                        <div className='flex gap-5'>
                            <FaFacebookSquare className='size-6 text-primary cursor-pointer' />
                            <FaTwitterSquare className='size-6 text-primary cursor-pointer' />
                            <FaLinkedin className='size-6 text-primary cursor-pointer' />
                            <FaInstagramSquare className='size-6 text-primary cursor-pointer' />
                        </div>
                    </div>
                </div>
                <div className='w-full'>
                    {error && <div className='mb-2'>
                        <Alert message={error} type='error' onClose={handleAlertClose}/>
                    </div>}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault(),
                                storeMessage()
                        }}
                    >
                        <input type="text" className='bg-[#e8f0fe] outline-none text-sm focus:border-b-2 border-primary w-full h-12 text-black px-5' placeholder='Enter Your Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <input type="email" className='bg-[#e8f0fe] outline-none text-sm focus:border-b-2 border-primary w-full h-12 text-black px-5 mt-5' placeholder='Enter Your Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <textarea
                            className='bg-[#e8f0fe] outline-none text-sm focus:border-b-2 border-primary w-full text-black px-5 mt-5 p-2 resize-none'
                            placeholder='Enter Your Message'
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                            cols="30" rows="7"></textarea>
                        <button
                            className='w-full bg-primary h-12 mt-5 text-light'
                        >Send Message</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Contact
