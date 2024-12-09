import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import authService from '../../Appwrite/Auth';
import service from '../../Appwrite/Conf';
import Alert from '../../Components/Alert/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { Query } from 'appwrite';
import { Comments } from '../../'
import { addToCart } from '../../Store/cartSlice';
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";


const Product = () => {
    const { productID } = useParams();
    const [document, setDocument] = useState({});
    const [proImage, setViewImage] = useState('');
    const [loading, setLoading] = useState(true);
    const [cat, setCat] = useState({});
    const [userMessage, setUserMessage] = useState('');
    const [alert, setAlert] = useState(null);
    const userdata = useSelector((state) => state.auth.userdata);
    const [allComments, setAllComments] = useState([]);
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.products);
    const [quantity, setQuantity] = useState(1);

    // Fetch comments with memoization
    const getAllComments = useCallback(async () => {
        try {
            const params = [Query.equal('documentID', productID)];
            const res = await service.getUsersComments(params);
            setAllComments(res.documents);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    }, [productID]);

    // Fetch product data with memoization
    const getData = useCallback(async () => {
        setLoading(true);
        try {
            const product = await authService.getSingleProduct(productID);
            if (product) {
                const category = product.cat
                    ? await authService.getCategory(product.cat)
                    : 'Unknown';
                setCat(category || 'Unknown');
                setDocument(product);
                setViewImage(service.ViewImage(product?.image));
            } else {
                console.warn('Product not found.');
            }
        } catch (error) {
            console.error('Error fetching product data:', error);
        } finally {
            setLoading(false);
        }
    }, [productID]);

    useEffect(() => {
        getData();
        console.log({ cart });
    }, [getData]);

    // Handle form submission
    const submitHandler = useCallback(
        async (e) => {
            e.preventDefault();
            if (!userMessage) {
                setAlert({ type: 'error', message: 'Please enter your message' });
                return;
            }
            if (!userdata?.$id) {
                setAlert({ type: 'error', message: 'Please login first.' });
                return;
            }
            const data = {
                userID: userdata.$id,
                message: userMessage,
                documentID: productID,
                docType: 'product',
                date: new Date().toISOString(),
            };
            try {
                const res = await service.addUserMessage(data);
                setAlert(res);
                getAllComments();
                setUserMessage('');
            } catch (error) {
                console.error('Error submitting message:', error);
            }
        },
        [userMessage, userdata, productID, getAllComments]
    );

    // Cart actions
    const handleCart = (id, quantity, name, price) => {
        if (!userdata) {
            setAlert({ type: 'warning', message: 'Please login first.' });
            return;
        } else {
            dispatch(addToCart({ id, quantity, name, price }));
            setAlert({ type: 'success', message: 'Item added to the cart.' });
        }
    };
    
    const handleMinusQuantity = () =>
        setQuantity((prev) => (prev > 0 ? prev - 1 : 0));

    const handlePlusQuantity = () => setQuantity((prev) => prev + 1);

    if (loading) return <p>Loading...</p>;

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
                    <div className='flex mt-5 bg-primary w-[20%] h-8 items-center justify-between rounded'>
                        <button onClick={handleMinusQuantity} >
                            <CiSquareMinus className='size-8 text-light cursor-pointer' />
                        </button>
                        <div className=''>{quantity}</div>
                        <button onClick={handlePlusQuantity}>
                            <CiSquarePlus className='size-8 text-light cursor-pointer' />
                        </button>
                    </div>
                    <div className='text-end md:text-start'>
                        <button className='mt-5 bg-primary px-5 py-2 text-light rounded'
                            onClick={() => handleCart(document.$id, quantity, document.name, document.price)}
                        >Add To Cart</button>
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

}

export default React.memo(Product);
