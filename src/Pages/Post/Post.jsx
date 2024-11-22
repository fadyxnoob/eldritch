import React, { useState, useEffect } from 'react'
import authService from '../../Appwrite/Auth'
import { Category } from '../../'
import Image from '../../assets/images/blog3.jpg'
import { FaCalendarAlt, FaUser, FaRocketchat } from "react-icons/fa";
import { Comments } from '../../'
import { Link, useParams } from 'react-router-dom';
import service from '../../Appwrite/Conf';

const Post = () => {
    const { postID } = useParams();
    const [post, setPost] = useState([])
    const [postCat, setPostCat] = useState('')
    const [postImage, setPostImage] = useState('')
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        authService.getSinglePost(postID)
            .then((fetchPost) => {
                const fetchedPost = fetchPost;
                authService.getCatName(fetchedPost.cat)
                    .then((cat) => {
                        setPostCat(cat?.cat_name || 'Undefined')
                    })
                    .catch((error) => {
                        console.log(error);
                    })

                const imageUrl = service.ViewImage(fetchedPost.image)
                if (imageUrl) {
                    setPostImage(imageUrl)
                }
                setPost(fetchedPost);
                setLoading(false)
            })
            .catch((error) => {
                setLoading(true)
                console.log(error);
            })
    }, [])

    const formatDate = (dateString) => {
        const [day, month, year] = dateString.split('/'); 
        const fullYear = year.length === 2 ? `${year}` : year; 
        const validDate = new Date(`${fullYear}-${month}-${day}`); 
        if (isNaN(validDate)) {
            return 'Invalid Date'; 
        }
        return validDate.toLocaleDateString('default', {
            weekday: 'short',
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };



    if (loading) {
        return <p>Loading.......</p>
    }
    return (
        <div className='mx-5 md:mx-20 my-20'>
            <div className='flex justify-between gap-5 md:flex-row flex-col'>
                <div className='md:w-[70%]'>
                    <div className="relative">
                        <div className='w-full h-[500px] overflow-hidden'>
                            <img src={postImage} alt={postImage} className='object-cover size-full' />
                        </div>

                        <Link to={`/category/${post.cat}?type=post`}>
                            <h3 className="absolute top-2 left-5 bg-primary w-fit px-2 py-1 text-light text-xl font-medium">
                                {postCat}
                            </h3>
                        </Link>
                    </div>

                    <p className='flex my-5 gap-1'>
                        <FaCalendarAlt className='size-5' />
                        {formatDate(post.date)}
                    </p>
                    <h1 className='text-4xl font-bold'>
                       {post.title}
                    </h1>
                    <div className='my-4 flex justify-between md:w-[70%]'>
                        <p className='flex items-center gap-1'> <FaUser className='size-5' />
                            by Hammad</p>
                        <p className='flex items-center gap-1'>
                            <FaRocketchat className='size-5' />
                            4 Comments
                        </p>
                    </div>
                    <div className='my-2'>
                        <p className='text-justify'>
                           {post.disc}
                        </p>
                    </div>
                    <div className="mt-10">
                        <h3 className='text-2xl font-medium'>Add Comment</h3>
                        <p className="text-sm my-5">
                            Your address will not be published..
                        </p>
                        <form method='post'>
                            <label htmlFor="addComment">Write Here</label>   <br />
                            <input type="email" className='bg-[#e8f0fe] outline-none text-sm focus:border-b-2 border-primary w-full h-10 text-black px-5' />
                            <div className='text-end md:text-start'>
                                <button className='mt-5 bg-primary px-5 py-2 text-light rounded'>Submit</button>
                            </div>
                        </form>
                    </div>
                    {/* <Comments /> */}
                </div>
                <div className='md:w-[30%]'>
                    <Category getType='post' />
                </div>
            </div>
        </div>
    )
}

export default React.memo(Post)
