import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import authService from '../../Appwrite/Auth';
import service from '../../Appwrite/Conf';
import Alert from '../../Components/Alert/Alert';
import { useSelector } from 'react-redux';
import { Query } from 'appwrite';
import { Comments } from '../../'


const Product = () => {
    const { productID } = useParams();
    const [document, setDocument] = useState({});
    const [proImage, setViewImage] = useState('')
    const [loading, setLoading] = useState(true)
    const [cat, setCat] = useState({})
    const [userMessage, setUserMessage] = useState('')
    const [alert, setAlert] = useState(null)
    const userdata = useSelector((state) => state.auth.userdata);
    const [userID] = useState(userdata?.$id)
    const [allComments, setAllComments] = useState([])


    const getAllComments = useCallback(async () => {
        const params = [Query.equal('documentID', productID)]
        const res = await service.getUsersComments(params)
        setAllComments(res.documents)
    }, [productID])


    const getData = async () => {
        try {
            const product = await authService.getSingleProduct(productID);
            if (product) {
                if (product.cat) {
                    const category = await authService.getCategory(product.cat);
                    setCat(category || 'Unknown');
                } else {
                    console.log("Product Category ID is missing.");
                    setCat('Unknown');
                }
                setDocument(product);
                const imageUrl = service.ViewImage(product?.image);
                setViewImage(imageUrl);
            } else {
                console.log("Product not found.");
            }
        } catch (error) {
            console.log("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getData()
    }, [])


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
            documentID: productID,
            docType: 'product',
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


    if (!loading) {
        return (
            <>
                {
                    alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />
                }
                <div className="productBG banner px-5 md:px-20 py-1">
                    <h1 className='text-light text-lg md:text-2xl capitalize'>
                        Eldritch > Shop > {cat.cat_name} > {document?.name}
                    </h1>
                </div>
                <div className="my-10 md:flex justify-between md:mx-10 md:px-10">
                    <div className='p-5 boxShadow md:w-[45%]'>
                        <div className="">
                            <img src={proImage} alt={proImage} className='size-full object-cover' />
                        </div>
                        <div className="flex justify-around gap-3 h-20 mt-5 w-full">
                            <img src={proImage} alt={proImage} className='size-full object-fill border' />
                            <img src={proImage} alt={proImage} className='size-full object-fill border' />
                            <img src={proImage} alt={proImage} className='size-full object-fill border' />
                        </div>
                    </div>
                    <div className="px-10 md:w-[55%] mt-5 md:mt-0">
                        <h2 className='text-4xl font-semibold'>{document.name}</h2>
                        <div className='flex gap-2 mt-5'>
                            <strong>Price :</strong>
                            <p className='text-lg'>${document.price}</p>
                        </div>
                        <p className='text-sm'>{document.disc}</p>
                        <div className='flex gap-2 mt-5'>
                            <strong>Category :</strong>
                            <p className='capitalize text-lg'>{cat.cat_name}</p>
                        </div>
                        <div className='text-end md:text-start'>
                            <button className='mt-5 bg-primary px-5 py-2 text-light rounded'>Add To Cart</button>
                        </div>

                        <div className="mt-10">
                            <h3 className='text-3xl font-medium'>Description</h3>
                            <p className='text-sm'>{document.disc}</p>
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
                    </div>
                </div>
                <div className=' md:mx-10 md:px-10 px-5'>
                    <h3 className='text-3xl font-medium mb-2'>Comments</h3>
                    <>
                        <Comments post={document} comments={allComments} setAlert={setAlert} onDelete={getAllComments()} />
                    </>
                </div>
            </>
        );
    } else {
        return <p>Loading....</p>
    }

}

export default React.memo(Product);
