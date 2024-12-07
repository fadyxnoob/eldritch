import React, { useState, useEffect, useCallback } from 'react'
import authService from '../../Appwrite/Auth'
import { Category } from '../../'
import { FaCalendarAlt, FaUser, FaRocketchat } from "react-icons/fa";
import { Comments } from '../../'
import { Link, useParams } from 'react-router-dom';
import service from '../../Appwrite/Conf';
import Alert from '../../Components/Alert/Alert';
import { useSelector } from 'react-redux';
import { Query } from 'appwrite';

const Post = () => {
    
    const { postID } = useParams();
    const [post, setPost] = useState([])
    const [postCat, setPostCat] = useState('')
    const [postImage, setPostImage] = useState('')
    const [loading, setLoading] = useState(true)
    const [userMessage, setUserMessage] = useState('')
    const [alert, setAlert] = useState(null)
    const userdata = useSelector((state) => state.auth.userdata);
    const [userID] = useState(userdata?.$id)
    const [allComments, setAllComments] = useState([])

    const getAllComments = useCallback(async () => {
        const params = [Query.equal('postID', postID)]
        const res = await service.getUsersComments(params)
        setAllComments(res.documents)
    }, [])


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

        getAllComments()
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

    const submitHandler = useCallback(async (e) => {
        e.preventDefault();
        if (!userMessage) {
            setAlert({ type: 'error', message: 'Please enter your message' })
        };

        if (!userID) {
            setAlert({ type: 'error', message: 'Please login first.' })
        }
        const data = {
            userID: userID,
            message: userMessage,
            postID: postID,
            date: new Date().toISOString(),
        }
        console.log({ data });
        if (userMessage && userID && data) {
            const res = await service.addUserMessage(data)
            setAlert(res)
            getAllComments()
            setUserMessage('')
        }
    }, [userMessage])

    if (loading) {
        return <p>Loading.......</p>
    }
    return (
        <div className='mx-5 md:mx-20 my-20'>
            {
                alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />
            }
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
                            {Array.isArray(allComments) ? allComments.length : 0} Comments
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
                            Your email address will not be published..
                        </p>
                        <form
                            onSubmit={submitHandler}
                        >
                            <label htmlFor="addComment">Write down</label>   <br />
                            <textarea
                                value={userMessage}
                                onChange={(e) => setUserMessage(e.target.value)}
                                className='bg-[#e8f0fe] outline-none text-sm focus:border-b-2 border-primary w-full h-24 text-black px-2 py-2'
                                id="addComment"
                                cols="30" rows="10"
                            >
                            </textarea>
                            <div className='text-end md:text-start'>
                                <button className='mt-5 bg-primary px-5 py-2 text-light rounded'>Submit</button>
                            </div>
                        </form>
                    </div>
                    <>
                        <Comments post={post} comments={allComments} setAlert={setAlert} onDelete={getAllComments()} />
                    </>
                </div>
                <div className='md:w-[30%]'>
                    <Category getType='post' />
                </div>
            </div>
        </div>
    )
}

export default React.memo(Post)
